export function blockDuration(block) {
  return (block.end - block.start) / 60000;
}

export function parseEvent(raw) {
  return {
    ...raw,
    start: new Date(raw.start),
    end: new Date(raw.end),
  };
}

export function addEvent(list, event) {
  return [...list, event];
}
