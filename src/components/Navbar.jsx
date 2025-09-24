import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-200 shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-2xl font-semibold text-violet-900 ">LeadsLoom</h1>

        
        <nav className="flex space-x-6 text-violet-900 font-medium items-center">
          <Link
            to="/"
            className="px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Display Leads
          </Link>

          <Link
            to="/categorization"
            className="px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
