import type { Produto } from "../../../models/Produto"
import { getImagemProduto } from "../../../utils/getImagemProduto"

interface CardProdutoProps {
  produto: Produto
}

const emojiPorTipo: Record<string, string> = {
  LANCHE: "🥗",
  BEBIDA: "🥤",
  PIZZA: "🍕",
  SOBREMESA: "🍃",
  SALADA: "🥗",
  SOPA: "🍲",
  MASSA: "🍝",
  SOBREMESAS: "🍃",
}

export default function CardProduto({ produto }: CardProdutoProps) {
  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.preco)

  const emoji = emojiPorTipo[produto.tipo.toUpperCase()] ?? "🌿"

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">

      {/* Imagem + Badge */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={getImagemProduto(produto.tipo)}
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {produto.categoria && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {emoji} {produto.categoria.descricao}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800 leading-snug line-clamp-2">
            {produto.nome}
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
            ⏱ {produto.tempo_preparo} min de preparo
          </p>
          {produto.tipo && (
            <p className="text-xs text-gray-400 mt-1">
              🏷 {produto.tipo}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-gray-900">
            {precoFormatado}
          </span>
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            + Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}