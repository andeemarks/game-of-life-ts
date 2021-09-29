import Generation from "../src/generation";
import Cell from "../src/cell";

describe("Generation", () => {
  describe("Creation", () => {
    it("defaults to 0 size", () => {
      expect(new Generation().cells().length).toBe(0);
    });

    it("defaults to first generation", () => {
      expect(new Generation().id()).toBe(1);
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
  });

  describe("Templating", () => {
    let original = new Generation(2, 2);
    original.update(0, 0, new Cell(true));
    let clone = original.template();

    it("increments id", () => {
      expect(clone.id()).toBe(2);
    });

    it("inherits size", () => {
      expect(clone.width).toBe(original.width);
      expect(clone.height).toBe(original.height);
    });

    it("resets population", () => {
      let cells = clone.cells();
      expect(cells[0][0].isAlive()).toBeFalsy();
      expect(cells[0][1].isAlive()).toBeFalsy();
      expect(cells[1][1].isAlive()).toBeFalsy();
      expect(cells[1][0].isAlive()).toBeFalsy();
    });
  });

  describe("Templating", () => {
    it("finds a full set of neighbours for a cell away from borders", () => {
      let neighbours = new Generation(3, 3).neighbours(1, 1);
      expect(neighbours.length).toBe(8);
    });

    it("finds only 3 neighbours for a cell in the corner", () => {
      let gen = new Generation(3, 3);
      expect(gen.neighbours(0, 0).length).toBe(3);
      expect(gen.neighbours(2, 2).length).toBe(3);
      expect(gen.neighbours(0, 2).length).toBe(3);
      expect(gen.neighbours(2, 0).length).toBe(3);
    });

    it("finds only 5 neighbours for a cell one a side", () => {
      let gen = new Generation(3, 3);
      expect(gen.neighbours(0, 1).length).toBe(5);
      expect(gen.neighbours(2, 1).length).toBe(5);
      expect(gen.neighbours(1, 0).length).toBe(5);
      expect(gen.neighbours(1, 2).length).toBe(5);
    });

    it("finds no populated neighbours in an empty generation", () => {
      let gen = new Generation(3, 3);
      expect(gen.populatedNeighbours(0, 1).length).toBe(0);
    });

    it("finds populated neighbours in a fully populated generation", () => {
      let gen = new Generation(2, 2);
      gen.update(0, 1, new Cell(true));
      gen.update(1, 1, new Cell(true));
      gen.update(1, 0, new Cell(true));
      expect(gen.populatedNeighbours(0, 0).length).toBe(3);
    });
  });
});
