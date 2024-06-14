import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import bootstrap from 'bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router'; 
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

  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router) {
    objUser:[];
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
    const userId = 'user_id'; // Replace with the actual user ID
    this.http.get<User>(`http://your-backend-api-url/users/${userId}`).subscribe(
      (userData: User) => {
        this.userForm.patchValue({
          email: userData.email ?? '',
          name: userData.name ?? '',
          password: '********' // Always show password as placeholder for security
        });
        this.user = { ...userData }; // Store complete user object
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  saveChanges(): void {
    if (this.userForm.valid) {
      const updatedUserData = this.userForm.value;
      const userId = 'user_id'; // Replace with the actual user ID
      this.http.put(`http://your-backend-api-url/users/${userId}`, updatedUserData).subscribe(
        () => {
          console.log('User information updated successfully');
          this.user = { ...updatedUserData }; // Update local user object with changes
        },
        (error: any) => {
          console.error('Error updating user information:', error);
        }
      );
    }
  }

  deleteAccount(): void {
    const userId = 'user_id'; // Replace with actual user ID
    this.http.delete(`http://your-backend-api-url/users/${userId}`).subscribe(
        () => {
            console.log('Account deleted successfully');
            // Navigate to login page after account deletion
            this.router.navigate(['/Login']);
            // Optional: Close the delete modal using Bootstrap modal instance
            const deleteModalElement = document.getElementById('staticBackdropdelete');
            if (deleteModalElement) {
                deleteModalElement.style.display = 'none';
            }
        },
        (error: any) => {
            console.error('Error deleting account:', error);
        }
    );
}

}
