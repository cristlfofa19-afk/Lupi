import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin")
  return <AdminDashboard userName={session.user.name} />
}
