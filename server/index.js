const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());

app.get("/events", async (req, res) => {
  res.json(await db.all("events"));
});

app.post("/events", async (req, res) => {
  const event = await db.insert("events", req.body);
  res.status(201).json(event);
});

async function handleUpdate(req, res) {
  const id = String(req.params.id);
  const patch = typeof req.body === "object" && req.body !== null ? { ...req.body } : null;
  if (!patch) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const updated = await db.update("events", id, patch);
  if (!updated) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(updated);
}

app.put("/events/:id", handleUpdate);
app.patch("/events/:id", handleUpdate);

app.listen(3000, () => console.log("chronos on :3000"));
