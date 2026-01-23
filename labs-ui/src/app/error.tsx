"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Jokin meni pieleen</h1>
        <p className="text-muted-foreground mb-6">
          Odottamaton virhe tapahtui. Yritä uudelleen tai palaa etusivulle.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center rounded-full bg-primary px-5 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Yritä uudelleen
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full border border-input px-5 hover:bg-accent"
          >
            Etusivulle
          </Link>
        </div>
      </div>
    </div>
  );
}
