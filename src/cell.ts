import { NullObserver } from "./cell-observer";

export default class Cell {
  private alive = false;
  private _age = 0;

  constructor(isAlive: boolean, age: number = 1) {
    this.alive = isAlive;
    this._age = age;
  }

  isAlive(): boolean {
    return this.alive;
  }

  age(): number {
    return this._age;
  }

  evolve(neighbourCount: number, observer = new NullObserver()): Cell {
    switch (neighbourCount) {
      case 2:
        if (this.isAlive()) {
          observer.cellSpawning();
          return new Cell(true, 2);
        } else {
          observer.cellDying();
          return new Cell(false, 0);
        }
      case 3:
        observer.cellSpawning();
        if (this.isAlive()) {
          return new Cell(true, 2);
        } else {
          return new Cell(true, 1);
        }
      default:
        observer.cellDying();
        return new Cell(false, 0);
    }
  }
}
