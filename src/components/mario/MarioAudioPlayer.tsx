import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, Disc3, Radio, Sliders, ChevronDown } from 'lucide-react';
import { sound, BGM_TRACKS, BgmTrackId } from '../../utils/soundEngine';

interface MarioAudioPlayerProps {
  activeWorldId: number;
  isBossStage?: boolean;
}

export const MarioAudioPlayer: React.FC<MarioAudioPlayerProps> = ({
  activeWorldId,
  isBossStage = false
}) => {
  const [, setTick] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Subscribe to sound engine state updates
  useEffect(() => {
    const unsubscribe = sound.subscribe(() => {
      setTick(prev => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  // Update world context when world changes
  useEffect(() => {
    sound.setWorldContext(activeWorldId, isBossStage);
  }, [activeWorldId, isBossStage]);

  const isPlaying = sound.isBgmActive();
  const isSuppressed = sound.getIsModalSuppressed();
  const isMuted = sound.getMuted();
  const volume = sound.getBgmVolume();
  const currentTrackId = sound.getBgmTrack();
  const currentTrackName = sound.getEffectiveTrackName();

  const handleTogglePlay = () => {
    if (isMuted) {
      sound.setMuted(false);
    }
    sound.toggleBgm();
  };

  const handleSelectTrack = (trackId: BgmTrackId) => {
    sound.setBgmTrack(trackId);
    sound.playCoin();
    setIsOpenMenu(false);
  };

  const handleNextTrack = () => {
    const trackOrder: BgmTrackId[] = ['auto', 'overworld', 'underground', 'sky', 'castle'];
    const currentIndex = trackOrder.indexOf(currentTrackId);
    const nextIndex = (currentIndex + 1) % trackOrder.length;
    sound.setBgmTrack(trackOrder[nextIndex]);
    sound.playCoin();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    sound.setBgmVolume(val);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Main Arcade Audio Pill */}
      <div className="flex items-center bg-slate-950/90 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] p-1 gap-1.5 font-mono">
        
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          title={
            isSuppressed
              ? 'พักเสียงเพลงอัตโนมัติขณะทำบทเรียน (จะเล่นต่อเมื่อกลับสู่ด่าน)'
              : isPlaying
              ? 'หยุดพักเพลงมาริโอชั่วคราว (Pause BGM)'
              : 'เล่นเพลงประกอบเกมมาริโอ (Play Mario BGM)'
          }
          className={`p-1.5 rounded flex items-center justify-center transition border border-black shadow-[1px_1px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
            isPlaying 
              ? 'bg-amber-400 text-slate-950 hover:bg-yellow-300 animate-pulse' 
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Animated Equalizer & Track Indicator */}
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          title="เลือกเพลงประกอบเกมมาริโอ (Mario BGM Jukebox)"
          className="flex items-center gap-2 px-2 py-1 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-200 transition text-xs border border-slate-700"
        >
          {/* Animated Retro Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3 w-4">
            <span className={`w-1 bg-yellow-400 rounded-sm transition-all duration-200 ${isPlaying ? 'animate-bounce h-3' : 'h-1 bg-slate-600'}`}></span>
            <span className={`w-1 bg-emerald-400 rounded-sm transition-all duration-200 delay-75 ${isPlaying ? 'animate-pulse h-2.5' : 'h-1.5 bg-slate-600'}`}></span>
            <span className={`w-1 bg-red-400 rounded-sm transition-all duration-200 delay-150 ${isPlaying ? 'animate-bounce h-3' : 'h-1 bg-slate-600'}`}></span>
          </div>

          <span className="text-[11px] font-bold text-yellow-300 max-w-[130px] truncate hidden md:inline">
            🎵 {currentTrackName}
          </span>
          <span className="text-[11px] font-bold text-yellow-300 md:hidden">
            🎵 BGM
          </span>

          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {/* Quick Skip Next Track */}
        <button
          onClick={handleNextTrack}
          title="เปลี่ยนเพลงถัดไป (Next Song)"
          className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-yellow-300 transition"
        >
          <SkipForward className="w-3 h-3" />
        </button>

        {/* Volume Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            title="ปรับระดับเสียงเพลง (BGM Volume)"
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>

          {/* Inline Volume Slider Popover */}
          {showVolumeSlider && (
            <div className="absolute right-0 top-full mt-2 bg-slate-950 border-2 border-black rounded-lg p-2.5 shadow-2xl z-50 flex items-center gap-2 w-36">
              <Volume2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <span className="text-[10px] text-yellow-400 font-bold w-6 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Jukebox Track Selector Dropdown Menu */}
      {isOpenMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpenMenu(false)}
          ></div>
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-950/95 backdrop-blur-md border-2 border-black rounded-xl p-2 shadow-[4px_4px_0px_0px_#000] z-50 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 px-2 pt-1">
              <span className="text-[11px] font-black text-yellow-400 flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 text-red-400 animate-spin" />
                MARIO BGM JUKEBOX
              </span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40">
                8-BIT NES
              </span>
            </div>

            <div className="space-y-1">
              {BGM_TRACKS.map((track) => {
                const isSelected = currentTrackId === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(track.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg transition flex items-center justify-between gap-2 border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-yellow-300 font-bold'
                        : 'bg-slate-900/60 border-transparent hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-base">{track.icon}</span>
                      <div className="flex flex-col truncate">
                        <span className="text-[11px] truncate">{track.nameTh}</span>
                        <span className="text-[9px] text-slate-400">{track.nameEn}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800 px-2 flex justify-between items-center text-[10px] text-slate-400">
              <span>สถานะ: {isSuppressed ? '⏸️ พักอัตโนมัติขณะเปิดบทเรียน' : isPlaying ? '🟢 กำลังเล่นวนลูป' : '⏸️ หยุดชั่วคราว'}</span>
              <button
                onClick={handleTogglePlay}
                className="text-yellow-400 hover:underline font-bold"
              >
                {isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
