import { createElement, createSvg } from '@/utils';
import { createSoundIcon } from '@/utils/createSoundIcon';
import { soundManager } from '@/utils/soundManager';
import styles from './SoundControl.module.css';

const VOLUME_LEVELS = [0, 20, 50, 100];

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

class SoundControl {
  constructor() {
    this.isOpen = false;
    this.activeTab = 'effects';
    this.closeTimer = null;
    this.pointerInsideButton = false;
    this.pointerInsidePanel = false;

    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.element = this.createElement();

    this.unsubscribe = soundManager.subscribe(() => {
      this.update();
    });

    this.update();

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll, true);
  }

  createElement() {
    const wrapper = createElement('div', {
      className: styles.control,
    });

    const button = createElement('button', {
      className: styles.button,
      attributes: {
        type: 'button',
        'aria-label': 'Audio settings',
        'aria-expanded': 'false',
        'aria-haspopup': 'dialog',
        'data-no-sound': 'true',
      },
    });

    const icon = createSoundIcon();

    icon.svg.classList.add(styles.icon);
    button.append(icon.svg);

    const panel = createElement('div', {
      className: styles.panel,
      attributes: {
        role: 'dialog',
        'aria-label': 'Audio settings',
        'aria-hidden': 'true',
      },
    });

    const panelHeader = createElement('div', {
      className: styles.panelHeader,
    });

    const title = createElement('h2', {
      className: styles.title,
      textContent: 'Audio Settings',
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
      className: styles.masterLabel,
      textContent: 'Mute all',
    });

    masterButton.append(masterLabel);
    panelHeader.append(title, masterButton);

    const tabs = createElement('div', {
      className: styles.tabs,
      attributes: {
        role: 'tablist',
        'aria-label': 'Audio settings',
      },
    });

    const effectsTab = this.createTab('effects', 'Effects');
    const musicTab = this.createTab('music', 'Music');

    tabs.append(effectsTab, musicTab);

    const effectsPanel = this.createEffectsPanel();
    const musicPanel = this.createMusicPanel();

    panel.append(panelHeader, tabs, effectsPanel, musicPanel);

    button.addEventListener('mouseenter', () => {
      this.pointerInsideButton = true;

      if (this.isHoverDevice()) {
        this.clearCloseTimer();
        this.open();
      }
    });

    button.addEventListener('mouseleave', () => {
      this.pointerInsideButton = false;

      if (this.isHoverDevice()) {
        this.scheduleClose();
      }
    });

    panel.addEventListener('mouseenter', () => {
      this.pointerInsidePanel = true;
      this.clearCloseTimer();
    });

    panel.addEventListener('mouseleave', () => {
      this.pointerInsidePanel = false;

      if (this.isHoverDevice()) {
        this.scheduleClose();
      }
    });

    button.addEventListener('click', (event) => {
      if (this.isHoverDevice()) {
        event.preventDefault();
        return;
      }

      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    });

    masterButton.addEventListener('click', () => {
      soundManager.toggleMasterMute();
    });

    this.button = button;
    this.panel = panel;
    this.masterButton = masterButton;
    this.masterLabel = masterLabel;
    this.effectsTab = effectsTab;
    this.musicTab = musicTab;
    this.effectsPanel = effectsPanel;
    this.musicPanel = musicPanel;

    wrapper.append(button);

    return wrapper;
  }

  isHoverDevice() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
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

  createEffectsPanel() {
    const panel = createElement('section', {
      className: styles.tabPanel,
      attributes: {
        role: 'tabpanel',
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
      className: styles.tabPanel,
      attributes: {
        role: 'tabpanel',
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
      className: `${styles.playerButton} ${styles.restartButton}`,
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

    VOLUME_LEVELS.forEach((volume, index) => {
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
        if (type === 'effects') {
          soundManager.setEffectsLevel(index);
        } else {
          soundManager.setMusicLevel(index);
        }
      });

      levels.append(levelButton);
      this.levelButtons[type].push(levelButton);
    });

    return levels;
  }

  setActiveTab(tabName) {
    this.activeTab = tabName;

    const isEffects = tabName === 'effects';

    this.effectsTab.classList.toggle(styles.active, isEffects);
    this.musicTab.classList.toggle(styles.active, !isEffects);

    this.effectsTab.setAttribute('aria-selected', String(isEffects));
    this.musicTab.setAttribute('aria-selected', String(!isEffects));

    this.effectsPanel.hidden = !isEffects;
    this.musicPanel.hidden = isEffects;
  }

  updateControlsState(isMuted) {
    this.levelButtons.effects.forEach((button) => {
      button.disabled = isMuted;
    });

    this.levelButtons.music.forEach((button) => {
      button.disabled = isMuted;
    });

    this.progress.disabled = isMuted;
    this.restartButton.disabled = isMuted;
    this.playButton.disabled = isMuted;
  }

  open() {
    this.clearCloseTimer();

    if (!this.panel.isConnected) {
      document.body.append(this.panel);
    }

    this.isOpen = true;

    this.panel.classList.add(styles.open);
    this.panel.setAttribute('aria-hidden', 'false');
    this.button.setAttribute('aria-expanded', 'true');

    this.positionPanel();
  }

  close() {
    this.clearCloseTimer();

    if (this.panel.contains(document.activeElement)) {
      this.button.focus();
    }

    this.isOpen = false;

    this.panel.classList.remove(styles.open);
    this.panel.setAttribute('aria-hidden', 'true');
    this.button.setAttribute('aria-expanded', 'false');
  }

  scheduleClose() {
    this.clearCloseTimer();

    this.closeTimer = setTimeout(() => {
      if (!this.isPointerInside()) {
        this.close();
      }
    }, 200);
  }

  clearCloseTimer() {
    if (this.closeTimer === null) {
      return;
    }

    clearTimeout(this.closeTimer);
    this.closeTimer = null;
  }

  isPointerInside() {
    return this.pointerInsideButton || this.pointerInsidePanel;
  }

  handleResize() {
    if (!this.isOpen) {
      return;
    }

    this.positionPanel();
  }

  handleScroll() {
    if (!this.isOpen) {
      return;
    }

    this.positionPanel();
  }

  positionPanel() {
    const rect = this.button.getBoundingClientRect();
    const panelWidth = this.panel.offsetWidth;
    const panelHeight = this.panel.offsetHeight;
    const gap = 8;
    const viewportPadding = 12;

    let left = rect.right - panelWidth;
    let top = rect.bottom + gap;

    const maxLeft = window.innerWidth - panelWidth - viewportPadding;
    const maxTop = window.innerHeight - panelHeight - viewportPadding;

    left = Math.max(viewportPadding, Math.min(left, maxLeft));

    if (top > maxTop) {
      top = rect.top - panelHeight - gap;
    }

    top = Math.max(viewportPadding, top);

    this.panel.style.left = `${left}px`;
    this.panel.style.right = 'auto';
    this.panel.style.top = `${top}px`;
  }

  update() {
    const effectsLevel = soundManager.getEffectsLevel();
    const musicLevel = soundManager.getMusicLevel();
    const masterMuted = soundManager.isMasterMuted();
    const themePaused = soundManager.isThemePaused();

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

    this.updateThemePlayer(themePaused);
    this.updateControlsState(masterMuted);

    this.setActiveTab(this.activeTab);
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
    });
  }
}

export { SoundControl };
