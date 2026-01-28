import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import MarketingFooter from '@/components/marketing/Footer'
import "@/styles/themes.css";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { Suspense } from "react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Topbar/header removed: now rendered globally in src/app/layout.tsx */}
      {children}
      <footer role="contentinfo">
        <MarketingFooter />
      </footer>
    </>
  );
}

