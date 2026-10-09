import { createElement, shuffle, soundManager } from '@/utils';
import { BASE_URL, CARD_SETS, DEFAULT_CARD_SET_ID, TOTAL_PAIRS } from '@/data';
import { Card } from '@/components/Card';
import { GameState } from './GameState';
import styles from './Game.module.css';

class Game {
  constructor(score, onFinish, onProgress = () => {}, cardSetId = DEFAULT_CARD_SET_ID) {
    this.score = score;
    this.onFinish = onFinish;
    this.onProgress = onProgress;
    this.cardSetId = cardSetId;
    this.state = new GameState();
    this.mismatchTimer = null;
    this.generation = 0;
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
    this.clearMismatchTimer();
    this.generation += 1;
    this.state.reset();
    this.score.reset();
    this.onProgress(0);

    const cardSet = CARD_SETS[this.cardSetId] ?? CARD_SETS[DEFAULT_CARD_SET_ID];

    const cards = cardSet.cards.map((cardData) => ({
      ...cardData,
      image: `${BASE_URL}assets/cards/${cardSet.folder}/${cardData.image}`,
    }));

    const shuffledCards = shuffle(cards);

    const backImage = `${BASE_URL}assets/cards/${cardSet.folder}/${cardSet.back}`;

    this.cards = shuffledCards.map(
      (cardData) => new Card(cardData, backImage, this.handleCardSelect.bind(this)),
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
      const currentGeneration = this.generation;
      secondCard.waitForFlip(() => {
        if (this.generation !== currentGeneration) {
          return;
        }
        soundManager.play('cardMatch');
        firstCard.match();
        secondCard.match();
        this.state.foundPairs += 1;
        this.score.updatePairs(this.state.foundPairs, TOTAL_PAIRS);
        this.onProgress(this.state.foundPairs);
        this.state.selectedCards = [];
        if (this.state.foundPairs === TOTAL_PAIRS) {
          this.finish();
          return;
        }
        this.state.isLocked = false;
      });
      return;
    }

    this.mismatchTimer = setTimeout(() => {
      soundManager.play('cardMismatch');
      firstCard.close();
      secondCard.close();
      this.state.selectedCards = [];
      this.state.isLocked = false;
      this.mismatchTimer = null;
    }, 1000);
  }

  finish() {
    if (this.state.isFinished) {
      return;
    }
    this.state.isFinished = true;
    this.state.isLocked = true;
    this.onFinish(this.state.moves);
  }

  clearMismatchTimer() {
    if (this.mismatchTimer === null) {
      return;
    }
    clearTimeout(this.mismatchTimer);
    this.mismatchTimer = null;
  }

  restart(cardSetId = this.cardSetId) {
    this.cardSetId = cardSetId;
    this.start();
  }
}

export { Game };
