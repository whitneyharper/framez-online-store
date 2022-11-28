import React, { useEffect, useState } from "react";
import { API} from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderID, setOrderID] =  useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const checkout = async (orderDetails) => {
    const payload = {
      id: uuidv4(),
      ...orderDetails
    };

    try {
      const response = await API.post("paymentAPI", "/payment", {  body: payload });

      if (response) {
        const orderResponse = await API.post("ordersAPI", "/orders", {  body: response });
        setOrderID(orderResponse.payload.order_id)
      }
      return "success";
    } catch(err){
      console.log(err)
    }

  
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response  = await API.get('productsAPI', '/products', {})
      const items = response;      
      const featured = items.filter((item) => {
        return !!item.featured;
      });
      setProducts(items);
      setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
    }
  };

//add back checkout
  return (
    <ProductContext.Provider value={{ products, featured, loading, checkout, orderID }}> 
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };