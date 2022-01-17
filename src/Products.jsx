import React, {useState} from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import { useParams } from 'react-router-dom';
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";

export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();
  // didn't understand how category get shoe value
  const { data:products,loading,error } = useFetch("products?category=" + category);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }
  const filteredProduct = size 
    ? products.filter((product) => product.skus.find(skus => skus.size === parseInt(size))) 
    : products;

  // throw error before rendering jsx
  // return early
  if(error) throw error;
  if(loading) return <Spinner />
  if(products.length === 0) return <PageNotFound />

  return (
    <>
      {/* filter section */}
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select 
          id="size" 
          value={size} 
          onChange={e => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>
      {/* if size is true then render " " is false */}
      {size && <h2>Found {filteredProduct.length} items</h2>}

      {/* product section */}
      <h1>All Products</h1>
      <section id="products">
        {/* map automatically passes each product to the renderProduct function */}
        {/* it is called "point free style" */}
        {filteredProduct.map(renderProduct)}
      </section>
    </>
  );
}
