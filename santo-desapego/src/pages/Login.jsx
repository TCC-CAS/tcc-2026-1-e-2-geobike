import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main className="auth-split">
      <section className="auth-visual">
        <h2>Seu bairro tem <br /><em>mais do que você imagina.</em></h2>
        <p>Conecte-se com vizinhos e encontre raridades perto de você.</p>
      </section>
      <section className="auth-form-side">
        <div className="login-card">
          <div className="logo">
            <span className="logo-mark">SD</span> Santo <em>Desapego</em>
          </div>
          <div className="form-header">
            <h1>Entrar na sua <em>conta</em></h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>E-mail</label>
              <input type="email" placeholder="seu@email.com" />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input type="password" placeholder="Sua senha" />
            </div>
            <button className="btn-login">Entrar →</button>
          </form>
          <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
            <p>Ainda não tem conta? <Link to="/cadastro" style={{color: '#C14B35', fontWeight: 'bold'}}>Criar conta grátis</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;