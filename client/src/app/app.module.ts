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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    ProfileComponent,
    ListplayersComponent,
    GamesModalComponent
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
