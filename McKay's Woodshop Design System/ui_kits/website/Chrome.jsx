const { NavBar, Button, Logo, Mark, Icon, Divider } = window.McKaySWoodshopDesignSystem_ff08a8;
const A = '../../assets';

function Photo({ label, ratio = '4 / 3', style }) {
  return (
    <div style={{
      aspectRatio: ratio, background: 'var(--sand-100)', border: '1px solid var(--line-hairline)',
      borderRadius: 'var(--radius-image)', display: 'grid', placeItems: 'center', ...style,
    }}>
      <span style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{label}</span>
    </div>
  );
}

function Eyebrow({ children, tone }) {
  return <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: tone === 'inverse' ? 'var(--copper-500)' : 'var(--text-accent)' }}>{children}</div>;
}

function SectionHead({ eyebrow, title, lede, inverse, align = 'left' }) {
  return (
    <div style={{ maxWidth: '60ch', margin: align === 'center' ? '0 auto' : 0, textAlign: align }}>
      {eyebrow && <Eyebrow tone={inverse ? 'inverse' : undefined}>{eyebrow}</Eyebrow>}
      <div style={{ width: 48, height: 3, background: 'var(--line-accent)', margin: align === 'center' ? '14px auto 12px' : '14px 0 12px' }} />
      <h2 style={{ font: 'var(--type-h2)', letterSpacing: 'var(--tracking-tight)', color: inverse ? 'var(--text-on-forest)' : 'var(--text-heading)' }}>{title}</h2>
      {lede && <p style={{ font: 'var(--type-body)', color: inverse ? 'var(--text-on-forest-muted)' : 'var(--text-body)', marginTop: 12 }}>{lede}</p>}
    </div>
  );
}

function SiteHeader({ page, go }) {
  return (
    <NavBar
      assetBase={A}
      active={page}
      onNavigate={go}
      links={[{ label: 'Work', value: 'work' }, { label: 'Services', value: 'services' }, { label: 'Process', value: 'process' }, { label: 'About', value: 'about' }]}
      action={<Button variant="accent" size="sm" onClick={() => go('quote')}>Request a quote</Button>}
    />
  );
}

function SiteFooter({ go }) {
  const col = (title, items) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--copper-500)' }}>{title}</span>
      {items.map((i) => <span key={i} style={{ font: 'var(--type-body-sm)', color: 'var(--forest-200)' }}>{i}</span>)}
    </div>
  );
  return (
    <footer style={{ background: 'var(--surface-inverse-deep)', padding: '56px 40px 28px' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <Logo variant="knockout" height={64} assetBase={A} />
          <p style={{ font: 'var(--type-body-sm)', color: 'var(--forest-300)', marginTop: 18, maxWidth: '32ch' }}>Custom cabinetry, furniture and millwork. One shop, one crew, start to finish.</p>
        </div>
        {col('Work', ['Kitchens', 'Built-ins', 'Furniture', 'Stairs & railings'])}
        {col('Shop', ['Process', 'Timber & finishes', 'Lead times', 'Careers'])}
        {col('Visit', ['1140 Mill Road', 'Ontario, Canada', '(613) 555-0188', 'shop@mckayswoodshop.ca'])}
      </div>
      <div style={{ maxWidth: 'var(--container)', margin: '40px auto 0', paddingTop: 20, borderTop: '1px solid var(--line-on-inverse)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--forest-300)' }}>© 2026 MCKAY'S WOODSHOP</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
          {['cross', 'pine', 'buck', 'lumber'].map((g) => <Mark key={g} glyph={g} tone="copper" size={20} assetBase={A} />)}
        </span>
      </div>
    </footer>
  );
}

function Shell({ page, go, children }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)' }}>
      <SiteHeader page={page} go={go} />
      <main>{children}</main>
      <SiteFooter go={go} />
    </div>
  );
}

Object.assign(window, { Photo, Eyebrow, SectionHead, SiteHeader, SiteFooter, Shell, A });
