"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AppError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const isDev = process.env.NODE_ENV !== "production";
  return (
    <html lang="fi">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="max-w-md rounded-2xl bg-card p-8 shadow-xl">
          <h1 className="mb-4 text-2xl font-bold text-destructive">Jokin meni pieleen</h1>
          <p className="mb-2 text-muted-foreground">Valitettavasti sovelluksessa tapahtui odottamaton virhe.</p>
          {isDev && (
            <pre className="mb-4 whitespace-pre-wrap break-words text-xs text-muted-foreground">{error?.stack || error?.message}</pre>
          )}
          <button
            className="btn-primary rounded-full px-4 py-2 font-semibold"
            onClick={() => {
              reset();
              router.refresh();
            }}
          >
            Yritä uudelleen
          </button>
        </div>
      </body>
    </html>
  );
}
