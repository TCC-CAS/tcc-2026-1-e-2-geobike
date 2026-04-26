import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [form, setForm] = useState({
    nome: '', sobrenome: '', email: '',
    telefone: '', senha: '', cep: '', bairro: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', cls: '' });
  const [showStrength, setShowStrength] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepOk, setCepOk] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [newsChecked, setNewsChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState({ d1: 'active', d2: '', d3: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(value !== '' && !re.test(value));
  };

  const checkPasswordStrength = (val) => {
    if (!val) { setShowStrength(false); return; }
    setShowStrength(true);
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const levels = ['weak', 'weak', 'medium', 'strong'];
    const labels = ['Muito fraca', 'Fraca', 'Média', 'Forte'];
    setPasswordStrength({ score, cls: levels[score - 1] || 'weak', label: `Força da senha: ${labels[score - 1] || 'Muito fraca'}` });
  };

  const formatCEP = (value) => {
    let val = value.replace(/\D/g, '');
    if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8);
    setForm((prev) => ({ ...prev, cep: val }));
    if (val.replace('-', '').length === 8) {
      setCepLoading(true); setCepOk(false);
      setTimeout(() => {
        setCepLoading(false);
        if (val.startsWith('04')) {
          setCepOk(true);
          setForm((prev) => ({ ...prev, bairro: prev.bairro || 'Santo Amaro Centro' }));
        }
      }, 900);
    } else { setCepOk(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsChecked) { alert('Por favor, aceite os Termos de Uso para continuar.'); return; }
    setDots({ d1: 'done', d2: 'done', d3: 'active' });
    setLoading(true);
    setTimeout(() => { setDots({ d1: 'done', d2: 'done', d3: 'done' }); setSubmitted(true); }, 1500);
  };

  const dotClass = (key) => `step-dot${dots[key] ? ' ' + dots[key] : ''}`;
  const segClass = (i) => `strength-seg${i < passwordStrength.score ? ' ' + passwordStrength.cls : ''}`;

  return (
    <div className="cadastro-wrapper">

      {/* ===== ANNOUNCEMENT BAR ===== */}
      <div className="announcement">
        🎉 <strong>Novo!</strong> Cadastro gratuito — Anuncie seu primeiro item em menos de 2 minutos
      </div>

      {/* ===== HEADER ===== */}
      <header className="site-header">
        <div className="nav-top">
          <Link to="/" className="logo">
            <span className="logo-mark">SD</span>
            Santo <em>Desapego</em>
          </Link>
          <nav className="nav-actions">
            <Link to="/">Voltar para a home</Link>
            <Link to="/cadastro" className="btn-nav-sell">+ Criar conta</Link>
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="cadastro-page">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="left-kicker">
            <span className="kicker-dot" />
            1.247 vizinhos já conectados
          </div>
          <h2>Seu bairro <em>nunca</em><br />foi tão próximo.</h2>
          <p>Crie sua conta gratuita e comece a comprar, vender e trocar com vizinhos de Santo Amaro em poucos minutos.</p>

          <ul className="benefits-list">
            {[
              { icon: '🏷️', title: 'Anúncio gratuito', desc: 'Publique quantos itens quiser sem pagar nada' },
              { icon: '📍', title: 'Hiperlocal de verdade', desc: 'Veja a distância exata até o vendedor do bairro' },
              { icon: '💬', title: 'Chat seguro integrado', desc: 'Negocie sem expor seu número de telefone' },
              { icon: '⭐', title: 'Reputação comunitária', desc: 'Avaliações que constroem confiança real entre vizinhos' },
            ].map((b) => (
              <li key={b.title}>
                <div className="benefit-icon">{b.icon}</div>
                <div className="benefit-text">
                  <strong>{b.title}</strong>
                  <span>{b.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="left-testimonial">
            <p>"Vendi meu sofá em menos de 3 horas. O comprador morava a 400m. Foi ridiculamente fácil."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">MC</div>
              <div className="testimonial-name">
                <strong>Mariana Costa</strong>
                <span>Campo Belo · membro desde jan/2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          {submitted ? (
            <div className="success-state">
              <div className="success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2>Bem-vinda ao <em>vizinhado</em>!</h2>
              <p>Sua conta foi criada com sucesso. Agora você já faz parte da comunidade do Santo Desapego.</p>
              <Link to="/" className="btn-success">
                Explorar desapegos
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div className="form-header">
                <div className="step-indicator">
                  <div className={dotClass('d1')} />
                  <div className={dotClass('d2')} />
                  <div className={dotClass('d3')} />
                </div>
                <h1>Criar sua <em>conta</em></h1>
                <p>É gratuito e leva menos de 2 minutos.</p>
              </div>

              <div className="oauth-buttons">
                <button type="button" className="oauth-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Entrar com Google
                </button>
                <button type="button" className="oauth-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Entrar com Facebook
                </button>
              </div>

              <div className="divider"><span>ou preencha os dados abaixo</span></div>

              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  {[
                    { label: 'Nome', name: 'nome', placeholder: 'Ex: Mariana', ac: 'given-name' },
                    { label: 'Sobrenome', name: 'sobrenome', placeholder: 'Ex: Costa', ac: 'family-name' },
                  ].map((f) => (
                    <div className="field-group no-mb" key={f.name}>
                      <label className="field-label">{f.label} <span className="required">*</span></label>
                      <div className="field-input-wrap">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input type="text" className="field-input" placeholder={f.placeholder}
                          name={f.name} value={form[f.name]} onChange={handleChange} autoComplete={f.ac} required />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="field-group">
                  <label className="field-label">E-mail <span className="required">*</span></label>
                  <div className="field-input-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <input type="email" className={`field-input${emailError ? ' error' : ''}`}
                      placeholder="voce@email.com" name="email" value={form.email}
                      onChange={(e) => { handleChange(e); validateEmail(e.target.value); }}
                      autoComplete="email" required />
                  </div>
                  {emailError && (
                    <span className="field-error">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      Por favor, insira um e-mail válido.
                    </span>
                  )}
                </div>

                <div className="field-group">
                  <label className="field-label">Senha <span className="required">*</span></label>
                  <div className="field-input-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input type={showPassword ? 'text' : 'password'} className="field-input"
                      placeholder="Mínimo 8 caracteres" name="senha" value={form.senha}
                      onChange={(e) => { handleChange(e); checkPasswordStrength(e.target.value); }}
                      autoComplete="new-password" required />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Ver senha">
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  {showStrength && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        {[0,1,2,3].map((i) => <div key={i} className={segClass(i)} />)}
                      </div>
                      <span className={`strength-label ${passwordStrength.cls}`}>{passwordStrength.label}</span>
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="field-group no-mb">
                    <label className="field-label">CEP <span className="required">*</span></label>
                    <div className="field-input-wrap cep-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <input type="text" className={`field-input${cepOk ? ' success' : ''}`}
                        placeholder="04000-000" name="cep" value={form.cep}
                        onChange={(e) => formatCEP(e.target.value)} maxLength={9} autoComplete="postal-code" />
                      {cepLoading && <div className="cep-loader visible"><span /></div>}
                      {cepOk && !cepLoading && (
                        <div className="cep-ok visible">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="field-hint">Usado para mostrar sua distância aos vendedores</span>
                  </div>

                  <div className="field-group no-mb">
                    <label className="field-label">Bairro <span className="required">*</span></label>
                    <div className="select-wrap field-input-wrap">
                      <svg className="select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <select className="field-select" name="bairro" value={form.bairro} onChange={handleChange} required>
                        <option value="" disabled>Selecione...</option>
                        {['Santo Amaro Centro','Campo Belo','Brooklin','Granja Julieta','Jardim Marajoara','Vila Cruzeiro','Vila Mascote','Vila Sofia','Outro bairro'].map(b => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                      <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <div className="checkbox-group">
                    <div className={`checkbox-custom${termsChecked ? ' checked' : ''}`} onClick={() => setTermsChecked(!termsChecked)} />
                    <label className="checkbox-label" onClick={() => setTermsChecked(!termsChecked)}>
                      Li e aceito os <a href="#" onClick={e => e.stopPropagation()}>Termos de Uso</a> e a{' '}
                      <a href="#" onClick={e => e.stopPropagation()}>Política de Privacidade (LGPD)</a> do Santo Desapego.{' '}
                      <span className="required" style={{ color: 'var(--terracotta)' }}>*</span>
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <div className={`checkbox-custom${newsChecked ? ' checked' : ''}`} onClick={() => setNewsChecked(!newsChecked)} />
                    <label className="checkbox-label" onClick={() => setNewsChecked(!newsChecked)}>
                      Quero receber novidades, dicas e alertas de desapegos perto de mim por e-mail.
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Criando sua conta...' : 'Criar minha conta grátis'}
                  {!loading && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </form>

              <p className="form-footer">
                Já tem uma conta? <Link to="/login">Entrar agora →</Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <span>© 2025 Santo Desapego — Projeto acadêmico TCC · SENAC Santo Amaro · </span>
        <a href="#">Privacidade</a> · <a href="#">Termos</a>
      </footer>
    </div>
  );
};

export default Cadastro;