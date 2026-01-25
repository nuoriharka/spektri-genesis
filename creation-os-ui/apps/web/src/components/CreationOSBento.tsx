"use client";
import { Share2Icon } from "lucide-react";
import {
  FileTextIcon,
  InputIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import AnimatedBeamMultipleOutputDemo from "@/registry/example/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/registry/example/animated-list-demo";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";

const documents = [
  {
    name: "Marketing_Plan.md",
    body: "Q3 campaigns focus on new segments and content delivery.",
  },
  {
    name: "Sales_Report_Q2.pdf",
    body: "Revenue grew 15% with strongest traction in Europe.",
  },
  {
    name: "UI_Prototype_v2.fig",
    body: "A new dashboard emphasizing the most important metrics.",
  },
  {
    name: "Backend_API_spec.json",
    body: '{"openapi": "3.0.0", "info": {"title": "Creation OS Agent API", "version": "1.0.0"}}',
  },
  {
    name: "Customer_Feedback.xlsx",
    body: "Customers want faster HubSpot integration.",
  },
];

const features = [
  {
    Icon: MixerHorizontalIcon,
    name: "Agent Farms — Digital Workforce",
    description:
      "Compose specialized agents that collaborate on complex processes.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Meta Orchestration",
    description:
      "Creation OS selects the best models and tools for every task.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-5 md:gap-6 opacity-90">
          <img src="/logos/openai.svg" alt="OpenAI" className="h-6 w-auto object-contain" />
          <img src="/logos/google.svg" alt="Google" className="h-6 w-auto object-contain" />
          <img src="/logos/anthropic.svg" alt="Anthropic" className="h-6 w-auto object-contain" />
          <img src="/logos/microsoft.svg" alt="Microsoft" className="h-6 w-auto object-contain" />
          <img src="/logos/github.svg" alt="GitHub" className="h-6 w-auto object-contain" />
          <img src="/logos/figma.svg" alt="Figma" className="h-6 w-auto object-contain" />
        </div>
      </div>
    ),
  },
  {
    Icon: InputIcon,
    name: "Idea to Application",
    description:
      "Describe intent and get UI, code, and deployment.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Mission Control & Living Docs",
    description:
      "One view for state, cost, and execution.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {documents.map((doc, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-white/10 bg-white/5 hover:bg-white/10",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium text-white ">
                  {doc.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs text-white/80">{doc.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
];

export function CreationOSBento(): JSX.Element {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default CreationOSBento;
