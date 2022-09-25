import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingPlayerPage } from './ranking-player.page';

const routes: Routes = [
  {
    path: '',
    component: RankingPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingPlayerPageRoutingModule {}
