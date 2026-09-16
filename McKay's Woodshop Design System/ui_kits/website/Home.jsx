const { Button, Card, Badge, Divider, SpecList, Icon, Mark, ProgressSteps } = window.McKaySWoodshopDesignSystem_ff08a8;

const SERVICES = [
  { icon: 'chef-hat', title: 'Kitchens', copy: 'Face-frame and frameless cabinetry, drawn around how you actually cook.' },
  { icon: 'library', title: 'Built-ins', copy: 'Bookcases, mudrooms, window seats — scribed to the walls you have.' },
  { icon: 'armchair', title: 'Furniture', copy: 'Tables, beds and casework in solid hardwood, joined to last generations.' },
  { icon: 'move-up-right', title: 'Stairs & railings', copy: 'Treads, stringers and handrails milled and fitted on site.' },
];

const PROJECTS = [
  { name: 'Glenora kitchen', meta: 'White oak · 2026', tall: true },
  { name: 'Mill Road library', meta: 'Black walnut · 2025' },
  { name: 'Harbour table', meta: 'Hard maple · 2025' },
];

function Home({ go }) {
  return (
    <div>
      <section style={{ background: 'var(--surface-inverse)', padding: '72px 40px 80px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow tone="inverse">Custom woodworking · Est. 1998</Eyebrow>
            <h1 style={{ font: 'var(--weight-regular) var(--text-6xl)/1.02 var(--font-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-on-forest)', marginTop: 20 }}>
              Cabinetry milled a mile from your kitchen.
            </h1>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-on-forest-muted)', maxWidth: '46ch', marginTop: 20 }}>
              We measure the room, draw the piece, mill the boards and finish it by hand. Nothing is subcontracted and nothing leaves the shop unfinished.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <Button variant="accent" size="lg" onClick={() => go('quote')} iconRight={<Icon name="arrow-right" size={17} />}>Request a quote</Button>
              <Button variant="secondary" size="lg" onClick={() => go('work')} style={{ color: 'var(--copper-200)', borderColor: 'var(--forest-400)' }}>See the work</Button>
            </div>
            <div style={{ display: 'flex', gap: 40, marginTop: 44 }}>
              {[['28', 'years in the shop'], ['410', 'rooms delivered'], ['9–11', 'week lead time']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ font: 'var(--weight-regular) var(--text-3xl)/1 var(--font-display)', color: 'var(--copper-500)' }}>{n}</div>
                  <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--forest-300)', marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <Photo label="Hero photography · shop interior" ratio="5 / 6" style={{ background: 'var(--forest-600)', borderColor: 'var(--forest-500)' }} />
        </div>
      </section>

      <section style={{ padding: 'var(--section-y) 40px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionHead eyebrow="What we build" title="Four things, done properly" lede="Every job runs through the same six stages, whether it's one table or a whole floor of millwork." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 20, marginTop: 40 }}>
            {SERVICES.map((s) => (
              <Card key={s.title} padding="lg" interactive>
                <span style={{ color: 'var(--copper-700)', display: 'flex' }}><Icon name={s.icon} size={26} /></span>
                <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)', marginTop: 18 }}>{s.title}</h3>
                <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 8 }}>{s.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 40px var(--section-y)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <SectionHead eyebrow="Selected work" title="Recent rooms" />
            <Button variant="ghost" onClick={() => go('work')} iconRight={<Icon name="arrow-right" size={15} />}>All projects</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 20, marginTop: 36 }}>
            {PROJECTS.map((p) => (
              <Card key={p.name} padding="none" interactive style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => go('project')}>
                <Photo label="Project photography" ratio={p.tall ? '5 / 4' : '4 / 3'} style={{ border: 'none', borderRadius: 0 }} />
                <div style={{ padding: 'var(--card-pad)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div>
                    <div style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>{p.name}</div>
                    <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 5 }}>{p.meta}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--copper-700)', display: 'flex' }}><Icon name="arrow-up-right" size={17} /></span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--surface-sunken)', padding: 'var(--section-y) 40px', borderTop: '1px solid var(--line-hairline)', borderBottom: '1px solid var(--line-hairline)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionHead eyebrow="How a job runs" title="Six stages, one shop" align="center" />
          <div style={{ marginTop: 44 }}>
            <ProgressSteps current={5} steps={[{ label: 'Measure', meta: 'Week 1' }, { label: 'Design', meta: 'Weeks 2–3' }, { label: 'Mill', meta: 'Weeks 4–6' }, { label: 'Assemble', meta: 'Weeks 7–8' }, { label: 'Finish', meta: 'Weeks 9–10' }, { label: 'Install', meta: 'Week 11' }]} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20, marginTop: 48 }}>
            <Card variant="inverse" padding="lg">
              <Mark glyph="lumber" tone="copper" size={28} assetBase={A} />
              <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-on-forest)', marginTop: 16 }}>We buy the log, not the board</h3>
              <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-on-forest-muted)', marginTop: 8 }}>Grain is matched across a whole run because it came off the same tree.</p>
            </Card>
            <Card padding="lg">
              <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Typical kitchen</div>
              <SpecList style={{ marginTop: 14 }} items={[{ label: 'Lead time', value: '9–11 weeks' }, { label: 'Species', value: 'Oak, walnut, maple' }, { label: 'Finish', value: 'Hand-rubbed oil' }, { label: 'Warranty', value: '10 years' }]} />
            </Card>
            <Card padding="lg" variant="accent">
              <Badge tone="copper">Booking now</Badge>
              <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)', marginTop: 16 }}>Spring 2027 slots</h3>
              <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 8 }}>Four kitchen slots left. Site visits are free within 90 minutes of the shop.</p>
              <Button variant="primary" block style={{ marginTop: 20 }} onClick={() => go('quote')}>Book a site visit</Button>
            </Card>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-y) 40px' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', textAlign: 'center' }}>
          <Mark glyph="buck" size={40} assetBase={A} style={{ margin: '0 auto' }} />
          <p style={{ font: 'var(--weight-light) var(--text-2xl)/1.35 var(--font-display)', color: 'var(--text-heading)', marginTop: 24 }}>
            "They found a knot I'd have hidden, and built the drawer front around it so you'd see it every morning."
          </p>
          <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 20 }}>Helen A. · Glenora kitchen</div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
