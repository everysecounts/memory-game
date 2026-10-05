import { createElement, soundManager } from '@/utils';
import { Game } from '@/components/Game';
import { Score } from '@/components/Score';
import { VictoryModal } from '@/components/VictoryModal';
import { Leaderboard } from '@/components/Leaderboard';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import styles from './Main.module.css';

class Main {
  constructor(onProgress) {
    this.score = new Score();

    this.leaderboard = new Leaderboard();
    this.leaderboardModal = new LeaderboardModal(this.leaderboard);

    this.victoryModal = new VictoryModal(() => {
      this.handleNewGame();
    });

    this.game = new Game(
      this.score,
      (moves) => {
        this.handleGameFinish(moves);
      },
      onProgress,
    );

    this.element = this.createElement();
  }

  createElement() {
    const main = createElement('main', {
      className: styles.main,
    });

    main.append(this.score.element, this.game.element);
    return main;
  }

  handleGameFinish(moves) {
    soundManager.play('victory');
    this.leaderboard.saveResult(moves);
    this.victoryModal.open(moves);
  }

  handleNewGame() {
    this.victoryModal.close();
    this.leaderboardModal.close();
    this.game.restart();
  }

  openLeaderboard() {
    this.leaderboardModal.open();
  }
}

export { Main };
