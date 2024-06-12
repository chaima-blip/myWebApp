import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  email: string = '';
  password: string = '';

  login() {
    // Logic for login
    console.log('Login clicked');
  }

}
