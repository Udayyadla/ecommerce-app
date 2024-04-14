import { useState,useEffect } from "react";
import UploadProduct from "./components/UploadProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import axios from "axios";
import ProductsList from "./components/ProductsList";

function App() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllCartItems"
      );
      setCartCount(response.data.cartItems.length);
       // Ensure cartItems is an array
       console.log(response.data.cartItems.length)
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Error fetching cart items");
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);

  };  
  const updateCartCount = (count) => {
    setCartCount(count);
  };
  return (
    <BrowserRouter>
      <Header onSearch={handleSearch} cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductsList
              searchQuery={searchQuery}
              updateCartCount={updateCartCount}
            />
          }
        />
        <Route path="/upload" element={<UploadProduct />} />
        <Route path="/cart" element={<CartPage searchQuery={searchQuery} updateCartCount={updateCartCount} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
