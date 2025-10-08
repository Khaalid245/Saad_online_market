import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // ✅ import CartContext

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext); // ✅ get cart items

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">MegaShop</Link>
      </h1>

      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/products" className="hover:text-blue-400">Products</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-blue-400 relative">
            Cart
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalQuantity}
              </span>
            )}
          </Link>
        </li>
        {user ? (
          <>
            <li>Hello, {user.username}</li>
            <li>
              <button onClick={logout} className="hover:text-blue-400">Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
