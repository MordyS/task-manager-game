import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, withLatestFrom, filter, take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import * as userActions from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../models/state.model';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUsers),
    withLatestFrom(this.store.select(state => state.users.users)),
    filter(([action, users]) => !users?.length),
    exhaustMap(() => this.userService.getUsers()
      .pipe(
        map(users => userActions.users({ users })),
        catchError(() => EMPTY)
      ))
  )
  );

  completeTask$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.completeTask),
    take(1),
    exhaustMap(action => {
      console.log(action)
      return this.userService.completeTask(action.payload.id)
        .pipe(
          map((task: any) => userActions.completeTask({ payload: task })),
        )
    })
  ));

  

  undoTask$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.undoTask),
    take(1),
    exhaustMap(action => {
      return this.userService.undoTask(action.payload.id)
        .pipe(
          map((task: any) => {
            return userActions.undoTask({ payload: task })
          }),
        )
    })
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>
  ) { }
}