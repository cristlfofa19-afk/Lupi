"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Search, ShoppingBag, Menu, Heart, MessageCircle, Sparkles, ArrowUpRight, Tag, ShieldCheck } from "lucide-react"

type Product = { id:number; name:string; description:string; price:number; promotionalPrice:number|null; imageUrls:string[]; badge:string|null; categoryName:string|null; stock:number }
const money = (cents:number) => new Intl.NumberFormat("pt-BR", { style:"currency", currency:"BRL" }).format(cents / 100)

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const filtered = useMemo(() => products.filter(p => `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())), [products, query])

  useEffect(() => { fetch("/api/products").then(r => r.ok ? r.json() : { products: [] }).then(data => setProducts(data.products ?? [])) }, [])

  const whatsapp = (product?: Product) => {
    const text = product ? `Olá! Vim pelo catálogo da LUPITA SHOPEE e quero fazer um pedido.\n\nProduto: ${product.name}\nCategoria: ${product.categoryName ?? "Geral"}\nQuantidade: 1\nMeu @ no jogo:\nCupom utilizado: nenhum\nValor do pedido: ${money(product.promotionalPrice ?? product.price)}\nComprovante do pagamento: vou enviar na conversa.` : "Olá! Vim pelo catálogo da LUPITA SHOPEE e quero fazer um pedido." 
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
  }

  return <main className="storefront">
    <header className="store-header">
      <a href="#inicio" className="logo" aria-label="Lupita Shopee"><span className="logo-heart"><Heart fill="currentColor" /></span><span>LUPITA <b>SHOPEE</b></span></a>
      <nav className={menuOpen ? "main-nav open" : "main-nav"}><a href="#produtos">Produtos</a><a href="#promocoes">Promoções</a><a href="#novidades">Novidades</a><a href="#sobre">Sobre</a></nav>
      <div className="header-actions"><button aria-label="Pesquisar" onClick={() => document.getElementById("search")?.focus()}><Search /></button><button aria-label="Carrinho"><ShoppingBag /></button><button className="menu-toggle" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button></div>
    </header>

    <section className="hero-store" id="inicio"><div className="hero-copy-store"><p className="store-kicker"><Sparkles /> PRESENTES COM PERSONALIDADE</p><h1>Seu próximo <em>presente</em> começa aqui.</h1><p>Escolha produtos únicos, finalize com Pix e conte com atendimento humano em cada etapa.</p><div className="hero-buttons"><a className="neon-button" href="#produtos">VER PRODUTOS <ArrowUpRight /></a><button className="ghost-button" onClick={() => whatsapp()}>FALE CONOSCO <MessageCircle /></button></div></div><div className="hero-art"><div className="art-glow" /><Image src="/images/lupita-brand.jpg" alt="Personagem futurista da Lupita Shopee" fill priority sizes="(max-width: 760px) 90vw, 48vw" /></div></section>

    <section className="trust-strip"><span><ShieldCheck /> Pagamento validado</span><span><Heart /> Atendimento humano</span><span><Tag /> Compra protegida</span></section>

    <section className="catalog-section" id="produtos"><div className="section-heading"><div><p className="store-kicker">ENCONTRE SEU CAMINHO</p><h2>Escolha seu próximo presente</h2></div><div className="search-box"><Search /><input id="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar produtos..." aria-label="Buscar produtos" /></div></div><div className="category-pills"><button className="active">Todos</button><button>Presentes</button><button>Promoções</button><button>Novidades</button></div><div className="product-grid">{filtered.length ? filtered.map(product => <article className="product-card" key={product.id}><div className="product-image">{product.imageUrls?.[0] ? <Image src={product.imageUrls[0]} alt={product.name} fill sizes="(max-width: 760px) 90vw, 30vw" /> : <span>LUPITA</span>}{product.badge && <b className="product-badge">{product.badge}</b>}</div><div className="product-info"><p>{product.categoryName ?? "LUPITA SHOPEE"}</p><h3>{product.name}</h3><span className="product-price">{money(product.promotionalPrice ?? product.price)}</span>{product.promotionalPrice && <del>{money(product.price)}</del>}<button className="product-order" onClick={() => whatsapp(product)}>PEDIR PELO WHATSAPP <ArrowUpRight /></button></div></article>) : <div className="empty-products"><Sparkles /><h3>Seu próximo achado está chegando</h3><p>Cadastre produtos no painel administrativo para eles aparecerem aqui.</p><a href="/admin">Abrir painel admin</a></div>}</div></section>

    <section className="promo-section" id="promocoes"><div><p className="store-kicker">OFERTAS ESPECIAIS</p><h2>Um presente do seu jeito.</h2><p>Use seu cupom e transforme sua próxima compra em uma experiência inesquecível.</p><a className="neon-button" href="#produtos">APROVEITAR OFERTA <ArrowUpRight /></a></div><div className="promo-orb" /></section>
    <footer id="sobre"><div className="logo">LUPITA <b>SHOPEE</b></div><p>Presentes com personalidade, atendimento de verdade.</p><div className="footer-links"><a href="#produtos">Produtos</a><a href="#promocoes">Promoções</a><a href="/admin">Administração</a></div><small>© 2026 Lupita Shopee. Todos os direitos reservados.</small></footer><button className="whatsapp-float" onClick={() => whatsapp()} aria-label="Falar no WhatsApp"><MessageCircle /> WhatsApp</button>
  </main>
}
