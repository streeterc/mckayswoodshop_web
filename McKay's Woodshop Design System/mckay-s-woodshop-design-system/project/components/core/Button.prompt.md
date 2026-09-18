One-sentence: the action control for forms, cards, headers and hero CTAs — use `accent` for the single most important marketing action and `primary` everywhere in product UI.

```jsx
<Button variant="accent" size="lg" iconRight={<Icon name="arrow-right" />}>Request a quote</Button>
```

Variants: primary, accent, secondary, ghost, danger. Sizes sm/md/lg = 32/40/48px tall. Press state nudges down 1px with an inset shadow; hover darkens the fill. Label copy is sentence case in source and uppercased by the component — write "Request a quote", not "REQUEST A QUOTE".
