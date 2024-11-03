import { Component } from '@angular/core';
import { BoardComponent } from './components/board/board.component';
import { ControlButtonsComponent } from './components/control-buttons/control-buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, ControlButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'conway-game-life';
}
