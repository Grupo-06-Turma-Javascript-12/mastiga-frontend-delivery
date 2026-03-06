import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { ShoppingCartIcon } from "@phosphor-icons/react"
import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {

  const { handleLogout } = useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const linkClass = "px-4 py-2 rounded-full transition-all duration-200 font-semibold border-2"
  const linkStyle = { color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }
  const onEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
    e.currentTarget.style.borderColor = '#ffffff'
  }
  const onLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
  }

  function handleSair() {
    handleLogout()
    navigate('/home')
  }

  return (
    <nav className="w-full text-white shadow-lg" style={{ background: 'linear-gradient(to right, #15803d, #e0992e)' }}>
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        
        <Link to='/home' className="flex items-center gap-2 md:gap-6">
          <img src="https://ik.imagekit.io/kef5ubks6/Logo1mastiga.png" alt="ícone" className="h-10 md:h-20 w-auto object-contain" />
          <img src="https://ik.imagekit.io/kef5ubks6/Logo2mastiga.webp" alt="Mastiga Delivery" className="h-8 md:h-19 w-auto object-contain" />
        </Link>

        <div className="hidden lg:flex gap-2 items-center">
          <Link to='/home' className={linkClass} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Home</Link>
          <Link to='/login' className={linkClass} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Login</Link>

          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <Link to='/categorias' className={linkClass} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              Categorias ▾
            </Link>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#c8a165] rounded-xl shadow-xl p-2 min-w-40 z-50">
                <Link to='/categorias/bebidas' className="block px-4 py-2 rounded-lg text-green-800 hover:bg-white transition-all">Bebidas</Link>
                <Link to='/categorias/massas' className="block px-4 py-2 rounded-lg text-green-800 hover:bg-white transition-all">Massas</Link>
                <Link to='/categorias/pizzasintegrais' className="block px-4 py-2 rounded-lg text-green-800 hover:bg-white transition-all">Pizzas Integrais</Link>
                <Link to='/categorias/saladas' className="block px-4 py-2 rounded-lg text-green-800 hover:bg-white transition-all">Saladas</Link>
                <Link to='/categorias/sopas' className="block px-4 py-2 rounded-lg text-green-800 hover:bg-white transition-all">Sopas</Link>
                <Link to='/categorias/sobremesas' className="block px-4 py-2 rounded-lg text-green-800 hover:bg-white transition-all">Sobremesas</Link>
              </div>
            )}
          </div>

          <Link to='/sobrenos' className={linkClass} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Sobre Nós</Link>
          
          <button
            onClick={handleSair}
            className={linkClass}
            style={linkStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            Sair
          </button>

          {/* Carrinho desktop */}
          <Link to='/carrinho' className={`relative ${linkClass}`} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <ShoppingCartIcon size={20} weight="fill" />
            <span className="absolute -top-1 -right-1 bg-white text-green-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
          </Link>
        </div>

        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-2 px-8 pb-4">
          <Link to='/home' className="py-2 font-semibold border-b border-white/20 text-white/90 hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to='/login' className="py-2 font-semibold border-b border-white/20 text-white/90 hover:text-white" onClick={() => setMenuOpen(false)}>Login</Link>
          
          <div>
            <button className="w-full text-left py-2 font-semibold border-b border-white/20 text-white/90" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Categorias {dropdownOpen ? '▴' : '▾'}
            </button>
            {dropdownOpen && (
              <div className="flex flex-col pl-4 mt-1 gap-1">
                <Link to='/categorias/bebidas' className="py-1.5 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Bebidas</Link>
                <Link to='/categorias/massas' className="py-1.5 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Massas</Link>
                <Link to='/categorias/pizzasintegrais' className="py-1.5 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Pizzas Integrais</Link>
                <Link to='/categorias/saladas' className="py-1.5 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Saladas</Link>
                <Link to='/categorias/sopas' className="py-1.5 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Sopas</Link>
                <Link to='/categorias/sobremesas' className="py-1.5 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Sobremesas</Link>
              </div>
            )}
          </div>

          <Link to='/sobrenos' className="py-2 font-semibold border-b border-white/20 text-white/90 hover:text-white" onClick={() => setMenuOpen(false)}>Sobre Nós</Link>
          
          <button
            onClick={() => { handleSair(); setMenuOpen(false) }}
            className="py-2 font-semibold border-b border-white/20 text-white/90 hover:text-white text-left w-full"
          >
            Sair
          </button>

          {/* Carrinho mobile */}
          <Link to='/carrinho' className="py-2 font-semibold text-white/90 hover:text-white flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <ShoppingCartIcon size={20} weight="fill" />
            Carrinho
            <span className="bg-white text-green-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar