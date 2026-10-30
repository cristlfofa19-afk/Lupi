import Link from "next/link"

export default function Home() {
  return (
    <main className="page-shell">
      <nav className="nav" aria-label="Navegação principal">
        <Link className="brand" href="/" aria-label="Lupi, página inicial">
          <span className="brand-mark">L</span>
          <span>Lupi</span>
        </Link>
        <span className="status">Online na Vercel</span>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow">Seu próximo começo</div>
        <h1 id="hero-title">O projeto Lupi está pronto para abrir.</h1>
        <p className="intro">
          Uma base rápida, responsiva e preparada para evoluir com o seu produto.
        </p>
        <div className="actions">
          <a className="button button-primary" href="#recursos">Conhecer o projeto</a>
          <a className="button button-secondary" href="https://vercel.com" target="_blank" rel="noreferrer">Visitar Vercel</a>
        </div>
      </section>

      <section id="recursos" className="feature-grid" aria-label="Recursos do projeto">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h2>Pronto para publicar</h2>
          <p>Estrutura Next.js configurada para build e deploy na Vercel.</p>
        </article>
        <article className="feature-card">
          <span className="feature-number">02</span>
          <h2>Leve e responsivo</h2>
          <p>Uma experiência clara em telas grandes, tablets e celulares.</p>
        </article>
        <article className="feature-card">
          <span className="feature-number">03</span>
          <h2>Fácil de evoluir</h2>
          <p>Componentes simples e uma base organizada para os próximos passos.</p>
        </article>
      </section>

      <footer className="footer">Lupi · Construído com Next.js</footer>
    </main>
  )
}
