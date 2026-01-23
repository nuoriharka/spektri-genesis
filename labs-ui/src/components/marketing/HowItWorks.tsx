export default function HowItWorks(){
  const steps = [
    {t:"Keskustele", d:"Kerro tavoitteesi. “Luo kuukausiraportti ja lähetä Slackiin.”"},
    {t:"Orkestroi", d:"Spektri valitsee agentit ja työkalut – näyttää suunnitelman."},
    {t:"Toteuta", d:"Hyväksy ja seuraa reaaliajassa. Sinä olet ohjaksissa."},
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-semibold">Näin helppoa se on.</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s,i)=>(
          <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-sm text-white/50">0{i+1}</div>
            <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
            <p className="mt-2 text-white/70">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
