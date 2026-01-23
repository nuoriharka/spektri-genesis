export default function CtaPrimary() {
  return (
    <section className="py-16 text-center">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
          Ready to build your first agent?
        </h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          Start for free. No credit card required.
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg hover:scale-105 transition-transform"
        >
          Get Started
        </a>
      </div>
    </section>
  )
}
