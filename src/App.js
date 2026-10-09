import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { World } from '@/components/World';

class App {
  constructor(container) {
    this.container = container;

    this.world = new World();

    this.header = new Header(
      () => {
        this.main.handleNewGame();
      },
      () => {
        this.main.openLeaderboard();
      },
      (cardSetId) => {
        this.main.handleCardSetChange(cardSetId);
      },
    );

    this.main = new Main((foundPairs) => {
      this.world.setProgress(foundPairs);
    }, this.header.settings.getCardSetId());
  }

  start() {
    this.container.replaceChildren(this.world.element, this.header.element, this.main.element);
  }
}

export { App };
