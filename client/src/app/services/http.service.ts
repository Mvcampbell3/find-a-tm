import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  gameViewPlayers: string = '';

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
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/game/all", { headers })
  }

  checkAuth(token) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/auth", { headers })
  }

  updateUserOnline(token) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.put('/api/user/updateonline', { date: Date.now() }, { headers })
  }

  getUserProfile(token) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/profile", { headers })
  }

  getUserGamesList(token) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/gameList", { headers })
  }

  getPlayersListGame(gameId) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`/api/game/listplayers/${gameId}`, { headers });
  }
}
