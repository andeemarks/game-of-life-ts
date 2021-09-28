#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import boxen from "boxen";
import readline from "readline";

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
}

function updateBoard() {}

function gameLoop() {
  process.stdin.on("keypress", (_) => {
    updateBoard();
  });
}

setup();
gameLoop();

export {};
