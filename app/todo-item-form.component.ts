import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { TodoItemService } from './todo-item.service';
import { typeListToken } from './providers';

@Component({
  selector: 'todo-item-form',
  templateUrl: 'app/todo-item-form.component.html',
  styleUrls: ['app/todo-item-form.component.css']
})
export class TodoItemForm {
  form;

  constructor(
    private formBuilder: FormBuilder,
    private TodoItemService: TodoItemService,
    @Inject(typeListToken) public typeList,
    private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title : this.formBuilder.control('', Validators.required),
      date  : this.formBuilder.control('', this.prevDate),
      type  : this.formBuilder.control('Task'),
      desc  : this.formBuilder.control('', this.maxLength)
    });
  }

  prevDate(content)
  {
    if (content.value.length === 0)
      return null;

    let currentDate = new Date();
    let dueDate = new Date(content.value);

    if (dueDate >= currentDate) {
      return null;
    } else {
      return {
        'previousDate': "The date you selected is in the past!"
      };
    }
  }

  maxLength(content)
  {
    if (content.value.trim().length <= 250)
      return null;
    else
      return {
        'exceedChar'  : "You have exceeded the given 250 character limit."
      };
  }

  onSubmit(todoItem) {
    this.TodoItemService.add(todoItem)
      .subscribe(() => {
        this.router.navigate(['/', todoItem.type]);
      });
  }

  backToHome()
  {
    this.router.navigate(['/']);
  }
}
