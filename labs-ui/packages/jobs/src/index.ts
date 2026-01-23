export type Job<Data = unknown, Result = unknown> = {
  name: string
  data: Data
}

export type JobHandler<Data = unknown, Result = unknown> = (job: Job<Data>) => Promise<Result>

export class InMemoryJobQueue {
  private handlers = new Map<string, JobHandler<any, any>>()
  private queue: Job<any, any>[] = []
  private running = false

  register<Data, Result>(name: string, handler: JobHandler<Data, Result>) {
    this.handlers.set(name, handler as JobHandler<any, any>)
  }

  async enqueue<Data = unknown, Result = unknown>(name: string, data: Data): Promise<void> {
    this.queue.push({ name, data })
    if (!this.running) this.drain().catch(() => {})
  }

  private async drain() {
    this.running = true
    try {
      while (this.queue.length) {
        const job = this.queue.shift()!
        const handler = this.handlers.get(job.name)
        if (!handler) continue
        try {
          await handler(job)
        } catch {}
      }
    } finally {
      this.running = false
    }
  }
}

export const jobs = new InMemoryJobQueue()
