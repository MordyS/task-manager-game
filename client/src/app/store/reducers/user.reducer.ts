import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { IUser } from '../models/user.model';

export interface UserState {
    users: IUser[];
}

const initialState: UserState = {
    users: []
};

export const userReducer = createReducer(
    initialState,
    on(userActions.users, (state, { users }) => ({ ...state, users }))
);