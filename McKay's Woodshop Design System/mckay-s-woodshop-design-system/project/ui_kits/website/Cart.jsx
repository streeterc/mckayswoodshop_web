const { Button, Card, Input } = window.McKaySWoodshopDesignSystem_ff08a8;

const ROWS = [
  { name: 'Walnut cutting board', variant: 'With juice groove', qty: 1, total: '$138.00' },
  { name: 'Hand-carved butter knife', variant: 'Cherry', qty: 2, total: '$56.00' },
];

function Cart({ go }) {
  const th = { font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'left', padding: '12px var(--card-pad)', borderBottom: '1px solid var(--line-hairline)' };
  const td = { padding: '14px var(--card-pad)', borderBottom: '1px solid var(--line-hairline)', font: 'var(--type-body-sm)', color: 'var(--text-body)' };
  return (
    <section style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', padding: 'var(--section-y-tight) 40px var(--section-y)' }}>
      <SectionHead eyebrow="Your cart" title="Cart" level={1} />

      <Card padding="none" style={{ overflow: 'hidden', marginTop: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th style={th}>Item</th><th style={{ ...th, width: 110 }}>Qty</th><th style={{ ...th, width: 120, textAlign: 'right' }}>Price</th></tr></thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name}>
                <td style={td}>
                  <div style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>{r.name}</div>
                  <div style={{ font: 'var(--type-spec)', color: 'var(--text-muted)', marginTop: 2 }}>{r.variant}</div>
                </td>
                <td style={td}><Input type="number" defaultValue={r.qty} min="0" max="99" style={{ width: 72 }} /></td>
                <td style={{ ...td, textAlign: 'right' }}><Price style={{ color: 'var(--text-heading)' }}>{r.total}</Price></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: 'var(--card-pad)', font: 'var(--type-h4)', color: 'var(--text-heading)' }}>
          <span>Subtotal</span>
          <Price style={{ marginLeft: 'auto', fontSize: 'var(--text-md)', fontWeight: 600 }}>$194.00</Price>
        </div>
      </Card>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginTop: 24 }}>
        <div>
          <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', maxWidth: '46ch' }}>Shipping is calculated at checkout based on your address.</p>
          <PaymentBadges />
        </div>
        <Button variant="accent" size="lg" style={{ marginLeft: 'auto' }}>Proceed to checkout</Button>
      </div>
    </section>
  );
}

window.Cart = Cart;
