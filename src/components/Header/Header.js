import { createElement, createSvg } from '@/utils';
import { CARD_SETS } from '@/data';
import { RulesControl } from '@/components/RulesControl';
import { Settings } from '@/components/Settings';
import styles from './Header.module.css';

function createNewGameIcon() {
  return createSvg(
    'svg',
    {
      class: styles.icon,
      viewBox: '0 0 32 32',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', {
        d: 'M16 6a10 10 0 1 0 8.5 4.5',
      }),
      createSvg('path', {
        d: 'M24.5 5.5V11h-5.5',
      }),
    ],
  );
}

function createLeaderboardIcon() {
  return createSvg(
    'svg',
    {
      class: styles.icon,
      viewBox: '0 0 32 32',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', { d: 'M6 27V17h5v10H6Z' }),
      createSvg('path', { d: 'M14 27V11h5v16h-5Z' }),
      createSvg('path', { d: 'M22 27V5h5v22h-5Z' }),
      createSvg('path', { d: 'M4 27h24' }),
    ],
  );
}

class Header {
  constructor(onNewGame, onLeaderboard, onCardSetChange) {
    this.onNewGame = onNewGame;
    this.onLeaderboard = onLeaderboard;
    this.rulesControl = new RulesControl();
    this.settings = new Settings((cardSetId) => {
      this.updateCardSetName(cardSetId);
      onCardSetChange(cardSetId);
    });
    this.element = this.createElement();
    this.updateCardSetName(this.settings.getCardSetId());
  }

  updateCardSetName(cardSetId) {
    const cardSet = CARD_SETS[cardSetId];
    if (cardSet) {
      this.subtitle.textContent = cardSet.name;
    }
  }

  createElement() {
    const header = createElement('header', {
      className: styles.header,
    });

    const brand = createElement('div', {
      className: styles.brand,
    });

    const brandText = createElement('div', {
      className: styles.brandText,
    });

    const title = createElement('span', {
      className: styles.title,
      textContent: 'Memory of Olympus',
    });

    this.subtitle = createElement('span', {
      className: styles.subtitle,
      textContent: 'Ancient Greece',
    });

    const leftActions = createElement('div', {
      className: styles.leftActions,
    });

    const rightActions = createElement('div', {
      className: styles.rightActions,
    });

    const newGameButton = createElement('button', {
      className: `${styles.button} ${styles.newGameButton}`,
      attributes: {
        type: 'button',
        'aria-label': 'New Game',
      },
    });

    const newGameLabel = createElement('span', {
      className: styles.buttonLabel,
      textContent: 'New Game',
    });

    const leadersButton = createElement('button', {
      className: styles.button,
      attributes: {
        type: 'button',
        'aria-label': 'Leaderboard',
      },
    });

    const leadersLabel = createElement('span', {
      className: styles.buttonLabel,
      textContent: 'Leaderboard',
    });

    newGameButton.append(createNewGameIcon(), newGameLabel);
    leadersButton.append(createLeaderboardIcon(), leadersLabel);

    newGameButton.addEventListener('click', this.onNewGame);
    leadersButton.addEventListener('click', this.onLeaderboard);

    brandText.append(title, this.subtitle);
    brand.append(brandText);
    leftActions.append(this.rulesControl.element, newGameButton);
    rightActions.append(leadersButton, this.settings.element);
    header.append(leftActions, brand, rightActions);

    return header;
  }
}

export { Header };
