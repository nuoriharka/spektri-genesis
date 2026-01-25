import React from 'react';


export default function HeroSection() {
  return (
    <div className="bg-background py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Sinulla on idea. Me annamme sille armeijan.</h1>
        <p className="text-lg text-muted-foreground mb-8">Muuta tavoitteesi tuloksiksi keskustelemalla. Ensimmäinen digitaalinen työntekijäsi alle 60 sekunnissa.</p>
        <div className="flex gap-4 justify-center mb-12">
          <a href="/signup" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow hover:bg-primary/80 transition">Aloita ilmaiseksi</a>
          <a href="/demo" className="px-6 py-3 border border-primary text-primary rounded-xl font-semibold shadow hover:bg-primary hover:text-white transition">Katso demo</a>
        </div>
        <img src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120" alt="background" className="mx-auto rounded-2xl shadow-lg mb-8" style={{maxWidth: '600px'}} />
        <div className="grid grid-cols-4 gap-8 items-center justify-center mt-8">
          <img src="https://html.tailus.io/blocks/customers/openai.svg" alt="OpenAI Logo" className="h-8 mx-auto" />
          <img src="https://html.tailus.io/blocks/customers/google.svg" alt="Google Logo" className="h-8 mx-auto" />
          <img src="https://html.tailus.io/blocks/customers/anthropic.svg" alt="Anthropic Logo" className="h-8 mx-auto" />
          <img src="https://html.tailus.io/blocks/customers/microsoft.svg" alt="Microsoft Logo" className="h-8 mx-auto" />
        </div>
      </div>
  );
    </div>
  );
}
