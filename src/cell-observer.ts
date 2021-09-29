import { eventNames } from "process";

export class RecordingObserver {
  private events = new Array();
  private x: number = 0;
  private y: number = 0;

  location = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };

  cellSpawning = () => {
    this.events.push("spawning at " + this.x + ", " + this.y);
  };

  cellDying = () => {
    this.events.push("spawning at " + this.x + ", " + this.y);
  };

  record = (): String[] => {
    return this.events;
  };
}

export class NullObserver {
  cellSpawning = () => {};

  cellDying = () => {};
}
