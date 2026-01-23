import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'

export interface ParsedIntent {
  intent: string
  entities: string[]
  parameters: Record<string, any>
  confidence: number
  language: 'fi' | 'en' | 'sv'
}

export class NaturalLanguageProcessor {
  private gemini?: GoogleGenerativeAI
  private openai?: OpenAI
  
  constructor() {
    try {
      if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        this.gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
      }
      if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
        this.openai = new OpenAI({ 
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true
        })
      }
    } catch {
      // no-op; will use fallback
    }
  }
  
  async processNaturalLanguage(input: string, context?: any): Promise<ParsedIntent> {
    const prompt = this.createAnalysisPrompt(input, context)
    
    try {
      if (!this.gemini) throw new Error('Gemini key missing')
      const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' })
      const result = await model.generateContent(prompt)
      const analysis = JSON.parse(result.response.text())
      
      return {
        ...analysis,
        confidence: this.calculateConfidence(analysis)
      }
    } catch (error) {
  console.error('NLP Error:', error)
      return this.fallbackAnalysis(input)
    }
  }
  
  private createAnalysisPrompt(input: string, context?: any): string {
    return `
Analysoi seuraava luonnollinen kieli komento ja palauta JSON:

Komento: "${input}"
Konteksti: ${JSON.stringify(context || {})}

Tunnista:
1. Päätarkoitus (intent)
2. Mainitut entiteetit
3. Parametrit ja arvot
4. Kieli (fi/en/sv)

Mahdolliset intentit:
- create_component: Luo komponentti
- create_page: Luo sivu
- test_code: Testaa koodi
- optimize_performance: Optimoi suorituskyky
- fix_bugs: Korjaa bugit
- deploy: Julkaise
- design_update: Päivitä design
- refactor_code: Refaktoroi koodi

Palauta muodossa:
{
  "intent": "create_component",
  "entities": ["button", "sininen", "iso"],
  "parameters": {
    "type": "button",
    "color": "blue", 
    "size": "large",
    "action": "click_handler"
  },
  "language": "fi",
  "steps": ["luo komponentti", "lisää styling", "lisää toiminnallisuus"]
}
`
  }
  
  private calculateConfidence(analysis: any): number {
    // Yksinkertainen luottamuslaskin
    let score = 0.5
    
    if (analysis.intent) score += 0.2
    if (analysis.entities?.length > 0) score += 0.2
    if (analysis.parameters && Object.keys(analysis.parameters).length > 0) score += 0.1
    
    return Math.min(score, 1.0)
  }
  
  private fallbackAnalysis(input: string): ParsedIntent {
    // Yksinkertainen fallback säännöillä
    const lowerInput = input.toLowerCase()
    
    let intent = 'unknown'
    if (lowerInput.includes('luo') || lowerInput.includes('tee')) intent = 'create_component'
    if (lowerInput.includes('testaa')) intent = 'test_code'
    if (lowerInput.includes('optimoi')) intent = 'optimize_performance'
    
    return {
      intent,
      entities: [],
      parameters: {},
      confidence: 0.3,
      language: lowerInput.match(/[äöå]/) ? 'fi' : 'en'
    }
  }
}
