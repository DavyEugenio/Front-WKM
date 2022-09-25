import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingGameByConfigurationPageRoutingModule } from './ranking-game-by-configuration-routing.module';

import { RankingGameByConfigurationPage } from './ranking-game-by-configuration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingGameByConfigurationPageRoutingModule
  ],
  declarations: [RankingGameByConfigurationPage]
})
export class RankingGameByConfigurationPageModule {}
