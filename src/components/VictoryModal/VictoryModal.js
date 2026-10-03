import { createElement } from '@/utils/createElement';
import { Modal } from '@/components/Modal';
import styles from './VictoryModal.module.css';

class VictoryModal {
  constructor(onNewGame) {
    this.onNewGame = onNewGame;
    this.modal = new Modal();
    this.element = this.createElement();
  }

  createElement() {
    const content = createElement('div', {
      className: styles.victory,
    });

    const title = createElement('h2', {
      className: styles.title,
      textContent: 'Victory!',
    });

    this.movesElement = createElement('p', {
      className: styles.moves,
    });

    const actions = createElement('div', {
      className: styles.actions,
    });

    const newGameButton = createElement('button', {
      className: styles.button,
      textContent: 'New Game',
      attributes: {
        type: 'button',
      },
    });

    const closeButton = createElement('button', {
      className: styles.button,
      textContent: 'Close',
      attributes: {
        type: 'button',
      },
    });

    newGameButton.addEventListener('click', () => {
      this.close();
      this.onNewGame();
    });

    closeButton.addEventListener('click', () => {
      this.close();
    });

    actions.append(newGameButton, closeButton);
    content.append(title, this.movesElement, actions);
    return content;
  }

  open(moves) {
    this.movesElement.textContent = `Moves: ${moves}`;
    this.modal.open(this.element);
  }

  close() {
    this.modal.close();
  }
}

export { VictoryModal };
