"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Balancer } from "react-wrap-balancer";
import { cn } from "@/lib/utils";
import LogoCloud from "@/components/logo-cloud";
import FeaturesSection2 from "@/components/FeaturesSection2";
import Section3Integrations from "@/components/Section3Integrations";
import SectionVisionMission from "@/components/SectionVisionMission";
import SectionCTA from "@/components/SectionCTA";
import Footer from "@/components/Footer";

// Logo component
const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Creation OS logomark">
      <defs>
        <linearGradient id="logo-gradient-live" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6D6AFF"/>
          <stop offset="100%" stopColor="#22D3EE"/>
        </linearGradient>
      </defs>
      <path d="M 44 10 C 34 2, 16 2, 16 12 C 16 20, 28 20, 28 28 C 28 36, 16 36, 16 44 C 16 54, 34 54, 44 46" fill="none" stroke="url(#logo-gradient-live)" strokeWidth="6" strokeLinecap="round"/>
    </svg>
    <span className="font-bold text-lg text-gray-900 dark:text-white">Creation OS</span>
  </div>
);

// Header + hero
const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Ominaisuudet', href: '#ominaisuudet' },
    { name: 'Ratkaisut', href: '#ratkaisut' },
    { name: 'Hinnoittelu', href: '#hinnoittelu' },
    { name: 'Meistä', href: '#' },
  ]

  return (
    <header>
      <nav data-state={menuState ? 'active' : 'inactive'} className="fixed z-50 w-full px-2">
        <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/80 max-w-5xl rounded-2xl border border-white/10 backdrop-blur-lg lg:px-5')}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home page">
                <Logo />
              </Link>
              <button onClick={() => setMenuState(!menuState)} aria-label={menuState ? 'Close Menu' : 'Open Menu'} className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className={cn("m-auto size-6 duration-200", menuState && 'rotate-180 scale-0 opacity-0')} />
                <X className={cn("absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200", menuState && 'rotate-0 scale-100 opacity-100')} />
              </button>
            </div>
            <div className={cn("absolute inset-0 m-auto hidden size-fit lg:block", isScrolled ? 'block' : 'hidden')}>
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn("bg-background mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-zinc-950/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none", menuState ? 'block' : 'hidden')}>
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <a href="#" className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2", "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground", isScrolled && 'lg:hidden')}>
                  Kirjaudu sisään
                </a>
                <a href="#" className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2", "bg-primary text-primary-foreground hover:bg-primary/90", isScrolled && 'lg:hidden')}>
                  Aloita ilmaiseksi
                </a>
                <a href="#" className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2", "bg-primary text-primary-foreground hover:bg-primary/90", isScrolled ? 'lg:inline-flex' : 'hidden')}>
                  Aloita Nyt
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const HeroSection = () => (
  <section>
    <div className="relative pt-24 md:pt-36">
      <div aria-hidden className="absolute inset-0 -z-20 isolate hidden opacity-65 contain-strict lg:block">
        <div className="w-[87.5rem] h-[200rem] -translate-y-[54.6875rem] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-[200rem] absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] translate-x-[5%] -translate-y-1/2" />
        <div className="h-[200rem] -translate-y-[54.6875rem] absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>
      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,#030712_75%)]"></div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
          <Link href="#" className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
            <span className="text-foreground text-sm">Yksi Alusta. Rajaton Potentiaali.</span>
            <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
            <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
              <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
              </div>
            </div>
          </Link>
          <h1 className="mt-8 text-balance text-5xl font-bold md:text-7xl lg:mt-16 xl:text-[5.25rem]">
            <Balancer>Anna tavoite. Agentit hoitavat työn.</Balancer>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
            Muunna ideat ja prosessit tuotantovalmiiksi automaatioksi luonnollisella kielellä. Aja ensimmäinen työnkulku alle 60 sekunnissa.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row">
            <div className="bg-foreground/10 rounded-[calc(0.75rem+0.125rem)] border p-0.5">
              <a href="#" className="inline-flex items-center justify-center rounded-xl px-5 text-base h-12 font-medium btn-creation-os focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Rakenna ensimmäinen agenttisi
              </a>
            </div>
            <a href="#" className="inline-flex items-center justify-center rounded-xl px-5 h-[3.25rem] text-base font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Katso 60s demo
            </a>
          </div>
        </div>
      </div>
      <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
        <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background" />
        <div className="shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] ring-background dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
          <Image
            className="bg-background aspect-[15/8] relative rounded-2xl"
            src="/photos/hero-dashboard.png"
            alt="App screen"
            width={2700}
            height={1440}
            priority
          />
        </div>
      </div>
    </div>
  </section>
)

export default function LandingPage() {
  return (
    <>
      <HeroHeader />
      <main>
        <HeroSection />
        <LogoCloud />
        <SectionVisionMission />
        <FeaturesSection2 />
        <Section3Integrations />
        <SectionCTA />
      </main>
      <Footer />
    </>
  );
}
