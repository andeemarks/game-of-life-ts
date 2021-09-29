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

function gameLoop() {
  let current: Generation = new Generation(10, 10);

  current.update(4, 5, new Cell(true));
  current.update(5, 5, new Cell(true));
  current.update(6, 5, new Cell(true));
  new Board().show(current);

  process.stdin.on("keypress", (_) => {
    current = updateBoard(current);
    new Board().show(current);
  });
}

setup();
gameLoop();

export {};
