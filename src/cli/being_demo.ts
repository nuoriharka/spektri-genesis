/* src/cli/being_demo.ts */
import { humanExistence, trustDemo } from "../being";

(async () => {
  // Olemassaolon demo
  await humanExistence({ ticks: 5, intervalMs: 100 });
  // Luottamusdemo
  console.log("\n\n--- TRUST ENGINE & SHARED REALITY DEMO ---");
  await trustDemo();
})();
