import { createAction } from '@ngrx/store';

export const disablePlay = createAction('[Control] Disable Play');
export const disableStop = createAction('[Control] Disable Stop');
export const disableClear = createAction('[Control] Disable Clear');
export const disableSeed = createAction('[Control] Disable Seed');
export const resetControls = createAction('[Control] Reset Controls');
