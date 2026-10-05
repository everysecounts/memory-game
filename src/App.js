import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { World } from '@/components/World';

class App {
  constructor(container) {
    this.container = container;

    this.world = new World();

    this.main = new Main((foundPairs) => {
      this.world.setProgress(foundPairs);
    });

    this.header = new Header(
      () => {
        this.main.handleNewGame();
      },
      () => {
        this.main.openLeaderboard();
      },
    );
  }

  start() {
    this.container.replaceChildren(this.world.element, this.header.element, this.main.element);
  }
}

export { App };
