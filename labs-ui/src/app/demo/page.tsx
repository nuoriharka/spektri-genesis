export const metadata = {
  title: "Varaa demo – Spektri",
  description: "Katso 60s demo tai varaa esittely.",
};

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 type-modular">
      <h1 className="text-3xl font-semibold">Demo</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        Demosisältö tulee pian. Toistaiseksi tämä on paikkasivu, joka varmistaa ettei navigointi kaadu.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="/" className="btn-secondary micro-cta focus-ring px-5 py-2 rounded-full">
          Takaisin etusivulle
        </a>
      </div>
    </main>
  );
}
