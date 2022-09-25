import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router,
    ) {}

  rankingPlayer() {
    this.router.navigate(['ranking-player']);
  }

  rankingGames() {
    this.router.navigate(['ranking-games']);
  }

  rankingGameByConfiguration() {
    this.router.navigate(['ranking-game-by-configuration']);
  }

  exit() {
    this.router.navigate(['tabs']);
  }

}


