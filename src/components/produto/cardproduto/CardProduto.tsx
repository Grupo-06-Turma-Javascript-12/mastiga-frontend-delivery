import { Link } from 'react-router-dom'
import type { Produto } from '../../../models/Produto'

interface CardProdutosProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md 
                    hover:shadow-xl hover:-translate-y-1
                    transition-all duration-300
                    flex flex-col justify-between overflow-hidden">

      {/* Cabeçalho */}
      <div className="bg-[#15803d] px-4 py-3 flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-full border-2 border-[#166534] object-cover"
          src={produto.usuario?.foto || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
          onError={(e) =>
            (e.currentTarget.src =
              'https://cdn-icons-png.flaticon.com/512/3177/3177440.png')
          }
          alt="Foto do usuário"
        />
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
          {produto.usuario?.nome}
        </h3>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col gap-3">

        <h4 className="text-lg font-bold text-gray-800 uppercase">
          {produto.nome}
        </h4>

        {/* Preço em destaque */}
        <p className="text-2xl font-bold text-[#f97316]">
          R$ {Number(produto.preco).toFixed(2)}
        </p>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium text-[#15803d]">Categoria:</span>{" "}
            {produto.categoria?.descricao}
          </p>
          <p>
            <span className="font-medium text-[#15803d]">Tipo:</span>{" "}
            {produto.tipo}
          </p>
        </div>

      </div>

      {/* Botões */}
      <div className="flex">

        <Link
          to={`/editarproduto/${produto.id}`}
          className="w-full"
        >
          <button
            className="w-full py-3 bg-[#f97316] 
                      text-white font-semibold
                      hover:bg-[#ea580c] transition"
          >
            Editar
          </button>
        </Link>

        <Link
          to={`/deletarproduto/${produto.id}`}
          className="w-full"
        >
          <button
            className="w-full py-3 bg-[#15803d] 
                      text-white font-semibold
                      hover:bg-[#166534] transition"
          >
            Deletar
          </button>
        </Link>

      </div>
    </div>
  )
}

export default CardProduto