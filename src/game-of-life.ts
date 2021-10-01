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

function seed(gen: Generation): Generation {
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
  } else {
    let current: Generation = new Generation(options.height, options.width);
    current = seed(current);

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
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

gameLoop();

export {};
