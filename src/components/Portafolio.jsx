import React, { useState, useEffect } from 'react';

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
  }

  .pf-root {
    background: var(--black);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  /* HERO */
  .pf-hero {
    padding: 7rem 1.5rem 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .pf-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(79,110,247,0.13) 0%, transparent 70%);
    pointer-events: none;
  }
  .pf-hero-inner { position: relative; z-index: 1; }

  .pf-label {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .7rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--accent); font-weight: 600; margin-bottom: 1.2rem;
  }
  .pf-label::before {
    content: ''; display: block; width: 18px; height: 1px; background: var(--accent);
  }

  .pf-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800; line-height: 1.05; letter-spacing: -.03em;
    margin-bottom: 1rem;
  }
  .pf-hero-title span {
    background: linear-gradient(135deg, #fff 30%, var(--accent) 70%, var(--accent2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .pf-hero-sub {
    color: var(--muted); font-size: clamp(.9rem, 2vw, 1.1rem);
    max-width: 520px; margin: 0 auto; line-height: 1.7; font-weight: 300;
  }

  /* FILTER TABS */
  .pf-filters {
    display: flex; justify-content: center; gap: .5rem;
    flex-wrap: wrap; padding: 2rem 1.5rem 3rem;
  }
  .pf-filter-btn {
    padding: .45rem 1.1rem;
    border-radius: 999px;
    font-size: .8rem; font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    border: 1px solid var(--border);
    background: transparent; color: var(--muted);
    cursor: pointer; transition: all .2s;
    letter-spacing: .05em;
  }
  .pf-filter-btn:hover { border-color: rgba(255,255,255,0.2); color: var(--white); }
  .pf-filter-btn.active {
    background: var(--accent); border-color: var(--accent);
    color: #fff; box-shadow: 0 0 18px rgba(79,110,247,.4);
  }

  /* GRID */
  .pf-grid-wrap { padding: 0 1.5rem 6rem; max-width: 1100px; margin: 0 auto; }
  .pf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }

  /* CARD */
  .pf-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform .25s, border-color .25s, box-shadow .25s;
    animation: fadeUp .5s ease both;
  }
  .pf-card:hover {
    transform: translateY(-6px);
    border-color: rgba(79,110,247,0.4);
    box-shadow: 0 20px 50px rgba(0,0,0,.5);
  }

  .pf-card-img {
    width: 100%; height: 210px; object-fit: cover;
    display: block; opacity: .65; transition: opacity .3s;
  }
  .pf-card:hover .pf-card-img { opacity: .9; }

  .pf-card-img-placeholder {
    height: 210px;
    background: linear-gradient(135deg, #13131f, #1c1c30);
    display: flex; align-items: center; justify-content: center;
    font-size: 3.5rem;
  }

  .pf-card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }

  .pf-card-tag {
    display: inline-block;
    padding: .2rem .7rem;
    background: rgba(79,110,247,0.12);
    color: var(--accent); font-size: .7rem; font-weight: 600;
    letter-spacing: .1em; text-transform: uppercase;
    border-radius: 999px; border: 1px solid rgba(79,110,247,0.25);
    margin-bottom: .75rem; align-self: flex-start;
  }

  .pf-card-title {
    font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700;
    margin-bottom: .5rem; line-height: 1.3;
  }
  .pf-card-desc {
    color: var(--muted); font-size: .875rem;
    line-height: 1.65; font-weight: 300; flex: 1;
  }

  .pf-tech-row {
    display: flex; flex-wrap: wrap; gap: .4rem; margin-top: 1.2rem;
  }
  .pf-tech-pill {
    padding: .25rem .7rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 999px; font-size: .72rem; color: var(--muted);
  }

  /* FEATURED CARD (span 2 cols) */
  .pf-card-featured {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 720px) {
    .pf-card-featured { grid-column: span 1; grid-template-columns: 1fr; }
    .pf-card-featured .pf-card-img { height: 180px; }
  }

  .pf-featured-badge {
    display: inline-flex; align-items: center; gap: .35rem;
    font-size: .65rem; letter-spacing: .12em; text-transform: uppercase;
    color: #f59e0b; font-weight: 700; margin-bottom: .75rem;
  }
  .pf-featured-badge::before {
    content: '★'; font-size: .7rem;
  }

  /* CTA */
  .pf-cta {
    text-align: center; padding: 5rem 1.5rem;
    border-top: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .pf-cta-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 60% at 50% 100%, rgba(79,110,247,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .pf-cta-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800; letter-spacing: -.02em; margin-bottom: .75rem;
  }
  .pf-cta-sub { color: var(--muted); font-size: 1rem; margin-bottom: 2rem; font-weight: 300; }

  .pf-btn {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .85rem 2rem; background: var(--accent); color: #fff;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: .95rem; border-radius: 10px; text-decoration: none;
    transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 24px rgba(79,110,247,.35);
  }
  .pf-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(79,110,247,.55);
    color: #fff; text-decoration: none;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }

  .hn-reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s, transform .6s; }
  .hn-reveal.visible { opacity: 1; transform: none; }
`;

const projects = [
  {
    id: 1,
    featured: true,
    tag: 'Sistema de Cobranzas',
    emoji: null,
    img: null,
    title: 'CRUMAN — Gestión de Préstamos',
    desc: 'Sistema fullstack para gestionar carteras de préstamos, rutas de cobro diarias, seguimientos y reportes. Roles de usuario, reportes PDF/Excel, PWA y despliegue en AWS EC2.',
    techs: ['React', 'AdonisJS v6', 'PostgreSQL', 'AWS EC2', 'PWA', 'Lucide React'],
    category: 'sistemas',
  },
  {
    id: 2,
    tag: 'Corporativo',
    emoji: '🏢',
    img: 'corporativo.png',
    title: 'Plataforma Corporativa',
    desc: 'Gestión de usuarios, roles y operaciones empresariales en una sola plataforma centralizada.',
    techs: ['React', 'Node.js', 'PostgreSQL'],
    category: 'web',
  },
  {
    id: 3,
    tag: 'Inventario',
    emoji: '📦',
    img: 'inventarios.png',
    title: 'Sistema de Inventario',
    desc: 'Control de productos en tiempo real con alertas de stock, movimientos y reportes automáticos.',
    techs: ['React', 'Express', 'MySQL'],
    category: 'sistemas',
  },
  {
    id: 4,
    tag: 'Dashboard',
    emoji: '📊',
    img: 'dashboardAdmin.png',
    title: 'Dashboard Administrativo',
    desc: 'Panel interactivo para análisis de KPIs con gráficos dinámicos y filtros personalizados en tiempo real.',
    techs: ['React', 'Chart.js', 'REST API'],
    category: 'web',
  },
  {
    id: 5,
    tag: 'Reservas',
    emoji: '📅',
    img: 'reservas.png',
    title: 'Sistema de Reservas',
    desc: 'Gestión de turnos y citas con notificaciones automáticas y panel de administración completo.',
    techs: ['React', 'Node.js', 'PostgreSQL'],
    category: 'sistemas',
  },
  {
    id: 6,
    tag: 'App Móvil',
    emoji: '🛵',
    img: 'aplicaciones.jpg',
    title: 'App de Servicios',
    desc: 'Aplicación de pedidos y servicios a domicilio con seguimiento en tiempo real.',
    techs: ['React Native', 'Express', 'Maps API'],
    category: 'apps',
  },
  {
    id: 7,
    tag: 'Blog',
    emoji: '✍️',
    img: 'blog.png',
    title: 'Blog Tecnológico',
    desc: 'Blog optimizado con SEO, CMS personalizado y secciones dinámicas de contenido editorial.',
    techs: ['React', 'Node.js', 'MongoDB'],
    category: 'web',
  },
];

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'sistemas', label: 'Sistemas' },
  { key: 'web', label: 'Web' },
  { key: 'apps', label: 'Apps' },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.hn-reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export const Portafolio = () => {
  const [active, setActive] = useState('all');
  useReveal();

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <style>{css}</style>
      <div className="pf-root">

        {/* HERO */}
        <section className="pf-hero">
          <div className="pf-hero-bg" />
          <div className="pf-hero-inner">
            <div className="pf-label">Portafolio</div>
            <h1 className="pf-hero-title">
              Proyectos que <span>hablan</span><br />por nosotros
            </h1>
            <p className="pf-hero-sub">
              Cada sistema que construimos resuelve un problema real. Aquí están algunos de los proyectos que hemos entregado.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <div className="pf-filters">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`pf-filter-btn${active === f.key ? ' active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="pf-grid-wrap hn-reveal">
          <div className="pf-grid">
            {filtered.map((p, i) => (
              p.featured ? (
                <div key={p.id} className="pf-card pf-card-featured" style={{ animationDelay: `${i * .07}s` }}>
                  {/* Visual side */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(79,110,247,0.15), rgba(155,92,246,0.1))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 260, position: 'relative', overflow: 'hidden'
                  }}>
                    {/* Mini mock */}
                    <div style={{
                      width: '80%', background: '#0e0e1a',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                      overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,.6)'
                    }}>
                      <div style={{ background: '#1a1a2e', padding: '.5rem 1rem', display: 'flex', gap: '.35rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['#ff5f57','#febc2e','#28c840'].map(c => (
                          <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                        ))}
                        <span style={{ marginLeft: 'auto', fontSize: '.6rem', color: '#444', fontFamily: 'monospace' }}>cruman.net</span>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        {[80,55,90,40,65].map((w,i) => (
                          <div key={i} style={{ height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginBottom: '.5rem', width: `${w}%`, opacity: 1 - i*.1 }} />
                        ))}
                        <div style={{ display: 'flex', gap: '.5rem', marginTop: '.8rem' }}>
                          <div style={{ flex:1, height:28, borderRadius:6, background:'rgba(79,110,247,.3)', border:'1px solid rgba(79,110,247,.4)' }} />
                          <div style={{ flex:1, height:28, borderRadius:6, background:'rgba(255,255,255,.04)' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Content side */}
                  <div className="pf-card-body">
                    <div className="pf-featured-badge">Proyecto destacado</div>
                    <div className="pf-card-tag">{p.tag}</div>
                    <div className="pf-card-title" style={{ fontSize: '1.4rem' }}>{p.title}</div>
                    <div className="pf-card-desc">{p.desc}</div>
                    <div className="pf-tech-row">
                      {p.techs.map(t => <span className="pf-tech-pill" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={p.id} className="pf-card" style={{ animationDelay: `${i * .07}s` }}>
                  {p.img
                    ? <img src={`${import.meta.env.BASE_URL}images/${p.img}`} alt={p.title} className="pf-card-img" />
                    : <div className="pf-card-img-placeholder">{p.emoji}</div>
                  }
                  <div className="pf-card-body">
                    <div className="pf-card-tag">{p.tag}</div>
                    <div className="pf-card-title">{p.title}</div>
                    <div className="pf-card-desc">{p.desc}</div>
                    <div className="pf-tech-row">
                      {p.techs.map(t => <span className="pf-tech-pill" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="pf-cta">
          <div className="pf-cta-bg" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="pf-label" style={{ justifyContent: 'center', marginBottom: '1.2rem' }}>¿Te convencimos?</div>
            <div className="pf-cta-title">¿Quieres un sistema así?</div>
            <p className="pf-cta-sub">Cuéntanos tu idea y construimos algo igual de sólido para tu negocio.</p>
            <a href="/contacto" className="pf-btn">Iniciar proyecto →</a>
          </div>
        </section>

      </div>
    </>
  );
};