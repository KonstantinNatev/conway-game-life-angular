import { Injectable } from '@angular/core';
import { Cell } from "../types/cell.interface";

@Injectable() 
export class TrackingService {
  public totalRows!: number;
  public totalCols!: number;
  public board!: boolean[][];

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

  mark(cell: Cell) {
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
