import { readdirSync } from "node:fs";
const bad = readdirSync("photos").filter((n) => /[A-Z ]/.test(n));
if (bad.length) {
  console.error("Fix image filenames:", bad);
  process.exit(1);
}
