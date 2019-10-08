import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { LoginUser } from "../models/loginUser"
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(
    private _http:HttpClient,
    public userService:UserService) { }

  getAllUsers() {
    return this._http.get('/api/user/all');
  }

  loginUser(email, password) {
    return this._http.post<LoginUser>('/api/user/login', {email, password});
  }

  authUser() {
    console.log(this.userService.token)
    return this._http.post('/api/user/auth', {token: this.userService.token})
  }

  getAllGames() {
    return this._http.get("/api/game/all")
  }
}
