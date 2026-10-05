import { createElement, createSvg } from '@/utils';
import styles from './RulesControl.module.css';

function createRulesIcon() {
  return createSvg(
    'svg',
    {
      class: styles.icon,
      viewBox: '0 0 32 32',
      'aria-hidden': 'true',
    },
    [
      createSvg('path', {
        d: 'M7 8h18v18H7z',
      }),
      createSvg('path', {
        d: 'M10 5h12v3H10z',
      }),
      createSvg('path', {
        d: 'M11 13h10M11 17h10M11 21h7',
      }),
      createSvg('path', {
        d: 'M7 8 5 10v16h18l4-4V8',
      }),
    ],
  );
}

class RulesControl {
  constructor() {
    this.isOpen = false;
    this.closeTimer = null;
    this.pointerInsideButton = false;
    this.pointerInsidePanel = false;

    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.element = this.createElement();

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
        'aria-label': 'How to play',
        'aria-expanded': 'false',
        'aria-haspopup': 'dialog',
        'data-no-sound': 'true',
      },
    });

    button.append(createRulesIcon());

    const panel = createElement('div', {
      className: styles.panel,
      attributes: {
        role: 'dialog',
        'aria-label': 'How to play',
        'aria-hidden': 'true',
      },
    });

    const ornament = createElement('div', {
      className: styles.ornament,
      textContent: '✦',
      attributes: {
        'aria-hidden': 'true',
      },
    });

    const title = createElement('h2', {
      className: styles.title,
      textContent: 'How to Play',
    });

    const subtitle = createElement('p', {
      className: styles.subtitle,
      textContent: 'The path to Olympus',
    });

    const rules = createElement('ol', {
      className: styles.rules,
    });

    const ruleTexts = [
      'Flip two cards.',
      'Find matching pairs.',
      'Remember their positions.',
      'Match all pairs to win.',
    ];

    ruleTexts.forEach((text) => {
      const rule = createElement('li', {
        className: styles.rule,
      });

      const ruleText = createElement('span', {
        className: styles.ruleText,
        textContent: text,
      });

      rule.append(ruleText);
      rules.append(rule);
    });

    const tip = createElement('div', {
      className: styles.tip,
    });

    const tipTitle = createElement('span', {
      className: styles.tipTitle,
      textContent: 'Tip',
    });

    const tipText = createElement('span', {
      className: styles.tipText,
      textContent: 'Fewer moves mean a better result.',
    });

    tip.append(tipTitle, tipText);

    panel.append(ornament, title, subtitle, rules, tip);

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

    this.button = button;
    this.panel = panel;

    wrapper.append(button);

    return wrapper;
  }

  isHoverDevice() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
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
}

export { RulesControl };
