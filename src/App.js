import { Header } from '@/components/Header';
import { Main } from '@/components/Main';

class App {
  constructor(container) {
    this.container = container;
    this.main = new Main();
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
    this.container.replaceChildren(this.header.element, this.main.element);
  }
}

export { App };
