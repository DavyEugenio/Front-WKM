import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConfiguracaoPartidaDTO } from '../models/configuracaopartida.dto';
import { PartidaService } from '../services/domain/partida.service';

@Component({
  selector: 'app-list-configs-for-ranking',
  templateUrl: './list-configs-for-ranking.page.html',
  styleUrls: ['./list-configs-for-ranking.page.scss'],
})
export class ListConfigsForRankingPage implements OnInit {

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

  rankByConfig(configId: string) {
    let data: NavigationExtras = {
      state: {
        configId: configId
      }
    };
    this.router.navigate(['ranking-game-by-configuration'], data);
  }

  ngOnInit() {
  }
}
