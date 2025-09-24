import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/ShowLead";
import Categorization from "./pages/Dashboard";
import LeadDetail from "./pages/LeadDetail";
import Landing from "./pages/Landing";
import sampleLeads from "./data/leads";
import Navbar from "./components/Navbar"; 
import CollectLeads from "./pages/CollectLeads";
export const LeadsContext = createContext();

export default function App() {
  const [leads, setLeads] = useState(sampleLeads);

  return (
    <LeadsContext.Provider value={{ leads, setLeads }}>
      <div className="min-h-screen bg-gray-50">
        
        <Navbar />

        
        <main className="max-w-7xl mx-auto p-4 pt-24">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/collect-leads" element={<CollectLeads />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categorization" element={<Categorization />} />
            <Route path="/lead/:id" element={<LeadDetail />} />
          </Routes>
        </main>
      </div>
    </LeadsContext.Provider>
  );
}
