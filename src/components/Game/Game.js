import { createElement } from '@/utils/createElement';
import { CARDS } from '@/data/cards';
import { Card } from '@/components/Card';
import styles from './Game.module.css';

class Game {
  constructor() {
    this.cards = CARDS.map((cardData) => new Card(cardData));
    this.element = this.createElement();
  }

  createElement() {
    const game = createElement('section', {
      className: styles.game,
      attributes: {
        'aria-label': 'Game board',
      },
    });

    this.board = createElement('div', {
      className: styles.board,
    });

    this.cards.forEach((card) => {
      this.board.append(card.element);
    });

    game.append(this.board);
    return game;
  }
}

export { Game };
