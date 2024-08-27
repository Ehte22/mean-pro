import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:5000/api/v1/user"
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public users$ = this.userSubject.asObservable()


  constructor(private http: HttpClient) { }

  createUser(userData: FormData): Observable<{ message: string, result: User }> {
    return this.http.post<{ message: string, result: User }>(`${this.baseUrl}/create-user`, userData)
  }

  getUserDetails(user: User) {
    this.userSubject.next(user)
  }

  getUsers(page: number, limit: number, searchUser: string, filterByGender: string, filterByStatus: string, sortByOrder: string): Observable<{ result: User[], message: string, page: number, limit: number, total: number }> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString())
      .set("searchUser", searchUser)
      .set("filterByGender", filterByGender)
      .set("filterByStatus", filterByStatus)
      .set("sortByOrder", sortByOrder)
    return this.http.get<{ result: User[], message: string, page: number, limit: number, total: number }>(this.baseUrl, { params, withCredentials: true })
  }

  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete-user/${id}`)
  }

  editUser(selectedUser: User) {
    this.userSubject.next(selectedUser)
  }

  updateUser(userData: FormData, id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/update-user/${id}`, userData)
  }

}
