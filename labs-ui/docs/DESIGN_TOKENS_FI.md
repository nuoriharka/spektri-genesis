# Design-tokenit (Tailwind + CSS variables)

Lisää `:root` CSS:ään:
```css
:root{
  --bg:#0B0C0E; --panel:#111316; --muted:#9BA3AF; --fg:#E7E9EC;
  --brand:#6D6AFF; --brand-2:#22D3EE;
  --success:#10B981; --warning:#F59E0B; --danger:#EF4444; --ring:#6D6AFF;
}
```

Tailwind-teema (esimerkki):
```ts
// tailwind.config.ts: theme.extend.colors = { bg:'#0B0C0E', panel:'#111316', ... }
```

Typografia: Inter / Plus Jakarta Sans; h1 30/36, h2 24/32, body 15/24.  
Spacing-skaala: 4,8,12,16,24,32,48.  
Kulmat: `rounded-2xl`; varjot: `shadow-[0_4px_24px_rgba(0,0,0,0.3)]`.
