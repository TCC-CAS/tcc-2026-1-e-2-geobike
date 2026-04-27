import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [form, setForm] = useState({
    nome: '', sobrenome: '', email: '', confirmEmail: '',
    telefone: '', senha: '', confirmSenha: '',
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '',
  });

  const [showSenha, setShowSenha]           = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);
  const [emailError, setEmailError]         = useState(false);
  const [confirmEmailError, setConfirmEmailError] = useState(false);
  const [confirmSenhaError, setConfirmSenhaError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', cls: '' });
  const [showStrength, setShowStrength]     = useState(false);
  const [cepLoading, setCepLoading]         = useState(false);
  const [cepOk, setCepOk]                   = useState(false);
  const [termsChecked, setTermsChecked]     = useState(false);
  const [newsChecked, setNewsChecked]       = useState(false);
  const [submitted, setSubmitted]           = useState(false);
  const [loading, setLoading]               = useState(false);
  const [dots, setDots] = useState({ d1: 'active', d2: '', d3: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(value !== '' && !re.test(value));
  };

  const validateConfirmEmail = (value) => {
    setConfirmEmailError(value !== '' && value !== form.email);
  };

  const validateConfirmSenha = (value) => {
    setConfirmSenhaError(value !== '' && value !== form.senha);
  };

  const formatPhone = (value) => {
    let v = value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    setForm((prev) => ({ ...prev, telefone: v }));
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
    setPasswordStrength({ score, cls: levels[score - 1] || 'weak', label: `Força: ${labels[score - 1] || 'Muito fraca'}` });
  };

  const formatCEP = (value) => {
    let val = value.replace(/\D/g, '');
    if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8);
    setForm((prev) => ({ ...prev, cep: val }));
    if (val.replace('-', '').length === 8) {
      setCepLoading(true); setCepOk(false);
      // Simulação de busca — substituir por fetch real à ViaCEP
      setTimeout(() => {
        setCepLoading(false);
        setCepOk(true);
        setForm((prev) => ({
          ...prev,
          logradouro: prev.logradouro || 'Rua das Figueiras',
          bairro: prev.bairro || 'Santo Amaro Centro',
        }));
      }, 900);
    } else { setCepOk(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsChecked) { alert('Por favor, aceite os Termos de Uso para continuar.'); return; }
    if (form.email !== form.confirmEmail) { alert('Os e-mails não coincidem.'); return; }
    if (form.senha !== form.confirmSenha) { alert('As senhas não coincidem.'); return; }
    setDots({ d1: 'done', d2: 'done', d3: 'active' });
    setLoading(true);
    setTimeout(() => { setDots({ d1: 'done', d2: 'done', d3: 'done' }); setSubmitted(true); }, 1500);
  };

  const dotClass = (key) => `step-dot${dots[key] ? ' ' + dots[key] : ''}`;
  const segClass = (i) => `strength-seg${i < passwordStrength.score ? ' ' + passwordStrength.cls : ''}`;

  /* ── Ícones reutilizáveis ── */
  const IconUser  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  const IconMail  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
  const IconLock  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
  const IconPin   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
  const IconPhone = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const IconHome  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  const IconChevron = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>;
  const IconEye   = (open) => open
    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
  const IconCheck = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
  const IconAlert = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  const IconArrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>;

  return (
    <div className="cadastro-wrapper">

      {/* ===== ANNOUNCEMENT ===== */}
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
            <Link to="/">← Voltar para a home</Link>
          </nav>
        </div>
      </header>

      {/* ===== MAIN ===== */}
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
              { icon: '🏷️', title: 'Anúncio gratuito',        desc: 'Publique quantos itens quiser sem pagar nada' },
              { icon: '📍', title: 'Hiperlocal de verdade',    desc: 'Veja a distância exata até o vendedor do bairro' },
              { icon: '💬', title: 'Chat seguro integrado',    desc: 'Negocie sem expor seu número de telefone' },
              { icon: '⭐', title: 'Reputação comunitária',    desc: 'Avaliações que constroem confiança real entre vizinhos' },
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
              <div className="success-icon"><IconCheck /></div>
              <h2>Bem-vinda ao <em>vizinhado</em>!</h2>
              <p>Sua conta foi criada com sucesso. Agora você já faz parte da comunidade do Santo Desapego.</p>
              <Link to="/" className="btn-success">
                Explorar desapegos <IconArrow />
              </Link>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="form-header">
                <div className="step-indicator">
                  <div className={dotClass('d1')} />
                  <div className={dotClass('d2')} />
                  <div className={dotClass('d3')} />
                </div>
                <h1>Criar sua <em>conta</em></h1>
                <p>É gratuito e leva menos de 2 minutos.</p>
              </div>

              {/* OAuth */}
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

                {/* ── Nome e Sobrenome ── */}
                <div className="form-row">
                  {[
                    { label: 'Nome',      name: 'nome',      placeholder: 'Ex: Mariana', ac: 'given-name' },
                    { label: 'Sobrenome', name: 'sobrenome', placeholder: 'Ex: Costa',   ac: 'family-name' },
                  ].map((f) => (
                    <div className="field-group no-mb" key={f.name}>
                      <label className="field-label">{f.label} <span className="required">*</span></label>
                      <div className="field-input-wrap">
                        <IconUser />
                        <input type="text" className="field-input" placeholder={f.placeholder}
                          name={f.name} value={form[f.name]} onChange={handleChange} autoComplete={f.ac} required />
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Telefone ── */}
                <div className="field-group">
                  <label className="field-label">Telefone / WhatsApp <span className="required">*</span></label>
                  <div className="field-input-wrap">
                    <IconPhone />
                    <input type="tel" className="field-input" placeholder="(11) 99999-9999"
                      name="telefone" value={form.telefone}
                      onChange={(e) => formatPhone(e.target.value)}
                      autoComplete="tel" required />
                  </div>
                  <span className="field-hint">Usado apenas para contato sobre negociações</span>
                </div>

                {/* ── E-mail e Confirmação ── */}
                <div className="field-group">
                  <label className="field-label">E-mail <span className="required">*</span></label>
                  <div className="field-input-wrap">
                    <IconMail />
                    <input type="email" className={`field-input${emailError ? ' error' : ''}`}
                      placeholder="voce@email.com" name="email" value={form.email}
                      onChange={(e) => { handleChange(e); validateEmail(e.target.value); }}
                      autoComplete="email" required />
                  </div>
                  {emailError && <span className="field-error"><IconAlert /> E-mail inválido.</span>}
                </div>

                <div className="field-group">
                  <label className="field-label">Confirmar e-mail <span className="required">*</span></label>
                  <div className="field-input-wrap">
                    <IconMail />
                    <input type="email" className={`field-input${confirmEmailError ? ' error' : ''}`}
                      placeholder="repita seu e-mail" name="confirmEmail" value={form.confirmEmail}
                      onChange={(e) => { handleChange(e); validateConfirmEmail(e.target.value); }}
                      autoComplete="email" required />
                  </div>
                  {confirmEmailError && <span className="field-error"><IconAlert /> Os e-mails não coincidem.</span>}
                </div>

                {/* ── Senha e Confirmação ── */}
                <div className="field-group">
                  <label className="field-label">Senha <span className="required">*</span></label>
                  <div className="field-input-wrap">
                    <IconLock />
                    <input type={showSenha ? 'text' : 'password'} className="field-input"
                      placeholder="Mínimo 8 caracteres" name="senha" value={form.senha}
                      onChange={(e) => { handleChange(e); checkPasswordStrength(e.target.value); }}
                      autoComplete="new-password" required />
                    <button type="button" className="password-toggle" onClick={() => setShowSenha(!showSenha)}>
                      {IconEye(showSenha)}
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

                <div className="field-group">
                  <label className="field-label">Confirmar senha <span className="required">*</span></label>
                  <div className="field-input-wrap">
                    <IconLock />
                    <input type={showConfirmSenha ? 'text' : 'password'}
                      className={`field-input${confirmSenhaError ? ' error' : ''}`}
                      placeholder="repita sua senha" name="confirmSenha" value={form.confirmSenha}
                      onChange={(e) => { handleChange(e); validateConfirmSenha(e.target.value); }}
                      autoComplete="new-password" required />
                    <button type="button" className="password-toggle" onClick={() => setShowConfirmSenha(!showConfirmSenha)}>
                      {IconEye(showConfirmSenha)}
                    </button>
                  </div>
                  {confirmSenhaError && <span className="field-error"><IconAlert /> As senhas não coincidem.</span>}
                </div>

                {/* ── Endereço ── */}
                <div className="form-section-label">Endereço</div>

                {/* CEP + Bairro */}
                <div className="form-row">
                  <div className="field-group no-mb">
                    <label className="field-label">CEP <span className="required">*</span></label>
                    <div className="field-input-wrap cep-wrap">
                      <IconPin />
                      <input type="text" className={`field-input${cepOk ? ' success' : ''}`}
                        placeholder="04000-000" name="cep" value={form.cep}
                        onChange={(e) => formatCEP(e.target.value)} maxLength={9} autoComplete="postal-code" />
                      {cepLoading && <div className="cep-loader visible"><span /></div>}
                      {cepOk && !cepLoading && <div className="cep-ok visible"><IconCheck /></div>}
                    </div>
                    <span className="field-hint">Preenchimento automático do endereço</span>
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
                      <span className="select-arrow"><IconChevron /></span>
                    </div>
                  </div>
                </div>

                {/* Logradouro + Número */}
                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="field-group no-mb" style={{ gridColumn: '1 / -1' }}>
                    <label className="field-label">Logradouro <span className="required">*</span></label>
                    <div className="field-input-wrap">
                      <IconHome />
                      <input type="text" className="field-input" placeholder="Rua, Av., Travessa..."
                        name="logradouro" value={form.logradouro} onChange={handleChange}
                        autoComplete="street-address" required />
                    </div>
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="field-group no-mb">
                    <label className="field-label">Número <span className="required">*</span></label>
                    <div className="field-input-wrap">
                      <IconHome />
                      <input type="text" className="field-input" placeholder="Ex: 123"
                        name="numero" value={form.numero} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="field-group no-mb">
                    <label className="field-label">Complemento</label>
                    <div className="field-input-wrap">
                      <IconHome />
                      <input type="text" className="field-input" placeholder="Apto, Bloco..."
                        name="complemento" value={form.complemento} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* ── Checkboxes ── */}
                <div style={{ marginTop: '1.25rem' }}>
                  <div className="checkbox-group">
                    <div className={`checkbox-custom${termsChecked ? ' checked' : ''}`} onClick={() => setTermsChecked(!termsChecked)} />
                    <label className="checkbox-label" onClick={() => setTermsChecked(!termsChecked)}>
                      Li e aceito os <a href="#" onClick={e => e.stopPropagation()}>Termos de Uso</a> e a{' '}
                      <a href="#" onClick={e => e.stopPropagation()}>Política de Privacidade (LGPD)</a>.{' '}
                      <span className="required" style={{ color: 'var(--terracotta)' }}>*</span>
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <div className={`checkbox-custom${newsChecked ? ' checked' : ''}`} onClick={() => setNewsChecked(!newsChecked)} />
                    <label className="checkbox-label" onClick={() => setNewsChecked(!newsChecked)}>
                      Quero receber novidades e alertas de desapegos perto de mim por e-mail.
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-dark btn-submit" disabled={loading}>
                  {loading ? 'Criando sua conta...' : <> Criar minha conta grátis <IconArrow /> </>}
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