import React from 'react';
import { Link } from 'react-router-dom';

const Cadastro = () => {
  return (
    <div className="auth-container" style={{display: 'flex', width: '100%'}}>
      <section className="auth-left">
        <div className="auth-left-content">
          <div className="badge">Mais de 1.247 vizinhos conectados</div>
          <h1>Seu bairro <em>nunca</em> foi tão próximo.</h1>
          <p>Crie sua conta gratuita e comece a comprar, vender e trocar com vizinhos de Santo Amaro em poucos minutos.</p>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">🏷️</div>
              <div className="feature-text">
                <h4>Anúncio gratuito</h4>
                <p>Publique quantos itens quiser sem pagar nada</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💬</div>
              <div className="feature-text">
                <h4>Chat seguro integrado</h4>
                <p>Negocie sem expor seu número de telefone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-right">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Criar sua <em>conta</em></h2>
            <p>É gratuito e leva menos de 2 minutos.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome</label>
                <input type="text" placeholder="Ex: Mariana" required />
              </div>
              <div className="form-group">
                <label>Sobrenome</label>
                <input type="text" placeholder="Ex: Costa" required />
              </div>
            </div>
            <div className="form-group full">
              <label>E-mail</label>
              <input type="email" placeholder="voce@email.com" required />
            </div>
            <div className="form-group full">
              <label>Senha</label>
              <input type="password" placeholder="Mínimo 8 caracteres" required />
            </div>
            <button type="submit" className="btn-submit">Criar minha conta grátis →</button>
          </form>
          <div className="login-link" style={{textAlign: 'center', marginTop: '1.5rem'}}>
            Já tem uma conta? <Link to="/login" style={{color: '#C14B35', fontWeight: 'bold'}}>Entrar agora →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cadastro;