In this project, I use:

4 Components:
  1. app.component
  2. todo-list.component
  3. todo-item.component
  4. todo-item-form.component

2 Built-In Directives:
  1. ngIf
  2. ngFor

1 Custom Directive:
  1. button-hover.directive - used in app.component, todo-list.component, todo-item.component

1 Built-in Pipe:
  1. shortDate - used in todo-item.component

1 Custom Pipe:
  1. task-finished.pipe - used in todo-item.component

2 Custom Validator - used in todo-item-form.component:
  1. prevDate
  2. maxLength

2 Services:
  1. todo-item.service
  2. providers

Mock XHR Backend (mock-xhr-backend)
Router (app.routing)