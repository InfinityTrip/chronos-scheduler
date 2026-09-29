const fs = require("fs/promises");
const FILE = "./data.json";

async function read() {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return {}; } 
}
async function all(table) { return (await read())[table] || []; }
async function insert(table, row) {
  const data = await read();
  data[table] = [...(data[table] || []), { id: Date.now(), ...row }];
  await fs.writeFile(FILE, JSON.stringify(data));
  return data[table].at(-1);
}
async function update(table, id, patch) {
  const data = await read();
  const list = data[table] || [];
  const targetId = String(id);
  const index = list.findIndex((item) => String(item.id) === targetId);
  if (index === -1) return null;
  const updatedItem = { ...list[index], ...patch, id: list[index].id };
  list[index] = updatedItem;
  data[table] = list;
  await fs.writeFile(FILE, JSON.stringify(data));
  return updatedItem;
}
module.exports = { all, insert, update };
