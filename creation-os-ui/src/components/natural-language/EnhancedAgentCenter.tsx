"use client"

import React, { useState } from 'react'
import { Mic, MicOff, Send } from 'lucide-react'

export const EnhancedAgentCenter: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState('')
  const [isListening, setIsListening] = useState(false)

  const sendTextCommand = () => {
    if (currentCommand.trim()) {
      console.log('Command:', currentCommand)
      setCurrentCommand('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 rounded-lg p-4 border border-gray-700 max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-white">AI Agent Center</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendTextCommand()}
            placeholder="Kirjoita komento..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendTextCommand}
            className="bg-blue-500 hover:bg-blue-600 rounded px-3 py-2 transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <button
          onClick={() => setIsListening(!isListening)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition-all ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isListening ? 'Lopeta' : 'Aloita puhe'}
        </button>
      </div>
    </div>
  )
}

export default EnhancedAgentCenter
