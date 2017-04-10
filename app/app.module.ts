import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoList } from './todo-list.component';
import { TodoItem } from './todo-item.component';
import { TodoItemForm } from './todo-item-form.component';
import { TodoItemService } from './todo-item.service';
import { buttonHoverDirective } from './button-hover.directive';
import { TaskFinishedPipe } from './task-finished.pipe';
import { typeList, typeListToken } from './providers';
import { MockXHRBackend } from './mock-xhr-backend';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    TodoList,
    TodoItem,
    TodoItemForm,
    TaskFinishedPipe,
    buttonHoverDirective
  ],
  providers: [
    TodoItemService,
    { provide: typeListToken, useValue: typeList },
    { provide: XHRBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
