import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { categories, products } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export async function GET() { try { const rows = await db.select({ id: products.id, name: products.name, description: products.description, price: products.price, promotionalPrice: products.promotionalPrice, imageUrls: products.imageUrls, badge: products.badge, stock: products.stock, categoryName: categories.name }).from(products).leftJoin(categories, eq(products.categoryId, categories.id)).where(eq(products.active, true)).orderBy(desc(products.featured), desc(products.createdAt)); return NextResponse.json({ products: rows }) } catch (error) { console.error("[v0] catalog load failed", error); return NextResponse.json({ error: "Catálogo indisponível" }, { status: 500 }) } }

export async function POST(request: Request) { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 }); const body = await request.json(); const name = String(body.name ?? "").trim(); if (!name || !Number.isFinite(body.price) || body.price < 0) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 }); const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`; const imageUrls = Array.isArray(body.imageUrls) ? body.imageUrls.map(String) : []; const videoUrls = Array.isArray(body.videoUrls) ? body.videoUrls.map(String) : []; const [created] = await db.insert(products).values({ name, slug, description: String(body.description ?? ""), price: Math.round(body.price), stock: Math.max(0, Math.floor(Number(body.stock) || 0)), categoryId: body.categoryId ? Number(body.categoryId) : null, imageUrls, videoUrls, active: true }).returning({ id: products.id }); return NextResponse.json(created, { status: 201 }) }
