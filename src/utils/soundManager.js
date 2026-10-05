import { BASE_URL } from '@/data';

const SOUND_BASE_URL = `${BASE_URL}assets/sounds/`;

const SOUNDS = {
  cardFlip: 'card-flip.ogg',
  cardMatch: 'card-match.ogg',
  cardMismatch: 'card-mismatch.ogg',
  buttonClick: 'button-click.ogg',
  victory: 'victory.ogg',
};

class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.isMuted = false;
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.preload();
    this.enableButtonSounds();
  }

  preload() {
    Object.entries(SOUNDS).forEach(([name, fileName]) => {
      const audio = new Audio(`${SOUND_BASE_URL}${fileName}`);

      audio.preload = 'auto';

      this.sounds.set(name, audio);
    });
  }

  enableButtonSounds() {
    document.addEventListener('click', this.handleButtonClick);
  }

  handleButtonClick(event) {
    if (event.target.closest('button')) {
      this.play('buttonClick');
    }
  }

  play(name) {
    if (this.isMuted) {
      return;
    }

    const sound = this.sounds.get(name);

    if (!sound) {
      return;
    }

    sound.pause();
    sound.currentTime = 0;

    const playPromise = sound.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  mute() {
    this.isMuted = true;
  }

  unmute() {
    this.isMuted = false;
  }

  toggle() {
    this.isMuted = !this.isMuted;

    return !this.isMuted;
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
  }
}

const soundManager = new SoundManager();

export { soundManager };
