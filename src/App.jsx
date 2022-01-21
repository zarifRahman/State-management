import React, {useState,useEffect, useReducer} from 'react';
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from 'react-router-dom';
// import Detail from "./DetailRefs";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

// declare provider functions
import { CartContext } from './cartContext'


export default function App() {
  // dispatch is a function
  const [cartState, dispatch] = useReducer(cartReducer);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products/>} /> 
            {/* Product route */}
            <Route path="/:category/:id" element={<Detail dispatch={dispatch} />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout dispatch={dispatch} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}
