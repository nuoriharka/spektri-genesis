/**
 * Enforce importing chart primitives only from our shadcn/ui chart module.
 */
module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "recharts",
            message:
              "Import chart primitives from '@/components/ui/chart' instead of 'recharts'.",
          },
        ],
        patterns: [
          {
            group: ["recharts/*"],
            message:
              "Import chart primitives from '@/components/ui/chart' instead of 'recharts/*'.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["src/components/ui/chart.ts", "src/components/ui/chart.tsx"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
  ],
}
