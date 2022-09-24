import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInUpPageRoutingModule } from './sign-in-up-routing.module';

import { SignInUpPage } from './sign-in-up.page';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    SignInUpPageRoutingModule
  ],
  declarations: [SignInUpPage]
})
export class SignInUpPageModule {}
