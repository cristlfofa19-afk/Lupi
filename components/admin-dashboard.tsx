"use client"

import { FormEvent, useState } from "react"
import { LayoutDashboard, PackagePlus, TicketPercent, LogOut, Sparkles } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export function AdminDashboard({ userName }: { userName: string }) {
  const [active, setActive] = useState("overview")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function addProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setMessage("")
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const response = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, price: Math.round(Number(data.price) * 100), stock: Number(data.stock) }) })
    setLoading(false); setMessage(response.ok ? "Produto salvo no catálogo." : "Não foi possível salvar o produto.")
    if (response.ok) e.currentTarget.reset()
  }

  async function addCoupon(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setMessage("")
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const response = await fetch("/api/coupons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: data.code, discountType: data.discountType, discountValue: Number(data.discountValue), minOrder: Math.round(Number(data.minOrder || 0) * 100), maxUses: data.maxUses ? Number(data.maxUses) : null, expiresAt: data.expiresAt || null }) })
    const result = await response.json().catch(() => null)
    setLoading(false); setMessage(response.ok ? "Cupom criado e pronto para uso." : result?.error || "Não foi possível criar o cupom.")
    if (response.ok) e.currentTarget.reset()
  }

  async function signOut() { await authClient.signOut(); window.location.href = "/admin" }

  return <main className="dashboard"><aside className="dashboard-side"><div className="logo">LUPITA <b>SHOPEE</b></div><p className="side-caption">CENTRAL DE CONTROLE</p><button className={active === "overview" ? "side-link active" : "side-link"} onClick={() => setActive("overview")}><LayoutDashboard /> Visão geral</button><button className={active === "product" ? "side-link active" : "side-link"} onClick={() => setActive("product")}><PackagePlus /> Produtos</button><button className={active === "coupon" ? "side-link active" : "side-link"} onClick={() => setActive("coupon")}><TicketPercent /> Cupons</button><button className="side-link logout" onClick={signOut}><LogOut /> Sair</button></aside><section className="dashboard-content"><header className="dashboard-header"><div><p className="store-kicker"><Sparkles /> PAINEL LUPITA SHOPEE</p><h1>Olá, {userName}.</h1></div><span className="secure-pill">Sessão segura</span></header>{active === "overview" && <div className="stats-grid"><div className="stat-card"><small>CATÁLOGO</small><strong>Gerencie sua vitrine</strong><p>Produtos, imagens, vídeos e estoque em um só lugar.</p><button className="neon-button" onClick={() => setActive("product")}>Adicionar produto</button></div><div className="stat-card"><small>MARKETING</small><strong>Ative seus cupons</strong><p>Crie descontos e acompanhe o desempenho das ofertas.</p><button className="ghost-button" onClick={() => setActive("coupon")}>Gerenciar cupons</button></div></div>}{active === "product" && <div className="admin-panel"><h2>Novo produto</h2><p>Cadastre um item para aparecer imediatamente no catálogo.</p><form onSubmit={addProduct} className="admin-form"><input name="name" placeholder="Nome do produto" required /><textarea name="description" placeholder="Descrição completa" required /><div className="form-row"><input name="price" type="number" step="0.01" placeholder="Preço (R$)" required /><input name="stock" type="number" placeholder="Quantidade" required /></div><input name="imageUrls" placeholder="URL da imagem (opcional)" /><button className="neon-button" disabled={loading}>{loading ? "Salvando..." : "SALVAR PRODUTO"}</button></form>{message && <p className="success-message">{message}</p>}</div>}{active === "coupon" && <div className="admin-panel"><h2>Novo cupom</h2><p>Crie um desconto e ele será validado no servidor antes do pedido.</p><form onSubmit={addCoupon} className="admin-form"><input name="code" placeholder="Código, ex.: LUPITA10" required pattern="[A-Za-z0-9_-]+" /><div className="form-row"><select name="discountType" defaultValue="percent"><option value="percent">Porcentagem (%)</option><option value="fixed">Valor fixo (R$)</option></select><input name="discountValue" type="number" min="1" step="1" placeholder="Desconto" required /></div><div className="form-row"><input name="minOrder" type="number" min="0" step="0.01" placeholder="Pedido mínimo (R$)" /><input name="maxUses" type="number" min="1" step="1" placeholder="Limite de usos" /></div><label className="date-label">Validade<input name="expiresAt" type="datetime-local" /></label><button className="neon-button" disabled={loading}>{loading ? "Criando..." : "CRIAR CUPOM"}</button></form>{message && <p className={message.includes("criado") ? "success-message" : "form-error"}>{message}</p>}</div>}</section></main>
}
