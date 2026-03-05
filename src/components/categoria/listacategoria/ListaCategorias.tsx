import { useNavigate } from "react-router-dom";
import CardCategoria from "../cardcategoria/CardCategoria";
import { SyncLoader } from "react-spinners";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria";

function ListaCategoria() {

     const navigate = useNavigate();

const [isLoading, setIsLoading] = useState<boolean>(false)

const [categoria, setTemas] = useState<Categoria[]>([])

const { usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

useEffect(() => {
  if (token === '') {
    alert('Você precisa estar logado!')
    navigate('/')
  }
}, [token])

useEffect(() => {
  buscarTemas()
}, [categoria.length])

async function buscarTemas() {
  try {

    setIsLoading(true)

    await buscar('/categoria', setTemas, {
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
    <SyncLoader
        color="#312e81"
    	size={32}
	/>
)}  
       <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col">
             {(!isLoading && categoria.length === 0) && (
          	<span className="text-3xl text-center my-8">
         		Nenhum Categoria foi encontrado!
           	</span>
             )}
             <div className="grid grid-cols-1 md:grid-cols-2
                            lg:grid-cols-3 gap-8">

                 {
                    categoria.map((categoria) => (
    	            <CardCategoria key={categoria.id} Categoria={categoria}/>
                   ))
}
              </div>
           </div>
      </div>
    
    </>
  )

}
export default ListaCategoria