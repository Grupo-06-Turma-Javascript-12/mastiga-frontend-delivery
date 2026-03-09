import { HeartIcon, LeafIcon, StarIcon, TruckIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

type TeamCardProps = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
};

function TeamCard({ name, role, bio, image, linkedin }: TeamCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

      <div className="h-2 bg-linear-to-r from-[#539b37] to-[#e0992e]" />

      <div className="p-6 flex flex-col items-center text-center">

        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#539b37]/30 group-hover:ring-[#539b37] transition-all duration-300">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white" />
        </div>

        <h4 className="text-lg font-bold text-slate-800">{name}</h4>
        <span className="inline-block mt-1 mb-3 px-3 py-1 bg-[#e0992e]/10 text-[#e0992e] text-xs font-semibold rounded-full">
          {role}
        </span>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{bio}</p>

        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center gap-2 bg-[#0A66C2] hover:bg-[#084d93] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 
          hover:scale-105 shadow"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          LinkedIn
        </a>

      </div>
    </div>
  );
}

const SobreNos = () => {
  const navigate = useNavigate();

  const diferenciais = [
  {
    icon: <LeafIcon size={28} weight="fill" className="text-[#539b37]" />,
    titulo: "100% Natural",
    texto: "Ingredientes frescos, sem conservantes e sem abrir mão do sabor.",
    bg: "bg-[#539b37]/10",
  },
  {
    icon: <HeartIcon size={28} weight="fill" className="text-rose-500" />,
    titulo: "Feito com Amor",
    texto: "Cada prato é preparado com cuidado para cuidar de você por dentro e por fora.",
    bg: "bg-rose-50",
  },
  {
    icon: <TruckIcon size={28} weight="fill" className="text-[#e0992e]" />,
    titulo: "Entrega Rápida",
    texto: "Da nossa cozinha para a sua porta com agilidade e segurança.",
    bg: "bg-[#e0992e]/10",
  },
  {
    icon: <StarIcon size={28} weight="fill" className="text-yellow-500" />,
    titulo: "Qualidade Garantida",
    texto: "Avaliado por milhares de clientes satisfeitos todos os dias.",
    bg: "bg-yellow-50",
  },
];

  const time = [
    {
      name: "Débora Campos",
      role: "Desenvolvedora Full Stack",
      bio: "Especialista em soluções digitais e análise de dados. Apaixonada por tecnologia que transforma vidas.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHokiNPBIPwFw/profile-displayphoto-scale_400_400/B4DZvC8A_MKcAg-/0/1768502071933?e=1773878400&v=beta&t=4ddFrOIIPSd4-hxKAYkSj9S3K0wdYAHjT9sC-rHuUeE",
      linkedin: "https://www.linkedin.com/in/debora-campos-/",
    },
    {
      name: "Paulo Brandão",
      role: "Desenvolvedor Backend",
      bio: "Responsável pela implementação técnica das soluções. Garante que tudo funcione nos bastidores.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFJNWod6QUYOg/profile-displayphoto-crop_800_800/B4EZx86YePH8AI-/0/1771622207330?e=1773878400&v=beta&t=orFiQKILFzdSAJTRVA0Izcq-N9FYCGA2G9tQJ61Abgg",
      linkedin: "https://www.linkedin.com/in/paulo-brandao-b7386a179/",
    },
    {
      name: "Rafael Bernardo",
      role: "Especialista em Dados",
      bio: "Transforma métricas em insights estratégicos para melhorar a experiência de cada cliente.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEY7QAB5eeoMg/profile-displayphoto-crop_800_800/B4DZrHMOxdJcAI-/0/1764278470241?e=1773878400&v=beta&t=_BJMJ233pWC-Q7W1Ul0A6azAT1RmxJz2cO_sPIcd7Lg",
      linkedin: "https://www.linkedin.com/in/rafael-bernardo-dev/",
    },
    {
      name: "Thays Peixoto",
      role: "UI/UX Designer",
      bio: "Cria experiências visuais intuitivas e agradáveis que tornam a plataforma um prazer de usar.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQFQGjskNARV1A/profile-displayphoto-scale_200_200/B4DZq3ik3HIkAY-/0/1764015886905?e=1774483200&v=beta&t=-uRDLH_9gk2JCV1uifbWMZc9nprusPkxNTKjah2ODfc",
      linkedin: "https://www.linkedin.com/in/thays-peixoto-da-silva/",
    },
    {
      name: "Wyrms Cordeiro",
      role: "Desenvolvedor Full Stack",
      bio: "Integra front-end e back-end com eficiência, conectando todas as peças da plataforma.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHDrVmY_BpfdA/profile-displayphoto-crop_800_800/B4EZq8PV0IKMAM-/0/1764094730372?e=1773878400&v=beta&t=ajMdo35xWdPP-TkLfd5OAtIuzRPQTTpQQTxwS1o-was",
      linkedin: "https://www.linkedin.com/in/wyrms-cordeiro-84374565567o63/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0eeea]">

      <section className="relative bg-[#539b37] overflow-hidden py-24 px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,#fff_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <LeafIcon size={36} weight="fill" className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Nascemos para cuidar <br />
            <span className="text-[#e0992e]">de quem você ama</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Uma plataforma criada com propósito: levar alimentação saudável, saborosa
            e acessível para o dia a dia de cada brasileiro.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold text-[#e0992e] tracking-widest uppercase mb-3">Nossa História</p>
            <h2 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
              De uma ideia simples a uma missão de vida
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Tudo começou com uma pergunta: por que é tão difícil comer bem no dia a dia?
              Entre a correria, os preços altos e a falta de opções práticas, percebemos que
              a alimentação saudável estava distante da maioria das pessoas.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Foi assim que nasceu a nossa plataforma — para derrubar essas barreiras e mostrar
              que cuidar da saúde pode ser simples, gostoso e acessível para todos.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop"
              alt="Nossa cozinha"
              className="rounded-3xl shadow-2xl w-full object-cover h-72"
            />
            <div className="absolute -bottom-4 -left-4 bg-[#e0992e] text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-3xl font-bold">+5k</p>
              <p className="text-sm text-white/80">clientes felizes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#e0992e] tracking-widest uppercase mb-3">Por que nos escolher</p>
            <h2 className="text-4xl font-bold text-slate-800">O que nos torna diferentes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{item.titulo}</h4>
                <p className="text-slate-500 text-sm">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#e0992e] tracking-widest uppercase mb-3">Quem somos</p>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Conheça nosso time</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Pessoas apaixonadas por tecnologia e por uma vida mais saudável,
              trabalhando juntas para transformar a forma como você se alimenta.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {time.map((membro, i) => (
              <TeamCard key={i} {...membro} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNos;