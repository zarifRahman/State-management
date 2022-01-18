import React from "react";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, updateQuantity }) {
  const navigate = useNavigate();
  // create an array of urls and pass that to fecthAll
  // every time the card renders this url is created
  // we solve this by storing previos values
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const {  name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <h1>hi</h1>
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          {/* <p>${price}</p> */}
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  return (
    <section id="cart">
      <h1>Cart</h1>
      {/* <ul>{cart.map(renderItem)}</ul> */}
      
      {
        // derived state cart.length
        // cart.length > 0 && 
        <button 
          class="btn btn-primary" 
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      }
    </section>
  );
}
