// src/services/ticketService.js
const STORAGE_KEY = "ticketapp_tickets";

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// default seed (only used if none exist)
const seedTickets = [
  {
    id: 1,
    title: "Sample ticket: Fix login bug",
    status: "open",
    description: "Users can't login with certain emails",
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Update docs",
    status: "closed",
    description: "Add usage examples",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function _readAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTickets));
    return seedTickets.slice();
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

function _writeAll(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export async function getAllTickets() {
  await wait(250);
  try {
    return _readAll();
  } catch (err) {
    return Promise.reject(new Error("Failed to load tickets. Please retry."));
  }
}

export async function getTicketById(id) {
  await wait(200);
  try {
    const all = _readAll();
    const ticket = all.find((t) => t.id === id);
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  } catch {
    return Promise.reject(new Error("Failed to load ticket. Please retry."));
  }
}

export async function createTicket(ticket) {
  await wait(200);
  try {
    const all = _readAll();
    const id = all.length ? Math.max(...all.map((t) => t.id)) + 1 : 1;
    const newTicket = {
      id,
      ...ticket,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    all.unshift(newTicket);
    _writeAll(all);
    return newTicket;
  } catch {
    return Promise.reject(new Error("Failed to create ticket. Please retry."));
  }
}

export async function updateTicket(id, updates) {
  await wait(200);
  try {
    const all = _readAll();
    const idx = all.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Ticket not found");
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    _writeAll(all);
    return all[idx];
  } catch {
    return Promise.reject(new Error("Failed to update ticket. Please retry."));
  }
}

export async function deleteTicket(id) {
  await wait(200);
  try {
    let all = _readAll();
    const exists = all.some((t) => t.id === id);
    if (!exists) throw new Error("Ticket not found");
    all = all.filter((t) => t.id !== id);
    _writeAll(all);
    return true;
  } catch {
    return Promise.reject(new Error("Failed to delete ticket. Please retry."));
  }
}
