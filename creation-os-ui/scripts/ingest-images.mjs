// deps: npm i -D sharp glob fs-extra
import sharp from "sharp";
import { glob } from "glob";
import fs from "fs-extra";

const map = [
  // HERO & OG
  { src:/klassinen.*creation.*hero/i, out:"public/images/landing/hero-desktop", size:[1600,900] },
  { src:/klassinen.*creation.*hero/i, out:"public/images/landing/hero-mobile",  size:[828,1200] },
  { src:/klassinen.*creation.*hero/i, out:"public/images/og/og-home",           size:[1200,630] },

  // ALT HERO CANDIDATES
  { src:/builder-hero/i,    out:"public/images/landing/alt-hero-builder",   size:[1600,900] },
  { src:/iconcloud-hero/i,  out:"public/images/landing/alt-hero-iconcloud", size:[1600,900] },
  { src:/cta-hero/i,        out:"public/images/landing/alt-hero-cta",       size:[1600,900] },

  // FEATURES & HOW IT WORKS
  { src:/builder-split/i,   out:"public/images/sections/features-1-builder",     size:[1200,800] },
  { src:/templates/i,       out:"public/images/sections/features-2-templates",   size:[1200,800] },
  { src:/integrations/i,    out:"public/images/sections/features-3-integrations",size:[1200,800] },
  { src:/cost.*performance/i,out:"public/images/sections/features-4-performance", size:[1200,800] },
  { src:/how.*it.*works/i,  out:"public/images/sections/how-it-works",           size:[1400,800] },

  // APP (7 core)
  { src:/dashboard( |1|3)?\.png$/i, out:"public/images/app/dashboard",     size:[1600,900] },
  { src:/dashboard-agents/i,        out:"public/images/app/agents",        size:[1600,900] },
  { src:/builder-split/i,           out:"public/images/app/agent-builder", size:[1600,900] },

  // OG placeholders
  { src:/dark.*og.*image/i, out:"public/images/og/og-features",     size:[1200,630] },
  { src:/dark.*og.*image/i, out:"public/images/og/og-templates",    size:[1200,630] },
  { src:/dark.*og.*image/i, out:"public/images/og/og-pricing",      size:[1200,630] },
  { src:/dark.*og.*image/i, out:"public/images/og/og-integrations", size:[1200,630] },
  { src:/dark.*og.*image/i, out:"public/images/og/og-security",     size:[1200,630] },
  { src:/dark.*og.*image/i, out:"public/images/og/og-docs",         size:[1200,630] },
];

async function ensure(dir){ await fs.ensureDir(dir); }

async function makePair(src, out, [w,h]){
  await ensure(out.substring(0, out.lastIndexOf("/")));
  const img = sharp(src).resize(w, h, { fit:"cover", position:"center" });
  await img.png({ compressionLevel:9 }).toFile(`${out}.png`);
  await img.webp({ quality:88 }).toFile(`${out}.webp`);
  console.log("→", out.replace(/^public\//,""), `(${w}x${h})`);
}

const files = await glob("photos/**/*.{png,jpg,jpeg,webp}", { nocase:true });
for (const f of files) {
  const name = f.split("/").pop();
  if (!name) continue;
  for (const rule of map) {
    if (rule.src.test(name)) {
      await makePair(f, rule.out, rule.size);
    }
  }
}
console.log("✅ Ingest valmis");
