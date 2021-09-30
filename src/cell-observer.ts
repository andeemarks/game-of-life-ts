export class Observation {
  constructor(
    public readonly spawns: String[],
    public readonly deaths: String[],
    public readonly thrives: String[]
  ) {}
}

interface CellObserver {
  cellSpawning(): void;
  cellDying(): void;
  cellThriving(): void;
}

export class RecordingObserver implements CellObserver {
  private spawnEvents: String[] = [];
  private deathEvents: String[] = [];
  private thriveEvents: String[] = [];
  private x: number = 0;
  private y: number = 0;

  location = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };

  cellSpawning = () => {
    this.spawnEvents.push(this.x + "x" + this.y);
  };

  cellThriving = () => {
    this.thriveEvents.push(this.x + "x" + this.y);
  };

  cellDying = () => {
    this.deathEvents.push(this.x + "x" + this.y);
  };

  record = (): Observation => {
    return new Observation(
      this.spawnEvents,
      this.deathEvents,
      this.thriveEvents
    );
  };
}

export class NullObserver implements CellObserver {
  cellSpawning = () => {};
  cellDying = () => {};
  cellThriving = () => {};
}
