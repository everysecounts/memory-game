import { createElement } from '@/utils/createElement';
import { BASE_URL } from '@/data/cards';
import styles from './Card.module.css';

class Card {
  constructor(cardData, onSelect) {
    this.id = cardData.id;
    this.pairId = cardData.pairId;
    this.image = cardData.image;
    this.onSelect = onSelect;
    this.isOpen = false;
    this.isMatched = false;
    this.element = this.createElement();
  }

  createElement() {
    const card = createElement('button', {
      className: styles.card,
      attributes: {
        type: 'button',
        'aria-label': 'Open card',
      },
    });

    card.addEventListener('click', () => {
      this.onSelect(this);
    });

    this.inner = createElement('span', {
      className: styles.inner,
    });

    const front = createElement('span', {
      className: styles.front,
    });

    const back = createElement('span', {
      className: styles.back,
    });

    const frontImage = createElement('img', {
      className: styles.image,
      attributes: {
        src: this.image,
        alt: '',
        draggable: 'false',
      },
    });

    const backImage = createElement('img', {
      className: styles.image,
      attributes: {
        src: `${BASE_URL}assets/cards/back.avif`,
        alt: '',
        draggable: 'false',
      },
    });

    front.append(frontImage);
    back.append(backImage);
    this.inner.append(front, back);
    card.append(this.inner);
    return card;
  }

  open() {
    if (this.isOpen || this.isMatched) {
      return false;
    }
    this.isOpen = true;
    this.element.classList.add(styles.open);
    this.element.setAttribute('aria-label', 'Opened card');
    return true;
  }

  close() {
    if (!this.isOpen || this.isMatched) {
      return false;
    }
    this.isOpen = false;
    this.element.classList.remove(styles.open);
    this.element.setAttribute('aria-label', 'Open card');
    return true;
  }

  match() {
    if (this.isMatched) {
      return;
    }

    this.isMatched = true;
    this.element.classList.add(styles.matched);
    this.element.setAttribute('aria-label', 'Matched card');
    this.pulse();
  }

  pulse() {
    this.element.classList.remove(styles.pulse);
    requestAnimationFrame(() => {
      this.element.classList.add(styles.pulse);
    });
  }

  waitForFlip(callback) {
    const handleTransitionEnd = (event) => {
      if (event.propertyName !== 'transform') {
        return;
      }
      this.inner.removeEventListener('transitionend', handleTransitionEnd);
      callback();
    };
    this.inner.addEventListener('transitionend', handleTransitionEnd);
  }
}

export { Card };
