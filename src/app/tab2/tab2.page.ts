import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { JogadorDTO } from '../models/jogador.dto';
import { AuthService } from '../services/auth.service';
import { JogadorService } from '../services/domain/jogador.service';
import { ImageUtilService } from '../services/image-util.service';
import { PhotoService } from '../services/photo.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  player: JogadorDTO;
  image;
  edit = false;
  formEdit: FormGroup;
  constructor(
    public storage: StorageService,
    private router: Router,
    public alertCtrl: AlertController,
    public auth: AuthService,
    public jogadorService: JogadorService,
    public photoService: PhotoService,
    public formBuilder: FormBuilder,
    public imageUtils: ImageUtilService,
    public sanitizer: DomSanitizer
  ) {
    this.image = '/assets/img/user.jpg';
    this.formEdit = this.formBuilder.group({
      nome: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      nomeUsuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      email: ["", [Validators.required, Validators.email]],
    });
    this.fillPlayer();
  }

  ionViewDidEnter() {
    this.fillPlayer();
  }

  fillPlayer() {
    let us = this.storage.getLocalUser();
    if (us && us.email) {
      this.jogadorService.findByEmail(us.email)
        .subscribe(
          response => {
            this.player = response;
            this.getImageOfUsuarioIfExists();
            this.fillEditForm();
          });
    } else {
      this.logout();
    }
  }

  getImageOfUsuarioIfExists() {
    this.jogadorService.getImageFromServer(this.player.id)
      .subscribe(response => {
        this.imageUtils.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.image = this.sanitizer.bypassSecurityTrustUrl(str);
        }
        );
      },
        error => {
          this.image = '/assets/img/user.jpg';
        }
      );
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['sign-in-up']);
  }

  public async getCameraPicture() {
    var photo = await this.photoService.getCameraPicture();
    await this.sendPicture(photo);
  }

  sendPicture(picture) {
    this.jogadorService.upLoadPicture(picture)
      .subscribe(response => {
        this.getImageOfUsuarioIfExists();
      },
        error => { }
      );
  }

  deletePicture() {
    this.jogadorService.deletePicture()
      .subscribe(response => {
        this.getImageOfUsuarioIfExists();
      },
        error => {
        }
      );
  }

  private listErrors(): string {
    let s: string = '';
    for (const field in this.formEdit.controls) {
      if (this.formEdit.controls[field].invalid) {
        let value = this.formEdit.controls[field].value;
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
              s = s + '<p><strong>Nome de usuário: </strong>Preenchimento obrigatório</p>';
            } else {
              if (length < 4 || length > 120) {
                s = s + '<p><strong>Nome: </strong>O nome de usuário deve conter entre 4 e 120 caráteres</p>';
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
          default:
            s = s + '<p><strong>' + field + ': </strong>Valor inválido</p>';
            break;
        }
      }
    }
    return s;
  }

  async showAlertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Joagdor alterado',
      message: 'Joagdor alterado com sucesso',
      backdropDismiss: false,
      buttons: [{
        text: 'Ok'
      }]
    });
    await alert.present();
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

  async confirmEdit() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: '<p>Está certo em alterar seus dados?</p> <p>Obs.: Caso altere seu e-mail terá que fazer o login nomente.</p>',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.editUser();
          }
        }
      ]
    });
    await alert.present();
  }

  editProfile() {
    this.edit = true;
    this.fillEditForm();
  }

  fillEditForm() {
    this.formEdit.controls.nome.setValue(this.player.nome);
    this.formEdit.controls.nomeUsuario.setValue(this.player.nomeUsuario);
    this.formEdit.controls.email.setValue(this.player.email);
  }

  editUser() {
    if (this.formEdit.valid) {
      console.log(this.formEdit.value);
      this.jogadorService.update(this.player.id, this.formEdit.value).subscribe(
        response => {
          this.showAlertOk();
          if (this.player.email == this.formEdit.controls.email.value) {
            this.fillPlayer();
            this.cancelForm();
          } else {
            this.logout();
          }
        },
        error => {
        }
      );
    } else {
      this.invalidFieldsAlert();
    }
  }

  cancelForm() {
    this.edit = false;
    this.formEdit.reset();
  }
}
