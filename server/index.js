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

app.listen(3000, () => console.log("chronos on :3000"));
