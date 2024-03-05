import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const productContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryQuery, setCategoryQuery] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await axios.get("https://madeforme-backend.onrender.com/api/v1/products/all-products", {
        params: {
          category: categoryQuery,
          name: searchQuery
        }
      });
      const fetchedProduct = product?.data?.data;
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, [categoryQuery, searchQuery]);

  return (
    <productContext.Provider value={{ product , searchQuery, categoryQuery, setCategoryQuery, setSearchQuery}}>
      {children}
    </productContext.Provider>
  );
};
