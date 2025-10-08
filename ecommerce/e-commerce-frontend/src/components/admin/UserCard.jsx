// src/components/admin/UserCard.jsx
import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <h2 className="font-bold mb-2">{user.username}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {/* Optional: Admin actions */}
      <div className="mt-2">
        <button className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
          Delete User
        </button>
      </div>
    </div>
  );
};

export default UserCard;
