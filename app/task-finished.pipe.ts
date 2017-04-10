import { Pipe } from '@angular/core';

@Pipe({
  name: 'taskFinished'
})

export class TaskFinishedPipe {
  transform(value) {
    if (value)
      return "Task Finished.";
    else
      return "";
  }
}