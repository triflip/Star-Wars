import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRelated = (urls) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hi ha URLs, buidem les dades i sortim
    if (!urls || urls.length === 0) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fem totes les crides en paral·lel per eficiència
        const responses = await Promise.all(
          urls.map((url) => axios.get(url))
        );
        // Extraiem només la part .data de cada resposta d'Axios
        setData(responses.map((res) => res.data));
        setError(null);
      } catch (err) {
        console.error("Error in useFetchRelated:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]); // S'activa quan l'array d'URLs canvia (p.ex. en canviar de nau)

  return { data, loading, error };
};