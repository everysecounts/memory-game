import { createElement } from '@/utils/createElement';
import { Modal } from '@/components/Modal';
import styles from './LeaderboardModal.module.css';

class LeaderboardModal {
  constructor(leaderboard) {
    this.leaderboard = leaderboard;
    this.modal = new Modal();
    this.element = this.createElement();
  }

  createElement() {
    const content = createElement('div', {
      className: styles.leaderboard,
    });

    const title = createElement('h2', {
      className: styles.title,
      textContent: 'Leaderboard',
    });

    this.list = createElement('ol', {
      className: styles.list,
    });

    const closeButton = createElement('button', {
      className: styles.button,
      textContent: 'Close',
      attributes: {
        type: 'button',
      },
    });

    closeButton.addEventListener('click', () => {
      this.close();
    });

    content.append(title, this.list, closeButton);
    return content;
  }

  open() {
    this.renderResults();
    this.modal.open(this.element);
  }

  renderResults() {
    this.list.replaceChildren();

    const results = this.leaderboard.getResults();

    if (results.length === 0) {
      const emptyMessage = createElement('li', {
        textContent: 'No results yet',
      });
      this.list.append(emptyMessage);
      return;
    }

    results.forEach((result) => {
      const item = createElement('li', {
        className: styles.item,
      });

      const moves = createElement('span', {
        textContent: `${result.moves} moves`,
      });

      const date = createElement('span', {
        textContent: result.date,
      });

      item.append(moves, date);
      this.list.append(item);
    });
  }

  close() {
    this.modal.close();
  }
}

export { LeaderboardModal };
