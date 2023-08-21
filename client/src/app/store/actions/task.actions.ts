import { createAction, props } from '@ngrx/store';
import { ITask } from '../models/task.model';

export enum TaskActionType {
    LOAD_TASKS = '[Tasks] Load Tasks',
    TASKS = '[Tasks] Tasks',
    SAVE_TASK = '[Tasks] Save Task'
}

export const loadTasks = createAction(TaskActionType.LOAD_TASKS);

export const tasks = createAction(TaskActionType.TASKS, props<{ tasks: ITask[] }>());

export const saveTask = createAction(TaskActionType.SAVE_TASK, props<{ payload: ITask }>());

export type TaskAction = typeof tasks | typeof loadTasks | typeof saveTask;