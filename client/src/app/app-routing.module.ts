import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';
import { ListplayersComponent } from './listplayers/listplayers.component';
import { SuggestionPageComponent } from './suggestion-page/suggestion-page.component';
import { MissionComponent } from './mission/mission.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "games", component: GamesComponent },
  { path: "profile", component: ProfileComponent },
  { path: 'listplayers', component: ListplayersComponent },
  { path: 'suggestion', component: SuggestionPageComponent },
  { path: 'mission', component: MissionComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
