import { useEffect, useState } from "react"
import ProdutoCard from "./components/CardProduto"
import Carrinho from "./components/Carrinho"
import type { ProdutoPublico } from "../../models/ProdutoPublico"
import { produtosMock } from "../../mocks/produtosMock"

interface ItemCarrinho {
  produto: ProdutoPublico
  quantidade: number
}

const CATEGORIAS = ["Todos", "LANCHE", "BEBIDA", "PIZZA", "SOBREMESA"]

export default function Produtos() {
  const [listaProdutos, setListaProdutos] = useState<ProdutoPublico[]>([])
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [busca, setBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")

  useEffect(() => {
    setListaProdutos(produtosMock)
  }, [])

  const produtosFiltrados = listaProdutos.filter((p) => {
    const buscaOk = p.nome.toLowerCase().includes(busca.toLowerCase())
    const categoriaOk = categoriaAtiva === "Todos" || p.tipo === categoriaAtiva
    return buscaOk && categoriaOk
  })

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0)

  function handleAdicionar(produto: ProdutoPublico) {
    setCarrinho((prev) => {
      const existe = prev.find((i) => i.produto.id === produto.id)
      if (existe) {
        return prev.map((i) =>
          i.produto.id === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        )
      }
      return [...prev, { produto, quantidade: 1 }]
    })
    setCarrinhoAberto(true)
  }

  function handleDiminuir(id: number) {
    setCarrinho((prev) =>
      prev
        .map((i) =>
          i.produto.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
        )
        .filter((i) => i.quantidade > 0)
    )
  }

  function handleRemover(id: number) {
    setCarrinho((prev) => prev.filter((i) => i.produto.id !== id))
  }

  return (
    <main className="container mx-auto px-6 py-8">

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full sm:w-96 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={() => setCarrinhoAberto(true)}
          className="relative bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-medium text-sm transition-colors"
        >
          🛒 Carrinho
          {totalItens > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItens}
            </span>
          )}
        </button>
      </div>

    
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              categoriaAtiva === cat
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-green-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>


      {produtosFiltrados.length === 0 ? (
        <p className="text-center text-gray-400 py-20">
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onAdicionar={handleAdicionar}
            />
          ))}
        </div>
      )}

 
      <Carrinho
        itens={carrinho}
        aberto={carrinhoAberto}
        onFechar={() => setCarrinhoAberto(false)}
        onRemover={handleRemover}
        onAumentar={handleAdicionar}
        onDiminuir={handleDiminuir}
      />
    </main>
  )
}
