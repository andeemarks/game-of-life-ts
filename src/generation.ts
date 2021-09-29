import Cell from "../src/cell";

export default class Generation {
  // TODO: Is this the right naming convention?
  private _cells: Cell[][];
  public readonly width: number;
  public readonly height: number;
  private _id: number;

  constructor(width: number = 0, height: number = 0) {
    this._cells = new Array(width);
    for (let x = 0; x < width; x++) {
      this._cells[x] = new Array(height);
      for (let y = 0; y < height; y++) {
        this._cells[x][y] = new Cell(false);
      }
    }

    this._id = 1;
    this.width = width;
    this.height = height;
  }

  template = (): Generation => {
    let clone = new Generation(this.width, this.height);
    clone._id = this._id + 1;

    return clone;
  };

  evolve = (x: number, y: number): Cell => {
    let neighbours: Cell[] = this.populatedNeighbours(x, y);

    return this._cells[x][y].evolve(neighbours.length);
  };

  update = (x: number, y: number, cell: Cell) => {
    this._cells[x][y] = cell;
  };

  cells = (): Cell[][] => {
    return this._cells;
  };

  id = (): number => {
    return this._id;
  };

  neighbours = (x: number, y: number): Cell[] => {
    let neighbours = new Array();
    let left = x - 1;
    let right = x + 1;
    let top = y - 1;
    let bottom = y + 1;

    if (x > 0) neighbours.push(this._cells[left][y]); // left neighbour
    if (y > 0) neighbours.push(this._cells[x][top]); // top neighbour
    if (x > 0 && y > 0) neighbours.push(this._cells[left][top]); // top left neighbour
    if (x > 0 && y < this.height - 1)
      neighbours.push(this._cells[left][bottom]); // bottom left neighbour

    if (x < this.width - 1) neighbours.push(this._cells[right][y]); // right neighbour
    if (y < this.height - 1) neighbours.push(this._cells[x][bottom]); // bottom neighbour
    if (y > 0 && x < this.width - 1) neighbours.push(this._cells[right][top]); // top right neighbour
    if (x < this.width - 1 && y < this.height - 1)
      neighbours.push(this._cells[right][bottom]); // bottom right neighbour

    return neighbours;
  };

  populatedNeighbours = (x: number, y: number): Cell[] => {
    return this.neighbours(x, y).filter((cell) => {
      return cell.isAlive();
    });
  };
}
