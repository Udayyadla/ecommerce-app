import { useState, useEffect } from "react";
import axios from "axios";
const CartPage = ({ searchQuery, updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      fetchProductsBySearch(searchQuery);
    } else {
      fetchCartItems();
    }
  }, [searchQuery]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllCartItems"
      );
      setCartItems(response.data.cartItems || []); // Ensure cartItems is an array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Error fetching cart items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProductDetails(cartItems);
    calculateTotalAmount(cartItems);
  }, [cartItems]);
  const fetchProductsBySearch = (query) => {
    if (!query) {
      setProducts(products);

      // console.log(products)
      setLoading(false);
    } else {
      // Filter cart items based on search query
      const filteredItems = products.filter((item) =>
        item.productName.toLowerCase().includes(query.toLowerCase())
      );

      setProducts(filteredItems);
      // console.log(filteredItems)
      setLoading(false);
    }
  };
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/${productId}`
      );
      return response.data.product;
    } catch (error) {
      console.error(
        `Error fetching product details for product ID ${productId}:`,
        error
      );
      return null;
    }
  };

  const fetchAllProductDetails = async (cartItems) => {
    setLoading(true);
    const productPromises = cartItems.map((item) =>
      fetchProductDetails(item.productId)
    );
    const products = await Promise.all(productPromises);
    setProducts(products);
    setLoading(false);
  };

  const calculateTotalAmount = (cartItems) => {
    let total = cartItems.reduce((acc, item) => {
      return acc + (item.quantity || 1) * (item.price || 0);
    }, 0);
    setTotalAmount(total);
  };

  const removeItem = async (cartItem) => {
    // Remove the item from the local state of the cart
    const updatedCartItems = cartItems.filter((item) => item._id !== cartItem);
    setCartItems(updatedCartItems);
    updateCartCount(updatedCartItems.length);

    setLoading(true);
    try {
      // Make the API call to delete the item from the database
      await axios.delete(
        `http://localhost:8080/api/removeCartItem/${cartItem}`
      );
      setLoading(false);
    } catch (error) {
      console.error("Error removing from cart:", error);
      setError("Error removing item from cart");
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>
      <div className="flex justify-between items-center my-4">
        <p className="text-lg font-semibold text-gray-800">Total Amount:</p>
        <p className="text-lg font-semibold text-gray-800">${totalAmount}</p>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const item = cartItems[index];
            return (
              <div
                key={index}
                className="bg-white rounded shadow-md overflow-hidden"
              >
                {product ? (
                  <>
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
                      <p className="text-gray-700 font-bold">
                        ${product.price}
                      </p>
                      <p className="text-gray-600">Quantity:1</p>
                    </div>
                    <div className="p-4 flex justify-end">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                        onClick={() => removeItem(item._id)}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-red-500">Product details not found</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CartPage;
