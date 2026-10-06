import { createElement } from '@/utils';
import { Modal } from '@/components/Modal';
import { createDivider, createLaurelWreath } from '@/components/ornaments';
import styles from './VictoryModal.module.css';

class VictoryModal {
  constructor(onNewGame) {
    this.onNewGame = onNewGame;
    this.modal = new Modal({ variant: 'scene' });
    this.element = this.createElement();
  }

  createElement() {
    const content = createElement('div', {
      className: styles.victory,
    });

    const iconWrap = createElement('div', {
      className: styles.iconWrap,
    });

    iconWrap.append(createLaurelWreath(styles.icon));

    this.title = createElement('h2', {
      className: styles.title,
      textContent: 'Victory!',
    });

    const divider = createDivider(styles.divider);

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
    content.append(iconWrap, this.title, divider, this.movesElement, actions);

    return content;
  }

  open(moves, isPerfect = false) {
    this.title.textContent = isPerfect ? 'Perfect Memory!' : 'Victory!';
    this.movesElement.textContent = `Moves: ${moves}`;
    this.modal.open(this.element);
  }

  close() {
    this.modal.close();
  }
}

export { VictoryModal };
