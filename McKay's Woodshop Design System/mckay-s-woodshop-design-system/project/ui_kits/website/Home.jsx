const { Button, Card, Badge, Icon, Mark } = window.McKaySWoodshopDesignSystem_ff08a8;

const WHAT_I_BUILD = [
  { icon: 'armchair', title: 'Furniture', copy: 'Tables, chairs, cabinets and other freestanding pieces built to order.' },
  { icon: 'library', title: 'Built-ins', copy: 'Shelving, closets and benches built to fit a specific room.' },
  { icon: 'trees', title: 'Outdoor', copy: 'Decks, pergolas and planters built to hold up outside.' },
  { icon: 'hammer', title: 'Restoration', copy: 'Repair and refinishing for an existing piece worth saving.' },
];

const HOW_IT_WORKS = [
  { n: '01', title: 'Reach out', copy: 'Send a quote request with the rough idea, size and timeline.' },
  { n: '02', title: 'Get a quote', copy: 'A follow-up call or message to firm up details, then a price and timeline.' },
  { n: '03', title: 'Built to order', copy: 'The piece gets built in the shop, with updates along the way.' },
  { n: '04', title: 'Delivery or pickup', copy: 'Finished pieces are delivered locally or ready for pickup at the shop.' },
];

const POSTS = [
  { title: 'Flattening a slab without a CNC', summary: 'A router sled, two rails and an afternoon. What worked and what I would change.', date: '2026-08-14', tags: 'jigs, walnut' },
  { title: 'Why I stopped buying pre-milled lumber', summary: 'Rough stock costs less and gives you a say in grain, but it needs somewhere to sit.', date: '2026-07-02', tags: 'materials' },
];

function Home({ go }) {
  return (
    <div>
      <section style={{ background: 'var(--surface-inverse)', padding: '72px 40px 80px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow tone="inverse">Custom Woodworking · Simcoe County, ON</Eyebrow>
            <div style={{ width: 48, height: 3, background: 'var(--line-accent)', margin: '14px 0 12px' }} />
            <h1 style={{ font: 'var(--weight-regular) var(--text-5xl)/1.05 var(--font-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-on-forest)' }}>
              Hi, I'm Eric McKay.
            </h1>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-on-forest-muted)', maxWidth: '46ch', marginTop: 20 }}>
              I build furniture, built-ins and small wood goods out of a one-person shop north of Barrie.
            </p>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-on-forest-muted)', maxWidth: '46ch', marginTop: 14 }}>
              Most local woodworkers make you wait on a quote before you can buy anything. Here, finished pieces are ready to shop online today — shipped across Canada, or pick up nearby.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {['Secure online checkout', 'Ships across Canada', 'Ontario-made'].map((b) => <Badge key={b} tone="copper">{b}</Badge>)}
            </div>
          </div>
          <Photo label="Shop interior" ratio="5 / 6" style={{ background: 'var(--forest-600)', borderColor: 'var(--forest-500)' }} />
        </div>
      </section>

      <section style={{ padding: 'var(--section-y) 40px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          <SectionHead eyebrow="About" title="Every piece starts with a board, not a blueprint." />
          <div>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: '52ch' }}>
              I spent six years in a production cabinetry shop before setting up on my own. That is where I learned to work to a drawing, hold a tolerance, and finish a piece so it still looks right in ten years.
            </p>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: '52ch', marginTop: 14 }}>
              The shop is small and solid wood only. Most pieces are oak, maple or walnut, finished with a hand-rubbed oil rather than a sprayed film, because it wears in instead of peeling off.
            </p>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: '52ch', marginTop: 14 }}>
              Everything I build is guaranteed against defects in workmanship for as long as you own it. You can also find me most Saturdays at the Barrie farmers' market.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20, marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--line-hairline)' }}>
              {[['09', 'Years in the shop'], ['240', 'Pieces built'], ['Solid wood', 'Materials, always']].map(([n, l]) => (
                <div key={l}>
                  <Price style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-heading)' }}>{n}</Price>
                  <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--surface-sunken)', padding: 'var(--section-y) 40px', borderTop: '1px solid var(--line-hairline)', borderBottom: '1px solid var(--line-hairline)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionHead eyebrow="What I build" title="Four kinds of projects, one shop." lede="From small commissions to full built-ins. Custom furniture is quoted individually, but as a rough guide dining tables typically start around $2,500." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40 }}>
            {WHAT_I_BUILD.map((s) => (
              <Card key={s.title} padding="lg" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--forest-700)', display: 'flex' }}><Icon name={s.icon} size={30} /></span>
                <div>
                  <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)' }}>{s.title}</h3>
                  <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 6 }}>{s.copy}</p>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ marginTop: 'var(--section-y-tight)' }}>
            <SectionHead eyebrow="How it works" title="From first message to finished piece." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 56px', marginTop: 36 }}>
              {HOW_IT_WORKS.map((s) => (
                <div key={s.n}>
                  <Price style={{ color: 'var(--text-muted)' }}>{s.n}</Price>
                  <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)', marginTop: 6 }}>{s.title}</h3>
                  <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 6, maxWidth: '44ch' }}>{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-y) 40px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <SectionHead eyebrow="Shop" title="Take a look at what I'm making." lede="Small runs of finished pieces, priced openly and ready to ship — no quote request needed. Every price is listed up front; shipping is calculated at checkout based on your address, with local pickup available near Barrie." />
            <Button variant="accent" size="lg" style={{ marginTop: 24 }} onClick={() => go('shop')}>Visit the shop</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Photo label="Walnut cutting board" ratio="1 / 1" />
            <Photo label="Butter knife" ratio="1 / 1" />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--surface-inverse)', padding: 'var(--section-y) 40px' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', textAlign: 'center' }}>
          <SectionHead eyebrow="Have something in mind?" title="Let's build it together." inverse align="center"
            lede="Tell me about the project, whatever stage it's at. A quote request costs nothing and comes with no obligation." />
          <Button variant="accent" size="lg" style={{ marginTop: 28 }} onClick={() => go('quote')}>Request a quote</Button>
        </div>
      </section>

      <section style={{ padding: 'var(--section-y) 40px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <SectionHead eyebrow="Benchside Journal" title="Posts" />
            <Button variant="ghost" size="sm" onClick={() => go('journal')}>All posts</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 36 }}>
            {POSTS.map((p) => <PostCard key={p.title} post={p} go={go} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

function PostCard({ post, go }) {
  return (
    <Card padding="lg" interactive style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }} onClick={() => go && go('journal')}>
      <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)' }}>{post.title}</h3>
      <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', flex: '1 1 auto' }}>{post.summary}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: '1px solid var(--line-hairline)', font: 'var(--type-spec)', color: 'var(--text-muted)' }}>
        <span>{post.date}</span><span>·</span><span>{post.tags}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--copper-700)' }}>→</span>
      </div>
    </Card>
  );
}

Object.assign(window, { Home, PostCard });
