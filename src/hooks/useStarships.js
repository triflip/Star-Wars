import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../features/starships/starshipSlice';

export const useStarships = (id = null) => {
  const dispatch = useDispatch();
  
  const { list, status } = useSelector((state) => state.starships);

  const isListEmpty = list.length === 0;
  
  const ship = id ? list.find((s) => s.url.includes(`/${id}/`)) : null;

  useEffect(() => {
    if (isListEmpty) {
      dispatch(fetchStarships());
    }
  }, [isListEmpty, dispatch]);

  return { 
    list, 
    ship, 
    status, 
    isLoading: status === 'loading',
    isError: status === 'failed'
  };
};