import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className=" text-white">
      {/*  Social, Logo i Auth */}
      <div className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        
        {/* Columna Social - flex-1 fa que ocupi el mateix que la dreta */}
        <div className="flex-1 flex gap-6 text-zinc-500 text-lg">
     
 
  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125 cursor-pointer">
    <img src="/social-icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
  </a>

 
  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125 cursor-pointer">
    <img src="/social-icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
  </a>

  
  <a href="https://x.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125 cursor-pointer">
    <img src="/social-icons/x.svg" alt="X" className="w-5 h-5" />
  </a>

  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-5 h-5 invert transition-transform duration-300 hover:scale-125 cursor-pointer">
    <img src="/social-icons/youtubekids.svg" alt="Youtube-Kids" className="w-5 h-5" />
  </a>

        </div>
        
      
        <div className="flex justify-start">
          <Link to="/">
            <img 
              src="/public/logo/STlogo-header.jpg" 
              alt="Star Wars" 
              className="w-52 h-auto object-contain hover:scale-105 transition-transform duration-300" 
            />
          </Link>
        </div>

        {/* Columna Dreta (Auth) - flex-1 per equilibrar el centre */}
        <div className="flex-1 flex justify-end gap-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          <div className="hover:text-white cursor-pointer transition-colors">
            <span className="text-zinc-700 mr-2">//</span> LOG IN
          </div>
          <div className="hover:text-white cursor-pointer transition-colors">
            <span className="text-zinc-700 mr-2">//</span> SIGN UP
          </div>
        </div>
      </div>


      <nav className="border-y border-yellow-400">
        <ul className="flex justify-center gap-8 text-xs font-bold tracking-[0.2em] uppercase py-4">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `pb-4 border-b-2 transition-all duration-300 ${isActive ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/starships" 
              className={({ isActive }) => 
                `pb-4 border-b-2 transition-all duration-300 ${isActive ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`
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