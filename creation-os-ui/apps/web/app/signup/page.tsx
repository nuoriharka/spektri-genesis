export const metadata = {
  title: "Luo tili – Creation OS",
  description: "Aloita ilmaiseksi. Luo tili Creation OSin minuutissa.",
};

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 type-modular">
      <h1 className="text-3xl font-semibold">Aloita ilmaiseksi</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        Tervetuloa Creation OSin. Rekisteröitymissivu tulee pian. Sillä välin voit olla yhteydessä tai tutustua alustaan.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="/dashboard" className="btn-primary micro-cta focus-ring px-5 py-2 rounded-full">
          Siirry hallintapaneeliin
        </a>
        <a href="/" className="btn-secondary micro-cta focus-ring px-5 py-2 rounded-full">
          Takaisin etusivulle
        </a>
      </div>
    </main>
  );
}
