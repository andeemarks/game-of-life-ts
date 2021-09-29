const chalk = require("chalk");
export default class Cell {
  private alive = false;

  constructor(isAlive: boolean) {
    this.alive = isAlive;
  }

  isAlive(): boolean {
    return this.alive;
  }

  evolve(neighbourCount: number): Cell {
    switch (neighbourCount) {
      case 2:
        if (this.isAlive()) {
          return new Cell(true);
        } else {
          return new Cell(false);
        }
      case 3:
        return new Cell(true);
      default:
        return new Cell(false);
    }
  }

  show(): string {
    return this.alive ? chalk.bgYellow("  ") : chalk.bgGray("  ");
  }
}
