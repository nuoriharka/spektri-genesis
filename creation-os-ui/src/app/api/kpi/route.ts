import { NextResponse } from "next/server"

export async function GET() {
  // Mock KPI values; replace with real data source later
  return NextResponse.json({
    mrr: 12340,
    runs7d: 128,
    successRate: 93,
    costPerRun: 0.07,
    savedHours: 54,
  })
}
