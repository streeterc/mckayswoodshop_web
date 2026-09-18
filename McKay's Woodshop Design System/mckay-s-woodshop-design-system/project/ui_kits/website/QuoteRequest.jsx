const { Button, Card, Field, Input, Select, Textarea, Icon } = window.McKaySWoodshopDesignSystem_ff08a8;

const CATEGORIES = [
  { id: 'furniture', label: 'Furniture', desc: 'Tables, chairs, cabinets', icon: 'armchair' },
  { id: 'builtins', label: 'Built-ins', desc: 'Shelving, closets, benches', icon: 'library' },
  { id: 'outdoor', label: 'Outdoor', desc: 'Decks, pergolas, planters', icon: 'trees' },
  { id: 'restoration', label: 'Restoration', desc: 'Repair an existing piece', icon: 'hammer' },
  { id: 'other', label: 'Not sure yet / something else', desc: "Tell me a bit and we'll figure it out together", icon: 'circle-help', wide: true },
];

const CAT_LABELS = { furniture: 'Furniture', builtins: 'Built-ins', outdoor: 'Outdoor', restoration: 'Restoration', other: 'Not sure yet' };

function formatLength(inches) {
  if (inches <= 12) return inches + ' in';
  const ft = Math.floor(inches / 12), rem = inches % 12;
  return rem === 0 ? ft + ' ft' : ft + ' ft ' + rem + ' in';
}

function Chip({ selected, onClick, children, style }) {
  return (
    <button type="button" onClick={onClick} style={{
      flex: '1 1 auto', minWidth: '6.5em', padding: '9px 12px', cursor: 'pointer',
      border: `1px solid ${selected ? 'var(--forest-700)' : 'var(--line-default)'}`, borderRadius: 'var(--radius-field)',
      background: selected ? 'var(--surface-inverse)' : 'var(--surface-card)',
      color: selected ? 'var(--text-on-forest)' : 'var(--text-body)',
      font: 'var(--type-body-sm)', textAlign: 'center', transition: 'var(--transition-color)', ...style,
    }}>{children}</button>
  );
}

function Slider({ min, max, value, onChange, scale }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <input type="range" min={min} max={max} step="1" value={value} onChange={(e) => onChange(+e.target.value)} style={{ flex: 1, accentColor: 'var(--copper-600)' }} />
        <span style={{ minWidth: '4.5em', textAlign: 'right', font: 'var(--type-spec)', fontWeight: 600, color: 'var(--text-heading)' }}>{formatLength(value)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--type-spec)', color: 'var(--text-faint)', marginTop: 4 }}>
        <span>{scale[0]}</span><span>{scale[1]}</span>
      </div>
    </div>
  );
}

function QuoteRequest({ go }) {
  const [step, setStep] = React.useState(1);
  const [cat, setCat] = React.useState(null);
  const [size, setSize] = React.useState(36);
  const [wall, setWall] = React.useState(60);
  const [exposure, setExposure] = React.useState(null);
  const [timeline, setTimeline] = React.useState(null);
  const [photos, setPhotos] = React.useState(0);
  const [method, setMethod] = React.useState(null);
  const [c, setC] = React.useState({ name: '', city: '', email: '', phone: '' });

  const pick = (id) => { setCat(id); setStep(2); };
  const isRestoration = cat === 'restoration';
  let step2Ok = !!cat && !!timeline;
  if (cat === 'outdoor') step2Ok = step2Ok && !!exposure;
  if (isRestoration) step2Ok = step2Ok && photos > 0;
  const step3Ok = c.name.trim() && c.city.trim() && (c.email.trim() || c.phone.trim());

  const label = (t) => <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-heading)', marginBottom: 6 }}>{t}</div>;
  const hint = (t) => <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 6 }}>{t}</p>;

  return (
    <section style={{ padding: 'var(--section-y-tight) 40px var(--section-y)', display: 'grid', placeItems: 'start center' }}>
      <Card padding="lg" style={{ width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)' }}>Request a quote</h3>
          <button onClick={() => go('home')} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'var(--text-xl)/1 var(--font-ui)', color: 'var(--forest-700)' }}>×</button>
        </div>

        <div style={{ display: 'flex', gap: 8, margin: '20px 0 24px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 'var(--radius-xs)', background: i <= step ? 'var(--copper-600)' : 'var(--line-hairline)' }} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <div style={{ font: 'var(--type-spec)', color: 'var(--text-muted)', marginBottom: 6 }}>Step 1 of 3</div>
            <h4 style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>What are you looking to build?</h4>
            {hint('Pick the closest match — you can add detail next.')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
              {CATEGORIES.map((t) => (
                <button key={t.id} type="button" onClick={() => pick(t.id)} style={{
                  gridColumn: t.wide ? '1 / -1' : 'auto', display: 'flex', gap: 12,
                  flexDirection: t.wide ? 'row' : 'column', alignItems: t.wide ? 'center' : 'flex-start',
                  padding: 16, background: 'var(--surface-sunken)', border: `1px solid ${cat === t.id ? 'var(--line-accent)' : 'var(--line-hairline)'}`,
                  borderRadius: 'var(--radius-field)', textAlign: 'left', cursor: 'pointer',
                }}>
                  <span style={{ color: 'var(--forest-700)', display: 'flex' }}><Icon name={t.icon} size={24} /></span>
                  <span>
                    <span style={{ display: 'block', font: 'var(--type-h4)', color: 'var(--forest-700)' }}>{t.label}</span>
                    <span style={{ display: 'block', font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>{t.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ font: 'var(--type-spec)', color: 'var(--text-muted)', marginBottom: 6 }}>Step 2 of 3 — {CAT_LABELS[cat]}</div>
              <h4 style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>Project details</h4>
              {hint('Drag, tap and choose — no need to type here.')}
            </div>

            <div>{label('Approximate size')}<Slider min={6} max={240} value={size} onChange={setSize} scale={['6 in', '20 ft']} /></div>

            {cat === 'builtins' && (
              <div style={{ borderLeft: '2px solid var(--line-accent)', paddingLeft: 16 }}>
                {label('Available wall width')}<Slider min={12} max={240} value={wall} onChange={setWall} scale={['1 ft', '20 ft']} />
              </div>
            )}

            <Field label="Room / setting"><Select options={['Living Room', 'Kitchen', 'Dining', 'Bedroom', 'Office', 'Outdoor', 'Other']} /></Field>
            <Field label="Wood / material preference"><Select options={['Oak', 'Walnut', 'Maple', 'Cherry', 'Pine', 'Reclaimed', "Not sure — let's discuss"]} /></Field>

            {cat === 'outdoor' && (
              <div style={{ borderLeft: '2px solid var(--line-accent)', paddingLeft: 16 }}>
                {label('Exposure')}
                <div style={{ display: 'flex', gap: 8 }}>
                  <Chip selected={exposure === 'uncovered'} onClick={() => setExposure('uncovered')}>Uncovered</Chip>
                  <Chip selected={exposure === 'covered'} onClick={() => setExposure('covered')}>Covered</Chip>
                </div>
              </div>
            )}

            <div>
              {label('Timeline')}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['No rush', '3 months', '1 month', 'ASAP'].map((t) => <Chip key={t} selected={timeline === t} onClick={() => setTimeline(t)}>{t}</Chip>)}
              </div>
            </div>

            <div>
              {label(isRestoration ? 'Photos of the piece' : 'Reference photos')}
              {isRestoration && <span style={{ font: 'var(--type-label)', color: 'var(--copper-700)', marginLeft: 6 }}>Required</span>}
              <button type="button" onClick={() => setPhotos(Math.min(photos + 1, 3))} style={{
                display: 'block', width: '100%', padding: 24, cursor: 'pointer', background: 'var(--surface-card)',
                border: `1.5px dashed ${isRestoration && photos === 0 ? 'var(--copper-700)' : 'var(--line-default)'}`,
                borderRadius: 'var(--radius-field)', textAlign: 'center',
              }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center', marginBottom: 8 }}><Icon name="upload" size={20} /></span>
                <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--forest-700)' }}>Tap to add photos</strong><br />or choose up to 3 images</span>
              </button>
              {photos > 0 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {Array.from({ length: photos }).map((_, i) => (
                    <div key={i} style={{ width: 48, height: 48, borderRadius: 'var(--radius-field)', background: 'var(--surface-sunken)', border: '1px solid var(--line-hairline)', display: 'grid', placeItems: 'center', font: 'var(--type-spec)', fontSize: 9, color: 'var(--text-muted)' }}>IMG</div>
                  ))}
                </div>
              )}
              {hint(isRestoration ? 'Show me the piece and any damage — at least one photo.' : 'Optional — helps me understand what you have in mind.')}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button variant="accent" disabled={!step2Ok} onClick={() => setStep(3)}>Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ font: 'var(--type-spec)', color: 'var(--text-muted)', marginBottom: 6 }}>Step 3 of 3</div>
              <h4 style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>How should I reach you?</h4>
              {hint('Just enough to send your quote — no account needed.')}
            </div>

            <Field label="Name"><Input placeholder="Full name" value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} /></Field>
            <Field label="City"><Input placeholder="Where's the project?" value={c.city} onChange={(e) => setC({ ...c, city: e.target.value })} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Email"><Input type="email" placeholder="you@example.com" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} /></Field>
              <Field label="Phone" hint="Optional if email given"><Input type="tel" placeholder="(555) 555-5555" value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} /></Field>
            </div>

            <div>
              {label('Preferred contact method')}
              <div style={{ display: 'flex', gap: 8 }}>
                <Chip selected={method === 'Call'} onClick={() => setMethod('Call')}>Call me</Chip>
                <Chip selected={method === 'Email'} onClick={() => setMethod('Email')}>Email me</Chip>
              </div>
            </div>

            <Field label="Anything else I should know?" hint="Optional"><Textarea rows={3} /></Field>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
              <Button variant="accent" disabled={!step3Ok} onClick={() => setStep(4)}>Send request</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, padding: '16px 0' }}>
            <span style={{ color: 'var(--copper-600)', display: 'flex' }}><Icon name="circle-check" size={40} /></span>
            <h4 style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>Request sent</h4>
            <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', maxWidth: '34ch' }}>I'll read it and get back to you within two business days, usually sooner.</p>
            <Button variant="ghost" onClick={() => go('home')}>Back to the site</Button>
          </div>
        )}
      </Card>
    </section>
  );
}

window.QuoteRequest = QuoteRequest;
