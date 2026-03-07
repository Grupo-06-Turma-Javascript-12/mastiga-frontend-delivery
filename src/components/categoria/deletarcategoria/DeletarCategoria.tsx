import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"

function DeletarCategoria() {

  const navigate = useNavigate()

const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
const [isLoading, setIsLoading] = useState<boolean>(false)

const { usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

const { id } = useParams<{ id: string }>()

async function buscarPorId(id: string) {
  try {
    await buscar(`/categoria/${id}`, setCategoria, {
      headers: {
        'Authorization': token
      }
    })
  } catch (error: any) {
    if (error.toString().includes('401')) {
      handleLogout()
    }
  }
}

useEffect(() => {
  if (token === '') {
    alert('Você precisa estar logado')
    navigate('/')
  }
}, [token])

useEffect(() => {
  if (id !== undefined) {
    buscarPorId(id)
  }
}, [id])

async function deletarCategoria() {
  setIsLoading(true)

  try {
    await deletar(`/categoria/${id}`, {
      headers: {
        'Authorization': token
      }
    })

    alert('Categoria apagado com sucesso')
  } catch (error) {
    if (error.toString().includes('401')) {
      handleLogout()
    } else {
      alert('Erro ao deletar o Categoria.')
    }
  }

  setIsLoading(false)
  retornar()
}

function retornar() {
  navigate("/categorias")
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-[#539b37] mb-2 text-center">
        Deletar Categoria
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-10 mt-6 space-y-6">
        <p className="text-center text-slate-500">
          Você tem certeza de que deseja apagar a categoria a seguir?
        </p>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center">
          <p className="text-xs text-slate-400 mb-1">Categoria #{categoria.id}</p>
          <p className="text-xl font-bold text-slate-800">{categoria.descricao}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={retornar}
            className="flex-1 py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all duration-300"
          >
            Não
          </button>
          <button
            onClick={deletarCategoria}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all duration-300 flex justify-center items-center"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarCategoria