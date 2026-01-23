"use client";
import VideoLoop from "@/components/ui/VideoLoop";
import { IntegrationsMarquee } from "@/components/marketing/IntegrationsMarquee";

export default function IntegrationsSection(){
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl">
        <VideoLoop
          srcMp4="/videos/integrations.mp4"
          label="Integrations demo"
          className="mt-6"
        />
        <IntegrationsMarquee speed={22} />
      </div>
    </section>
  );
}
