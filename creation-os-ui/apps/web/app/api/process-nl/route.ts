import { NextRequest, NextResponse } from 'next/server'
import { NaturalLanguageProcessor } from '@/lib/agents/natural-language-processor'

const nlpProcessor = new NaturalLanguageProcessor()

export async function POST(request: NextRequest) {
  try {
    const { input, context } = await request.json()
    
    const result = await nlpProcessor.processNaturalLanguage(input, context)
    
    return NextResponse.json({
      success: true,
      result
    })
    
  } catch (error) {
    console.error('NLP processing error:', error)
    return NextResponse.json({
      error: 'Failed to process natural language',
      success: false
    }, { status: 500 })
  }
}
