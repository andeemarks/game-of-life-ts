import Generation from "../src/generation";
import Cell from "../src/cell";

describe("Generation", () => {
  it("holds all cells for specified dimensions", () => {
    expect(new Generation().cells().length).toBe(0);
    expect(new Generation(1, 1).cells().length).toBe(1);
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
});
