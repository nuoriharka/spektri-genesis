import { glob } from 'glob'
import fs from 'fs/promises'
import path from 'path'

const MAX_KB = 350

const files = await glob('public/images/**/*.{png,webp}', { nocase: true })
let failed = false
for (const f of files){
  const st = await fs.stat(f)
  const kb = st.size / 1024
  if (kb > MAX_KB){
    console.error(`Image too large (${Math.round(kb)} kB): ${path.relative(process.cwd(), f)}`)
    failed = true
  }
}
if (failed){
  process.exit(1)
}else{
  console.log(`✔ Image sizes OK (${files.length} files checked)`)
}
