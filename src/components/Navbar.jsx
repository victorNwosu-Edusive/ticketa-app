// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoblue from "../assets/images/ticketa-blue.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/");
  };

  return (
    <nav className="w-full border-b bg-white relative z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logoblue} className="h-7 w-auto" alt="Ticketa logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard" className="text-[12px] md:text-sm hover:underline">
            Dashboard
          </Link>
          <Link to="/tickets" className="text-[12px] md:text-sm hover:underline">
            Tickets
          </Link>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 text-[12px] md:text-sm text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Logout ➜]
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden focus:outline-none relative w-6 h-6 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block absolute w-6 h-0.5 bg-black transition-transform duration-300 ${
              isOpen ? "rotate-45 " : "-translate-y-1.5"
            }`}
          ></span>
          <span
            className={`block absolute w-6 h-0.5 bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block absolute w-6 h-0.5 bg-black transition-transform duration-300 ${
              isOpen ? "-rotate-45 " : "translate-y-1.5"
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md absolute top-full left-0 w-full animate-slideDown">
          <div className="flex flex-col items-center py-4 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full p-3 text-center hover:bg-slate-50 text-sm "
            >
              Dashboard
            </Link>
            <Link
              to="/tickets"
              onClick={() => setIsOpen(false)}
              className="w-full p-3 text-center hover:bg-slate-50 text-sm "
            >
              Tickets
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-500 text-sm text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout ➜]
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
