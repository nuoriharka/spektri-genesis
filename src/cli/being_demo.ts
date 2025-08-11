/* src/cli/being_demo.ts */
import { humanExistence, trustDemo } from "../being";

// Parse CLI args for frequencies and authenticity
function parseArg(name: string, def: number | boolean): number | boolean {
  const arg = process.argv.find(a => a.startsWith(`--${name}=`));
  if (!arg) return def;
  const val = arg.split("=")[1];
  if (typeof def === "boolean") return val === "true";
  const num = Number(val);
  return isNaN(num) ? def : num;
}

const aurinkoFreq = parseArg("aurinko", 440) as number;
const kuutamoFreq = parseArg("kuutamo", 432) as number;
const varjoAuth = parseArg("varjoAuth", false) as boolean;

(async () => {
  // Olemassaolon demo
  await humanExistence({ ticks: 5, intervalMs: 100 });
  // Luottamusdemo
  console.log("\n\n--- TRUST ENGINE & SHARED REALITY DEMO ---");
  await trustDemo(aurinkoFreq, kuutamoFreq, varjoAuth);
})();
