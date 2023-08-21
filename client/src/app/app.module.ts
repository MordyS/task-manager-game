import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './tasks/tasks.component';
import { MessageService } from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { ApiInterceptor } from './app.interceptor';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/users.effect';
import { TaskEffects } from './store/effects/tasks.effects';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TasksComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    CheckboxModule,
    DialogModule,
    SliderModule,
    MenubarModule,
    BadgeModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects, TaskEffects])
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
