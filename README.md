# Memory of Olympus

A browser-based memory card game inspired by Ancient Greece.

## About the game

**Memory of Olympus** is a classic memory matching game where the goal is to find all matching pairs of cards.

The game includes:

- 8 pairs of cards — 16 cards in total;
- random card shuffling at the start of every game;
- move and matched-pair counters;
- victory screen with the final number of moves;
- leaderboard with the best results saved in `localStorage`;
- sound effects and background music;
- game rules panel;
- responsive layout for desktop and mobile devices.

## How to play

1. Open any card to reveal its image.
2. Open a second card.
3. If the cards match, the pair remains open.
4. If they do not match, both cards are closed after a short delay.
5. Continue until all 8 pairs are found.
6. Try to complete the game in as few moves as possible.

## Technologies

- JavaScript
- Vite
- CSS Modules
- HTML5
- CSS3
- ESLint
- Stylelint
- Prettier

## Run locally

Make sure you have **Node.js** and **npm** installed.

Clone the repository:

```bash
git clone https://github.com/everysecounts/memory-game.git
```

Navigate to the project directory:

```bash
cd memory-game
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Code quality

Run ESLint:

```bash
npm run lint
```

Format the project with Prettier:

```bash
npm run format
```
