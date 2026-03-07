import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type { Produto } from "../../../models/Produto"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarProduto() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
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
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Produto apagado com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar o produto.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/produtos")
    }
    
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-10 px-4">
        <h1 className="text-4xl font-bold text-[#539b37] mb-2 text-center">
        Deletar Produto
        </h1>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-10 mt-6 space-y-6">
        <p className="text-center text-slate-500">
            Você tem certeza de que deseja apagar o produto a seguir?
        </p>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center">
            <p className="text-xl font-bold text-slate-800">{produto.nome}</p>
            <p className="text-[#539b37] font-bold text-lg mt-1">
            {produto.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
        </div>

        <div className="flex gap-4">
            <button
            onClick={retornar}
            className="flex-1 py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all duration-300"
            >
            Não
            </button>
            <button
            onClick={deletarProduto}
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
    );
}

export default DeletarProduto