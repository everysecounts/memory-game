import { createElement, createSvg } from '@/utils';
import { RulesControl } from '@/components/RulesControl';
import { Settings } from '@/components/Settings';
import styles from './Header.module.css';

function createTempleIcon() {
  return createSvg(
    'svg',
    {
      class: styles.icon,
      viewBox: '0 0 32 32',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', { d: 'M4 10h24L16 4 4 10Z' }),
      createSvg('path', { d: 'M6 12h20' }),
      createSvg('path', { d: 'M8 12v12M13 12v12M19 12v12M24 12v12' }),
      createSvg('path', { d: 'M5 24h22M3 27h26' }),
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

function createLogoMark() {
  return createSvg(
    'svg',
    {
      class: styles.logoMark,
      viewBox: '0 0 56 56',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', { d: 'M28 8 14 15h28L28 8Z' }),
      createSvg('path', { d: 'M17 18h22M18 18v20M25 18v20M31 18v20M38 18v20' }),
      createSvg('path', { d: 'M14 38h28M11 42h34' }),
      createSvg('path', { d: 'M10 13c-5 5-7 12-5 19 2 7 7 12 14 15' }),
      createSvg('path', { d: 'M46 13c5 5 7 12 5 19-2 7-7 12-14 15' }),
      createSvg('path', {
        d: 'M7 20c3 0 5 1 7 3M5 27c3-1 6 0 8 2M8 34c3-1 6-1 8 1M49 20c-3 0-5 1-7 3M51 27c-3-1-6 0-8 2M48 34c-3-1-6-1-8 1',
      }),
    ],
  );
}

class Header {
  constructor(onNewGame, onLeaderboard, onCardSetChange) {
    this.onNewGame = onNewGame;
    this.onLeaderboard = onLeaderboard;
    this.rulesControl = new RulesControl();
    this.settings = new Settings(onCardSetChange);
    this.element = this.createElement();
  }

  createElement() {
    const header = createElement('header', {
      className: styles.header,
    });

    const brand = createElement('div', {
      className: styles.brand,
    });

    const logoMark = createLogoMark();

    const brandText = createElement('div', {
      className: styles.brandText,
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

    newGameButton.append(createTempleIcon(), newGameLabel);
    leadersButton.append(createLeaderboardIcon(), leadersLabel);

    newGameButton.addEventListener('click', this.onNewGame);
    leadersButton.addEventListener('click', this.onLeaderboard);

    brandText.append(title, subtitle);
    brand.append(logoMark, brandText);
    actions.append(newGameButton, leadersButton, this.rulesControl.element, this.settings.element);
    header.append(brand, actions);

    return header;
  }
}

export { Header };
