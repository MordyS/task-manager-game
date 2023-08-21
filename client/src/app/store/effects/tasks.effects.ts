import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, withLatestFrom, filter, tap, take } from 'rxjs/operators';
import { TaskService } from 'src/app/services/tasks.service';
import * as taskActions from '../actions/task.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../models/state.model';
import { Task } from '../models/task.model';

@Injectable()
export class TaskEffects {

    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.loadTasks),
        withLatestFrom(this.store.select(state => state.tasks.tasks)),
        filter(([action, tasks]) => !tasks?.length),
        exhaustMap(() => this.taskService.getTasks()
            .pipe(
                map(tasks => taskActions.tasks({ tasks })),
                catchError(() => EMPTY)
            ))
    ));

    saveTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.saveTask),
        take(1),
        exhaustMap(action => {
            return this.taskService.saveTask(action.payload)
            .pipe(
                tap(a=>console.log(a)),
                map((task) => taskActions.saveTask({ payload: new Task(task) })),
            )
        })
    ))

    constructor(
        private actions$: Actions,
        private taskService: TaskService,
        private store: Store<AppState>
    ) { }
}