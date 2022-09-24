import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from 'src/app/models/usuario.dto';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { ImageUtilService } from '../image-util.service';
import { UsuarioNewDTO } from 'src/app/models/usuario.new.dto';
import { JogadorDTO } from 'src/app/models/jogador.dto';

@Injectable({
    providedIn: 'root'
})
export class JogadorService {

    
    constructor(public http: HttpClient,
        public imageUtilService: ImageUtilService) {
    }

    findByEmail(email: string): Observable<JogadorDTO> {
        return this.http.get<JogadorDTO>(`${API_CONFIG.baseUrl}/jogadores/email?value=${email}`);
    }

    findAll(): Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/jogadores`);
    }

    
    insert(obj: UsuarioNewDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/jogadores`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(obj: UsuarioDTO, id: string) {
        return this.http.put(
          `${API_CONFIG.baseUrl}/jogadores/${id}`,
          obj,
          {
            observe: 'response',
            responseType: 'text'
          }
        );
      }

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/jogadores/${id}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    rank(): Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/jogadores/ranking`);
    }

    upLoadPicture(picture) {
        let picutreBlob = this.imageUtilService.dataUriToBlob(picture);
        let formDate: FormData = new FormData();
        formDate.set('file', picutreBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/jogadores/picture`,
            formDate,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    deletePicture() {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/jogadores/picture`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    getImageFromServer(id: string): Observable<any> {
        let url = `${API_CONFIG.baseUrl}/imagens/jog${id}.jpg`;
        return this.http.get(url, { responseType: 'blob' });
    }
}