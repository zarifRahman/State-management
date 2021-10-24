import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from 'react-router-dom';
import Details from "./Details";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? [];// this will run once on first render
    } catch {
      console.error("The cart could not be parsed into JSON");
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return a new array with matching item replaced
        console.log(itemInCart, '--itemInCart')
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...items, { id: id, sku: sku, quantity: 1 }]
      }
    })
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0 ? items.filter(item => item.sku !== sku)
        : items.map(item => (item.sku === sku ? { ...item, quantity: quantity } : item));
    })
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<h1>Welcome to Zarif Ui</h1>} />
          <Route path="/:category" element={<Products />} />
          <Route path="/:category/:id" element={<Details addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
          <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
