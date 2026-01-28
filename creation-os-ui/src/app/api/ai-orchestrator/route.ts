import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'

interface AIRequest {
  command: string
  type: 'component' | 'test' | 'story' | 'analysis'
  context?: any
  preferences?: {
    model?: 'gemini' | 'gpt4' | 'auto'
    style?: 'minimal' | 'detailed' | 'enterprise'
  }
}

export async function POST(request: NextRequest) {
  try {
    // Avoid hitting external APIs during static generation or when keys are missing
    if (!process.env.OPENAI_API_KEY || !process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: false,
        result: null,
        model: 'none',
        metadata: { note: 'AI keys missing; skipping upstream calls' }
      }, { status: 200 })
    }
    const aiRequest: AIRequest = await request.json()
    const { command, type, context, preferences } = aiRequest
    
    // Determine best model for task
    const selectedModel = await selectOptimalModel(type, preferences?.model)
    
    let result
    switch (selectedModel) {
      case 'gemini':
        result = await processWithGemini(command, type, context)
        break
      case 'gpt4':
        result = await processWithGPT4(command, type, context)
        break
      default:
        result = await processWithGemini(command, type, context) // fallback
    }
    
    return NextResponse.json({
      success: true,
      result,
      model: selectedModel,
      metadata: {
        processingTime: Date.now(),
        confidence: result.confidence || 0.8
      }
    })
    
  } catch (error) {
    console.error('AI Orchestrator error:', error)
    return NextResponse.json({
      error: 'AI processing failed',
      success: false
    }, { status: 500 })
  }
}

async function selectOptimalModel(
  type: string, 
  preference?: string
): Promise<'gemini' | 'gpt4'> {
  if (preference && ['gemini', 'gpt4'].includes(preference)) {
    return preference as 'gemini' | 'gpt4'
  }
  
  // Auto-select based on task type
  const modelSelection: { [key: string]: 'gemini' | 'gpt4' } = {
    'component': 'gemini',     // Gemini excellent for code generation
    'test': 'gpt4',           // GPT-4 better for test writing
    'story': 'gemini',        // Gemini good for documentation
    'analysis': 'gpt4'        // GPT-4 superior for analysis
  }
  
  return modelSelection[type] || 'gemini'
}

async function processWithGemini(
  command: string, 
  type: string, 
  context: any
) {
  if (!process.env.GEMINI_API_KEY) {
    return { content: 'Gemini key missing', model: 'gemini-pro', confidence: 0.1 }
  }
  const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = gemini.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = createGeminiPrompt(command, type, context)
  const result = await model.generateContent(prompt)
  
  return {
    content: result.response.text(),
    model: 'gemini-pro',
    confidence: 0.85
  }
}

async function processWithGPT4(
  command: string, 
  type: string, 
  context: any
) {
  if (!process.env.OPENAI_API_KEY) {
    return { content: 'OpenAI key missing', model: 'gpt-4', confidence: 0.1 }
  }
  const prompt = createGPT4Prompt(command, type, context)
  
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert React/TypeScript developer.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 2000
  })
  
  return {
    content: completion.choices[0].message.content,
    model: 'gpt-4',
    confidence: 0.9
  }
}

function createGeminiPrompt(command: string, type: string, context: any): string {
  const basePrompt = `
Komento: "${command}"
Tyyppi: ${type}
Konteksti: ${JSON.stringify(context)}

`
  
  switch (type) {
    case 'component':
      return basePrompt + `
Luo React TypeScript komponentti joka:
- Käyttää Tailwind CSS
- On saavutettava (ARIA)
- Sisältää proper TypeScript typing
- On responsive

Palauta vain koodi ilman selityksiä.
`
    case 'test':
      return basePrompt + `
Luo Jest/Testing Library testit komponentille.
Testaa:
- Renderöinti
- Props handling
- User interactions
- Accessibility

Palauta vain test koodi.
`
    default:
      return basePrompt + 'Prosessoi pyyntö ja palauta relevantit tulokset.'
  }
}

function createGPT4Prompt(command: string, type: string, context: any): string {
  return `
Process this natural language command: "${command}"
Type: ${type}
Context: ${JSON.stringify(context)}

Generate high-quality ${type} code following React/TypeScript best practices.
Use Tailwind CSS for styling and ensure accessibility.
Return only the code without explanations.
`
}
