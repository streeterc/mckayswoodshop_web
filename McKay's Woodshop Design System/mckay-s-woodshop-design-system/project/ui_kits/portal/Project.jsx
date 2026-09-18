const { Card, Tabs, Badge, Button, Divider, Icon, SpecList, Checkbox, Switch, Textarea, Field, Dialog, Toast, Tag, IconButton, Tooltip } = window.McKaySWoodshopDesignSystem_ff08a8;

const DRAWINGS = [
  ['MW-2246-A3', 'Elevations, run A', 'v3', 'Approved'],
  ['MW-2246-B1', 'Island plan', 'v2', 'Approved'],
  ['MW-2246-C2', 'Toe-kick lighting', 'v1', 'Needs approval'],
  ['MW-2246-D1', 'Hardware schedule', 'v4', 'Approved'],
];

function Project({ go }) {
  const [tab, setTab] = React.useState('milestones');
  const [approve, setApprove] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [notify, setNotify] = React.useState(true);
  return (
    <>
      <TopBar title="Project" meta="MW-2246 · Glenora kitchen" actions={<>
        <Tooltip label="Download the job file"><IconButton label="Download" variant="outline"><Icon name="download" size={16} /></IconButton></Tooltip>
        <Button size="sm" variant="secondary" iconLeft={<Icon name="printer" size={15} />}>Print work order</Button>
      </>} />
      <Content>
        <Tabs value={tab} onChange={setTab} tabs={[
          { label: 'Milestones', value: 'milestones', count: 6 },
          { label: 'Drawings', value: 'drawings', count: 12 },
          { label: 'Specs', value: 'specs' },
          { label: 'Settings', value: 'settings' },
        ]} />

        {tab === 'milestones' && (
          <Card padding="lg">
            {[
              ['Measure', 'Jan 14', 'Done', 'Two hours on site. Back wall runs 11/16 in out over nineteen feet.'],
              ['Design', 'Feb 2', 'Done', 'Three rounds of elevations. Final set signed Feb 2.'],
              ['Mill', 'Mar 9', 'Done', 'Three logs, one mill. All face frames cut from the same flitch.'],
              ['Assemble', 'Apr 1', 'Done', 'Carcases up, drawer boxes dovetailed and fitted.'],
              ['Finish', 'in progress', 'Active', 'Doors sprayed today. Four more days of cure before we load.'],
              ['Install', 'Apr 18', 'Upcoming', 'Two days, crew of three.'],
            ].map(([stage, date, state, note], i) => (
              <div key={stage} style={{ display: 'flex', gap: 18, padding: '16px 0', borderTop: i ? '1px solid var(--line-hairline)' : 'none' }}>
                <div style={{ width: 120, flex: '0 0 120px' }}>
                  <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-heading)' }}>{stage}</div>
                  <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--text-muted)', marginTop: 5 }}>{date}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <Badge tone={state === 'Active' ? 'success' : state === 'Upcoming' ? 'neutral' : 'forest'} dot={state === 'Active'}>{state}</Badge>
                  <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', marginTop: 8 }}>{note}</p>
                </div>
              </div>
            ))}
          </Card>
        )}

        {tab === 'drawings' && (
          <Card padding="none">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px var(--card-pad)', borderBottom: '1px solid var(--line-hairline)' }}>
              <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Drawing set</span>
              <Tag style={{ marginLeft: 'auto' }}>Current revisions only</Tag>
            </div>
            {DRAWINGS.map(([no, name, rev, state], i) => (
              <div key={no} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '13px var(--card-pad)', borderTop: i ? '1px solid var(--line-hairline)' : 'none' }}>
                <span style={{ color: 'var(--copper-700)', display: 'flex' }}><Icon name="file-text" size={17} /></span>
                <span style={{ font: 'var(--type-spec)', color: 'var(--text-heading)', width: 130 }}>{no}</span>
                <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', flex: 1 }}>{name}</span>
                <span style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--text-muted)' }}>{rev}</span>
                <Badge tone={state === 'Approved' ? 'success' : 'warning'} dot={state !== 'Approved'}>{state}</Badge>
                {state === 'Approved'
                  ? <IconButton label="Download"><Icon name="download" size={16} /></IconButton>
                  : <Button size="sm" onClick={() => setApprove(true)}>Approve</Button>}
              </div>
            ))}
          </Card>
        )}

        {tab === 'specs' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Card padding="lg">
              <PanelTitle>Cabinetry</PanelTitle>
              <SpecList items={[
                { label: 'Dimensions', value: '228 × 40 × 36 in' },
                { label: 'Species', value: 'White oak, rift sawn' },
                { label: 'Construction', value: 'Frameless' },
                { label: 'Drawer box', value: 'Dovetailed maple' },
              ]} />
            </Card>
            <Card padding="lg">
              <PanelTitle>Finish & hardware</PanelTitle>
              <SpecList items={[
                { label: 'Finish', value: 'Hand-rubbed oil' },
                { label: 'Sheen', value: 'Satin, 25%' },
                { label: 'Hinges', value: 'Blum, soft close' },
                { label: 'Pulls', value: 'Blackened steel' },
              ]} />
            </Card>
            <Card variant="sunken" padding="lg" style={{ gridColumn: '1 / -1' }}>
              <PanelTitle>Shop notes</PanelTitle>
              <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)' }}>
                Grain matched across runs A and B from a single flitch. Island slab resawn and book-matched at the sink seam. Scribes cut on site.
              </p>
            </Card>
          </div>
        )}

        {tab === 'settings' && (
          <Card padding="lg" style={{ maxWidth: 560 }}>
            <PanelTitle>Notifications</PanelTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Switch label="Text me when a stage completes" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
              <Switch label="Email me photos from the floor" checked={false} onChange={() => {}} />
              <Divider />
              <Checkbox label="Copy my partner on invoices" checked onChange={() => {}} />
              <Field label="Site access notes" hint="Gate codes, parking, pets."><Textarea rows={3} defaultValue="Side gate code 4417. Dog is friendly but will leave." /></Field>
              <Button style={{ alignSelf: 'flex-start' }} onClick={() => setToast(true)}>Save changes</Button>
            </div>
          </Card>
        )}
      </Content>

      <Dialog open={approve} title="Approve the toe-kick lighting?" description="We'll wire it this week. Changes after approval are billed at shop rate."
        onClose={() => setApprove(false)}
        footer={<>
          <Button variant="ghost" onClick={() => setApprove(false)}>Not yet</Button>
          <Button onClick={() => { setApprove(false); setToast(true); }}>Approve drawing</Button>
        </>} />

      {toast && (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
          <Toast tone="success" title="Saved" message="The shop has been notified." icon={<Icon name="check" size={16} />} onDismiss={() => setToast(false)} />
        </div>
      )}
    </>
  );
}

window.Project = Project;
