import { Ship } from "../models/Config";

export default class Randomizer {
  speed = 50;
  duration = 3000;
  ships: Ship[] = [];

  randomizerStoppedHandler: (() => void) | null = null;
  changeShipHandler: ((ship: Ship) => void) | null = null;

  #interval = 0;

  constructor() {}

  start() {
    this.#interval = setInterval(() => {
      console.log("x");
      const shipsToChoose = this.ships.filter((s) => s.selected);
      const random = Math.floor(Math.random() * shipsToChoose.length);
      if (this.changeShipHandler != null) {
        this.changeShipHandler(shipsToChoose[random]);
      }
    }, this.speed);

    setTimeout(() => {
      this.stop();
    }, this.duration);
  }

  stop() {
    this.abort();
    if (this.randomizerStoppedHandler) {
      this.randomizerStoppedHandler();
    }
  }

  abort() {
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = 0;
    }
  }
}
