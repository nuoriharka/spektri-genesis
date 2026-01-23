
export const photos = {
  hero: {
    dashboard: { src: "/photos/dashboard-1.png", alt: "Spektri.Labs kojelauta tummalla taustalla" },
    builder:   { src: "/photos/builder-hero.png",   alt: "Rakentajan split-näkymä: chat ja työnkulku" },
    iconcloud: { src: "/photos/iconcloud-hero.png", alt: "Integraatioiden ikonipilvi" },
    cta:       { src: "/photos/cta-hero.png",       alt: "Kutsu toimintaan – aloita minuutissa" },
  },
  showcase: {
    dashboard3: { src: "/photos/dashboard-3.png", alt: "Kojelaudan KPI-näkymä" },
    dashboard1: { src: "/photos/dashboard-1.png", alt: "Yleiskuva kojelaudasta" },
    agents:     { src: "/photos/dashboard-agents.png", alt: "Agenttilista ja tilat" },
  },
  how: {
    split:   { src: "/photos/builder-split.png", alt: "Rakentajan split-näkymä" },
    overall: { src: "/photos/how-it-works.png",     alt: "Miten se toimii: valitse, yhdistä, aja" },
  },
  features: {
    cost:   { src: "/photos/cost-performance.png",    alt: "Kustannus ja suorituskyky" },
    integ:  { src: "/photos/integrations.png",alt: "Integraatioiden ruudukko" },
    temps:  { src: "/photos/templates.png",   alt: "Mallikirjasto" },
  },
  og: {
    home: { src: "/photos/dark-og-image.png", alt: "Spektri.Labs – OG-kuva" },
  },
} as const;
export type PhotoKey = typeof photos;
