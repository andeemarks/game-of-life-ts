import Cell from "../src/cell";

export default class Generation {
  // TODO: Is this the right naming convention?
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

  neighbours = (x: number, y: number): Cell[][] => {
    let neighbours = new Array();
    let left = x - 1;
    let right = x + 1;
    let top = y - 1;
    let bottom = y + 1;
    let width = this._cells.length;
    let height = this._cells[0].length;

    if (x > 0) neighbours.push(this._cells[left][y]); // left neighbour
    if (y > 0) neighbours.push(this._cells[x][top]); // top neighbour
    if (x > 0 && y > 0) neighbours.push(this._cells[left][top]); // top left neighbour
    if (x > 0 && y < height - 1) neighbours.push(this._cells[left][bottom]); // bottom left neighbour

    if (x < width - 1) neighbours.push(this._cells[right][y]); // right neighbour
    if (y < height - 1) neighbours.push(this._cells[x][bottom]); // bottom neighbour
    if (y > 0 && x < width - 1) neighbours.push(this._cells[right][top]); // top right neighbour
    if (x < width - 1 && y < height - 1)
      neighbours.push(this._cells[right][bottom]); // bottom right neighbour

    return neighbours;
  };
}
