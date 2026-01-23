#!/usr/bin/env node
/*
  Simple image export helper. Requires sharp (devDependency).
  Reads from photos/ and writes to public/images according to docs/ASSETS_CHECKLIST.md.
*/
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const root = process.cwd()
const photosDir = path.join(root, 'photos')

const tasks = [
  // sections
  { src: ['builder-split.png'], out: 'public/images/sections/features-1-builder', w: 1200, h: 800 },
  { src: ['templates.png'], out: 'public/images/sections/features-2-templates', w: 1200, h: 800 },
  { src: ['integrations.png'], out: 'public/images/sections/features-3-integrations', w: 1200, h: 800 },
  { src: ['cost-performance.png'], out: 'public/images/sections/features-4-performance', w: 1200, h: 800 },
  { src: ['how-it-works.png'], out: 'public/images/sections/how-it-works', w: 1400, h: 800 },
  // app
  { src: ['dashboard-1.png', 'dashboard-3.png'], out: 'public/images/app/dashboard', w: 1600, h: 900 },
  { src: ['dashboard-agents.png'], out: 'public/images/app/agents', w: 1600, h: 900 },
  { src: ['builder-split.png'], out: 'public/images/app/agent-builder', w: 1600, h: 900 },
  // landing/og
  { src: ['klassinen-spektri-hero.png'], out: 'public/images/landing/hero-desktop', w: 1600, h: 900 },
  { src: ['klassinen-spektri-hero.png'], out: 'public/images/landing/hero-mobile', w: 828, h: 1200, fit: 'cover' },
  { src: ['dark-og-image.png'], out: 'public/images/og/og-home', w: 1200, h: 630 },
  { src: ['builder-hero.png'], out: 'public/images/landing/alt-hero-builder', w: 1600, h: 900 },
  { src: ['iconcloud-hero.png'], out: 'public/images/landing/alt-hero-iconcloud', w: 1600, h: 900 },
  { src: ['cta-hero.png'], out: 'public/images/landing/alt-hero-cta', w: 1600, h: 900 },
]

async function ensureDir(p) {
  await fs.promises.mkdir(path.dirname(p), { recursive: true })
}

async function emit(imgPath, outBase, w, h, fit='contain') {
  await ensureDir(path.join(root, outBase + '.png'))
  const img = sharp(imgPath).resize({ width: w, height: h, fit, withoutEnlargement: true, position: 'center' })
  await img.png({ quality: 90 }).toFile(path.join(root, outBase + '.png'))
  await img.webp({ quality: 86 }).toFile(path.join(root, outBase + '.webp'))
}

async function main() {
  let ok = 0, skip = 0
  for (const t of tasks) {
    let found = null
    for (const candidate of t.src) {
      const p = path.join(photosDir, candidate)
      if (fs.existsSync(p)) { found = p; break }
    }
    if (!found) { skip++; continue }
    try {
      await emit(found, t.out, t.w, t.h, t.fit || 'contain')
      ok++
      process.stdout.write(`✓ ${t.out}\n`)
    } catch (e) {
      console.error(`✗ ${t.out}`, e.message)
    }
  }
  console.log(`Done. Emitted: ${ok}, Skipped: ${skip}.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
