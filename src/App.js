import { Header } from '@/components/Header';
import { Main } from '@/components/Main';

class App {
  constructor(container) {
    this.container = container;
    this.header = new Header();
    this.main = new Main();
  }

  start() {
    this.container.replaceChildren(this.header.element, this.main.element);
  }
}

export { App };
