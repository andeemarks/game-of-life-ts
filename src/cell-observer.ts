export class Observation {
  constructor(
    public readonly spawns: String[],
    public readonly deaths: String[]
  ) {}
}

export class RecordingObserver {
  private spawnEvents: String[] = [];
  private deathEvents: String[] = [];
  private x: number = 0;
  private y: number = 0;

  location = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };

  cellSpawning = () => {
    this.spawnEvents.push(this.x + "x" + this.y);
  };

  cellDying = () => {
    this.deathEvents.push(this.x + "x" + this.y);
  };

  record = (): Observation => {
    return new Observation(this.spawnEvents, this.deathEvents);
  };
}

export class NullObserver {
  cellSpawning = () => {};

  cellDying = () => {};
}
