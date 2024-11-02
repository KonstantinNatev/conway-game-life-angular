import { Injectable } from '@angular/core';
import { CellInfo } from '../utils/cell-info.interface';
import { TrackingService } from './tracking.service';

@Injectable()
export class LifeRulesService {

  newGeneration!: CellInfo[];

  private neighbors: any[];

  constructor(private tracking: TrackingService) {
  this.neighbors = [
    {row: -1, col: -1}, // NW
    {row: -1, col: 0},  // N
    {row: -1, col: 1},  // NE
    {row: 0, col: -1},  // W
    {row: 0, col: 1},   // E
    {row: 1, col: -1},  // SW
    {row: 1, col: 0},   // S
    {row: 1, col: 1}    // SE
  ];
}

  useTrackingService(t: TrackingService) {
    this.tracking = t;
  }

  applyRules() {
    this.newGeneration = [];
    // matrix to track already checked dead cells; don't want to check again
    const checkedDeadCells = this.tracking.board!.map((someRow) => {
      // slice clones the array row and the row in tracking.board will not be modified or referenced
      return someRow.slice().fill(false);
    });

    for(let currRow = 0; currRow < this.tracking.totalRows!; currRow++) {
        for(let currCol = 0; currCol < this.tracking.totalCols!; currCol++) {
          
            const aliveCell = this.tracking.board![currRow][currCol];

            if(aliveCell) {
                let liveNeighbors = this.anyLiveNeighborsAt(currRow, currCol);

                // Any live cell with fewer than two live neighbors dies, as if caused by under population.
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    this.newGeneration.push({
                        row: currRow,
                        col: currCol,
                        alive: false
                    });
                }  else {
                // Any live cell with two or three live neighbors lives onto the next generation.
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
    
                       // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
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

    this.checkNeighborsAt(row, col, (neighbor: CellInfo) => {
      if (neighbor.alive) {
        liveNeighbors++;
      }
    });

    return liveNeighbors;
  }

  private getDeadNeighborsAt(row: number, col: number) {
    const deadNeighbors: { row: number; col: number; }[] = [];

    this.checkNeighborsAt(row, col, (neighbor: CellInfo) => {
      if (!neighbor.alive) {
        deadNeighbors.push({
          row: neighbor.row,
          col: neighbor.col,
        });
      }
    });

    return deadNeighbors;
  }

  private checkNeighborsAt(row: number, col: number, cell: (neighbor: CellInfo) => void) {
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
    return (row > -1 && row < this.tracking.totalRows!) && (col > -1 && col < this.tracking.totalCols!);
  }

}
