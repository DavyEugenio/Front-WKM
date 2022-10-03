import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConfiguracaoPartidaDTO } from '../models/configuracaopartida.dto';
import { RegistroPartidaNewDTO } from '../models/registropartida.new.dto';
import { PartidaService } from '../services/domain/partida.service';

@Component({
  selector: 'app-list-configs',
  templateUrl: './list-configs.page.html',
  styleUrls: ['./list-configs.page.scss'],
})
export class ListConfigsPage implements OnInit {

  configs: ConfiguracaoPartidaDTO[];

  constructor(private router: Router,
    private partidaService: PartidaService,
  ) {
    this.getConfigs();
  }

  getConfigs() {
    this.partidaService.findPresetedConfiguracao().subscribe(
      response => {
        this.configs = response;
      }
    );
  }
  
  exitTabs() {
    this.router.navigate(['tabs']);
  }

  addPartida(confPartidaId: string) {
    let partida:RegistroPartidaNewDTO = {};
    if(confPartidaId){
      partida = { "configuracaoPartidaId": confPartidaId };
    }
    this.partidaService.insert(partida)
      .subscribe(response => {
        this.answerQuestion(response.body);
      },
        error => {
        });
  }

  answerQuestion(newPartidaId: string) {
    let data: NavigationExtras = {
      state: {
        partidaId: newPartidaId
      }
    };
    this.router.navigate(['answer-question'], data);
  }

  ngOnInit() {
  }

}
