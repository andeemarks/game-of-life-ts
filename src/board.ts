#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import boxen from "boxen";
import Generation from "./generation";
import Cell from "./cell";

export default class Board {
  show = (current: Generation) => {
    clear();
    console.log(
      chalk.yellow(
        figlet.textSync("Game of Life", { horizontalLayout: "full" })
      )
    );

    console.log("Generation: " + current.id());
    let board: string = "";
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        board += current.cells()[x][y].show();
      }
      board += "\n";
    }

    console.log(
      boxen(board, {
        padding: 0,
        margin: 0,
        borderStyle: "single",
        borderColor: "yellowBright",
        backgroundColor: "#222222",
      })
    );
  };
}
