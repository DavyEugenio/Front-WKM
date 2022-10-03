import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListConfigsForRankingPage } from './list-configs-for-ranking.page';

const routes: Routes = [
  {
    path: '',
    component: ListConfigsForRankingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListConfigsForRankingPageRoutingModule {}
