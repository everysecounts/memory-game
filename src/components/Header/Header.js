import { createElement } from '@/utils/createElement';
import styles from './Header.module.css';

class Header {
  constructor(onNewGame) {
    this.onNewGame = onNewGame;
    this.element = this.createElement();
  }

  createElement() {
    const header = createElement('header', {
      className: styles.header,
    });

    const newGameButton = createElement('button', {
      className: styles.button,
      textContent: 'New Game',
      attributes: {
        type: 'button',
      },
    });

    newGameButton.addEventListener('click', this.onNewGame);

    const leadersButton = createElement('button', {
      className: styles.button,
      textContent: 'Leaderboard',
      attributes: {
        type: 'button',
      },
    });

    header.append(newGameButton, leadersButton);
    return header;
  }
}

export { Header };
