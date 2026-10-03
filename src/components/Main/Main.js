import { createElement } from '@/utils/createElement';
import { Game } from '@/components/Game';
import { Score } from '@/components/Score';
import styles from './Main.module.css';

class Main {
  constructor() {
    this.score = new Score();
    this.game = new Game();
    this.element = this.createElement();
  }

  createElement() {
    const main = createElement('main', {
      className: styles.main,
    });

    main.append(this.score.element, this.game.element);
    return main;
  }
}

export { Main };
