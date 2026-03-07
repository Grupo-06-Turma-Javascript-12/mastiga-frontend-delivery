import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import { getImagemCategoria } from '../../../utils/getImagemCategoria'

interface CardCategoriaProps {
  Categoria: Categoria
}

export default function CardCategoria({ Categoria }: CardCategoriaProps) {
  return (
    <section id={Categoria.descricao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")} 
      className="w-full mb-12">
      
      <div className="relative w-full h-48 overflow-hidden rounded-2xl mb-6">
        <img
          src={getImagemCategoria(Categoria.descricao)}
          alt={Categoria.descricao}
          className="w-full h-full object-cover brightness-50"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <h2 className="text-3xl font-bold text-white">{Categoria.descricao}</h2>
          <p className="text-white/70 text-sm mt-1">
            {Categoria.produto?.length ?? 0} produto(s) nessa categoria
          </p>
          <div className="flex gap-2 mt-3">
            <Link
              to="/cadastrarcategoria"
              className="bg-[#539b37] hover:bg-[#447a2c] text-white text-sm font-medium px-4 py-1.5 rounded-xl transition-colors"
            >
              Cadastrar
            </Link>
            <Link
              to={`/editarcategoria/${Categoria.id}`}
              className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-medium px-4 py-1.5 rounded-xl transition-colors"
            >
              Editar
            </Link>
            <Link
              to={`/deletarcategoria/${Categoria.id}`}
              className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-1.5 rounded-xl transition-colors"
            >
              Deletar
            </Link>
          </div>
        </div>
      </div>

      
      {Categoria.produto && Categoria.produto.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
        {Categoria.produto.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
          >
            
            <div className="h-40 overflow-hidden">
              <img
                src={produto.tipo}
                alt={produto.nome}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h3 className="text-base font-semibold text-gray-800">{produto.nome}</h3>
              <div className="flex justify-between items-center mt-auto pt-2">
                <span className="text-[#539b37] font-bold text-sm">
                  {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              {produto.tempo_preparo > 0 && (
                <p className="text-xs text-gray-400">⏱ {produto.tempo_preparo} min</p>
              )}
            </div>
          </div>
        ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm px-2">Nenhum produto nessa categoria ainda.</p>
      )}

      <hr className="mt-10 border-gray-200" />
    </section>
  )
}