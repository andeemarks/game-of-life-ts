#!/usr/bin/env node
import { Generation, EntropyError } from "./generation";
import Board from "./board";

function seed(gen: Generation): Generation {
  gen.seed(4, 5);
  gen.seed(5, 6);
  gen.seed(5, 7);
  gen.seed(4, 7);
  gen.seed(6, 7);

  return gen;
}

async function gameLoop(): Promise<void> {
  let current: Generation = new Generation(20, 20);
  current = seed(current);

  const board: Board = new Board();
  board.show(current);

  let isEvolving = true;
  while (isEvolving) {
    try {
      current = current.regenerate();
      board.show(current);
      await delay(250);
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
