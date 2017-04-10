import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('todolist?type=') >= 0 || request.url === 'todolist') {
            var type;
            if (request.url.indexOf('?') >= 0) {
              type = request.url.split('=')[1];
              if (type === 'undefined') type = '';
            }
            var todoList;
            if (type) {
              todoList = this._todoList.filter(todo => todo.type === type);
            } else {
              todoList = this._todoList;
            }
            responseOptions = new ResponseOptions({
              body: { todoList: JSON.parse(JSON.stringify(todoList)) },
              status: 200
            });
          } else {
            var id = parseInt(request.url.split('/')[1]);
            todoList = this._todoList.filter(todo => todo.id === id);
            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(todoList[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          switch(request.url)
          {
            case "todolist":
              var newTodo = JSON.parse(request.text().toString());
              newTodo.id = this._getNewId();
              this._todoList.push(newTodo);
              responseOptions = new ResponseOptions({ status: 201 });
              break;
            case "finish-task":
              var task = JSON.parse(request.text().toString());
              this._todoList.find(todo => todo.id === task.id).finished = true;
              responseOptions = new ResponseOptions({ status: 201 });
              break;
            default:
              break;
          }
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteTodoItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteTodoItem(id) {
    let target = this._todoList.find(todoItem => todoItem.id === id);
    let index = this._todoList.indexOf(target);
    if (index >= 0) {
      this._todoList.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._todoList.length > 0) {
      return Math.max.apply(Math, this._todoList.map(todo => todo.id)) + 1;
    }
    else
      return 1;
  }

  _todoList = [
    {
      id      : 1,
      title   : "Learn AngularJS",
      type    : "Task",
      date    : new Date("10/4/2012").getTime(),
      finished: true,
      desc    : "Try to set up AngularJS version 2."
    },
    {
      id    : 2,
      title : "Set Up Angular CLI",
      type  : "Task",
      date  : new Date("10/4/2012").getTime(),
      finished: false,
      desc  : "Set up Angular CLI to quickly develop an app."
    },
    {
      id    : 3,
      title : "Get Milk",
      type  : "Shopping",
      date  : new Date("10/4/2012").getTime(),
      finished: false,
      desc  : "Get milk for breakfast."
    },
    {
      id    : 4,
      title : "Top-Up Phone Credits",
      type  : "Shopping",
      date  : new Date("10/4/2012").getTime(),
      finished: true,
      desc  : "Your phone credit is dying. Start to up immediately."
    },
  ];
}