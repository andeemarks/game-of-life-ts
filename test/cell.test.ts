import Cell from "../src/cell";

describe("Cell", () => {
  it("can tell you the state", () => {
    expect(new Cell(true).isAlive).toBeTruthy();
    expect(new Cell(false).isAlive).toBeFalsy();
  });

  describe("dead cells", () => {
    const deadCell = new Cell(false);
    it("spawn with 3 neighbours", () => {
      expect(deadCell.evolve(3).isAlive).toBeTruthy();
    });
    it("remain dead with any other neightbour count", () => {
      expect(deadCell.evolve(1).isAlive).toBeFalsy();
      expect(deadCell.evolve(2).isAlive).toBeFalsy();
      expect(deadCell.evolve(4).isAlive).toBeFalsy();
      expect(deadCell.evolve(5).isAlive).toBeFalsy();
      expect(deadCell.evolve(6).isAlive).toBeFalsy();
      expect(deadCell.evolve(7).isAlive).toBeFalsy();
      expect(deadCell.evolve(8).isAlive).toBeFalsy();
    });
  });

  describe("live cells", () => {
    const liveCell = new Cell(true);
    it("die when overcrowded", () => {
      expect(liveCell.evolve(4).isAlive).toBeFalsy();
      expect(liveCell.evolve(5).isAlive).toBeFalsy();
      expect(liveCell.evolve(6).isAlive).toBeFalsy();
      expect(liveCell.evolve(7).isAlive).toBeFalsy();
      expect(liveCell.evolve(8).isAlive).toBeFalsy();
    });

    it("die when lonely", () => {
      expect(liveCell.evolve(0).isAlive).toBeFalsy();
      expect(liveCell.evolve(1).isAlive).toBeFalsy();
    });

    it("thrive with the right number of neighbours", () => {
      expect(liveCell.evolve(2).isAlive).toBeTruthy();
      expect(liveCell.evolve(2).age).toBe(2);
      expect(liveCell.evolve(3).isAlive).toBeTruthy();
      expect(liveCell.evolve(3).age).toBe(2);
    });
  });
});
