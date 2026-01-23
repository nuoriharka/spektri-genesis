import { redirect } from "next/navigation";

export const dynamic = "force-static";

export default function AppAliasPage() {
  // Alias old /app path to dashboard
  redirect("/dashboard");
}
