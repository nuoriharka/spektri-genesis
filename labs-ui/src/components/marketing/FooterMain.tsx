export default function FooterMain() {
  return (
    <footer className="py-10 border-t text-center text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <span>© 2025 Spektri.Labs. All rights reserved.</span>
        <span className="mx-2">·</span>
        <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>
        <span className="mx-2">·</span>
        <a href="/terms" className="underline hover:text-primary">Terms of Service</a>
      </div>
    </footer>
  )
}
