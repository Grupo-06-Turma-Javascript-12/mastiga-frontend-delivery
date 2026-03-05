import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Footer() {

  const data = new Date().getFullYear()

  return (
    <footer className="text-white" style={{ background: 'linear-gradient(to right, #15803d, #e0992e)' }}>
      
      <div className="container mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="flex flex-col gap-4">
          <Link to='/home' className="flex items-center gap-4">
            <img 
              src="https://ik.imagekit.io/kef5ubks6/Logo1mastiga.png" 
              alt="ícone" 
              className="h-12 w-auto object-contain"
            />
            <img 
              src="https://ik.imagekit.io/kef5ubks6/Logo2mastiga.webp" 
              alt="Mastiga Delivery" 
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-white/70 text-sm leading-relaxed">
            Delivery de comida vegana, saudável e deliciosa direto pra você.
          </p>
          <div className="flex gap-3 mt-2">
            <LinkedinLogoIcon size={28} weight="bold" className="text-white/60 hover:text-white cursor-pointer transition-colors duration-200" />
            <InstagramLogoIcon size={28} weight="bold" className="text-white/60 hover:text-white cursor-pointer transition-colors duration-200" />
            <FacebookLogoIcon size={28} weight="bold" className="text-white/60 hover:text-white cursor-pointer transition-colors duration-200" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">Navegação</p>
          <Link to="/home" className="text-white/80 hover:text-white transition-colors duration-200">Home</Link>
          <Link to="/categorias" className="text-white/80 hover:text-white transition-colors duration-200">Categorias</Link>
          <Link to="/sobrenos" className="text-white/80 hover:text-white transition-colors duration-200">Sobre Nós</Link>
          <Link to="/carrinho" className="text-white/80 hover:text-white transition-colors duration-200">Carrinho</Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">Contato</p>
          <p className="text-white/80 text-sm">✉ mastiga@delivery.com</p>
          <p className="text-white/80 text-sm">📍 Recife, PE</p>
        </div>

      </div>

      <div className="py-4 px-8" style={{ backgroundColor: '#14532d' }}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-white/50 text-sm gap-2">
          <p>© Mastiga Delivery {data} — Todos os direitos reservados.</p>
          <p>Comida saudável feita com amor pela equipe Mastiga 🥗</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer