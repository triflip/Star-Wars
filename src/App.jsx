import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from './features/starships/starshipsSlice';

function App() {
  const dispatch = useDispatch();


// Mirem què hi ha a la "pissarra" de starships
  const { list, status } = useSelector((state) => state.starships);


  useEffect(() =>{ 
    if (status ==='idle') {
      dispatch(fetchStarships(1)); //Demanem la pàgina 1
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Star Wars Ships</h1>
    </div>
  );
}