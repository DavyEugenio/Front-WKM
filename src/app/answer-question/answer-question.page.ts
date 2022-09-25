import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoriaDTO } from '../models/categoria.dto';
import { QuestaoDTO } from '../models/questao.dto';
import { RespostaDTO } from '../models/resposta.dto';
import { CategoriaService } from '../services/domain/categoria.service';
import { PartidaService } from '../services/domain/partida.service';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.page.html',
  styleUrls: ['./answer-question.page.scss'],
})
export class AnswerQuestionPage implements OnInit {

  questao: QuestaoDTO;
  categoria: CategoriaDTO;
  partidaId: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private categoriaService: CategoriaService,
    private alertCtrl: AlertController) {

    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.partidaId = getNav.extras.state.partidaId;
        this.getLastQuestion();
      } else {
        this.router.navigate(['tabs/tab3']);
      }
    });
  }

  ngOnInit() {
  }

  getLastQuestion(){
    this.partidaService.getLastQuestion(this.partidaId)
        .subscribe(
          response => {
            this.questao = response;
            console.log(this.questao);
            this.getCategoria(this.questao.categoriaId);
          },
          error => {
            console.log(error);
          }
        );
  }

  getCategoria(id: string) {
    this.categoriaService.findById(id).subscribe(
      response => {
        this.categoria = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  answerQuestion(alternativaId:string) {
    this.partidaService.answerQuestion({"registroPartidaId":this.partidaId, "alternativaId":alternativaId}).subscribe(
      response => {
        if(response.status == 210){
          this.endGame();
        } else {
          this.correctAnswer();
        }
        
      },
      error => {
        this.router.navigate(['tabs/tab3']);
      }
    );;
  }

  async correctAnswer() {
    let alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Resposta correta!',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.getLastQuestion();
          }
        },
        {
          text: 'Sair',
          handler: () => {
            this.router.navigate(['tabs/tab3']);
          }
        }
      ]
    });
    await alert.present();
  }

  async endGame() {
    let alert = await this.alertCtrl.create({
      header: 'Vitória!',
      message: 'Bom jogo!',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['tabs/tab3']);
          }
        }
      ]
    });
    await alert.present();
  }
}
