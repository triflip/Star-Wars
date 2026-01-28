import { Link } from 'react-router-dom';
import getRandomImage from '../utils/starshipImages';
import { log } from 'firebase/firestore/pipelines';

export const StarshipCard = ({ id, name, model }) => {
  const imageURL = getRandomImage();
  console.log(imageURL);
  return (
    <Link
      to={`/starships/${id}`}
      state={{ image: imageURL }}
     
      className="flex bg-black rounded mb-6 overflow-visible group border border-zinc-800 
                 transition-all duration-300 ease-in-out transform
                 hover:scale-[1.05] hover:border-yellow-500/50 hover:z-50 relative
                 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
    >
      
      <div className="shrink-0 w-32 sm:w-40 bg-zinc-950 flex items-center justify-center border-r border-zinc-800">
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

      <div className="p-4 flex flex-col justify-center w-full bg-black">
        <h2 className="text-xl font-bold uppercase text-white group-hover:text-yellow-500 transition-colors">
          {name}
        </h2>
        <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">{model}</p>
      </div>
    </Link>
  );
};