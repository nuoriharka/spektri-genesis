import { readdirSync, mkdirSync, existsSync } from "fs";
import { spawnSync } from "child_process";
const inDir = "public/videos", outDir = "public/posters";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
readdirSync(inDir).filter(f=>f.endsWith(".mp4")).forEach(f=>{
  const name = f.replace(/\.mp4$/,"");
  const args = [
    "-y", "-ss", "0.12",
    "-i", `${inDir}/${f}`,
    "-frames:v", "1",
    "-vf", "scale=1600:-1",
    "-q:v", "2",
    `${outDir}/${name}.jpg`
  ];
  const r = spawnSync("ffmpeg", args, { stdio:"inherit" });
  if (r.status!==0) process.exit(r.status);
});
console.log("Posters created to", outDir);
