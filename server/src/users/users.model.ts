import { IsInt, IsString, MinLength } from "class-validator";
import { Task } from "src/tasks/tasks.model";

export class IUser {
    username: string;
    password?: string;
    completedTasks: Array<number | Task>;
    isMe?: boolean;
    constructor(u) {
        this.username = u.username;
        this.password = u.password;
        this.completedTasks = u.completedTasks || [];
        this.isMe = !!u.isMe;
    }
}


export class UserAuthDto {

    @IsString()
    username: string;

    @IsString()
    @MinLength(4)
    password: string;

}

export class UserTaskDto {
    
    @IsInt()
    task: number;

}