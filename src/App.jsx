import React,  { useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from 'react-router-dom';
import Details from "./Details";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

export default function App() {
  const [cart, setCart] = useReducer(() => {
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

  }

  function updateQuantity(sku, quantity) {

  }

  function emptyCart() {

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
