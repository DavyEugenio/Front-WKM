import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recovery() {
    if (this.form.controls.email.valid) {
      this.authService.recoverPassword(this.form.value)
        .subscribe(
          response => {
            this.successfully();
          },
          error => {
          }
        );
    } else {
      this.invalidFieldsAlert();
    }
  }

  async invalidFieldsAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Campo inválido',
      message: this.error(),
      backdropDismiss: false,
      buttons: [{
        text: 'Ok'
      }]
    });
    await alert.present();
  }

  error() {
    if (!this.form.controls.email) {
      return "<strong>Email: </strong>Preenchimento obrigatório"
    } else {
      return "<strong>Email: </strong>Email inválido"
    }
  }

  async successfully() {
    const alert = await this.alertCtrl.create({
      header: 'Recuperação De Senha',
      message: `Um email com o link de recuperação foi enviado para ${this.form.controls.email.value}`,
      backdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: data => {
          this.router.navigate(['/tabs/tab2']);
        }
      }]

    });
    await alert.present();
  }

  ngOnInit() {
  }

}
