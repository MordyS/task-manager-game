import { Action, createAction, props } from '@ngrx/store';
import { IUser } from '../models/user.model';
import { ITask } from '../models/task.model';

export enum UserActionType {
    LOAD_USERS = '[Users] Load Users',
    USERS = '[Users] Users',
    COMPLETE_TASK = '[Users] Complete Task',
    UNDO_TASK = '[Users] Undo Task',
}

export const loadUsers = createAction(UserActionType.LOAD_USERS);

export const users = createAction(UserActionType.USERS, props<{ users: IUser[] }>());

export const completeTask = createAction(UserActionType.COMPLETE_TASK, props<{ payload: ITask }>())

export const undoTask = createAction(UserActionType.UNDO_TASK, props<{ payload: ITask }>())

export type UserAction = typeof users | typeof loadUsers | typeof completeTask | typeof undoTask;