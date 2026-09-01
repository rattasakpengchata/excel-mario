import React from 'react';
import { Award, Sparkles, Trophy, BookOpen } from 'lucide-react';
import { UserProgress } from '../../types/mos';
import { sound } from '../../utils/soundEngine';
import { MarioAudioPlayer } from './MarioAudioPlayer';

interface MarioHUDProps {
  progress: UserProgress;
  activeWorldId: number;
  isBossStage?: boolean;
  totalBlocks: number;
  completedBlocksCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenCertificate: () => void;
  onOpenExamGuide: () => void;
  onGoToBoss: () => void;
}

export const MarioHUD: React.FC<MarioHUDProps> = ({
  progress,
  activeWorldId,
  isBossStage = false,
  totalBlocks,
  completedBlocksCount,
  isMuted,
  onToggleMute,
  onOpenCertificate,
  onOpenExamGuide,
  onGoToBoss
}) => {
  const readinessPercent = Math.round((completedBlocksCount / totalBlocks) * 100);

  return (
    <header className="bg-black/80 backdrop-blur-md border-b-4 border-black text-white font-mono shadow-2xl sticky top-0 z-40">
      {/* Top Arcade Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
        
        {/* Title & Freshman Year 1 Subheading */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 border-2 border-black flex items-center justify-center text-xl shadow-[3px_3px_0px_0px_#000] font-black">
            🍄
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-black text-base sm:text-lg tracking-tight text-yellow-400 drop-shadow-[1px_1px_0px_#000]">
              EXCEL QUEST: MOS EDITION
            </span>
            <span className="text-[10px] text-slate-300 font-sans tracking-wide">
              UNIVERSITY FRESHMAN YEAR 1 (ASSOCIATE & EXPERT)
            </span>
          </div>
        </div>

        {/* Mario Stats Column (Geometric Arcade Alignment) */}
        <div className="flex items-center gap-4 sm:gap-8 font-mono">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider">SCORE</span>
            <span className="text-yellow-300 font-black text-sm sm:text-base tracking-widest">
              {progress.score.toString().padStart(6, '0')}
            </span>
          </div>

          {/* Coins */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider">COINS</span>
            <div className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded border border-yellow-500/50 shadow-[2px_2px_0px_0px_#000]">
              <span className="inline-block w-2.5 h-2.5 bg-yellow-400 rounded-full border border-yellow-200 animate-pulse"></span>
              <span className="text-yellow-400 font-bold text-xs sm:text-sm">x {progress.coins.toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* World Indicator */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider">WORLD</span>
            <span className="text-emerald-400 font-black text-sm sm:text-base">
              {activeWorldId}-{(completedBlocksCount % 4) + 1}
            </span>
          </div>

          {/* Status badge */}
          <div className="hidden lg:flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider">POWER</span>
            <span className="bg-red-600 border-2 border-black text-white text-[10px] font-black px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_#000] uppercase">
              {progress.powerUpState === 'small' ? '🍄 Normal' : progress.powerUpState === 'super' ? '🍄 Super MOS' : '⭐ Fire Master'}
            </span>
          </div>
        </div>

        {/* Readiness Meter & Fast Tools */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* MOS Exam Readiness Meter */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
            <div className="flex flex-col">
              <div className="flex justify-between items-center gap-2 text-[10px]">
                <span className="text-slate-300 font-sans font-medium">MOS READINESS:</span>
                <span className="text-emerald-400 font-bold">{readinessPercent}%</span>
              </div>
              <div className="w-20 sm:w-28 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${readinessPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playCoin();
                onOpenExamGuide();
              }}
              title="MOS Exam Guide - คู่มือพิชิตสอบ MOS"
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-1.5 rounded-lg text-xs font-sans font-bold transition border-2 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden xl:inline">คู่มือสอบ MOS</span>
            </button>

            <button
              onClick={() => {
                sound.playBossHit();
                onGoToBoss();
              }}
              title="Boss Stage - ลุยโจทย์ข้อสอบบอสใหญ่"
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-sans font-black transition border-2 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>ด่านบอสใหญ่</span>
            </button>

            {readinessPercent >= 60 && (
              <button
                onClick={() => {
                  sound.playStageClear();
                  onOpenCertificate();
                }}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-sans font-bold transition border-2 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span className="hidden sm:inline">ใบรับรอง</span>
              </button>
            )}

            {/* Mario BGM & Sound Controller */}
            <MarioAudioPlayer activeWorldId={activeWorldId} isBossStage={isBossStage} />
          </div>
        </div>

      </div>
    </header>
  );
};
