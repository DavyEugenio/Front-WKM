import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from '../config/api.config';
import { RankingDTO } from '../models/ranking.dto';
import { JogadorService } from '../services/domain/jogador.service';
import { PartidaService } from '../services/domain/partida.service';

@Component({
  selector: 'app-ranking-games',
  templateUrl: './ranking-games.page.html',
  styleUrls: ['./ranking-games.page.scss'],
})
export class RankingGamesPage implements OnInit {
  rankingGame: RankingDTO[] = []

  constructor(private router: Router,
    private partidaService: PartidaService,
    private jogadorService: JogadorService,
  ) {
    this.getRankingGames();
  }

  getRankingGames() {
    this.partidaService.rank().subscribe(
      response => {
        this.rankingGame = response;
        this.getImageOfPlayerIfExists();
      }
    );
  }

  getImageOfPlayerIfExists() {
    for (let player of this.rankingGame) {
      this.jogadorService.getImageFromServer(player.jogadorId)
        .subscribe(response => {
          player.imageUrl = `${API_CONFIG.baseUrl}/imagens/jog${player.jogadorId}.jpg`;
        },
          error => {
            player.imageUrl = '/assets/img/imagem.jpg';
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
