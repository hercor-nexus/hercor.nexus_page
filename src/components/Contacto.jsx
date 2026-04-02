import React, { useState, useEffect } from 'react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --black: #080810; --surface: #0e0e1a; --card: #13131f;
    --border: rgba(255,255,255,0.07); --white: #f0f0f8;
    --muted: #6b6b88; --accent: #4f6ef7; --accent2: #9b5cf6;
  }

  .ct-root { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  .ct-hero { padding: 7rem 1.5rem 4rem; text-align: center; position: relative; overflow: hidden; }
  .ct-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(79,110,247,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .ct-hero-inner { position: relative; z-index: 1; }

  .ct-label {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .7rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--accent); font-weight: 600; margin-bottom: 1.2rem;
  }
  .ct-label::before { content: ''; display: block; width: 18px; height: 1px; background: var(--accent); }

  .ct-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 6vw, 4.5rem);
    font-weight: 800; line-height: 1.05; letter-spacing: -.03em; margin-bottom: 1rem;
  }
  .ct-hero-title span {
    background: linear-gradient(135deg, #fff 30%, var(--accent) 70%, var(--accent2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .ct-hero-sub {
    color: var(--muted); font-size: clamp(.9rem, 2vw, 1.1rem);
    max-width: 480px; margin: 0 auto; line-height: 1.7; font-weight: 300;
  }

  .ct-layout {
    display: grid; grid-template-columns: 1fr 1.6fr;
    gap: 3rem; max-width: 1000px; margin: 0 auto; padding: 3rem 1.5rem 6rem; align-items: start;
  }
  @media (max-width: 768px) { .ct-layout { grid-template-columns: 1fr; gap: 2rem; } }

  .ct-info-title { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem; }

  .ct-contact-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
  .ct-contact-item {
    display: flex; align-items: flex-start; gap: 1rem;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.1rem; transition: border-color .2s;
  }
  .ct-contact-item:hover { border-color: rgba(79,110,247,.3); }
  .ct-contact-icon {
    width: 38px; height: 38px; border-radius: 8px;
    background: rgba(79,110,247,0.12); border: 1px solid rgba(79,110,247,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
  }
  .ct-contact-label { font-size: .7rem; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; font-weight: 600; margin-bottom: .2rem; }
  .ct-contact-val { font-size: .9rem; font-weight: 400; }
  .ct-contact-val a { color: var(--white); text-decoration: none; }
  .ct-contact-val a:hover { color: var(--accent); }

  .ct-avail {
    display: inline-flex; align-items: center; gap: .5rem; padding: .5rem 1rem; border-radius: 999px;
    background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); font-size: .78rem; color: #4ade80; font-weight: 500;
  }
  .ct-avail-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 8px #4ade80; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

  .ct-form-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; transition: border-color .25s; }
  .ct-form-card:focus-within { border-color: rgba(79,110,247,.3); }

  .ct-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 500px) { .ct-form-row { grid-template-columns: 1fr; } }

  .ct-field { display: flex; flex-direction: column; gap: .45rem; margin-bottom: 1.1rem; }

  .ct-label-field { font-size: .75rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }

  .ct-input {
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    border-radius: 10px; padding: .75rem 1rem; color: var(--white);
    font-family: 'DM Sans', sans-serif; font-size: .92rem; font-weight: 400;
    transition: border-color .2s, box-shadow .2s; outline: none; width: 100%; resize: vertical;
  }
  .ct-input::placeholder { color: rgba(107,107,136,0.6); }
  .ct-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(79,110,247,0.12); }

  .ct-service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: .6rem; margin-bottom: 1.1rem; }
  .ct-service-option {
    padding: .6rem .8rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    border-radius: 8px; font-size: .78rem; color: var(--muted);
    cursor: pointer; transition: all .2s; text-align: center; user-select: none;
  }
  .ct-service-option:hover { border-color: rgba(79,110,247,.35); color: var(--white); }
  .ct-service-option.selected { background: rgba(79,110,247,0.15); border-color: rgba(79,110,247,.5); color: var(--white); }

  .ct-submit {
    width: 100%; padding: 1rem; background: var(--accent); border: none; border-radius: 10px;
    color: #fff; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 1rem;
    cursor: pointer; transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 24px rgba(79,110,247,.35); margin-top: 1.5rem;
  }
  .ct-submit:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(79,110,247,.55); }
  .ct-submit:disabled { opacity: .5; cursor: not-allowed; transform: none; }

  .ct-success { text-align: center; padding: 3rem 1.5rem; animation: fadeUp .5s ease both; }
  .ct-success-icon { font-size: 3rem; margin-bottom: 1rem; }
  .ct-success-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; margin-bottom: .5rem; }
  .ct-success-sub { color: var(--muted); font-size: .95rem; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  .hn-reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s, transform .65s; }
  .hn-reveal.visible { opacity: 1; transform: none; }
`;

const SERVICE_OPTIONS = [
  'Desarrollo Web', 'Sistema a Medida', 'App / PWA',
  'Backend & API', 'Deploy & AWS', 'Mantenimiento',
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

export const Contacto = () => {
  useReveal();
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', empresa: '', mensaje: '' });
  const [selectedServices, setSelectedServices] = useState([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggle = s => setSelectedServices(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  );

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.mensaje) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <style>{css}</style>
      <div className="ct-root">

        <section className="ct-hero">
          <div className="ct-hero-bg" />
          <div className="ct-hero-inner">
            <div className="ct-label">Contacto</div>
            <h1 className="ct-hero-title">
              Cuéntanos tu<br /><span>proyecto</span>
            </h1>
            <p className="ct-hero-sub">
              Sin formularios largos ni llamadas innecesarias. Escríbenos y te respondemos en menos de 24 horas.
            </p>
          </div>
        </section>

        <div className="ct-layout hn-reveal">

          <div>
            <div className="ct-info-title">Datos de contacto</div>
            <div className="ct-contact-items">
              <div className="ct-contact-item">
                <div className="ct-contact-icon">📧</div>
                <div>
                  <div className="ct-contact-label">Email</div>
                  <div className="ct-contact-val"><a href="mailto:hola@hercor.nexus">hola@hercor.nexus</a></div>
                </div>
              </div>
                <div className="ct-contact-item">
                <div className="ct-contact-icon">💬</div>
                <div>
                  <div className="ct-contact-label">WhatsApp</div>
                  <div className="ct-contact-val"><a href="https://wa.me/50246895692" target="_blank" rel="noreferrer">+502 4689-5692</a></div>
                  <div className="ct-contact-val"><a href="https://wa.me/50249754449" target="_blank" rel="noreferrer">+502 4975-4449</a></div>
                </div>
              </div>
              <div className="ct-contact-item">
                <div className="ct-contact-icon">📍</div>
                <div>
                  <div className="ct-contact-label">Ubicación</div>
                  <div className="ct-contact-val">Guatemala — trabajo remoto</div>
                </div>
              </div>
              <div className="ct-contact-item">
                <div className="ct-contact-icon">🐙</div>
                <div>
                  <div className="ct-contact-label">GitHub</div>
                  <div className="ct-contact-val"><a href="https://github.com/hercor-nexus" target="_blank" rel="noreferrer">github.com/hercor-nexus</a></div>
                </div>
              </div>
            </div>
            <div className="ct-avail">
              <div className="ct-avail-dot" />
              Disponibles para nuevos proyectos
            </div>
          </div>

          <div className="ct-form-card">
            {sent ? (
              <div className="ct-success">
                <div className="ct-success-icon">✅</div>
                <div className="ct-success-title">¡Mensaje enviado!</div>
                <p className="ct-success-sub">Te respondemos en menos de 24 horas. Mientras tanto puedes ver nuestro portafolio.</p>
              </div>
            ) : (
              <>
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label className="ct-label-field">Nombre *</label>
                    <input className="ct-input" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label-field">Apellido</label>
                    <input className="ct-input" name="apellido" placeholder="Tu apellido" value={form.apellido} onChange={handleChange} />
                  </div>
                </div>
                <div className="ct-field">
                  <label className="ct-label-field">Email *</label>
                  <input className="ct-input" name="email" type="email" placeholder="tucorreo@ejemplo.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="ct-field">
                  <label className="ct-label-field">Empresa / Negocio</label>
                  <input className="ct-input" name="empresa" placeholder="Nombre de tu empresa (opcional)" value={form.empresa} onChange={handleChange} />
                </div>
                <div className="ct-field" style={{ marginBottom: '1.1rem' }}>
                  <label className="ct-label-field">¿Qué necesitas?</label>
                  <div className="ct-service-grid">
                    {SERVICE_OPTIONS.map(s => (
                      <div
                        key={s}
                        className={`ct-service-option${selectedServices.includes(s) ? ' selected' : ''}`}
                        onClick={() => toggle(s)}
                      >{s}</div>
                    ))}
                  </div>
                </div>
                <div className="ct-field">
                  <label className="ct-label-field">Cuéntanos tu proyecto *</label>
                  <textarea
                    className="ct-input" name="mensaje" rows={5}
                    placeholder="Describe brevemente qué quieres construir, qué problema tienes o qué necesitas mejorar..."
                    value={form.mensaje} onChange={handleChange}
                  />
                </div>
                <button
                  className="ct-submit"
                  onClick={handleSubmit}
                  disabled={sending || !form.nombre || !form.email || !form.mensaje}
                >
                  {sending ? 'Enviando...' : 'Enviar mensaje →'}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
};