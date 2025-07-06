import React, { useEffect, useState } from "react";
import axios from "axios";

const FirstTimeVisitorModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [visitorName, setVisitorName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("visitorName");
    if (!savedName) {
      setShowModal(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!visitorName.trim()) {
      alert("Please enter your name!");
      return;
    }

    localStorage.setItem("visitorName", visitorName);
    setShowModal(false);

    try {
      await axios.post("http://localhost:5000/api/visitors", {
        name: visitorName,
      });
    } catch (err) {
      console.error("Visitor logging failed:", err.message);
      alert("Could not save visitor to server. Saved locally.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Welcome! 👋</h2>
        <input
          type="text"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
          placeholder="Enter your name"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
          Continue
        </button>
      </div>
    </div>
  );
};

export default FirstTimeVisitorModal;
