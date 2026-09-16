const { Card, Tag, Button, Icon, Badge } = window.McKaySWoodshopDesignSystem_ff08a8;

const FILTERS = ['Kitchens', 'Built-ins', 'Furniture', 'Stairs', 'White oak', 'Walnut', 'Maple'];
const ITEMS = [
  { name: 'Glenora kitchen', meta: 'White oak · 2026', tag: 'Kitchens' },
  { name: 'Mill Road library', meta: 'Black walnut · 2025', tag: 'Built-ins' },
  { name: 'Harbour table', meta: 'Hard maple · 2025', tag: 'Furniture' },
  { name: 'Cedar Lane stair', meta: 'White oak · 2025', tag: 'Stairs' },
  { name: 'Ferry Street mudroom', meta: 'Ash · 2024', tag: 'Built-ins' },
  { name: 'Bayfield pantry', meta: 'Black walnut · 2024', tag: 'Kitchens' },
];

function Work({ go }) {
  const [active, setActive] = React.useState([]);
  const toggle = (t) => setActive((a) => a.includes(t) ? a.filter((x) => x !== t) : [...a, t]);
  const shown = active.length ? ITEMS.filter((i) => active.includes(i.tag)) : ITEMS;
  return (
    <div>
      <section style={{ background: 'var(--surface-inverse)', padding: '56px 40px' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <Eyebrow tone="inverse">Selected work</Eyebrow>
          <h1 style={{ font: 'var(--type-h1)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-on-forest)', marginTop: 14 }}>410 rooms, and counting</h1>
        </div>
      </section>
      <section style={{ padding: '32px 40px var(--section-y)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingBottom: 24, borderBottom: '1px solid var(--line-hairline)' }}>
            {FILTERS.map((t) => <Tag key={t} selected={active.includes(t)} onClick={() => toggle(t)}>{t}</Tag>)}
            <span style={{ marginLeft: 'auto', font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{shown.length} projects</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20, marginTop: 28 }}>
            {shown.map((i) => (
              <Card key={i.name} padding="none" interactive style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => go('project')}>
                <Photo label="Project photography" />
                <div style={{ padding: 'var(--card-pad)' }}>
                  <Badge>{i.tag}</Badge>
                  <div style={{ font: 'var(--type-h4)', color: 'var(--text-heading)', marginTop: 12 }}>{i.name}</div>
                  <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 5 }}>{i.meta}</div>
                </div>
              </Card>
            ))}
          </div>
          {!shown.length && <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', marginTop: 32 }}>Nothing in that combination yet.</p>}
        </div>
      </section>
    </div>
  );
}

window.Work = Work;
