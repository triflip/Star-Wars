import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error("Error tancant sessió:", error);
    }
  };

  const socialLinks = {
    youtubekids: "https://www.youtube.com/starwars",
    instagram: "https://instagram.com/starwars",
    facebook: "https://facebook.com/starwars",
    x: "https://x.com/starwars"
  };

  return (
    <header className="text-white border-b border-zinc-800">

      {/* TOP BAR — Desktop */}
      <div className="hidden md:flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">

        {/* Xarxes socials */}
        <div className="flex-1 flex gap-6 text-zinc-500 text-lg">
          {Object.entries(socialLinks).map(([icon, url]) => (
            <a 
              key={icon} 
              href={url} 
              target="_blank" 
              rel="noreferrer"
              className="w-5 h-5 invert transition-transform duration-300 hover:scale-125"
            >
              <img src={`/social-icons/${icon}.svg`} alt={icon} className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <img 
              src="/logo/STlogo-header.jpg"
              alt="Star Wars" 
              className="w-52 h-auto object-contain hover:scale-105 transition-transform duration-300" 
            />
          </Link>
        </div>

        {/* Auth */}
        <div className="flex-1 flex justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          {isLoggedIn ? (
            <>
              <span className="text-zinc-500 italic">Pilot: {user?.name}</span>
              <button 
                onClick={handleLogout}
                className="hover:text-white cursor-pointer transition-colors flex items-center"
              >
                <span className="text-zinc-700 mr-2">//</span> LOG OUT
              </button>
            </>
          ) : (
            <Link to="/" className="hover:text-white transition-colors">
              <span className="text-zinc-700 mr-2">//</span> LOG IN
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center px-6 py-4">

        {/* Hamburguesa */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-zinc-300"
        >
          ☰
        </button>

        {/* Logo petit */}
        <Link to="/" className="flex justify-center flex-1">
          <img 
            src="/logo/STlogo-header.jpg"
            alt="Star Wars" 
            className="w-32 h-auto object-contain" 
          />
        </Link>

        {/* Placeholder per simetria */}
        <div className="w-6"></div>
      </div>

      {/* Pilot sota el logo (només mòbil) */}
      {isLoggedIn && (
        <p className="md:hidden text-center text-zinc-400 text-xs italic pb-2">
          Pilot: {user?.name}
        </p>
      )}

      {/* NAV — Desktop */}
      <nav className="hidden md:block border-y border-zinc-800">
        <ul className="flex justify-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase py-4">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `pb-4 border-b-2 transition-all duration-300 ${
                  isActive ? 'border-yellow-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/starships" 
              className={({ isActive }) => 
                `pb-4 border-b-2 transition-all duration-300 ${
                  isActive ? 'border-yellow-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`
              }
            >
              Starships
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-4 space-y-4">

          {/* Navegació */}
          <NavLink 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="block text-zinc-300 uppercase tracking-widest"
          >
            Home
          </NavLink>

          <NavLink 
            to="/starships" 
            onClick={() => setIsOpen(false)} 
            className="block text-zinc-300 uppercase tracking-widest"
          >
            Starships
          </NavLink>

          <div className="border-t border-zinc-700 pt-4 space-y-4">

            {/* Xarxes */}
            <div className="flex gap-4">
              {Object.entries(socialLinks).map(([icon, url]) => (
                <a 
                  key={icon} 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-5 h-5 invert"
                >
                  <img src={`/social-icons/${icon}.svg`} alt={icon} className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Logout */}
            {isLoggedIn && (
              <button 
                onClick={handleLogout}
                className="text-zinc-300 uppercase tracking-widest text-sm"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
