import { useParams, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import fetchStarships from '../features/starships/starshipsSlice.js';

function StarshipDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Busquem la nau a la Store
  const ship = useSelector((state) => 
    state.starships.list.find(s => s.url.includes(`/${id}/`))
  );

  // 2. Mirem si la llista de Redux està buida (típic de F5)
  const isListEmpty = useSelector((state) => state.starships.list.length === 0);
  const { status } = useSelector((state) => state.starships); // Per saber si està carregant

  useEffect(() => {
    // Si no hi ha naus a Redux, disparem l'acció de carregar-les totes
    if (isListEmpty && status !== 'loading') {
      // AQUÍ: Usa el nom de la teva acció de Redux (potser es diu fetchStarships o getStarships)
      dispatch(fetchStarships()); 
    }
  }, [isListEmpty, status, dispatch]);

  // 3. MENTRE CARREGA O NO TROBA LA NAU
  if (isListEmpty || !ship) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-yellow-500 uppercase tracking-[0.3em] text-xs animate-pulse">
          Re-establishing connection with Starship Database...
        </div>
      </div>
    );
  }

  // 4. LA IMATGE (Amb fallback si el F5 esborra el location.state)
  const shipImage = location.state?.image || `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <button 
        onClick={() => navigate(-1)} 
        className="text-zinc-500 hover:text-white mb-6 uppercase text-xs tracking-widest transition-colors"
      >
        ← Back to list
      </button>

      {/* Contenidor principal amb imatge a la esquerra i dades a la dreta */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-2xl">
        
        {/* COLUMNA 1: LA IMATGE */}
        <div className="bg-black flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-zinc-800">
          <img 
            src={shipImage} 
            alt={ship.name} 
            className="max-w-full h-auto object-contain"
          />
        </div>

        {/* COLUMNA 2: LES DADES (El teu codi original) */}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-yellow-500 uppercase italic tracking-tighter">
            {ship.name}
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p><span className="text-zinc-500 uppercase text-[10px] block font-bold">Model</span> {ship.model}</p>
              <p><span className="text-zinc-500 uppercase text-[10px] block font-bold">Cost</span> {ship.cost_in_credits}</p>
              <p><span className="text-zinc-500 uppercase text-[10px] block font-bold">Speed</span> {ship.max_atmosphering_speed}</p>
            </div>
            <div className="space-y-4">
              <p><span className="text-zinc-500 uppercase text-[10px] block font-bold">Manufacturer</span> {ship.manufacturer}</p>
              <p><span className="text-zinc-500 uppercase text-[10px] block font-bold">Length</span> {ship.length}</p>
              <p><span className="text-zinc-500 uppercase text-[10px] block font-bold">Crew</span> {ship.crew}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StarshipDetails;