const { Card, Badge, Button, Divider, Icon, SpecList, IconButton } = window.McKaySWoodshopDesignSystem_ff08a8;

const ROWS = [
  ['INV-1841', 'Deposit · 40%', '2026-01-20', '$19,280', 'Paid'],
  ['INV-1902', 'Milling · 30%', '2026-03-12', '$14,460', 'Paid'],
  ['INV-1977', 'Finish · 20%', '2026-04-09', '$9,640', 'Due Apr 23'],
  ['INV-1978', 'Install · 10%', '—', '$4,820', 'Not issued'],
];

function Invoices() {
  return (
    <>
      <TopBar title="Invoices" meta="MW-2246 · Quote $48,200" actions={
        <Button size="sm" variant="secondary" iconLeft={<Icon name="download" size={15} />}>Download all</Button>
      } />
      <Content width={900}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[['Quoted', '$48,200', 'neutral'], ['Paid to date', '$33,740', 'success'], ['Outstanding', '$9,640', 'warning']].map(([l, v, tone]) => (
            <Card key={l} padding="lg">
              <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{l}</div>
              <div style={{ font: 'var(--weight-regular) var(--text-2xl)/1 var(--font-display)', color: tone === 'warning' ? 'var(--status-warning)' : 'var(--text-heading)', marginTop: 10, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
            </Card>
          ))}
        </div>
        <Card padding="none">
          <div style={{ display: 'flex', alignItems: 'center', padding: '13px var(--card-pad)', borderBottom: '1px solid var(--line-hairline)', font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            <span style={{ width: 120 }}>Invoice</span><span style={{ flex: 1 }}>Stage</span><span style={{ width: 120 }}>Issued</span><span style={{ width: 100, textAlign: 'right' }}>Amount</span><span style={{ width: 150, textAlign: 'right' }}>Status</span>
          </div>
          {ROWS.map(([no, stage, date, amt, state], i) => (
            <div key={no} style={{ display: 'flex', alignItems: 'center', padding: '14px var(--card-pad)', borderTop: i ? '1px solid var(--line-hairline)' : 'none' }}>
              <span style={{ width: 120, font: 'var(--type-spec)', color: 'var(--text-heading)' }}>{no}</span>
              <span style={{ flex: 1, font: 'var(--type-body-sm)', color: 'var(--text-body)' }}>{stage}</span>
              <span style={{ width: 120, font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--text-muted)' }}>{date}</span>
              <span style={{ width: 100, textAlign: 'right', font: 'var(--type-spec)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>{amt}</span>
              <span style={{ width: 150, display: 'flex', justifyContent: 'flex-end', gap: 8, alignItems: 'center' }}>
                <Badge tone={state === 'Paid' ? 'success' : state.startsWith('Due') ? 'warning' : 'neutral'} dot={state.startsWith('Due')}>{state}</Badge>
                {state === 'Paid' && <IconButton label="Receipt" size="sm"><Icon name="download" size={15} /></IconButton>}
              </span>
            </div>
          ))}
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card variant="accent" padding="lg">
            <div style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>INV-1977 is due Apr 23</div>
            <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 8 }}>E-transfer to accounts@mckayswoodshop.ca, or cheque at the shop.</p>
            <Button style={{ marginTop: 18 }}>Pay $9,640</Button>
          </Card>
          <Card padding="lg">
            <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Payment schedule</div>
            <SpecList style={{ marginTop: 14 }} items={[{ label: 'Deposit', value: '40% at signing' }, { label: 'Milling', value: '30% at mill start' }, { label: 'Finish', value: '20% at spray' }, { label: 'Install', value: '10% on completion' }]} />
          </Card>
        </div>
      </Content>
    </>
  );
}

window.Invoices = Invoices;
