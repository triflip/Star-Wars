import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../features/starships/starshipsSlice';
import { Link } from 'react-router-dom';
import { ViewMoreButton } from '../components/ViewMoreButton';
import { StarshipCard } from '../components/StarshipCard';

export function StarshipsPage() {
  const dispatch = useDispatch();
  
  // Agafem les dades del magatzem de Redux
  const { list, status, error, page } = useSelector((state) => state.starships);

  useEffect(() => {
    // Si no hem començat a carregar, enviem el missatger
    if (status === 'idle') {
      dispatch(fetchStarships(1));
    }
  }, [status, dispatch]);

  // FUNCIÓ per carregar la següent pàgina
  const handleViewMore = () => {
    dispatch(fetchStarships(page));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold border-b border-zinc-800 pb-4 mb-8 tracking-tighter">
        STARSHIPS
      </h1>

      {/* Si s'està carregant */}
      {status === 'loading' && (
        <p className="text-yellow-500 animate-pulse text-center">Loading from a galaxy far, far away...</p>
      )}

      {status === 'failed' && (
        <p className="text-red-500 bg-red-900/20 p-4 rounded text-center">Error: {error}</p>
      )}

      {/* Només ensenyem el botó si no estem carregant i hi ha naus */}
      {status !== 'loading' && list.length > 0 && (
        <ViewMoreButton onClick={handleViewMore} />
      )}

      {/* Si tot ha anat bé, pintem la llista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      

        {list.map((ship) => {
  // L'API ens dóna la url així: "https://swapi.dev/api/starships/9/"
  // Extreiem el número (el 9) per fer-lo servir d'ID
  const id = ship.url.split('/').filter(Boolean).pop();
           

// CRIDEM AL COMPONENT, que és qui té la lògica de la imatge
    return (
      <StarshipCard 
        key={ship.url} 
        id={id} 
        name={ship.name} 
        model={ship.model} 
      />
    );
})}
      </div>
    </div>
  );
}
export default StarshipsPage;