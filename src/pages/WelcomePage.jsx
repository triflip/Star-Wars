import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background/Copilot_20260120_125712.png'; 

// IMPORTEM LES EINES DE FIREBASE
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';

export function WelcomePage() {
  const [showForm, setShowForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Canvia entre login i registre
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Firebase necessita password!
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let userCredential;
      
      if (isRegistering) {
        // REGISTRE NOU USUARI
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // LOGIN USUARI EXISTENT
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      
      // Guardem a Redux (el nom serà la part d'abans de l'@)
      dispatch(login({ 
        email: user.email, 
        name: user.email.split('@')[0] 
      }));

      navigate('/starships');
    } catch (err) {
      // Gestió d'errors (ex: email ja existent, password curt, etc.)
      setError(err.message);
    }
  };

  return (
    <div 
      className="h-screen w-full flex items-center justify-center bg-black bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {!showForm ? (
        <div onClick={() => setShowForm(true)} className="cursor-pointer p-20 group">
          <div className="w-64 h-32 border-2 border-yellow-500/0 group-hover:border-yellow-500/20 rounded-full flex items-center justify-center transition-all">
             <span className="text-yellow-500 text-[10px] tracking-[1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Enter</span>
          </div>
        </div>
      ) : (
        <div className="z-20 animate-fade-in w-full max-w-sm px-6">
          <form onSubmit={handleSubmit} className="space-y-4 bg-black/60 p-8 rounded-lg backdrop-blur-md border border-white/10">
            <h2 className="text-white text-center text-xs tracking-[0.4em] uppercase mb-6">
              {isRegistering ? 'New Cadet Registration' : 'Imperial Identity'}
            </h2>

            {error && <p className="text-red-500 text-[10px] text-center uppercase mb-4 italic">{error}</p>}

            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              className="w-full bg-transparent border-b border-zinc-700 py-2 text-white text-center focus:outline-none focus:border-yellow-500 text-sm"
              required
            />

            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="w-full bg-transparent border-b border-zinc-700 py-2 text-white text-center focus:outline-none focus:border-yellow-500 text-sm"
              required
            />
            
            <button type="submit" className="w-full border border-yellow-500 text-yellow-500 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">
              {isRegistering ? 'Create Account' : 'Login'}
            </button>

            <div className="flex flex-col gap-2 mt-4">
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-zinc-400 text-[9px] uppercase tracking-widest hover:text-yellow-500"
              >
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-zinc-600 text-[9px] uppercase hover:text-white">Back</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}