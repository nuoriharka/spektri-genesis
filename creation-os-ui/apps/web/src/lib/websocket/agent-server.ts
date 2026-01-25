import { Server } from 'socket.io'
import { ComponentGeneratorAgent } from '../agents/component-generator'
// Stub agents for build
class FileManagerAgent { async writeComponent() { return { success: true, files: [] } } }
class ComponentRegistry { async getUsageStats() { return [] } async registerComponent() {} async cleanupUnusedComponents() { return [] } }
class SmartFileOrganizer { async createProjectStructure() {} async organizeByAtomicDesign() { return 'atom' } }

export interface AgentStatus {
  agentId: string
  status: 'idle' | 'working' | 'success' | 'error'
  message: string
  progress?: number
  timestamp: string
}

export interface CommandResult {
  success: boolean
  component?: string
  tests?: string
  story?: string
  explanation?: string
  files?: string[]
  atomicLevel?: string
  error?: string
}

export class AgentWebSocketServer {
  private io: Server
  private componentGenerator: ComponentGeneratorAgent
  private fileManager: FileManagerAgent
  private registry: ComponentRegistry
  private organizer: SmartFileOrganizer
  private activeConnections: Map<string, any> = new Map()
  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
      }
    })
    this.componentGenerator = new ComponentGeneratorAgent()
    this.fileManager = new FileManagerAgent()
    this.registry = new ComponentRegistry()
    this.organizer = new SmartFileOrganizer()
    this.setupEventHandlers()
    this.initializeProject()
  }
  private async initializeProject() { await this.organizer.createProjectStructure() }
  private setupEventHandlers() { /* ...event handlers as in your code... */ }
  // ...rest of your class code...
}
