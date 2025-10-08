// src/components/admin/OrderCard.jsx
import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <h2 className="font-bold mb-2">Order #{order.id}</h2>
      <p><strong>User:</strong> {order.user}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <div className="mt-2">
        <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 mr-2">
          Mark as Pending
        </button>
        <button className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600">
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
