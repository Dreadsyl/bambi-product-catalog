import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //---USER---//
  public register(user: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/register`, user);
  }

  public getUsers() {
    return this.http.get(`${environment.BASE_URL}/users`);
  }

  public login(data: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/login`, data);
  }

  public async logout(id: any) {
    return this.http.get(`${environment.BASE_URL}/login/logout/${id}`);
  }
}
