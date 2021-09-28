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
        return this.alive ? new Cell(true) : new Cell(false);
      case 3:
        return new Cell(true);
      default:
        return new Cell(false);
    }
  }
}
