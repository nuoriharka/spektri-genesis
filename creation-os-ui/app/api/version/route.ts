export const dynamic = "force-dynamic"
import pkg from "../../../package.json"

export function GET() {
	return Response.json({
		ok: true,
		name: pkg.name,
		version: pkg.version,
		node: process.version,
		time: new Date().toISOString(),
	})
}

