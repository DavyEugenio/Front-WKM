import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from '../config/api.config';
import { RankingDTO } from '../models/ranking.dto';
import { JogadorService } from '../services/domain/jogador.service';

@Component({
  selector: 'app-ranking-player',
  templateUrl: './ranking-player.page.html',
  styleUrls: ['./ranking-player.page.scss'],
})
export class RankingPlayerPage implements OnInit {
  ranking: RankingDTO[] = [];


  constructor(private router: Router,
    private jogadorService: JogadorService,
  ) { 
    this.getRanking();
    }

  getRanking() {
    this.jogadorService.rank().subscribe(
      response => {
        this.ranking = response;
        this.getImageOfPlayerIfExists();
      }
    );
  }

  getImageOfPlayerIfExists() {
    for (let player of this.ranking) {
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
