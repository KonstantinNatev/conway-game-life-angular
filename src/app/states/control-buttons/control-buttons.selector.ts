import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ControlStates } from '../../types/controlButtonsStates.interface';

export const selectControlStates = createFeatureSelector<ControlStates>('controls');

export const selectDisabledPlay = createSelector(selectControlStates, (state) => state.disabledPlay);
export const selectDisabledStop = createSelector(selectControlStates, (state) => state.disabledStop);
export const selectDisabledClear = createSelector(selectControlStates, (state) => state.disabledClear);
export const selectDisabledSeed = createSelector(selectControlStates, (state) => state.disabledSeed);
