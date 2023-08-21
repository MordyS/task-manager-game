import { Component, OnInit } from '@angular/core';
import { Task, ITask } from './../store/models/task.model';
import { Observable, map } from 'rxjs';
import { AppState } from '../store/models/state.model';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserActionType } from '../store/actions/user.actions';
import { TaskActionType } from '../store/actions/task.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$: Observable<ITask[]>;
  myTasks$: Observable<ITask[]>;
  newTask?: ITask;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.tasks$ = this.store.select(state => state.tasks.tasks);

    this.myTasks$ = this.store.select(state => state.users.users)
      .pipe(map(users => users.find(u => u.isMe)?.completedTasks || []));
  }

  ngOnInit(): void {
    this.store.dispatch({ type: TaskActionType.LOAD_TASKS })
    this.store.dispatch({ type: UserActionType.LOAD_USERS })
  }

  goToHome() {
    this.router.navigate([''])
  }

  logout() {
    this.authService.logout().subscribe()
  }

  isTaskCompleted(task: ITask): Observable<boolean> {
    return this.myTasks$.pipe(map(tasks => !!tasks.find(t => t.id === task.id)))
  }

  toggleTask(e: any, task: ITask): void {
    if (e.checked) {
      this.store.dispatch({ type: UserActionType.COMPLETE_TASK, payload: task });
    } else {
      this.store.dispatch({ type: UserActionType.UNDO_TASK, payload: task });
    }
  }

  initTask(): void {
    this.newTask = new Task()
  }

  saveTask(task: ITask): void {
    if (!task.name || !task.score) return;
    this.store.dispatch({ type: TaskActionType.SAVE_TASK, payload: task });
    this.newTask = undefined;
  }
}
