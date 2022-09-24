import { AlternativaDTO } from "./alternativa.dto";
import { CategoriaDTO } from "./categoria.dto";

export interface QuestaoDTO {
    id:string;
    texto:string;
    nivel:string;
    categoriaId:string;
    categoria:CategoriaDTO;
    alternativas:AlternativaDTO[];
}