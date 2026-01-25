export type IntegrationItem = { name: string; href: string; logo: string; tag?: string };
export const INTEGRATIONS: IntegrationItem[] = [
  { name: "Google Drive", href: "https://drive.google.com", logo: "/logos/google-drive.svg", tag: "Storage" },
  { name: "Slack", href: "https://slack.com", logo: "/logos/slack.svg", tag: "Comms" },
  { name: "Notion", href: "https://notion.so", logo: "/logos/notion.svg", tag: "Docs" },
  { name: "HubSpot", href: "https://hubspot.com", logo: "/logos/hubspot.svg", tag: "CRM" },
  { name: "Shopify", href: "https://shopify.com", logo: "/logos/shopify.svg", tag: "Commerce" },
  { name: "GitHub", href: "https://github.com", logo: "/logos/github.svg", tag: "Dev" },
  { name: "Stripe", href: "https://stripe.com", logo: "/logos/stripe.svg", tag: "Payments" },
  { name: "Google Sheets", href: "https://sheets.google.com", logo: "/logos/google-sheets.svg", tag: "Analytics" },
];
