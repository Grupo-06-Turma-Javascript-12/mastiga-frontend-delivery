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
        await atualizar(`/produtos`, produtoParaEnviar, setProduto, {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-[#539b37] mb-2 text-center">
        {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
      </h1>

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 p-10 mt-6">
        <form className="flex flex-col gap-5" onSubmit={gerarNovoProduto}>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Nome do Produto</label>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              required
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
              value={produto.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Preço do Produto</label>
            <input
              type="text"
              placeholder="Preço"
              name="preco"
              required
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
              value={produto.preco === 0 ? "" : String(produto.preco)}
              onChange={(e) => setProduto({...produto, preco: e.target.value as any})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Foto do Produto (URL)</label>
            <input
              type="text"
              placeholder="Link da imagem"
              name="tipo"
              required
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
              value={produto.tipo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Tempo de Preparo (minutos)</label>
            <input
              type="number"
              placeholder="Tempo de preparo em minutos"
              name="tempo_preparo"
              required
              min={0}
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
              value={produto.tempo_preparo === 0 ? "" : produto.tempo_preparo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setProduto({...produto, tempo_preparo: parseInt(e.target.value) || 0})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Categoria do Produto</label>
            <select
              name="categoria"
              id="categoria"
              defaultValue=""
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            >
              <option value="" disabled>Selecione uma Categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.descricao}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={carregandoCategoria}
            className="mt-2 w-full py-4 bg-[#539b37] text-white font-bold rounded-xl hover:brightness-110 transition-all duration-300 text-lg flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}

export default FormProduto;