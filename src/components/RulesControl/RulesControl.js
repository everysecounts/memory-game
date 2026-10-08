import { createElement, createSvg } from '@/utils';
import { FloatingPanel } from '@/components/FloatingPanel';
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
    this.element = this.createElement();
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

    this.floatingPanel = new FloatingPanel({
      button,
      panel,
      openClass: styles.open,
      align: 'start',
    });

    wrapper.append(button);

    return wrapper;
  }

  destroy() {
    this.floatingPanel.destroy();
  }
}

export { RulesControl };
