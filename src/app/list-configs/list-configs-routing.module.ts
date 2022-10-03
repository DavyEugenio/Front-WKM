import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListConfigsPage } from './list-configs.page';

const routes: Routes = [
  {
    path: '',
    component: ListConfigsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListConfigsPageRoutingModule {}
