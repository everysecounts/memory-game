import { createElement } from '@/utils/createElement';
import { shuffle } from '@/utils/shuffle';
import { CARDS } from '@/data/cards';
import { Card } from '@/components/Card';
import styles from './Game.module.css';

class Game {
  constructor() {
    this.element = this.createElement();
    this.start();
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

    game.append(this.board);
    return game;
  }

  start() {
    const shuffledCards = shuffle(CARDS);
    this.cards = shuffledCards.map((cardData) => new Card(cardData));
    this.renderCards();
  }

  renderCards() {
    this.board.replaceChildren();
    this.cards.forEach((card) => {
      this.board.append(card.element);
    });
  }
}

export { Game };
