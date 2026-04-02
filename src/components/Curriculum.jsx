import React from 'react';
import { Link } from 'react-router-dom';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --black: #080810; --surface: #0e0e1a; --card: #13131f;
    --border: rgba(255,255,255,0.07); --white: #f0f0f8;
    --muted: #6b6b88; --accent: #4f6ef7; --accent2: #9b5cf6;
  }

  .cv-root { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  /* ── HERO ── */
  .cv-hero { padding: 7rem 1.5rem 4rem; text-align: center; position: relative; overflow: hidden; }
  .cv-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(79,110,247,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cv-hero-inner { position: relative; z-index: 1; }

  .cv-label {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .7rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--accent); font-weight: 600; margin-bottom: 1.2rem;
  }
  .cv-label::before { content: ''; display: block; width: 18px; height: 1px; background: var(--accent); }

  .cv-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800; line-height: 1.05; letter-spacing: -.03em; margin-bottom: 1rem;
  }
  .cv-hero-title span {
    background: linear-gradient(135deg, #fff 30%, var(--accent) 70%, var(--accent2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .cv-hero-sub {
    color: var(--muted); font-size: clamp(.9rem, 2vw, 1.1rem);
    max-width: 480px; margin: 0 auto; line-height: 1.7; font-weight: 300;
  }

  /* ── LAYOUT ── */
  .cv-content { max-width: 820px; margin: 0 auto; padding: 3rem 1.5rem 6rem; }

  /* ── SECTION ── */
  .cv-section { margin-bottom: 3.5rem; }
  .cv-section-title {
    font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800;
    margin-bottom: 1.5rem; display: flex; align-items: center; gap: .75rem;
  }
  .cv-section-title-icon {
    width: 34px; height: 34px; border-radius: 8px;
    background: rgba(79,110,247,0.12); border: 1px solid rgba(79,110,247,0.2);
    display: flex; align-items: center; justify-content: center; font-size: .95rem; flex-shrink: 0;
  }
  .cv-divider { height: 1px; background: var(--border); margin-bottom: 3.5rem; }

  /* ── CARDS ── */
  .cv-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.6rem; margin-bottom: 1rem;
    transition: border-color .2s;
  }
  .cv-card:hover { border-color: rgba(79,110,247,.3); }

  .cv-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: .5rem; flex-wrap: wrap; }
  .cv-card-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin: 0; }
  .cv-badge {
    font-size: .68rem; letter-spacing: .08em; font-weight: 600; text-transform: uppercase;
    padding: .3rem .75rem; border-radius: 999px;
    background: rgba(79,110,247,0.15); border: 1px solid rgba(79,110,247,.3); color: var(--accent);
    white-space: nowrap; flex-shrink: 0;
  }
  .cv-badge.secondary {
    background: rgba(155,92,246,0.12); border-color: rgba(155,92,246,.3); color: #b57cf8;
  }
  .cv-card-subtitle { font-size: .8rem; color: var(--muted); margin-bottom: .75rem; font-weight: 500; }
  .cv-card-text { font-size: .9rem; color: rgba(240,240,248,0.7); line-height: 1.65; margin: 0; }

  .cv-checklist { list-style: none; padding: 0; margin: .75rem 0 0; display: flex; flex-direction: column; gap: .35rem; }
  .cv-checklist li {
    font-size: .85rem; color: rgba(240,240,248,0.6);
    display: flex; align-items: flex-start; gap: .5rem;
  }
  .cv-checklist li::before { content: '✓'; color: var(--accent); font-size: .8rem; margin-top: .05rem; flex-shrink: 0; }

  /* ── SKILLS ── */
  .cv-skills-grid { display: flex; flex-wrap: wrap; gap: .6rem; }
  .cv-skill-tag {
    font-size: .78rem; font-weight: 500; padding: .45rem 1rem; border-radius: 8px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--muted);
    transition: all .2s;
  }
  .cv-skill-tag:hover { border-color: rgba(79,110,247,.35); color: var(--white); }

  /* ── INFO GRID ── */
  .cv-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 540px) { .cv-info-grid { grid-template-columns: 1fr; } }

  .cv-info-item {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.1rem; transition: border-color .2s;
  }
  .cv-info-item:hover { border-color: rgba(79,110,247,.3); }
  .cv-info-label { font-size: .7rem; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; font-weight: 600; margin-bottom: .5rem; }
  .cv-info-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .3rem; }
  .cv-info-list li { font-size: .88rem; color: rgba(240,240,248,0.8); }

  /* ── CTA BUTTON ── */
  .cv-cta-wrap { text-align: center; margin-top: 2rem; }
  .cv-cta {
    display: inline-flex; align-items: center; gap: .6rem;
    padding: .9rem 2rem; background: var(--accent); border: none; border-radius: 10px;
    color: #fff; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: .95rem;
    text-decoration: none; cursor: pointer; transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 24px rgba(79,110,247,.35);
  }
  .cv-cta:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(79,110,247,.55); color: #fff; }

  /* ── CERT CARD ── */
  .cv-cert-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.2rem 1.4rem;
    display: flex; align-items: center; gap: 1rem; margin-bottom: .8rem;
    transition: border-color .2s;
  }
  .cv-cert-card:hover { border-color: rgba(79,110,247,.3); }
  .cv-cert-icon {
    width: 38px; height: 38px; border-radius: 8px;
    background: rgba(79,110,247,0.12); border: 1px solid rgba(79,110,247,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
  }
  .cv-cert-title { font-size: .9rem; font-weight: 500; margin-bottom: .15rem; }
  .cv-cert-meta { font-size: .75rem; color: var(--muted); }

  /* ── REVEAL ── */
  .hn-reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s, transform .65s; }
  .hn-reveal.visible { opacity: 1; transform: none; }
`;

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.hn-reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const SKILLS = [
  'JavaScript ES6+', 'React.js', 'Node.js', 'Express.js', 'Python',
  'Django / Flask', 'PostgreSQL', 'MySQL', 'MongoDB', 'HTML5 & CSS3',
  'Bootstrap 5', 'Git / GitHub', 'RESTful APIs', 'AWS / Google Cloud',
];

export const Curriculum = () => {
  useReveal();

  return (
    <>
      <style>{css}</style>
      <div className="cv-root">

        {/* HERO */}
        <section className="cv-hero">
          <div className="cv-hero-bg" />
          <div className="cv-hero-inner">
            <div className="cv-label">Currículum</div>
            <h1 className="cv-hero-title">
              Habilidades &amp;<br /><span>Experiencia</span>
            </h1>
            <p className="cv-hero-sub">
              Desarrollador Full Stack con enfoque en software robusto, APIs limpias y experiencias de usuario que importan.
            </p>
          </div>
        </section>

        <div className="cv-content">

          {/* EXPERIENCIA */}
          <section className="cv-section hn-reveal">
            <div className="cv-section-title">
              <div className="cv-section-title-icon">💼</div>
              Experiencia Profesional
            </div>

            <div className="cv-card">
              <div className="cv-card-header">
                <div className="cv-card-title">Desarrollador Full Stack</div>
                <span className="cv-badge">Ene 2022 – Actual</span>
              </div>
              <div className="cv-card-subtitle">Super Sistemas S.A</div>
              <p className="cv-card-text">
                Desarrollo y mantenimiento de aplicaciones web robustas con React en el frontend y SpringBoot en el backend.
                Integración de APIs RESTful, optimización de bases de datos e implementación de funcionalidades que mejoraron
                la eficiencia operativa en un 95%.
              </p>
              <ul className="cv-checklist">
                <li>Diseñé y desarrollé módulos clave para la gestión de clientes.</li>
                <li>Colaboré en la mejora continua de la arquitectura de software.</li>
              </ul>
            </div>

            <div className="cv-card">
              <div className="cv-card-header">
                <div className="cv-card-title">Desarrollador Frontend Junior</div>
                <span className="cv-badge secondary">Mar 2020 – Dic 2021</span>
              </div>
              <div className="cv-card-subtitle">PC Soluciones S.A</div>
              <p className="cv-card-text">
                Desarrollo de interfaces de usuario interactivas asegurando responsividad y accesibilidad.
                Implementación de componentes reutilizables y resolución de bugs en producción.
              </p>
            </div>
          </section>

          <div className="cv-divider" />

          {/* HABILIDADES */}
          <section className="cv-section hn-reveal">
            <div className="cv-section-title">
              <div className="cv-section-title-icon">🛠</div>
              Habilidades Técnicas
            </div>
            <div className="cv-skills-grid">
              {SKILLS.map(s => (
                <span key={s} className="cv-skill-tag">{s}</span>
              ))}
            </div>
          </section>

          <div className="cv-divider" />

          {/* EDUCACIÓN */}
          <section className="cv-section hn-reveal">
            <div className="cv-section-title">
              <div className="cv-section-title-icon">🎓</div>
              Educación
            </div>

            <div className="cv-card">
              <div className="cv-card-header">
                <div className="cv-card-title">Ingeniería en Sistemas / Desarrollo de Software</div>
                <span className="cv-badge">2013 – 2019</span>
              </div>
              <div className="cv-card-subtitle">Universidad Mariano Gálvez</div>
              <p className="cv-card-text">
                Enfoque en desarrollo de software, algoritmos, bases de datos y metodologías ágiles.
              </p>
            </div>

            <div className="cv-card">
              <div className="cv-card-header">
                <div className="cv-card-title">Curso Avanzado de React y Node.js</div>
                <span className="cv-badge secondary">2021</span>
              </div>
              <div className="cv-card-subtitle">EDteam</div>
              <p className="cv-card-text">
                Profundización en desarrollo full-stack: React Hooks, Context API, Express.js y MongoDB.
              </p>
            </div>
          </section>

          <div className="cv-divider" />

          {/* PROYECTOS */}
          <section className="cv-section hn-reveal">
            <div className="cv-section-title">
              <div className="cv-section-title-icon">{'</>'}</div>
              Proyectos Personales
            </div>
            <div className="cv-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
              <p className="cv-card-text" style={{ marginBottom: '1.5rem', maxWidth: 460, margin: '0 auto 1.5rem' }}>
                Mis proyectos personales reflejan mi curiosidad y dedicación — donde exploro nuevas tecnologías
                y consolido mis habilidades en entornos reales.
              </p>
              <div className="cv-cta-wrap">
                <Link to="/portafolio" className="cv-cta">
                  Explorar portafolio →
                </Link>
              </div>
            </div>
          </section>

          <div className="cv-divider" />

          {/* CERTIFICACIONES */}
          <section className="cv-section hn-reveal">
            <div className="cv-section-title">
              <div className="cv-section-title-icon">🏆</div>
              Reconocimientos y Certificaciones
            </div>

            <div className="cv-cert-card">
              <div className="cv-cert-icon">📜</div>
              <div>
                <div className="cv-cert-title">Certificación en Aplicación Estratégica en el uso de herramientas IA para la Enseñanza</div>
                <div className="cv-cert-meta">CITE-UMG · 2023</div>
              </div>
            </div>
          </section>

          <div className="cv-divider" />

          {/* INFO ADICIONAL */}
          <section className="cv-section hn-reveal">
            <div className="cv-section-title">
              <div className="cv-section-title-icon">ℹ️</div>
              Información Adicional
            </div>
            <div className="cv-info-grid">
              <div className="cv-info-item">
                <div className="cv-info-label">Idiomas</div>
                <ul className="cv-info-list">
                  <li>Español — Nativo</li>
                  <li>Inglés — Intermedio</li>
                </ul>
              </div>
              <div className="cv-info-item">
                <div className="cv-info-label">Intereses</div>
                <ul className="cv-info-list">
                  <li>Inteligencia Artificial y ML</li>
                  <li>Desarrollo de Videojuegos</li>
                  <li>Nuevas tecnologías</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};