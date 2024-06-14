import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface User {
  name: string;
  email: string;
  password?: string; // Optional as it might not always be included
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/users/';
  private userEmail: string = '';
  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post<any>(`${this.baseUrl}create/`, body);
  }

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  private apiUrl = 'http://localhost:8000/api/users/';


  getUserEmail(): string {
    return this.userEmail;
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}email/${email}/`);
  }

  updateUserByEmail(email: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}email/${email}/`, userData);
  }

  deleteUserByEmail(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${email}/`);
  }
}
