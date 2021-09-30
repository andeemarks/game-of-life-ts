export class Observation {
  constructor(
    public readonly spawns: string[],
    public readonly deaths: string[],
    public readonly thrives: string[]
  ) {}
}

interface CellObserver {
  cellSpawning(): void;
  cellDying(): void;
  cellThriving(): void;
}

export class RecordingObserver implements CellObserver {
  private spawnEvents: string[] = [];
  private deathEvents: string[] = [];
  private thriveEvents: string[] = [];
  private x = 0;
  private y = 0;

  location = (x: number, y: number): void => {
    this.x = x;
    this.y = y;
  };

  cellSpawning = (): void => {
    this.spawnEvents.push(this.x + "x" + this.y);
  };

  cellThriving = (): void => {
    this.thriveEvents.push(this.x + "x" + this.y);
  };

  cellDying = (): void => {
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
  cellSpawning = (): void => {};
  cellDying = (): void => {};
  cellThriving = (): void => {};
}
