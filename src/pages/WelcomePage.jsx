import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
// Importem la teva imatge
import backgroundImage from '../assets/background/Copilot_20260120_125712.png'; 

export function WelcomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      dispatch(login({ email, name: email.split('@')[0] }));
      navigate('/starships');
    }
  };

  return (
    <div 
      className="h-screen w-full flex items-center justify-center bg-black bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Posem la teva imatge de fons
    >
      {/* Capa fosca opcional per si vols que el fons es vegi una mica més fosc quan surti el login */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${showLogin ? 'opacity-60' : 'opacity-0'}`}></div>

      {!showLogin ? (
        /* ÀREA CLICABLE INVISIBLE (o semi-invisible) SOBRE EL LOGO */
        <div 
          onClick={() => setShowLogin(true)}
          className="z-10 cursor-pointer p-20 group flex flex-col items-center"
        >
          {/* Un cercle de llum molt suau per indicar que es pot clicar */}
          <div className="w-64 h-32 border-2 border-yellow-500/0 group-hover:border-yellow-500/20 rounded-full transition-all duration-500 flex items-center justify-center">
             <span className="text-yellow-500 text-[10px] tracking-[1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
               Enter
             </span>
          </div>
        </div>
      ) : (
        /* FORMULARI DE LOGIN */
        <div className="z-20 animate-fade-in w-full max-w-sm px-6">
          <form onSubmit={handleLoginSubmit} className="space-y-6 bg-black/40 p-8 rounded-lg backdrop-blur-sm border border-white/10">
            <input 
              autoFocus
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="IMPERIAL EMAIL"
              className="w-full bg-transparent border-b border-zinc-500 py-3 text-white text-center focus:outline-none focus:border-yellow-500 transition-colors tracking-widest uppercase text-sm"
              required
            />
            
            <button 
              type="submit"
              className="w-full border border-yellow-500 text-yellow-500 py-3 text-xs font-bold uppercase tracking-[0.3em] hover:bg-yellow-500 hover:text-black transition-all"
            >
              Verify Identity
            </button>

            <button 
              type="button" 
              onClick={() => setShowLogin(false)}
              className="w-full text-zinc-500 text-[9px] uppercase tracking-widest hover:text-white"
            >
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}