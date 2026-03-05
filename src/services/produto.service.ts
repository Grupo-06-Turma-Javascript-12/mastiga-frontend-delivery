import type { Produto } from "../models/Produto"
import type { ProdutoPublico } from "../models/ProdutoPublico"
import { mapProdutoToProdutoPublico } from "../mappers/Produto.Mapper"
import { buscar } from "./Service"

export async function listarProdutosPublicos(
  header?: object
): Promise<ProdutoPublico[]> {

  let resultado: ProdutoPublico[] = []

  await buscar(
    "/produtos",
    (dadosApi: Produto[]) => {
      resultado = dadosApi.map(mapProdutoToProdutoPublico)
    },
    header ?? {}
  )

  return resultado
}