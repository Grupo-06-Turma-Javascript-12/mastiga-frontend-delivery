import type { Produto } from "./Produto"

export interface Usuario {
  id: number
  nome: string
  usuario: string
  senha: string
  foto: string
  produto?: Produto[] | null
}