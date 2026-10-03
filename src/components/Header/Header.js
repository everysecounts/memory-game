import { createElement } from '@/utils/createElement';
import styles from './Header.module.css';

class Header {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const header = createElement('header', {
      className: styles.header,
    });

    const newGameButton = createElement('button', {
      className: styles.button,
      textContent: 'Новая игра',
      attributes: {
        type: 'button',
      },
    });

    const leadersButton = createElement('button', {
      className: styles.button,
      textContent: 'Таблица лидеров',
      attributes: {
        type: 'button',
      },
    });

    header.append(newGameButton, leadersButton);
    return header;
  }
}

export { Header };
