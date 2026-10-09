import { createElement } from '@/utils';
import { TOTAL_PAIRS } from '@/data';
import styles from './Score.module.css';

class Score {
  constructor() {
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
      textContent: `0 / ${TOTAL_PAIRS}`,
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

  updateMoves(moves) {
    this.movesElement.textContent = String(moves);
  }

  updatePairs(pairs, totalPairs) {
    this.pairsElement.textContent = `${pairs} / ${totalPairs}`;
  }

  reset() {
    this.updateMoves(0);
    this.updatePairs(0, TOTAL_PAIRS);
  }
}

export { Score };
