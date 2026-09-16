const { Card, Field, Input, Textarea, Select, Checkbox, Radio, Button, Icon, Badge, Toast, Dialog, SpecList } = window.McKaySWoodshopDesignSystem_ff08a8;

function QuoteRequest() {
  const [scope, setScope] = React.useState('kitchen');
  const [install, setInstall] = React.useState(true);
  const [sent, setSent] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  return (
    <section style={{ padding: '56px 40px var(--section-y)' }}>
      <div style={{ maxWidth: 940, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.35fr .8fr', gap: 40, alignItems: 'start' }}>
        <div>
          <Eyebrow>Request a quote</Eyebrow>
          <h1 style={{ font: 'var(--type-h1)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)', marginTop: 14 }}>Tell us about the room</h1>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', marginTop: 14, maxWidth: '54ch' }}>
            Rough measurements are fine. We'll read this before we call, and we'll bring a tape when we visit.
          </p>
          <Card padding="lg" style={{ marginTop: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Full name" required htmlFor="q-name"><Input id="q-name" placeholder="Jordan McKay" /></Field>
              <Field label="Phone" required htmlFor="q-phone"><Input id="q-phone" prefix={<Icon name="phone" size={15} />} placeholder="(613) 555-0188" /></Field>
              <Field label="Email" htmlFor="q-email" style={{ gridColumn: '1 / -1' }}><Input id="q-email" placeholder="you@example.ca" /></Field>
              <Field label="Town" htmlFor="q-town"><Input id="q-town" prefix={<Icon name="map-pin" size={15} />} placeholder="Perth, ON" /></Field>
              <Field label="Species" hint="We'll advise if you're unsure."><Select placeholder="No preference" options={['White oak', 'Black walnut', 'Hard maple', 'Ash', 'Douglas fir']} /></Field>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-heading)', marginBottom: 10 }}>Scope</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[['kitchen', 'A kitchen or pantry'], ['built-in', 'Built-in cabinetry'], ['furniture', 'A piece of furniture'], ['other', 'Something else']].map(([v, l]) => (
                    <Radio key={v} name="scope" label={l} checked={scope === v} onChange={() => setScope(v)} />
                  ))}
                </div>
              </div>
              <Field label="Rough dimensions" htmlFor="q-dim"><Input id="q-dim" placeholder="e.g. 12 ft × 9 ft, 8 ft ceiling" /></Field>
              <Field label="Target month" htmlFor="q-when"><Input id="q-when" prefix={<Icon name="calendar-days" size={15} />} placeholder="Spring 2027" /></Field>
              <Field label="Anything we should know" style={{ gridColumn: '1 / -1' }}>
                <Textarea rows={4} placeholder="Existing millwork, appliance sizes, a photo you keep coming back to." />
              </Field>
              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Checkbox label="Include installation" checked={install} onChange={(e) => setInstall(e.target.checked)} />
                <Checkbox label="Send me the shop newsletter (four a year, no more)" checked={false} onChange={() => {}} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--line-hairline)' }}>
              <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>We reply within two business days.</span>
              <Button style={{ marginLeft: 'auto' }} onClick={() => setConfirm(true)} iconRight={<Icon name="arrow-right" size={15} />}>Send the request</Button>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 24 }}>
          <Card variant="inverse" padding="lg">
            <Badge tone="copper">Booking now</Badge>
            <div style={{ font: 'var(--type-h3)', color: 'var(--text-on-forest)', marginTop: 14 }}>Spring 2027</div>
            <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-on-forest-muted)', marginTop: 8 }}>Four kitchen slots left. Furniture is booking eleven weeks out.</p>
          </Card>
          <Card padding="lg">
            <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>What happens next</div>
            <SpecList style={{ marginTop: 14 }} items={[{ label: 'Step 1', value: 'We call' }, { label: 'Step 2', value: 'Site visit' }, { label: 'Step 3', value: 'Drawings' }, { label: 'Step 4', value: 'Fixed quote' }]} />
          </Card>
          <Card variant="sunken" padding="lg">
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--copper-700)', display: 'flex', marginTop: 2 }}><Icon name="phone" size={18} /></span>
              <div>
                <div style={{ font: 'var(--type-h4)', color: 'var(--text-heading)' }}>Rather talk?</div>
                <div style={{ font: 'var(--type-spec)', color: 'var(--text-body)', marginTop: 4 }}>(613) 555-0188</div>
                <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 6 }}>Shop hours, 7:30–4:30, Monday to Friday.</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={confirm} title="Send this to the shop?" description="We'll read it before we call. You can add photos in the reply."
        onClose={() => setConfirm(false)}
        footer={<>
          <Button variant="ghost" onClick={() => setConfirm(false)}>Keep editing</Button>
          <Button onClick={() => { setConfirm(false); setSent(true); }}>Send it</Button>
        </>} />

      {sent && (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
          <Toast tone="success" title="Request sent" message="We'll be in touch within two business days." icon={<Icon name="check" size={16} />} onDismiss={() => setSent(false)} />
        </div>
      )}
    </section>
  );
}

window.QuoteRequest = QuoteRequest;
