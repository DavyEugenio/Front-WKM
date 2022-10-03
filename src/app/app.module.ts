import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestaoService } from './services/domain/questao.service';
import { CategoriaService } from './services/domain/categoria.service';
import { JogadorService } from './services/domain/jogador.service';
import { PartidaService } from './services/domain/partida.service';
import { AuthService } from './services/auth.service';
import { ImageUtilService } from './services/image-util.service';
import { PhotoService } from './services/photo.service';
import { StorageService } from './services/storage.service';
import { FormBuilder } from '@angular/forms';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { Tab3Page } from './tab3/tab3.page';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    CategoriaService,
    JogadorService,
    PartidaService,
    QuestaoService,
    AuthService,
    ImageUtilService,
    PhotoService,
    StorageService,
    FormBuilder,
    Tab3Page
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
