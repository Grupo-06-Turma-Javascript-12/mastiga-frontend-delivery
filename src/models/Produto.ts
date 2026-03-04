import type { Categoria } from "./Categoria"
import type { Usuario } from "./Usuario"

export interface Produto {
  id: number
  nome: string
  preco: number
  tempo_preparo: number
  tipo: string
  categoria: Categoria | null
  usuario: Usuario | null
}