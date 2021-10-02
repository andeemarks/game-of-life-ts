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

function setup(): any {
  let cli = new CommandLine();
  let options = cli.options;

  if (options.help) {
    cli.usage();
    exit(0);
  }

  if (options.blinker) {
    options = Presets.blinker;
  } else if (options.glider) {
    options = Presets.glider;
  } else if (options.block) {
    options = Presets.block;
  } else {
    options.seedlings = Presets.seedlings;
  }

  return options;
}

async function gameLoop(options: any): Promise<void> {
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

let options = setup();
gameLoop(options);

export {};
