#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import boxen from "boxen";
import Generation from "./generation";

export default function show(current: Generation) {
  clear();
  console.log(
    chalk.yellow(figlet.textSync("Game of Life", { horizontalLayout: "full" }))
  );

  console.log("Generation: " + current.id);

  let board: string = "";
  for (let x = 0; x < current.width; x++) {
    for (let y = 0; y < current.height; y++) {
      let cell = current.cells[x][y];
      board += cell.isAlive
        ? cell.age > 1
          ? chalk.white.bold.bgBlack("֎")
          : chalk.yellow.bold.bgBlack("֎")
        : chalk.bgBlack(" ");
    }
    board += "\n";
  }

  console.log(
    boxen(board, {
      padding: 0,
      margin: 0,
      borderStyle: "single",
      borderColor: "yellowBright",
    })
  );

  console.log(current.updates);
}
