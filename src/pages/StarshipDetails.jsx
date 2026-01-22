import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useStarships } from '../hooks/useStarships';
import { useFetchRelated } from '../hooks/useFetchRelated';

function StarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { ship, isLoading } = useStarships(id);
  const { data: pilots, loading: loadingPilots } = useFetchRelated(ship?.pilots);
  const { data: films, loading: loadingFilms } = useFetchRelated(ship?.films);

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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-0 text-zinc-300">
      
      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA ESQUERRA (Imatge) */}
        <div className="lg:col-span-1">
          <div className="bg-black rounded-lg border border-zinc-800 p-6 flex items-center justify-center shadow-2xl overflow-hidden sticky top-32">
            <img 
              src={shipImage} 
              alt={ship.name} 
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* COLUMNA DRETA (Info, Pilots i Pelis) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Box de Dades Tècniques  */}
          <div className=" p-6 sm:p-8 rounded-lg border border-zinc-800 shadow-xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-500 uppercase italic tracking-tighter">
              {ship.name}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p>
                  <span className="text-zinc-600 uppercase text-[10px] block font-bold tracking-[0.2em] mb-1">Model</span> 
                  <span className="text-sm text-zinc-300">{ship.model}</span>
                </p>
                <p>
                  <span className="text-zinc-600 uppercase text-[10px] block font-bold tracking-[0.2em] mb-1">Manufacturer</span> 
                  <span className="text-sm text-zinc-300">{ship.manufacturer}</span>
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  <span className="text-zinc-600 uppercase text-[10px] block font-bold tracking-[0.2em] mb-1">Length</span> 
                  <span className="text-sm text-zinc-300">{ship.length}m</span>
                </p>
                <p>
                  <span className="text-zinc-600 uppercase text-[10px] block font-bold tracking-[0.2em] mb-1">Crew</span> 
                  <span className="text-sm text-zinc-300">{ship.crew}</span>
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  <span className="text-zinc-600 uppercase text-[10px] block font-bold tracking-[0.2em] mb-1">Cost</span> 
                  <span className="text-sm text-zinc-300">{ship.cost_in_credits}</span>
                </p>
                <p>
                  <span className="text-zinc-600 uppercase text-[10px] block font-bold tracking-[0.2em] mb-1">Max Speed</span> 
                  <span className="text-sm text-zinc-300">{ship.max_atmosphering_speed}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Sub-grid per a Pilots i Pelis - ARA EN NEGRE PUR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* SECCIÓ PILOTS */}
            <section className="bg-black p-6 rounded-lg border border-zinc-800 shadow-lg">
              <h3 className="text-yellow-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-6 border-b border-zinc-900 pb-3">Pilots</h3>
              {loadingPilots ? (
                <p className="text-zinc-700 italic text-[10px] animate-pulse uppercase">Scanning manifest...</p>
              ) : pilots.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {pilots.map(p => (
                    <span key={p.name} className="bg-zinc-900/50 px-3 py-1.5 rounded-sm text-[10px] border border-zinc-800 text-zinc-400 uppercase tracking-wider font-bold">
                      {p.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-700 italic text-[10px] uppercase tracking-widest">No pilots registered.</p>
              )}
            </section>

            {/* SECCIÓ FILMS */}
            <section className="bg-black p-6 rounded-lg border border-zinc-800 shadow-lg">
              <h3 className="text-yellow-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-6 border-b border-zinc-900 pb-3">Appearances</h3>
              {loadingFilms ? (
                <p className="text-zinc-700 italic text-[10px] animate-pulse uppercase">Accessing holorecords...</p>
              ) : (
                <ul className="space-y-3">
                  {films.map(f => (
                    <li key={f.title} className="text-[10px] text-zinc-400 flex items-center gap-3 uppercase font-bold tracking-widest">
                      <span className="text-yellow-600 text-[6px]">▶</span> {f.title}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Botó Back al final per tancar la secció d'info */}
          <div className="pt-4">
            <button 
              onClick={() => navigate(-1)} 
              className="group uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 text-zinc-600 hover:text-yellow-500 transition-all duration-300"
            >
              <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> 
              Return to imperial list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StarshipDetails;