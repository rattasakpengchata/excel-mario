import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Star, Zap, Info, FileSpreadsheet, Calculator } from 'lucide-react';
import { WorldData, LessonBlock, UserProgress } from '../../types/mos';
import { sound } from '../../utils/soundEngine';

interface MarioStageViewProps {
  currentWorld: WorldData;
  allWorlds: WorldData[];
  progress: UserProgress;
  onSelectBlock: (block: LessonBlock) => void;
  onSelectWorld: (worldId: number) => void;
  onGoToBoss: () => void;
  onAddCoin: () => void;
  onCompleteAllInWorld?: () => void;
  onOpenFormulaLab?: () => void;
  onOpenPivotLab?: () => void;
}

// Calculate exact percentage position for each block across the stage
const getBlockXPos = (index: number, total: number): number => {
  if (total <= 1) return 50;
  const startX = 26;
  const endX = 82;
  return startX + (index / (total - 1)) * (endX - startX);
};

const BRICK_BLOCK_X = 13;
const HIT_TOLERANCE_PERCENT = 4.0; // Must be within ±4.0% of the block's center to hit it

export const MarioStageView: React.FC<MarioStageViewProps> = ({
  currentWorld,
  allWorlds,
  progress,
  onSelectBlock,
  onSelectWorld,
  onGoToBoss,
  onAddCoin,
  onCompleteAllInWorld,
  onOpenFormulaLab,
  onOpenPivotLab
}) => {
  // Mario Position state (0 to 100% along the stage)
  const [marioPos, setMarioPos] = useState<number>(10);
  const [marioDirection, setMarioDirection] = useState<'left' | 'right'>('right');
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [hitBlockId, setHitBlockId] = useState<string | null>(null);
  const [poppingItem, setPoppingItem] = useState<{ blockId: string; type: string } | null>(null);
  const [bonusTip, setBonusTip] = useState<string | null>(null);
  const [missCue, setMissCue] = useState<{ x: number; text: string } | null>(null);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState<boolean>(true);
  const stageRef = useRef<HTMLDivElement>(null);

  // Background Theme Palette based on world
  const getThemeBackground = () => {
    switch (currentWorld.theme) {
      case 'grass':
        return 'from-sky-400 via-sky-300 to-sky-200';
      case 'desert':
        return 'from-amber-300 via-amber-200 to-orange-200';
      case 'sky':
        return 'from-indigo-600 via-sky-500 to-blue-300';
      case 'castle':
        return 'from-neutral-900 via-red-950 to-orange-950';
      default:
        return 'from-sky-400 to-sky-200';
    }
  };

  const getGroundColor = () => {
    switch (currentWorld.theme) {
      case 'grass':
        return 'bg-emerald-600 border-emerald-800 text-emerald-100';
      case 'desert':
        return 'bg-amber-600 border-amber-800 text-amber-100';
      case 'sky':
        return 'bg-blue-400 border-blue-600 text-blue-100';
      case 'castle':
        return 'bg-stone-800 border-red-900 text-red-200';
      default:
        return 'bg-emerald-600 border-emerald-800 text-emerald-100';
    }
  };

  // Keyboard navigation (Arrow keys / WASD / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setMarioDirection('right');
        setMarioPos(prev => Math.min(prev + 4, 92));
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setMarioDirection('left');
        setMarioPos(prev => Math.max(prev - 4, 6));
      } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        triggerJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWorld, marioPos, isJumping]);

  const triggerJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    sound.playJump();

    let didHit = false;

    // 1. Check Question Blocks collision
    currentWorld.blocks.forEach((block, index) => {
      const blockPos = getBlockXPos(index, currentWorld.blocks.length);
      if (Math.abs(marioPos - blockPos) <= HIT_TOLERANCE_PERCENT) {
        didHit = true;
        handleHitBlock(block);
      }
    });

    // 2. Check Interactive Brick Bonus Block collision
    if (!didHit && Math.abs(marioPos - BRICK_BLOCK_X) <= HIT_TOLERANCE_PERCENT) {
      didHit = true;
      handleBrickBonus();
    }

    // 3. Mario jumped in empty air (ชนไม่ตรงก้อนอิฐ)
    if (!didHit) {
      // Find distance to the closest block for helpful player guidance
      let closestBlockName = '';
      let minDistance = 999;
      currentWorld.blocks.forEach((block, index) => {
        const blockPos = getBlockXPos(index, currentWorld.blocks.length);
        const dist = Math.abs(marioPos - blockPos);
        if (dist < minDistance) {
          minDistance = dist;
          closestBlockName = block.mosObjectiveCode;
        }
      });

      const brickDist = Math.abs(marioPos - BRICK_BLOCK_X);
      if (brickDist < minDistance) {
        minDistance = brickDist;
        closestBlockName = 'กล่องอิฐเหรียญ';
      }

      if (minDistance <= 8.5) {
        setMissCue({
          x: marioPos,
          text: `💨 เกือบโดนแล้ว! ขยับอีกนิดใต้ ${closestBlockName}`
        });
      } else {
        setMissCue({
          x: marioPos,
          text: '💨 กระโดดกลางอากาศ (เดินไปใต้กล่อง ❓ แล้วกด Space)'
        });
      }

      setTimeout(() => {
        setMissCue(null);
      }, 1400);
    }

    setTimeout(() => {
      setIsJumping(false);
    }, 450);
  };

  const handleHitBlock = (block: LessonBlock) => {
    sound.setModalSuppressed(true); // Stop background music immediately upon hitting block
    setHitBlockId(block.id);
    sound.playBlockHit();

    // Show popping mushroom power-up!
    setPoppingItem({ blockId: block.id, type: block.powerUpItem });
    sound.playPowerUp();

    // Open lesson modal after powerup mushroom pops out
    setTimeout(() => {
      onSelectBlock(block);
      setHitBlockId(null);
      setPoppingItem(null);
    }, 600);
  };

  const walkToAndHitBlock = (block: LessonBlock, index: number) => {
    const targetPos = getBlockXPos(index, currentWorld.blocks.length);
    setMarioDirection(targetPos > marioPos ? 'right' : 'left');
    setMarioPos(targetPos);

    // After walking, trigger jump and hit precisely
    setTimeout(() => {
      setIsJumping(true);
      sound.playJump();
      setTimeout(() => {
        handleHitBlock(block);
        setIsJumping(false);
      }, 250);
    }, 320);
  };

  const walkToAndHitBrick = () => {
    setMarioDirection(BRICK_BLOCK_X > marioPos ? 'right' : 'left');
    setMarioPos(BRICK_BLOCK_X);

    setTimeout(() => {
      setIsJumping(true);
      sound.playJump();
      setTimeout(() => {
        handleBrickBonus();
        setIsJumping(false);
      }, 250);
    }, 320);
  };

  const handleBrickBonus = () => {
    sound.playCoin();
    onAddCoin();
    const tips = [
      '💡 ข้อสอบ MOS: ท่องคีย์ลัด Ctrl + E (Flash Fill) ไว้ให้ขึ้นใจ ช่วยประหยัดเวลามาก!',
      '💡 ข้อสอบ MOS: การใส่ $ ในสูตร (Absolute Reference) ให้กดปุ่ม F4 สะดวกที่สุด',
      '💡 ข้อสอบ MOS: ใน XLOOKUP การค้นหาเริ่มต้นเป็น Exact Match (0) อัตโนมัติ ไม่ต้องใส่ FALSE',
      '💡 ข้อสอบ MOS: ถ้าโจทย์สั่งให้ทำ Total Row ใน Table ให้คลิกแท็บ Table Design แล้วติ๊กถูกช่อง Total Row'
    ];
    setBonusTip(tips[Math.floor(Math.random() * tips.length)]);
    setTimeout(() => setBonusTip(null), 4500);
  };

  const currentIndex = allWorlds.findIndex(w => w.id === currentWorld.id);
  const prevWorld = currentIndex > 0 ? allWorlds[currentIndex - 1] : null;
  const nextWorld = currentIndex < allWorlds.length - 1 ? allWorlds[currentIndex + 1] : null;
  const completedInThisWorld = currentWorld.blocks.filter(b => progress.completedBlockIds.includes(b.id)).length;
  const isCurrentWorldAllCleared = completedInThisWorld === currentWorld.blocks.length;

  return (
    <div className="relative w-full overflow-hidden select-none" ref={stageRef}>
      
      {/* World Selection Tabs Bar */}
      <div className="bg-black/90 backdrop-blur border-b-4 border-black px-4 py-2.5 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          {/* Quick Prev World Button */}
          {prevWorld && (
            <button
              onClick={() => {
                sound.playPipe();
                onSelectWorld(prevWorld.id);
                setMarioPos(10);
              }}
              title={`กลับไป ${prevWorld.worldNumber}`}
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border-2 border-white/20 shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ด่านก่อน</span>
            </button>
          )}

          {allWorlds.map((world) => {
            const isActive = world.id === currentWorld.id;
            const isCompleted = world.blocks.every(b => progress.completedBlockIds.includes(b.id));
            return (
              <button
                key={world.id}
                onClick={() => {
                  sound.playPipe();
                  onSelectWorld(world.id);
                  setMarioPos(10);
                }}
                className={`px-3 py-1.5 rounded font-mono text-xs font-black transition flex items-center gap-1.5 whitespace-nowrap border-2 border-black ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-[3px_3px_0px_0px_#000] ring-2 ring-yellow-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-[2px_2px_0px_0px_#000]'
                }`}
              >
                <span>{world.theme === 'grass' ? '🌱' : world.theme === 'desert' ? '🏜️' : world.theme === 'sky' ? '☁️' : '🏰'}</span>
                <span>{world.worldNumber}</span>
                {isCompleted && <span className="text-yellow-400">★</span>}
                <span className="text-[10px] opacity-80 font-sans">({world.level})</span>
              </button>
            );
          })}

          {/* Quick Next World Button */}
          {nextWorld ? (
            <button
              onClick={() => {
                sound.playPipe();
                onSelectWorld(nextWorld.id);
                setMarioPos(10);
              }}
              title={`ไปยัง ${nextWorld.worldNumber}`}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>ด่านถัดไป</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playBossHit();
                onGoToBoss();
              }}
              className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 animate-pulse"
            >
              <span>ด่านบอส 🏰</span>
            </button>
          )}
        </div>

        {/* Warp to Boss Button */}
        <button
          onClick={() => {
            sound.playBossHit();
            onGoToBoss();
          }}
          className="bg-red-600 hover:bg-red-500 text-white font-mono font-black text-xs px-3.5 py-1.5 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-1.5 shrink-0 active:translate-x-0.5 active:translate-y-0.5 animate-pulse"
        >
          <span>🔥</span>
          <span className="hidden sm:inline">ประลองข้อสอบบอส MOS (Word + Excel)</span>
          <span className="sm:hidden">ด่านบอส MOS</span>
        </button>
      </div>

      {/* World Stage Banner Info */}
      <div className="bg-slate-900/80 px-4 py-2 text-white flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-yellow-300 flex items-center gap-2">
              <span>{currentWorld.worldNumber}:</span>
              <span>{currentWorld.worldNameTh}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                MOS {currentWorld.level}
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">{currentWorld.descriptionTh}</p>
          </div>

          {/* Quick World 4 Lab Launchers */}
          {currentWorld.id === 4 && (
            <div className="flex items-center gap-2 ml-2">
              {onOpenPivotLab && (
                <button
                  onClick={() => {
                    sound.playCoin();
                    onOpenPivotLab();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded border border-emerald-400 flex items-center gap-1 shadow transition active:scale-95"
                >
                  <FileSpreadsheet className="w-3 h-3 text-yellow-300" />
                  <span>แล็บ Pivot & กราฟ</span>
                </button>
              )}
              {onOpenFormulaLab && (
                <button
                  onClick={() => {
                    sound.playCoin();
                    onOpenFormulaLab();
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded border border-blue-400 flex items-center gap-1 shadow transition active:scale-95"
                >
                  <Calculator className="w-3 h-3 text-blue-200" />
                  <span>แล็บสูตร Excel</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Controls Instructions Helper */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded border border-slate-700">
          <span className="text-amber-400 font-semibold">การบังคับ:</span>
          <span>ลูกศร ⬅️ ➡️ หรือกดปุ่ม <strong>Space / W</strong> หรือคลิกที่กล่องเพื่อกระโดดโหม่ง 🍄</span>
        </div>
      </div>

      {/* Main Mario 2D Platformer Canvas Stage */}
      <div className={`relative w-full h-[360px] sm:h-[400px] bg-gradient-to-b ${getThemeBackground()} overflow-hidden border-b-8 border-slate-950`}>
        
        {/* Floating Clouds Background */}
        <div className="absolute top-4 left-[10%] opacity-80 animate-pulse">
          <div className="w-24 h-8 bg-white rounded-full relative shadow-sm">
            <div className="w-10 h-10 bg-white rounded-full absolute -top-4 left-4"></div>
            <div className="w-12 h-12 bg-white rounded-full absolute -top-5 left-10"></div>
          </div>
        </div>
        <div className="absolute top-12 left-[55%] opacity-70">
          <div className="w-32 h-10 bg-white rounded-full relative shadow-sm">
            <div className="w-12 h-12 bg-white rounded-full absolute -top-5 left-6"></div>
            <div className="w-14 h-14 bg-white rounded-full absolute -top-6 left-14"></div>
          </div>
        </div>

        {/* Bonus Tip Toast Notification */}
        <AnimatePresence>
          {bonusTip && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-yellow-400 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-2xl border-2 border-yellow-200 text-xs sm:text-sm flex items-center gap-2 max-w-md text-center"
            >
              <Zap className="w-4 h-4 text-red-600 shrink-0 animate-bounce" />
              <span>{bonusTip}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Miss Cue Feedback Toast (When jumping and missing any block) */}
        <AnimatePresence>
          {missCue && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-36 z-30 bg-slate-950/95 text-yellow-300 font-mono font-bold px-3 py-1.5 rounded-lg border-2 border-yellow-400 shadow-[2px_2px_0px_0px_#000] text-[11px] sm:text-xs flex items-center gap-1.5 whitespace-nowrap pointer-events-none -translate-x-1/2"
              style={{ left: `${missCue.x}%` }}
            >
              <span>{missCue.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warp Pipe (Stage Start) */}
        <div className="absolute bottom-16 left-3 w-16 h-28 flex flex-col items-center justify-start z-10">
          <div className="w-18 h-7 mario-pipe-top rounded-t-sm flex items-center justify-center shadow-md">
            <div className="w-full h-1 bg-white/20"></div>
          </div>
          <div className="w-14 h-21 mario-pipe-body flex items-center justify-center pt-2">
            <span className="text-[10px] font-mono font-black text-black/80 tracking-tighter bg-emerald-300/60 px-1 rounded">START</span>
          </div>
        </div>

        {/* Interactive Brick Blocks (Give bonus coins & exam tips) */}
        <div 
          onClick={walkToAndHitBrick}
          className="absolute bottom-52 -translate-x-1/2 cursor-pointer group hover:scale-110 active:scale-95 transition z-10"
          style={{ left: `${BRICK_BLOCK_X}%` }}
          title="กล่องอิฐพิเศษ: คลิกเพื่อให้ Mario วิ่งไปโหม่งรับเหรียญและเคล็ดลับข้อสอบ MOS"
        >
          <div className="w-12 h-12 bg-amber-800 border-4 border-black rounded shadow-[3px_3px_0px_0px_#000] grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 text-center group-hover:brightness-110">
            <div className="bg-amber-700 rounded-xs border border-amber-900"></div>
            <div className="bg-amber-600 rounded-xs border border-amber-900"></div>
            <div className="bg-amber-600 rounded-xs border border-amber-900"></div>
            <div className="bg-amber-700 rounded-xs border border-amber-900"></div>
          </div>
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-yellow-300 opacity-0 group-hover:opacity-100 transition whitespace-nowrap bg-black px-1.5 py-0.5 rounded border border-yellow-400 shadow">
            +1 COIN!
          </span>
        </div>

        {/* ==========================================
            MYSTERY '?' QUESTION BLOCKS (LESSON MODULES)
            ========================================== */}
        <div className="absolute bottom-52 left-0 right-0 h-28 pointer-events-none z-10">
          {currentWorld.blocks.map((block, index) => {
            const blockX = getBlockXPos(index, currentWorld.blocks.length);
            const isCompleted = progress.completedBlockIds.includes(block.id);
            const isBeingHit = hitBlockId === block.id;
            const isPopping = poppingItem?.blockId === block.id;
            const isMarioUnderneath = Math.abs(marioPos - blockX) <= HIT_TOLERANCE_PERCENT;

            return (
              <div 
                key={block.id} 
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-auto"
                style={{ left: `${blockX}%` }}
              >
                
                {/* MOS Objective Code Tag */}
                <div className={`mb-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] whitespace-nowrap transition-all ${
                  isMarioUnderneath ? 'bg-yellow-400 text-slate-950 scale-105 shadow-[3px_3px_0px_0px_#000]' : 'bg-black text-yellow-300'
                }`}>
                  {block.mosObjectiveCode}
                </div>

                {/* Popping Super Mushroom / Power-up Animation! */}
                <AnimatePresence>
                  {isPopping && (
                    <motion.div
                      initial={{ y: 0, scale: 0.5, opacity: 0 }}
                      animate={{ y: -65, scale: 1.3, opacity: 1 }}
                      exit={{ y: -90, opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="absolute -top-6 z-30 flex flex-col items-center"
                    >
                      {block.powerUpItem === 'mushroom' ? (
                        <div className="w-12 h-12 bg-red-600 border-2 border-black rounded-t-full relative flex items-center justify-center shadow-2xl">
                          <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-1.5 left-2"></div>
                          <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-1.5 right-2"></div>
                          <div className="w-8 h-4 bg-amber-100 border-2 border-black rounded-b-md absolute -bottom-3 flex justify-around px-1.5 pt-0.5">
                            <div className="w-1 h-2 bg-black rounded-full"></div>
                            <div className="w-1 h-2 bg-black rounded-full"></div>
                          </div>
                        </div>
                      ) : block.powerUpItem === 'fireflower' ? (
                        <div className="w-12 h-12 bg-amber-400 border-2 border-black rounded-full flex items-center justify-center text-2xl shadow-xl">
                          🔥
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center text-2xl shadow-xl animate-spin">
                          ⭐
                        </div>
                      )}
                      <span className="text-[10px] font-black text-yellow-300 bg-black px-2 py-0.5 rounded mt-3 border border-yellow-400 shadow-[2px_2px_0px_0px_#000]">
                        POWER UP!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The Mystery '?' Block (Geometric 3D Shading) */}
                <motion.button
                  onClick={() => walkToAndHitBlock(block, index)}
                  animate={isBeingHit ? { y: [-18, 0] } : {}}
                  transition={{ duration: 0.2 }}
                  className={`w-14 h-14 rounded-sm flex flex-col items-center justify-center cursor-pointer relative transition-transform active:scale-95 group ${
                    isCompleted
                      ? 'mario-block-hit text-amber-200 shadow-[4px_4px_0px_0px_#000]'
                      : 'mario-block-gold text-amber-950 hover:brightness-110 shadow-[4px_4px_0px_0px_#000] ring-2 ring-yellow-300 animate-bounce'
                  } ${isMarioUnderneath ? 'ring-4 ring-yellow-400 scale-105' : ''}`}
                  style={{ animationDuration: '2.5s' }}
                  title={`คลิกเพื่อให้ Mario วิ่งไปโหม่งรับบทเรียน ${block.titleTh}`}
                >
                  {/* Geometric Corner Rivets */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black/50 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black/50 rounded-full"></div>
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-black/50 rounded-full"></div>
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-black/50 rounded-full"></div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow-md" />
                  ) : (
                    <span className="font-mono font-black text-3xl drop-shadow-[2px_2px_0px_rgba(255,255,255,0.4)]">?</span>
                  )}
                </motion.button>

                {/* Lesson Title Caption */}
                <div className="mt-2 text-center max-w-[130px]">
                  <p className="text-xs font-bold text-slate-900 bg-white px-2 py-1 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] line-clamp-2 leading-tight">
                    {block.titleTh}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage Clear Celebration Banner */}
        <AnimatePresence>
          {isCurrentWorldAllCleared && showCelebrationBanner && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-yellow-400 text-slate-950 p-4 sm:p-5 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col items-center gap-3 text-center max-w-lg w-[92%]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 font-mono font-black text-sm sm:text-base">
                  <span className="text-2xl animate-bounce">🌟</span>
                  <span>STAGE CLEAR! สำเร็จ {currentWorld.worldNumber}</span>
                  <span className="text-2xl animate-bounce">🌟</span>
                </div>
                <button
                  onClick={() => setShowCelebrationBanner(false)}
                  className="w-7 h-7 bg-black text-white hover:bg-slate-800 rounded font-mono font-bold text-xs flex items-center justify-center border-2 border-black"
                  title="ปิดป้ายฉลองนี้"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs font-sans text-slate-900 leading-relaxed font-semibold">
                คุณผ่านเนื้อหาความรู้ในระดับนี้แล้ว สามารถเลือกก้าวสู่ระดับถัดไป หรือข้ามไปท้าประลองกับบอสใหญ่ (Word + Excel) ได้ทันที!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-1">
                {nextWorld && (
                  <button
                    onClick={() => {
                      sound.playStageClear();
                      onSelectWorld(nextWorld.id);
                      setMarioPos(10);
                    }}
                    className="flex-1 min-w-[140px] bg-black hover:bg-slate-800 text-yellow-300 font-mono font-black text-xs px-4 py-2.5 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <span>สู่ {nextWorld.worldNumber} ⏩</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    sound.playBossHit();
                    onGoToBoss();
                  }}
                  className="flex-1 min-w-[170px] bg-red-600 hover:bg-red-500 text-white font-mono font-black text-xs px-4 py-2.5 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 animate-pulse"
                >
                  <span>🏰 ลุยด่านบอสใหญ่ (Word+Excel)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warp Pipe (Stage Finish - Next World or Boss Warp) */}
        <div 
          onClick={() => {
            if (nextWorld) {
              sound.playPipe();
              onSelectWorld(nextWorld.id);
              setMarioPos(10);
            } else {
              sound.playBossHit();
              onGoToBoss();
            }
          }}
          className="absolute bottom-16 right-3 w-18 h-32 flex flex-col items-center justify-start z-10 cursor-pointer hover:scale-105 active:scale-95 transition"
          title={nextWorld ? `ท่อวาร์ป: คลิกเพื่อไปสู่ ${nextWorld.worldNumber}` : "ท่อวาร์ปสู่ปราสาทบอสใหญ่"}
        >
          <div className="w-22 h-8 mario-pipe-top rounded-t-sm flex items-center justify-center shadow-lg">
            <span className="text-[10px] font-black text-yellow-300 uppercase tracking-wide drop-shadow">
              {nextWorld ? `W-${nextWorld.id} ⏩` : 'BOSS 🏰'}
            </span>
          </div>
          <div className="w-16 h-24 mario-pipe-body flex items-center justify-center pt-3">
            <span className="text-[10px] font-mono font-black text-emerald-100 bg-black/60 px-1.5 py-0.5 rounded border border-emerald-400 animate-bounce">WARP</span>
          </div>
        </div>

        {/* Ground Floor Jump Target Markers */}
        <div className="absolute bottom-16 left-0 right-0 h-2 pointer-events-none z-10">
          {/* Target marker for Brick block */}
          <div 
            className="absolute -translate-x-1/2 bottom-0 w-8 h-1.5 rounded-full bg-amber-950/40"
            style={{ left: `${BRICK_BLOCK_X}%` }}
          />
          {/* Target markers for Question blocks */}
          {currentWorld.blocks.map((b, idx) => {
            const bX = getBlockXPos(idx, currentWorld.blocks.length);
            const isUnder = Math.abs(marioPos - bX) <= HIT_TOLERANCE_PERCENT;
            return (
              <div
                key={b.id}
                className={`absolute -translate-x-1/2 bottom-0 rounded-full transition-all ${
                  isUnder ? 'w-10 h-2 bg-yellow-400/90 shadow-[0_0_8px_#facc15]' : 'w-8 h-1.5 bg-black/30'
                }`}
                style={{ left: `${bX}%` }}
              />
            );
          })}
        </div>

        {/* ==========================================
            ANIMATED MARIO SPRITE CHARACTER
            ========================================== */}
        <motion.div
          animate={{
            left: `${marioPos}%`,
            bottom: isJumping ? '220px' : '64px'
          }}
          transition={{
            left: { duration: 0.25, ease: 'easeOut' },
            bottom: { duration: isJumping ? 0.22 : 0.22, ease: isJumping ? 'easeOut' : 'easeIn' }
          }}
          className={`absolute z-20 flex flex-col items-center pointer-events-none -translate-x-1/2 transition-transform ${
            marioDirection === 'left' ? '-scale-x-100' : 'scale-x-100'
          }`}
          style={{ width: '48px', height: '64px' }}
        >
          {/* Mario Pixel Head & Red Cap */}
          <div className="w-8 h-5 bg-red-600 rounded-t-md relative border border-red-950">
            {/* Cap Visor */}
            <div className="w-10 h-2 bg-red-600 rounded-r-md absolute bottom-0 left-0 border-b border-red-950"></div>
            {/* Face / Nose */}
            <div className="w-5 h-4 bg-amber-200 rounded-r-full absolute -bottom-3 right-0 border-r border-b border-amber-950"></div>
            {/* Mustache */}
            <div className="w-4 h-2 bg-neutral-900 rounded-full absolute -bottom-3 right-1"></div>
            {/* Eye */}
            <div className="w-1 h-1.5 bg-neutral-950 rounded-full absolute -bottom-1.5 right-3"></div>
          </div>

          {/* Overalls / Body */}
          <div className="w-7 h-6 bg-blue-600 border border-blue-950 rounded-b-md relative flex justify-around items-center px-1">
            {/* Red Shirt Sleeves */}
            <div className="w-2 h-4 bg-red-600 absolute -left-1.5 top-0 rounded-l"></div>
            <div className="w-2 h-4 bg-red-600 absolute -right-1.5 top-0 rounded-r"></div>
            {/* Yellow Buttons */}
            <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
          </div>

          {/* Brown Shoes */}
          <div className="flex justify-between w-8 px-0.5 -mt-0.5">
            <div className="w-3.5 h-2.5 bg-amber-900 border border-amber-950 rounded-sm"></div>
            <div className="w-3.5 h-2.5 bg-amber-900 border border-amber-950 rounded-sm"></div>
          </div>
        </motion.div>

        {/* Ground Floor (Grass/Stone) with Geometric Balance Layers */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex flex-col z-0">
          <div className="h-4 grass-floor-layer flex items-center justify-between px-4">
            <div className="flex justify-between w-full text-[10px] font-mono font-black text-black/80">
              <span>◄ STAGE START</span>
              <span className="hidden sm:inline">🎮 CLICK '?' BLOCK OR USE ARROW/WASD KEYS</span>
              <span>CASTLE WARP ►</span>
            </div>
          </div>
          <div className="flex-1 ground-brick-pattern border-t-2 border-amber-950"></div>
        </div>

      </div>

      {/* Onscreen D-Pad Controls for Touch / Quick Navigation */}
      <div className="bg-black px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-t-4 border-black">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setMarioDirection('left');
              setMarioPos(prev => Math.max(prev - 5, 6));
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white rounded font-mono font-bold text-xs border-2 border-white/20 shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ซ้าย (A)</span>
          </button>

          <button
            onClick={() => {
              setMarioDirection('right');
              setMarioPos(prev => Math.min(prev + 5, 92));
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white rounded font-mono font-bold text-xs border-2 border-white/20 shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>ขวา (D)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={triggerJump}
            className="px-3 sm:px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono font-black text-xs rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
          >
            <span>🍄 โหม่งบล็อก (Space)</span>
          </button>

          {/* Instant Stage Clear Button */}
          {onCompleteAllInWorld && !isCurrentWorldAllCleared && (
            <button
              onClick={() => {
                onCompleteAllInWorld();
                setShowCelebrationBanner(true);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
              title="ผ่านครบทุกบล็อกในระดับนี้ทันที โดยไม่ต้องทำแบบทดสอบ"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>⚡ ผ่านด่านนี้ทันที</span>
            </button>
          )}

          {/* Quick Boss Button */}
          <button
            onClick={() => {
              sound.playBossHit();
              onGoToBoss();
            }}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-mono font-black text-xs rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
            title="ข้ามไปยังด่านบอสใหญ่ (Word + Excel) ได้ทันทีเมื่อใดก็ได้"
          >
            <span>🏰 บอสใหญ่</span>
          </button>
        </div>

        {/* Stage Progress summary */}
        <div className="text-xs text-slate-300 font-mono flex items-center gap-2 bg-slate-900 px-3 py-1 rounded border border-slate-700">
          <span>PROGRESS:</span>
          <span className="text-yellow-400 font-black">
            {currentWorld.blocks.filter(b => progress.completedBlockIds.includes(b.id)).length} / {currentWorld.blocks.length}
          </span>
        </div>
      </div>

    </div>
  );
};
