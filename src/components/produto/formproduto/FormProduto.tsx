import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import type { Produto } from "../../../models/Produto";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProduto() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({ id: 0, descricao: '', });
  const [produto, setProduto] = useState<Produto>({
  id: 0,
  nome: "",
  preco: 0,
  tempo_preparo: 0,
  tipo: "",
  categoria: null,
  usuario: null
  })

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  async function buscarCategorias() {
    try {
      await buscar('/categoria', setCategorias, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/produtos');
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    console.log(produto)

    const produtoParaEnviar = {
    ...produto,
    preco: parseFloat(String(produto.preco).replace(",", "."))
  }

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Produto atualizado com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao atualizar o Produto', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/produtos`, produtoParaEnviar, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Produto cadastrado com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao cadastrar o Produto', 'erro');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoCategoria = categoria.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
        </h1>

      <form className="flex flex-col w-1/2 gap-4"
        onSubmit={gerarNovoProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Nome do Produto</label>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            required
            className="border-2 border-orange-700 rounded p-2"
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Preço do Produto</label>
          <input
            type="text"
            placeholder="Preço"
            name="preco"
            required
            className="border-2 border-orange-700 rounded p-2"
            value={produto.preco === 0 ? "" : String(produto.preco)}
            onChange={(e) => setProduto({...produto, preco: e.target.value as any})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tipo">Tipo do Produto</label>
          <input
            type="text"
            placeholder="Tipo"
            name="tipo"
            required
            className="border-2 border-orange-700 rounded p-2"
            value={produto.tipo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Categoria do Produto</p>
          <select name="categoria" id="categoria" className="border p-2 border-orange-700 rounded"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione uma Categoria</option>

            {categorias.map((categoria) => (
            <>
              <option value={categoria.id} >{categoria.descricao}</option>
            </>
            ))}

          </select>
        </div>

        <button
          type='submit'
          className='rounded disabled:bg-slate-200 bg-green-600 hover:bg-green-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
          disabled={carregandoCategoria}
        >
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

export default FormProduto;