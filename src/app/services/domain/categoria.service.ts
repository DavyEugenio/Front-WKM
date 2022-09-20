import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }

  findById(id: string): Observable<CategoriaDTO> {
    return this.http.get<CategoriaDTO>(`${API_CONFIG.baseUrl}/categorias/${id}`);
  }
}
