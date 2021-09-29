#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import boxen from "boxen";
import readline from "readline";
import Generation from "./generation";
import Cell from "./cell";

let current: Generation = new Generation(10, 10);

function setup() {
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  clear();
  console.log(
    chalk.yellow(figlet.textSync("Game of Life", { horizontalLayout: "full" }))
  );

  current.update(4, 5, new Cell(true));
  current.update(5, 5, new Cell(true));
  current.update(6, 5, new Cell(true));
  showBoard(current.cells());
}

function showBoard(cells: Cell[][]) {
  let board: string = "";
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      board += cells[x][y].show();
    }
    board += "\n";
  }

  console.log(
    boxen(board, {
      padding: 0,
      margin: 0,
      borderStyle: "doubleSingle",
      borderColor: "yellowBright",
      backgroundColor: "#222222",
    })
  );
}

function updateBoard() {
  console.log("updating board...");
  let next: Generation = new Generation(10, 10);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      next.update(x, y, current.evolve(x, y));
    }
  }

  current = next;
  showBoard(current.cells());
}

function gameLoop() {
  process.stdin.on("keypress", (_) => {
    updateBoard();
  });
}

setup();
gameLoop();

export {};
