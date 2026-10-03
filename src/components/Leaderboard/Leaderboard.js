const STORAGE_KEY = 'memory-game-leaderboard';
const MAX_RESULTS = 10;

class Leaderboard {
  getResults() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  saveResult(moves) {
    const results = this.getResults();

    results.push({
      moves,
      date: this.getCurrentDate(),
    });

    results.sort((first, second) => {
      if (first.moves !== second.moves) {
        return first.moves - second.moves;
      }
      return this.parseDate(first.date) - this.parseDate(second.date);
    });

    const topResults = results.slice(0, MAX_RESULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topResults));
    return topResults;
  }

  getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  parseDate(dateString) {
    const [day, month, year] = dateString.split('.');
    return new Date(year, month - 1, day).getTime();
  }
}

export { Leaderboard };
