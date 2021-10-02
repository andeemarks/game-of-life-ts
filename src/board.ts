import chalk from "chalk";
import clear from "clear";
import Sparkline from "clui";
import boxConsole from "box-console";

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
        ? chalk.white.bold.bgBlackBright("֎")
        : chalk.yellow.bold.bgBlackBright("֎")
      : chalk.bgBlackBright(" ");
  }

  sparkline(data: number[], label: string): string {
    return Sparkline.Sparkline(data.slice(-22), " " + label) + "\n";
  }

  stats(stats: Observation): string {
    this.spawnCountHistory.push(stats.spawns.length);
    this.deathCountHistory.push(stats.deaths.length);
    this.thriveCountHistory.push(stats.thrives.length);
    return (
      this.sparkline(this.spawnCountHistory, chalk.yellow.bold("spawning")) +
      this.sparkline(this.deathCountHistory, "dying") +
      this.sparkline(this.thriveCountHistory, chalk.white.bold("thriving"))
    );
  }

  show(current: Generation): void {
    clear();

    console.log("Generation: " + current.id);

    const rows = [];
    for (let x = 0; x < current.width; x++) {
      let row = "";
      for (let y = 0; y < current.height; y++) {
        row += this.showCell(current.cells[x][y]);
      }
      rows.push(row);
    }

    boxConsole(rows);

    console.log(this.stats(current.updates));
  }
}
