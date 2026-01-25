import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json()
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const enhancedPrompt = `
${prompt}

Vaatimukset:
- Käytä TypeScript
- Käytä Tailwind CSS styling
- Sisällytä proper ARIA attributes
- Komponentti tulee olla functional component
- Käytä React hooks tarvittaessa
- Palauta VAIN koodi, ei selityksiä

Esimerkki muoto:
\`\`\`tsx
import React from 'react'

interface ComponentProps {
  // props here
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  return (
    <div>
      {/* component JSX */}
    </div>
  )
}

export default Component
\`\`\`
`
    
    const result = await model.generateContent(enhancedPrompt)
    const responseText = result.response.text()
    
    // Extract code from markdown if present
    const codeMatch = responseText.match(/```(?:tsx?|javascript)?\s*([\s\S]*?)\s*```/)
    const code = codeMatch ? codeMatch[1] : responseText
    
    return NextResponse.json({ 
      code: code.trim(),
      success: true 
    })
    
  } catch (error) {
    console.error('Code generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate code',
      success: false 
    }, { status: 500 })
  }
}
