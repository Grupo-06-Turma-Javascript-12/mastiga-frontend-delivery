import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../services/Service";

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
  navigate("/categoria")
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
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? 'Cadastrar Categoria': 'Editar Categoria' }
      </h1>

      <form className="w-1/2 flex flex-col gap-4"
           onSubmit={gerarNovoCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da Categoria</label>
          <input
            type="text"
            placeholder="Descreva aqui sua categoria"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
          value={categoria.descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="rounded text-slate-100 bg-indigo-400 
                     hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit">
            { isLoading ?
                 <ClipLoader
                 color="#ffffff"
                 size={24}
              /> :
              <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                
                }
          
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;