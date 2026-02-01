import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";

const logo = `${import.meta.env.BASE_URL}logo/star_wars_logo.png`;

const SocialLinks = ({ links }) => (
  <div className="flex gap-6 text-zinc-500 text-lg">
    {Object.entries(links).map(([icon, url]) => (
      <a
        key={icon}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="w-5 h-5 invert transition-transform duration-300 hover:scale-125"
      >
        <img
          src={`${import.meta.env.BASE_URL}social-icons/${icon}.svg`}
          alt={icon}
          className="w-5 h-5"
        />
      </a>
    ))}
  </div>
);

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      setIsOpen(false);
      navigate(import.meta.env.BASE_URL);
    } catch (error) {
      console.error("Error tancant sessió:", error);
    }
  };

  const socialLinks = {
    youtubekids: "https://www.youtube.com/starwars",
    facebook: "https://facebook.com/starwars",
    instagram: "https://instagram.com/starwars",
    x: "https://x.com/starwars",
  };

  return (
    <header className="text-white border-b border-zinc-800 bg-black/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className="hidden md:flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <div className="flex-1">
          <SocialLinks links={socialLinks} />
        </div>

        <div className="flex justify-center">
          <Link to={import.meta.env.BASE_URL}>
            <img
              src={logo}
              alt="Star Wars"
              className="w-52 h-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

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
            <Link
              to={import.meta.env.BASE_URL}
              className="hover:text-white transition-colors"
            >
              <span className="text-zinc-700 mr-2">//</span> LOG IN
            </Link>
          )}
        </div>
      </div>

      <div className="md:hidden flex justify-between items-center px-6 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-zinc-300"
        >
          ☰
        </button>
        <Link
          to={import.meta.env.BASE_URL}
          className="flex justify-center flex-1"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo/star_wars_logo.png`}
            alt="Star Wars"
            className="w-32 h-auto object-contain"
          />
        </Link>
        <div className="w-6"></div>
      </div>

      {isLoggedIn && (
        <p className="md:hidden text-center text-zinc-400 text-xs italic pb-2">
          Pilot: {user?.name}
        </p>
      )}

      <nav className="hidden md:block border-y border-zinc-800">
        <ul className="flex justify-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase py-4">
          <li>
            <NavLink
              to={import.meta.env.BASE_URL}
              className={({ isActive }) =>
                `pb-4 border-b-2 transition-all duration-300 ${isActive ? "border-yellow-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${import.meta.env.BASE_URL}starships`}
              className={({ isActive }) =>
                `pb-4 border-b-2 transition-all duration-300 ${
                  isActive
                    ? "border-yellow-500 text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              Starships
            </NavLink>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-4 space-y-4">
          <NavLink
            to={import.meta.env.BASE_URL}
            onClick={() => setIsOpen(false)}
            className="block text-zinc-300 uppercase tracking-widest"
          >
            Home
          </NavLink>

          <NavLink
            to={`${import.meta.env.BASE_URL}starships`}
            onClick={() => setIsOpen(false)}
            className="block text-zinc-300 uppercase tracking-widest"
          >
            Starships
          </NavLink>

          <div className="border-t border-zinc-700 pt-4 space-y-4">
            <div className="flex gap-4">
              <SocialLinks links={socialLinks} />
            </div>
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
