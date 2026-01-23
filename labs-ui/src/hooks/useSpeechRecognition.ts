import { useState, useEffect, useRef, useCallback } from 'react'

interface SpeechRecognitionOptions {
  language?: string
  continuous?: boolean
  interimResults?: boolean
}

export function useAdvancedSpeechRecognition(options: SpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const recognition = useRef<any>(null)
  const onResultCallbacks = useRef<((transcript: string) => void)[]>([])
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setIsSupported(true)
      recognition.current = new SpeechRecognition()
      
      const rec = recognition.current
      rec.continuous = options.continuous ?? true
      rec.interimResults = options.interimResults ?? true
      rec.lang = options.language ?? 'fi-FI'
      
      rec.onstart = () => {
        setIsListening(true)
        setError(null)
      }
      
      rec.onend = () => {
        setIsListening(false)
      }
      
      rec.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }
      
      rec.onresult = (event: any) => {
        let finalTranscript = ''
        let interimText = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimText += transcript
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript)
          onResultCallbacks.current.forEach(callback => callback(finalTranscript))
        }
        
        setInterimTranscript(interimText)
      }
    } else {
      setIsSupported(false)
    }
  }, [options.language, options.continuous, options.interimResults])
  
  const startListening = useCallback(() => {
    if (recognition.current && !isListening) {
      setTranscript('')
      setInterimTranscript('')
      recognition.current.start()
    }
  }, [isListening])
  
  const stopListening = useCallback(() => {
    if (recognition.current && isListening) {
      recognition.current.stop()
    }
  }, [isListening])
  
  const onResult = useCallback((callback: (transcript: string) => void) => {
    onResultCallbacks.current.push(callback)
    
    return () => {
      onResultCallbacks.current = onResultCallbacks.current.filter(cb => cb !== callback)
    }
  }, [])
  
  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
    onResult
  }
}
