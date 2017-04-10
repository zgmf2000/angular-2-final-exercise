import { Routes, RouterModule } from '@angular/router';

import { TodoItemForm } from './todo-item-form.component';
import { TodoList } from './todo-list.component';

const appRoutes: Routes = [
  { path: 'add', component: TodoItemForm },
  { path: ':type', component: TodoList },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);
