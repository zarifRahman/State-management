import {useState, useEffect, useRef} from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url){
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // inside useEffect isMounted is mounted
    isMounted.current = true;

    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if(response.ok) {
          const json = await response.json();
          if(isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch(error) {
        if(isMounted.current) setError(error)
      } finally {
        if(isMounted.current) setLoading(false);
      }
    }
    init();

    // any function that we return from the useEffect is run when the component is unmounted
    return () => {
      isMounted.current = false;
    }

  },[url]);

  // return data from custom hook so it can be used
  return { data, error, loading };
}