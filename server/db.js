const crypto = require("crypto");
const fs = require("fs/promises");
const FILE = "./data.json";

async function read() {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return {}; }
}
async function all(table) { return (await read())[table] || []; }
async function insert(table, row) {
  const data = await read();
  data[table] = [...(data[table] || []), { id: crypto.randomUUID(), ...row }];
  await fs.writeFile(FILE, JSON.stringify(data));
  return data[table].at(-1);
}
module.exports = { all, insert };
