#!/usr/bin/env node
import readline from "readline";
import Generation from "./generation";
import Cell from "./cell";
import Board from "./board";

function setup() {
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
}

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

async function gameLoop() {
  let current: Generation = new Generation(20, 20);

  current.update(4, 5, new Cell(true));
  current.update(5, 6, new Cell(true));
  current.update(5, 7, new Cell(true));
  current.update(4, 7, new Cell(true));
  current.update(6, 7, new Cell(true));
  new Board().show(current);

  while (true) {
    let next = updateBoard(current);
    if (next == current) {
      return;
    } else {
      current = next;
    }
    new Board().show(current);
    await delay(500);
  }
}

setup();
gameLoop();

export {};
