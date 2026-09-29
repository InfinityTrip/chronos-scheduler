import { useEffect, useState } from "react";
import { blockDuration } from "./schedule";
import { load, subscribe, create } from "./store";

export function goToDay(date) {
  window.location.hash = date.toISOString().slice(0, 10);
}

export function openNewEvent() {
  const title = window.prompt("Title?");
  if (title) create({ title, start: new Date().toISOString(), end: new Date(Date.now() + 3600000).toISOString() });
}

export async function updateEvent(id, patch) {
  const res = await fetch(`/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (res.ok) {
    await load();
  }
  return res;
}

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDuration, setEditDuration] = useState(60);

  useEffect(() => { load(); return subscribe(setEvents); }, []);

  const startEdit = (e) => {
    setEditingId(e.id);
    setEditTitle(e.title);
    const startMs = new Date(e.start).getTime();
    const endMs = new Date(e.end).getTime();
    const durMins = Math.round((endMs - startMs) / 60000) || 60;
    setEditDuration(durMins);
  };

  const saveEdit = async (e) => {
    const durationMinutes = Number(editDuration) || 60;
    const startMs = new Date(e.start).getTime();
    const end = new Date(startMs + durationMinutes * 60000).toISOString();
    await updateEvent(e.id, { title: editTitle, end, duration: durationMinutes });
    setEditingId(null);
  };

  return (
    <div className="day">
      <button onClick={openNewEvent}>New event</button>
      {events.map((e) => {
        const isEditing = editingId === e.id;
        return (
          <div
            key={e.id}
            className="block"
            style={{ position: "absolute", top: e.start.getHours() * 40, height: blockDuration(e) }}
            onClick={() => { if (!isEditing) startEdit(e); }}
          >
            {isEditing ? (
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  saveEdit(e);
                }}
                onClick={(ev) => ev.stopPropagation()}
              >
                <input
                  name="title"
                  aria-label="Title"
                  placeholder="Title"
                  value={editTitle}
                  onChange={(ev) => setEditTitle(ev.target.value)}
                  autoFocus
                />
                <input
                  type="number"
                  name="duration"
                  aria-label="Duration"
                  placeholder="Duration (minutes)"
                  value={editDuration}
                  onChange={(ev) => setEditDuration(ev.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              e.title
            )}
          </div>
        );
      })}
    </div>
  );
}
