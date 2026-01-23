import { Metadata } from "next"
import Container from "@/components/layout/Container"
import { TemplateCard } from "@/components/templates/TemplateCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Templates",
  description: "Ready-made AI agent templates to get you started fast.",
  openGraph: { title: "Templates — Spektri", description: "Ready-made AI agent templates to get you started fast.", images: ["/images/og/og-home.webp"] },
}

const ALL_TEMPLATES = [
  { title: "Customer Support Agent", desc: "Answer and triage support tickets with context.", categories: ["Support", "Automation"] },
  { title: "Sales Email Writer", desc: "Personalize outreach at scale.", categories: ["Sales", "Content"] },
  { title: "Research Summarizer", desc: "Summarize long docs into insights.", categories: ["Research", "NLP"] },
  { title: "Data Cleanup", desc: "Normalize and validate CSVs.", categories: ["Ops", "Data"] },
  { title: "Meeting Notes", desc: "Transcribe and action meeting notes.", categories: ["Productivity"] },
  { title: "SEO Content Planner", desc: "Generate topic clusters from a seed.", categories: ["Marketing"] },
  { title: "Support Chat Widget", desc: "Website widget backed by your docs.", categories: ["Support", "UX"] },
  { title: "Invoice Parser", desc: "Extract fields from PDFs reliably.", categories: ["Finance", "RAG"] },
  { title: "QA Test Generator", desc: "Suggest e2e scenarios from PR diffs.", categories: ["DevTools"] },
  { title: "Churn Watcher", desc: "Flag risky accounts automatically.", categories: ["Analytics", "Ops"] },
  { title: "Localization Assistant", desc: "Translate UI copy with tone.", categories: ["Content"] },
  { title: "HR Screening", desc: "Score applicants against criteria.", categories: ["HR", "Automation"] },
] as const

export default function TemplatesPage() {
  return (
    <main id="main" className="pb-24">
      <Container>
        <section className="flex items-end justify-between gap-6 py-10">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">Templates</h1>
            <p className="text-white/70 mt-2 max-w-2xl">Kickstart with ready-to-run agents. Duplicate, tweak, and deploy in minutes.</p>
          </div>
          <div className="min-w-[220px]">
            <Select defaultValue="all">
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-[#0b0b0c] border-white/10 text-white">
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="ops">Ops</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="devtools">DevTools</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_TEMPLATES.map((t) => (
            <TemplateCard key={t.title} title={t.title} desc={t.desc} categories={t.categories} />
          ))}
        </section>
      </Container>
    </main>
  )
}
