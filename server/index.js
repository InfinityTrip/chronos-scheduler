const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());

const EVENT_FIELDS = ["title", "date", "start", "end"];

app.get("/events", async (req, res) => {
  res.json(await db.all("events"));
});

app.post("/events", async (req, res) => {
  const body = req.body || {};
  for (const field of EVENT_FIELDS) {
    if (!body[field] || typeof body[field] !== "string") {
      return res.status(400).json({ error: `Missing or invalid field: ${field}` });
    }
  }

  const eventData = {
    title: body.title,
    date: body.date,
    startTime: body.start,
    endTime: body.end
  };

  const event = await db.insert("events", eventData);
  res.status(201).json(event);
});

app.listen(3000, () => console.log("chronos on :3000"));
