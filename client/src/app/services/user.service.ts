import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: boolean = false;
  token: string = "this is not loaded";

  constructor() { }

  setUser(user: boolean, token?: string): void {
    this.user = user;
    this.token = token || "";
  }
}
