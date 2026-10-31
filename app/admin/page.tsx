"use client"

import { FormEvent, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { LockKeyhole, Sparkles } from "lucide-react"

export default function AdminPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [name, setName] = useState(""); const [mode, setMode] = useState<"login" | "signup">("login"); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false)
  async function submit(e: FormEvent) { e.preventDefault(); setLoading(true); setMessage(""); const result = mode === "login" ? await authClient.signIn.email({ email, password }) : await authClient.signUp.email({ email, password, name }); setLoading(false); if (result.error) { setMessage("Não foi possível concluir. Confira os dados e tente novamente."); return } window.location.href = "/admin/dashboard" }
  return <main className="admin-page"><div className="admin-card"><Sparkles className="admin-spark" /><p className="store-kicker">LUPITA SHOPEE · ADMIN</p><h1>{mode === "login" ? "Bem-vinda de volta." : "Criar acesso seguro."}</h1><p className="admin-subtitle">Gerencie produtos, cupons, banners e pedidos da sua loja.</p><form onSubmit={submit}>{mode === "signup" && <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required /> }<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" minLength={8} required /><button className="neon-button" disabled={loading}><LockKeyhole /> {loading ? "Entrando..." : mode === "login" ? "ENTRAR NO PAINEL" : "CRIAR CONTA"}</button>{message && <p className="form-error">{message}</p>}</form><button className="switch-auth" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Primeiro acesso? Criar conta" : "Já tenho uma conta"}</button></div></main>
}
