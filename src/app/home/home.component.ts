import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import bootstrap from 'bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service';
import { LogInComponent } from '../log-in/log-in.component';

interface User {
  email: string;
  name: string;
  password?: string; // Optional as it might not always be included
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userForm: FormGroup;
  user: User = {
    email: '',
    name: '',
    password: '********' // Placeholder, will be replaced by actual password
  };

  originalEmail: string = ''; 
ngModel: any;

  constructor(private http: HttpClient,private el: ElementRef,
    private renderer: Renderer2, private fb: FormBuilder, private router: Router,private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['********', Validators.required] // Placeholder
    });
  }

  ngOnInit(): void {
    
    this.fetchUserData();
  }
  fetchUserData(): void {
    const userEmail = this.userService.getUserEmail();
    if (userEmail) {
      this.userService.getUserByEmail(userEmail).subscribe(
        (userData: User) => {
          this.userForm.patchValue({
            email: userData.email ?? '',
            name: userData.name ?? '',
            password: '********'
          });
          this.user = { ...userData };
          this.originalEmail = userEmail; // Store the original email
        },
        (error: any) => {
          console.error('Error fetching user details:', error);
          this.router.navigate(['/login']);
        }
      );
    } /*else {
      console.error('No user email found. Please log in.');
      this.router.navigate(['/login']);
    }*/
}
name: string = '';
  email: string = '';
  password: string = '';

  
  saveChanges(): void { 
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    const updatedUserData: any = {};

    // Add name if not empty
    if (this.name.trim() !== '') {
      updatedUserData.name = this.name.trim();
    }

    // Add email if not empty
    if (this.email.trim() !== '') {
      updatedUserData.email = this.email.trim();
    }

    // Add password if not empty
    if (this.password.trim() !== '') {
      updatedUserData.password = this.password.trim();
    }

    // Get the original email from the user service

    console.log('Updated User Data:', updatedUserData);

    // Call updateUser method with original email and updatedUserData if there's any data to update
      // Call updateUser method with original email and updatedUserData if there's any data to update
      const originalEmail = localStorage.getItem('originalEmail');
      if (originalEmail) {
        this.userService.updateUser(originalEmail, updatedUserData).subscribe(
          () => {
            console.log('User information updated successfully');
            this.userService.setUserEmail(updatedUserData.email); // Update userEmail in UserService
            this.closeModal('yourModalId'); // Close modal after successful update
            localStorage.setItem('originalEmail', updatedUserData.email); // Update originalEmail in localStorage
          
          window.location.reload(); 
          // Optionally update local state or display success message
        },
        (error: any) => {
          console.error('Error updating user information:', error);
          // Handle error, display error message, etc.
        }
      );
    } else {
      console.warn('No fields to update or user email not found.');
    }
  }


  



  deleteAccount(): void {
    const userEmail = this.userService.getUserEmail();
    if (userEmail) {
      this.userService.deleteUserByEmail(userEmail).subscribe(
        () => {
          console.log('Account deleted successfully');
          this.closeModal('deleteModal');
          setTimeout(() => {
            this.router.navigate(['/Login']).then(() => {
              window.location.reload(); // Ensure the page is completely refreshed
            });
          }, 300);
        },
        (error: any) => {
          console.error('Error deleting account:', error);
        }
      );
    } else {
      console.error('No user email found. Please log in.');
      this.router.navigate(['/Login']);
    }
  }


  private closeModal(modalId: string): void {
    const modalElement = this.el.nativeElement.querySelector(`#${modalId}`);
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      const backdrop = this.el.nativeElement.querySelector('.modal-backdrop');
      if (backdrop) {
        this.renderer.removeClass(backdrop, 'show');
        this.renderer.removeChild(document.body, backdrop);
      }
    }
  }
}
