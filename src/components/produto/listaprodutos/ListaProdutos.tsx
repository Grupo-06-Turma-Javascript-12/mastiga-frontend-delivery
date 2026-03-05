import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardProduto from "../cardproduto/CardProduto";

function ListaProdutos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [produtos, setProdutos] = useState<Produto[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarProdutos()    
    }, [produtos.length])

    async function buscarProdutos() {
        try {

            setIsLoading(true)

            await buscar('/produtos', setProdutos, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }finally {
            setIsLoading(false)
        }
    }

    return (
      <>
        {isLoading && (
          <div className="flex justify-center w-full my-12">
            <SyncLoader
              color="#15803d"
              size={18}
            />
          </div>
        )}

        <div className="flex justify-center w-full py-8 bg-gray-100 min-h-screen">
          <div className="container px-4">

            {(!isLoading && produtos.length === 0) && (
              <div className="text-center my-16">
                <h2 className="text-2xl font-semibold text-[#15803d]">
                  Nenhum produto encontrado
                </h2>
                <p className="text-gray-500 mt-2">
                  Novos produtos em breve 🍔
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {produtos.map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))}
            </div>

          </div>
        </div>
      </>
    )
}
export default ListaProdutos;