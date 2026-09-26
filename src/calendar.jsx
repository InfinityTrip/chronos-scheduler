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

export default function Calendar() {
  const [events, setEvents] = useState([]);
  useEffect(() => { load(); return subscribe(setEvents); }, []);
  return (
    <div className="day">
      <button onClick={openNewEvent}>New event</button>
      {events.map((e) => (
        <div key={e.id} className="block" style={{ position: "absolute", top: e.start.getHours() * 40, height: blockDuration(e) }}>
          {e.title}
        </div>
      ))}
    </div>
  );
}
