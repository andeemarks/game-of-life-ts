import { eventNames } from "process";

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

  record = (): Object => {
    return { spawn: this.spawnEvents, death: this.deathEvents };
  };
}

export class NullObserver {
  cellSpawning = () => {};

  cellDying = () => {};
}
