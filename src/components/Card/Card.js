import { createElement } from '@/utils/createElement';
import styles from './Card.module.css';

class Card {
  constructor(cardData) {
    this.id = cardData.id;
    this.pairId = cardData.pairId;
    this.image = cardData.image;
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

    const inner = createElement('span', {
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
        src: '/assets/back.avif',
        alt: '',
        draggable: 'false',
      },
    });

    front.append(frontImage);
    back.append(backImage);
    inner.append(front, back);
    card.append(inner);
    return card;
  }
}

export { Card };
