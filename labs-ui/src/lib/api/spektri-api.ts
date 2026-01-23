const IDENTITY_HEADER = 'Lauri Elias Rainio'

class SpektriAPI {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: { 'X-Identity': IDENTITY_HEADER }
    })
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Identity': IDENTITY_HEADER },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  }

  streamRuns(runId: string) {
    return new EventSource(`${this.baseURL}/runs/${runId}/stream`)
  }
}

export const spektriAPI = new SpektriAPI()
