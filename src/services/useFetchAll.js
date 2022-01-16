import { useState, useEffect } from "react";

export default function useFetchAll(urls) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Promise all runs multiple promise at the same time.
    // So this will make multiple http request at the same time 
    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => {
        console.log("from fetchAll response---", json);
        setData(json)
      })
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return { data, loading, error };
}