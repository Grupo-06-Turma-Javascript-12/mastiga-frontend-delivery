import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  EyeIcon,
  EyeSlashIcon,
  FireIcon,
  X,
} from "@phosphor-icons/react";

const videos = [
  "https://ik.imagekit.io/ycn9hqmaw/motion2Fast_Vibrant_highdefinition_closeup_shot_of_a_colorful__0.mp4",
  "https://ik.imagekit.io/ycn9hqmaw/motion2Fast_Bright_and_vibrant_food_photography_a_closeup_shot_0.mp4",
];

const produtos = [
  { id: 1, nome: "Bowl Proteico", preco: "R$ 28,90", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop" },
  { id: 2, nome: "Salada Caesar", preco: "R$ 24,90", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop" },
  { id: 3, nome: "Wrap Integral", preco: "R$ 22,90", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop" },
  { id: 4, nome: "Smoothie Verde", preco: "R$ 16,90", img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop" },
  { id: 5, nome: "Açaí Fit", preco: "R$ 19,90", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=200&fit=crop" },
  { id: 6, nome: "Tapioca Recheada", preco: "R$ 18,90", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop" },
];

function Home() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", senha: "", confirmarSenha: "" });
  const [enviado, setEnviado] = useState(false);
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", senha: "" });
  const [verSenhaLogin, setVerSenhaLogin] = useState(false);
  const carrosselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      if (!carrosselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carrosselRef.current;
      const noFim = scrollLeft + clientWidth >= scrollWidth - 10;
      if (noFim) {
        carrosselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carrosselRef.current.scrollBy({ left: 220, behavior: "smooth" });
      }
    }, 2500);
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, []);

  function pausarAutoScroll() {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
  }

  function scrollCarrossel(direcao: "esq" | "dir") {
    pausarAutoScroll();
    if (carrosselRef.current) {
      carrosselRef.current.scrollBy({ left: direcao === "dir" ? 220 : -220, behavior: "smooth" });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Cadastro:", form);
    setEnviado(true);
  }

  function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login:", loginForm);
    setModalAberto(false);
    navigate("/conhecercardapio");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">

      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <Leaf size={48} weight="fill" className="text-[#539b37]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Entre na sua conta</h2>
              <p className="text-slate-500 text-sm">Para ver o cardápio completo, faça login</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  placeholder="joao@email.com"
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label>
                <div className="relative">
                  <input
                    type={verSenhaLogin ? "text" : "password"}
                    name="senha"
                    value={loginForm.senha}
                    onChange={handleLoginChange}
                    required
                    placeholder="Sua senha"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setVerSenhaLogin(!verSenhaLogin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {verSenhaLogin ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#539b37] text-white font-bold rounded-xl hover:brightness-110 transition-all duration-300 text-lg"
              >
                Entrar
              </button>

              <p className="text-center text-sm text-slate-500">
                Não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setModalAberto(false);
                    navigate("/cadastro");
                  }}
                  className="text-[#e0992e] font-semibold hover:underline"
                >
                  Criar conta
                </button>
              </p>

            </form>
          </div>
        </div>
      )}


      <section className="relative w-full h-screen overflow-hidden">

        {videos.map((src, index) => (
          <video
            key={index}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center px-6 py-16">

          <div className="flex flex-col items-center gap-4 mt-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Sua escolha inteligente para um <br />
              <span className="text-[#e0992e]">dia a dia mais saudável!</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Acreditamos que comer bem é fundamental para uma vida feliz e equilibrada.
              Por isso, oferecemos opções saudáveis e práticas para que você possa desfrutar
              de uma alimentação de qualidade, sem abrir mão do sabor!
            </p>
            <button
              onClick={() => setModalAberto(true)}
              className="px-8 py-4 bg-[#e0992e] text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 text-lg"
            >
              Hora de mastigar! - Cardápio Online
            </button>
          </div>

          <div className="w-full max-w-4xl relative mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FireIcon size={16} weight="fill" className="text-orange-400" />
              <p className="text-white/70 text-sm font-medium uppercase tracking-widest">
                Destaques do cardápio
              </p>
            </div>

            <button
              onClick={() => scrollCarrossel("esq")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white text-xl w-8 h-8 rounded-full flex items-center justify-center transition"
            >‹</button>

            <div
              ref={carrosselRef}
              onMouseEnter={pausarAutoScroll}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="min-w-40 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shrink-0 hover:scale-105 transition-transform duration-300"
                >
                  <img src={produto.img} alt={produto.nome} className="w-full h-24 object-cover" />
                  <div className="p-3 text-left">
                    <p className="text-white font-semibold text-sm">{produto.nome}</p>
                    <p className="text-[#e0992e] font-bold text-sm mt-1">{produto.preco}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCarrossel("dir")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white text-xl w-8 h-8 rounded-full flex items-center justify-center transition"
            >›</button>
          </div>

          <div className="flex gap-2">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === current ? "bg-[#e0992e] w-6" : "bg-white/50 w-3"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      <section className="bg-[#e9e4e4dc] py-20 px-6">
        <div className="container mx-auto max-w-lg">
          <div className="bg-white rounded-3xl shadow-2xl p-10">

            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <Leaf size={52} weight="fill" className="text-[#539b37]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-1">Crie sua conta</h2>
              <p className="text-slate-500 text-sm">Cadastre-se e aproveite nossas opções saudáveis!</p>
            </div>

            {enviado ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-[#539b37] mb-2">Cadastro realizado!</h3>
                <p className="text-slate-500 mb-6">Bem-vindo! Agora você já pode explorar o cardápio.</p>
                <button
                  onClick={() => setModalAberto(true)}
                  className="inline-block px-8 py-3 bg-[#e0992e] text-white font-semibold rounded-xl hover:brightness-110 transition-all"
                >
                  Fazer login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nome completo</label>
                  <input type="text" name="nome" value={form.nome} onChange={handleChange} required placeholder="João Silva"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="joao@email.com"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Telefone</label>
                  <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required placeholder="(81) 99999-9999"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800" />
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
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#539b37] transition text-slate-800"
                    />
                    <button type="button" onClick={() => setVerSenha(!verSenha)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                      {verSenha ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Confirmar senha</label>
                  <div className="relative">
                    <input
                      type={verConfirmarSenha ? "text" : "password"}
                      name="confirmarSenha"
                      value={form.confirmarSenha}
                      onChange={handleChange}
                      required
                      placeholder="Repita a senha"
                      minLength={6}
                      className={`w-full border bg-slate-50 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 transition text-slate-800 ${
                        form.confirmarSenha && form.senha !== form.confirmarSenha
                          ? "border-red-400 focus:ring-red-400"
                          : "border-slate-200 focus:ring-[#539b37]"
                      }`}
                    />
                    <button type="button" onClick={() => setVerConfirmarSenha(!verConfirmarSenha)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                      {verConfirmarSenha ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                  {form.confirmarSenha && form.senha !== form.confirmarSenha && (
                    <p className="text-red-500 text-xs mt-1">As senhas não coincidem</p>
                  )}
                  {form.confirmarSenha && form.senha === form.confirmarSenha && (
                    <p className="text-green-500 text-xs mt-1">Senhas coincidem</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={form.senha !== form.confirmarSenha}
                  className="mt-2 w-full py-4 bg-[#539b37] text-white font-bold rounded-xl hover:brightness-110 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar minha conta
                </button>

                <p className="text-center text-sm text-slate-500">
                  Já tem conta?{" "}
                  <button
                    type="button"
                    onClick={() => setModalAberto(true)}
                    className="text-[#e0992e] font-semibold hover:underline"
                  >
                    Entrar
                  </button>
                </p>

              </form>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;