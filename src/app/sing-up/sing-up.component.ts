import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'; // Import Router
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  constructor(private userService: UserService ,private router: Router) {}

  signup(signupForm: NgForm) {
    if (signupForm.valid) {
      this.userService.signup(this.name, this.email, this.password).subscribe(
        (response) => {
          console.log('Sign up successful!', response);
          this.userService.setUserEmail(this.email); // Update userEmail after successful signup
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Sign up failed:', error);
          if (error.status === 400 && error.error.email) {
            alert('Email already exists. Please use a different email.');
          } else {
            alert('Failed to sign up. Please try again later.');
          }
        }
      );
    } else {
      console.error('Form is invalid. Please fill in all fields.');
      alert('Form is invalid. Please fill in all fields.');
    }
  }


}
