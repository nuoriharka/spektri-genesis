"use client";

import React from 'react';
import { initTelemetry } from '@/lib/telemetry';

export default function ClientBoot() {
  React.useEffect(() => {
    try { initTelemetry(); } catch {}
    try {
      document.documentElement.classList.add('hydrated');
    } catch {}
  }, []);
  return null;
}
