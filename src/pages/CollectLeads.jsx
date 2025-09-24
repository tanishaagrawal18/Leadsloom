import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CollectLeads() {
  const [mode, setMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [csvFile, setCsvFile] = useState(null);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const leadFields = [
    { name: "avatar", label: "Avatar URL", type: "url" },
    { name: "name", label: "Name", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "company", label: "Company", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "source", label: "Source", type: "text" },
    { name: "status", label: "Status", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "linkedin", label: "LinkedIn URL", type: "url" },
    { name: "score", label: "Score", type: "number" },
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCsvChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newLead = {
      id: `lead-${Date.now()}`, 
      ...formData,
    };

    
    const existingLeads = JSON.parse(localStorage.getItem("leads")) || [];
    localStorage.setItem("leads", JSON.stringify([...existingLeads, newLead]));

    
    setPopup(true);

   
    setTimeout(() => {
      setPopup(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://cdn.britannica.com/59/94459-050-DBA42467/Skyline-Chicago.jpg')",
      }}
    >
     
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-8 mt-10 mb-10 w-full max-w-lg z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Collect Leads
        </h2>

        {!mode && (
          <div className="flex flex-col gap-4">
            <button
              className="bg-gray-800/60 text-white py-2 rounded-lg hover:bg-gray-800/80 transition"
              onClick={() => setMode("csv")}
            >
              Import CSV File
            </button>
            <button
              className="bg-gray-800/60 text-white py-2 rounded-lg hover:bg-gray-800/80 transition"
              onClick={() => setMode("manual")}
            >
              Manually Add Lead
            </button>
          </div>
        )}

        {mode === "csv" && (
          <form onSubmit={handleSave} className="flex flex-col gap-4 mt-4 text-white">
            <label className="font-medium">Upload CSV File:</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvChange}
              className="border border-white/30 bg-white/10 text-white p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-600/80 text-white py-2 rounded-lg hover:bg-green-700/90 transition mt-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="text-indigo-300 underline mt-2"
              onClick={() => setMode(null)}
            >
              Back
            </button>
          </form>
        )}

        {mode === "manual" && (
  <form onSubmit={handleSave} className="flex flex-col gap-4 mt-4 text-white">
    {leadFields.map((field) => (
      <div key={field.name}>
        <label className="block font-medium mb-1">{field.label}</label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleFormChange}
          className="border border-white/30 bg-white/10 text-white placeholder-gray-200 p-2 rounded w-full"
          
          required={["name", "role", "email", "phone", "score"].includes(
            field.name
          )}
        />
      </div>
    ))}
    <button
      type="submit"
      className="bg-green-600/80 text-white py-2 rounded-lg hover:bg-green-700/90 transition mt-2"
    >
      Save Changes
    </button>
    <button
      type="button"
      className="text-indigo-300 underline mt-2"
      onClick={() => setMode(null)}
    >
      Back
    </button>
  </form>
)}

      </div>

     
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-lg font-semibold text-green-600">
                Lead saved successfully!
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
