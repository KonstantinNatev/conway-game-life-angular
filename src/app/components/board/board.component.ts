import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { TrackingService } from "../../services/tracking.service";
import { ControlStates } from "../control-buttons/control-buttons-state.class";
import { InitSeed, Seed } from "../../utils/seed";
import { CellInfo } from "../../utils/cell-info.interface";
import { LifeRulesService } from "../../services/lifeRules.service";

@Component ({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    providers: [TrackingService, LifeRulesService]
})

export class BoardComponent {
    // Emits ControlStates events to notify the parent of control state changes.
    @Output() controlStates = new EventEmitter<ControlStates>();

    public cellsStyle: any[][] = []; 
    public debugMode: boolean = true;

    private width: number;
    private height: number;
    private cellColor: string;
    
    constructor(private tracking: TrackingService, private lifeRules: LifeRulesService) {
        this.width = 40;
        this.height = 20;
        this.cellColor = '#fbf165';
    }
    
    ngOnInit() {
        this.initializeBoard();
        this.tracking.initBoard(this.height, this.width);
    }

    reset() {
        this.cellsStyle.forEach((column) => {
            column.forEach((cell) => {
                cell.backgroundColor = "";
            });
        });
    }

    populateSeed(seed: Seed) {
        this.reset();

        let whichSeed = [];

        switch (seed) {
            case Seed.Blinker:
                whichSeed = InitSeed.blinker();
            break;

            case Seed.Pulsar:
                whichSeed = InitSeed.pulsar();
            break;

            case Seed.Pentadecathlon:
                whichSeed = InitSeed.pentadecathlon();
            break;

            case Seed.Glider:
                whichSeed = InitSeed.glider();
            break;

            case Seed.LWSS:
                whichSeed = InitSeed.lwss();
            break;
        }
        
        whichSeed.forEach((cell: CellInfo) => {
            this.paintAt(cell);
            this.tracking.mark(cell);
        });
   }

   update() {
        this.lifeRules.applyRules();

        this.lifeRules.newGeneration.forEach((cell: CellInfo) => {
            this.tracking.mark(cell);
            if (cell.alive) {
                this.paintAt(cell);
            } else {
                this.unPaintAt(cell);
            }
        });
   }

    private paintAt(c: CellInfo) {
      this.cellsStyle[c.row][c.col].backgroundColor = this.cellColor;
    }

    private unPaintAt(cell: CellInfo) {
        this.cellsStyle[cell.row][cell.col].backgroundColor = '';
    }

    private initializeBoard(): void {
        for (let row = 0; row < this.height; row++) {
            this.cellsStyle[row] = Array(this.width).fill({}).map((_, col) => ({
                'grid-row': row + 1,
                'grid-column': col + 1
            }));
        }
    }
}
