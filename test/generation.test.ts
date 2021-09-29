import Generation from "../src/generation";
import Cell from "../src/cell";

describe("Generation", () => {
  it("defaults to 0 size", () => {
    expect(new Generation().cells().length).toBe(0);
  });

  it("holds all cells for specified dimensions", () => {
    let cells = new Generation(2, 3).cells();
    expect(cells.length).toBe(2);
    expect(cells[0].length).toBe(3);
    expect(cells[0][0]).toBeInstanceOf(Cell);
    expect(cells[0][1]).toBeInstanceOf(Cell);
    expect(cells[0][2]).toBeInstanceOf(Cell);
    expect(cells[1].length).toBe(3);
    expect(cells[1][0]).toBeInstanceOf(Cell);
    expect(cells[1][1]).toBeInstanceOf(Cell);
    expect(cells[1][2]).toBeInstanceOf(Cell);
  });

  it("finds a full set of neighbours for a cell away from borders", () => {
    let neighbours = new Generation(10, 10).neighbours(5, 5);
    expect(neighbours.length).toBe(8);
  });
});
