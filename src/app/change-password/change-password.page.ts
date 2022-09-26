import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SenhaUpdateDTO } from '../models/senhaUpdate.dto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  formEdit: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private router: Router) {
    this.formEdit = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.authService.refreshToken();
  }

  edit() {
    if (this.formEdit.valid && this.comparePasswords && this.comparePasswords()) {
      let passwordDto: SenhaUpdateDTO = { "novaSenha": this.formEdit.controls.newPassword.value, "senha": this.formEdit.controls.password.value };
      this.authService.updatePassword(passwordDto)
        .subscribe(
          response => {
            this.formEdit.reset();
            this.showInsertOk();
            this.router.navigate(['tabs/tab2']);
          },
          error => {
          }
        );
    } else {
      this.invalidFieldsAlert();
    }
  }

  comparePasswords(): boolean {
    return this.formEdit.controls.newPassword.value == this.formEdit.controls.confirmNewPassword.value;
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
    for (const field in this.formEdit.controls) {
      if (this.formEdit.controls[field].invalid || !this.comparePasswords()) {
        let value = this.formEdit.controls[field].value;
        let length: number = 0;
        if (value) {
          length = value.length
        }
        switch (field) {
          case 'password':
            if (!value) {
              s = s + '<p><strong>Senha Antiga: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 8) {
                s = s + '<p><strong>Senha Antiga: </strong>A senha deve conter no mínimo 8 caráteres</p>';
              }
            }
            break;
          case 'newPassword':
            if (!value) {
              s = s + '<p><strong>Nova Senha: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 8) {
                s = s + '<p><strong>Nova Senha: </strong>A senha deve conter no mínimo 8 caráteres</p>';
              }
            }
            break;
          case 'confirmNewPassword':
            if (!value) {
              s = s + '<p><strong>Confirmar Nova Senha: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 8) {
                s = s + '<p><strong>Confirmar Nova Senha: </strong>A senha deve conter no mínimo 8 caráteres</p>';
              } else {
                if (!this.comparePasswords()) {
                  s = s + '<p><strong>Confirmar Nova Senha: </strong>Senhas não coincidem</p>';
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

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Senha alterada com sucesso',
      backdropDismiss: false,
      buttons: [{
        text: 'Ok'
      }]
    });
    await alert.present();
  }

  cancel() {
    this.formEdit.reset();
    this.router.navigate(['tabs/tab2']);
  }
  ngOnInit() {
  }

}
