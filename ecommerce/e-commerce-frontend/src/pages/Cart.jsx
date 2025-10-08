// src/pages/cart.jsx
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    getTotalPrice,
  } = useContext(CartContext);

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <p>Your cart is empty.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
            >
              {/* Product Image */}
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="h-24 w-24 object-cover rounded"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-gray-700 font-semibold">${item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  disabled={item.quantity === 1} // prevent going below 1
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-green-400 px-3 py-1 rounded hover:bg-green-500"
                  disabled={item.quantity >= item.stock} // prevent exceeding stock
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total & Clear Cart */}
        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</h2>
          <button
            onClick={clearCart}
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
