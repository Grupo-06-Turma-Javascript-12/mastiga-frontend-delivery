import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type { Produto } from "../../../models/Produto"
import { buscar, patch } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

const descontos = [10, 20, 30]

function DescontoProduto() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [produto, setProduto] = useState<Produto>({} as Produto)
  const [descontoSelecionado, setDescontoSelecionado] = useState<number | null>(null)
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token
  const { id } = useParams<{ id: string }>()

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId(id)
    }
  }, [id])

  function retornar() {
    navigate('/produtos')
  }

  async function aplicarDesconto(percentual: number) {
    setIsLoading(true)
    setDescontoSelecionado(percentual)
    try {
      await patch(`/produtos/${id}/desconto/${percentual}`, {
        headers: { Authorization: token }
      })
      ToastAlerta(`Desconto de ${percentual}% aplicado com sucesso!`, 'sucesso')
      retornar()
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao aplicar desconto.', 'erro')
      }
    }
    setIsLoading(false)
    setDescontoSelecionado(null)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-[#539b37] mb-2 text-center">
        Aplicar Desconto
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-10 space-y-6">
        {produto.nome && (
          <div className="text-center">
            <p className="text-slate-500 text-sm">Produto selecionado</p>
            <p className="text-xl font-bold text-slate-800 mt-1">{produto.nome}</p>
            <p className="text-[#539b37] font-bold text-lg mt-1">
              {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        )}

        <p className="text-center text-sm font-semibold text-slate-600 tracking-wide uppercase">
          Selecione o percentual de desconto
        </p>

        <div className="flex gap-4 justify-center">
          {descontos.map((percentual) => (
            <button
              key={percentual}
              onClick={() => aplicarDesconto(percentual)}
              disabled={isLoading}
              className="flex-1 py-4 rounded-xl font-bold text-white text-lg bg-[#539b37] hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading && descontoSelecionado === percentual ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                `${percentual}%`
              )}
            </button>
          ))}
        </div>

        <button
          onClick={retornar}
          className="w-full py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all duration-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default DescontoProduto