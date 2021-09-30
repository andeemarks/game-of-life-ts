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
