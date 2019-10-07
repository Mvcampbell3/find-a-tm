import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { LoginUser } from "../models/loginUser"

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private _http:HttpClient) { }

  getAllUsers() {
    return this._http.get('/api/user/all');
  }

  loginUser(email, password) {
    return this._http.post<LoginUser>('/api/user/login', {email, password});
  }
}
