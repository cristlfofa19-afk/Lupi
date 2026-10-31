import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function POST(request: Request) { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 }); const form = await request.formData(); const file = form.get("file"); if (!(file instanceof File)) return NextResponse.json({ error: "Arquivo ausente" }, { status: 400 }); if (file.size > 15 * 1024 * 1024) return NextResponse.json({ error: "Arquivo maior que 15MB" }, { status: 413 }); const blob = await put(`lupita/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`, file, { access: "public" }); return NextResponse.json({ url: blob.url }) }
