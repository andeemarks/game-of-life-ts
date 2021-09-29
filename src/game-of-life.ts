#!/usr/bin/env node
import Generation from "./generation";
import Cell from "./cell";
import showBoard from "./board";

function regenerate(current: Generation): Generation {
  let next = current.template();
  for (let x = 0; x < current.width; x++) {
    for (let y = 0; y < current.height; y++) {
      next.update(x, y, current.evolve(x, y));
    }
  }

  return next;
}

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
  current = seed(current);

  showBoard(current);

  while (true) {
    let next = regenerate(current);
    if (next.equals(current)) {
      return; //TODO Need a more elegant way of handling steady state
    } else {
      current = next;
    }
    showBoard(current);
    await delay(500);
  }
}

gameLoop();

export {};
