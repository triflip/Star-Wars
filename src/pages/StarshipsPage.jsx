import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../features/starships/starshipSlice';
import { StarshipCard } from '../components/StarshipCard';

export function StarshipsPage() {
  const dispatch = useDispatch();
  const { list, status, error, page, hasMore } = useSelector((state) => state.starships);

  // 1. EL "SENTINELLA" (Observer)
  // Fem servir useRef per guardar l'observador sense renderitzar la pàgina
  const observer = useRef();

  // Fem servir useCallback per crear la referència de l'últim element
  const lastShipElementRef = useCallback(node => {
    if (status === 'loading' || !hasMore ) return; // Si ja estem carregant, no facis res

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      // Si l'element entra a la pantalla...
      if (entries[0].isIntersecting) {
        // ...i si no hem arribat a un límit lògic (opcional)
        dispatch(fetchStarships(page));
      }
    });

    if (node) observer.current.observe(node);
  }, [status, dispatch, page, hasMore]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStarships(1));
    }
  }, [status, dispatch]);

  return (
    <div className="w-full py-10">
      {/* TÍTOL ESTIL STAR WARS */}
      <div className="flex items-center gap-6 mb-16">
        <div className="h-px flex-1 bg-zinc-800"></div>
        <h1 className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.5em] uppercase whitespace-nowrap">
          Starships Catalog
        </h1>
        <div className="h-px flex-1 bg-zinc-800"></div>
      </div>

      {status === 'failed' && (
        <p className="text-red-500 text-center uppercase tracking-widest text-xs">Error: {error}</p>
      )}

      {/* La graella de naus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-10 gap-x-6">
        {list.map((ship, index) => {
          const id = ship.url.split('/').filter(Boolean).pop();
          
          // 2. DETECTAR L'ÚLTIM ELEMENT
          // Si és l'últim de la llista, li posem la referència 'lastShipElementRef'
          if (list.length === index + 1) {
            return (
              <div ref={lastShipElementRef} key={ship.url}>
                <StarshipCard id={id} name={ship.name} model={ship.model} />
              </div>
              
            );
          } else {
            return (
              <StarshipCard key={ship.url} id={id} name={ship.name} model={ship.model} />
            );
          }
        })}
      </div>

      {/* 3. FEEDBACK VISUAL */}
      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center my-10 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-zinc-500"></div>
          <p className="text-zinc-600 uppercase text-[10px] tracking-widest animate-pulse">
            Fetching more ships...
          </p>
        </div>
      )}
      {/* 2. QUAN S'ACABEN LES NAUS: Mostrem el missatge final */}
      {!hasMore && list.length > 0 && status !== 'loading' && (
        <div className="flex items-center gap-6 my-16 opacity-40">
          <div className="h-px flex-1 bg-zinc-800"></div>
          <p className="text-zinc-500 text-[20px] uppercase tracking-[0.5em] whitespace-nowrap">
            End of Imperial Archives
          </p>
          <div className="h-px flex-1 bg-zinc-800"></div>
    </div>
)}
</div>
  );
}
export default StarshipsPage;