import { NullObserver } from "./cell-observer";

export default class Cell {
  private alive = false;

  constructor(isAlive: boolean) {
    this.alive = isAlive;
  }

  isAlive(): boolean {
    return this.alive;
  }

  evolve(neighbourCount: number, observer = new NullObserver()): Cell {
    switch (neighbourCount) {
      case 2:
        if (this.isAlive()) {
          observer.cellSpawning();
          return new Cell(true);
        } else {
          observer.cellDying();
          return new Cell(false);
        }
      case 3:
        observer.cellSpawning();
        return new Cell(true);
      default:
        observer.cellDying();
        return new Cell(false);
    }
  }
}
