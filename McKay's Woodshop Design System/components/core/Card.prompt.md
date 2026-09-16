One-sentence: every boxed region — project tiles, quote summaries, spec panels.

```jsx
<Card variant="raised" padding="lg" interactive>…</Card>
```

Rules: 5px radius always, hairline border always, shadow only on `raised` or on hover when `interactive`. Never stack two shadowed cards inside each other — the inner one becomes `sunken`.
