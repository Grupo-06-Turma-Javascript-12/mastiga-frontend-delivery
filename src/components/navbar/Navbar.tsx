import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {

const [dropdownOpen, setDropdownOpen] = useState(false)
  
return (
    <nav className="w-full text-white shadow-lg" style={{ background: 'linear-gradient(to right, #15803d, #e0992e)' }}>
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to='/home' className="flex items-center gap-6">
            <img 
                src="https://ik.imagekit.io/kef5ubks6/Logo1mastiga.png" 
                alt="ícone" 
                className="h-20 w-auto object-contain"
            />
            <img 
                src="https://ik.imagekit.io/kef5ubks6/Logo2mastiga.webp" 
                alt="Mastiga Delivery" 
                className="h-19 w-auto object-contain"
            />
        </Link>

        {/* LINKS */}
        <div className="flex gap-2 items-center">
          <Link to='/home' className="px-4 py-2 rounded-full transition-all duration-200 font-semibold border-2"
            style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { 
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; 
            e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={e => { 
            e.currentTarget.style.backgroundColor = 'transparent'; 
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}>
            Home
          </Link>

          <Link to='/login' className="px-4 py-2 rounded-full transition-all duration-200 font-semibold border-2"
            style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { 
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; 
            e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={e => { 
            e.currentTarget.style.backgroundColor = 'transparent'; 
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}>
            Login
          </Link>

          <div className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
            
            <Link to='/categorias' className="px-4 py-2 rounded-full transition-all duration-200 font-semibold border-2"
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { 
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; 
                e.currentTarget.style.borderColor = '#ffffff';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.backgroundColor = 'transparent'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              }}>
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

          <Link to='/sobrenos' className="px-4 py-2 rounded-full transition-all duration-200 font-semibold border-2"
            style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { 
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; 
            e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={e => { 
            e.currentTarget.style.backgroundColor = 'transparent'; 
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}>
            Sobre Nós
          </Link>

          <Link to='/sair' className="px-4 py-2 rounded-full transition-all duration-200 font-semibold border-2"
            style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { 
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; 
            e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={e => { 
            e.currentTarget.style.backgroundColor = 'transparent'; 
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}>
            Sair
          </Link>

          <Link to='/carrinho' className="relative px-4 py-2 rounded-full transition-all duration-200 font-semibold border-2"
               style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
               onMouseEnter={e => { 
               e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; 
               e.currentTarget.style.borderColor = '#ffffff';
                     }}
               onMouseLeave={e => { 
               e.currentTarget.style.backgroundColor = 'transparent'; 
               e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                     }}>
                        🛒
               <span className="absolute -top-1 -right-1 bg-white text-green-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                   0
               </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar