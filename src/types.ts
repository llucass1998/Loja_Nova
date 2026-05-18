export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  quant: number;
  valor: number;
  ativo: boolean;
  foto: string[];
}