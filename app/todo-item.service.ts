import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoItemService {
  constructor(private http: Http) {}

  get(type) {
    let searchParams = new URLSearchParams();
    searchParams.append('type', type);
    console.log(searchParams);
    return this.http.get('todolist', { search : searchParams })
      .map(response => {
        console.log(response);
        return response.json().todoList;
      });
  }
  
  add(todoItem) {
    return this.http.post('todolist', todoItem)
      .map(response => {});
  }

  setDone(todoItem)
  {
    return this.http.post('finish-task', todoItem)
      .map(response => {});
  }
  
  delete(todoItem) {
    console.log(todoItem.id);
    return this.http.delete(`todolist/${todoItem.id}`)
      .map(response => {});
  }
}
