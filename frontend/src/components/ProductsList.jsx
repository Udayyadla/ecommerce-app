import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsList = ({ searchQuery, updateCartCount }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(searchQuery);

  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      fetchProductsBySearch(searchQuery);
    } else {
      fetchAllProducts();
    }
  }, [searchQuery]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllProducts"
      );
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all products:", error);
      setLoading(false);
    }
  };
  const fetchProductsBySearch = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/searchProduct?q=${query}`
      );
      setProducts(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products by search:", error);
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      // Send a POST request to add the product to the cart
      const response = await axios.post("http://localhost:8080/api/addToCart", {
        productId: product._id,
      });
      const getResponse = await axios.get(
        "http://localhost:8080/api/getAllCartItems"
      );

      // If the API call is successful, update the local cart state with the new product
      setCart([...cart, product]);
      updateCartCount(getResponse.data.cartItems.length);

      console.log("Product added to cart:", response.data);
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  {
    {
      if (products.length === 0) {
        return (
          <div className="bg-gray-100">
            <div className="container mx-auto py-12">
              <div className="flex items-center justify-center h-full">
                <div className="text-3xl font-bold text-gray-800 mt-20">
                  <h2>No products available!</h2>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="bg-gray-100">
        <div className="container mx-auto py-12">
          <h2 className="text-3xl font-bold text-gray-800 mt-6">Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded shadow-md overflow-hidden"
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600 mb-2">{product.brandName}</p>
                  <p className="text-gray-700 font-bold">${product.price}</p>
                </div>
                <div className="p-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductsList;
