import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export interface User {
  name: string;
  email: string;
  password?: string; // Optional as it might not always be included
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private localStorageKey = 'loggedInUserEmail';

  updateUser(originalEmail: string, updatedUserData: User): Observable<any> {
    const url = `${this.baseUrl}update/${originalEmail}/`;
    return this.http.put(url, updatedUserData);
  }

  
  private user: User | null = null; // Store user data
  private baseUrl = 'http://localhost:8000/api/users/';
  private userEmail: string = '';
  constructor(private http: HttpClient) {}

 
  signup(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post<any>(`${this.baseUrl}create/`, body).pipe(
      tap(response => {
        this.setUserEmail(email);
      }),
      catchError(error => {
        throw error;
      })
    );
  }
  clearUserEmail(): void {
    localStorage.removeItem(this.localStorageKey);
  }
  setUserEmail(email: string): void {
    localStorage.setItem(this.localStorageKey, email);
  }
  getUser(): User | null {
    return this.user;
  }
  private apiUrl = 'http://localhost:8000/api/users/';


  setUser(user: User): void {
    this.user = user;
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.baseUrl}login/`, body).pipe(
      tap(response => {
        this.setUserEmail(email);
      }),
      catchError(error => {
        throw error;
      })
    );
  }
  
  getUserEmail(): string {
    return localStorage.getItem(this.localStorageKey) || '';
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8000/api/users/email/${email}/`);
  }

  updateUserByEmail(email: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}email/${email}/`, userData);
  }


  setLoggedInUser(user: User): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }
  getLoggedInUser(): User | null {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }
  

  deleteUserByEmail(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${email}/`);
  }
  clearLoggedInUser(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  isLoggedIn(): boolean {
    return !!this.getLoggedInUser();
  }
}
