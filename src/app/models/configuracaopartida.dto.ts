import { CategoriaDTO } from "./categoria.dto";
import { QuestaoDTO } from "./questao.dto";


export interface ConfiguracaoPartidaDTO{
	id: string;
	nivel: number;
	questoes: QuestaoDTO[];
	categorias: CategoriaDTO[];
}