import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from './aws-exports';

//Pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Error from './pages/Error';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Product';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';

Amplify.configure(config);



function App() {
  return (
    <BrowserRouter >
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />            
          <Route path="/cart" element={<Cart />}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Error />} />       
        </Routes>
    </BrowserRouter>
  );
}

export default App;
