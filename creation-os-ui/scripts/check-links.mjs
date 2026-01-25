import http from 'http'
import { spawn } from 'child_process'
import { setTimeout as wait } from 'timers/promises'
import cheerio from 'cheerio'
import fetch from 'node-fetch'

async function startServer(){
  return new Promise((resolve)=>{
    const ps = spawn('npm', ['start'], { stdio: 'inherit' })
    setTimeout(()=>resolve(ps), 2000)
  })
}

async function crawl(url){
  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)
  const links = new Set()
  $('a[href]').each((_, el)=>{
    const href = $(el).attr('href')
    if(href && href.startsWith('/')) links.add(href)
  })
  return Array.from(links)
}

async function check(){
  const base = 'http://localhost:3001'
  const start = base + '/'
  // naive: assume prod build is static, just check links on home
  const links = await crawl(start)
  let failed = false
  for (const l of links){
    const res = await fetch(base + l)
    if(res.status === 404){
      console.error('Broken link:', l)
      failed = true
    }
    await wait(50)
  }
  if(failed) process.exit(1)
  console.log('✔ Links OK')
}

await check()
