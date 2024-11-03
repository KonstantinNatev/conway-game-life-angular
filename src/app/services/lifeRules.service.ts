import { Injectable } from '@angular/core';
import { Cell } from '../types/cell.interface';
import { TrackingService } from './tracking.service';
import { Coordinate } from '../types/lifeRules.interface';

@Injectable()
export class LifeRulesService {
  public newGeneration!: Cell[];

  private neighbors: Coordinate[];

  constructor(private tracking: TrackingService) {
    this.neighbors = [
      { row: -1, col: -1 }, // NW
      { row: -1, col: 0 }, // N
      { row: -1, col: 1 }, // NE
      { row: 0, col: -1 }, // W
      { row: 0, col: 1 }, // E
      { row: 1, col: -1 }, // SW
      { row: 1, col: 0 }, // S
      { row: 1, col: 1 } // SE
    ];
  }

  useTrackingService(trackingService: TrackingService) {
    this.tracking = trackingService;
  }

  applyRules() {
    this.newGeneration = [];
    const checkedDeadCells = this.tracking.board!.map((someRow) => {
      return someRow.slice().fill(false);
    });

    for (let currRow = 0; currRow < this.tracking.totalRows!; currRow++) {
      for (let currCol = 0; currCol < this.tracking.totalCols!; currCol++) {
        const aliveCell = this.tracking.board![currRow][currCol];

        if (aliveCell) {
          let liveNeighbors = this.anyLiveNeighborsAt(currRow, currCol);

          if (liveNeighbors < 2 || liveNeighbors > 3) {
            this.newGeneration.push({
              row: currRow,
              col: currCol,
              alive: false
            });
          } else {
            this.newGeneration.push({
              row: currRow,
              col: currCol,
              alive: true
            });

            this.getDeadNeighborsAt(currRow, currCol).forEach((deadNeighbor) => {
              const cellIsChecked = checkedDeadCells[deadNeighbor.row][deadNeighbor.col];

              if (!cellIsChecked) {
                checkedDeadCells[deadNeighbor.row][deadNeighbor.col] = true;
                liveNeighbors = this.anyLiveNeighborsAt(deadNeighbor.row, deadNeighbor.col);

                if (liveNeighbors === 3) {
                  this.newGeneration.push({
                    row: deadNeighbor.row,
                    col: deadNeighbor.col,
                    alive: true
                  });
                }
              }
            });
          }
        }
      }
    }
  }

  private anyLiveNeighborsAt(row: number, col: number) {
    let liveNeighbors = 0;

    this.checkNeighborsAt(row, col, (neighbor: Cell) => {
      if (neighbor.alive) {
        liveNeighbors++;
      }
    });

    return liveNeighbors;
  }

  private getDeadNeighborsAt(row: number, col: number) {
    const deadNeighbors: Coordinate[] = [];

    this.checkNeighborsAt(row, col, (neighbor: Cell) => {
      if (!neighbor.alive) {
        deadNeighbors.push({
          row: neighbor.row,
          col: neighbor.col
        });
      }
    });

    return deadNeighbors;
  }

  private checkNeighborsAt(row: number, col: number, cell: (neighbor: Cell) => void) {
    this.neighbors.forEach((neighborCoord) => {
      const neighborRow = row + neighborCoord.row;
      const neighborCol = col + neighborCoord.col;

      if (this.isWithinBorders(neighborRow, neighborCol)) {
        cell({
          row: neighborRow,
          col: neighborCol,
          alive: this.tracking.board![neighborRow][neighborCol]
        });
      }
    });
  }

  private isWithinBorders(row: number, col: number) {
    return row > -1 && row < this.tracking.totalRows! && col > -1 && col < this.tracking.totalCols!;
  }
}
