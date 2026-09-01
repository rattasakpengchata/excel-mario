import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { FileSpreadsheet, Calculator } from 'lucide-react';
import { MOS_WORLDS } from './data/mosCurriculum';
import { LessonBlock, UserProgress, WorldData } from './types/mos';
import { MarioHUD } from './components/mario/MarioHUD';
import { MarioStageView } from './components/mario/MarioStageView';
import { LessonModal } from './components/curriculum/LessonModal';
import { BossStage } from './components/boss/BossStage';
import { FormulaSandbox } from './components/tools/FormulaSandbox';
import { PivotChartSimulator } from './components/tools/PivotChartSimulator';
import { MOSExamGuide } from './components/tools/MOSExamGuide';
import { CertificateModal } from './components/tools/CertificateModal';
import { sound } from './utils/soundEngine';

const STORAGE_KEY = 'super_mos_excel_mario_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  score: 1000,
  coins: 10,
  stars: 1,
  currentWorld: 1,
  powerUpState: 'super',
  completedBlockIds: [],
  completedBossIds: [],
  quizScores: {},
  studentName: 'นิสิตมหาวิทยาลัย ชั้นปีที่ 1'
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROGRESS;
  });

  const [activeWorldId, setActiveWorldId] = useState<number>(progress.currentWorld || 1);
  const [selectedBlock, setSelectedBlock] = useState<LessonBlock | null>(null);
  const [isBossStageActive, setIsBossStageActive] = useState<boolean>(false);
  const [isFormulaLabOpen, setIsFormulaLabOpen] = useState<boolean>(false);
  const [isPivotLabOpen, setIsPivotLabOpen] = useState<boolean>(false);
  const [isExamGuideOpen, setIsExamGuideOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Keep sound engine synchronized with active world & boss stage
  useEffect(() => {
    sound.setWorldContext(activeWorldId, isBossStageActive);
  }, [activeWorldId, isBossStageActive]);

  // Synchronize BGM playback: BGM runs while walking/standing on stage map, pauses when hitting a block or opening a lesson/modal
  useEffect(() => {
    const isModalOpen = Boolean(
      selectedBlock !== null ||
      isFormulaLabOpen ||
      isPivotLabOpen ||
      isExamGuideOpen ||
      isCertificateOpen ||
      isBossStageActive
    );
    sound.setModalSuppressed(isModalOpen);
  }, [selectedBlock, isFormulaLabOpen, isPivotLabOpen, isExamGuideOpen, isCertificateOpen, isBossStageActive]);

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage error ignored
    }
  }, [progress]);

  const currentWorld: WorldData = MOS_WORLDS.find(w => w.id === activeWorldId) || MOS_WORLDS[0];

  // Calculate total blocks across all worlds
  const totalBlocks = MOS_WORLDS.reduce((acc, w) => acc + w.blocks.length, 0);
  const completedBlocksCount = progress.completedBlockIds.length;

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playCoin();
    }
  };

  const handleSelectBlock = (block: LessonBlock) => {
    setSelectedBlock(block);
  };

  const handleCompleteBlock = (blockId: string, scoreGained: number, coinsGained: number) => {
    setProgress(prev => {
      const isNew = !prev.completedBlockIds.includes(blockId);
      const newBlockIds = isNew ? [...prev.completedBlockIds, blockId] : prev.completedBlockIds;
      return {
        ...prev,
        score: prev.score + scoreGained,
        coins: prev.coins + coinsGained,
        completedBlockIds: newBlockIds,
        powerUpState: newBlockIds.length > 8 ? 'fire' : 'super'
      };
    });
  };

  const handleAddBonusCoin = () => {
    setProgress(prev => ({
      ...prev,
      coins: prev.coins + 1,
      score: prev.score + 100
    }));
  };

  const handleDefeatBoss = (score: number, coins: number) => {
    setProgress(prev => ({
      ...prev,
      score: prev.score + score,
      coins: prev.coins + coins,
      stars: prev.stars + 1,
      completedBossIds: [...prev.completedBossIds, 'boss-final-project']
    }));
  };

  const handleUpdateStudentName = (name: string) => {
    setProgress(prev => ({
      ...prev,
      studentName: name
    }));
  };

  const handleCompleteAllInWorld = (worldId: number) => {
    const targetWorld = MOS_WORLDS.find(w => w.id === worldId);
    if (!targetWorld) return;
    
    sound.playStageClear();
    setProgress(prev => {
      const blockIdsToAdd = targetWorld.blocks.map(b => b.id);
      const uniqueBlockIds = Array.from(new Set([...prev.completedBlockIds, ...blockIdsToAdd]));
      const newBlocksCount = uniqueBlockIds.length - prev.completedBlockIds.length;
      return {
        ...prev,
        score: prev.score + newBlocksCount * 500,
        coins: prev.coins + newBlocksCount * 5,
        completedBlockIds: uniqueBlockIds,
        powerUpState: uniqueBlockIds.length > 8 ? 'fire' : 'super'
      };
    });
  };

  // Find global mega boss challenge (or fallback to World 4 boss)
  const globalBossChallenge = MOS_WORLDS.find(w => w.bossChallenge)?.bossChallenge || MOS_WORLDS[MOS_WORLDS.length - 1].bossChallenge;

  return (
    <div className="min-h-screen bg-[#5C94FC] text-slate-900 flex flex-col font-sans selection:bg-yellow-400 selection:text-slate-950">
      
      {/* Top Arcade Navigation HUD */}
      <MarioHUD
        progress={progress}
        activeWorldId={activeWorldId}
        isBossStage={isBossStageActive}
        totalBlocks={totalBlocks}
        completedBlocksCount={completedBlocksCount}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenExamGuide={() => setIsExamGuideOpen(true)}
        onOpenFormulaLab={() => setIsFormulaLabOpen(true)}
        onOpenPivotLab={() => setIsPivotLabOpen(true)}
        onGoToBoss={() => setIsBossStageActive(true)}
      />

      {/* Main View Area: Either Boss Stage or Mario World Platformer */}
      <main className="flex-1 flex flex-col">
        {isBossStageActive && globalBossChallenge ? (
          <BossStage
            boss={globalBossChallenge}
            progress={progress}
            onBackToMap={() => setIsBossStageActive(false)}
            onDefeatBoss={handleDefeatBoss}
          />
        ) : (
          <div className="flex-1 flex flex-col">
            
            {/* Interactive Mario Side-Scrolling World Stage */}
            <MarioStageView
              currentWorld={currentWorld}
              allWorlds={MOS_WORLDS}
              progress={progress}
              onSelectBlock={handleSelectBlock}
              onSelectWorld={(wId) => {
                setActiveWorldId(wId);
                setProgress(p => ({ ...p, currentWorld: wId }));
              }}
              onGoToBoss={() => setIsBossStageActive(true)}
              onAddCoin={handleAddBonusCoin}
              onCompleteAllInWorld={() => handleCompleteAllInWorld(currentWorld.id)}
              onOpenFormulaLab={() => setIsFormulaLabOpen(true)}
              onOpenPivotLab={() => setIsPivotLabOpen(true)}
            />

            {/* Stage Quick Objectives List & Overview in Geometric Balance Container */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-6">
              
              {/* World Header Info Card */}
              <div className="bg-white p-5 rounded-lg border-4 border-black shadow-[6px_6px_0px_0px_#000] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-black bg-amber-400 border-2 border-black px-2.5 py-0.5 rounded shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider">
                      {currentWorld.worldNumber} • MOS {currentWorld.level.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">
                      EXCEL CURRICULUM FOR FRESHMAN
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-2 font-mono tracking-tight">
                    {currentWorld.worldNameTh}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans mt-1 max-w-3xl">
                    {currentWorld.descriptionTh}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* If in World 4: Quick access to Pivot Lab & Formula Sandbox */}
                  {currentWorld.id === 4 && (
                    <>
                      <button
                        onClick={() => {
                          sound.playCoin();
                          setIsPivotLabOpen(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded font-mono text-xs font-bold transition border-2 border-black flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-yellow-300" />
                        <span>ห้องทดลอง Pivot & กราฟ</span>
                      </button>
                      <button
                        onClick={() => {
                          sound.playCoin();
                          setIsFormulaLabOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded font-mono text-xs font-bold transition border-2 border-black flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <Calculator className="w-3.5 h-3.5 text-blue-200" />
                        <span>ห้องทดลองสูตร</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => {
                      sound.playCoin();
                      setIsExamGuideOpen(true);
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded font-mono text-xs font-bold transition border-2 border-black flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <span>📖 โครงสร้างข้อสอบ MOS</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playBossHit();
                      setIsBossStageActive(true);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-mono text-xs font-black transition border-2 border-black flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none animate-pulse"
                  >
                    <span>🏰 ประลองบอสใหญ่ (Word + Excel)</span>
                  </button>
                </div>
              </div>

              {/* World 4 Special Lab Banner (Interactive Sandbox feature) */}
              {currentWorld.id === 4 && (
                <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 p-5 rounded-lg border-4 border-black shadow-[6px_6px_0px_0px_#000] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded font-mono">
                        WORLD 4 SPECIAL LABS
                      </span>
                      <span className="text-xs text-emerald-300 font-mono">การวิเคราะห์ขั้นสูง & รายงานสรุปผล</span>
                    </div>
                    <h3 className="text-lg font-black font-mono text-yellow-300">
                      🛠️ ศูนย์ทดลองปฏิบัติการ PivotTable, Dynamic Charts & Formula Sandbox
                    </h3>
                    <p className="text-xs text-slate-300 max-w-2xl font-sans">
                      ทดลองจัดกลุ่มข้อมูล สรุปยอดขายด้วย PivotTable ลากวางแถว/คอลัมน์ และจำลองการคำนวณสูตร Excel แบบ Interactive เสมือนอยู่ในห้องสอบ MOS
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        sound.playCoin();
                        setIsPivotLabOpen(true);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-black text-xs px-4 py-2.5 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>เปิดแล็บ PivotTable & กราฟ</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playCoin();
                        setIsFormulaLabOpen(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-mono font-black text-xs px-4 py-2.5 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>เปิด Formula Sandbox</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Grid of Knowledge Checkpoints (Geometric Balance Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {currentWorld.blocks.map((block) => {
                  const isCompleted = progress.completedBlockIds.includes(block.id);
                  return (
                    <div
                      key={block.id}
                      onClick={() => {
                        sound.playBlockHit();
                        sound.playPowerUp();
                        setSelectedBlock(block);
                      }}
                      className={`p-4 rounded-lg border-4 border-black transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 ${
                        isCompleted
                          ? 'bg-emerald-50 shadow-[6px_6px_0px_0px_#047857]'
                          : 'bg-white shadow-[6px_6px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000]'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black text-slate-950 bg-yellow-400 px-2 py-0.5 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                            {block.mosObjectiveCode}
                          </span>
                          <span className="text-xl group-hover:scale-125 transition-transform">
                            {isCompleted ? '⭐' : '🍄'}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-950 text-sm group-hover:text-blue-700 transition leading-snug">
                          {block.titleTh}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {block.summaryTh}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t-2 border-slate-200 flex items-center justify-between text-xs font-mono">
                        <span className={`font-black ${isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>
                          {isCompleted ? '✓ COMPLETED' : '▶ START LESSON'}
                        </span>
                        <span className="text-slate-800 font-bold group-hover:translate-x-1 transition">
                          ดูเนื้อหา →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-black py-4 px-4 sm:px-6 text-white font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping"></span>
            <span>SUPER MOS EXCEL MARIO • CERTIPORT MOS ASSOCIATE & EXPERT</span>
          </div>
          <span className="text-yellow-400 font-bold">ออกแบบพิเศษสำหรับนิสิตมหาวิทยาลัย ชั้นปีที่ 1 🎓</span>
        </div>
      </footer>

      {/* Modal Dialogs */}
      <AnimatePresence>
        {selectedBlock && (
          <LessonModal
            block={selectedBlock}
            progress={progress}
            onClose={() => setSelectedBlock(null)}
            onCompleteBlock={handleCompleteBlock}
          />
        )}

        {isFormulaLabOpen && (
          <FormulaSandbox
            onClose={() => setIsFormulaLabOpen(false)}
          />
        )}

        {isPivotLabOpen && (
          <PivotChartSimulator
            onClose={() => setIsPivotLabOpen(false)}
          />
        )}

        {isExamGuideOpen && (
          <MOSExamGuide
            onClose={() => setIsExamGuideOpen(false)}
          />
        )}

        {isCertificateOpen && (
          <CertificateModal
            progress={progress}
            onClose={() => setIsCertificateOpen(false)}
            onUpdateStudentName={handleUpdateStudentName}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
