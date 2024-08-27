import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, Login } from '../models/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:5000/api/v1/auth"

  constructor(
    private http: HttpClient
  ) { }

  signUp(userData: Auth): Observable<{ result: Auth, message: string }> {
    return this.http.post<{ result: Auth, message: string }>(`${this.baseUrl}/signup`, userData, {
      withCredentials: true
    })
  }

  signIn(userData: Login): Observable<{ result: Login, message: string }> {
    return this.http.post<{ result: Login, message: string }>(`${this.baseUrl}/signin`, userData, {
      withCredentials: true
    })
  }

  signOut(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/signOut`, {}, {
      withCredentials: true
    })
  }

  signInWithGoogle(token: string) {
    return this.http.post<any>(`${this.baseUrl}/login-with-google`, { token }, {
      withCredentials: true
    })
  }

}
