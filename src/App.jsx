import React, {} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {useState,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";


export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(id, sku){
    setCart((items) => {
      // items refers to the cart[]
      console.log(items,"itemss")
      // chaeck if cart[] has sku id in it
      const itemInCart = items.find((i) => i.sku === sku);
      if(itemInCart) {
        // Return a new array with matching items.
        // item already in the cart
        return items.map((item) => item.sku === sku ? {...item, quantity: item.quantity + 1} : item);
      } else {
        // if it is not in the item in the cart
        // Return new array with the new item
        // add new cart array of object
        return [...items, { id: id, sku: sku, quantity: 1 }]
      }
    })
  }
  function updateQuantity(sku, quantity) {
    // update the cart[]
    setCart((items) => {
      return items.map((item) => item.sku === sku ? {...item, quantity: quantity} : item)
    })
  }
  function emtyCart(){
    setCart([]);
  }
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products/>} /> 
            {/* Product route */}
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout emtyCart={emtyCart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
