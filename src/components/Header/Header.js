import { createElement } from '@/utils/createElement';
import styles from './Header.module.css';

class Header {
  constructor(onNewGame, onLeaderboard) {
    this.onNewGame = onNewGame;
    this.onLeaderboard = onLeaderboard;
    this.element = this.createElement();
  }

  createElement() {
    const header = createElement('header', {
      className: styles.header,
    });

    const brand = createElement('div', {
      className: styles.brand,
    });

    const title = createElement('span', {
      className: styles.title,
      textContent: 'Memory of Olympus',
    });

    const subtitle = createElement('span', {
      className: styles.subtitle,
      textContent: 'Ancient Greece',
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

    const leadersButton = createElement('button', {
      className: styles.button,
      textContent: 'Leaderboard',
      attributes: {
        type: 'button',
      },
    });

    newGameButton.addEventListener('click', this.onNewGame);
    leadersButton.addEventListener('click', this.onLeaderboard);

    brand.append(title, subtitle);
    actions.append(newGameButton, leadersButton);
    header.append(brand, actions);

    return header;
  }
}

export { Header };
