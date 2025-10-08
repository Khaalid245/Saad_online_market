import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg transition-shadow">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
        className="h-40 object-cover mb-4 rounded"
      />
      <h2 className="font-bold text-lg mb-1">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-gray-700 mb-2 font-semibold">${product.price}</p>
      <p className="text-gray-500 text-sm mb-4">Stock: {product.stock}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-auto"
        disabled={product.stock === 0} // disables button if out of stock
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
