import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast";
import { getTicketById, updateTicket } from "../../services/ticketService";

const STATUS_OPTIONS = ["open", "in_progress", "closed"];

const EditTicket = () => {
  useEffect(() => {
    document.title = "Edit Ticket - Ticketa";
  }, []);
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", status: "open" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const id = Number(ticketId);
        if (!Number.isFinite(id)) {
          throw new Error("Invalid ticket id");
        }
        const ticket = await getTicketById(id);
        setForm({
          title: ticket.title || "",
          description: ticket.description || "",
          status: STATUS_OPTIONS.includes(ticket.status) ? ticket.status : "open",
        });
      } catch (err) {
        setLoadError(err.message || "Failed to load ticket");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [ticketId]);

  const validate = (data) => {
    const nextErrors = {};
    if (!data.title || !data.title.trim()) nextErrors.title = "Title is required";
    if (!STATUS_OPTIONS.includes(data.status)) nextErrors.status = "Status must be open, in_progress, or closed";
    if (data.description && data.description.length > 1000) nextErrors.description = "Description too long";
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    setErrors(validate(nextForm));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    try {
      const id = Number(ticketId);
      await updateTicket(id, form);
      navigate("/tickets", { state: { toast: { message: "Ticket updated", type: "success" } } });
    } catch (err) {
      setToast({ message: err.message || "Failed to update ticket", type: "error" });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-10 text-gray-500">Loading ticket...</div>
      </>
    );
  }

  if (loadError) {
    return (
      <>
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-10 text-gray-500">
          {loadError}
          <div className="mt-4">
            <Link to="/tickets" className="text-blue-600 underline">Back to tickets</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Edit Ticket</h1>
          <p className="text-gray-500">Update ticket information</p>
        </div>
        <div className="bg-white shadow-md border-[1px] rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className={`w-full border rounded-lg px-4 py-2 focus:outline-blue-600 ${errors.title ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="6"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-blue-600 ${errors.description ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            <div>
              <label className="block font-semibold mb-2">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2 focus:outline-blue-600 ${errors.status ? "border-red-400" : "border-gray-300"}`}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>
            <div className="flex gap-4">
              <button type="submit" className="text-[13px] md:text-[15px] flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Save Changes
              </button>
              <Link to="/tickets" className="text-[13px] md:text-[15px] flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition text-center font-semibold">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTicket;
