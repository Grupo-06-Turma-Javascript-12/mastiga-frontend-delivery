import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import { getImagemCategoria } from '../../../utils/getImagemCategoria'

interface CardCategoriaProps {
  Categoria: Categoria
}

export default function CardCategoria({ Categoria }: CardCategoriaProps) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">

      {/* Imagem */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={getImagemCategoria(Categoria.descricao)}
          alt={Categoria.descricao}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800 leading-snug line-clamp-2">
            {Categoria.descricao}
          </h2>
          <p className="text-xs text-gray-400 mt-1.5">
            🛒 {Categoria.produto?.length ?? 0} produto(s) nessa categoria
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <Link
            to={`/editarCategoria/${Categoria.id}`}
            className="w-full text-center bg-orange-400 hover:bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            Editar
          </Link>
          <Link
            to={`/deletarCategoria/${Categoria.id}`}
            className="w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            Deletar
          </Link>
        </div>
      </div>

    </article>
  )
}
