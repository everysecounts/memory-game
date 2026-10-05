import { createElement, createSvg } from '@/utils';
import { Modal } from '@/components/Modal';
import { createDivider } from '@/components/LeaderboardModal/ornaments';
import styles from './VictoryModal.module.css';

function createLaurelIcon(className) {
  return createSvg(
    'svg',
    {
      class: className,
      viewBox: '0 0 64 64',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    [
      // ===== левая ветвь =====
      createSvg('path', {
        d: 'M32 56 C28 48 18 42 14 32 C12 26 12 20 14 14',
        fill: 'none',
        stroke: '#f3dc9a',
        'stroke-width': '2',
        'stroke-linecap': 'round',
      }),
      // листья левой ветви (снизу вверх)
      createSvg('path', {
        d: 'M16 48 C12 46 8 42 8 38 C12 40 16 44 18 48 Z',
        fill: '#e0c681',
      }),
      createSvg('path', {
        d: 'M14 40 C9 38 5 33 6 28 C11 31 15 36 17 40 Z',
        fill: '#f3dc9a',
      }),
      createSvg('path', {
        d: 'M13 30 C8 27 5 21 7 16 C12 20 15 26 16 30 Z',
        fill: '#e0c681',
      }),
      createSvg('path', {
        d: 'M14 20 C10 16 9 10 12 6 C15 11 16 16 17 20 Z',
        fill: '#f3dc9a',
      }),

      // ===== правая ветвь =====
      createSvg('path', {
        d: 'M32 56 C36 48 46 42 50 32 C52 26 52 20 50 14',
        fill: 'none',
        stroke: '#f3dc9a',
        'stroke-width': '2',
        'stroke-linecap': 'round',
      }),
      // листья правой ветви
      createSvg('path', {
        d: 'M48 48 C52 46 56 42 56 38 C52 40 48 44 46 48 Z',
        fill: '#e0c681',
      }),
      createSvg('path', {
        d: 'M50 40 C55 38 59 33 58 28 C53 31 49 36 47 40 Z',
        fill: '#f3dc9a',
      }),
      createSvg('path', {
        d: 'M51 30 C56 27 59 21 57 16 C52 20 49 26 48 30 Z',
        fill: '#e0c681',
      }),
      createSvg('path', {
        d: 'M50 20 C54 16 55 10 52 6 C49 11 48 16 47 20 Z',
        fill: '#f3dc9a',
      }),

      // лента внизу
      createSvg('path', {
        d: 'M24 54 Q32 60 40 54',
        fill: 'none',
        stroke: '#c9a45c',
        'stroke-width': '2.5',
        'stroke-linecap': 'round',
      }),
      createSvg('path', {
        d: 'M26 56 Q32 52 38 56',
        fill: 'none',
        stroke: '#f3dc9a',
        'stroke-width': '1.2',
        'stroke-linecap': 'round',
      }),
    ],
  );
}

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
    iconWrap.append(createLaurelIcon(styles.icon));

    const title = createElement('h2', {
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
    content.append(iconWrap, title, divider, this.movesElement, actions);

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
