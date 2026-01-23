import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/themes.css'
import { Analytics } from '@vercel/analytics/react'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { initTelemetry } from '@/lib/telemetry'
import { cn } from '@/lib/utils'
import Footer from '@/components/Footer'
import ClientBoot from '@/components/ClientBoot'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Noto Sans',
    'Ubuntu',
    'Cantarell',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
})

const resolvedBaseUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_BASE_URL?.trim()
  if (explicit) return explicit.startsWith('http') ? explicit : `https://${explicit}`
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return vercel.startsWith('http') ? vercel : `https://${vercel}`
  return 'http://localhost:3001'
})()

export const metadata: Metadata = {
  metadataBase: new URL(resolvedBaseUrl),
  title: {
    default: 'Spektri.Labs UI',
    template: '%s · Spektri.Labs',
  },
  description:
    'Ammattimainen käyttöliittymäkirjasto ja demo, rakennettu shadcn/ui-komponenteilla.',
  applicationName: 'Spektri.Labs UI',
  authors: [{ name: 'Spektri.Labs' }],
  keywords: ['Spektri', 'UI', 'shadcn', 'Next.js', 'Tailwind'],
  icons: { icon: '/brand/favicon.svg' },
  openGraph: {
    title: 'Spektri.Labs UI',
    description: 'Ammattimainen käyttöliittymäkirjasto ja demo, rakennettu shadcn/ui-komponenteilla.',
    url: resolvedBaseUrl,
    siteName: 'Spektri.Labs UI',
    images: [
      { url: '/images/og/og-home.png', width: 1200, height: 630, alt: 'Spektri Labs UI' },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spektri.Labs UI',
    description:
      'Ammattimainen käyttöliittymäkirjasto ja demo, rakennettu shadcn/ui-komponenteilla.',
    site: '@spektri',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1020' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://vitals.vercel-insights.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Spektri.Labs',
              url: resolvedBaseUrl,
              logo: `${resolvedBaseUrl}/brand/favicon.svg`,
            }),
          }}
        />
        <script
          id="ld-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Spektri.Labs UI',
              url: resolvedBaseUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${resolvedBaseUrl}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {try {var mq = window.matchMedia('(prefers-reduced-motion: reduce)'); var apply = (v) => document.documentElement.classList.toggle('reduced-motion', !!v); apply(mq.matches); mq.addEventListener && mq.addEventListener('change', (e)=> apply(e.matches));} catch (e) {}})();`
          }}
        />
      </head>
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>
          {/* Client boot: runs telemetry + sets hydrated class on the client */}
          {/* This avoids using client hooks in a server component */}
          <ClientBoot />
          <div className="relative flex min-h-screen flex-col bg-black text-white">
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 z-50 rounded-md bg-background px-3 py-2 text-sm text-foreground">
              Siirry sisältöön
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
          <ServiceWorkerRegister />
        </Providers>
      </body>
    </html>
  )
}

