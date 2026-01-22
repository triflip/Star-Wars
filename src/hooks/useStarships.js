import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../store/slices/starshipsSlice';

export const useStarships = (id = null) => {
  const dispatch = useDispatch();
  
  // Agafem les dades de la Store
  const { list, status } = useSelector((state) => state.starships);

  // Lògica derivada: la calculem aquí dins per estalviar-li feina al component
  const isListEmpty = list.length === 0;
  
  // Si ens passen una ID (com a StarshipDetails), busquem la nau específica
  const ship = id ? list.find((s) => s.url.includes(`/${id}/`)) : null;

  useEffect(() => {
    // Si la llista està buida (per un F5), disparem la càrrega
    if (isListEmpty) {
      dispatch(fetchStarships());
    }
  }, [isListEmpty, dispatch]);

  // Retornem tot el que els components puguin necessitar
  return { 
    list, 
    ship, 
    status, 
    isLoading: status === 'loading',
    isError: status === 'failed'
  };
};