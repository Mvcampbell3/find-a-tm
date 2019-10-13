import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';
import { ListplayersComponent } from './listplayers/listplayers.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "games", component: GamesComponent },
  { path: "profile", component: ProfileComponent},
  { path: 'listplayers', component: ListplayersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
