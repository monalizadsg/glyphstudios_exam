import api from "../commons/api";

export async function getUsers() {
  return await api.get("/users");
}

export async function createUser(data) {
  return await api.post("/users", data);
}
