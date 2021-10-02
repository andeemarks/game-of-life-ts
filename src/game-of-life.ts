#!/usr/bin/env node
import { Generation, EntropyError } from "./generation";
import Board from "./board";
import CommandLine from "./cli";

const seedlings = [
  [4, 5],
  [5, 6],
  [5, 7],
  [4, 7],
  [6, 7],
];

const blinker = {
  width: 5,
  height: 5,
  delay: 250,
  seedlings: [
    [1, 2],
    [2, 2],
    [3, 2],
  ],
};

const block = {
  width: 4,
  height: 4,
  delay: 250,
  seedlings: [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ],
};

const glider = {
  width: 20,
  height: 20,
  delay: 250,
  seedlings: [
    [2, 1],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ],
};

function seed(gen: Generation, seedlings: number[][]): Generation {
  seedlings.forEach((seedling) => {
    gen.seed(seedling[0], seedling[1]);
  });

  return gen;
}

async function gameLoop(): Promise<void> {
  let cli = new CommandLine();
  let options = cli.options;

  if (options.help) {
    cli.usage();
    return;
  }

  if (options.blinker) {
    options = blinker;
  } else if (options.glider) {
    options = glider;
  } else if (options.block) {
    options = block;
  } else {
    options.seedlings = seedlings;
  }

  let current: Generation = new Generation(options.height, options.width);
  current = seed(current, options.seedlings);

  const board: Board = new Board();
  board.show(current);

  let isEvolving = true;
  while (isEvolving) {
    try {
      current = current.regenerate();
      board.show(current);
      await delay(options.delay);
    } catch (error) {
      if (error instanceof EntropyError) isEvolving = false;
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

gameLoop();

export {};
