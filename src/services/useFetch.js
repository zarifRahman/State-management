import {useState, useEffect} from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if(response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch(error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    }
    init();
  },[url]);

  // return data from custom hook so it can be used
  return { data, error, loading };
}