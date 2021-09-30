#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import boxen from "boxen";
import Generation from "./generation";
import Cell from "./cell";

function showCell(cell: Cell): String {
  return cell.isAlive
    ? cell.age > 1
      ? chalk.white.bold.bgBlack("֎")
      : chalk.yellow.bold.bgBlack("֎")
    : chalk.bgBlack(" ");
}

export default function show(current: Generation) {
  clear();
  console.log(
    chalk.yellow(figlet.textSync("Game of Life", { horizontalLayout: "full" }))
  );

  console.log("Generation: " + current.id);

  let board: string = "";
  for (let x = 0; x < current.width; x++) {
    for (let y = 0; y < current.height; y++) {
      board += showCell(current.cells[x][y]);
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

  console.log(chalk.white("Spawning cells: " + current.updates.spawns.length));
  console.log(
    chalk.yellow("Thriving cells: " + current.updates.thrives.length)
  );
  console.log(chalk.red("Dying cells: " + current.updates.deaths.length));
}
