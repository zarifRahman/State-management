import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";

const products = [
  {
    "id": 1,
    "category": "shoes",
    "image": "shoe1.jpg",
    "name": "Hiker",
    "price": 94.95,
    "skus": [
      { "sku": "17", "size": 7 },
      { "sku": "18", "size": 8 }
    ],
    "description": "This rugged boot will get you up the mountain safely."
  },
  {
    "id": 2,
    "category": "shoes",
    "image": "shoe2.jpg",
    "name": "Climber",
    "price": 78.99,
    "skus": [
      { "sku": "28", "size": 8 },
      { "sku": "29", "size": 9 }
    ],
    "description": "Sure-footed traction in slippery conditions."
  },
  {
    "id": 3,
    "category": "shoes",
    "image": "shoe3.jpg",
    "name": "Explorer",
    "price": 145.95,
    "skus": [
      { "sku": "37", "size": 7 },
      { "sku": "38", "size": 8 },
      { "sku": "39", "size": 9 }
    ],
    "description": "Look stylish while stomping in the mud."
  }
]

export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // implement async await
  useEffect(() => {
    async function init() {
      try {
        const response = await getProducts("shoes")
        .then((response) => setProducts(response))
      }catch(error) {
        setError(error)
      }finally {
        setLoading(false);
      }
    }
    init();
  },[]);

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
