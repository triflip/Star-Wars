import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function StarshipDetails() {
  const { id } = useParams();
  // Busquem la nau dins de la llista que ja tenim a Redux
  const ship = useSelector((state) => 
    state.starships.list.find(s => s.url.includes(`/${id}/`))
  );

  if (!ship) return <div className="p-10 text-center">Star ship not found...</div>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6 text-yellow-500 uppercase italic tracking-tighter">
        {ship.name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900 p-8 rounded-lg shadow-2xl border border-zinc-800">
        <div className="space-y-4">
          <p><span className="text-zinc-500 uppercase text-sm block">Model</span> {ship.model}</p>
          <p><span className="text-zinc-500 uppercase text-sm block">Cost in credits</span> {ship.cost_in_credits}</p>
          <p><span className="text-zinc-500 uppercase text-sm block">Atmosphering Speed</span> {ship.max_atmosphering_speed}</p>
        </div>
        <div className="space-y-4">
          <p><span className="text-zinc-500 uppercase text-sm block">Manufacturer</span> {ship.manufacturer}</p>
          <p><span className="text-zinc-500 uppercase text-sm block">Length</span> {ship.length}</p>
          <p><span className="text-zinc-500 uppercase text-sm block">Crew</span> {ship.crew}</p>
        </div>
      </div>
    </div>
  );
}

export default StarshipDetails;