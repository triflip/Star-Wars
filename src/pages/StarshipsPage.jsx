import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../features/starships/starshipsSlice';

import { Link } from 'react-router-dom';

export function StarshipsPage() {
  const dispatch = useDispatch();
  
  // Agafem les dades del magatzem de Redux
  const { list, status, error } = useSelector((state) => state.starships);

  useEffect(() => {
    // Si no hem començat a carregar, enviem el missatger
    if (status === 'idle') {
      dispatch(fetchStarships(1));
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold border-b border-zinc-800 pb-4 mb-8 tracking-tighter">
        STARSHIPS
      </h1>

      {/* Si s'està carregant */}
      {status === 'loading' && (
        <p className="text-yellow-500 animate-pulse text-center">Loading from a galaxy far, far away...</p>
      )}

      {/* Si hi ha un error */}
      {status === 'failed' && (
        <p className="text-red-500 bg-red-900/20 p-4 rounded text-center">Error: {error}</p>
      )}

      {/* Si tot ha anat bé, pintem la llista */}
      <div className="flex flex-col gap-4">

      

        {list.map((ship) => {
  // L'API ens dóna la url així: "https://swapi.dev/api/starships/9/"
  // Extreiem el número (el 9) per fer-lo servir d'ID
  const id = ship.url.split('/').filter(Boolean).pop();
           

  return (
    <Link 
      to={`/starships/${id}`} 
      key={id}
      className="block bg-zinc-900 p-6 rounded hover:bg-zinc-800 transition-colors border-l-2 border-zinc-700 mb-4"
    >
      <h2 className="text-xl font-bold uppercase">{ship.name}</h2>
      <p className="text-zinc-400">{ship.model}</p>
    </Link>
  );
})}
      </div>
    </div>
  );
}
export default StarshipsPage;