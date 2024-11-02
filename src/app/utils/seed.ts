import { CellInfo } from "./cell-info.interface";

export const enum Seed {
  Blinker = 'Blinker',
  Pulsar = 'Pulsar',
  Pentadecathlon = 'Pentadecathlon',
  Glider = 'Glider',
  LWSS = 'LWSS'
}

export class InitSeed {
  static blinker(): CellInfo[] {
    return [
      {row: 10, col: 18, alive: true},
      {row: 11, col: 18, alive: true},
      {row: 12, col: 18, alive: true}
    ];
  }

  static pulsar(): CellInfo[] {
    return [
      { row: 2, col: 9, alive: true },
      { row: 2, col: 15, alive: true },
      { row: 3, col: 9, alive: true },
      { row: 3, col: 15, alive: true },
      { row: 4, col: 9, alive: true },
      { row: 4, col: 10, alive: true },
      { row: 4, col: 14, alive: true },
      { row: 4, col: 15, alive: true },
      { row: 6, col: 5, alive: true },
      { row: 6, col: 6, alive: true },
      { row: 6, col: 7, alive: true },
      { row: 6, col: 10, alive: true },
      { row: 6, col: 11, alive: true },
      { row: 6, col: 13, alive: true },
      { row: 6, col: 14, alive: true },
      { row: 6, col: 17, alive: true },
      { row: 6, col: 18, alive: true },
      { row: 6, col: 19, alive: true },
      { row: 7, col: 7, alive: true },
      { row: 7, col: 9, alive: true },
      { row: 7, col: 11, alive: true },
      { row: 7, col: 13, alive: true },
      { row: 7, col: 15, alive: true },
      { row: 7, col: 17, alive: true },
      { row: 8, col: 9, alive: true },
      { row: 8, col: 10, alive: true },
      { row: 8, col: 14, alive: true },
      { row: 8, col: 15, alive: true },
      { row: 10, col: 9, alive: true },
      { row: 10, col: 10, alive: true },
      { row: 10, col: 14, alive: true },
      { row: 10, col: 15, alive: true },
      { row: 11, col: 7, alive: true },
      { row: 11, col: 9, alive: true },
      { row: 11, col: 11, alive: true },
      { row: 11, col: 13, alive: true },
      { row: 11, col: 15, alive: true },
      { row: 11, col: 17, alive: true },
      { row: 12, col: 5, alive: true },
      { row: 12, col: 6, alive: true },
      { row: 12, col: 7, alive: true },
      { row: 12, col: 10, alive: true },
      { row: 12, col: 11, alive: true },
      { row: 12, col: 13, alive: true },
      { row: 12, col: 14, alive: true },
      { row: 12, col: 17, alive: true },
      { row: 12, col: 18, alive: true },
      { row: 12, col: 19, alive: true },
      { row: 14, col: 9, alive: true },
      { row: 14, col: 10, alive: true },
      { row: 14, col: 14, alive: true },
      { row: 14, col: 15, alive: true },
      { row: 15, col: 9, alive: true },
      { row: 15, col: 15, alive: true },
      { row: 16, col: 9, alive: true },
      { row: 16, col: 15, alive: true },
    ];
  }


  static pentadecathlon(): CellInfo[] {
    return [
      { row: 3, col: 18, alive: true },
      { row: 3, col: 19, alive: true },
      { row: 3, col: 20, alive: true },
      { row: 4, col: 19, alive: true },
      { row: 5, col: 19, alive: true },
      { row: 6, col: 18, alive: true },
      { row: 6, col: 19, alive: true },
      { row: 6, col: 20, alive: true },
      { row: 8, col: 18, alive: true },
      { row: 8, col: 19, alive: true },
      { row: 8, col: 20, alive: true },
      { row: 9, col: 18, alive: true },
      { row: 9, col: 19, alive: true },
      { row: 9, col: 20, alive: true },
      { row: 11, col: 18, alive: true },
      { row: 11, col: 19, alive: true },
      { row: 11, col: 20, alive: true },
      { row: 12, col: 19, alive: true },
      { row: 13, col: 19, alive: true },
      { row: 14, col: 18, alive: true },
      { row: 14, col: 19, alive: true },
      { row: 14, col: 20, alive: true },
    ];
  }


  static glider(): CellInfo[] {
    return [
      {row: 1, col: 3, alive: true},
      {row: 2, col: 4, alive: true},
      {row: 3, col: 2, alive: true},
      {row: 3, col: 3, alive: true},
      {row: 3, col: 4, alive: true},
    ];
  }

  static lwss(): CellInfo[] {
    return [
      {row: 10, col: 2, alive: true},
      {row: 10, col: 5, alive: true},
      {row: 11, col: 6, alive: true},
      {row: 12, col: 2, alive: true},
      {row: 12, col: 6, alive: true},
      {row: 13, col: 3, alive: true},
      {row: 13, col: 4, alive: true},
      {row: 13, col: 5, alive: true},
      {row: 13, col: 6, alive: true},
    ];
  }
}
