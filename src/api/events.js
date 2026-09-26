export const EVENT_FIELDS = ["title", "start", "end"];

export function toPayload(form) {
  return { title: form.title, start: form.start, end: form.end };
}
