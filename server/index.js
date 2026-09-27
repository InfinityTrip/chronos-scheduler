const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());

app.get("/events", async (req, res) => {
  res.json(await db.all("events"));
});

app.post("/events", async (req, res) => {
  const { title, start, end } = req.body || {};

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!start || typeof start !== "string" || isNaN(Date.parse(start))) {
    return res.status(400).json({ error: "Valid start date is required" });
  }

  if (!end || typeof end !== "string" || isNaN(Date.parse(end))) {
    return res.status(400).json({ error: "Valid end date is required" });
  }

  const event = await db.insert("events", {
    title: title.trim(),
    start,
    end,
  });
  res.status(201).json(event);
});

app.listen(3000, () => console.log("chronos on :3000"));
