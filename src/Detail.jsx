import React from 'react'
import { useParams } from "react-router-dom";
import PageNotFound from './PageNotFound';
import useFetch from './services/useFetch';
import Spinner from './Spinner';


export default function Detail() {
  const {id} = useParams();
  const { data:product,loading,error } = useFetch("products/" + id);

  // state tricks return early
  if(loading) return <Spinner />
  // if there is no product with an id show 404 page
  if(!product) return <PageNotFound />
  if(error) throw error;

  return (
    <div id="detail">
      <h1>{product?.name}</h1>
      <p>${product?.price}</p>
      <img src={`/images/${product?.image}`} alt={product?.name} />
    </div>
  )
}
