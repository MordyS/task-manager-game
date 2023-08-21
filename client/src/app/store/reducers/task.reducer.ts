import { createReducer, on } from '@ngrx/store';
import * as taskActions from '../actions/task.actions';
import { ITask } from '../models/task.model';

export interface TaskState {
    tasks: ITask[];
}

const initialState: TaskState = {
    tasks: []
};

export const taskReducer = createReducer(
    initialState,
    on(taskActions.tasks, (state, { tasks }) => ({ ...state, tasks })),
    on(taskActions.saveTask, (state, { payload }) =>
        payload.id > -1 ? ({ ...state, tasks: state.tasks }) : ({ ...state, tasks: [...state.tasks, payload] })
    ),
);