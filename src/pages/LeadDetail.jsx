import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LeadsContext } from "../App";
import { motion } from "framer-motion";

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, setLeads } = useContext(LeadsContext);
  const lead = leads.find((l) => l.id === id);
  const [form, setForm] = useState({});
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (lead) setForm(lead);
  }, [lead]);

  if (!lead) return <div>Lead not found</div>;

  const save = () => {
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, ...form } : l))
    );
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601923112035-3e4819c82317?q=80&w=1170&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white"
      >
        <button
          className="text-sm mb-4 hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="md:w-1/3 flex flex-col items-center">
            <img
              src={lead.avatar}
              alt={lead.name}
              className="w-40 h-40 rounded-full object-cover shadow-lg border-2 border-white"
            />

           
            {showContactForm && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-4 w-full bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow text-white"
              >
                <h3 className="font-semibold mb-2">Contact {lead.name}</h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 mb-2 border rounded bg-white/20 text-white placeholder-gray-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 mb-2 border rounded bg-white/20 text-white placeholder-gray-300"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full p-2 mb-3 border rounded bg-white/20 text-white placeholder-gray-300"
                />
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Send
                </button>
              </motion.div>
            )}
          </div>

          
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">{lead.name}</h2>
            <p>
              {lead.role} · {lead.company}
            </p>
            <p className="text-sm">
              {lead.description ||
                "This agent specializes in property matching and customer engagement."}
            </p>

            
            <div className="space-y-2 mt-4">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {lead.email || "not available"}
              </p>
              <p>
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a
                  href={lead.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-300"
                >
                  {lead.linkedin ? "View Profile" : "not available"}
                </a>
              </p>
              <p>
                <span className="font-semibold">Score:</span>{" "}
                {lead.score || "N/A"}
              </p>
            </div>

            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-700 rounded-lg text-center shadow-sm">
                <div className="text-2xl font-semibold">12</div>
                <div className="text-sm">Properties Listed</div>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg text-center shadow-sm">
                <div className="text-2xl font-semibold">8</div>
                <div className="text-sm">Deals Closed</div>
              </div>
            </div>

            
            <div className="mt-6 flex gap-4">
              <button
                onClick={save}
                className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
