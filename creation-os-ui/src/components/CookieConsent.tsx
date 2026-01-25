"use client";
import { useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col items-center justify-between gap-2 rounded-xl bg-background/90 p-4 shadow-lg backdrop-blur-md md:flex-row md:gap-4 md:p-6">
      <span className="text-sm text-muted-foreground">
        Tämä sivusto käyttää evästeitä parhaan käyttökokemuksen varmistamiseksi.
      </span>
      <button
        className="btn-primary rounded-full px-4 py-2 text-sm font-semibold"
        onClick={() => setVisible(false)}
      >
        Hyväksy
      </button>
    </div>
  );
}
