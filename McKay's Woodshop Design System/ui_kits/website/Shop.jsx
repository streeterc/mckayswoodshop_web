const { Button, Card, Badge } = window.McKaySWoodshopDesignSystem_ff08a8;

const PRODUCTS = [
  { slug: 'walnut-cutting-board', name: 'Walnut cutting board', price: '$120.00', photo: 'Product photo' },
  { slug: 'maple-end-grain-board', name: 'Maple end-grain board', price: '$165.00', photo: 'Product photo' },
  { slug: 'wood-butter-knife', name: 'Hand-carved butter knife', price: '$28.00', photo: 'Product photo' },
  { slug: 'oak-serving-tray', name: 'White oak serving tray', price: '$145.00', photo: 'Product photo' },
  { slug: 'cherry-spoon-set', name: 'Cherry spoon set', price: '$62.00', photo: 'Product photo', out: true },
  { slug: 'shop-stool', name: 'Shop stool', price: '$310.00', photo: 'Product photo' },
];

function Shop({ go }) {
  return (
    <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--section-y-tight) 40px var(--section-y)' }}>
      <SectionHead eyebrow="Ready to ship" title="Shop" level={1} />
      <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: '56ch', marginTop: 16 }}>
        Finished pieces built in small runs, priced openly — no quote request needed. Shipping is calculated at checkout based on your address, with local pickup available near Barrie.
      </p>
      <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: '56ch', marginTop: 14 }}>
        These are the smaller, simpler pieces I keep in stock and ready to go. Anything made to order — tables, built-ins, restoration work — runs through a quote request instead.
      </p>
      <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', maxWidth: '56ch', marginTop: 14 }}>
        Mostly walnut, hard maple, cherry and white oak, finished with food-safe oil. Wash by hand and re-oil once or twice a year.
      </p>
      <PaymentBadges />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20, marginTop: 36 }}>
        {PRODUCTS.map((p) => (
          <Card key={p.slug} padding="none" interactive style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => go('product')}>
            <Photo label={p.photo} ratio="4 / 3" style={{ border: 'none', borderRadius: 0, borderBottom: '1px solid var(--line-hairline)' }} />
            <div style={{ padding: 'var(--card-pad)', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
              <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)' }}>{p.name}</h3>
              <Price style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{p.price}</Price>
              {p.out && <Badge>Out of stock</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

window.Shop = Shop;
