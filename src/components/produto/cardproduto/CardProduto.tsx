import { Gear } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useCarrinho } from "../../../contexts/CarrinhoContext"
import type { Produto } from "../../../models/Produto"

interface CardProdutoProps {
  produto: Produto
}

export default function CardProduto({ produto }: CardProdutoProps) {
  const { adicionarItem } = useCarrinho()
  const [menuAberto, setMenuAberto] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.preco)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAberto(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 relative">

      <div className="relative h-44 overflow-hidden">
        <img
          src={produto.tipo}
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {produto.categoria && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {produto.categoria.descricao}
          </span>
        )}

      </div>
      {/* Gear button */}
        <div ref={menuRef} className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            className="bg-white/90 backdrop-blur-sm text-slate-600 hover:text-slate-900 p-1.5 rounded-full shadow-sm transition-colors"
          >
            <Gear size={18} weight="bold" />
          </button>

          {menuAberto && (
            <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10 min-w-36 flex flex-col">
              <Link
                to="/cadastrarproduto"
                className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cadastrar
              </Link>
              <Link
                to={`/editarproduto/${produto.id}`}
                className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Editar
              </Link>
              <Link
                to={`/deletarproduto/${produto.id}`}
                className="px-4 py-2 text-sm text-rose-500 hover:bg-red-50 transition-colors"
              >
                Deletar
              </Link>
              <Link
                to={`/descontoproduto/${produto.id}`}
                className="px-4 py-2 text-sm text-[#539b37] hover:bg-green-50 transition-colors border-t border-gray-100"
              >
                Desconto
              </Link>
            </div>
          )}
        </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800 leading-snug line-clamp-2">
            {produto.nome}
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
            ⏱ {produto.tempo_preparo} min de preparo
          </p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-gray-900">
            {precoFormatado}
          </span>
          <button
            type="button"
            onClick={() => adicionarItem(produto)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            + Adicionar
          </button>
        </div>
      </div>

    </article>
  )
}