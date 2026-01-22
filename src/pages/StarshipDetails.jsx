import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useStarships } from '../hooks/useStarships';
import { useFetchRelated } from '../hooks/useFetchRelated';

function StarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  // 1. EXTRAIEM LA LÒGICA DE REDUX AL HOOK
  // Ja no necessitem useDispatch, useSelector ni useEffect aquí!
  const { ship, isLoading } = useStarships(id);
  // 2. EXTRAIEM LA LÒGICA DE PILOTS I FILMS
  const { data: pilots, loading: loadingPilots } = useFetchRelated(ship?.pilots);
  const { data: films, loading: loadingFilms } = useFetchRelated(ship?.films);

  // 3. MENTRE CARREGA O NO TROBA LA NAU
  if (isLoading || !ship) {
    return (
      <div className="h-screen flex items-center justify-center bg-black p-4">
        <div className="text-yellow-500 uppercase tracking-[0.2em] text-center text-xs animate-pulse">
          Re-establishing connection with Starship Database...
        </div>
      </div>
    );
  }

  const shipImage = location.state?.image || `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

  return (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 text-zinc-300">
    {/* Botó Back */}
    <button onClick={() => navigate(-1)} className="mb-6 uppercase text-[10px] tracking-widest flex items-center gap-2 hover:text-white transition-colors">
      <span className="text-lg">←</span> Back to list
    </button>

    {/* GRID PRINCIPAL: 1 columna mòbil, 3 columnes a Desktop (1 per imatge, 2 per info) */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* COLUMNA ESQUERRA (Imatge) */}
      <div className="lg:col-span-1">
        <div className="bg-black rounded-lg border border-zinc-800 p-6 flex items-center justify-center shadow-2xl overflow-hidden">
          <img 
            src={shipImage} 
            alt={ship.name} 
            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" 
          />
        </div>
      </div>

      {/* COLUMNA DRETA (Info, Pilots i Pelis) */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Box de Dades Tècniques */}
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-lg border border-zinc-800 shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-yellow-500 uppercase italic tracking-tighter">
            {ship.name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
               <p><span className="text-zinc-500 uppercase text-[10px] block font-bold tracking-widest">Model</span> {ship.model}</p>
               <p><span className="text-zinc-500 uppercase text-[10px] block font-bold tracking-widest">Manufacturer</span> {ship.manufacturer}</p>
               <p><span className="text-zinc-500 uppercase text-[10px] block font-bold tracking-widest">Cost</span> {ship.cost_in_credits}</p>
            </div>
            <div className="space-y-3">
               <p><span className="text-zinc-500 uppercase text-[10px] block font-bold tracking-widest">Length</span> {ship.length}m</p>
               <p><span className="text-zinc-500 uppercase text-[10px] block font-bold tracking-widest">Crew</span> {ship.crew}</p>
               <p><span className="text-zinc-500 uppercase text-[10px] block font-bold tracking-widest">Speed</span> {ship.max_atmosphering_speed}</p>
            </div>
          </div>
        </div>

        {/* Sub-grid per a Pilots i Pelis (Es posen de costat en pantalles grans) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SECCIÓ PILOTS */}
          <section className="bg-zinc-900/40 p-5 rounded-lg border border-zinc-800/50">
            <h3 className="text-yellow-500 uppercase tracking-[0.2em] text-xs mb-4 border-b border-zinc-800 pb-2">Pilots</h3>
            {loadingPilots ? (
              <p className="text-zinc-600 italic text-xs animate-pulse">Scanning...</p>
            ) : pilots.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {pilots.map(p => (
                  <span key={p.name} className="bg-zinc-800 px-3 py-1 rounded-full text-xs border border-zinc-700">
                    {p.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-zinc-600 italic text-xs">No pilots found.</p>
            )}
          </section>

          {/* SECCIÓ FILMS */}
          <section className="bg-zinc-900/40 p-5 rounded-lg border border-zinc-800/50">
            <h3 className="text-yellow-500 uppercase tracking-[0.2em] text-xs mb-4 border-b border-zinc-800 pb-2">Appearances</h3>
            {loadingFilms ? (
              <p className="text-zinc-600 italic text-xs animate-pulse">Retrieving...</p>
            ) : (
              <ul className="space-y-2">
                {films.map(f => (
                  <li key={f.title} className="text-xs sm:text-sm text-zinc-400 flex items-center gap-2">
                    <span className="text-yellow-500/50 text-[8px]">●</span> {f.title}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  </div>
);
}

export default StarshipDetails;