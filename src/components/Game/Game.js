import { createElement } from '@/utils/createElement';
import { shuffle } from '@/utils/shuffle';
import { CARDS } from '@/data/cards';
import { Card } from '@/components/Card';
import { GameState, TOTAL_PAIRS } from './GameState';
import styles from './Game.module.css';

class Game {
  constructor(score) {
    this.score = score;
    this.state = new GameState();
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
    this.state.reset();
    this.score.reset();
    const shuffledCards = shuffle(CARDS);
    this.cards = shuffledCards.map(
      (cardData) => new Card(cardData, this.handleCardSelect.bind(this)),
    );

    this.renderCards();
  }

  renderCards() {
    this.board.replaceChildren();
    this.cards.forEach((card) => {
      this.board.append(card.element);
    });
  }

  handleCardSelect(card) {
    if (this.state.isLocked || this.state.isFinished) {
      return;
    }
    if (!card.open()) {
      return;
    }
    this.state.selectedCards.push(card);
    if (this.state.selectedCards.length === 2) {
      this.state.moves += 1;
      this.score.updateMoves(this.state.moves);
      this.checkMatch();
    }
  }

  checkMatch() {
    const [firstCard, secondCard] = this.state.selectedCards;
    this.state.isLocked = true;
    if (firstCard.pairId === secondCard.pairId) {
      firstCard.match();
      secondCard.match();
      this.state.foundPairs += 1;
      this.score.updatePairs(this.state.foundPairs, TOTAL_PAIRS);
      this.state.selectedCards = [];
      if (this.state.foundPairs === TOTAL_PAIRS) {
        this.finish();
        return;
      }
      this.state.isLocked = false;
      return;
    }
    setTimeout(() => {
      firstCard.close();
      secondCard.close();
      this.state.selectedCards = [];
      this.state.isLocked = false;
    }, 1000);
  }

  finish() {
    this.state.isFinished = true;
    this.state.isLocked = true;
  }
}

export { Game };
