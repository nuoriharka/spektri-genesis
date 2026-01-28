import { NextRequest } from "next/server"

export async function POST(req: NextRequest){
  try{
    const { email } = await req.json()
    if(!email || typeof email !== 'string'){
      return new Response('Bad Request', { status: 400 })
    }
    // TODO: Optionally forward to Slack webhook if env present
    // const url = process.env.SLACK_WEBHOOK_URL
    // if(url){ await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ text: `Newsletter: ${email}` }) }) }
    return new Response(null, { status: 204 })
  }catch{
    return new Response('Bad Request', { status: 400 })
  }
}
