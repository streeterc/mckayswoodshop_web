const { Card, Button, Textarea, Icon, Badge, Divider, IconButton, Tag } = window.McKaySWoodshopDesignSystem_ff08a8;

const THREAD = [
  { from: 'shop', who: 'Dan (shop floor)', when: 'Apr 9, 11:20', body: 'Doors went through the spray booth this morning. Four days to cure, then we load. Photos attached to the drawing set.' },
  { from: 'you', who: 'You', when: 'Apr 9, 13:02', body: 'They look great. Is the toe-kick light still on the plan?' },
  { from: 'shop', who: 'Dan (shop floor)', when: 'Apr 9, 13:41', body: 'It is, but the spec changed to a warmer strip — 2700K instead of 3000K. Drawing C2 is up for approval when you get a minute.' },
];

function Messages() {
  const [draft, setDraft] = React.useState('');
  const [thread, setThread] = React.useState(THREAD);
  const send = () => { if (!draft.trim()) return; setThread([...thread, { from: 'you', who: 'You', when: 'Just now', body: draft.trim() }]); setDraft(''); };
  return (
    <>
      <TopBar title="Messages" meta="MW-2246 · Dan, Ruth and the shop floor" actions={<Badge tone="success" dot>Shop open until 4:30</Badge>} />
      <Content width={760}>
        <Card padding="none">
          <div style={{ padding: 'var(--card-pad)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {thread.map((m, i) => {
              const mine = m.from === 'you';
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start', gap: 5 }}>
                  <div style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{m.who} · {m.when}</div>
                  <div style={{
                    maxWidth: '78%', padding: '12px 14px', borderRadius: 'var(--radius-md)',
                    background: mine ? 'var(--surface-inverse)' : 'var(--surface-sunken)',
                    color: mine ? 'var(--text-on-forest)' : 'var(--text-body)',
                    border: mine ? 'none' : '1px solid var(--line-hairline)', font: 'var(--type-body-sm)',
                  }}>{m.body}</div>
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: '1px solid var(--line-hairline)', padding: 'var(--card-pad)', background: 'var(--surface-sunken)' }}>
            <Textarea rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask the shop anything. We read these between cuts." />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
              <IconButton label="Attach a photo" variant="outline"><Icon name="paperclip" size={16} /></IconButton>
              <Tag>Usually replies same day</Tag>
              <Button size="sm" style={{ marginLeft: 'auto' }} onClick={send} iconRight={<Icon name="send" size={15} />}>Send</Button>
            </div>
          </div>
        </Card>
      </Content>
    </>
  );
}

window.Messages = Messages;
