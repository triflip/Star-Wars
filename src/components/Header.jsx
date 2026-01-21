import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice'; // Importa la teva acció
import { auth } from '../firebase/config'; // Importa la configuració de Firebase
import { signOut } from 'firebase/auth'; // La funció de Firebase

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Agafem l'estat per saber si hem de mostrar el Logout o el nom de l'usuari
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      // 1. Tanquem sessió a Firebase
      await signOut(auth);
      
      // 2. Netegem l'estat de Redux (això també neteja el localStorage si ho tens al slice)
      dispatch(logout());
      
      // 3. Enviem l'usuari a la Welcome Page
      navigate('/');
    } catch (error) {
      console.error("Error tancant sessió:", error);
    }
  };

  return (
    <header className="text-white">
      {/* Social, Logo i Auth */}
      <div className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        
        {/* Columna Social */}
        <div className="flex-1 flex gap-6 text-zinc-500 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125">
            <img src="/social-icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125">
            <img src="/social-icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125">
            <img src="/social-icons/x.svg" alt="X" className="w-5 h-5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125">
            <img src="/social-icons/youtubekids.svg" alt="Youtube-Kids" className="w-5 h-5" />
          </a>
        </div>
        
        {/* Logo Central */}
        <div className="flex justify-center">
          <Link to="/">
            <img 
              src="/logo/STlogo-header.jpg" // He tret /public perquè a Vite se sol carregar des de l'arrel
              alt="Star Wars" 
              className="w-52 h-auto object-contain hover:scale-105 transition-transform duration-300" 
            />
          </Link>
        </div>

        {/* Columna Dreta (Auth) */}
        <div className="flex-1 flex justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          {isLoggedIn ? (
            <>
              <span className="text-zinc-500 italic">Pilot: {user?.name}</span>
              <div 
                onClick={handleLogout}
                className="hover:text-white cursor-pointer transition-colors flex items-center"
              >
                <span className="text-zinc-700 mr-2">//</span> LOG OUT
              </div>
            </>
          ) : (
            <Link to="/" className="hover:text-white transition-colors">
              <span className="text-zinc-700 mr-2">//</span> LOG IN
            </Link>
          )}
        </div>
      </div>

      {/* Navegació */}
      <nav className="border-y border-zinc-800"> {/* He posat zinc-800 perquè el groc no distregui del logo */}
        <ul className="flex justify-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase py-4">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `pb-4 border-b-2 transition-all duration-300 ${isActive ? 'border-yellow-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/starships" 
              className={({ isActive }) => 
                `pb-4 border-b-2 transition-all duration-300 ${isActive ? 'border-yellow-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`
              }
            >
              Starships
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};