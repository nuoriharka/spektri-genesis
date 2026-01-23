import VideoLoop from "./VideoLoop";

export default function WhySpektri(){
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-semibold">Enemmän kuin työkalu. Koko digitaalinen työvoimasi.</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-6 auto-rows-[200px]">
        {/* Ruutu 1 — iso */}
        <div className="md:col-span-3 md:row-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Agenttifarmit™</h3>
          <p className="mt-2 text-white/70">Kokoa erikoistuneita agentteja hoitamaan monimutkaisia projekteja autonomisesti.</p>
          <VideoLoop src="/videos/agent-swarm.mp4" className="mt-4" />
        </div>
        {/* Ruutu 2 */}
        <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Ideasta Sovellukseksi™</h3>
          <p className="mt-2 text-white/70">Kuvaile idea — saat UI:n, koodin ja deployn.</p>
          <VideoLoop src="/videos/dark-saas-duo.mp4" className="mt-4" />
        </div>
        {/* Ruutu 3 */}
        <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Meta-Orkestrointi™</h3>
          <p className="mt-2 text-white/70">Aina paras malli ja työkalu, pienimmillä kustannuksilla.</p>
          <VideoLoop src="/videos/icon-cloud.mp4" className="mt-4" />
        </div>
        {/* Ruutu 4 */}
        <div className="md:col-span-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-xl font-semibold">Mission Control™</h3>
          <p className="mt-2 text-white/70">Yksi näkymä. Tilannekuva, kustannukset, hätäjarru.</p>
          <VideoLoop src="/videos/flowing-diagram.mp4" className="mt-4" />
        </div>
      </div>
    </section>
  );
}
