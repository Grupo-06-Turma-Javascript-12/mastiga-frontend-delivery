/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react"
import type { Produto } from "../models/Produto"

interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

interface CarrinhoContextProps {
  itens: ItemCarrinho[]
  aberto: boolean
  abrirCarrinho: () => void
  fecharCarrinho: () => void
  adicionarItem: (produto: Produto) => void
  removerItem: (id: number) => void
  aumentarQuantidade: (produto: Produto) => void
  diminuirQuantidade: (id: number) => void
  totalItens: number
}

const CarrinhoContext = createContext({} as CarrinhoContextProps)

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])
  const [aberto, setAberto] = useState(false)

  function adicionarItem(produto: Produto) {
    setItens(prev => {
      const existe = prev.find(i => i.produto.id === produto.id)
      if (existe) {
        return prev.map(i => i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i)
      }
      return [...prev, { produto, quantidade: 1 }]
    })
    setAberto(true)
  }

  function removerItem(id: number) {
    setItens(prev => prev.filter(i => i.produto.id !== id))
  }

  function aumentarQuantidade(produto: Produto) {
    adicionarItem(produto)
  }

  function diminuirQuantidade(id: number) {
    setItens(prev => {
      const item = prev.find(i => i.produto.id === id)
      if (item && item.quantidade === 1) return prev.filter(i => i.produto.id !== id)
      return prev.map(i => i.produto.id === id ? { ...i, quantidade: i.quantidade - 1 } : i)
    })
  }

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <CarrinhoContext.Provider value={{
      itens, aberto,
      abrirCarrinho: () => setAberto(true),
      fecharCarrinho: () => setAberto(false),
      adicionarItem, removerItem, aumentarQuantidade, diminuirQuantidade,
      totalItens
    }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  return useContext(CarrinhoContext)
}