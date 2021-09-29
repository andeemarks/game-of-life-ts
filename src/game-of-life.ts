#!/usr/bin/env node
import Generation from "./generation";
import Cell from "./cell";
import Board from "./board";

function updateBoard(current: Generation): Generation {
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

function seed(gen: Generation) {
  gen.update(4, 5, new Cell(true));
  gen.update(5, 6, new Cell(true));
  gen.update(5, 7, new Cell(true));
  gen.update(4, 7, new Cell(true));
  gen.update(6, 7, new Cell(true));
}

async function gameLoop() {
  let current: Generation = new Generation(20, 20);
  seed(current);

  new Board().show(current);

  while (true) {
    let next = updateBoard(current);
    if (next.equals(current)) {
      return; //TODO Need a more elegant way of handling steady state
    } else {
      current = next;
    }
    new Board().show(current);
    await delay(500);
  }
}

gameLoop();

export {};
