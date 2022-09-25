import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingGameByConfigurationPage } from './ranking-game-by-configuration.page';

const routes: Routes = [
  {
    path: '',
    component: RankingGameByConfigurationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingGameByConfigurationPageRoutingModule {}
