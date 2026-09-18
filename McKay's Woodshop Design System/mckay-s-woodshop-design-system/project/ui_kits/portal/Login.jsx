const { Card, Field, Input, Button, Checkbox, Logo, Icon, Divider } = window.McKaySWoodshopDesignSystem_ff08a8;

function Login({ onSignIn }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--surface-inverse)' }}>
      <div style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Logo variant="knockout" height={92} assetBase={PA} />
        <div>
          <div style={{ width: 48, height: 3, background: 'var(--line-accent)', marginBottom: 20 }} />
          <h1 style={{ font: 'var(--weight-regular) var(--text-4xl)/1.08 var(--font-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-on-forest)' }}>
            Watch your job move through the shop.
          </h1>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-on-forest-muted)', marginTop: 16, maxWidth: '40ch' }}>
            Drawings, stage dates, invoices and photos from the floor. Nothing else.
          </p>
        </div>
        <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--forest-300)' }}>1140 MILL ROAD · (613) 555-0188</div>
      </div>
      <div style={{ background: 'var(--surface-page)', display: 'grid', placeItems: 'center', padding: 40 }}>
        <Card padding="lg" style={{ width: 380 }}>
          <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>Client portal</div>
          <h2 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)', marginTop: 10 }}>Sign in</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
            <Field label="Email" htmlFor="l-email"><Input id="l-email" defaultValue="helen@ashworth.ca" /></Field>
            <Field label="Job number" hint="On the top right of your quote." htmlFor="l-job"><Input id="l-job" prefix={<Icon name="hash" size={15} />} defaultValue="MW-2246" /></Field>
            <Checkbox label="Keep me signed in on this device" checked onChange={() => {}} />
            <Button block size="lg" onClick={onSignIn}>Sign in</Button>
          </div>
          <Divider style={{ margin: '22px 0 16px' }} />
          <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>Lost your job number? Call the shop and we'll read it off the board.</div>
        </Card>
      </div>
    </div>
  );
}

window.Login = Login;
