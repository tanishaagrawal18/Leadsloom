import React, { useContext, useState } from "react";
import { LeadsContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

export default function ShowLead() {
  const { leads } = useContext(LeadsContext);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ role: "" });
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredLeads = leads
    .filter((lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) =>
      filters.role ? lead.role.toLowerCase() === filters.role.toLowerCase() : true
    )
    .sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : sort === "desc"
        ? b.name.localeCompare(a.name)
        : 0
    );

  
  const statusColors = {
    verified: "bg-green-100 text-green-700 border border-green-300",
    pending: "bg-gray-100 text-gray-700 border border-gray-300",
    error: "bg-red-100 text-red-700 border border-red-300",
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
     
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 bg-white shadow-md rounded-2xl">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 w-64 text-sm bg-slate-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-3 flex-wrap">
          
          <select
            onChange={(e) => handleFilterChange("role", e.target.value)}
            className="px-3 py-2 border rounded-xl text-sm bg-slate-50 hover:bg-slate-100"
          >
            <option value="">Filter by Role</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Broker">Broker</option>
            <option value="Investor">Investor</option>
          </select>

         
          <select
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded-xl text-sm bg-slate-50 hover:bg-slate-100"
          >
            <option value="">Sort by Name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <button
            onClick={() => navigate("/collect-leads")}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md text-sm font-medium"
          >
            + Add Lead
          </button>
        </div>
      </div>

      
      <div className="mt-8 overflow-x-auto shadow-lg rounded-2xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-indigo-100 to-slate-100 text-slate-700">
            <tr>
              <th className="p-4 text-sm font-semibold">Avatar</th>
              <th className="p-4 text-sm font-semibold">Name</th>
              <th className="p-4 text-sm font-semibold">Role</th>
              <th className="p-4 text-sm font-semibold">Company</th>
              <th className="p-4 text-sm font-semibold">Status</th>
              <th className="p-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="transition border-b hover:bg-indigo-50/50"
              >
                <td className="p-4">
                  <img
                    src={lead.avatar}
                    alt={lead.name}
                    className="w-11 h-11 rounded-full object-cover shadow-md border border-slate-200"
                  />
                </td>
                <td className="p-4 font-medium text-slate-800">{lead.name}</td>
                <td className="p-4 text-slate-600">{lead.role}</td>
                <td className="p-4 text-slate-600">{lead.company}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[lead.status]}`}
                  >
                    {lead.status.charAt(0).toUpperCase() +
                      lead.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    to={`/lead/${lead.id}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-sm"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
