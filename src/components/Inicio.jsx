import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --black: #080810;
    --surface: #0e0e1a;
    --card: #13131f;
    --border: rgba(255,255,255,0.07);
    --white: #f0f0f8;
    --muted: #6b6b88;
    --accent: #4f6ef7;
    --accent2: #9b5cf6;
    --glow: rgba(79,110,247,0.18);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hn-root {
    background: var(--black);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .hn-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 999;
    opacity: .6;
  }

  /* ── HERO ── */
  .hn-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6rem 1.5rem 4rem;
    position: relative;
  }

  .hn-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,110,247,0.14) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 60%, rgba(155,92,246,0.10) 0%, transparent 70%);
    pointer-events: none;
  }

  .hn-badge {
    display: inline-flex;
    align-items: center;
    gap: .4rem;
    padding: .35rem 1rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: .75rem;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 2rem;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(6px);
    animation: fadeUp .7s ease both;
  }

  .hn-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,100% { opacity: 1; }
    50% { opacity: .4; }
  }

.hn-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 1.0;
    letter-spacing: -.03em;
    animation: fadeUp .7s .1s ease both;
  }

  .hn-title-gradient {
    background: linear-gradient(135deg, #fff 30%, var(--accent) 70%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hn-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    color: var(--muted);
    max-width: 560px;
    line-height: 1.65;
    margin-top: 1.5rem;
    font-weight: 300;
    animation: fadeUp .7s .2s ease both;
  }

  .hn-hero-cta {
    display: flex;
    gap: 1rem;
    margin-top: 2.5rem;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeUp .7s .3s ease both;
  }

  .hn-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    padding: .85rem 2rem;
    background: var(--accent);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: .95rem;
    border-radius: 10px;
    text-decoration: none;
    transition: transform .2s, box-shadow .2s, background .2s;
    box-shadow: 0 0 24px rgba(79,110,247,.35);
    border: none;
    cursor: pointer;
  }
  .hn-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(79,110,247,.55);
    background: #3d5be0;
    color: #fff;
    text-decoration: none;
  }

  .hn-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    padding: .85rem 2rem;
    background: transparent;
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: .95rem;
    border-radius: 10px;
    text-decoration: none;
    border: 1px solid var(--border);
    transition: border-color .2s, transform .2s, background .2s;
  }
  .hn-btn-ghost:hover {
    border-color: rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.05);
    transform: translateY(-2px);
    color: var(--white);
    text-decoration: none;
  }

  /* ── STATS ── */
  .hn-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    padding: 3rem 1.5rem;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin: 0 1.5rem;
    animation: fadeUp .7s .4s ease both;
  }

  .hn-stat-item { text-align: center; }
  .hn-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #fff, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hn-stat-label { color: var(--muted); font-size: .8rem; letter-spacing: .1em; text-transform: uppercase; margin-top: .25rem; }

  /* ── SECTIONS ── */
  .hn-section { padding: 6rem 1.5rem; max-width: 1100px; margin: 0 auto; }

  .hn-section-label {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .7rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 1.2rem;
  }
  .hn-section-label::before {
    content: '';
    display: block;
    width: 18px; height: 1px;
    background: var(--accent);
  }

  .hn-section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -.02em;
  }

  .hn-section-sub {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 500px;
    line-height: 1.7;
    margin-top: .75rem;
    font-weight: 300;
  }

  /* ── SERVICIOS ── */
  .hn-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5px;
    margin-top: 4rem;
    border: 1.5px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  .hn-service-card {
    background: var(--card);
    padding: 2.5rem;
    transition: background .25s;
    position: relative;
    overflow: hidden;
  }
  .hn-service-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .35s;
  }
  .hn-service-card:hover { background: #17172a; }
  .hn-service-card:hover::after { transform: scaleX(1); }

  .hn-service-icon { font-size: 1.8rem; margin-bottom: 1.2rem; display: block; }
  .hn-service-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: .6rem;
  }
  .hn-service-desc { color: var(--muted); font-size: .9rem; line-height: 1.6; font-weight: 300; }

  /* ── FEATURED ── */
  .hn-featured {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    margin-top: 4rem;
    transition: border-color .25s;
  }
  .hn-featured:hover { border-color: rgba(79,110,247,0.35); }
  .hn-featured-content { padding: 3rem; }

  .hn-project-tag {
    display: inline-block;
    padding: .25rem .75rem;
    background: rgba(79,110,247,0.15);
    color: var(--accent);
    font-size: .72rem;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    border-radius: 999px;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(79,110,247,0.3);
  }

  .hn-featured-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.9rem;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 1rem;
  }
  .hn-featured-desc { color: var(--muted); font-size: .95rem; line-height: 1.7; font-weight: 300; }

  .hn-tech-stack { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.5rem; }
  .hn-tech-pill {
    padding: .3rem .85rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: .75rem;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  .hn-featured-visual {
    background: linear-gradient(135deg, rgba(79,110,247,0.15), rgba(155,92,246,0.1));
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .hn-mock {
    width: 85%;
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,.6);
    position: relative;
    z-index: 1;
  }
  .hn-mock-bar {
    background: #1a1a2e;
    padding: .6rem 1rem;
    display: flex;
    gap: .4rem;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .hn-mock-dot { width: 10px; height: 10px; border-radius: 50%; }
  .hn-mock-body { padding: 1.2rem; }
  .hn-mock-row { height: 10px; background: rgba(255,255,255,0.08); border-radius: 6px; margin-bottom: .6rem; }

  /* ── PROYECTOS GRID ── */
  .hn-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 3rem;
  }

  .hn-project-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: transform .25s, border-color .25s, box-shadow .25s;
    display: flex;
    flex-direction: column;
  }
  .hn-project-card:hover {
    transform: translateY(-6px);
    border-color: rgba(79,110,247,0.35);
    box-shadow: 0 20px 50px rgba(0,0,0,.4);
  }

  .hn-card-visual {
    height: 190px;
    background: linear-gradient(135deg, #13131f, #1e1e32);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .hn-card-emoji { font-size: 3rem; position: relative; z-index: 1; }
  .hn-card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
  .hn-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: .5rem;
  }
  .hn-card-desc { color: var(--muted); font-size: .875rem; line-height: 1.6; font-weight: 300; flex: 1; }

  /* ── TEAM ── */
  .hn-team-grid {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-top: 3.5rem;
  }

  .hn-team-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    text-align: center;
    width: 260px;
    transition: border-color .25s, transform .25s;
    position: relative;
    overflow: hidden;
  }
  .hn-team-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    opacity: 0;
    transition: opacity .25s;
  }
  .hn-team-card:hover { border-color: rgba(79,110,247,0.3); transform: translateY(-4px); }
  .hn-team-card:hover::before { opacity: 1; }

  .hn-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: #fff;
    margin: 0 auto 1.2rem;
    box-shadow: 0 0 24px rgba(79,110,247,0.3);
  }

  .hn-team-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; }
  .hn-team-role { color: var(--muted); font-size: .82rem; margin-top: .3rem; }

  /* ── CTA FINAL ── */
  .hn-cta {
    text-align: center;
    padding: 7rem 1.5rem;
    position: relative;
    overflow: hidden;
  }
  .hn-cta-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(79,110,247,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hn-cta-inner { position: relative; z-index: 1; }
  .hn-cta-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -.02em;
    margin-bottom: 1rem;
  }
  .hn-cta-sub { color: var(--muted); font-size: 1.05rem; max-width: 480px; margin: 0 auto 2.5rem; font-weight: 300; }

  .hn-divider {
    height: 1px;
    background: var(--border);
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hn-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .65s ease, transform .65s ease;
  }
  .hn-reveal.visible {
    opacity: 1;
    transform: none;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
  .hn-title {
    font-size: clamp(1.6rem, 8vw, 2.8rem);
    letter-spacing: -.02em;
    word-break: break-all;
  }
    .hn-hero {
      padding: 5rem 1.25rem 3rem;
    }
    .hn-featured {
      grid-template-columns: 1fr;
    }
    .hn-featured-content {
      padding: 2rem 1.5rem;
    }
    .hn-featured-visual {
      min-height: 200px;
    }
    .hn-stats {
      gap: 1.5rem;
      margin: 0 0;
    }
    .hn-section {
      padding: 4rem 1.25rem;
    }
    .hn-services-grid {
      grid-template-columns: 1fr;
    }
    .hn-projects-grid {
      grid-template-columns: 1fr;
    }
    .hn-team-card {
      width: 100%;
      max-width: 320px;
    }
    .hn-cta {
      padding: 5rem 1.25rem;
    }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.hn-reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function MockUI() {
  return (
    <div className="hn-mock">
      <div className="hn-mock-bar">
        <div className="hn-mock-dot" style={{ background: '#ff5f57' }} />
        <div className="hn-mock-dot" style={{ background: '#febc2e' }} />
        <div className="hn-mock-dot" style={{ background: '#28c840' }} />
        <div style={{ marginLeft: 'auto', fontSize: '.65rem', color: '#444', fontFamily: 'monospace' }}>
          cruman.net
        </div>
      </div>
      <div className="hn-mock-body">
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.8rem' }}>
          <div style={{ width: 60, height: 8, borderRadius: 4, background: 'rgba(79,110,247,.5)' }} />
          <div style={{ width: 40, height: 8, borderRadius: 4, background: 'rgba(255,255,255,.07)' }} />
          <div style={{ width: 50, height: 8, borderRadius: 4, background: 'rgba(255,255,255,.07)' }} />
        </div>
        {[80, 60, 90, 45, 70].map((w, i) => (
          <div key={i} className="hn-mock-row" style={{ width: `${w}%`, opacity: 1 - i * 0.12 }} />
        ))}
        <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
          <div style={{ flex: 1, height: 32, borderRadius: 6, background: 'rgba(79,110,247,.3)', border: '1px solid rgba(79,110,247,.4)' }} />
          <div style={{ flex: 1, height: 32, borderRadius: 6, background: 'rgba(255,255,255,.05)' }} />
        </div>
      </div>
    </div>
  );
}

export const Inicio = () => {
  useReveal();

  const services = [
    { icon: '🌐', name: 'Desarrollo Web', desc: 'Sitios y aplicaciones modernas, rápidas y responsivas. Desde landing pages hasta plataformas completas.' },
    { icon: '⚙️', name: 'Sistemas a Medida', desc: 'Software personalizado que automatiza y optimiza los procesos únicos de tu negocio.' },
    { icon: '📱', name: 'Apps & PWA', desc: 'Aplicaciones progresivas y móviles que funcionan en cualquier dispositivo, sin instalar nada.' },
    { icon: '🗄️', name: 'Backend & APIs', desc: 'Infraestructura robusta en AWS con bases de datos, APIs REST y procesos automatizados.' },
    { icon: '📊', name: 'Reportes & Dashboard', desc: 'Paneles de control, reportes PDF/Excel y estadísticas en tiempo real para tomar mejores decisiones.' },
    { icon: '🔒', name: 'Mantenimiento', desc: 'Soporte técnico continuo, actualizaciones y mejoras para que tu sistema nunca falle.' },
  ];

  const otherProjects = [
    { emoji: '📦', tag: 'Sistema', title: 'Sistema de Inventario', desc: 'Control de productos en tiempo real con base de datos, alertas de stock y reportes automáticos.', techs: ['React', 'Node.js', 'PostgreSQL'] },
    { emoji: '🏢', tag: 'Corporativo', title: 'Plataforma Corporativa', desc: 'Gestión de usuarios, roles y operaciones empresariales en una sola plataforma unificada.', techs: ['React', 'AdonisJS', 'AWS'] },
    { emoji: '🛵', tag: 'App', title: 'App de Servicios', desc: 'Aplicación de pedidos y servicios a domicilio con seguimiento en tiempo real.', techs: ['React', 'Express', 'Maps API'] },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="hn-root">

        <section className="hn-hero">
          <div className="hn-hero-bg" />
          <div className="hn-badge">
            <span className="hn-badge-dot" />
            Disponibles para nuevos proyectos
          </div>
          <h1 className="hn-title">
            <span className="hn-title-gradient">hercor</span>
            <span style={{ opacity: .25 }}>.</span>
            <span className="hn-title-gradient">nexus</span>
            <br />
            <span style={{ fontSize: '55%', letterSpacing: '-.01em', color: 'var(--muted)', fontWeight: 400 }}>
              Software que trabaja por ti
            </span>
          </h1>
          <p className="hn-subtitle">
            Transformamos ideas en sistemas reales. Desarrollo fullstack, sistemas a medida y soluciones digitales
            para negocios que quieren crecer.
          </p>
          <div className="hn-hero-cta">
            <Link to="/portafolio" className="hn-btn-primary">Ver proyectos →</Link>
            <Link to="/contacto" className="hn-btn-ghost">Hablemos</Link>
          </div>
        </section>

        <div className="hn-stats">
          {[
            { num: '100%', label: 'Código a medida' },
            { num: '2+', label: 'Años de experiencia' },
            { num: 'AWS', label: 'Infraestructura cloud' },
            { num: '24/7', label: 'Soporte técnico' },
          ].map((s, i) => (
            <div className="hn-stat-item" key={i}>
              <div className="hn-stat-num">{s.num}</div>
              <div className="hn-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="hn-section hn-reveal">
          <div className="hn-section-label">Servicios</div>
          <h2 className="hn-section-title">¿Qué hacemos?</h2>
          <p className="hn-section-sub">Cubrimos todo el ciclo de desarrollo, desde la idea hasta el servidor.</p>
          <div className="hn-services-grid">
            {services.map((s, i) => (
              <div className="hn-service-card" key={i}>
                <span className="hn-service-icon">{s.icon}</span>
                <div className="hn-service-name">{s.name}</div>
                <div className="hn-service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="hn-divider" />

        <section className="hn-section hn-reveal">
          <div className="hn-section-label">Proyecto destacado</div>
          <h2 className="hn-section-title">Lo que construimos</h2>
          <p className="hn-section-sub">Un ejemplo real de lo que podemos hacer por tu negocio.</p>
          <div className="hn-featured">
            <div className="hn-featured-content">
              <span className="hn-project-tag">Sistema de Cobranzas</span>
              <div className="hn-featured-title">CRUMAN — Gestión de Préstamos</div>
              <p className="hn-featured-desc">
                Sistema completo para gestionar carteras de préstamos, rutas de cobro diarias, seguimientos y reportes.
                Desarrollado desde cero con autenticación, roles de usuario, reportes en PDF/Excel y despliegue en AWS.
              </p>
              <div className="hn-tech-stack">
                {['React', 'AdonisJS v6', 'PostgreSQL', 'AWS EC2', 'PWA', 'PDF Reports'].map(t => (
                  <span className="hn-tech-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="hn-featured-visual">
              <MockUI />
            </div>
          </div>
        </section>

        <div className="hn-divider" />

        <section className="hn-section hn-reveal">
          <div className="hn-section-label">Portafolio</div>
          <h2 className="hn-section-title">Más proyectos</h2>
          <div className="hn-projects-grid">
            {otherProjects.map((p, i) => (
              <div className="hn-project-card" key={i}>
                <div className="hn-card-visual">
                  <span className="hn-card-emoji">{p.emoji}</span>
                </div>
                <div className="hn-card-body">
                  <span className="hn-project-tag" style={{ marginBottom: '.75rem' }}>{p.tag}</span>
                  <div className="hn-card-title">{p.title}</div>
                  <div className="hn-card-desc">{p.desc}</div>
                  <div className="hn-tech-stack" style={{ marginTop: '1rem' }}>
                    {p.techs.map(t => <span className="hn-tech-pill" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/portafolio" className="hn-btn-ghost">Ver todos los proyectos →</Link>
          </div>
        </section>

        <div className="hn-divider" />

        <section className="hn-section hn-reveal" style={{ textAlign: 'center' }}>
          <div className="hn-section-label" style={{ justifyContent: 'center' }}>El equipo</div>
          <h2 className="hn-section-title">Quiénes somos</h2>
          <p className="hn-section-sub" style={{ margin: '.75rem auto 0' }}>
            Dos desarrolladores fullstack apasionados por construir software que realmente funciona.
          </p>
          <div className="hn-team-grid">
            <div className="hn-team-card">
              <div className="hn-avatar">HC</div>
              <div className="hn-team-name">Hugo Corado</div>
              <div className="hn-team-role">Fullstack Developer</div>
              <div className="hn-tech-stack" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                {['React', 'AdonisJS', 'AWS'].map(t => <span className="hn-tech-pill" key={t}>{t}</span>)}
              </div>
            </div>
            <div className="hn-team-card">
              <div className="hn-avatar" style={{ background: 'linear-gradient(135deg, var(--accent2), #c084fc)' }}>FH</div>
              <div className="hn-team-name">Fernando Heredia</div>
              <div className="hn-team-role">Fullstack Developer</div>
              <div className="hn-tech-stack" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                {['React', 'Node.js', 'PostgreSQL'].map(t => <span className="hn-tech-pill" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="hn-cta hn-reveal">
          <div className="hn-cta-bg" />
          <div className="hn-cta-inner">
            <div className="hn-section-label" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>Contacto</div>
            <h2 className="hn-cta-title">¿Tienes un proyecto<br />en mente?</h2>
            <p className="hn-cta-sub">
              Cuéntanos tu idea. Hacemos el análisis, el diseño y el desarrollo — entregamos software listo para usar.
            </p>
            <Link to="/contacto" className="hn-btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Iniciar proyecto →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};