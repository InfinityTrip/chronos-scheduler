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

app.delete("/events/:id", async (req, res) => {
  const success = await db.remove("events", req.params.id);
  if (!success) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.status(204).send();
});

app.listen(3000, () => console.log("chronos on :3000"));