import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  signup(signupForm: NgForm) {
    if (signupForm.valid) {
      // Logic to handle sign-up (e.g., send data to server)
      console.log('Sign up successful!');
      console.log('Name:', this.name);
      console.log('Email:', this.email);
      console.log('Password:', this.password);

      // Reset form fields
      signupForm.resetForm();
    } else {
      console.error('Form is invalid. Please fill in all fields.');
    }
  }

}
