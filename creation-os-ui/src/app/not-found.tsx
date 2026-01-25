import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <html lang="fi">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="max-w-md rounded-2xl bg-card p-8 shadow-xl">
          <h1 className="mb-4 text-2xl font-bold text-primary">404 – Sivua ei löytynyt</h1>
          <p className="mb-2 text-muted-foreground">Etsimääsi sivua ei löytynyt. Tarkista osoite tai palaa etusivulle.</p>
          <a href="/" className="btn-primary rounded-full px-4 py-2 font-semibold">Etusivulle</a>
        </div>
      </body>
    </html>
  );
}
