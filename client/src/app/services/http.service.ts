import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Game } from "../models/game";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(
    private _http: HttpClient) { }

  getAllUsers() {
    return this._http.get('/api/user/all');
  }

  loginUser(email, password) {
    return this._http.post('/api/user/login', { email, password });
  }

  signupUser(email, username, password) {
    return this._http.post('/api/user/signup', { email, username, password })
  }

  getAllGames() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'))
    console.log(token)
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/game/all", { headers })
  }

  checkAuth(token) {
    console.log(token)
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/auth", { headers })
  }

  getUserProfile(token) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/profile", { headers })
  }
}
