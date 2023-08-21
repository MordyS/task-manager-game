import { ITask } from "./task.model";

export interface IUser {
    username: string;
    completedTasks: Array<ITask>;
    score: number;
    isMe:boolean;
}

export interface IUserAuth {
    username: string;
    password: string;
}