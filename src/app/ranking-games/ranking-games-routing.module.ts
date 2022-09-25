import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingGamesPage } from './ranking-games.page';

const routes: Routes = [
  {
    path: '',
    component: RankingGamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingGamesPageRoutingModule {}
