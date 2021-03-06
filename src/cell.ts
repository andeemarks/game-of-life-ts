import { NullObserver } from "./cell-observer";

export default class Cell {
  private _isAlive = false;
  private _age = 0;

  constructor(isAlive: boolean, age: number = 1) {
    this._isAlive = isAlive;
    this._age = age;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  get age(): number {
    return this._age;
  }

  evolve(neighbourCount: number, observer = new NullObserver()): Cell {
    switch (neighbourCount) {
      case 2:
        if (this.isAlive) {
          observer.cellThriving();
          return new Cell(true, 2);
        } else {
          observer.cellSpawning();
          return new Cell(false, 0);
        }
      case 3:
        if (this.isAlive) {
          observer.cellThriving();
          return new Cell(true, 2);
        } else {
          observer.cellSpawning();
          return new Cell(true, 1);
        }
      default:
        if (this.isAlive) {
          observer.cellDying();
        }
        return new Cell(false, 0);
    }
  }
}
