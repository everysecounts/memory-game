class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.moves = 0;
    this.foundPairs = 0;
    this.selectedCards = [];
    this.isLocked = false;
    this.isFinished = false;
  }
}

export { GameState };
