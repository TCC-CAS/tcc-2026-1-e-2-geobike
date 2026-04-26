import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* ============ BARRA DE ANÚNCIO ============ */}
      <div className="announcement">
        🌱 Economia circular em Santo Amaro: <strong>já evitamos 2,4 toneladas</strong> de descarte neste mês.
      </div>

      {/* ============ CABEÇALHO / NAV ============ */}
      <header className="site-header">
        <div className="nav-top">
          <Link to="/" className="logo">
            <span className="logo-mark">SD</span>
            Santo <em>Desapego</em>
          </Link>

          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Buscar sofá, bicicleta, livro, notebook..." />
            <span className="search-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
              Santo Amaro, SP
            </span>
            <button className="search-btn">Buscar</button>
          </div>

          <nav className="nav-actions">
            <Link to="/login">Entrar</Link>
            <a href="#favoritos">Favoritos</a>
            <Link to="/cadastro" className="btn-sell">+ Anunciar grátis</Link>
          </nav>
        </div>

        <nav className="nav-categories">
          <a href="#todos" className="active">Todos</a>
          <a href="#moveis">Móveis & Casa</a>
          <a href="#eletronicos">Eletrônicos</a>
          <a href="#moda">Moda</a>
          <a href="#infantil">Infantil & Bebê</a>
          <a href="#livros">Livros</a>
          <a href="#esporte">Esporte & Lazer</a>
          <a href="#arte">Arte & Decoração</a>
          <a href="#ferramentas">Ferramentas</a>
          <a href="#brecho">Brechó vintage</a>
          <a href="#trocas">Trocas 🔄</a>
        </nav>
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-kicker">Economia compartilhada • Santo Amaro</span>
          <h1>Seu desapego <br />encontra uma <em>nova história</em> aqui perto.</h1>
          <p className="lede">Uma plataforma hiperlocal de compra, venda e troca entre vizinhos de Santo Amaro. Menos descarte, mais comunidade — e produtos com preço justo.</p>

          <div className="hero-cta-row">
            <a href="#produtos" className="btn-primary">
              Explorar desapegos
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="#como-funciona" className="btn-ghost">Como funciona</a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <span className="num">1.247</span>
              <span className="lbl">vizinhos ativos</span>
            </div>
            <div className="trust-item">
              <span className="num">3.590</span>
              <span className="lbl">itens circulando</span>
            </div>
            <div className="trust-item">
              <span className="num">4,9★</span>
              <span className="lbl">avaliação média</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" alt="Sofá" />
            <div className="price">R$ 480</div>
            <div className="hood">Sofá • Jardim Marajoara</div>
          </div>
          <div className="hero-card hero-card-2">
            <img src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=400&q=80" alt="Bicicleta" />
            <div className="price">R$ 120</div>
            <div className="hood">Bicicleta infantil • Campo Belo</div>
          </div>
          <div className="hero-card hero-card-3">
            <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80" alt="Livros" />
            <div className="price">R$ 35</div>
            <div className="hood">Livros • Vila Cruzeiro</div>
          </div>
          <div className="hero-sticker">
            frete grátis<br />até 3km!
          </div>
        </div>
      </section>

      {/* ============ RODAPÉ SIMPLES ============ */}
      <footer style={{padding: '4rem 2rem', background: '#F4EFE4', borderTop: '1px solid #D6CFBD', textAlign: 'center'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <div className="logo" style={{justifyContent: 'center', marginBottom: '1rem'}}>
            <span className="logo-mark">SD</span> Santo <em>Desapego</em>
          </div>
          <p style={{color: '#7A7A7A', fontSize: '0.9rem'}}>
            Projeto Acadêmico TCC • Centro Universitário Senac Santo Amaro
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;