import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingGamesPageRoutingModule } from './ranking-games-routing.module';

import { RankingGamesPage } from './ranking-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingGamesPageRoutingModule
  ],
  declarations: [RankingGamesPage]
})
export class RankingGamesPageModule {}
