import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TodoItemService } from './todo-item.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'td-list',
  templateUrl: 'app/todo-list.component.html',
  styleUrls: ['app/todo-list.component.css']
})

export class TodoList {
  todoList = [];
  type = '';
  paramsSubscription;

  constructor(
    private todoItemService: TodoItemService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let type = params['type'];
        if(type.toLowerCase() === 'all') {
          type = '';
        }
        this.getMediaItems(type);
      });
  }

  getMediaItems(type) {
    this.type = type;
    this.todoItemService.get(type)
      .subscribe(todoList => {
        this.todoList = todoList;
      });
  }

  setDone($target)
  {
    this.todoItemService.setDone($target)
      .subscribe(todoList => {
        this.getMediaItems(this.activatedRoute.params['type']);
      });
  }

  setRemove($target)
  {
    this.todoItemService.delete($target)
      .subscribe(todoList => {
        this.getMediaItems(this.type);
      });
  }
}