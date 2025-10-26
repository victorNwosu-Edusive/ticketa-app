// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllTickets } from "../../services/ticketService";
import Toast from "../../components/Toast";
import { Link } from "react-router-dom";

const statusMap = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Resolved",
};

const statusColor = {
  open: "text-green-800 bg-green-100",
  in_progress: "text-amber-800 bg-amber-100",
  closed: "text-gray-700 bg-gray-100",
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    try {
      const data = await getAllTickets();
      setTickets(data);
    } catch (err) {
      setError(err.message || "Failed to load tickets. Please retry.");
      setToast({ message: err.message || "Failed to load tickets. Please retry.", type: "error" });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <>
      <Navbar />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {error && (
          <div className="mb-4 text-red-600">
            {error}
            <button className="ml-4 underline" onClick={load}>Retry</button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3 mb-8 *:cursor-pointer *:bg-slate-50">
          <div className="bg-white border-[1px] rounded-2xl shadow p-10">
            <p className="text-sm mb-6 text-gray-500">Total tickets</p>
            <p className="text-6xl font-semibold">{total}</p>
          </div>

          <div className="bg-white border-[1px] rounded-2xl shadow p-10">
            <p className="text-sm mb-6 text-gray-500">Open tickets</p>
            <p className="text-6xl font-semibold">{open}</p>
          </div>

          <div className="bg-white border-[1px] rounded-2xl shadow p-10">
            <p className="text-sm mb-6 text-gray-500">Resolved tickets</p>
            <p className="text-6xl font-semibold">{resolved}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ticket Management</h2>
          <Link to="/tickets" className="text-blue-600 hover:underline text-[13px]">Go to Tickets →</Link>
        </div>

        <div className="mt-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-gray-600">Quick view of the latest tickets:</p>
            <ul className="mt-4 space-y-3">
              {tickets.slice(0, 3).map((t) => (
                <li key={t.id} className="p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm">{t.title}</p>
                    <p className="text-[13px] text-gray-500">{t.description?.slice(0, 80)}</p>
                  </div>
                  <div className={`p-2 rounded-full text-[10px] ${statusColor[t.status] || ""}`}>{statusMap[t.status] || t.status}</div>
                </li>
              ))}
              {tickets.length === 0 && <li className="text-gray-500">No tickets yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
