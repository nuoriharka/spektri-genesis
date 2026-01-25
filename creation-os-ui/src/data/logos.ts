// Manifest of logos in public/logos. Update when folder changes.
export const logos = [
  { src: '/logos/anthropic.svg', alt: 'Anthropic Logo' },
  { src: '/logos/figma.svg', alt: 'Figma Logo' },
  { src: '/logos/github.svg', alt: 'GitHub Logo' },
  { src: '/logos/google.svg', alt: 'Google Logo' },
  { src: '/logos/lovable.svg', alt: 'Lovable Logo' },
  { src: '/logos/meta.svg', alt: 'Meta Logo' },
  { src: '/logos/microsoft.svg', alt: 'Microsoft Logo' },
  { src: '/logos/openai.svg', alt: 'OpenAI Logo' },
  { src: '/logos/stripe.svg', alt: 'Stripe Logo' },
  { src: '/logos/tailwindcss.svg', alt: 'Tailwind CSS Logo' },
  { src: '/logos/vercel.svg', alt: 'Vercel Logo' },
  { src: '/logos/zapier.svg', alt: 'Zapier Logo' },
] as const
export type LogoItem = typeof logos[number]
