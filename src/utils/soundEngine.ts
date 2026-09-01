// Retro 8-bit Sound Synthesizer & Looping Mario BGM Engine using Web Audio API

export type BgmTrackId = 'overworld' | 'underground' | 'sky' | 'castle' | 'auto';

export interface BgmTrackInfo {
  id: BgmTrackId;
  nameTh: string;
  nameEn: string;
  icon: string;
  descriptionTh: string;
}

export const BGM_TRACKS: BgmTrackInfo[] = [
  { id: 'auto', nameTh: 'เปลี่ยนตามด่านอัตโนมัติ', nameEn: 'Auto by World', icon: '🔄', descriptionTh: 'เปลี่ยนเพลงประกอบตาม World ที่กำลังเล่น' },
  { id: 'overworld', nameTh: 'ทุ่งหญ้ามาริโอ (World 1)', nameEn: 'Overworld Main Theme', icon: '🍄', descriptionTh: 'เพลงธีมหลักมาริโอสุดคลาสสิกที่ทุกคนคุ้นเคย' },
  { id: 'underground', nameTh: 'ถ้ำใต้ดิน (World 2)', nameEn: 'Underground Cave', icon: '🕳️', descriptionTh: 'จังหวะเบส 8-bit ลึกลับ สไตล์ด่านท่อและถ้ำ' },
  { id: 'sky', nameTh: 'อาณาจักรลอยฟ้า & ดาว (World 3)', nameEn: 'Sky & Star Realm', icon: '⭐', descriptionTh: 'จังหวะคึกคัก สนุกสนาน เพิ่มพลังความเร็ว' },
  { id: 'castle', nameTh: 'ปราสาทบอสคุปปะ (World 4 / Boss)', nameEn: 'Bowser Lava Castle', icon: '🏰', descriptionTh: 'เพลงประจัญบานสุดตื่นเต้นในปราสาทลาวา' }
];

const NOTE_FREQS: Record<string, number> = {
  'A2': 110.00, 'Bb2': 116.54, 'B2': 123.47,
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'Eb6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'G6': 1567.98,
  '-': 0
};

interface MusicNote {
  note: string;
  duration: number; // in beats (1 beat = tempoUnit)
  type?: 'lead' | 'bass' | 'perc';
}

interface SongScore {
  tempoUnit: number; // in seconds per beat
  leadNotes: MusicNote[];
  bassNotes: MusicNote[];
}

// 1. Classic Overworld Theme (Calm & Balanced Classic Walking Tempo)
const OVERWORLD_SONG: SongScore = {
  tempoUnit: 0.165, // Relaxed classic Famicom tempo
  leadNotes: [
    // Intro fanfare
    { note: 'E5', duration: 1 }, { note: 'E5', duration: 1 }, { note: '-', duration: 1 }, { note: 'E5', duration: 1 },
    { note: '-', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'E5', duration: 1 }, { note: '-', duration: 1 },
    { note: 'G5', duration: 2 }, { note: '-', duration: 2 }, { note: 'G4', duration: 2 }, { note: '-', duration: 2 },
    
    // Main Theme Phrase A
    { note: 'C5', duration: 1.5 }, { note: '-', duration: 0.5 }, { note: 'G4', duration: 1.5 }, { note: '-', duration: 0.5 },
    { note: 'E4', duration: 1.5 }, { note: '-', duration: 0.5 }, { note: 'A4', duration: 1 }, { note: 'B4', duration: 1 },
    { note: 'Bb4', duration: 1 }, { note: 'A4', duration: 1.5 }, { note: '-', duration: 0.5 },
    { note: 'G4', duration: 0.8 }, { note: 'E5', duration: 0.8 }, { note: 'G5', duration: 0.8 }, { note: 'A5', duration: 1.5 },
    { note: 'F5', duration: 0.8 }, { note: 'G5', duration: 0.8 }, { note: '-', duration: 0.5 }, { note: 'E5', duration: 1.2 },
    { note: 'C5', duration: 0.8 }, { note: 'D5', duration: 0.8 }, { note: 'B4', duration: 1.5 }, { note: '-', duration: 1 },

    // Repeat Phrase A
    { note: 'C5', duration: 1.5 }, { note: '-', duration: 0.5 }, { note: 'G4', duration: 1.5 }, { note: '-', duration: 0.5 },
    { note: 'E4', duration: 1.5 }, { note: '-', duration: 0.5 }, { note: 'A4', duration: 1 }, { note: 'B4', duration: 1 },
    { note: 'Bb4', duration: 1 }, { note: 'A4', duration: 1.5 }, { note: '-', duration: 0.5 },
    { note: 'G4', duration: 0.8 }, { note: 'E5', duration: 0.8 }, { note: 'G5', duration: 0.8 }, { note: 'A5', duration: 1.5 },
    { note: 'F5', duration: 0.8 }, { note: 'G5', duration: 0.8 }, { note: '-', duration: 0.5 }, { note: 'E5', duration: 1.2 },
    { note: 'C5', duration: 0.8 }, { note: 'D5', duration: 0.8 }, { note: 'B4', duration: 1.5 }, { note: '-', duration: 1 },

    // Phrase B (Turnaround)
    { note: '-', duration: 0.8 }, { note: 'G5', duration: 0.8 }, { note: 'F#5', duration: 0.8 }, { note: 'F5', duration: 0.8 },
    { note: 'Eb5', duration: 1 }, { note: 'E5', duration: 1 }, { note: '-', duration: 0.5 },
    { note: 'G#4', duration: 0.8 }, { note: 'A4', duration: 0.8 }, { note: 'C5', duration: 1 },
    { note: 'A4', duration: 0.8 }, { note: 'C5', duration: 0.8 }, { note: 'D5', duration: 1.2 },
    { note: '-', duration: 0.8 }, { note: 'G5', duration: 0.8 }, { note: 'F#5', duration: 0.8 }, { note: 'F5', duration: 0.8 },
    { note: 'Eb5', duration: 1 }, { note: 'E5', duration: 1 }, { note: '-', duration: 0.5 },
    { note: 'C6', duration: 1 }, { note: '-', duration: 0.4 }, { note: 'C6', duration: 0.8 }, { note: 'C6', duration: 1.2 }, { note: '-', duration: 1.5 },

    // Phrase B2
    { note: '-', duration: 0.8 }, { note: 'G5', duration: 0.8 }, { note: 'F#5', duration: 0.8 }, { note: 'F5', duration: 0.8 },
    { note: 'Eb5', duration: 1 }, { note: 'E5', duration: 1 }, { note: '-', duration: 0.5 },
    { note: 'G#4', duration: 0.8 }, { note: 'A4', duration: 0.8 }, { note: 'C5', duration: 1 },
    { note: 'A4', duration: 0.8 }, { note: 'C5', duration: 0.8 }, { note: 'D5', duration: 1.2 },
    { note: '-', duration: 0.8 }, { note: 'Eb5', duration: 1.5 }, { note: '-', duration: 0.5 },
    { note: 'D5', duration: 1.5 }, { note: '-', duration: 0.5 }, { note: 'C5', duration: 2 }, { note: '-', duration: 2 }
  ],
  bassNotes: [
    // Intro Bass
    { note: 'D3', duration: 1 }, { note: 'D3', duration: 1 }, { note: '-', duration: 1 }, { note: 'D3', duration: 1 },
    { note: '-', duration: 1 }, { note: 'D3', duration: 1 }, { note: 'D3', duration: 1 }, { note: '-', duration: 1 },
    { note: 'G3', duration: 2 }, { note: '-', duration: 2 }, { note: 'G3', duration: 2 }, { note: '-', duration: 2 },

    // Main Loop Bass (Bouncy Walking Bassline)
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'F3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'F3', duration: 1 }, { note: 'C3', duration: 1 },
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'B3', duration: 1 },

    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'F3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'F3', duration: 1 }, { note: 'C3', duration: 1 },
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 },

    // Turnaround Bass
    { note: 'C3', duration: 1.5 }, { note: 'G3', duration: 1.5 }, { note: 'C3', duration: 1 },
    { note: 'F3', duration: 1.5 }, { note: 'C3', duration: 1.5 }, { note: 'F3', duration: 1 },
    { note: 'C3', duration: 1.5 }, { note: 'G3', duration: 1.5 }, { note: 'C3', duration: 1 },
    { note: 'G3', duration: 1.5 }, { note: 'D3', duration: 1.5 }, { note: 'G3', duration: 1 },

    { note: 'C3', duration: 1.5 }, { note: 'G3', duration: 1.5 }, { note: 'C3', duration: 1 },
    { note: 'F3', duration: 1.5 }, { note: 'C3', duration: 1.5 }, { note: 'F3', duration: 1 },
    { note: 'G3', duration: 2 }, { note: 'G3', duration: 2 }, { note: 'C3', duration: 2 }, { note: '-', duration: 2 }
  ]
};

// 2. Underground Cave Theme
const UNDERGROUND_SONG: SongScore = {
  tempoUnit: 0.175, // Steady walking bass groove
  leadNotes: [
    { note: 'C4', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'A3', duration: 1 }, { note: 'A4', duration: 1 },
    { note: 'Bb3', duration: 1 }, { note: 'Bb4', duration: 1 }, { note: '-', duration: 2 },
    { note: 'C4', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'A3', duration: 1 }, { note: 'A4', duration: 1 },
    { note: 'Bb3', duration: 1 }, { note: 'Bb4', duration: 1 }, { note: '-', duration: 2 },

    { note: 'F3', duration: 1 }, { note: 'F4', duration: 1 }, { note: 'D3', duration: 1 }, { note: 'D4', duration: 1 },
    { note: 'Eb3', duration: 1 }, { note: 'Eb4', duration: 1 }, { note: '-', duration: 2 },
    { note: 'F3', duration: 1 }, { note: 'F4', duration: 1 }, { note: 'D3', duration: 1 }, { note: 'D4', duration: 1 },
    { note: 'Eb3', duration: 1 }, { note: 'Eb4', duration: 1 }, { note: '-', duration: 2 },

    { note: 'B3', duration: 1 }, { note: 'B4', duration: 1 }, { note: 'G#3', duration: 1 }, { note: 'G#4', duration: 1 },
    { note: 'A3', duration: 1 }, { note: 'A4', duration: 1 }, { note: '-', duration: 2 },
    { note: 'Eb4', duration: 1 }, { note: 'D4', duration: 1 }, { note: 'Db4', duration: 1 }, { note: 'C4', duration: 2 }, { note: '-', duration: 2 }
  ],
  bassNotes: [
    { note: 'C3', duration: 2 }, { note: 'A2', duration: 2 }, { note: 'Bb2', duration: 2 }, { note: '-', duration: 2 },
    { note: 'C3', duration: 2 }, { note: 'A2', duration: 2 }, { note: 'Bb2', duration: 2 }, { note: '-', duration: 2 },
    { note: 'F2', duration: 2 }, { note: 'D2', duration: 2 }, { note: 'Eb2', duration: 2 }, { note: '-', duration: 2 },
    { note: 'F2', duration: 2 }, { note: 'D2', duration: 2 }, { note: 'Eb2', duration: 2 }, { note: '-', duration: 2 },
    { note: 'B2', duration: 2 }, { note: 'G#2', duration: 2 }, { note: 'A2', duration: 2 }, { note: '-', duration: 2 },
    { note: 'C3', duration: 2 }, { note: 'G2', duration: 2 }, { note: 'C3', duration: 2 }, { note: '-', duration: 2 }
  ]
};

// 3. Sky / Star Theme (Fast & Energized)
const SKY_SONG: SongScore = {
  tempoUnit: 0.135, // Smooth upbeat tempo
  leadNotes: [
    { note: 'C5', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'D5', duration: 1 },
    { note: 'E5', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'A4', duration: 1 }, { note: 'G4', duration: 1 },
    { note: 'B4', duration: 1 }, { note: 'B4', duration: 1 }, { note: 'B4', duration: 1 }, { note: 'C5', duration: 1 },
    { note: 'D5', duration: 1 }, { note: 'B4', duration: 1 }, { note: 'G4', duration: 1 }, { note: 'F4', duration: 1 },
    { note: 'C5', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'D5', duration: 1 },
    { note: 'E5', duration: 1 }, { note: 'C5', duration: 1 }, { note: 'A4', duration: 1 }, { note: 'G4', duration: 1 },
    { note: 'B4', duration: 1 }, { note: 'B4', duration: 1 }, { note: 'B4', duration: 1 }, { note: 'C5', duration: 1 },
    { note: 'D5', duration: 2 }, { note: 'C5', duration: 2 }
  ],
  bassNotes: [
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'G2', duration: 1 }, { note: 'D3', duration: 1 }, { note: 'G2', duration: 1 }, { note: 'D3', duration: 1 },
    { note: 'G2', duration: 1 }, { note: 'D3', duration: 1 }, { note: 'G2', duration: 1 }, { note: 'D3', duration: 1 },
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 }, { note: 'C3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'G2', duration: 1 }, { note: 'D3', duration: 1 }, { note: 'G2', duration: 1 }, { note: 'D3', duration: 1 },
    { note: 'G2', duration: 2 }, { note: 'C3', duration: 2 }
  ]
};

// 4. Bowser Lava Castle / Boss Theme
const CASTLE_SONG: SongScore = {
  tempoUnit: 0.125, // Measured dramatic march
  leadNotes: [
    { note: 'C4', duration: 1 }, { note: 'Eb4', duration: 1 }, { note: 'F#4', duration: 1 }, { note: 'A4', duration: 1 },
    { note: 'C5', duration: 1 }, { note: 'A4', duration: 1 }, { note: 'F#4', duration: 1 }, { note: 'Eb4', duration: 1 },
    { note: 'C4', duration: 1 }, { note: 'Eb4', duration: 1 }, { note: 'F#4', duration: 1 }, { note: 'A4', duration: 1 },
    { note: 'C5', duration: 1 }, { note: 'A4', duration: 1 }, { note: 'F#4', duration: 1 }, { note: 'Eb4', duration: 1 },

    { note: 'B3', duration: 1 }, { note: 'D4', duration: 1 }, { note: 'F4', duration: 1 }, { note: 'G#4', duration: 1 },
    { note: 'B4', duration: 1 }, { note: 'G#4', duration: 1 }, { note: 'F4', duration: 1 }, { note: 'D4', duration: 1 },
    { note: 'B3', duration: 1 }, { note: 'D4', duration: 1 }, { note: 'F4', duration: 1 }, { note: 'G#4', duration: 1 },
    { note: 'B4', duration: 1 }, { note: 'G#4', duration: 1 }, { note: 'F4', duration: 1 }, { note: 'D4', duration: 1 },

    { note: 'C5', duration: 2 }, { note: 'Eb5', duration: 2 }, { note: 'G5', duration: 2 }, { note: 'F#5', duration: 2 },
    { note: 'F5', duration: 2 }, { note: 'Eb5', duration: 2 }, { note: 'D5', duration: 2 }, { note: 'Db5', duration: 2 }
  ],
  bassNotes: [
    { note: 'C3', duration: 2 }, { note: 'C3', duration: 2 }, { note: 'C3', duration: 2 }, { note: 'C3', duration: 2 },
    { note: 'C3', duration: 2 }, { note: 'C3', duration: 2 }, { note: 'C3', duration: 2 }, { note: 'C3', duration: 2 },
    { note: 'B2', duration: 2 }, { note: 'B2', duration: 2 }, { note: 'B2', duration: 2 }, { note: 'B2', duration: 2 },
    { note: 'B2', duration: 2 }, { note: 'B2', duration: 2 }, { note: 'B2', duration: 2 }, { note: 'B2', duration: 2 },
    { note: 'C3', duration: 4 }, { note: 'Eb3', duration: 4 }, { note: 'F#3', duration: 4 }, { note: 'G3', duration: 4 }
  ]
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = true;
  private isSuppressedByModal: boolean = false;
  private bgmVolume: number = 0.35; // 0.0 to 1.0 (comfortable background volume)
  private currentTrackId: BgmTrackId = 'auto';
  private activeWorldId: number = 1;
  private isBossStage: boolean = false;

  // Sequencer scheduler state
  private timerId: number | null = null;
  private leadStep: number = 0;
  private bassStep: number = 0;
  private nextLeadTime: number = 0;
  private nextBassTime: number = 0;
  private listeners: Set<() => void> = new Set();
  private userInteractionBound: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedBgm = localStorage.getItem('mos_mario_bgm_enabled');
        if (savedBgm !== null) {
          this.isBgmPlaying = savedBgm === 'true';
        }
        const savedVol = localStorage.getItem('mos_mario_bgm_volume');
        if (savedVol !== null) {
          this.bgmVolume = parseFloat(savedVol) || 0.35;
        }
        const savedTrack = localStorage.getItem('mos_mario_bgm_track');
        if (savedTrack && ['overworld', 'underground', 'sky', 'castle', 'auto'].includes(savedTrack)) {
          this.currentTrackId = savedTrack as BgmTrackId;
        }
      } catch {
        // Fallback
      }

      this.bindUserGesture();
    }
  }

  private bindUserGesture() {
    if (this.userInteractionBound || typeof window === 'undefined') return;
    this.userInteractionBound = true;

    const startAudioOnFirstClick = () => {
      this.initCtx();
      if (this.isBgmPlaying && !this.isMuted) {
        this.startBgmLoop();
      }
      window.removeEventListener('click', startAudioOnFirstClick);
      window.removeEventListener('keydown', startAudioOnFirstClick);
      window.removeEventListener('touchstart', startAudioOnFirstClick);
    };

    window.addEventListener('click', startAudioOnFirstClick, { once: true });
    window.addEventListener('keydown', startAudioOnFirstClick, { once: true });
    window.addEventListener('touchstart', startAudioOnFirstClick, { once: true });
  }

  public ensureBgmStarted() {
    this.initCtx();
    if (this.isBgmPlaying && !this.isMuted && !this.isSuppressedByModal && !this.timerId) {
      this.startBgmLoop();
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Master SFX Gain
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);

        // Master BGM Gain
        this.bgmGain = this.ctx.createGain();
        const effectiveBgmGain = this.isMuted || !this.isBgmPlaying ? 0 : this.bgmVolume * 0.08;
        this.bgmGain.gain.setValueAtTime(effectiveBgmGain, this.ctx.currentTime);
        this.bgmGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  // Active song resolver
  private getActiveSong(): SongScore {
    let effectiveTrack: BgmTrackId = this.currentTrackId;
    if (effectiveTrack === 'auto') {
      if (this.isBossStage) {
        effectiveTrack = 'castle';
      } else {
        switch (this.activeWorldId) {
          case 2: effectiveTrack = 'underground'; break;
          case 3: effectiveTrack = 'sky'; break;
          case 4: effectiveTrack = 'castle'; break;
          default: effectiveTrack = 'overworld'; break;
        }
      }
    }

    switch (effectiveTrack) {
      case 'underground': return UNDERGROUND_SONG;
      case 'sky': return SKY_SONG;
      case 'castle': return CASTLE_SONG;
      default: return OVERWORLD_SONG;
    }
  }

  // Look-ahead Web Audio Sequencer
  private startBgmLoop() {
    if (!this.isBgmPlaying || this.isMuted || this.isSuppressedByModal) return;
    this.initCtx();
    if (!this.ctx) return;

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }

    const now = this.ctx.currentTime;
    this.nextLeadTime = now + 0.05;
    this.nextBassTime = now + 0.05;
    this.leadStep = 0;
    this.bassStep = 0;

    // Scheduler tick every 25ms
    this.timerId = window.setInterval(() => {
      this.scheduleNotes();
    }, 25);

    this.notify();
  }

  private stopBgmLoop() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  private scheduleNotes() {
    if (!this.ctx || !this.bgmGain || !this.isBgmPlaying || this.isMuted || this.isSuppressedByModal) return;

    const song = this.getActiveSong();
    const lookAhead = 0.15; // Schedule up to 150ms ahead
    const currentTime = this.ctx.currentTime;

    // 1. Schedule Lead Notes
    while (this.nextLeadTime < currentTime + lookAhead && song.leadNotes.length > 0) {
      const item = song.leadNotes[this.leadStep % song.leadNotes.length];
      const durationSeconds = item.duration * song.tempoUnit;

      if (item.note !== '-' && NOTE_FREQS[item.note]) {
        this.playSynthesizedTone(
          NOTE_FREQS[item.note],
          this.nextLeadTime,
          durationSeconds * 0.85,
          'square',
          0.3,
          2000
        );
      }

      this.nextLeadTime += durationSeconds;
      this.leadStep = (this.leadStep + 1) % song.leadNotes.length;
    }

    // 2. Schedule Bass Notes
    while (this.nextBassTime < currentTime + lookAhead && song.bassNotes.length > 0) {
      const item = song.bassNotes[this.bassStep % song.bassNotes.length];
      const durationSeconds = item.duration * song.tempoUnit;

      if (item.note !== '-' && NOTE_FREQS[item.note]) {
        this.playSynthesizedTone(
          NOTE_FREQS[item.note],
          this.nextBassTime,
          durationSeconds * 0.9,
          'triangle',
          0.5,
          650
        );
      }

      this.nextBassTime += durationSeconds;
      this.bassStep = (this.bassStep + 1) % song.bassNotes.length;
    }
  }

  private playSynthesizedTone(
    freq: number,
    startTime: number,
    duration: number,
    waveType: OscillatorType,
    volWeight: number,
    cutoffFreq: number
  ) {
    if (!this.ctx || !this.bgmGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, startTime);

      // Lowpass filter for warm NES chiptune timbre
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(cutoffFreq, startTime);

      // Quick ADSR envelope to prevent clicks
      const attack = 0.008;
      const decay = duration * 0.8;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volWeight, startTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Ignore Web Audio scheduling catch
    }
  }

  // --- Public Controls ---

  public setWorldContext(worldId: number, isBoss: boolean = false) {
    const changed = this.activeWorldId !== worldId || this.isBossStage !== isBoss;
    this.activeWorldId = worldId;
    this.isBossStage = isBoss;

    if (changed && this.currentTrackId === 'auto' && this.isBgmPlaying && !this.isMuted) {
      // Re-trigger loop for fresh song tempo and notes
      this.startBgmLoop();
    }
  }

  public toggleBgm(): boolean {
    this.initCtx();
    const nextState = !this.isBgmPlaying;
    this.isBgmPlaying = nextState;

    try {
      localStorage.setItem('mos_mario_bgm_enabled', String(nextState));
    } catch {}

    if (this.bgmGain && this.ctx) {
      const effectiveGain = nextState && !this.isMuted ? this.bgmVolume * 0.08 : 0;
      this.bgmGain.gain.setValueAtTime(effectiveGain, this.ctx.currentTime);
    }

    if (nextState && !this.isMuted) {
      this.startBgmLoop();
    } else {
      this.stopBgmLoop();
    }

    this.notify();
    return this.isBgmPlaying;
  }

  public setBgmTrack(trackId: BgmTrackId) {
    this.currentTrackId = trackId;
    try {
      localStorage.setItem('mos_mario_bgm_track', trackId);
    } catch {}

    if (this.isBgmPlaying && !this.isMuted) {
      this.startBgmLoop();
    }
    this.notify();
  }

  public getBgmTrack(): BgmTrackId {
    return this.currentTrackId;
  }

  public getEffectiveTrackName(): string {
    let effective = this.currentTrackId;
    if (effective === 'auto') {
      if (this.isBossStage) effective = 'castle';
      else if (this.activeWorldId === 2) effective = 'underground';
      else if (this.activeWorldId === 3) effective = 'sky';
      else if (this.activeWorldId === 4) effective = 'castle';
      else effective = 'overworld';
    }
    const info = BGM_TRACKS.find(t => t.id === effective) || BGM_TRACKS[1];
    return info.nameTh;
  }

  public setBgmVolume(volume: number) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    try {
      localStorage.setItem('mos_mario_bgm_volume', String(this.bgmVolume));
    } catch {}

    if (this.bgmGain && this.ctx && this.isBgmPlaying && !this.isMuted) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume * 0.08, this.ctx.currentTime);
    }
    this.notify();
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public setModalSuppressed(suppressed: boolean) {
    if (this.isSuppressedByModal === suppressed) return;
    this.isSuppressedByModal = suppressed;
    if (suppressed) {
      this.stopBgmLoop();
    } else {
      if (this.isBgmPlaying && !this.isMuted) {
        this.startBgmLoop();
      }
    }
    this.notify();
  }

  public getIsModalSuppressed(): boolean {
    return this.isSuppressedByModal;
  }

  public isBgmActive(): boolean {
    return this.isBgmPlaying && !this.isMuted && !this.isSuppressedByModal && this.timerId !== null;
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.initCtx();

    if (this.ctx) {
      if (this.sfxGain) {
        this.sfxGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
      }
      if (this.bgmGain) {
        const effectiveGain = muted || !this.isBgmPlaying ? 0 : this.bgmVolume * 0.08;
        this.bgmGain.gain.setValueAtTime(effectiveGain, this.ctx.currentTime);
      }
    }

    if (muted) {
      this.stopBgmLoop();
    } else if (this.isBgmPlaying) {
      this.startBgmLoop();
    }
    this.notify();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // --- Retro Sound Effects (SFX) ---

  // Jump Sound (Mario Jump)
  public playJump() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Coin Sound (Classic crisp ping-ping)
  public playCoin() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.setValueAtTime(0.25, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Mushroom / Power-up Arpeggio sound
  public playPowerUp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const notes = [330, 392, 659, 523, 587, 784]; // E4, G4, E5, C5, D5, G5
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.15, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.09);
    });
  }

  // Block Bump / Hit Sound
  public playBlockHit() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Warp Pipe Sound
  public playPipe() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Boss Attack / Hit Sound
  public playBossHit() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.3);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Stage Clear Fanfare
  public playStageClear() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.2 }, // C6
      { f: 880.00, d: 0.15 }, // A5
      { f: 1046.50, d: 0.4 }  // C6
    ];

    let t = now;
    notes.forEach((n) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + n.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + n.d);
      t += n.d * 0.9;
    });
  }
}

export const sound = new SoundEngine();
