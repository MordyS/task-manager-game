import { Component, OnInit } from '@angular/core';
import { IUser } from '../store/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';
import { AppState } from '../store/models/state.model';
import { Store } from '@ngrx/store';
import { UserActionType } from '../store/actions/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username$: Observable<string>;
  users$: Observable<IUser[]>;
  level$: Observable<number>;

  badges = [
    { name: 'Bronze', img: 'assets/images/bronze-medal.png', level: 1 },
    { name: 'Silver', img: 'assets/images/silver-medal.png', level: 2 },
    { name: 'Gold', img: 'assets/images/gold-medal.png', level: 3 },
  ]

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.users$ = this.store.select(state => state.users.users);
    this.username$ = this.users$.pipe(map(users => users.find(u => u.isMe)?.username || ''));
    this.level$ = this.users$.pipe(map(users => {
      const score = users.find(u => u.isMe)?.score || 0;
      return Math.ceil(score / 8)
    }));
  }

  ngOnInit(): void {
    this.store.dispatch({ type: UserActionType.LOAD_USERS })
  }

  goToTasks() {
    this.router.navigate(['tasks'])
  }

  logout() {
    this.authService.logout().subscribe()
  }

}
