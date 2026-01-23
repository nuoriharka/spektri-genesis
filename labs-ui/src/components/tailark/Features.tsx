import { Sparkles, Workflow, Users, Shield } from "lucide-react";

const items = [
  {
    icon: Sparkles,
    title: "Puhut, me teemme",
    desc: "Kerro tavoite luonnollisella kielellä. Agentit hoitavat loput.",
  },
  {
    icon: Workflow,
    title: "Meta-orkestrointi",
    desc: "Valitsee automaattisesti parhaat mallit ja työkalut jokaiseen tehtävään.",
  },
  {
    icon: Users,
    title: "Agenttifarmit™",
    desc: "Rakenna tiimi digitaalisia työntekijöitä monimutkaisiin prosesseihin.",
  },
  {
    icon: Shield,
    title: "Hallinta & turva",
    desc: "Hyväksynnät, budjettikatot, audit-lokit ja SSO/SAML yritystasolle.",
  },
];

export default function Features() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold">Lopeta näpyttely. Ala johtaa.</h2>
          <p className="mt-3 text-muted-foreground">
            Spektri tekee vaikeasta helppoa — alusta, joka rakentaa ja ajaa puolestasi.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <Icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-base font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
