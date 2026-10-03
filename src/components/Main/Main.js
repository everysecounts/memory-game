import { createElement } from '@/utils/createElement';
import styles from './Main.module.css';

class Main {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    return createElement('main', {
      className: styles.main,
    });
  }
}

export { Main };
