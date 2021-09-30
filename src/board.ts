import chalk from "chalk";
import clear from "clear";
import Sparkline from "clui";

import boxen from "boxen";
import { Generation } from "./generation";
import Cell from "./cell";
import { Observation } from "./cell-observer";

export default class Board {
  private spawnCountHistory: number[] = [];
  private deathCountHistory: number[] = [];
  private thriveCountHistory: number[] = [];

  showCell(cell: Cell): string {
    return cell.isAlive
      ? cell.age > 1
        ? chalk.white.bold.bgBlack("֎")
        : chalk.yellow.bold.bgBlack("֎")
      : chalk.bgBlack(" ");
  }

  sparkline(data: number[], label: string): string {
    return Sparkline.Sparkline(data.slice(-22), " " + label) + "\n";
  }

  stats(stats: Observation): string {
    this.spawnCountHistory.push(stats.spawns.length);
    this.deathCountHistory.push(stats.deaths.length);
    this.thriveCountHistory.push(stats.thrives.length);
    return (
      this.sparkline(this.spawnCountHistory, "spawning") +
      this.sparkline(this.deathCountHistory, "dying") +
      this.sparkline(this.thriveCountHistory, "thriving")
    );
  }

  show(current: Generation): void {
    clear();

    console.log("Generation: " + current.id);

    let board = "";
    for (let x = 0; x < current.width; x++) {
      for (let y = 0; y < current.height; y++) {
        board += this.showCell(current.cells[x][y]);
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

    console.log(this.stats(current.updates));
  }
}
