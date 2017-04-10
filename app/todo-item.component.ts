import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'td-item',
  templateUrl: 'app/todo-item.component.html',
  styleUrls: ['app/todo-item.component.css']
})

export class TodoItem{
  @Input() TodoItem;
  @Output() onDone = new EventEmitter;
  @Output() onRemove = new EventEmitter;

  setDone()
  {
    this.onDone.emit(this.TodoItem);
  }
  
  setRemove()
  {
    this.onRemove.emit(this.TodoItem);
  }

  setHidden()
  {
    if (this.TodoItem.finished)
      return "hidden"
    else
      return "";
  }
}