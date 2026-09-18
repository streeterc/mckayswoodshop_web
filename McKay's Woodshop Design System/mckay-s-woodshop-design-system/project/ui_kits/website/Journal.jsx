const { Button } = window.McKaySWoodshopDesignSystem_ff08a8;

const POSTS = [
  { title: 'Flattening a slab without a CNC', summary: 'A router sled, two rails and an afternoon. What worked and what I would change.', date: '2026-08-14', tags: 'jigs, walnut' },
  { title: 'Why I stopped buying pre-milled lumber', summary: 'Rough stock costs less and gives you a say in grain, but it needs somewhere to sit.', date: '2026-07-02', tags: 'materials' },
  { title: 'Oil finish, six months on', summary: 'A side-by-side on two boards used daily since February, one oiled and one left bare.', date: '2026-06-11', tags: 'finishing' },
  { title: 'Setting up a one-person shop', summary: 'The three machines worth the money and the two I could have skipped.', date: '2026-05-23', tags: 'shop' },
  { title: 'Reading a board before you cut it', summary: 'Where the movement is going to come from, and how to leave room for it.', date: '2026-04-30', tags: 'materials' },
  { title: 'A bench hook is a ten-minute jig', summary: 'Scrap plywood, three screws, and crosscuts stop wandering.', date: '2026-04-02', tags: 'jigs' },
];

function Journal({ go }) {
  return (
    <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--section-y-tight) 40px var(--section-y)' }}>
      <SectionHead eyebrow="From the bench" title="All posts" level={1} />
      <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: '56ch', marginTop: 16 }}>
        Notes from the shop — builds, techniques and what's on the bench.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20, marginTop: 36 }}>
        {POSTS.map((p) => <PostCard key={p.title} post={p} />)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
        <Button variant="ghost" size="sm">← Previous</Button>
        <Button variant="ghost" size="sm" style={{ marginLeft: 'auto' }}>More posts →</Button>
      </div>
    </section>
  );
}

window.Journal = Journal;
