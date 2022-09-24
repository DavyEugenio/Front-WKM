import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoriaDTO } from '../models/categoria.dto';
import { ConfiguracaoPartidaDTO } from '../models/configuracaopartida.dto';
import { RegistroPartidaNewDTO } from '../models/registropartida.new.dto';
import { CategoriaService } from '../services/domain/categoria.service';
import { PartidaService } from '../services/domain/partida.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})

export class NewGamePage implements OnInit {

  categorias: CategoriaDTO[];
  nivel: string;
  form: FormGroup;

  constructor(public categoriaService: CategoriaService, public partidaService: PartidaService, private router: Router, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.form = this.formBuilder.group({
      nivel: [null, [Validators.min(1), Validators.max(5)]],
      categoriasIds: [[], []],
      questoesIds: [null, []],
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getCategorias();
  }

  addCofiguracaoPartida() {
    if (this.form.valid) {
      if (this.form.controls.categoriasIds.value && this.form.controls.nivel.value) {
        console.log(this.form.value);
        this.partidaService.insertConfiguracao(this.form.value)
          .subscribe(response => {
            this.addPartida(response.body);
          },
            error => {
              this.form.controls.categoriasIds.setValue(null);
              this.form.controls.nivel.setValue(null);
            });
      } else {
        this.addPartida(null);
      }
    }
  }

  addPartida(confPartidaId: string) {
    let partida:RegistroPartidaNewDTO = {};
    if(confPartidaId){
      partida = { "configuracaoPartidaId": confPartidaId };
    }
    this.partidaService.insert(partida)
      .subscribe(response => {
        this.form.reset();
        this.answerQuestion(response.body);
      },
        error => {
        });
  }

  getCategorias() {
    this.categoriaService.findAll().subscribe(
      response => {
        this.categorias = response;
      }
    );;
  }

  cancelar() {
    this.form.reset();
    this.profile();
  }

  profile() {
    this.router.navigate(['tabs/tab2']);
  }

  answerQuestion(newPartidaId: string) {
    let data: NavigationExtras = {
      state: {
        partidaId: newPartidaId
      }
    };
    this.router.navigate(['answer-question'], data);
  }
}
