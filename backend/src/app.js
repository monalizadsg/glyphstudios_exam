const express = require("express");
const app = express();
const cors = require("cors");
const { data } = require("./data");

const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.get("/api/users", (req, res) => {
  res.json(data.users);
});

app.post("/api/users", (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = {
    id: data.users.length + 1,
    firstName,
    lastName,
    email,
  };
  data.users = [...data.users, newUser];

  return res.status(201).json(newUser);
});

app.get("/api/events", (req, res) => {
  return res.json(data.events);
});

app.get("/api/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const foundEvent = data.events.find((event) => event.id === eventId);

  if (foundEvent === undefined) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(foundEvent);
});

app.post("/api/events", (req, res) => {
  const { title, start, end, users } = req.body;

  if (new Date(start).getTime() < new Date().getTime()) {
    return res
      .status(400)
      .json({ error: "Your event schedule should not be in the past" });
  }

  if (!Array.isArray(users)) {
    return res.status(400).json({ error: "users input is required" });
  }

  if (users.length < 1) {
    return res
      .status(400)
      .json({ error: "Minimum of 1 user is required for an event" });
  }

  if (users.length > 10) {
    return res
      .status(400)
      .json({ error: "Maximum of 10 users are allowed for an event" });
  }

  const usersWithDetails = users.map((eventUserId) => {
    return data.users.find((user) => user.id === eventUserId);
  });

  const newEvent = {
    id: data.events.length + 1,
    title,
    start,
    end,
    users: usersWithDetails,
  };
  data.events = [...data.events, newEvent];

  return res.status(201).json(newEvent);
});

app.put("/api/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventToEdit = data.events.find((event) => event.id === eventId);

  if (eventToEdit === undefined) {
    return res.status(404).json({ message: "Event not found" });
  }

  eventToEdit.title = req.body.title;
  eventToEdit.datetime = req.body.datetime;
  eventToEdit.users = req.body.users;

  return res.status(200).json(eventToEdit);
});

app.delete("/api/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventToDelete = data.events.find((event) => event.id === eventId);

  if (eventToDelete === undefined) {
    return res.status(404).json({ message: "Event not found" });
  }

  data.events = data.events.filter((event) => event.id != eventId);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
