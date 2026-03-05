import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Leaf, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", senha: "" })
  const [verSenha, setVerSenha] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("Login:", form)
    navigate("/conhecercardapio")
  }

  return (
    <main className="min-h-screen bg-[#e9e4e4dc] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Leaf size={52} weight="fill" className="text-[#539b37]" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">Bem-vindo de volta!</h2>
          <p className="text-slate-500 text-sm">Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="joao@email.com"
              className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label>
            <div className="relative">
              <input
                type={verSenha ? "text" : "password"}
                name="senha"
                value={form.senha}
                onChange={handleChange}
                required
                placeholder="Sua senha"
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
              />
              <button
                type="button"
                onClick={() => setVerSenha(!verSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {verSenha ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            <div className="text-right mt-1">
              <button
                type="button"
                onClick={() => navigate("/esqueci-senha")}
                className="text-xs text-[#539b37] hover:underline font-medium"
              >
                Esqueci minha senha
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-4 bg-[#539b37] text-white font-bold rounded-xl hover:brightness-110 transition-all duration-300 text-lg"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-slate-500">
            Não tem conta?{" "}
            <button
              type="button"
              onClick={() => navigate("/cadastro")}
              className="text-[#e0992e] font-semibold hover:underline"
            >
              Criar conta
            </button>
          </p>

        </form>
      </div>
    </main>
  )
}

export default Login