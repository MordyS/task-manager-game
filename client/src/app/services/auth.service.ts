import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as userActions from '../store/actions/user.actions';
import { IUserAuth } from '../store/models/user.model';
import { Router } from '@angular/router';
import { AppState } from '../store/models/state.model';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router, private store$: Store<AppState>) { }


    signup(user: IUserAuth): Observable<any> {
        return this.http.post('auth/signup', user)
            .pipe(
                tap((user: any) => {
                    this.router.navigateByUrl('/tasks');
                })
            )
    }

    login(user: IUserAuth): Observable<any> {
        return this.http.post('auth/login', user)
            .pipe(
                tap((user: any) => {
                    this.router.navigateByUrl('/tasks');
                })
            )
    }

    logout() {
        return this.http.post('auth/logout', {})
            .pipe(
                tap(() => {
                    this.store$.dispatch(userActions.users({ users: [] }))
                    this.router.navigateByUrl('/auth');
                })
            )
    }
}
