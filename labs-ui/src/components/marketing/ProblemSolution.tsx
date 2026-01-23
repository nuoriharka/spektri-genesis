const rows = [
  { old:"Tuntien Excel-raportointi", neo:"“Luo viikkoraportti.”" },
  { old:"Koodarin etsiminen ja palkkaaminen", neo:"“Rakenna minulle sovellus.”" },
  { old:"Monimutkaiset Zapier-työnkulut", neo:"“Yhdistä nämä työkalut.”" },
  { old:"Manuaalinen sähköpostien lajittelu", neo:"“Lajittele ja tee yhteenveto.”" },
];
export default function ProblemSolution(){
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-semibold">Digitaalinen työ on rikki. Me korjaamme sen.</h2>
      <p className="mt-2 text-white/70">On parempi tapa kuin näpyttely ja työkalujen välinen hyppely.</p>
      <div className="mt-8 grid gap-3">
        {rows.map((r,i)=>(
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition">
            <div className="text-white/60">❌ {r.old}</div>
            <div className="text-[var(--brand)] font-medium">✅ {r.neo}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
