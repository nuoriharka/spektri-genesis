import * as React from "react"
// Chart primitives re-exported for lint and type compliance
export {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend
} from "recharts";
// Minimal shadcn-style API surface so imports from '@/components/ui/chart' work
export type ChartConfig = {
	[k: string]: { label?: React.ReactNode; color?: string }
}

export function ChartContainer({
	config,
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	config: ChartConfig
	children: React.ReactNode
}) {
	// Inline CSS vars for keys used in config
	const styleVars = Object.fromEntries(
		Object.entries(config)
			.filter(([, v]) => !!v.color)
			.map(([key, v]) => [`--color-${key}`, (v as any).color as string])
	) as React.CSSProperties

		return React.createElement(
			"div",
			{ className, style: styleVars, ...(props as any) },
			children as any
		)
}

export const ChartTooltip = (_props: any) => null
export function ChartTooltipContent(_props: any) { return null }
export const ChartLegend = (_props: any) => null
export function ChartLegendContent(_props: any) { return null }
// Chart primitives re-exported for lint rule compliance
// Re-export chart primitives from recharts for lint compliance
// (actual import must be done via this file, not directly from 'recharts')
// Example:
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from '@/components/ui/chart';
