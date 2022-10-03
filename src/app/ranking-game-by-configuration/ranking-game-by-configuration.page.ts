import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../config/api.config';
import { RankingDTO } from '../models/ranking.dto';
import { JogadorService } from '../services/domain/jogador.service';
import { PartidaService } from '../services/domain/partida.service';

@Component({
  selector: 'app-ranking-game-by-configuration',
  templateUrl: './ranking-game-by-configuration.page.html',
  styleUrls: ['./ranking-game-by-configuration.page.scss'],
})
export class RankingGameByConfigurationPage implements OnInit {
  rankingGamesByConfiguration: RankingDTO[] = [];
  configId:string;
  constructor(private router: Router,
    private partidaService: PartidaService,
    private jogadorService: JogadorService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.configId = getNav.extras.state.configId;
        this.getRankingGamesByConfiguration()
      } else {
        this.router.navigate(['tabs/tab1']);
      }
    });
  }

  getRankingGamesByConfiguration() {
    this.partidaService.rankByConfiguracao(this.configId).subscribe(
      response => {
        this.rankingGamesByConfiguration = response;
        this.getImageOfPlayerIfExists();
      }
    )
  }

  getImageOfPlayerIfExists() {
    for (let player of this.rankingGamesByConfiguration) {
      this.jogadorService.getImageFromServer(player.jogadorId)
        .subscribe(response => {
          player.imageUrl = `${API_CONFIG.baseUrl}/imagens/jog${player.jogadorId}.jpg`;
        },
        error => {
          player.imageUrl = '/assets/img/user.jpg';
        }
      );
    }
  }

  exitTabs() {
    this.router.navigate(['tabs']);
  }

  ngOnInit() {
  }

}
