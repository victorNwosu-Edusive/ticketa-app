// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoblue from "../assets/images/ticketa-blue.png";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/");
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/"><img src={logoblue} className="h-7 w-auto" alt="" /></Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className=" text-[12px] md:text-sm hover:underline">Dashboard</Link>
          <Link to="/tickets" className="text-[12px] md:text-sm hover:underline">Tickets</Link>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 text-[12px] md:text-sm text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Logout ➜]
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
