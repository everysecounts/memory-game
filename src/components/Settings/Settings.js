import { createElement, createSettingsIcon, createSvg, soundManager } from '@/utils';
import { CARD_SETS, DEFAULT_CARD_SET_ID } from '@/data';
import { FloatingPanel } from '@/components/FloatingPanel';
import styles from './Settings.module.css';

function createPlayIcon() {
  return createSvg(
    'svg',
    {
      class: styles.playerIcon,
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', {
        d: 'M8 5.5v13l10-6.5L8 5.5Z',
      }),
    ],
  );
}

function createPauseIcon() {
  return createSvg(
    'svg',
    {
      class: styles.playerIcon,
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', {
        d: 'M8 6v12M16 6v12',
      }),
    ],
  );
}

function createRestartIcon() {
  return createSvg(
    'svg',
    {
      class: styles.playerIcon,
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', {
        d: 'M19 8a8 8 0 1 0 1 6',
      }),
      createSvg('path', {
        d: 'M19 4v4h-4',
      }),
    ],
  );
}

function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) {
    return '0:00';
  }

  const totalSeconds = Math.floor(time);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

class Settings {
  constructor(onCardSetChange = () => {}) {
    this.onCardSetChange = onCardSetChange;
    this.cardSetId = this.loadCardSetId();
    this.activeTab = null;
    this.element = this.createElement();

    this.unsubscribe = soundManager.subscribe((type) => {
      if (type === 'theme') {
        this.updateThemePlayer(soundManager.isThemePaused());
        return;
      }

      this.update();
      this.updateThemePlayer(soundManager.isThemePaused());
    });

    this.update();
    this.updateThemePlayer(soundManager.isThemePaused());
    this.updateCardSetSelection();
    this.setActiveTab('audio');
  }

  createElement() {
    const wrapper = createElement('div', {
      className: styles.control,
    });

    const button = createElement('button', {
      className: styles.button,
      attributes: {
        type: 'button',
        'aria-label': 'Settings',
        'aria-expanded': 'false',
        'aria-haspopup': 'dialog',
        'data-no-sound': 'true',
      },
    });

    const icon = createSettingsIcon();

    icon.svg.classList.add(styles.icon);
    button.append(icon.svg);

    const panel = createElement('div', {
      className: styles.panel,
      attributes: {
        role: 'dialog',
        'aria-label': 'Settings',
        'aria-hidden': 'true',
      },
    });

    const panelHeader = createElement('div', {
      className: styles.panelHeader,
    });

    const title = createElement('h2', {
      className: styles.title,
      textContent: 'Settings',
    });

    const masterButton = createElement('button', {
      className: styles.masterButton,
      attributes: {
        type: 'button',
        'aria-label': 'Mute all sounds',
        'aria-pressed': 'false',
      },
    });

    const masterLabel = createElement('span', {
      textContent: 'Mute all',
    });

    masterButton.append(masterLabel);
    panelHeader.append(title, masterButton);

    const tabs = createElement('div', {
      className: styles.tabs,
      attributes: {
        role: 'tablist',
        'aria-label': 'Settings',
      },
    });

    const audioTab = this.createTab('audio', 'Audio');
    const cardsTab = this.createTab('cards', 'Cards');

    tabs.append(audioTab, cardsTab);

    const audioPanel = this.createAudioPanel();
    const cardsPanel = this.createCardsPanel();

    panel.append(panelHeader, tabs, audioPanel, cardsPanel);

    masterButton.addEventListener('click', () => {
      soundManager.toggleMasterMute();
    });

    this.masterButton = masterButton;
    this.masterLabel = masterLabel;
    this.audioTab = audioTab;
    this.cardsTab = cardsTab;
    this.audioPanel = audioPanel;
    this.cardsPanel = cardsPanel;

    this.floatingPanel = new FloatingPanel({
      button,
      panel,
      openClass: styles.open,
    });

    wrapper.append(button);

    return wrapper;
  }

  createTab(name, label) {
    const tab = createElement('button', {
      className: styles.tab,
      textContent: label,
      attributes: {
        type: 'button',
        role: 'tab',
        'aria-selected': 'false',
      },
    });

    tab.addEventListener('click', () => {
      this.setActiveTab(name);
    });

    return tab;
  }

  createAudioPanel() {
    const panel = createElement('section', {
      className: styles.tabPanel,
      attributes: {
        role: 'tabpanel',
        'aria-label': 'Audio settings',
      },
    });

    const effectsPanel = this.createEffectsPanel();
    const musicPanel = this.createMusicPanel();

    panel.append(effectsPanel, musicPanel);

    return panel;
  }

  createEffectsPanel() {
    const panel = createElement('section', {
      className: styles.audioSection,
      attributes: {
        'aria-label': 'Effects settings',
      },
    });

    const description = createElement('p', {
      className: styles.description,
      textContent: 'Game sounds',
    });

    const value = createElement('span', {
      className: styles.value,
    });

    const header = createElement('div', {
      className: styles.row,
    });

    header.append(description, value);

    const levels = this.createLevelControl('effects');

    panel.append(header, levels);

    this.effectsValue = value;

    return panel;
  }

  createMusicPanel() {
    const panel = createElement('section', {
      className: styles.audioSection,
      attributes: {
        'aria-label': 'Music settings',
      },
    });

    const description = createElement('p', {
      className: styles.description,
      textContent: 'Theme music',
    });

    const value = createElement('span', {
      className: styles.value,
    });

    const header = createElement('div', {
      className: styles.row,
    });

    header.append(description, value);

    const levels = this.createLevelControl('music');
    const player = this.createThemePlayer();

    panel.append(header, levels, player);

    this.musicValue = value;

    return panel;
  }

  createCardsPanel() {
    const panel = createElement('section', {
      className: styles.tabPanel,
      attributes: {
        role: 'tabpanel',
        'aria-label': 'Cards settings',
      },
    });

    const description = createElement('p', {
      className: styles.description,
      textContent: 'Card set',
    });

    const cardSets = createElement('div', {
      className: styles.cardSets,
    });

    this.cardSetButtons = [];

    Object.values(CARD_SETS).forEach((cardSet) => {
      const button = this.createCardSetButton(cardSet);

      cardSets.append(button);
      this.cardSetButtons.push({
        button,
        id: cardSet.id,
      });
    });

    const note = createElement('p', {
      className: styles.cardSetNote,
      textContent: 'Changing the card set starts a new game.',
    });

    panel.append(description, cardSets, note);

    return panel;
  }

  createCardSetButton(cardSet) {
    const button = createElement('button', {
      className: styles.cardSet,
      attributes: {
        type: 'button',
        'aria-label': `Select ${cardSet.name} card set`,
        'aria-pressed': 'false',
      },
    });

    const image = createElement('img', {
      className: styles.cardSetImage,
      attributes: {
        src: `${import.meta.env.BASE_URL}assets/cards/${cardSet.folder}/${cardSet.back}`,
        alt: '',
        draggable: 'false',
      },
    });

    const name = createElement('span', {
      className: styles.cardSetName,
      textContent: cardSet.name,
    });

    button.append(image, name);

    button.addEventListener('click', () => {
      if (cardSet.id === this.cardSetId) {
        return;
      }

      this.cardSetId = cardSet.id;
      localStorage.setItem('memory-game-card-set', this.cardSetId);

      this.updateCardSetSelection();
      this.onCardSetChange(this.cardSetId);
    });

    return button;
  }

  loadCardSetId() {
    const savedCardSetId = localStorage.getItem('memory-game-card-set');

    return CARD_SETS[savedCardSetId] ? savedCardSetId : DEFAULT_CARD_SET_ID;
  }

  getCardSetId() {
    return this.cardSetId;
  }

  updateCardSetSelection() {
    this.cardSetButtons.forEach(({ button, id }) => {
      const isActive = id === this.cardSetId;

      button.classList.toggle(styles.active, isActive);
      button.setAttribute('aria-pressed', String(isActive));

      if (isActive) {
        button.dataset.noSound = 'true';
      } else {
        delete button.dataset.noSound;
      }
    });
  }

  createThemePlayer() {
    const player = createElement('div', {
      className: styles.player,
    });

    const progress = createElement('input', {
      className: styles.progress,
      attributes: {
        type: 'range',
        min: '0',
        max: '0',
        step: '0.1',
        value: '0',
        'aria-label': 'Theme music progress',
      },
    });

    const playerControls = createElement('div', {
      className: styles.playerControls,
    });

    const restartButton = createElement('button', {
      className: styles.playerButton,
      attributes: {
        type: 'button',
        'aria-label': 'Restart theme',
      },
    });

    const playButton = createElement('button', {
      className: `${styles.playerButton} ${styles.playButton}`,
      attributes: {
        type: 'button',
        'aria-label': 'Play theme',
      },
    });

    const time = createElement('div', {
      className: styles.time,
    });

    const currentTime = createElement('span', {
      className: styles.currentTime,
      textContent: '0:00',
    });

    const separator = createElement('span', {
      className: styles.timeSeparator,
      textContent: '/',
    });

    const duration = createElement('span', {
      className: styles.duration,
      textContent: '0:00',
    });

    restartButton.append(createRestartIcon());
    playButton.append(createPlayIcon());

    time.append(currentTime, separator, duration);
    playerControls.append(restartButton, playButton, time);
    player.append(progress, playerControls);

    progress.addEventListener('input', () => {
      soundManager.setThemeCurrentTime(Number(progress.value));
    });

    restartButton.addEventListener('click', () => {
      soundManager.restartTheme();
    });

    playButton.addEventListener('click', () => {
      soundManager.toggleThemePlayback();
    });

    this.progress = progress;
    this.restartButton = restartButton;
    this.playButton = playButton;
    this.currentTime = currentTime;
    this.duration = duration;

    return player;
  }

  createLevelControl(type) {
    const levels = createElement('div', {
      className: styles.levels,
      attributes: {
        role: 'group',
        'aria-label': type === 'effects' ? 'Effects volume' : 'Music volume',
      },
    });

    this.levelButtons = this.levelButtons || {};
    this.levelButtons[type] = [];

    soundManager.getVolumeLevels().forEach((volume, index) => {
      const levelButton = createElement('button', {
        className: styles.level,
        attributes: {
          type: 'button',
          'aria-label': `${volume}%`,
          'aria-pressed': 'false',
        },
      });

      const dot = createElement('span', {
        className: styles.dot,
      });

      const label = createElement('span', {
        className: styles.levelLabel,
        textContent: `${volume}%`,
      });

      levelButton.append(dot, label);

      levelButton.addEventListener('click', () => {
        const previousLevel =
          type === 'effects' ? soundManager.getEffectsLevel() : soundManager.getMusicLevel();

        if (type === 'effects') {
          soundManager.setEffectsLevel(index);
        } else {
          soundManager.setMusicLevel(index);
        }

        if (previousLevel === 0 && index > 0) {
          soundManager.play('buttonClick');
        }
      });

      levels.append(levelButton);
      this.levelButtons[type].push(levelButton);
    });

    return levels;
  }

  setActiveTab(tabName) {
    if (this.activeTab === tabName) {
      return;
    }

    this.activeTab = tabName;

    const isAudio = tabName === 'audio';
    const isCards = tabName === 'cards';

    this.audioTab.classList.toggle(styles.active, isAudio);
    this.cardsTab.classList.toggle(styles.active, isCards);

    this.audioTab.setAttribute('aria-selected', String(isAudio));
    this.cardsTab.setAttribute('aria-selected', String(isCards));

    this.audioPanel.hidden = !isAudio;
    this.cardsPanel.hidden = !isCards;
  }

  updateControlsState(isMuted, musicLevel) {
    const musicDisabled = isMuted || musicLevel === 0;

    this.levelButtons.effects.forEach((button) => {
      button.disabled = isMuted;
    });

    this.levelButtons.music.forEach((button) => {
      button.disabled = isMuted;
    });

    this.progress.disabled = musicDisabled;
    this.restartButton.disabled = musicDisabled;
    this.playButton.disabled = musicDisabled;
  }

  update() {
    const effectsLevel = soundManager.getEffectsLevel();
    const musicLevel = soundManager.getMusicLevel();
    const masterMuted = soundManager.isMasterMuted();

    this.updateLevels('effects', effectsLevel);
    this.updateLevels('music', musicLevel);

    this.effectsValue.textContent = `${soundManager.getEffectsPercent()}%`;
    this.musicValue.textContent = `${soundManager.getMusicPercent()}%`;

    this.masterButton.setAttribute('aria-pressed', String(masterMuted));
    this.masterButton.setAttribute(
      'aria-label',
      masterMuted ? 'Enable all sounds' : 'Mute all sounds',
    );
    this.masterLabel.textContent = masterMuted ? 'Sound on' : 'Mute all';

    this.updateControlsState(masterMuted, musicLevel);
  }

  updateThemePlayer(themePaused) {
    const currentTime = soundManager.getThemeCurrentTime();
    const duration = soundManager.getThemeDuration();

    this.progress.max = String(Math.max(duration, 0));
    this.progress.value = String(duration > 0 ? Math.min(currentTime, duration) : 0);
    this.currentTime.textContent = formatTime(currentTime);
    this.duration.textContent = formatTime(duration);
    this.playButton.setAttribute('aria-label', themePaused ? 'Play theme' : 'Pause theme');
    this.playButton.replaceChildren(themePaused ? createPlayIcon() : createPauseIcon());
  }

  updateLevels(type, activeLevel) {
    this.levelButtons[type].forEach((button, index) => {
      const isActive = index === activeLevel;

      button.classList.toggle(styles.active, isActive);
      button.setAttribute('aria-pressed', String(isActive));

      if (isActive) {
        button.dataset.noSound = 'true';
      } else {
        delete button.dataset.noSound;
      }
    });
  }

  destroy() {
    this.unsubscribe();
    this.floatingPanel.destroy();
  }
}

export { Settings };
