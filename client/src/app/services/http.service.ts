import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { LoginUser } from "../models/loginUser"
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(
    private _http: HttpClient,
    public userService: UserService) { }

  getAllUsers() {
    return this._http.get('/api/user/all');
  }

  loginUser(email, password) {
    return this._http.post<LoginUser>('/api/user/login', { email, password });
  }

  authUser() {
    const token = JSON.parse(localStorage.getItem("token-find-tm"));
    console.log(token);
    return this._http.post('/api/user/auth', { token })
  }

  getAllGames() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'))
    console.log(token)
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/game/all", { headers})
  }
}
