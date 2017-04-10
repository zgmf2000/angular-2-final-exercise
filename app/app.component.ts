import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'td-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent {

  constructor(private router : Router){};

  addNew()
  {
    this.router.navigate(['/', 'add']);
  }

  checkNewPage()
  {
    if (this.router.url === "/add")
      return false;
    else
      return true;
  }
}
