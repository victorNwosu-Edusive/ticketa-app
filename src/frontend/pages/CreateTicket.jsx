import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast";
import { createTicket } from "../../services/ticketService";

const STATUS_OPTIONS = ["open", "in_progress", "closed"];

const CreateTicket = () => {
  useEffect(() => {
    document.title = "Create Ticket - Ticketa";
  }, []);
  const [form, setForm] = useState({ title: "", description: "", status: "open" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

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
      await createTicket(form);
      navigate("/tickets", { state: { toast: { message: "Ticket created successfully", type: "success" } } });
    } catch (err) {
      setToast({ message: err.message || "Failed to create ticket", type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create New Ticket</h1>
          <p className="text-gray-500">Add a new ticket</p>
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
                placeholder="e.g., Payment Processing Issue"
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
                placeholder="Describe the issue in detail..."
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
                Create Ticket
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

export default CreateTicket;
