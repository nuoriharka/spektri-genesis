import Image from "next/image";

export default function ContentCenter() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-border">
            <video
              className="h-full w-full object-cover"
              src="/videos/integrations.mp4"
              poster="/photos/integrations-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Yksi alusta, joka sitoo kaiken yhteen</h2>
            <p className="text-muted-foreground">
              Creation OS on digitaalinen kapellimestarisi. Yhdistämme OpenAI:n, Anthropicin, Googlen,
              GitHubin, Stripesin, Supabasen ja muut — ilman avainrumbaa tai hauraista integraatiovelkaa.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Yksi kirjautuminen, yksi lasku.</li>
              <li>Reaaliaikainen näkyvyys kustannuksiin ja säästettyyn aikaan.</li>
              <li>Hyväksynnät ja audit-lokit kriittisiin vaiheisiin.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
