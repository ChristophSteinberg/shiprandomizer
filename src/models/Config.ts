export interface Ship {
  name: string;
  nation: string;
  tier: Tier;
  type: Type;
  kind: Kind;
  torpedos: string;
  caliber: string;
  id: number;
  selected: boolean;
}

export type Tier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type Kind = "N" | "P";

export type Type = "A" | "B" | "C" | "D" | "S";

export interface Config {
  version: number;
  configVisible: boolean;
  descriptionVisible: boolean;
  sound: Sound;
  sort: Sort;
  ships: Ship[];
  profiles: Profile[];
}

export interface Sound {
  volume: number;
  file: string;
}

export interface Sort {
  by: string;
  order: string;
}

export interface Profile {
  id: number;
  name: string;
  shipIds: [number];
}

export function mapShipToString(shipType: Type) {
  switch (shipType) {
    case "A":
      return "Aircraft Carrier";
    case "B":
      return "Battleship";
    case "C":
      return "Cruiser";
    case "D":
      return "Destroyer";
    case "S":
      return "Submarine";
    default:
      return "---";
  }
}
