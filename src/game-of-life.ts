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

const spinner = {
  width: 5,
  height: 5,
  delay: 250,
  seedlings: [
    [1, 2],
    [2, 2],
    [3, 2],
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

  var current: Generation = new Generation(options.height, options.width);
  if (options.spinner) {
    options = spinner;
    current = new Generation(options.height, options.width);
    current = seed(current, spinner.seedlings);
  } else if (options.glider) {
    options = glider;
    current = new Generation(options.height, options.width);
    current = seed(current, glider.seedlings);
  } else {
    current = new Generation(options.height, options.width);
    current = seed(current, seedlings);
  }

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
