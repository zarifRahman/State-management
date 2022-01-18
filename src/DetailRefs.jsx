import React,{ useState, useRef } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from './PageNotFound';
import useFetch from './services/useFetch';
import Spinner from './Spinner';


export default function DetailRefs({ addToCart }) {
  const {id} = useParams();
  const skuRef = useRef();
  const navigate = useNavigate();

  // const [sku, setSku] = useState("");

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
        <select
          ref={skuRef} // 
          id="size" 
          // value={sku} 
          // onChange={e => setSku(e.target.value)}
        >
          <option value="">What the size?</option>
          {product?.skus.map(sku => (
            <option key={sku.sku} value={sku.size}>
              {sku.size}
            </option>
          ))}
        </select>
      <p>
        <button 
          // disabled={!sku} 
          class="btn btn-primary" 
          onClick={()=> {
            const sku = skuRef.current.value;
            if(!sku) alert("Please select");
            // addToCart();
            navigate('/cart')
          }}
        >Add Cart</button>
      </p>
      <img src={`/images/${product?.image}`} alt={product?.name} />
    </div>
  )
}
