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
async function remove(table, id) {
  const data = await read();
  const items = data[table] || [];
  const filtered = items.filter(item => item.id !== Number(id) && item.id !== id);
  if (filtered.length === items.length) {
    return false;
  }
  data[table] = filtered;
  await fs.writeFile(FILE, JSON.stringify(data));
  return true;
}
module.exports = { all, insert, remove };