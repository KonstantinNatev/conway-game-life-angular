import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component ({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
})

export class BoardComponent {

    public cellsStyle: any[][] = []; 
    public boardDimensionStyle: any;

    private width: number;
    private height: number;
    private cellColor: string;
    public debugMode: boolean = true;
    
    constructor() {
        this.width = 50;
        this.height = 30;
        this.cellColor = '#fbf165';

        this.initializeCellsStyle();
    }

    private initializeCellsStyle(): void {
        this.boardDimensionStyle = {
            'grid-template-columns': `repeat(${this.width}, 25px)`,
            'grid-template-rows': `repeat(${this.height}, 25px)`
        };

        for (let row = 0; row < this.height!; row++) {
            this.cellsStyle[row] = new Array(this.width);

            for (let col = 0; col < this.width; col++) {
                this.cellsStyle[row][col] = {
                    'grid-row': row + 1,
                    'grid-column': col + 1,
                    'border-style': 'groove',
                };
                if (this.debugMode) {
                    this.cellsStyle[row][col]['font-size'] = '8pt';
                }
            }

        }
    }

}
