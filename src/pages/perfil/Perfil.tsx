import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { Leaf, EnvelopeSimpleIcon, UserIcon } from "@phosphor-icons/react"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info")
      navigate("/")
    }
  }, [usuario.token])

  return (
    <div className="min-h-screen bg-[#f0eeea] flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        <div className="rounded-3xl overflow-hidden shadow-2xl">

          <div className="relative h-52">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=300&fit=crop"
              alt="Capa do Perfil"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />


          </div>


          <div className="bg-white flex flex-col items-center px-8 pb-10">

            <div className="relative -mt-16 mb-4">
              <img
                className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-xl ring-4 ring-[#539b37]"
                src={usuario.foto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_5cQn-Msc0otYGu46cOkqDFTCyVl_OM7Mw&s'}
                onError={(e) => e.currentTarget.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_5cQn-Msc0otYGu46cOkqDFTCyVl_OM7Mw&s'}
                alt={`Foto de ${usuario.nome}`}
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
            </div>


            <h1 className="text-2xl font-bold text-slate-800">{usuario.nome}</h1>
            <div className="flex items-center gap-1 mt-1 mb-2">
              <Leaf size={14} weight="fill" className="text-[#539b37]" />
              <p className="text-[#539b37] text-sm font-medium">Gestor da plataforma</p>
            </div>


            <div className="flex items-center gap-3 w-full my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-slate-400 text-xs uppercase tracking-widest">Informações</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>


            <div className="w-full flex flex-col gap-4">

              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
                <div className="w-11 h-11 rounded-full bg-[#539b37]/10 flex items-center justify-center shrink-0">
                  <UserIcon size={22} weight="fill" className="text-[#539b37]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Nome</p>
                  <p className="text-slate-800 font-semibold">{usuario.nome}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
                <div className="w-11 h-11 rounded-full bg-[#e0992e]/10 flex items-center justify-center shrink-0">
                  <EnvelopeSimpleIcon size={22} weight="fill" className="text-[#e0992e]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">E-mail</p>
                  <p className="text-slate-800 font-semibold">{usuario.usuario}</p>
                </div>
              </div>

            </div>


            <div className="flex gap-3 mt-8 w-full">
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 border-2 border-[#539b37] text-[#539b37] font-bold rounded-xl hover:bg-[#539b37] hover:text-white transition-all duration-300"
              >
                Início
              </button>
              <button
                onClick={() => navigate("/produtos")}
                className="flex-1 py-3 bg-[#e0992e] text-white font-bold rounded-xl hover:brightness-110 transition-all duration-300"
              >
                Ver Cardápio
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Perfil