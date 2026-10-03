import { createElement } from '@/utils/createElement';
import styles from './Score.module.css';

class Score {
  constructor() {
    this.moves = 0;
    this.pairs = 0;

    this.element = this.createElement();
  }

  createElement() {
    const score = createElement('div', {
      className: styles.score,
    });

    const movesLabel = createElement('span', {
      textContent: 'Moves:',
    });

    const pairsLabel = createElement('span', {
      textContent: 'Pairs:',
    });

    this.movesElement = createElement('span', {
      textContent: '0',
    });

    this.pairsElement = createElement('span', {
      textContent: '0 / 8',
    });

    const moves = createElement('div', {
      className: styles.item,
    });

    const pairs = createElement('div', {
      className: styles.item,
    });

    moves.append(movesLabel, this.movesElement);
    pairs.append(pairsLabel, this.pairsElement);
    score.append(moves, pairs);
    return score;
  }
}

export { Score };
