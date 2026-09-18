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

function Eyebrow({ children, tone, align }) {
  return <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: tone === 'inverse' ? 'var(--copper-500)' : 'var(--text-accent)', textAlign: align }}>{children}</div>;
}

function SectionHead({ eyebrow, title, lede, inverse, align = 'left', level = 2 }) {
  const H = level === 1 ? 'h1' : 'h2';
  return (
    <div style={{ maxWidth: '60ch', margin: align === 'center' ? '0 auto' : 0, textAlign: align }}>
      {eyebrow && <Eyebrow tone={inverse ? 'inverse' : undefined}>{eyebrow}</Eyebrow>}
      <div style={{ width: 48, height: 3, background: 'var(--line-accent)', margin: align === 'center' ? '14px auto 12px' : '14px 0 12px' }} />
      <H style={{ font: level === 1 ? 'var(--type-h1)' : 'var(--type-h2)', letterSpacing: 'var(--tracking-tight)', color: inverse ? 'var(--text-on-forest)' : 'var(--text-heading)' }}>{title}</H>
      {lede && <p style={{ font: 'var(--type-body)', color: inverse ? 'var(--text-on-forest-muted)' : 'var(--text-body)', marginTop: 12 }}>{lede}</p>}
    </div>
  );
}

function Price({ children, style }) {
  return <span style={{ font: 'var(--type-spec)', fontVariantNumeric: 'tabular-nums', ...style }}>{children}</span>;
}

/** Card / Crypto payment affordances, shown on shop, product and cart screens. */
function PaymentBadges({ cryptoEnabled = false }) {
  const base = { display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--type-label)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', background: 'var(--surface-sunken)', border: '1px solid var(--line-hairline)', color: 'var(--forest-700)' };
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
      <span style={base}><Icon name="credit-card" size={14} />Card</span>
      <span style={{ ...base, color: cryptoEnabled ? 'var(--forest-700)' : 'var(--text-muted)', borderStyle: cryptoEnabled ? 'solid' : 'dashed' }}>
        <Icon name="box" size={14} />Crypto{!cryptoEnabled && <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>(coming soon)</span>}
      </span>
    </div>
  );
}

function SiteHeader({ page, go }) {
  const active = page === 'product' ? 'shop' : page;
  return (
    <NavBar
      assetBase={A}
      active={active}
      onNavigate={go}
      links={[{ label: 'Home', value: 'home' }, { label: 'Shop', value: 'shop' }, { label: 'Cart', value: 'cart' }]}
      action={<Button variant="accent" size="sm" onClick={() => go('quote')}>Request a quote</Button>}
    />
  );
}

function SiteFooter({ go }) {
  const link = (label, target) => (
    <button key={label} onClick={() => target && go(target)} style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: target ? 'pointer' : 'default', font: 'var(--type-body-sm)', color: 'var(--forest-300)' }}>{label}</button>
  );
  const col = (title, items) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--copper-500)' }}>{title}</span>
      {items}
    </div>
  );
  const plain = (s) => <span key={s} style={{ font: 'var(--type-body-sm)', color: 'var(--forest-300)' }}>{s}</span>;
  return (
    <footer style={{ background: 'var(--surface-inverse-deep)', padding: '56px 40px 28px' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <Logo variant="knockout" height={32} assetBase={A} />
          <p style={{ font: 'var(--type-body-sm)', color: 'var(--forest-300)', marginTop: 16, maxWidth: '32ch' }}>Custom carpentry and woodworking. Measured, milled, assembled and finished in one shop.</p>
        </div>
        {col('Site', [link('Home', 'home'), link('Shop', 'shop'), link('Cart', 'cart'), link('Request a quote', 'quote')])}
        {col('Visit', ['1140 Mill Road', 'Ontario, Canada', '(613) 555-0188', 'shop@mckayswoodshop.ca'].map(plain))}
        {col('Shop hours', ['Monday to Friday, 7 to 4', 'Saturday by appointment'].map(plain))}
      </div>
      <div style={{ maxWidth: 'var(--container)', margin: '40px auto 0', paddingTop: 20, borderTop: '1px solid var(--line-on-inverse)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ font: 'var(--type-body-sm)', color: 'var(--forest-300)' }}>© 2026 McKay's Woodshop. All rights reserved.</span>
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

Object.assign(window, { Photo, Eyebrow, SectionHead, Price, PaymentBadges, SiteHeader, SiteFooter, Shell, A });
