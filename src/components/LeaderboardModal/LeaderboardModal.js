import { createElement } from '@/utils';
import { Modal } from '@/components/Modal';
import { createDivider, createHourglass } from './ornaments';
import styles from './LeaderboardModal.module.css';

const TOTAL_PAIRS = 8;

class LeaderboardModal {
  constructor(leaderboard) {
    this.leaderboard = leaderboard;
    this.modal = new Modal({ variant: 'scene' });
    this.element = this.createElement();
  }

  createElement() {
    const frame = createElement('div', {
      className: styles.frame,
    });

    const content = createElement('div', {
      className: styles.leaderboard,
    });

    const header = createElement('header', {
      className: styles.header,
    });

    const title = createElement('h2', {
      className: styles.title,
      textContent: 'Leaderboard',
    });

    header.append(title);

    this.body = createElement('div', {
      className: styles.body,
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

    const footer = createElement('footer', {
      className: styles.footer,
    });

    footer.append(closeButton);
    content.append(header, createDivider(styles.divider), this.body, footer);
    frame.append(content);

    return frame;
  }

  open() {
    this.renderResults();
    this.modal.open(this.element);
  }

  renderResults() {
    this.body.replaceChildren();

    const results = this.leaderboard.getResults();

    if (results.length === 0) {
      this.body.append(this.createEmptyState());
      this.element.classList.add(styles.isEmpty);
      return;
    }

    this.element.classList.remove(styles.isEmpty);

    const list = createElement('ol', {
      className: styles.list,
    });

    results.forEach((result, index) => {
      const item = createElement('li', {
        className: styles.item,
        attributes: {
          'data-rank': String(index + 1),
        },
      });

      const rank = createElement('span', {
        className: styles.rank,
      });

      rank.append(
        createElement('span', {
          className: styles.rankNumber,
          textContent: String(index + 1),
        }),
      );

      const moves = createElement('span', {
        className: styles.moves,
        textContent: `${result.moves} moves`,
      });

      const date = createElement('span', {
        className: styles.date,
        textContent: result.date,
      });

      item.append(rank, moves, date);
      list.append(item);
    });

    this.body.append(list);
  }

  createEmptyState() {
    const empty = createElement('div', {
      className: styles.empty,
    });

    const icon = createElement('div', {
      className: styles.emptyIcon,
    });

    icon.append(createHourglass(styles.hourglass));

    const heading = createElement('p', {
      className: styles.emptyTitle,
      textContent: 'No results yet',
    });

    const text = createElement('p', {
      className: styles.emptyText,
      textContent: `Find all ${TOTAL_PAIRS} pairs — and your result will be the first in this leaderboard.`,
    });

    empty.append(icon, heading, text);

    return empty;
  }

  close() {
    this.modal.close();
  }
}

export { LeaderboardModal };
