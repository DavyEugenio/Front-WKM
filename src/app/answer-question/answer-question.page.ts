import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaDTO } from '../models/categoria.dto';
import { QuestaoDTO } from '../models/questao.dto';
import { CategoriaService } from '../services/domain/categoria.service';
import { QuestaoService } from '../services/domain/questao.service';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.page.html',
  styleUrls: ['./answer-question.page.scss'],
})
export class AnswerQuestionPage implements OnInit {

  questao: QuestaoDTO;
  categoria:string;
  constructor(private route: ActivatedRoute,
    
    private questaoService: QuestaoService,
    private categoriaService: CategoriaService) {
    this.route.queryParams.subscribe(params => {
      this.questaoService.findById("1")
        .subscribe(
          response => {
            this.questao = response;
            console.log(this.questao);
            this.categoria = response.categoria;
          },
          error => {
            console.log(error);
          }
        );

    });
  }

  ngOnInit() {
  }

  getCategoria() {
    this.categoriaService.findById(this.questao.categoria).subscribe(
      response => {
        //this.categoria = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  answerQuestion(){
    
  }
}
