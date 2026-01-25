import { readdirSync } from "fs";
import { spawnSync } from "child_process";
const dir = "public/videos";
readdirSync(dir).filter(f=>f.endsWith(".mp4")).forEach(f=>{
  const inFile = `${dir}/${f}`;
  const outFile = `${dir}/${f}`; // overwrite in place
  const args = ["-y","-i", inFile, "-an", "-movflags", "+faststart", "-c:v", "libx264", "-pix_fmt", "yuv420p", outFile];
  const r = spawnSync("ffmpeg", args, { stdio:"inherit" });
  if (r.status!==0) process.exit(r.status);
});
console.log("Muted videos updated in", dir);
