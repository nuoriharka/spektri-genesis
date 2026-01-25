import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/themes.css'
import { Analytics } from '@vercel/analytics/react'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'
import { Providers } from './providers'
import { initTelemetry } from '@/lib/telemetry'
import { cn } from '@/lib/utils'
import Footer from '@/components/Footer'
import CommandPalette from '@/components/CommandPalette'
import ClientBoot from '@/components/ClientBoot'
import { computeHealth } from '@/lib/health'
import { initDataStore } from '@/lib/store'

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
    default: 'Creation OS UI',
    template: '%s · Creation OS UI',
  },
  description: 'Creation OS UI — the control surface for Genesis.',
  applicationName: 'Creation OS UI',
  authors: [{ name: 'Creation OS' }],
  keywords: ['Creation OS', 'Creation OS UI', 'Genesis', 'UI', 'Next.js', 'Tailwind'],
  icons: { icon: '/brand/favicon.svg' },
  openGraph: {
    title: 'Creation OS UI',
    description: 'Creation OS UI — the control surface for Genesis.',
    url: resolvedBaseUrl,
    siteName: 'Creation OS UI',
    images: [
      { url: '/images/og/og-home.png', width: 1200, height: 630, alt: 'Creation OS UI' },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creation OS UI',
    description: 'Creation OS UI — the control surface for Genesis.',
    site: '@creationos',
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await initDataStore()
  const health = await computeHealth()
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
              name: 'Creation OS',
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
              name: 'Creation OS',
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
            <div className="border-b border-[#111]">
              <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-200">CREATION OS</div>
                <div className="text-xs text-zinc-500">Status: {health.status}</div>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-6xl flex-1">
              <aside className="w-48 border-r border-[#111] px-4 py-6 text-xs text-zinc-500">
                <nav className="space-y-3">
                  <a href="/" className="block hover:text-zinc-200">Dashboard</a>
                  <a href="/chat" className="block hover:text-zinc-200">Chat</a>
                  <a href="/projects" className="block hover:text-zinc-200">Projects</a>
                  <a href="/actions" className="block hover:text-zinc-200">Actions</a>
                  <a href="/operations" className="block hover:text-zinc-200">Operations</a>
                  <a href="/assets" className="block hover:text-zinc-200">Assets</a>
                  <a href="/system" className="block hover:text-zinc-200">System</a>
                  <a href="/status" className="block hover:text-zinc-200">Status</a>
                </nav>
              </aside>
              <main id="main" tabIndex={-1} className="flex-1 px-6">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <CommandPalette />
          <Analytics />
          <ServiceWorkerRegister />
        </Providers>
      </body>
    </html>
  )
}

