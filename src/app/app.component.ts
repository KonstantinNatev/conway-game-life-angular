import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './components/board/board.component';
import { ControlButtonsComponent } from './components/control-buttons/control-buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, ControlButtonsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conway-game-life';

  @ViewChild('board') board!: BoardComponent; // Reference to the board component
  @ViewChild('controls') controls!: ControlButtonsComponent; // Reference to the controls component
}
