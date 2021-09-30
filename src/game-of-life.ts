#!/usr/bin/env node
import Generation from "./generation";
import Board from "./board";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function seed(gen: Generation): Generation {
  gen.seed(4, 5);
  gen.seed(5, 6);
  gen.seed(5, 7);
  gen.seed(4, 7);
  gen.seed(6, 7);

  return gen;
}

async function gameLoop() {
  let current: Generation = new Generation(20, 20);
  const board: Board = new Board();

  current = seed(current);

  board.show(current);

  while (true) {
    current = current.regenerate();
    board.show(current);
    await delay(500);
  }
}

gameLoop();

export {};
