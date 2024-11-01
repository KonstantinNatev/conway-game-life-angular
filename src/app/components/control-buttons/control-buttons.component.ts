import { Component, OnInit, Input } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Seed } from '../../utils/seed';
import { ControlStates } from './control-buttons-state.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.css'],
})

export class ControlButtonsComponent implements OnInit {

  @Input() board: BoardComponent | undefined;

  public controlStates: ControlStates | undefined;
  public initialSeeds: Seed[];

//   private loopIntervalId: number;

  constructor() {
    this.initialSeeds = [
      Seed.Blinker,
      Seed.Pulsar,
      Seed.Pentadecathlon,
      Seed.Glider,
      Seed.LWSS
    ];
  }

  ngOnInit() {
    this.controlStates = new ControlStates()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear();
  }

  onClickPlay() {
  }

  onClickNext() {
  }

  onClickStop() {
  }

  onClickClear() {
  }

  onControlStates($event: ControlStates) {
    this.controlStates = $event;
  }

  onSelectChange($event: any) {
    this.controlStates = new ControlStates().disableStop();
    // this.board.populateSeed(<Seed>$event.target.value);
  }
}