import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
@Component({
  selector: 'app-login',
  template: `
    <p>
      login Works!  hahah  fbj
    </p>




    <div>
      <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">

        <input type="text"
          name="username"
          [(ngModel)]="username"
          #usernameRef="ngModel"
          required
          minlength="3"
          />
          <div *ngIf="usernameRef.errors?.required">this is required</div>
          <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div>
        <input type="password"
          name="password"
          [(ngModel)]="password"
          #passwordRef="ngModel"
          required
          />
          <div *ngIf="passwordRef.errors?.required">this is required</div>
        <button type="submit">Login</button>
      </form>
    </div>



  `,
    styles: [`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `],
  providers:[ AuthService ]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private service: AuthService
  ) { }

  ngOnInit() {
  }

  

 onSubmit(formValue) {
    console.log(formValue);
  }

}
