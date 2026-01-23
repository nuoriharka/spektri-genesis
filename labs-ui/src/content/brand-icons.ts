import { siStripe } from "simple-icons/icons";
import { siOpenai } from "simple-icons/icons";
import { siGoogle } from "simple-icons/icons";
import { siAnthropic } from "simple-icons/icons";
import { siGithub } from "simple-icons/icons";
import { siVercel } from "simple-icons/icons";
import { siMicrosoft } from "simple-icons/icons";
import { siSlack } from "simple-icons/icons";
import { siNotion } from "simple-icons/icons";
import { siHubspot } from "simple-icons/icons";
import { siShopify } from "simple-icons/icons";

export type BrandIcon = {
  id: string; label: string;
  path: string; viewBox?: string; hex?: string;
};

export const BRAND_ICONS: BrandIcon[] = [
  { id:"stripe",     label:"Stripe",     path: siStripe.path,     hex: `#${siStripe.hex}` },
  { id:"openai",     label:"OpenAI",     path: siOpenai.path,     hex: `#${siOpenai.hex}` },
  { id:"google",     label:"Google",     path: siGoogle.path,     hex: `#${siGoogle.hex}` },
  { id:"anthropic",  label:"Anthropic",  path: siAnthropic.path,  hex: `#${siAnthropic.hex}` },
  { id:"github",     label:"GitHub",     path: siGithub.path,     hex: `#${siGithub.hex}` },
  { id:"vercel",     label:"Vercel",     path: siVercel.path,     hex: `#${siVercel.hex}` },
  { id:"microsoft",  label:"Microsoft",  path: siMicrosoft.path,  hex: `#${siMicrosoft.hex}` },
  { id:"slack",      label:"Slack",      path: siSlack.path,      hex: `#${siSlack.hex}` },
  { id:"notion",     label:"Notion",     path: siNotion.path,     hex: `#${siNotion.hex}` },
  { id:"hubspot",    label:"HubSpot",    path: siHubspot.path,    hex: `#${siHubspot.hex}` },
  { id:"shopify",    label:"Shopify",    path: siShopify.path,    hex: `#${siShopify.hex}` },
];
