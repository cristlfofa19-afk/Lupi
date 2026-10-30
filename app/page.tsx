import Link from "next/link"

function HeartIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" /></svg>
}

function MenuIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8.5h14l-.7 11H5.7L5 8.5Zm3.5 0a3.5 3.5 0 0 1 7 0" /></svg>
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
}

function ChatIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.4a7.4 7.4 0 0 1-7.8 7.3 8.2 8.2 0 0 1-3.5-.8L4 19l1.2-3.8a7.2 7.2 0 0 1-.9-3.5A7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 6.9Z" /></svg>
}

export default function Home() {
  return (
    <main className="shop-page">
      <header className="shop-header">
        <Link className="shop-brand" href="/" aria-label="Lupita Shopee, página inicial">
          <span className="brand-heart"><HeartIcon /></span>
          <span>LUPITA <strong>SHOPEE</strong></span>
        </Link>
        <button className="menu-button" type="button" aria-label="Abrir menu"><MenuIcon /></button>
        <button className="bag-button" type="button" aria-label="Abrir carrinho"><BagIcon /><span>0</span></button>
      </header>

      <section className="hero-shop" aria-labelledby="hero-title">
        <p className="eyebrow"><span className="sparkle">✧</span> EXPERIÊNCIAS ESCOLHIDAS PARA VOCÊ</p>
        <h1 id="hero-title">Seu próximo<br /><em>presente</em> começa<br />aqui.</h1>
        <p className="hero-copy">Escolha, finalize com Pix e acompanhe seu pedido com atendimento próximo em cada etapa.</p>
        <div className="hero-actions">
          <a className="buy-button" href="#categorias">Comprar agora <ArrowIcon /></a>
          <a className="whatsapp-button" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer"><ChatIcon /> Falar no WhatsApp</a>
        </div>
        <div className="trust-list" aria-label="Garantias da loja">
          <span>✓ <b>Pagamento validado</b></span>
          <span>✓ <b>Atendimento humano</b></span>
          <span>✓ <b>Compra protegida</b></span>
        </div>
      </section>

      <section className="gift-section" aria-label="Cartão presente">
        <div className="glow-orb" />
        <article className="gift-card">
          <span className="gift-logo">lupita</span>
          <strong>um presente<br />do seu jeito.</strong>
          <span className="gift-footer">LUPITA SHOPEE</span>
          <span className="pix-badge">PIX <b>✓</b></span>
        </article>
      </section>

      <section className="categories" id="categorias" aria-labelledby="categories-title">
        <p className="eyebrow">ENCONTRE SEU CAMINHO</p>
        <h2 id="categories-title">Compre por categoria</h2>
        <p className="category-copy">Selecione a modalidade ideal para o seu pedido.</p>
        <div className="category-grid">
          <a className="category-card active" href="#categorias"><small>00</small><strong>Todos</strong></a>
          <a className="category-card" href="#categorias"><small>01</small><strong>Via presente<br />c/prazo</strong><ArrowIcon /></a>
          <a className="category-card" href="#categorias"><small>06</small><strong>PROMOÇÃO<br />HALLOWEEN</strong><ArrowIcon /></a>
          <a className="category-card color-card" href="#categorias"><small>08</small><strong>Mais<br />escolhidos</strong><ArrowIcon /></a>
        </div>
      </section>
    </main>
  )
}
