import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGamePageRoutingModule } from './new-game-routing.module';

import { NewGamePage } from './new-game.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    NewGamePageRoutingModule
  ],
  declarations: [NewGamePage]
})
export class NewGamePageModule {}
