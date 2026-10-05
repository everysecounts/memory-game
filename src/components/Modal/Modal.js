import { createElement } from '@/utils/createElement';
import styles from './Modal.module.css';

class Modal {
  constructor({ variant } = {}) {
    this.variant = variant;
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.element = this.createElement();
  }

  createElement() {
    const overlay = createElement('div', {
      className: this.variant === 'scene' ? `${styles.overlay} ${styles.scene}` : styles.overlay,
      attributes: {
        role: 'dialog',
        'aria-modal': 'true',
      },
    });

    this.content = createElement('div', {
      className: styles.content,
    });

    overlay.append(this.content);
    overlay.addEventListener('click', this.handleOverlayClick);

    return overlay;
  }

  handleOverlayClick(event) {
    if (event.target === this.element) {
      this.close();
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open(content) {
    this.content.replaceChildren(content);

    if (!this.element.isConnected) {
      document.body.append(this.element);
    }

    document.removeEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keydown', this.handleKeyDown);
    document.body.classList.add('modal-open');
  }

  close() {
    this.element.remove();
    document.removeEventListener('keydown', this.handleKeyDown);
    document.body.classList.remove('modal-open');
  }
}

export { Modal };
