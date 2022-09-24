import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { AuthService } from '../services/auth.service';
import { JogadorService } from '../services/domain/jogador.service';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.page.html',
  styleUrls: ['./sign-in-up.page.scss'],
})
export class SignInUpPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  form: FormGroup;
  creds: CredenciaisDTO;
  constructor(private router: Router,
    public auth: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public JogadorService: JogadorService) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      nomeUsuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.initCreds();
  }

  ngOnInit() {
    this.initCreds();
  }

  initCreds() {
    this.creds = {
      email: "",
      senha: ""
    }
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.creds = null;
        this.router.navigate(['tabs/tab2']);
      }, error => {
      });
    this.initCreds();
  }

  async invalidFieldsAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Campos inválidos',
      message: this.listErrors(),
      backdropDismiss: false,
      buttons: [{
        text: 'Ok'
      }]
    });
    await alert.present();
  }

  private listErrors(): string {
    let s: string = '';
    for (const field in this.form.controls) {
      if (this.form.controls[field].invalid || this.comparePasswords()) {
        let value = this.form.controls[field].value;
        let length: number = value.length;
        switch (field) {
          case 'nome':
            if (!value) {
              s = s + '<p><strong>Nome: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 4 || length > 120) {
                s = s + '<p><strong>Nome: </strong>O nome deve conter entre 4 e 120 caráteres</p>';
              }
            }
            break;
            case 'nomeUsuario':
            if (!value) {
              s = s + '<p><strong>Nome de Usuário: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 4 || length > 120) {
                s = s + '<p><strong>Nome de Usuário: </strong>O nome deve conter entre 4 e 120 caráteres</p>';
              }
            }
            break;
          case 'email':
            if (!value) {
              s = s + '<p><strong>Email: </strong>Preenchimento obrigatório</p>';
            } else {
              s = s + '<p><strong>Email: </strong>Email inválido</p>';
            }
            break;
          case 'senha':
            if (!value) {
              s = s + '<p><strong>Senha: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 8) {
                s = s + '<p><strong>Senha: </strong>A senha deve conter no mínimo 8 caráteres</p>';
              }
            }
            break;
          case 'confirmarSenha':
            if (!value) {
              s = s + '<p><strong>Confirmar Senha: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 8) {
                s = s + '<p><strong>Confirmar Senha: </strong>A senha deve conter no mínimo 8 caráteres</p>';
              } else {
                if (!this.comparePasswords()) {
                  s = s + '<p><strong>Confirmar Senha: </strong>Senhas não coincidem</p>';
                }
              }
            }
            break;
          default:
            s = s + '<p><strong>' + field + ': </strong>Valor inválido</p>';
            break;

        }
      }
    }
    return s;
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['tabs/tab2']);
        this.initCreds();
      }, error => { });
  }

  comparePasswords() {
    return this.form.controls.senha.value == this.form.controls.confirmarSenha.value;
  }

  signupUser() {
    if (this.form.valid && this.comparePasswords()) {
      this.JogadorService.insert(this.form.value)
        .subscribe(response => {
          this.creds = {
            email: this.form.controls.email.value,
            senha: this.form.controls.senha.value
          }
          this.showInsertOk();
          this.login();
          this.form.reset();
        },
          error => { });
    } else {
      this.invalidFieldsAlert();
    }
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Jogador cadastrado',
      backdropDismiss: false,
      buttons: [{
        text: 'Ok'
      }]
    });
    await alert.present();
  }

  
}
