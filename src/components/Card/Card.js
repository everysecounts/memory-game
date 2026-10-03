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
    return createElement('button', {
      className: styles.card,
      attributes: {
        type: 'button',
        'aria-label': 'Open card',
      },
    });
  }
}

export { Card };
