import { Component, OnInit, Input } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { ControlStates } from './control-buttons-state.class';
import { CommonModule } from '@angular/common';
import { Seed } from '../../types/seed.enum';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDisabledPlay, selectDisabledStop, selectDisabledClear, selectDisabledSeed } from '../../states/control-buttons/control-buttons.selector';
import * as ControlActions from '../../states/control-buttons/control-buttons.actions';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule],  // Remove StoreModule here
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.css']
})
export class ControlButtonsComponent implements OnInit {
  @Input() board!: BoardComponent;

  public controlStates!: ControlStates;
  public initialSeeds: Seed[];
  public disabledPlay$!: Observable<boolean>;
  public disabledStop$!: Observable<boolean>;
  public disabledClear$!: Observable<boolean>;
  public disabledSeed$!: Observable<boolean>;

  private loopIntervalId!: ReturnType<typeof setInterval>;

  constructor(private store: Store) {
    this.initialSeeds = [Seed.Blinker, Seed.Pulsar, Seed.Pentadecathlon, Seed.Glider, Seed.LWSS];
  }

  ngOnInit() {
    this.disabledPlay$ = this.store.select(selectDisabledPlay);
    this.disabledStop$ = this.store.select(selectDisabledStop);
    this.disabledClear$ = this.store.select(selectDisabledClear);
    this.disabledSeed$ = this.store.select(selectDisabledSeed);

    this.store.dispatch(ControlActions.disableStop());
  }

  onClickPlay() {
    this.board.update();
    this.store.dispatch(ControlActions.disablePlay());
    this.store.dispatch(ControlActions.disableSeed());

    this.loopIntervalId = window.setInterval.call(
      this,
      () => {
        this.board.update();
      },
      600
    );
  }

  onClickStop() {
    this.store.dispatch(ControlActions.disableStop());
    clearInterval(this.loopIntervalId);
  }

  onClickClear() {
    this.store.dispatch(ControlActions.disableClear());
    clearInterval(this.loopIntervalId);
    this.board.reset();
  }

  onControlStates(event: ControlStates) {
    this.controlStates = event;
  }

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.store.dispatch(ControlActions.disableStop());
      this.board.populateSeed(target.value as Seed);
    }
  }
}
