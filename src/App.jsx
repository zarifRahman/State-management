import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function App() {
  const [size, setSize] = useState("");
  const { data:products,loading,error } = useFetch("products?category=shoes");

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }
  const filteredProduct = size 
    ? products.filter((product) => product.skus.find(skus => skus.size === parseInt(size))) 
    : products;

  // throw error before rendering jsx
  if(error) throw error;

  if(loading) return <Spinner />

  return (
    <>
      <div className="content">
        <Header />
        <main>
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
        </main>
      </div>
      <Footer />
    </>
  );
}
