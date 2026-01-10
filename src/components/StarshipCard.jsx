import { Link } from 'react-router-dom';

export const StarshipCard = ({ id, name, model }) => {
  return (
    <Link 
      to={`/starships/${id}`} 
      className="block bg-zinc-900 p-6 rounded hover:bg-zinc-800 transition-colors border-l-2 border-zinc-700 mb-4"
    >
      <h2 className="text-xl font-bold uppercase text-white">{name}</h2>
      <p className="text-zinc-400">{model}</p>
    </Link>
  );
};