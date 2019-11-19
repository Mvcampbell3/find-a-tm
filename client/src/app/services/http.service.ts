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

  checkAuth() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/auth", { headers })
  }

  updateUserOnline() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.put('/api/user/updateonline', { date: Date.now() }, { headers })
  }

  getGameInfo(gameID) {
    console.log(gameID)
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`/api/game/info/${gameID}`, { headers });
  }

  getUserProfile() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/profile", { headers })
  }

  getUserGamesList() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'))
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this._http.get("/api/user/gameList", { headers })
  }

  getPlayersListGame(gameId) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`/api/game/listplayers/${gameId}`, { headers });
  }

  createMatrix(gameID, selfRating, platform, gamerTag) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post('/api/matrix/newmatrix', { gameID, selfRating, platform, gamerTag }, { headers })
  }

  deleteMatrix(matrixID) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete(`/api/matrix/delete/${matrixID}`, { headers })
  }

  addPlatform(system, gamerTag) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put(`/api/user/addplatform`, { system, gamerTag }, { headers })
  }

  deletePlatform(system, gamerTag) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put('/api/user/deleteplatform', { system, gamerTag }, { headers })
  }

  createSuggestion(game_title) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post('/api/suggestion/newsuggestion', { game_title }, { headers })
  }

  checkAdmin() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get('/api/suggestion/checkAuth', { headers })
  }

  getSuggestions() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get('/api/suggestion', { headers })
  }

  deleteSuggestion(id) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete(`/api/suggestion/delete/${id}`, { headers })
  }

  changeAddedSuggestion(id, added) {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put(`/api/suggestion/added/${id}`, { added }, { headers })
  }
}
