import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Palette, Zap } from "lucide-react"
import { readFileSync, readdirSync } from "fs"
import path from "path"
import { marked } from "marked"
import sanitizeHtml from "sanitize-html"

export default function DocsPage() {
  // Read and render repository README as full docs
  let readmeHtml: string = ""
  let docs: { slug: string; title: string; html: string }[] = []
  try {
    const md = readFileSync(path.join(process.cwd(), "README.md"), "utf8")
  readmeHtml = marked.parse(md) as string
    readmeHtml = sanitizeHtml(readmeHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "span",
        "code",
        "pre",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ]),
      allowedAttributes: {
        a: ["href", "name", "target", "rel"],
        img: ["src", "alt", "title", "width", "height"],
        code: ["class"],
        span: ["class"],
        "*": ["id"],
      },
    })
  } catch (e) {
    readmeHtml = "<p class=\"text-sm text-muted-foreground\">README.md ei löytynyt tai sitä ei voitu lukea.</p>"
  }

  // Load extra markdown docs from top-level /docs directory if present
  try {
    const docsDir = path.join(process.cwd(), "docs")
    const files = readdirSync(docsDir, { withFileTypes: true })
      .filter((d) => d.isFile() && /\.(md|mdx)$/i.test(d.name))
      .map((d) => d.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    docs = files.map((filename) => {
      const filePath = path.join(docsDir, filename)
      const md = readFileSync(filePath, "utf8")
  let html = marked.parse(md) as string
      html = sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
          "img",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "span",
          "code",
          "pre",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
        ]),
        allowedAttributes: {
          a: ["href", "name", "target", "rel"],
          img: ["src", "alt", "title", "width", "height"],
          code: ["class"],
          span: ["class"],
          "*": ["id"],
        },
      })
      const base = filename.replace(/\.(md|mdx)$/i, "")
      const titleFromH1 = (md.match(/^#\s+(.+)$/m) || [])[1]
      const title = (titleFromH1 || base.replace(/[-_]/g, " ")).trim()
      const slug = `doc-${base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
      return { slug, title, html }
    })
  } catch (e) {
    // no docs dir – ignore
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Dokumentaatio</h1>
        <p className="text-xl text-muted-foreground">Kaikki mitä tarvitset Spektri.Labs UI:n käyttöön</p>
      </div>

      {/* Quickstart and references */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" /> Aloita käyttö
            </CardTitle>
            <CardDescription>Nopea aloitus Spektri.Labs UI:n käyttöön</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Asennus</h4>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-sm">npm install</code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Kehityspalvelin</h4>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-sm">npm run dev</code>
              </div>
            </div>
            <Button asChild variant="secondary">
              <a href="#full-docs">Katso koko opas</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5" /> API-viite
            </CardTitle>
            <CardDescription>Yksityiskohtaiset komponentti-API:t ja propsit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Komponenttien propsit</h4>
              <p className="text-sm text-muted-foreground">Kaikilla komponenteilla on TypeScript-tyypitykset ja kattava dokumentaatio.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Esimerkit</h4>
              <p className="text-sm text-muted-foreground">Katso käytännön esimerkit sivulta /examples.</p>
            </div>
            <Button variant="outline" asChild>
              <a href="https://github.com/nuoriharka/spektri-labs-ui" target="_blank" rel="noreferrer">Selaa GitHubissa</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5" /> Design-järjestelmä
            </CardTitle>
            <CardDescription>Väripaletti, typografia ja design-tokenit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Värit</h4>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded" />
                <div className="w-8 h-8 bg-blue-500 rounded" />
                <div className="w-8 h-8 bg-green-500 rounded" />
                <div className="w-8 h-8 bg-yellow-500 rounded" />
                <div className="w-8 h-8 bg-red-500 rounded" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Typografia</h4>
              <div className="space-y-1">
                <p className="text-lg font-bold">Heading Large</p>
                <p className="text-base font-semibold">Heading Medium</p>
                <p className="text-sm">Body Text</p>
                <p className="text-xs text-muted-foreground">Caption</p>
              </div>
            </div>
            <Button variant="outline">Katso design-järjestelmä</Button>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" /> Edistynyt käyttö
            </CardTitle>
            <CardDescription>Kustomointi, teemat ja edistyneet kuviot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Teemat</h4>
              <p className="text-sm text-muted-foreground">Mukauta värejä, fontteja ja välejä CSS-muuttujilla.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Mukautetut komponentit</h4>
              <p className="text-sm text-muted-foreground">Rakenna omia komponentteja design-primitiipeillä.</p>
            </div>
            <Button variant="outline">Lue lisää</Button>
          </CardContent>
        </Card>
      </div>

      {/* Simple in-page TOC if we have extra docs */}
      {(docs.length > 0) && (
        <aside className="mt-12 mb-6 rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-2">Sisällys</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><a className="underline-offset-2 hover:underline" href="#readme">README</a></li>
            {docs.map((d) => (
              <li key={d.slug}>
                <a className="underline-offset-2 hover:underline" href={`#${d.slug}`}>{d.title}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Full docs from README */}
      <section id="readme" className="mt-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-4">README</h2>
        <div className="prose prose-invert max-w-none rounded-lg border bg-card text-card-foreground p-6 overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
        </div>
      </section>

      {/* Additional markdown docs */}
      {docs.map((d) => (
        <section key={d.slug} id={d.slug} className="mt-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">{d.title}</h2>
          <div className="prose prose-invert max-w-none rounded-lg border bg-card text-card-foreground p-6 overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: d.html }} />
          </div>
        </section>
      ))}

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Tarvitsetko apua?</h2>
        <p className="text-muted-foreground mb-4">Liity yhteisöön tai ota yhteyttä tukeen.</p>
        <div className="flex flex-wrap gap-3">
          <Button className="btn-spektri">Liity Discordiin</Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/nuoriharka/spektri-labs-ui" target="_blank" rel="noreferrer">GitHub</a>
          </Button>
          <Button variant="outline">Ota yhteyttä tukeen</Button>
        </div>
      </div>
    </div>
  )
}
