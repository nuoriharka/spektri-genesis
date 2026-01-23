export type BrandLogo = { slug: string; label: string; href: string };

export const CORE_LOGOS: BrandLogo[] = [
  { slug: "openai",     label: "OpenAI",     href: "https://openai.com" },
  { slug: "anthropic",  label: "Anthropic",  href: "https://www.anthropic.com" },
  { slug: "google",     label: "Google",     href: "https://www.google.com" },
  { slug: "microsoft",  label: "Microsoft",  href: "https://www.microsoft.com" },
  { slug: "github",     label: "GitHub",     href: "https://github.com" },
  { slug: "stripe",     label: "Stripe",     href: "https://stripe.com" },
  { slug: "vercel",     label: "Vercel",     href: "https://vercel.com" },
  { slug: "supabase",   label: "Supabase",   href: "https://supabase.com" },
];