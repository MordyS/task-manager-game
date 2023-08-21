import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task, TaskDto } from './tasks.model';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        // sample data
        {
            id: 1,
            name: 'fold the laundry',
            score: 5,
            createdBy: 'Mordy',
            editedBy: 'Mordy'
        },
        {
            id: 2,
            name: 'Build Task Manager Game',
            score: 7,
            createdBy: 'Mordy',
            editedBy: 'Mordy'
        }
    ];

    // save the last incremented id
    private identity: number = Math.max(...this.tasks.map(t => t.id), 0);

    getOne(id: number): Task {
        return this.tasks.find(u => u.id == id);
    }

    getAll(): Array<Task> {
        return this.tasks;
    }

    create(task: TaskDto, username: string) {
        const newTask = { ...task, createdBy: username, editedBy: username, id: ++this.identity }
        this.tasks.push(newTask);
        return newTask;
    }

    edit(id: number, task: TaskDto, username: string) {
        const i = this.tasks.findIndex(task => task.id == id);
        if (i < 0) throw new HttpException('Task not fount', HttpStatus.NOT_FOUND);

        this.tasks[i] = { ...this.tasks[i], ...task, editedBy: username }
        return;
    }
}
