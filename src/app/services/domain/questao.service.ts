import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestaoDTO } from 'src/app/models/questao.dto';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class QuestaoService {

  constructor(public http: HttpClient) { }

  findAll(): Observable<QuestaoDTO> {
    return this.http.get<QuestaoDTO>(`${API_CONFIG.baseUrl}/questoes`);
  }

  findById(id: string): Observable<QuestaoDTO> {
    return this.http.get<QuestaoDTO>(`${API_CONFIG.baseUrl}/questoes/${id}`);
  }

  insert(obj: QuestaoDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/questoes`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  update(obj: QuestaoDTO, id: string) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/questoes/${id}`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  delete(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/questoes/${id}`,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
