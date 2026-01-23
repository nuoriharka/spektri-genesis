# UI-komponenttien spesifikaatio

## Design-tokenit
Ks. `docs/DESIGN_TOKENS_FI.md`.

## Ydinkomponentit
- **AppFrame** – Header, Sidebar, PageHeader
- **MoneyBar** – KPI-pillerit (MRR, Runs 7d, Success %, Cost/run, Saved h)
- **AgentCard / TemplateCard** – status-badge, CTA:t
- **RunStream** – SSE-timeline + logi-paneeli
- **FlowCanvas** – solmut/edget, zoom, snap-to-grid
- **EmptyState** – ikonit, vinkit, CTA
- **Toast / InlineHint** – proaktiiviset ehdotukset

## Käyttöohje
- Pidä komponentit “headless-friendly” (propseilla ohjattavat tilat).
- Älä tee raskaita datahakuja suoraan komponenteissa; ohjaa propseina.
- Client-komponentti vain kun pakko (SSE, drag-drop, editorit).
