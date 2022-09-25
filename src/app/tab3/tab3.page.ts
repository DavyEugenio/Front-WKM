import { Component } from '@angular/core';
import { PartidaService } from "src/app/services/domain/partida.service";
import { JogadorService } from "src/app/services/domain/jogador.service";
import { RegistroPartidaDTO} from "src/app/models/registropartida.dto";
import { AuthService } from "src/app/services/auth.service";
import { StorageService } from "src/app/services/storage.service";
import { JogadorDTO } from "src/app/models/jogador.dto";
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  
  partidas: RegistroPartidaDTO[] = [];
  jogador: JogadorDTO;


  constructor(private jogadorService: JogadorService,
    private router: Router,
    private partidaService: PartidaService,
    public storage: StorageService,
    public auth: AuthService,){
  }

  ionViewDidEnter() {
    this.getJogador();
  }

  async getPartidas() {
    console.log(this.jogador);
    this.partidaService.findActivesByJogador(this.jogador.id).subscribe(
      response => {
        this.partidas =response;
      }
    );
  }

  async getJogador() {
    let us = this.storage.getLocalUser();
    if (us && us.email) {
      await this.jogadorService.findByEmail(us.email)
        .subscribe(
          response => {
            this.jogador = response;
            this.getPartidas();
          },
          error => {
            if (error.status == 403) {
              this.logout();
            }
          }
        );
    } else {
      this.logout();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['sign-in-up']);
  }

  answerQuestion(partidaId: string) {
    let data: NavigationExtras = {
      state: {
        partidaId: partidaId
      }
    };
    this.router.navigate(['answer-question'], data);
  }

  ng
}
