import React, { useEffect, useState } from "react";
import api from "../services/api"; // your axios instance
import Navbar from "../components/Navbar";

const TestBackend = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    api
      .get("/accounts/test/") // ✅ match backend URL
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage("Error: " + err.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Backend Test</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestBackend;
