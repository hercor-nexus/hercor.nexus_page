import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Settings, Smartphone, Database, Cloud, Wrench } from 'lucide-react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --black: #080810; --surface: #0e0e1a; --card: #13131f;
    --border: rgba(255,255,255,0.07); --white: #f0f0f8;
    --muted: #6b6b88; --accent: #4f6ef7; --accent2: #9b5cf6;
  }

  .sv-root { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  .sv-hero {
    padding: 7rem 1.5rem 5rem; text-align: center; position: relative; overflow: hidden;
  }
  .sv-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,92,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .sv-hero-inner { position: relative; z-index: 1; }

  .sv-label {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .7rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--accent2); font-weight: 600; margin-bottom: 1.2rem;
  }
  .sv-label::before { content: ''; display: block; width: 18px; height: 1px; background: var(--accent2); }

  .sv-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800; line-height: 1.05; letter-spacing: -.03em; margin-bottom: 1rem;
  }
  .sv-hero-title span {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .sv-hero-sub {
    color: var(--muted); font-size: clamp(.9rem, 2vw, 1.1rem);
    max-width: 540px; margin: 0 auto; line-height: 1.7; font-weight: 300;
  }

  .sv-main { max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem; }

  .sv-big-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5px;
    border: 1.5px solid var(--border);
    border-radius: 20px; overflow: hidden;
    margin-bottom: 5rem;
  }

  .sv-big-card {
    background: var(--card); padding: 2.5rem;
    transition: background .25s; position: relative; overflow: hidden;
  }
  .sv-big-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transform: scaleX(0); transform-origin: left; transition: transform .35s;
  }
  .sv-big-card:hover { background: #16162a; }
  .sv-big-card:hover::after { transform: scaleX(1); }

  .sv-card-icon {
    width: 52px; height: 52px; border-radius: 12px;
    background: rgba(79,110,247,0.12); border: 1px solid rgba(79,110,247,0.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent); margin-bottom: 1.5rem;
  }
  .sv-card-name {
    font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 700;
    margin-bottom: .6rem; line-height: 1.25;
  }
  .sv-card-desc { color: var(--muted); font-size: .88rem; line-height: 1.65; font-weight: 300; }

  .sv-card-list { margin-top: 1.2rem; list-style: none; padding: 0; }
  .sv-card-list li {
    color: var(--muted); font-size: .82rem; padding: .3rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex; align-items: center; gap: .5rem;
  }
  .sv-card-list li:last-child { border-bottom: none; }
  .sv-card-list li::before { content: '→'; color: var(--accent); font-size: .75rem; flex-shrink: 0; }

  .sv-process { padding: 2rem 1.5rem 5rem; max-width: 1100px; margin: 0 auto; }
  .sv-section-head { margin-bottom: 3.5rem; }
  .sv-section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800; letter-spacing: -.02em; margin-top: .5rem;
  }
  .sv-section-sub { color: var(--muted); font-size: 1rem; margin-top: .5rem; font-weight: 300; }

  .sv-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }
  .sv-step {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 2rem;
    transition: border-color .25s, transform .25s;
    position: relative; overflow: hidden;
  }
  .sv-step:hover { border-color: rgba(79,110,247,.35); transform: translateY(-4px); }

  .sv-step-num {
    font-family: 'Syne', sans-serif; font-size: 3.5rem; font-weight: 800;
    line-height: 1; color: rgba(79,110,247,0.15); margin-bottom: .75rem;
    letter-spacing: -.04em;
  }
  .sv-step-name {
    font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: .5rem;
  }
  .sv-step-desc { color: var(--muted); font-size: .82rem; line-height: 1.6; font-weight: 300; }

  .sv-stack { padding: 2rem 1.5rem 5rem; max-width: 1100px; margin: 0 auto; }
  .sv-stack-grid {
    display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2.5rem;
  }
  .sv-stack-pill {
    padding: .6rem 1.2rem;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 999px; font-size: .85rem; color: var(--white);
    font-weight: 400; transition: border-color .2s, transform .2s;
  }
  .sv-stack-pill:hover { border-color: rgba(79,110,247,.4); transform: translateY(-2px); }

  .sv-cta {
    text-align: center; padding: 6rem 1.5rem;
    border-top: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .sv-cta-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 70% at 50% 100%, rgba(79,110,247,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .sv-cta-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800; letter-spacing: -.02em; margin-bottom: .75rem;
    position: relative; z-index: 1;
  }
  .sv-cta-sub { color: var(--muted); font-size: 1rem; margin-bottom: 2rem; font-weight: 300; position: relative; z-index: 1; }

  .sv-btn {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .9rem 2.2rem; background: var(--accent); color: #fff;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: .95rem; border-radius: 10px; text-decoration: none;
    transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 24px rgba(79,110,247,.35); position: relative; z-index: 1;
  }
  .sv-btn:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(79,110,247,.55); color: #fff; text-decoration: none; }

  .hn-reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s, transform .65s; }
  .hn-reveal.visible { opacity: 1; transform: none; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
`;

const services = [
  {
    icon: <Globe size={22} strokeWidth={1.5} />,
    name: 'Desarrollo Web',
    desc: 'Sitios y aplicaciones modernas que cargan rápido, se ven bien en cualquier dispositivo y están listas para escalar.',
    list: ['Landing pages & sitios corporativos', 'Aplicaciones web complejas', 'Optimización SEO & rendimiento', 'Diseño responsivo mobile-first'],
  },
  {
    icon: <Settings size={22} strokeWidth={1.5} />,
    name: 'Sistemas a Medida',
    desc: 'Software hecho exactamente para tu negocio. Sin soluciones genéricas: analizamos tu flujo y construimos algo que realmente funcione.',
    list: ['Gestión de clientes & ventas', 'Control de inventarios', 'Sistemas de cobranzas & préstamos', 'Facturación y reportes automáticos'],
  },
  {
    icon: <Smartphone size={22} strokeWidth={1.5} />,
    name: 'Apps & PWA',
    desc: 'Aplicaciones progresivas que se instalan como apps nativas pero funcionan desde el navegador. Cero fricción para el usuario final.',
    list: ['Progressive Web Apps (PWA)', 'Apps de pedidos & servicios', 'Notificaciones push', 'Funcionan offline'],
  },
  {
    icon: <Database size={22} strokeWidth={1.5} />,
    name: 'Backend & APIs',
    desc: 'La columna vertebral de cualquier sistema. Bases de datos robustas, APIs bien diseñadas y servidores que no se caen.',
    list: ['APIs REST con AdonisJS / Express', 'Bases de datos PostgreSQL & MySQL', 'Autenticación & roles de usuario', 'Procesos automatizados & cron jobs'],
  },
  {
    icon: <Cloud size={22} strokeWidth={1.5} />,
    name: 'Deploy & AWS',
    desc: 'Tu sistema en producción, seguro y monitoreado. Configuramos servidores, dominios, HTTPS y te dejamos listo para operar.',
    list: ['AWS EC2 & S3', 'PM2 process management', "SSL con Let's Encrypt", 'GitHub Pages & dominios custom'],
  },
  {
    icon: <Wrench size={22} strokeWidth={1.5} />,
    name: 'Mantenimiento',
    desc: 'Soporte técnico continuo para que tu sistema nunca falle. Actualizaciones, mejoras y resolución de bugs con respuesta rápida.',
    list: ['Soporte mensual recurrente', 'Actualizaciones de seguridad', 'Nuevas funcionalidades', 'Monitoreo y respaldo de datos'],
  },
];

const steps = [
  { num: '01', name: 'Análisis', desc: 'Entendemos tu negocio, los procesos actuales y qué problema necesitas resolver.' },
  { num: '02', name: 'Propuesta', desc: 'Definimos alcance, tecnología, tiempos y costo. Sin sorpresas después.' },
  { num: '03', name: 'Desarrollo', desc: 'Construimos iterando contigo. Ves el progreso desde el primer sprint.' },
  { num: '04', name: 'Entrega', desc: 'Desplegamos en producción, te capacitamos y quedamos disponibles para soporte.' },
];

const stack = [
  'React', 'Node.js', 'AdonisJS v6', 'PostgreSQL', 'MySQL',
  'AWS EC2', 'Ubuntu Server', 'Vite', 'Tailwind CSS',
  'PDF Reports', 'Excel Export', 'JWT Auth', 'PWA', 'PM2',
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.hn-reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export const Servicios = () => {
  useReveal();
  return (
    <>
      <style>{css}</style>
      <div className="sv-root">

        <section className="sv-hero">
          <div className="sv-hero-bg" />
          <div className="sv-hero-inner">
            <div className="sv-label">Servicios</div>
            <h1 className="sv-hero-title">
              Lo que hacemos,<br /><span>y lo hacemos bien</span>
            </h1>
            <p className="sv-hero-sub">
              No somos una agencia genérica. Somos dos desarrolladores que entienden de negocio y construyen software que funciona de verdad.
            </p>
          </div>
        </section>

        <section className="sv-main hn-reveal">
          <div className="sv-big-grid">
            {services.map((s, i) => (
              <div className="sv-big-card" key={i}>
                <div className="sv-card-icon">{s.icon}</div>
                <div className="sv-card-name">{s.name}</div>
                <div className="sv-card-desc">{s.desc}</div>
                <ul className="sv-card-list">
                  {s.list.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="sv-process hn-reveal">
          <div className="sv-section-head">
            <div className="sv-label">Proceso</div>
            <div className="sv-section-title">¿Cómo trabajamos?</div>
            <p className="sv-section-sub">Proceso claro, sin burocracia, con entrega real.</p>
          </div>
          <div className="sv-steps">
            {steps.map((s, i) => (
              <div className="sv-step" key={i}>
                <div className="sv-step-num">{s.num}</div>
                <div className="sv-step-name">{s.name}</div>
                <div className="sv-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="sv-stack hn-reveal">
          <div className="sv-section-head">
            <div className="sv-label">Tecnología</div>
            <div className="sv-section-title">Stack que usamos</div>
            <p className="sv-section-sub">Herramientas modernas, probadas en producción real.</p>
          </div>
          <div className="sv-stack-grid">
            {stack.map((t, i) => (
              <div className="sv-stack-pill" key={i}>{t}</div>
            ))}
          </div>
        </section>

        <section className="sv-cta">
          <div className="sv-cta-bg" />
          <div className="sv-label" style={{ justifyContent: 'center', marginBottom: '1.2rem' }}>Empecemos</div>
          <div className="sv-cta-title">¿Necesitas alguno de estos servicios?</div>
          <p className="sv-cta-sub">Escríbenos, cuéntanos tu proyecto y te respondemos rápido.</p>
          <Link to="/contacto" className="sv-btn">Solicitar consulta →</Link>
        </section>

      </div>
    </>
  );
};