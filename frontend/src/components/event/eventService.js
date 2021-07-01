import api from "../commons/api";

export async function getEvents() {
  return await api.get("/events");
}

export async function createEvent(data) {
  return await api.post("/events", data);
}

export async function updateEvent(data, id) {
  return await api.put(`/events/${id}`, data);
}

export async function deleteEvent(id) {
  return await api.delete(`/events/${id}`);
}
