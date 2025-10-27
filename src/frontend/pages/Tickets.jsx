// src/pages/Tickets.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast";
import {
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../../services/ticketService";

const STATUS_OPTIONS = ["open", "in_progress", "closed"];

const statusColor = {
  open: "text-green-800 bg-green-100",
  in_progress: "text-amber-800 bg-amber-100",
  closed: "text-gray-700 bg-gray-100",
};

const emptyForm = { title: "", status: "open", description: "", priority: "" };

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [toast, setToast] = useState(null);

  // Create form
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  // Edit state {id, form}
  const [editing, setEditing] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  const load = async () => {
    try {
      const data = await getAllTickets();
      setTickets(data);
    } catch (err) {
      setLoadingError(err.message || "Failed to load tickets. Please retry.");
      setToast({ message: err.message || "Failed to load tickets. Please retry.", type: "error" });
    }
  };

  useEffect(() => {
    load();
  }, []);

  // --- Validation helpers ---
  const validateTicket = (t) => {
    const err = {};
    if (!t.title || !t.title.trim()) err.title = "Title is required";
    if (!t.status || !STATUS_OPTIONS.includes(t.status)) err.status = "Status must be open, in_progress, or closed";
    if (t.description && t.description.length > 1000) err.description = "Description too long (max 1000 chars)";
    return err;
  };

  // --- Create ---
  const onCreateChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);
    setFormErrors(validateTicket(newForm));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const errs = validateTicket(form);
    setFormErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      const created = await createTicket(form);
      setTickets((prev) => [created, ...prev]);
      setForm(emptyForm);
      setToast({ message: "Ticket created successfully", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Failed to create ticket", type: "error" });
    }
  };

  // --- Edit ---
  const startEdit = (ticket) => {
    setEditing({ id: ticket.id, form: { title: ticket.title, status: ticket.status, description: ticket.description || "", priority: ticket.priority || "" } });
    setEditErrors({});
  };

  const onEditChange = (e) => {
    const { name, value } = e.target;
    setEditing((prev) => ({ ...prev, form: { ...prev.form, [name]: value } }));
    setEditErrors(validateTicket({ ...editing.form, [name]: value }));
  };

  const handleSaveEdit = async () => {
    const errs = validateTicket(editing.form);
    setEditErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      const updated = await updateTicket(editing.id, editing.form);
      setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditing(null);
      setToast({ message: "Ticket updated", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Failed to update ticket", type: "error" });
    }
  };

  // --- Delete ---
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
        <h1 className="text-2xl font-bold mb-6">Ticket Management</h1>

        {loadingError && (
          <div className="mb-4 text-red-600">
            {loadingError} <button className="underline ml-3" onClick={load}>Retry</button>
          </div>
        )}

        {/* Create Form */}
        <div className="bg-slate-50 rounded-2xl shadow p-6 mb-8">
          <h2 className="font-semibold mb-4">Create a new ticket</h2>
          <form onSubmit={handleCreate} className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={onCreateChange}
                className={`w-full mt-1 border rounded-md px-3 py-2 focus:outline-blue-600 ${formErrors.title ? "border-red-400" : "border-gray-300"}`}
                placeholder="Short descriptive title"
              />
              {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Status *</label>
              <select
                name="status"
                value={form.status}
                onChange={onCreateChange}
                className={`w-full mt-1 border rounded-md px-3 py-2 ${formErrors.status ? "border-red-400" : "border-gray-300"}`}
              >
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {formErrors.status && <p className="text-red-500 text-sm mt-1">{formErrors.status}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Priority</label>
              <input name="priority" value={form.priority} onChange={onCreateChange} className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2" placeholder="low / medium / high" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea name="description" value={form.description} onChange={onCreateChange} className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2" rows="4" />
              {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-700 text-[12px] md:text-sm text-white px-4 py-2 rounded-md">Create Ticket</button>
              <button type="button" onClick={() => { setForm(emptyForm); setFormErrors({}); }} className="text-[12px] md:text-sm px-4 py-2 rounded-md border-[1px] border-black">Reset</button>
            </div>
          </form>
        </div>

        {/* Tickets List */}
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
                      <span className="text-xs text-gray-400">Created: {new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex items-center gap-2">
                <button onClick={() => startEdit(t)} className="px-3 py-1 text-[12px] md:text-[14px] border rounded-md">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="px-3 py-1 text-[12px] md:text-[14px] bg-red-500 text-white rounded-md">Delete</button>
              </div>

              {/* Edit panel (inline) */}
              {editing && editing.id === t.id && (
                <div className="w-full md:w-[60%] ml-0 md:ml-4 mt-4">
                  <div className="bg-slate-50 p-4 rounded-md border">
                    <div className="flex flex-col gap-2">
                      <input name="title" value={editing.form.title} onChange={onEditChange} className={`w-full border rounded px-2 py-1 ${editErrors.title ? "border-red-400" : "border-gray-300"}`} />
                      {editErrors.title && <p className="text-red-500 text-sm">{editErrors.title}</p>}

                      <select name="status" value={editing.form.status} onChange={onEditChange} className={`w-full border rounded px-2 py-1 ${editErrors.status ? "border-red-400" : "border-gray-300"}`}>
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {editErrors.status && <p className="text-red-500 text-sm">{editErrors.status}</p>}

                      <textarea name="description" value={editing.form.description} onChange={onEditChange} className="w-full border rounded px-2 py-1" rows="3" />

                      <div className="flex gap-2 justify-end mt-2">
                        <button onClick={() => setEditing(null)} className="px-3 py-1 text-[12px] md:text-[14px] border rounded-md">Cancel</button>
                        <button onClick={handleSaveEdit} className="px-3 py-1 text-[12px] md:text-[14px] bg-blue-700 text-white rounded-md">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {tickets.length === 0 && <div className="text-gray-500">No tickets yet — create one above.</div>}
        </div>
      </div>
    </>
  );
};

export default Tickets;
