import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast";
import { getAllTickets, deleteTicket } from "../../services/ticketService";
import { Edit } from "lucide-react";

const statusColor = {
  open: "text-green-800 bg-green-100",
  in_progress: "text-amber-800 bg-amber-100",
  closed: "text-gray-700 bg-gray-100",
};

const Tickets = () => {
  useEffect(() => {
    document.title = "Tickets - Ticketa";
  }, []);
  const [tickets, setTickets] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [toast, setToast] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await getAllTickets();
      setTickets(data);
    } catch (err) {
      const message = err.message || "Failed to load tickets. Please retry.";
      setLoadingError(message);
      setToast({ message, type: "error" });
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmed) return;
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
      setToast({ message: "Ticket deleted", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Failed to delete ticket", type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Ticket Management</h1>
            <p className="text-gray-500">View and manage tickets</p>
          </div>
          <Link to="/tickets/new" className="text-[13px] md:text-sm bg-blue-700 text-white px-4 py-2 rounded-md text-center">
            + Create Ticket
          </Link>
        </div>

        {loadingError && (
          <div className="mb-4 text-red-600">
            {loadingError} <button className="underline ml-3" onClick={load}>Retry</button>
          </div>
        )}

        <div className="grid gap-4">
          {tickets.map((t) => (
            <div key={t.id} className="bg-white border-[1px] rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-sm text-gray-500">{t.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColor[t.status] || ""}`}>{t.status}</span>
                      <span className="text-xs text-gray-400">Created: {new Date(t.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex items-center gap-2">
                <Link to={`/tickets/${t.id}/edit`} className="px-3 py-1 text-[12px] md:text-[14px] border rounded-md flex items-center justify-center gap-2">
                  <Edit size={12} /> Edit
                </Link>
                <button onClick={() => handleDelete(t.id)} className="px-3 py-1 text-[12px] md:text-[14px] bg-red-500 text-white rounded-md">Delete</button>
              </div>
            </div>
          ))}

          {tickets.length === 0 && <div className="text-gray-500">No tickets yet.</div>}
        </div>
      </div>
    </>
  );
};

export default Tickets;
