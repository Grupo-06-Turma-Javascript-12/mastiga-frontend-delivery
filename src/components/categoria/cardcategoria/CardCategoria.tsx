import { Gear } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinho } from '../../../contexts/CarrinhoContext'
import type Categoria from '../../../models/Categoria'
import { getImagemCategoria } from '../../../utils/getImagemCategoria'

interface CardCategoriaProps {
  Categoria: Categoria
}

export default function CardCategoria({ Categoria }: CardCategoriaProps) {
  const [menuAberto, setMenuAberto] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { adicionarItem } = useCarrinho()

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
    <section
      id={Categoria.descricao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}
      className="w-full mb-12 scroll-mt-24"
    >
      {/* Banner da Categoria */}
      <div className="relative w-full h-48 overflow-visible rounded-2xl mb-6">
        
        {/* Image with overflow hidden separately */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <img
            src={getImagemCategoria(Categoria.descricao)}
            alt={Categoria.descricao}
            className="w-full h-full object-cover brightness-50"
            loading="lazy"
          />
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <h2 className="text-3xl font-bold text-white">{Categoria.descricao}</h2>
          <p className="text-white/70 text-sm mt-1">
            {Categoria.produto?.length ?? 0} produto(s) nessa categoria
          </p>
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
            <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 min-w-36 flex flex-col">
              <Link
                to="/cadastrarcategoria"
                className="px-4 py-2 text-sm text-[#539b37] hover:bg-green-50 transition-colors"
              >
                Cadastrar
              </Link>
              <Link
                to={`/editarcategoria/${Categoria.id}`}
                className="px-4 py-2 text-sm text-orange-500 hover:bg-orange-50 transition-colors"
              >
                Editar
              </Link>
              <Link
                to={`/deletarcategoria/${Categoria.id}`}
                className="px-4 py-2 text-sm text-rose-500 hover:bg-red-50 transition-colors"
              >
                Deletar
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Produtos da Categoria */}
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
              <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 leading-snug line-clamp-2">
                    {produto.nome}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    ⏱ {produto.tempo_preparo} min de preparo
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[#539b37] font-bold text-sm">
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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