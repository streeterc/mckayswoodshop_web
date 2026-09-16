const { Card, SpecList, Badge, Button, Divider, Icon, Tag, Mark } = window.McKaySWoodshopDesignSystem_ff08a8;

function ProjectDetail({ go }) {
  return (
    <div>
      <section style={{ padding: '40px 40px 0' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <button onClick={() => go('work')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', font: 'var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>
            <Icon name="arrow-left" size={14} /> All work
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, marginTop: 28, alignItems: 'start' }}>
            <div>
              <Photo label="Project photography · hero" ratio="4 / 3" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 12 }}>
                <Photo label="Detail" ratio="1 / 1" /><Photo label="Detail" ratio="1 / 1" /><Photo label="In the shop" ratio="1 / 1" />
              </div>
            </div>
            <div>
              <Badge tone="copper">Kitchens</Badge>
              <h1 style={{ font: 'var(--type-h1)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)', marginTop: 16 }}>Glenora kitchen</h1>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', marginTop: 16 }}>
                Nineteen feet of frameless cabinetry in rift-sawn white oak, all of it cut from three logs bought at a mill outside Perth. The island top is a single 12-foot slab, book-matched at the seam so the grain runs unbroken past the sink.
              </p>
              <Divider weight="heavy" tone="accent" style={{ margin: '28px 0 20px' }} />
              <SpecList items={[
                { label: 'Job no.', value: 'MW-2246' },
                { label: 'Dimensions', value: '228 × 40 × 36 in' },
                { label: 'Species', value: 'White oak, rift sawn' },
                { label: 'Finish', value: 'Hand-rubbed oil' },
                { label: 'Hardware', value: 'Blum, soft close' },
                { label: 'Built', value: '2026-04-18' },
              ]} />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                <Tag>Frameless</Tag><Tag>Book-matched</Tag><Tag>Integrated lighting</Tag>
              </div>
              <Card variant="sunken" padding="lg" style={{ marginTop: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Mark glyph="pine" size={30} assetBase={A} />
                  <div>
                    <div style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>Want something like this?</div>
                    <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 3 }}>Site visits are free within 90 minutes of the shop.</div>
                  </div>
                </div>
                <Button block style={{ marginTop: 18 }} onClick={() => go('quote')}>Request a quote</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'var(--section-y) 40px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionHead eyebrow="Notes from the shop" title="What made this one hard" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 20, marginTop: 36 }}>
            {[
              ['Out-of-square walls', 'The back wall ran 11/16 in out over nineteen feet. Every scribe was cut on site rather than in the shop.'],
              ['One seam, twelve feet', 'The island slab was resawn and book-matched so the seam reads as a grain line, not a joint.'],
              ['Matching an old floor', 'The existing oak floor was forty years amber. We aged sample doors for three weeks before settling on the oil.'],
            ].map(([t, c]) => (
              <Card key={t} padding="lg">
                <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)' }}>{t}</h3>
                <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 10 }}>{c}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

window.ProjectDetail = ProjectDetail;
