import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProductProvider } from './context/products';
import { CartProvider } from './context/cart';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProductProvider>
    <CartProvider>
   
        <App />
     
    </CartProvider>     
  </ProductProvider>
);

