import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { ControlStates } from '../control-buttons/control-buttons-state.class';
import { InitSeed } from '../../utils/seed';
import { Cell } from '../../types/cell.interface';
import { LifeRulesService } from '../../services/lifeRules.service';
import { Seed } from '../../types/seed.enum';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [TrackingService, LifeRulesService]
})
export class BoardComponent {
  @Output() controlStates = new EventEmitter<ControlStates>();

  public cells: Cell[][] = [];
  public whichSeed: Cell[] = [];

  private width: number;
  private height: number;

  constructor(private tracking: TrackingService, private lifeRules: LifeRulesService) {
    this.width = 40;
    this.height = 20;
  }

  ngOnInit() {
    this.initializeBoard();
    this.tracking.initBoard(this.height, this.width);
    this.preloadFigure();
  }

  preloadFigure() {
    this.populateSeed(Seed.Pulsar);
  }

  reset() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.alive = false;
      });
    });

    this.tracking.initBoard(this.height, this.width);
  }

  populateSeed(seed: Seed) {
    this.reset();

    switch (seed) {
      case Seed.Blinker:
        this.whichSeed = InitSeed.blinker();
        break;

      case Seed.Pulsar:
        this.whichSeed = InitSeed.pulsar();
        break;

      case Seed.Pentadecathlon:
        this.whichSeed = InitSeed.pentadecathlon();
        break;

      case Seed.Glider:
        this.whichSeed = InitSeed.glider();
        break;

      case Seed.LWSS:
        this.whichSeed = InitSeed.lwss();
        break;
    }

    this.whichSeed.forEach((cell: Cell) => {
      this.cells[cell.row][cell.col].alive = true;
      this.tracking.mark(cell);
    });
  }

  update() {
    this.lifeRules.applyRules();

    this.lifeRules.newGeneration.forEach((cell: Cell) => {
      this.cells[cell.row][cell.col].alive = cell.alive;
      this.tracking.mark(cell);
    });
  }

  private initializeBoard() {
    for (let row = 0; row < this.height; row++) {
      this.cells[row] = Array(this.width)
        .fill(null)
        .map((_, col) => ({
          row,
          col,
          alive: false
        }));
    }
  }
}
