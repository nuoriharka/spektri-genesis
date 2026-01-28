import { ShimmerCTA } from "./ShimmerCTA";
export default function FinalCTA(){
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold">Valmiina vapauttamaan potentiaalisi?</h2>
      <p className="mt-3 text-white/70">Ensimmäinen digitaalinen työntekijäsi odottaa – ja se on ilmainen, ikuisesti.</p>
      <div className="mt-8 flex justify-center">
        <ShimmerCTA> Aloita ilmaiseksi ja rakenna tulevaisuutesi </ShimmerCTA>
      </div>
    </section>
  );
}
