import VideoLoop from "./VideoLoop";

export default function WhyCreationOS(): JSX.Element {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-semibold">More than a tool. Your digital workforce.</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-6 auto-rows-[200px]">
        <div className="md:col-span-3 md:row-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Agent Farms</h3>
          <p className="mt-2 text-white/70">
            Compose specialized agents to run complex projects autonomously.
          </p>
          <VideoLoop src="/videos/agent-swarm.mp4" className="mt-4" />
        </div>
        <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Idea to Application</h3>
          <p className="mt-2 text-white/70">Describe the intent. Get UI, code, and deploy.</p>
          <VideoLoop src="/videos/dark-saas-duo.mp4" className="mt-4" />
        </div>
        <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Meta Orchestration</h3>
          <p className="mt-2 text-white/70">Always the best model and tool, at minimal cost.</p>
          <VideoLoop src="/videos/icon-cloud.mp4" className="mt-4" />
        </div>
        <div className="md:col-span-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Mission Control</h3>
          <p className="mt-2 text-white/70">One view. State, spend, and the emergency brake.</p>
          <VideoLoop src="/videos/flowing-diagram.mp4" className="mt-4" />
        </div>
      </div>
    </section>
  );
}
