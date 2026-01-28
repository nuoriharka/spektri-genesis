import Image from "next/image";
export default function CoreContent() {
  return (
    <section className="py-16 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
          Build AI workflows visually
        </h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          Drag, drop, and connect agent blocks to create powerful automations. No code required.
        </p>
        <div className="flex justify-center gap-6">
                    <Image src="/images/app/dashboard.png" alt="Workflow dashboard" width={256} height={160} className="rounded-xl shadow-lg w-64 h-40 object-cover" />
                    <Image src="/images/app/agent-swarm.jpg" alt="Agent swarm" width={256} height={160} className="rounded-xl shadow-lg w-64 h-40 object-cover" />
        </div>
      </div>
    </section>
  )
}
