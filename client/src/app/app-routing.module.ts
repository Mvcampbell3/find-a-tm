import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "games", component: GamesComponent },
  { path: "profile", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
