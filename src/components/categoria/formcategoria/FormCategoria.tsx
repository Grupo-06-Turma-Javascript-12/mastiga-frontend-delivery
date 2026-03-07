import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormCategoria() {

  const navigate = useNavigate();

const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
const [isLoading, setIsLoading] = useState<boolean>(false)

const { usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

const { id } = useParams<{ id: string }>();

async function buscarPorId(id: string) {
  try {
    await buscar(`/categoria/${id}`, setCategoria, {
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
    alert('Você precisa estar logado!')
    navigate('/')
  }
}, [token])

useEffect(() => {
  if (id !== undefined) {
    buscarPorId(id)
  }
}, [id])

function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
  setCategoria({
    ...categoria,
    [e.target.name]: e.target.value
  })
}

function retornar() {
  navigate("/categorias")
}

async function gerarNovoCategoria(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setIsLoading(true)

  if (id !== undefined) {
    try {
      await atualizar(`/categoria`, categoria, setCategoria, {
        headers: { 'Authorization': token }
      })
      alert('A categoria foi atualizada com sucesso!')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      } else {
        alert('Erro ao atualizar a categoria.')
      }
    }

  } else {
    try {
      await cadastrar(`/categoria`, categoria, setCategoria, {
        headers: { 'Authorization': token }
      })
      alert('A Categoria foi cadastrada com sucesso!')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      } else {
        alert('Erro ao cadastrar a categoria.')
      }
    }
  }

  setIsLoading(false)
  retornar()
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-[#539b37] mb-2 text-center">
        {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
      </h1>

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 p-10 mt-6">
        <form className="flex flex-col gap-5" onSubmit={gerarNovoCategoria}>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Descrição da Categoria</label>
            <input
              type="text"
              placeholder="Descreva aqui sua categoria"
              name="descricao"
              required
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
              value={categoria.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-4 bg-[#539b37] text-white font-bold rounded-xl hover:brightness-110 transition-all duration-300 text-lg flex justify-center"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
            )}
          </button>
          <button
            type="button"
            onClick={retornar}
            className="w-full py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all duration-300"
          >
            Cancelar
          </button>

        </form>
      </div>
    </div>
  )
}

export default FormCategoria;