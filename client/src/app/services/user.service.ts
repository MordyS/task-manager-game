import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from 'src/app/store/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUser[]> {
        return this.http.get<Array<any>>('users').pipe(
            map(users => {
                return users.map((user: any) => {
                    user.score = user.completedTasks.reduce((acc: number, cur: any) => acc + cur.score, 0)
                    return user
                }).sort((a: any, b: any) => b.score - a.score);
            })
        )
    }

    completeTask(id: number) {
        return this.http.post('users/task', { task: id })
    }

    undoTask(id: number) {
        return this.http.delete('users/task/' + id)
    }

}
