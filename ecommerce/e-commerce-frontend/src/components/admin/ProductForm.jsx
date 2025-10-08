// src/components/admin/ProductForm.jsx
import React, { useState } from "react";
import api from "../../services/api";

const ProductForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/products/", { name, description, price, stock });
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-bold text-lg mb-2">Add New Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
