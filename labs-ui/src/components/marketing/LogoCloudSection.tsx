"use client";
import VideoLoop from "@/components/ui/VideoLoop";
import LogoCloud from "@/components/marketing/LogoCloud";

export default function LogoCloudSection(){
  return (
    <section className="relative py-6">
      <VideoLoop srcMp4="/videos/icon-cloud.mp4" poster="/posters/icon-cloud.jpg" className="absolute inset-0 opacity-30 pointer-events-none" label="Icon cloud background" />
      <div className="relative">
  <LogoCloud />
      </div>
    </section>
  );
}
