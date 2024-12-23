import { Component, OnInit, Input } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { ControlStates } from './control-buttons-state.class';
import { CommonModule } from '@angular/common';
import { Seed } from '../../types/seed.enum';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.css']
})
export class ControlButtonsComponent implements OnInit {
  @Input()
  board!: BoardComponent;

  public controlStates!: ControlStates;
  public initialSeeds: Seed[];

  private loopIntervalId!: ReturnType<typeof setInterval>;

  constructor() {
    this.initialSeeds = [Seed.Blinker, Seed.Pulsar, Seed.Pentadecathlon, Seed.Glider, Seed.LWSS];
  }

  ngOnInit() {
    this.controlStates = new ControlStates().disableStop();
  }

  onClickPlay() {
    this.board.update();
    let cs = new ControlStates().disablePlay().disableSeed();
    this.controlStates = cs;

    this.loopIntervalId = window.setInterval.call(
      this,
      () => {
        cs = new ControlStates().disablePlay().disableSeed();
        this.board.update();

        this.controlStates = cs;
      },
      600
    );
  }

  onClickStop() {
    this.controlStates = new ControlStates().disableStop();
    clearInterval(this.loopIntervalId);
  }

  onClickClear() {
    this.controlStates = new ControlStates().disablePlay().disableStop().disableClear();
    clearInterval(this.loopIntervalId);
    this.board.reset();
  }

  onControlStates(event: ControlStates) {
    this.controlStates = event;
  }

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.controlStates = new ControlStates().disableStop();
      this.board.populateSeed(target.value as Seed);
    }
  }
}
