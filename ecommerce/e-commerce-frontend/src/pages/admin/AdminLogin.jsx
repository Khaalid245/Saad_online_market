// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: login via correct API URL
      const res = await api.post("/accounts/login/", formData); // ensure backend URL matches

      if (!res.data.access) {
        setError("Login failed: Invalid credentials");
        return;
      }

      const accessToken = res.data.access;
      localStorage.setItem("token", accessToken);

      // Step 2: fetch profile to check role
      const profileRes = await api.get("/accounts/profile/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (profileRes.data.role === "admin") {
        navigate("/admin"); // redirect to AdminDashboard
      } else {
        setError("Access denied: Admins only");
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Detailed error handling
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else if (err.response && err.response.status === 403) {
        setError("Access forbidden: Admins only");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Navbar />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
