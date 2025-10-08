import React, { useState, useEffect } from "react";
import api from "../../services/api";
import ProductCard from "../../components/admin/ProductCard";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: null,
    categoryId: "",
  });
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch categories", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      let categoryId = formData.categoryId;

      if (newCategory.trim()) {
        const catRes = await api.post("/categories/", { name: newCategory });
        categoryId = catRes.data.id;
        setCategories([...categories, catRes.data]);
        setNewCategory("");
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);
      data.append("category", categoryId);

      const res = await api.post("/products/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([...products, res.data]);
      setFormData({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: null,
        categoryId: "",
      });

      alert("✅ Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      <form
        onSubmit={handleAddProduct}
        className="bg-white p-6 rounded shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            className="border rounded p-2 w-full"
            required
          />
          <textarea
            placeholder="Product Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="border rounded p-2 w-full"
          />
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            className="border rounded p-2 w-full"
          >
            <option value="">Select Existing Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or Create New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
