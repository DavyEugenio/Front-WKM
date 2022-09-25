import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingPlayerPageRoutingModule } from './ranking-player-routing.module';

import { RankingPlayerPage } from './ranking-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingPlayerPageRoutingModule
  ],
  declarations: [RankingPlayerPage]
})
export class RankingPlayerPageModule {}
