#!/usr/bin/env node
import { Generation, EntropyError } from "./generation";
import Board from "./board";
import CommandLine from "./cli";
import Presets from "./presets";
import { exit } from "process";

type Config = {
  width: number;
  height: number;
  delay: number;
  seedlings: number[][];
};

class GameOfLife {
  private options: Config = this.setup();

  constructor() {
    this.gameLoop(this.options);
  }

  seed(gen: Generation, seedlings: number[][]): Generation {
    seedlings.forEach((seedling) => {
      gen.seed(seedling[0], seedling[1]);
    });

    return gen;
  }

  setup(): Config {
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

  async gameLoop(options: Config): Promise<void> {
    let current: Generation = new Generation(options.height, options.width);
    current = this.seed(current, options.seedlings);

    const board: Board = new Board();
    board.show(current);

    let isEvolving = true;
    while (isEvolving) {
      try {
        current = current.regenerate();
        board.show(current);
        await this.delay(options.delay);
      } catch (error) {
        if (error instanceof EntropyError) isEvolving = false;
      }
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

new GameOfLife();
