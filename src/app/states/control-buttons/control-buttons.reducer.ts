import { createReducer, on } from '@ngrx/store';
import * as ControlActions from "./control-buttons.actions";
import { ControlStates } from '../../types/controlButtonsStates.interface';

const initialState: ControlStates = {
  disabledPlay: false,
  disabledStop: false,
  disabledClear: false,
  disabledSeed: false,
};

export const controlReducer = createReducer(
  initialState,
  on(ControlActions.disablePlay, (state) => ({ ...state, disabledPlay: true })),
  on(ControlActions.disableStop, (state) => ({ ...state, disabledStop: true })),
  on(ControlActions.disableClear, (state) => ({ ...state, disabledClear: true })),
  on(ControlActions.disableSeed, (state) => ({ ...state, disabledSeed: true })),
  on(ControlActions.resetControls, () => initialState)
);
