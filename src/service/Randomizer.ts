import { Ship } from "../models/Config";

export default class Randomizer {
  speed = 50;
  duration = 3000;
  ships: Ship[] = [];

  randomizerStoppedHandler: (() => void) | null = null;
  changeShipHandler: ((ship: Ship) => void) | null = null;

  #interval: NodeJS.Timer | null = null;

  start() {
    this.#interval = setInterval(() => {
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
    if (this.randomizerStoppedHandler != null) {
      this.randomizerStoppedHandler();
    }
  }

  abort() {
    if (this.#interval != null) {
      clearInterval(this.#interval);
    }
  }
}
