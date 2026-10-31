import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"

export async function POST(request: Request) { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 }); const body = await request.json(); const name = String(body.name ?? "").trim(); if (!name) return NextResponse.json({ error: "Informe o nome da categoria" }, { status: 400 }); const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); const [category] = await db.insert(categories).values({ name, slug, description: String(body.description ?? "") }).returning(); return NextResponse.json(category, { status: 201 }) }
