import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { coupons } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  const body = await request.json()
  const code = String(body.code ?? "").trim().toUpperCase()
  const discountType = body.discountType === "fixed" ? "fixed" : "percent"
  const discountValue = Number(body.discountValue)
  const minOrder = Number(body.minOrder || 0)
  const maxUses = body.maxUses == null || body.maxUses === "" ? null : Number(body.maxUses)
  if (!/^[A-Z0-9_-]{3,40}$/.test(code) || !Number.isInteger(discountValue) || discountValue <= 0 || (discountType === "percent" && discountValue > 100) || !Number.isInteger(minOrder) || minOrder < 0 || (maxUses !== null && (!Number.isInteger(maxUses) || maxUses < 1))) return NextResponse.json({ error: "Confira o código e os valores informados." }, { status: 400 })
  const [existing] = await db.select({ id: coupons.id }).from(coupons).where(eq(coupons.code, code))
  if (existing) return NextResponse.json({ error: "Esse código de cupom já existe." }, { status: 409 })
  const expiresAt = body.expiresAt ? new Date(body.expiresAt) : null
  if (expiresAt && Number.isNaN(expiresAt.getTime())) return NextResponse.json({ error: "Data de validade inválida." }, { status: 400 })
  const [created] = await db.insert(coupons).values({ code, discountType, discountValue, minOrder, maxUses, expiresAt, active: true }).returning({ id: coupons.id, code: coupons.code })
  return NextResponse.json(created, { status: 201 })
}

export async function PUT(request: Request) {
  const { code, subtotal } = await request.json()
  const normalized = String(code ?? "").trim().toUpperCase(); const amount = Number(subtotal)
  if (!normalized || !Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: "Cupom ou subtotal inválido" }, { status: 400 })
  const [coupon] = await db.select().from(coupons).where(and(eq(coupons.code, normalized), eq(coupons.active, true)))
  if (!coupon) return NextResponse.json({ error: "Cupom inválido" }, { status: 404 })
  const now = new Date()
  if ((coupon.startsAt && coupon.startsAt > now) || (coupon.expiresAt && coupon.expiresAt < now) || (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) || amount < coupon.minOrder) return NextResponse.json({ error: "Cupom expirado, esgotado ou indisponível para este valor" }, { status: 422 })
  const discount = coupon.discountType === "percent" ? Math.min(amount, Math.round(amount * coupon.discountValue / 100)) : Math.min(amount, coupon.discountValue)
  return NextResponse.json({ code: coupon.code, discount, total: amount - discount })
}
