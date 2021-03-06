import Cell from "../src/cell";
import { RecordingObserver, Observation } from "./cell-observer";

export class EntropyError extends Error {}

export class Generation {
  private _cells: Cell[][];
  private _id: number;
  private _updates: Observation = new Observation([""], [""], [""]);
  private observer: RecordingObserver = new RecordingObserver();

  constructor(
    public readonly width: number = 0,
    public readonly height: number = 0
  ) {
    this._cells = new Array(width);
    for (let x = 0; x < width; x++) {
      this._cells[x] = new Array(height);
      for (let y = 0; y < height; y++) {
        this._cells[x][y] = new Cell(false);
      }
    }

    this._id = 1;
  }

  get updates(): Observation {
    return this._updates;
  }

  regenerate = (): Generation => {
    const next = this.template();
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        next.update(x, y, this.evolve(x, y));
      }
    }

    next._updates = this.observer.record();

    if (this.equals(next)) {
      throw new EntropyError("Steady state found at generation " + this._id);
    }

    return next;
  };

  template = (): Generation => {
    const clone = new Generation(this.width, this.height);
    clone._id = this._id + 1;

    return clone;
  };

  evolve = (x: number, y: number): Cell => {
    const neighbours: Cell[] = this.populatedNeighbours(x, y);

    this.observer.location(x, y);

    return this._cells[x][y].evolve(neighbours.length, this.observer);
  };

  update = (x: number, y: number, cell: Cell = new Cell(true)): void => {
    this._cells[x][y] = cell;
  };

  seed = (x: number, y: number): void => {
    this.update(x, y);
  };

  get cells(): Cell[][] {
    return this._cells;
  }

  get id(): number {
    return this._id;
  }

  equals = (other: Generation): boolean => {
    return JSON.stringify(this.cells) === JSON.stringify(other.cells);
  };

  neighbours = (x: number, y: number): Cell[] => {
    const neighbours = [];
    const left = x - 1;
    const right = x + 1;
    const top = y - 1;
    const bottom = y + 1;

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
      return cell.isAlive;
    });
  };
}
