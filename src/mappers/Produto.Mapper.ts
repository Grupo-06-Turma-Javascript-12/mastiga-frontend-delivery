
import type { Produto } from "../models/Produto"
import type { ProdutoPublico } from "../models/ProdutoPublico"

export function mapProdutoToProdutoPublico(
  produto: Produto
): ProdutoPublico {
  return {
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    tempo_preparo: produto.tempo_preparo,
    tipo: produto.tipo,
    categoriaDescricao: produto.categoria?.descricao ?? "Sem categoria"
  }
}