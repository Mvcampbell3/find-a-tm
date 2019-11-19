import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';
import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';
import { ListplayersComponent } from './listplayers/listplayers.component';
import { GamesModalComponent } from './games-modal/games-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SuggestionPageComponent } from './suggestion-page/suggestion-page.component';
import { MissionComponent } from './mission/mission.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    ProfileComponent,
    ListplayersComponent,
    GamesModalComponent,
    DeleteModalComponent,
    SuggestionPageComponent,
    MissionComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
