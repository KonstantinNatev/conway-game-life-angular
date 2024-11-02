import { Injectable } from '@angular/core';
import { CellInfo } from "../utils/cell-info.interface";

// The @Injectable() decorator makes this service available for dependency injection 
// It can be injected into components, services or directives
@Injectable() 
export class TrackingService {
  totalRows: number | undefined;
  totalCols: number | undefined;
  board: boolean[][] | undefined;

  initBoard(rows: number, cols: number) {
    this.totalRows = rows;
    this.totalCols = cols;

    this.board = [];

    for (let row = 0; row < this.totalRows; row++) {
      for (let col = 0; col < this.totalCols; col++) {
        this.board[row] = new Array(this.totalCols).fill(false);
      }
    }
  }

  mark(cell: CellInfo) {
    this.board![cell.row][cell.col] = cell.alive;
  }

  isBoardEmpty() {
    let countLivesCell = 0;

    this.board!.forEach((row: boolean[]) => {
        row.forEach((live: boolean) => {
            if (live) {
                countLivesCell++;
            }
        });
    });

    return countLivesCell === 0;
  }

}
