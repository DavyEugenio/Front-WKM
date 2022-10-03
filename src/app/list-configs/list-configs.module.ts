import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListConfigsPageRoutingModule } from './list-configs-routing.module';

import { ListConfigsPage } from './list-configs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListConfigsPageRoutingModule
  ],
  declarations: [ListConfigsPage]
})
export class ListConfigsPageModule {}
