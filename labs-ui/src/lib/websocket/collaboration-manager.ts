import { Server } from 'socket.io'
export interface CollaborationSession {
  id: string
  participants: Participant[]
  currentProject: string
  sharedState: any
  createdAt: Date
  lastActivity: Date
}
export interface Participant {
  id: string
  name: string
  avatar?: string
  cursor?: { x: number; y: number }
  activeComponent?: string
  permissions: ('read' | 'write' | 'admin')[]
}
export class CollaborationManager {
  private sessions: Map<string, CollaborationSession> = new Map()
  private io: Server
  constructor(io: Server) { this.io = io; this.setupCollaborationHandlers() }
  private setupCollaborationHandlers() { /* ...event handlers as in your code... */ }
  // ...rest of your class code...
}
