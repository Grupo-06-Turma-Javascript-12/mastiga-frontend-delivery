import type { ProdutoPublico } from "./ProdutoPublico"

export interface ItemCarrinho {
  produto: ProdutoPublico
  quantidade: number
}