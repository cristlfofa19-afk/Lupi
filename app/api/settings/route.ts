import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { shopSettings } from "@/lib/db/schema"

export async function PATCH(request: Request) { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 }); const body = await request.json(); const [settings] = await db.insert(shopSettings).values({ id: 1, storeName: String(body.storeName ?? "LUPITA SHOPEE"), description: String(body.description ?? ""), whatsappNumber: String(body.whatsappNumber ?? ""), whatsappMessage: String(body.whatsappMessage ?? "") }).onConflictDoUpdate({ target: shopSettings.id, set: { storeName: String(body.storeName ?? "LUPITA SHOPEE"), description: String(body.description ?? ""), whatsappNumber: String(body.whatsappNumber ?? ""), whatsappMessage: String(body.whatsappMessage ?? ""), updatedAt: new Date() } }).returning(); return NextResponse.json(settings) }
