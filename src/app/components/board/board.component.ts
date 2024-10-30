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

    private width: number;
    private height: number;
    public debugMode: boolean = true;
    
    constructor() {
        this.width = 40;
        this.height = 20;
    }
    
    ngOnInit() {
        this.initializeBoard();
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
