import Cell from "../src/cell";

describe("Cell", () => {
  it("can tell you the state", () => {
    expect(new Cell(true).isAlive()).toBeTruthy();
    expect(new Cell(false).isAlive()).toBeFalsy();
  });

  describe("dead cells", () => {
    it("spawn with 3 neighbours", () => {
      expect(new Cell(false).evolve(3).isAlive()).toBeTruthy();
    });
    it("remain dead with any other neightbour count", () => {
      expect(new Cell(false).evolve(1).isAlive()).toBeFalsy();
      expect(new Cell(false).evolve(2).isAlive()).toBeFalsy();
      expect(new Cell(false).evolve(4).isAlive()).toBeFalsy();
      expect(new Cell(false).evolve(5).isAlive()).toBeFalsy();
      expect(new Cell(false).evolve(6).isAlive()).toBeFalsy();
      expect(new Cell(false).evolve(7).isAlive()).toBeFalsy();
      expect(new Cell(false).evolve(8).isAlive()).toBeFalsy();
    });
  });

  describe("live cells", () => {
    it("die when overcrowded", () => {
      expect(new Cell(true).evolve(4).isAlive()).toBeFalsy();
      expect(new Cell(true).evolve(5).isAlive()).toBeFalsy();
      expect(new Cell(true).evolve(6).isAlive()).toBeFalsy();
      expect(new Cell(true).evolve(7).isAlive()).toBeFalsy();
      expect(new Cell(true).evolve(8).isAlive()).toBeFalsy();
    });

    it("die when lonely", () => {
      expect(new Cell(true).evolve(0).isAlive()).toBeFalsy();
      expect(new Cell(true).evolve(1).isAlive()).toBeFalsy();
    });

    it("survive with the right number of neighbours", () => {
      expect(new Cell(true).evolve(2).isAlive()).toBeTruthy();
      expect(new Cell(true).evolve(3).isAlive()).toBeTruthy();
    });
  });
});
