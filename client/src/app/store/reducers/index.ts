import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../models/state.model'
import { userReducer } from './user.reducer';
import { taskReducer } from './task.reducer';

export const rootReducer = {};

export const reducers: ActionReducerMap<AppState, any> = {
    tasks: taskReducer,
    users: userReducer
};