import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        // Handle successful login
        console.log('Login successful', response);
        // Assuming the response contains a token or user details
        // Store the token or user details as needed
        // Navigate to the home page or another page
        this.router.navigate(['/home']);
      },
      error => {
        // Handle login error
        console.error('Login failed', error);
        alert('Login failed')
        window.location.reload(); 
      }
    );
  }
}
