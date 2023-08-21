import { Inject, Injectable, Scope } from '@nestjs/common';
import { UserAuthDto, IUser } from './users.model';
import { TasksService } from 'src/tasks/tasks.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    private users: IUser[] = [
        // sample data (password is 123456)
        {
            username: 'Mordy',
            password: '$2b$08$aejFc/Q0Yg51a4o2p.m2IOCX9oRLqcV6V.TTPUwIbylSNJkQy7iR.',
            completedTasks: [2]
        },
        {
            username: 'Avitan',
            password: '$2b$08$aejFc/Q0Yg51a4o2p.m2IOCX9oRLqcV6V.TTPUwIbylSNJkQy7iR.',
            completedTasks: []
        }
    ];

    constructor(private readonly tasksService: TasksService, private jwtService: JwtService) { }
    
    getPassword(username: string): string {
        return this.users.find(u => u.username === username)?.password;
    }

    getOne(username: string): IUser {
        const user = this.users.find(u => u.username === username);
        if (!user) return;

        const { password, ...result } = user;

        const userWithTasks: IUser = {
            ...result,
            completedTasks: result.completedTasks.map(t => this.tasksService.getOne((t as number)))
        }
        return userWithTasks
    }

    getAll(token: string): Array<IUser> {
        const username = this.jwtService.decode(token)['username']
        return this.users.map((user: IUser) => {
            const { password, ...result } = user;
            return {
                ...result,
                isMe: result.username == username,
                completedTasks: result.completedTasks.map(t => this.tasksService.getOne((t as number)))
            };
        });
    }

    create(user: UserAuthDto) {
        this.users.push(new IUser(user));
        return;
    }

    taskCompleted(id: number, username: string) {
        this.users.find((user: IUser) => user.username == username).completedTasks.push(id);
        return
    }

    cancelTaskCompleted(id: number, username: string) {
        const user = this.users.find((user: IUser) => user.username == username);
        user.completedTasks = user?.completedTasks.filter(task => task != id) || [];
        return
    }

}
