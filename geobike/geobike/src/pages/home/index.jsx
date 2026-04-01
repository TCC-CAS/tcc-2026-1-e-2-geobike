import './style.css';
import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

export default function Home() {
  
  const [viewState, setViewState] = useState({
    latitude: -23.5505, // Começa em São Paulo por padrão
    longitude: -46.6333,
    zoom: 13
  });

  // Pede a localização real do usuário quando a página carrega
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 14
          });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          // Opcional: Você pode definir uma localização padrão aqui caso dê erro
        },
        {
          enableHighAccuracy: true, // Força o uso do GPS do celular para máxima precisão
          timeout: 5000,            // Aguarda até 5 segundos pela resposta
          maximumAge: 0             // Não utiliza localização em cache, busca a mais atual
        }
      );
    }
  }, []);
  
  return (
    <div className="geobike-wrapper">
      
      {/* Criamos esta nova caixa para agrupar a primeira visão do usuário */}
      <div className="primeira-tela">
        <nav className="navbar">
          <div className="logo-container">
            <span className="logo-icon">💡</span>
            <span className="logo-text">GeoBike</span>
          </div>
          <div className="nav-links">
            <a href="#como-funciona">Como Funciona</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#sustentabilidade">Sustentabilidade</a>
            <button className="btn-comecar">Começar Agora</button>
          </div>
        </nav>

        <main className="hero-container">
          <div className="hero-content">
            <span className="badge">◆ PLATAFORMA P2P DE MOBILIDADE URBANA</span>
            <h1 className="hero-title">
              Alugue ou <br/>
              <span className="highlight-text">disponibilize</span><br/>
              sua bike na<br/>
              cidade
            </h1>
            <p className="hero-description">
              Conectamos quem precisa se mover com quem tem uma bicicleta parada. 
              Geolocalização em tempo real, pagamento seguro e reputação digital — tudo em um só lugar.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">Quero Pedalar ➔</button>
              <button className="btn-secondary">⊙ Ver como funciona</button>
            </div>
          </div>

          <div className="hero-illustration">
            <div className="mockup-card">
               <div style={{ height: '420px', width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid #EAF6F8',boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
              >
                <Marker longitude={viewState.longitude} latitude={viewState.latitude} color="#E87A00" />
              </Map>
            </div>
               <div className="mockup-stats">
                  <div><strong>XX</strong><br/>BIKES PERTO</div>
                  <div><strong>XX</strong><br/>MAIS PRÓXIMA</div>
                  <div><strong>XX</strong><br/>A PARTIR DE</div>
               </div>
            </div>
          </div>
        </main>

        <div className="ticker-bar">
          <span>◆ ECONOMIA COMPARTILHADA</span>
          <span>◆ MOBILIDADE URBANA</span>
          <span>◆ GEOLOCALIZAÇÃO EM TEMPO REAL</span>
          <span>◆ PAGAMENTO SEGURO</span>
          <span>◆ P2P MARKETPLACE</span>
          <span>◆ ZERO EMISSÕES</span>
        </div>
      </div> 
      {/* Aqui encerra a nossa primeira tela exata */}

      <section id="beneficios" className="beneficios-container">
        <div className="beneficios-header">
          <span className="beneficios-subtitle">— BENEFÍCIOS</span>
          <h2>
            Por que escolher o <br />
            <span className="highlight-text">nossos serviços de <br/> aluguel?</span>
          </h2>
        </div>

        <div className="cards-grid">
          <div className="beneficio-card">
            <div className="card-top">
              <div className="card-icon">💲</div>
              <div className="card-number">01</div>
            </div>
            <h3>Preço baixo, sem comprometer a qualidade</h3>
            <p>Modelo P2P descentralizado que elimina intermediários e reduz custos, mantendo a experiência premium para todos os usuários.</p>
          </div>

          <div className="beneficio-card">
            <div className="card-top">
              <div className="card-icon">📍</div>
              <div className="card-number">02</div>
            </div>
            <h3>Alugue de quem confia, pedale para onde quiser</h3>
            <p>Sistema de reputação digital com avaliações verificadas. Você sabe exatamente com quem está negociando antes de pedalar.</p>
          </div>

          <div className="beneficio-card">
            <div className="card-top">
              <div className="card-icon">🚲</div>
              <div className="card-number">03</div>
            </div>
            <h3>Sua bike parada agora gera renda extra</h3>
            <p>Cadastre sua bicicleta, defina sua disponibilidade e receba pagamentos automáticos. Seu ativo trabalha por você 24/7.</p>
          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO: COMO FUNCIONA --- */}
      <section id="como-funciona" className="processo-container">
        <div className="processo-conteudo">
          
          {/* Lado Esquerdo: Textos e Passos */}
          <div className="processo-texto">
            <span className="processo-subtitle">— PROCESSO</span>
            <h2>
              Como funciona <br />
              <span className="highlight-text">em 4 passos</span>
            </h2>

            <div className="passos-lista">
              <div className="passo-item">
                <div className="passo-numero">1</div>
                <div className="passo-detalhe">
                  <h3>Crie sua conta</h3>
                  <p>Cadastro rápido com verificação de identidade digital para garantir segurança em toda a plataforma.</p>
                </div>
              </div>
              
              <div className="passo-item">
                <div className="passo-numero">2</div>
                <div className="passo-detalhe">
                  <h3>Encontre uma bike perto de você</h3>
                  <p>Nossa integração com GPS e mapas mostra todas as bicicletas disponíveis no raio que você escolher.</p>
                </div>
              </div>
              
              <div className="passo-item">
                <div className="passo-numero">3</div>
                <div className="passo-detalhe">
                  <h3>Reserve e pague com segurança</h3>
                  <p>Gateway de pagamento integrado com proteção para locador e locatário. Simples e transparente.</p>
                </div>
              </div>
              
              <div className="passo-item">
                <div className="passo-numero">4</div>
                <div className="passo-detalhe">
                  <h3>Avalie e construa reputação</h3>
                  <p>Após cada locação, ambos avaliam a experiência. Sua reputação é seu passaporte na plataforma.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Mockup do Celular */}
          <div className="processo-imagem">
            <div className="celular-mockup">
              <div className="celular-header">
                <span>GeoBike</span>
                <span className="status-vivo">● Ao vivo</span>
              </div>
              
              <div className="celular-mapa">
                <div className="pino-mapa">📍</div>
                <div className="info-flutuante">24 bikes disponíveis</div>
              </div>
              
              <div className="celular-card-bike">
                <div className="bike-icone">🚲</div>
                <div className="bike-info">
                  <strong>Trek FX 3 Disc</strong>
                  <span>300m • R$ 12/hora • ⭐ 4.9</span>
                </div>
              </div>
              
              <button className="celular-btn">Reservar Agora →</button>
            </div>
          </div>

        </div>
      </section>

      <section className="barra-dados-container">
        <div className="barra-dados-grid">
          <div className="dado-item">
            <p>Bikes cadastradas na<br/>plataforma</p>
          </div>
          <div className="dado-item">
            <p>Taxa de satisfação dos<br/>usuários</p>
          </div>
          <div className="dado-item">
            <p>Viagens realizadas com<br/>sucesso</p>
          </div>
          <div className="dado-item">
            <p>Avaliação média na<br/>plataforma</p>
          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO: PROTAGONISTAS --- */}
      <section className="protagonistas-container">
        <div className="protagonistas-conteudo">
          
          {/* Lado Esquerdo: Textos e Tags */}
          <div className="protagonistas-texto">
            <span className="protagonistas-subtitle">— PARA QUEM É</span>
            <h2>
              Uma plataforma,<br />
              <span className="highlight-text">dois protagonistas</span>
            </h2>
            <p>
              GeoBike conecta quem precisa se locomover pela cidade com quem tem uma bicicleta disponível. Simples assim.
            </p>
            
            <div className="tags-grupo">
              <div className="tag-item tag-azul">
                <strong>P2P</strong>
                <span>Peer-to-Peer</span>
              </div>
              <div className="tag-item tag-laranja">
                <strong>B2C</strong>
                <span>Modelo Híbrido</span>
              </div>
              <div className="tag-item tag-verde">
                <strong>SIG</strong>
                <span>Geolocalização</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Cartões Locatário e Locador */}
          <div className="protagonistas-cards">
            
            {/* Cartão 1 */}
            <div className="protagonista-card">
              <div className="card-icone-wrapper bg-azul">
                <span className="icone">🚴</span>
              </div>
              <h3>Locatário</h3>
              <p>Precisa de uma bike para ir ao trabalho, lazer ou explorar a cidade? Encontre opções próximas a você em segundos.</p>
              <ul className="beneficios-lista">
                <li><span className="check">✔</span> Geolocalização em tempo real</li>
                <li><span className="check">✔</span> Pagamento digital seguro</li>
                <li><span className="check">✔</span> Avaliações verificadas do locador</li>
                <li><span className="check">✔</span> Suporte durante toda a locação</li>
              </ul>
            </div>

            {/* Cartão 2 */}
            <div className="protagonista-card">
              <div className="card-icone-wrapper bg-laranja">
                <span className="icone">🏠</span>
              </div>
              <h3>Locador</h3>
              <p>Sua bicicleta parada na garagem pode gerar renda extra. Cadastre, defina preço e receba automaticamente.</p>
              <ul className="beneficios-lista">
                <li><span className="check">✔</span> Cadastro em menos de 5 minutos</li>
                <li><span className="check">✔</span> Controle total de disponibilidade</li>
                <li><span className="check">✔</span> Pagamento automático após locação</li>
                <li><span className="check">✔</span> Seguro opcional para seu bem</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO: IMPACTO AMBIENTAL --- */}
      <section id="sustentabilidade" className="impacto-container">
        <div className="impacto-conteudo">
          
          {/* Lado Esquerdo: Textos e Tags ODS */}
          <div className="impacto-texto">
            <span className="impacto-subtitle">— IMPACTO</span>
            <h2>
              Pedalar é o futuro <br />
              <span className="highlight-verde">das cidades</span>
            </h2>
            <p>
              Cada viagem feita de bicicleta contribui para reduzir emissões, desafogar o trânsito e promover saúde urbana. Alinhados com os Objetivos de Desenvolvimento Sustentável da ONU.
            </p>
            
            <div className="ods-grupo">
              <span className="ods-tag">📊 ODS 11 — Cidades Sustentáveis</span>
              <span className="ods-tag">♻️ ODS 12 — Consumo Responsável</span>
              <span className="ods-tag">🌍 ODS 13 — Ação Climática</span>
              <span className="ods-tag">🏃 ODS 3 — Saúde e Bem-Estar</span>
            </div>
          </div>

          {/* Lado Direito: Grade de Cartões Estatísticos */}
          <div className="impacto-cards-grid">
            
            <div className="card-estatistica card-full">
              <div className="icone-verde">🌱</div>
              <div className="estatistica-info">
                <strong>0g</strong>
                <span>de CO₂ por km de bicicleta</span>
              </div>
            </div>

            <div className="card-estatistica card-half">
              <strong>-72%</strong>
              <span>Emissões vs. carro solo</span>
            </div>

            <div className="card-estatistica card-half">
              <strong>3x</strong>
              <span>Mais eficiente em trânsito</span>
            </div>

            <div className="card-estatistica card-half">
              <strong>+12k</strong>
              <span>Viagens sustentáveis</span>
            </div>

          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO: CALL TO ACTION (CTA) --- */}
      <section className="cta-container">
        <div className="cta-conteudo">
          <span className="cta-subtitle">— COMEÇAR AGORA</span>
          <h2>
            Pronto para <br />
            <span className="highlight-turquesa">se mover?</span>
          </h2>
          <p>
            Junte-se a milhares de usuários que já descobriram uma forma mais inteligente, 
            barata e sustentável de se locomover pela cidade.
          </p>
          
          <div className="cta-botoes">
            <button className="btn-primary cta-btn">
              Quero Pedalar <span className="icone-seta">➔</span>
            </button>
            <button className="btn-secondary cta-btn">
              Cadastrar minha bike
            </button>
          </div>
        </div>
      </section>

      <footer className="rodape-container">
        <div className="rodape-grid">
          
          <div className="rodape-coluna marca">
            <div className="logo-container logo-rodape">
              <span className="logo-icon">💡</span>
              <span className="logo-text texto-branco">GeoBike</span>
            </div>
            <p>
              A plataforma inteligente de mobilidade urbana baseada em economia compartilhada.
              Conectando pessoas, bicicletas e cidades.
            </p>
          </div>

          <div className="rodape-coluna">
            <h4>PLATAFORMA</h4>
            <a href="#como-funciona">Como Funciona</a>
            <a href="#seguranca">Segurança</a>
            <a href="#precos">Preços</a>
            <a href="#app">App Mobile</a>
          </div>

          <div className="rodape-coluna">
            <h4>COMUNIDADE</h4>
            <a href="#blog">Blog</a>
            <a href="#parceiros">Parceiros</a>
            <a href="#embaixadores">Embaixadores</a>
            <a href="#eventos">Eventos</a>
          </div>

          <div className="rodape-coluna">
            <h4>LEGAL</h4>
            <a href="#privacidade">Privacidade (LGPD)</a>
            <a href="#termos">Termos de Uso</a>
            <a href="#cookies">Cookies</a>
            <a href="#contato">Contato</a>
          </div>

        </div>

        <div className="rodape-base">
          <p>© 2026 GeoBike · TCC BSI — Centro Universitário Senac</p>
          <div className="rodape-tags">
            <span>ECONOMIA COMPARTILHADA</span>
            <span>ODS 11</span>
            <span>P2P</span>
          </div>
        </div>
      </footer>

    </div>
  );
}