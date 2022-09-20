import { AlternativaDTO } from "./alternativa.dto";

export interface QuestaoDTO {
    id:string;
    texto:string;
    nivel:string;
    categoria:string;
    alternativas:AlternativaDTO[];
}