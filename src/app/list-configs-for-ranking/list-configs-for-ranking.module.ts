import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListConfigsForRankingPageRoutingModule } from './list-configs-for-ranking-routing.module';

import { ListConfigsForRankingPage } from './list-configs-for-ranking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListConfigsForRankingPageRoutingModule
  ],
  declarations: [ListConfigsForRankingPage]
})
export class ListConfigsForRankingPageModule {}
