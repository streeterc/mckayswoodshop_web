const { Button, Field, Select, Input } = window.McKaySWoodshopDesignSystem_ff08a8;

function ProductDetail({ go }) {
  return (
    <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--section-y-tight) 40px var(--section-y)' }}>
      <button onClick={() => go('shop')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>← Back to shop</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start', marginTop: 28 }}>
        <Photo label="Product photo" ratio="1 / 1" style={{ borderRadius: 'var(--radius-card)' }} />

        <div>
          <h1 style={{ font: 'var(--type-h1)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>Walnut cutting board</h1>
          <Price style={{ fontSize: 'var(--text-lg)', color: 'var(--text-heading)', display: 'block', marginTop: 6 }}>$120.00</Price>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: '56ch', marginTop: 16 }}>
            Edge-grain black walnut, 16 by 11 inches and an inch and a half thick, with a chamfered lip for lifting. Finished with a food-safe oil and beeswax blend.
          </p>
          <PaymentBadges />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 96px', gap: 16, alignItems: 'end', marginTop: 32 }}>
            <Field label="Variant" htmlFor="variant">
              <Select id="variant" options={[
                { value: 'standard', label: 'Standard — $120.00' },
                { value: 'large', label: 'Large — $165.00' },
                { value: 'juice-groove', label: 'With juice groove — $138.00' },
              ]} />
            </Field>
            <Field label="Qty" htmlFor="qty">
              <Input id="qty" type="number" defaultValue="1" min="1" max="99" />
            </Field>
          </div>
          <Button variant="primary" style={{ marginTop: 20 }} onClick={() => go('cart')}>Add to cart</Button>
          <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 12 }}>Added items stay in your cart for two weeks.</p>
        </div>
      </div>
    </section>
  );
}

window.ProductDetail = ProductDetail;
