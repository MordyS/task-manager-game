import { UserState } from '../reducers/user.reducer';
import { TaskState } from '../reducers/task.reducer';

export interface AppState {
    users: UserState;
    tasks: TaskState;
};