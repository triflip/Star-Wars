import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from './features/starships/starshipsSlice';

function App() {
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
        {list.map((ship, index) => (
          <div 
            key={index} 
            className="bg-zinc-900 p-6 rounded hover:bg-zinc-800 transition-colors cursor-pointer border-l-2 border-zinc-700"
          >
            <h2 className="text-xl font-bold uppercase">{ship.name}</h2>
            <p className="text-zinc-400">{ship.model}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;