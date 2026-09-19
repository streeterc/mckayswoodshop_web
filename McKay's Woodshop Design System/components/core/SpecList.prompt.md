One-sentence: the shop's spec table — dimensions, species, finish, lead time — wherever a piece or a job is described.

```jsx
<SpecList items={[{label:'Dimensions',value:'96 × 40 × 30 in'},{label:'Species',value:'White oak, rift sawn'}]} />
```

Labels uppercase micro-caps, values mono and right-aligned. Write measurements as `96 × 40 × 30 in` with the multiplication sign, never `x`.

Labels may be a node — an `Icon` plus the label text, or a mono step number — as on the home page's "What I build" and "How it works" lists. Keep values to one short line; the mono right-aligned value reads heavy when long.
