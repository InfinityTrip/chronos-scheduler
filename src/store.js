import { addEvent, parseEvent } from "./schedule";

let events = [];
const listeners = new Set();

export async function load() {
  const res = await fetch("/events");
  events = (await res.json()).map(parseEvent);
  listeners.forEach((l) => l(events));
}

export async function create(event) {
  const res = await fetch("/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(event) });
  events = addEvent(events, parseEvent(await res.json()));
  listeners.forEach((l) => l(events));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
