import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCategoria from "../cardcategoria/CardCategoria";

function ListaCategoria() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [categoria, setCategoria] = useState<Categoria[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const location = useLocation()

  useEffect(() => {
    if (!isLoading && categoria.length > 0 && location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [isLoading, categoria.length, location.hash])

useEffect(() => {
  if (token === '') {
    ToastAlerta('Você precisa estar logado!', 'info')
    navigate('/')
  }
}, [token])

useEffect(() => {
  buscarCategoria()
}, [categoria.length])

async function buscarCategoria() {
  try {

    setIsLoading(true)

    await buscar('/categoria', setCategoria, {
      headers: { Authorization: token }
    })
  } catch (error: any) {
    if (error.toString().includes('401')) {
      handleLogout()
    }
  } finally {
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
    <div className="flex justify-center w-full my-8 px-6">
      <div className="container flex flex-col">
        {(!isLoading && categoria.length === 0) && (
          <span className="text-3xl text-center my-8">
            Nenhuma Categoria foi encontrada!
          </span>
        )}
        {categoria.map((categoria) => (
          <CardCategoria key={categoria.id} Categoria={categoria} />
        ))}
      </div>
    </div>
  </>
)

}
export default ListaCategoria