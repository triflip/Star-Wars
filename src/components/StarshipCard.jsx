import { Link } from 'react-router-dom';
import getRandomImage from '../utils/starshipImages';

export const StarshipCard = ({ id, name, model }) => {
  const imageURL = getRandomImage();

  return (
    <Link
      to={`/starships/${id}`}
      state={{ image: imageURL }}
      className="flex bg-zinc-900 rounded hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-zinc-600 mb-4 overflow-hidden group"
    >
      {/* Contenidor de la imatge */}
      <div className="shrink-0 w-32 sm:w-40 bg-zinc-950 flex items-center justify-center">
        <img
          src={imageURL}
          alt={name}
          className="object-contain h-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.jp/24/333333/ffffff/400x300.png?text=No%20Image%20Available";
          }}
        />
      </div>

      {/* Contenidor de text */}
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-xl font-bold uppercase text-white group-hover:text-yellow-500 transition-colors">
          {name}
        </h2>
        <p className="text-zinc-400 text-sm mt-1">{model}</p>
      </div>
    </Link>
  );
};
