import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroPartidaDTO } from 'src/app/models/registropartida.dto';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { ConfiguracaoPartidaDTO } from 'src/app/models/configuracaopartida.dto';
import { QuestaoDTO } from 'src/app/models/questao.dto';
import { RespostaDTO } from 'src/app/models/resposta.dto';
import { AlternativaDTO } from 'src/app/models/alternativa.dto';
import { ConfiguracaoPartidaNewDTO } from 'src/app/models/configuracaopartida.new.dto';
import { RankingDTO } from 'src/app/models/ranking.dto';
import { RegistroPartidaNewDTO } from 'src/app/models/registropartida.new.dto';

@Injectable({
    providedIn: 'root'
})
export class PartidaService {

    constructor(public http: HttpClient) { }

    findConfiguracaoById(id: string): Observable<ConfiguracaoPartidaDTO> {
        return this.http.get<ConfiguracaoPartidaDTO>(`${API_CONFIG.baseUrl}/partidas/configuracoes/${id}`);
    }

    findAllConfiguracao(): Observable<ConfiguracaoPartidaDTO[]> {
        return this.http.get<ConfiguracaoPartidaDTO[]>(`${API_CONFIG.baseUrl}/partidas/configuracoes/`);
    }

    findPresetedConfiguracao(): Observable<ConfiguracaoPartidaDTO[]> {
        return this.http.get<ConfiguracaoPartidaDTO[]>(`${API_CONFIG.baseUrl}/partidas/configuracoes/predefinidas`);
    }

    insertConfiguracao(obj: ConfiguracaoPartidaNewDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/partidas/configuracoes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    deleteConfiguracao(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/partidas/${id}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findAll(): Observable<RegistroPartidaDTO> {
        return this.http.get<RegistroPartidaDTO>(`${API_CONFIG.baseUrl}/partidas`);
    }

    findById(id: string): Observable<RegistroPartidaDTO> {
        return this.http.get<RegistroPartidaDTO>(`${API_CONFIG.baseUrl}/partidas/${id}`);
    }

    getLastQuestion(id: string): Observable<QuestaoDTO> {
        return this.http.get<QuestaoDTO>(`${API_CONFIG.baseUrl}/partidas/${id}/questao`);
    }

    answerQuestion(answer: RespostaDTO) {
        console.log(answer);

        return this.http.post(
            `${API_CONFIG.baseUrl}/partidas/responder`,
            answer,
            {
                observe: 'response'
            }
        );
    }

    findActivesByJogador(id: string): Observable<RegistroPartidaDTO[]> {
        return this.http.get<RegistroPartidaDTO[]>(`${API_CONFIG.baseUrl}/partidas/jogador/${id}`);
    }

    insert(obj: RegistroPartidaNewDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/partidas`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }


    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/partidas/${id}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    rank(): Observable<RankingDTO[]> {
        return this.http.get<RankingDTO[]>(`${API_CONFIG.baseUrl}/partidas/ranking`);
    }

    rankByConfiguracao(id: string): Observable<RankingDTO[]> {
        return this.http.get<RankingDTO[]>(`${API_CONFIG.baseUrl}/partidas/ranking/configuracao/${id}`);
    }
}
