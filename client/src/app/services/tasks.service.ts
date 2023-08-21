import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../store/models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) { }

    getTasks(): Observable<ITask[]> {
        return this.http.get<Array<any>>('tasks')
    }

    saveTask(task: ITask) {
        return this.http.post('tasks', task)
    }
}
