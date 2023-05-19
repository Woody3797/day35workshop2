import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardgameService } from './BoardgameService';
import { GameslistComponent } from './gameslist/gameslist.component';

@NgModule({
  declarations: [
    AppComponent,
    GameslistComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [BoardgameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
