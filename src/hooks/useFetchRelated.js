//Aquest hook és purament de "consulta". Rep un array d'URLs i ens torna les dades ja cuinades.
// que ens servirà per als pilots i les pel·lícules:


import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRelated = (urls) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hi ha URLs (per exemple, la nau encara no s'ha carregat), sortim
    if (!urls || urls.length === 0) {
        setData([]);
        return;
    }
        

    const fetchData = async () => {
      setLoading(true);
      try {
        // Promise.all executa totes les crides en paral·lel (més ràpid!)
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        // Extraiem només la part .data de cada resposta d'Axios
        setData(responses.map(res => res.data));
      } catch (error) {
        console.error("Error cloading related data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]);// S'activa quan l'array d'URLs canvia (p.ex. en canviar de nau)
  return { data, loading, error };
};