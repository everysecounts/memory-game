import { createElement } from '@/utils';
import styles from './World.module.css';
import { BASE_URL, TOTAL_PAIRS } from '@/data';

const WORLD_STATES = {
  NIGHT: 'night',
  DAWN: 'dawn',
  DAY: 'day',
};

const WORLD_IMAGES = {
  [WORLD_STATES.NIGHT]: `${BASE_URL}assets/world/night.avif`,
  [WORLD_STATES.DAWN]: `${BASE_URL}assets/world/dawn.avif`,
  [WORLD_STATES.DAY]: `${BASE_URL}assets/world/day.avif`,
};

class World {
  constructor() {
    this.currentState = WORLD_STATES.NIGHT;
    this.isTransitioning = false;
    this.element = this.createElement();
  }

  createElement() {
    const world = createElement('div', {
      className: styles.world,
      attributes: {
        'aria-hidden': 'true',
      },
    });

    this.background = createElement('div', {
      className: `${styles.background} ${styles[this.currentState]}`,
    });

    this.nextBackground = createElement('div', {
      className: styles.background,
    });

    this.light = createElement('div', {
      className: styles.light,
    });

    this.setBackgroundImage(this.background, this.currentState);

    world.append(this.background, this.nextBackground, this.light);

    return world;
  }

  setBackgroundImage(element, state) {
    element.style.backgroundImage = `url('${WORLD_IMAGES[state]}')`;
  }

  setProgress(foundPairs) {
    let nextState = WORLD_STATES.NIGHT;
    const dawnThreshold = Math.floor(TOTAL_PAIRS / 2);
    const dayThreshold = Math.floor((TOTAL_PAIRS * 7) / 8);

    if (foundPairs >= dayThreshold) {
      nextState = WORLD_STATES.DAY;
    } else if (foundPairs >= dawnThreshold) {
      nextState = WORLD_STATES.DAWN;
    }

    if (nextState === this.currentState || this.isTransitioning) {
      return;
    }

    this.transitionTo(nextState);
  }

  transitionTo(nextState) {
    this.isTransitioning = true;

    this.nextBackground.className = `${styles.background} ${styles[nextState]} ${styles.hidden}`;
    this.setBackgroundImage(this.nextBackground, nextState);

    void this.nextBackground.offsetWidth;

    this.nextBackground.classList.remove(styles.hidden);
    this.nextBackground.classList.add(styles.reveal);
    this.light.classList.add(styles.active);

    const finishTransition = () => {
      this.background.className = `${styles.background} ${styles[nextState]}`;
      this.setBackgroundImage(this.background, nextState);

      this.nextBackground.className = styles.background;
      this.light.className = styles.light;

      this.currentState = nextState;
      this.isTransitioning = false;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishTransition();
      return;
    }

    const handleTransitionEnd = (event) => {
      if (event.propertyName !== 'clip-path') {
        return;
      }

      this.nextBackground.removeEventListener('transitionend', handleTransitionEnd);

      finishTransition();
    };

    this.nextBackground.addEventListener('transitionend', handleTransitionEnd);
  }
}

export { World };
