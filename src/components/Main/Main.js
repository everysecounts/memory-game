import { createElement } from '@/utils/createElement';
import { Game } from '@/components/Game';
import { Score } from '@/components/Score';
import { VictoryModal } from '@/components/VictoryModal';
import styles from './Main.module.css';

class Main {
  constructor() {
    this.score = new Score();

    this.victoryModal = new VictoryModal(() => {
      this.game.start();
    });

    this.game = new Game(this.score, (moves) => {
      this.victoryModal.open(moves);
    });

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
