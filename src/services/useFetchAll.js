import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetchAll(urls) {
  const prevUrls = useRef([])
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only runs when the array of urls passed changes
    if(areEqual(prevUrls.current, urls)){
      setLoading(false);
      return;
    }
    const promises = urls.map((url) =>
      fetch(baseUrl + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return { data, loading, error };
}

// Pure Func that compare two arrays
// see each of the properties have the same value for

function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value = array2[index]) // match with the property of array2
  )
}