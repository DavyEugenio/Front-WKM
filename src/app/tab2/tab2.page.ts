import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  jogador: JogadorDTO;
  image;
  constructor(
    public storage: StorageService,
    private router: Router,
    public auth: AuthService,
    public jogadorService: JogadorService,
    public photoService: PhotoService,
    public imageUtils: ImageUtilService,
    public sanitizer: DomSanitizer
  ) {
    this.image = '/assets/img/user.jpg';
    this.fillPlayer();
  }

  fillPlayer() {
    let us = this.storage.getLocalUser();
    if (us && us.email) {
      this.jogadorService.findByEmail(us.email)
        .subscribe(
          response => {
            this.jogador = response;
            this.getImageOfUsuarioIfExists();
          },
          error => {
            if (error.status == 403) {
              this.logout();
            }
          }
        );
    } else {
      this.logout();
    }
  }

  getImageOfUsuarioIfExists() {
    this.jogadorService.getImageFromServer(this.jogador.id)
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
    this.router.navigate(['tabs/tab2']);
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
}
