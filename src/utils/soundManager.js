import { BASE_URL } from '@/data';

const SOUND_BASE_URL = `${BASE_URL}assets/sounds/`;
const THEME_URL = `${SOUND_BASE_URL}theme.ogg`;
const STORAGE_KEY = 'memory-game-sound-settings';

const VOLUME_LEVELS = [0, 0.2, 0.5, 1];
const VOLUME_PERCENTAGES = [0, 20, 50, 100];

const SOUNDS = {
  cardFlip: 'card-flip.ogg',
  cardMatch: 'card-match.ogg',
  cardMismatch: 'card-mismatch.ogg',
  buttonClick: 'button-click.ogg',
  victory: 'victory.ogg',
};

const DEFAULT_SETTINGS = {
  effectsLevel: 3,
  musicLevel: 2,
  themePaused: false,
  masterMuted: false,
  mutedEffectsLevel: 3,
  mutedMusicLevel: 2,
};

function clampLevel(level) {
  return Math.min(Math.max(level, 0), VOLUME_LEVELS.length - 1);
}

class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.listeners = new Set();
    this.theme = null;
    this.settings = { ...DEFAULT_SETTINGS };
    this.audioUnlocked = false;

    this.unlockHandler = this.handleAudioUnlock.bind(this);
    this.themeTimeUpdateHandler = this.handleThemeTimeUpdate.bind(this);
    this.themeMetadataHandler = this.handleThemeMetadata.bind(this);

    this.loadSettings();
    this.preload();
    this.enableButtonSounds();
    this.enableAudioUnlock();
    this.syncThemePlayback();
  }

  loadSettings() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return;
    }

    try {
      const settings = JSON.parse(data);

      if (Number.isInteger(settings.effectsLevel)) {
        this.settings.effectsLevel = clampLevel(settings.effectsLevel);
      } else if (Number.isInteger(settings.volumeLevel)) {
        this.settings.effectsLevel = clampLevel(settings.volumeLevel);
      }

      if (Number.isInteger(settings.musicLevel)) {
        this.settings.musicLevel = clampLevel(settings.musicLevel);
      }

      if (typeof settings.themePaused === 'boolean') {
        this.settings.themePaused = settings.themePaused;
      }

      if (typeof settings.masterMuted === 'boolean') {
        this.settings.masterMuted = settings.masterMuted;
      }

      if (Number.isInteger(settings.mutedEffectsLevel)) {
        this.settings.mutedEffectsLevel = clampLevel(settings.mutedEffectsLevel);
      } else {
        this.settings.mutedEffectsLevel = this.settings.effectsLevel;
      }

      if (Number.isInteger(settings.mutedMusicLevel)) {
        this.settings.mutedMusicLevel = clampLevel(settings.mutedMusicLevel);
      } else {
        this.settings.mutedMusicLevel = this.settings.musicLevel;
      }

      if (this.settings.masterMuted) {
        this.settings.effectsLevel = 0;
        this.settings.musicLevel = 0;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  saveSettings() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        effectsLevel: this.settings.effectsLevel,
        musicLevel: this.settings.musicLevel,
        themePaused: this.settings.themePaused,
        masterMuted: this.settings.masterMuted,
        mutedEffectsLevel: this.settings.mutedEffectsLevel,
        mutedMusicLevel: this.settings.mutedMusicLevel,
      }),
    );
  }

  preload() {
    Object.entries(SOUNDS).forEach(([name, fileName]) => {
      const audio = new Audio(`${SOUND_BASE_URL}${fileName}`);

      audio.preload = 'auto';
      audio.volume = this.getEffectsVolume();

      this.sounds.set(name, audio);
    });

    this.theme = new Audio(THEME_URL);
    this.theme.preload = 'auto';
    this.theme.loop = true;
    this.theme.playsInline = true;
    this.theme.volume = this.getMusicVolume();

    this.theme.addEventListener('timeupdate', this.themeTimeUpdateHandler);
    this.theme.addEventListener('loadedmetadata', this.themeMetadataHandler);
  }

  enableButtonSounds() {
    document.addEventListener('click', (event) => {
      if (event.target.closest('button')) {
        this.play('buttonClick');
      }
    });
  }

  enableAudioUnlock() {
    document.addEventListener('pointerdown', this.unlockHandler, {
      passive: true,
    });

    document.addEventListener('keydown', this.unlockHandler);
  }

  handleAudioUnlock() {
    if (this.audioUnlocked) {
      return;
    }

    this.syncThemePlayback();
  }

  disableAudioUnlock() {
    document.removeEventListener('pointerdown', this.unlockHandler);
    document.removeEventListener('keydown', this.unlockHandler);
  }

  handleThemeTimeUpdate() {
    this.notify();
  }

  handleThemeMetadata() {
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => {
      listener(this.getState());
    });
  }

  getState() {
    return {
      effectsLevel: this.settings.effectsLevel,
      musicLevel: this.settings.musicLevel,
      themePaused: this.settings.themePaused,
      masterMuted: this.settings.masterMuted,
      themeCurrentTime: this.getThemeCurrentTime(),
      themeDuration: this.getThemeDuration(),
    };
  }

  getEffectsLevel() {
    return this.settings.effectsLevel;
  }

  getMusicLevel() {
    return this.settings.musicLevel;
  }

  getEffectsVolume() {
    if (this.settings.masterMuted) {
      return 0;
    }

    return VOLUME_LEVELS[this.settings.effectsLevel];
  }

  getMusicVolume() {
    if (this.settings.masterMuted) {
      return 0;
    }

    return VOLUME_LEVELS[this.settings.musicLevel];
  }

  getEffectsPercent() {
    return VOLUME_PERCENTAGES[this.settings.effectsLevel];
  }

  getMusicPercent() {
    return VOLUME_PERCENTAGES[this.settings.musicLevel];
  }

  isMasterMuted() {
    return this.settings.masterMuted;
  }

  isThemePaused() {
    return this.settings.themePaused;
  }

  isSoundEnabled() {
    return this.getEffectsVolume() > 0;
  }

  isMusicEnabled() {
    return this.getMusicVolume() > 0;
  }

  getThemeCurrentTime() {
    if (!this.theme || !Number.isFinite(this.theme.currentTime)) {
      return 0;
    }

    return this.theme.currentTime;
  }

  getThemeDuration() {
    if (!this.theme || !Number.isFinite(this.theme.duration)) {
      return 0;
    }

    return this.theme.duration;
  }

  play(name) {
    const volume = this.getEffectsVolume();

    if (volume === 0) {
      return;
    }

    const sound = this.sounds.get(name);

    if (!sound) {
      return;
    }

    sound.pause();
    sound.currentTime = 0;
    sound.volume = volume;

    const playPromise = sound.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  setEffectsLevel(level) {
    if (!Number.isInteger(level)) {
      return;
    }

    const nextLevel = clampLevel(level);

    if (this.settings.masterMuted) {
      this.settings.mutedEffectsLevel = nextLevel;
      this.saveSettings();
      this.notify();
      return;
    }

    this.settings.effectsLevel = nextLevel;

    const volume = this.getEffectsVolume();

    this.sounds.forEach((sound) => {
      sound.volume = volume;
    });

    this.saveSettings();
    this.notify();
  }

  setMusicLevel(level) {
    if (!Number.isInteger(level)) {
      return;
    }

    const nextLevel = clampLevel(level);

    if (this.settings.masterMuted) {
      this.settings.mutedMusicLevel = nextLevel;
      this.saveSettings();
      this.notify();
      return;
    }

    this.settings.musicLevel = nextLevel;

    if (this.theme) {
      this.theme.volume = this.getMusicVolume();
    }

    this.syncThemePlayback();
    this.saveSettings();
    this.notify();
  }

  setMasterMuted(isMuted) {
    const nextMuted = Boolean(isMuted);

    if (nextMuted === this.settings.masterMuted) {
      return;
    }

    if (nextMuted) {
      this.settings.mutedEffectsLevel = this.settings.effectsLevel;
      this.settings.mutedMusicLevel = this.settings.musicLevel;

      this.settings.effectsLevel = 0;
      this.settings.musicLevel = 0;
      this.settings.masterMuted = true;
    } else {
      this.settings.masterMuted = false;
      this.settings.effectsLevel = clampLevel(this.settings.mutedEffectsLevel);
      this.settings.musicLevel = clampLevel(this.settings.mutedMusicLevel);
    }

    const effectsVolume = this.getEffectsVolume();
    const musicVolume = this.getMusicVolume();

    this.sounds.forEach((sound) => {
      sound.volume = effectsVolume;
    });

    if (this.theme) {
      this.theme.volume = musicVolume;
    }

    this.syncThemePlayback();
    this.saveSettings();
    this.notify();
  }

  toggleMasterMute() {
    this.setMasterMuted(!this.settings.masterMuted);
  }

  setThemePaused(isPaused) {
    this.settings.themePaused = Boolean(isPaused);

    this.syncThemePlayback();
    this.saveSettings();
    this.notify();
  }

  toggleThemePaused() {
    this.setThemePaused(!this.settings.themePaused);
  }

  toggleThemePlayback() {
    this.setThemePaused(!this.settings.themePaused);
  }

  restartTheme() {
    if (!this.theme) {
      return;
    }

    this.theme.currentTime = 0;
    this.settings.themePaused = false;

    this.syncThemePlayback();
    this.saveSettings();
    this.notify();
  }

  setThemeCurrentTime(time) {
    if (!this.theme || !Number.isFinite(time)) {
      return;
    }

    const duration = this.getThemeDuration();

    if (duration <= 0) {
      return;
    }

    this.theme.currentTime = Math.min(Math.max(time, 0), duration);
    this.notify();
  }

  syncThemePlayback() {
    if (!this.theme) {
      return;
    }

    const shouldPlay =
      !this.settings.masterMuted && this.settings.musicLevel > 0 && !this.settings.themePaused;

    this.theme.volume = this.getMusicVolume();

    if (!shouldPlay) {
      this.theme.pause();
      return;
    }

    if (!this.theme.paused) {
      return;
    }

    const playPromise = this.theme.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.audioUnlocked = true;
          this.disableAudioUnlock();
          this.notify();
        })
        .catch(() => {});
    }
  }

  nextVolume() {
    const nextLevel = (this.settings.effectsLevel + 1) % VOLUME_LEVELS.length;

    this.setEffectsLevel(nextLevel);
  }

  stop(name) {
    const sound = this.sounds.get(name);

    if (!sound) {
      return;
    }

    sound.pause();
    sound.currentTime = 0;
  }

  stopAll() {
    this.sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });

    if (this.theme) {
      this.theme.pause();
    }
  }
}

const soundManager = new SoundManager();

export { soundManager };
