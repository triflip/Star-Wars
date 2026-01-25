import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRelated = (urls) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
       const responses = await Promise.all(
          urls.map((url) => axios.get(url))
        );
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
  }, [urls]);

  return { data, loading, error };
};