import React, { useContext } from "react";
import { LeadsContext } from "../App";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Users, CheckCircle, AlertCircle, Activity } from "lucide-react";

export default function Dashboard() {
  const { leads } = useContext(LeadsContext);

  
  const statusData = [
    { name: "Verified", value: leads.filter((l) => l.status === "verified").length, color: "#22c55e" },
    { name: "Pending", value: leads.filter((l) => l.status === "pending").length, color: "#9ca3af" },
    { name: "Error", value: leads.filter((l) => l.status === "error").length, color: "#ef4444" },
  ];

  
  const roleCounts = {};
  leads.forEach((l) => {
    roleCounts[l.role] = (roleCounts[l.role] || 0) + 1;
  });
  const roleData = Object.entries(roleCounts).map(([role, count]) => ({
    role,
    count,
  }));

  
  const scoreTrend = leads.map((l, i) => ({
    name: l.name.split(" ")[0],
    score: l.score,
  }));

  
  const totalLeads = leads.length;
  const verifiedLeads = statusData[0].value;
  const avgScore = Math.round(
    leads.reduce((acc, l) => acc + l.score, 0) / leads.length
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Lead Overview</h1>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center space-x-4">
            <Users className="text-indigo-500 w-8 h-8" />
            <div>
              <p className="text-gray-500 text-sm">Total Leads</p>
              <p className="text-2xl font-bold">{totalLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center space-x-4">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <div>
              <p className="text-gray-500 text-sm">Verified Leads</p>
              <p className="text-2xl font-bold">{verifiedLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center space-x-4">
            <Activity className="text-blue-500 w-8 h-8" />
            <div>
              <p className="text-gray-500 text-sm">Avg. Score</p>
              <p className="text-2xl font-bold">{avgScore}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center space-x-4">
            <AlertCircle className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-gray-500 text-sm">Errors</p>
              <p className="text-2xl font-bold">{statusData[2].value}</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Lead Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Leads by Role
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleData}>
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                {roleData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={`url(#grad${i})`}
                  />
                ))}
              </Bar>
              <defs>
                {roleData.map((_, i) => (
                  <linearGradient
                    key={i}
                    id={`grad${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.4} />
                  </linearGradient>
                ))}
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Lead Score Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scoreTrend}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4, fill: "#6366f1" }}
                activeDot={{ r: 6, fill: "#4f46e5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
