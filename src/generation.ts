import Cell from "../src/cell";

export default class Generation {
  private _cells: Cell[][];

  constructor(maxX: number = 0, maxY: number = 0) {
    this._cells = new Array(maxX);
    for (let x = 0; x < maxX; x++) {
      this._cells[x] = new Array(maxY);
      for (let y = 0; y < maxY; y++) {
        this._cells[x][y] = new Cell(false);
      }
    }
  }

  cells = (): Cell[][] => {
    return this._cells;
  };
}
