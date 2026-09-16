const { SideNav, Logo, Icon, IconButton, Badge, Divider, Tooltip } = window.McKaySWoodshopDesignSystem_ff08a8;
const PA = '../../assets';

const NAV = [
  { label: 'Dashboard', icon: <Icon name="layout-dashboard" size={16} /> },
  { label: 'Project', icon: <Icon name="hammer" size={16} /> },
  { label: 'Drawings', icon: <Icon name="file-text" size={16} />, count: 12 },
  { label: 'Invoices', icon: <Icon name="receipt" size={16} />, count: 2 },
  { label: 'Messages', icon: <Icon name="message-square" size={16} />, count: 3 },
];

function PortalShell({ page, go, children, onSignOut }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-page)' }}>
      <SideNav
        items={NAV}
        active={page}
        onNavigate={go}
        header={<div style={{ padding: '4px 8px 14px' }}><Logo variant="knockout" height={40} assetBase={PA} /></div>}
        footer={
          <div style={{ borderTop: '1px solid var(--line-on-inverse)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: 2, background: 'var(--copper-600)', color: 'var(--forest-800)', display: 'grid', placeItems: 'center', font: 'var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)' }}>HA</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ font: 'var(--weight-medium) var(--text-2xs)/1.2 var(--font-ui)', color: 'var(--copper-100)' }}>Helen Ashworth</div>
              <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--forest-300)' }}>MW-2246</div>
            </div>
            <button onClick={onSignOut} title="Sign out" style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--forest-300)', display: 'flex' }}><Icon name="log-out" size={15} /></button>
          </div>
        }
      />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

function TopBar({ title, meta, actions }) {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 28px', background: 'var(--surface-card)', borderBottom: '1px solid var(--line-hairline)' }}>
      <div>
        <h1 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)' }}>{title}</h1>
        {meta && <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>{meta}</div>}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>{actions}</div>
    </header>
  );
}

function Content({ children, width = 1000 }) {
  return <div style={{ padding: '28px', flex: 1 }}><div style={{ maxWidth: width, display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div></div>;
}

function PanelTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{children}</span>
      <span style={{ marginLeft: 'auto' }}>{action}</span>
    </div>
  );
}

Object.assign(window, { PortalShell, TopBar, Content, PanelTitle, PA });
