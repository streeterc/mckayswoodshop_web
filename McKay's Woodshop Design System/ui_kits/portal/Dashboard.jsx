const { Card, Badge, Button, ProgressSteps, SpecList, Divider, Icon, Tooltip, IconButton } = window.McKaySWoodshopDesignSystem_ff08a8;

const ACTIVITY = [
  ['Doors sprayed', 'Finish room · today, 11:20', 'success'],
  ['Drawings v3 uploaded', 'Design · yesterday', 'info'],
  ['Deposit invoice paid', 'Accounts · Apr 2', 'success'],
  ['Hinge plate change approved', 'You · Mar 28', 'info'],
];

function Dashboard({ go }) {
  return (
    <>
      <TopBar title="Glenora kitchen" meta="MW-2246 · Rift-sawn white oak" actions={<>
        <Badge tone="success" dot>In the shop</Badge>
        <Button variant="secondary" size="sm" iconLeft={<Icon name="message-square" size={15} />} onClick={() => go('Messages')}>Message the shop</Button>
      </>} />
      <Content>
        <Card padding="lg">
          <PanelTitle action={<span style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--text-muted)' }}>INSTALL 2026-04-18</span>}>Build stage</PanelTitle>
          <ProgressSteps current={4} steps={[
            { label: 'Measure', meta: 'Jan 14' }, { label: 'Design', meta: 'Feb 2' }, { label: 'Mill', meta: 'Mar 9' },
            { label: 'Assemble', meta: 'Apr 1' }, { label: 'Finish', meta: 'in progress' }, { label: 'Install', meta: 'Apr 18' },
          ]} />
          <Divider style={{ margin: '24px 0 18px' }} />
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--status-warning)', display: 'flex', marginTop: 2 }}><Icon name="clock" size={18} /></span>
            <div>
              <div style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>One thing needs you</div>
              <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 4 }}>The toe-kick lighting spec changed. Approve it and we'll wire it this week.</div>
            </div>
            <Button size="sm" style={{ marginLeft: 'auto' }} onClick={() => go('Project')}>Review</Button>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }}>
          <Card padding="lg">
            <PanelTitle action={<Button variant="ghost" size="sm" onClick={() => go('Project')}>Full history</Button>}>Recent activity</PanelTitle>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ACTIVITY.map(([t, m, tone], i) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderTop: i ? '1px solid var(--line-hairline)' : 'none' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: tone === 'success' ? 'var(--status-success)' : 'var(--copper-600)' }} />
                  <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-heading)' }}>{t}</div>
                  <div style={{ marginLeft: 'auto', font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{m}</div>
                </div>
              ))}
            </div>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Card padding="lg">
              <PanelTitle>Job specs</PanelTitle>
              <SpecList items={[
                { label: 'Dimensions', value: '228 × 40 × 36 in' },
                { label: 'Species', value: 'White oak' },
                { label: 'Finish', value: 'Hand-rubbed oil' },
                { label: 'Quote', value: '$48,200' },
              ]} />
            </Card>
            <Card variant="inverse" padding="lg">
              <PanelTitle>Next on site</PanelTitle>
              <div style={{ font: 'var(--weight-regular) var(--text-2xl)/1 var(--font-display)', color: 'var(--text-on-forest)' }}>Apr 18</div>
              <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-on-forest-muted)', marginTop: 8 }}>Install, two days, crew of three. We'll call the morning before.</div>
            </Card>
          </div>
        </div>
      </Content>
    </>
  );
}

window.Dashboard = Dashboard;
