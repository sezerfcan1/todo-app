import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './activation/activation.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { NavComponent } from './nav/nav.component';
import { Nav2Component } from './nav2/nav2.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: NavComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'register', component: RegisterComponent},
  {path: 'register/activation', component:ActivationComponent},
  {path: 'todo-List',component: TodoListComponent},
  {path: 'add-Todo', component: AddTodoComponent },
  {path: 'profile', component: ProfileComponent},
  { path: 'todo/:id', component: TodoDetailsComponent },
  { path: 'nav', component: Nav2Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
