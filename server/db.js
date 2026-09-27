const fs = require("fs/promises");
const FILE = "./data.json";

let writeQueue = Promise.resolve();

async function read() {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return {}; }
}
async function all(table) { return (await read())[table] || []; }
async function insert(table, row) {
  const next = writeQueue.then(async () => {
    const data = await read();
    data[table] = [...(data[table] || []), { id: Date.now(), ...row }];
    await fs.writeFile(FILE, JSON.stringify(data));
    return data[table].at(-1);
  });
  writeQueue = next.catch(() => {});
  return next;
}
module.exports = { all, insert };
