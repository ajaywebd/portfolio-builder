import React, { useEffect, useState } from "react";
import axios from "axios";

const VisitorDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const API_URL = "http://localhost:5000";

  // Fetch all visitors
  const fetchVisitors = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/visitors`);
      setVisitors(res.data);
    } catch (err) {
      console.error("Failed to fetch visitors:", err.message);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Update name by ID
  const handleUpdate = async (id) => {
    if (!newName.trim()) return;

    try {
      const res = await axios.put(`${API_URL}/api/visitors/${id}`, {
        name: newName,
      });

      // Update in local state
      setVisitors((prev) =>
        prev.map((v) => (v._id === id ? res.data.visitor : v))
      );
      setEditingId(null);
      setNewName("");
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  // Delete visitor by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/visitors/${id}`);
      setVisitors((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Visitor List</h2>

      {visitors.map((v) => (
        <div
          key={v._id}
          className="flex items-center justify-between bg-white shadow rounded p-3 mb-2">
          {editingId === v._id ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-2 py-1 rounded w-full mr-2"
              placeholder="New name"
            />
          ) : (
            <span>{v.name}</span>
          )}

          <div className="flex gap-2 ml-4">
            {editingId === v._id ? (
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleUpdate(v._id)}>
                Save
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  setEditingId(v._id);
                  setNewName(v.name);
                }}>
                Edit
              </button>
            )}
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(v._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitorDashboard;
