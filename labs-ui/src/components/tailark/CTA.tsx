export default function CTA() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-10 text-center">
          <h3 className="text-2xl font-semibold">Valmiina vapauttamaan potentiaalisi?</h3>
          <p className="mt-2 text-muted-foreground">
            Liity edelläkävijöihin. Ensimmäinen digitaalinen työntekijäsi odottaa — ilmaiseksi.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/app" className="rounded-xl bg-primary px-5 py-3 text-primary-foreground">
              Aloita ilmaiseksi
            </a>
            <a href="/pricing" className="rounded-xl border px-5 py-3">
              Katso hinnoittelu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
