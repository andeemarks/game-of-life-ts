#!/usr/bin/env node
import { Generation, EntropyError } from "./generation";
import Board from "./board";
import CommandLine from "./cli";
import Presets from "./presets";
import { exit } from "process";

function seed(gen: Generation, seedlings: number[][]): Generation {
  seedlings.forEach((seedling) => {
    gen.seed(seedling[0], seedling[1]);
  });

  return gen;
}

function setup(): {
  width: number;
  height: number;
  delay: number;
  seedlings: number[][];
} {
  const cli = new CommandLine();
  const options = cli.options;

  if (options.help) {
    cli.usage();
    exit(0);
  }

  if (options.blinker) {
    return Presets.blinker;
  } else if (options.glider) {
    return Presets.glider;
  } else if (options.block) {
    return Presets.block;
  } else {
    return {
      width: options.width,
      height: options.height,
      delay: options.delay,
      seedlings: Presets.seedlings,
    };
  }
}

async function gameLoop(options: {
  width: number;
  height: number;
  delay: number;
  seedlings: number[][];
}): Promise<void> {
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

const options = setup();
gameLoop(options);

export {};
