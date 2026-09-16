/* @ds-bundle: {"format":4,"namespace":"McKaySWoodshopDesignSystem_ff08a8","components":[{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Mark","sourcePath":"components/brand/Mark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SpecList","sourcePath":"components/core/SpecList.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"ProgressSteps","sourcePath":"components/feedback/ProgressSteps.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"SideNav","sourcePath":"components/navigation/SideNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Icon.jsx":"e7f8d208583e","components/brand/Logo.jsx":"fc25e30aef27","components/brand/Mark.jsx":"85cf608be7e3","components/core/Badge.jsx":"69936c2e4495","components/core/Button.jsx":"96ec63397d20","components/core/Card.jsx":"2b1f4d087d36","components/core/Divider.jsx":"afdcf5ae02b6","components/core/IconButton.jsx":"1921c042c0d1","components/core/SpecList.jsx":"ab76bd0de380","components/core/Tag.jsx":"d83c4a312b3a","components/feedback/Dialog.jsx":"8b4992a0cc24","components/feedback/ProgressSteps.jsx":"776d04bb7a2f","components/feedback/Toast.jsx":"0f00cbc53a3e","components/feedback/Tooltip.jsx":"e26e96e3525d","components/forms/Checkbox.jsx":"0ebb5ee90ebf","components/forms/Field.jsx":"0ffc2acf12d0","components/forms/Input.jsx":"e810b17f42bc","components/forms/Radio.jsx":"34e0ab39c3fe","components/forms/Select.jsx":"ff3c51814c7c","components/forms/Switch.jsx":"f4186bbdcd42","components/forms/Textarea.jsx":"cd95ed686c93","components/navigation/NavBar.jsx":"64d0caf4658b","components/navigation/SideNav.jsx":"a91cebe4f710","components/navigation/Tabs.jsx":"db7dabef5359","guidelines/tweaks-panel.jsx":"d259e3a86f73","ui_kits/portal/Dashboard.jsx":"ce9860cf6b9c","ui_kits/portal/Invoices.jsx":"5696613b7908","ui_kits/portal/Login.jsx":"9bdb3a8eafb8","ui_kits/portal/Messages.jsx":"f56c69c8848d","ui_kits/portal/PortalChrome.jsx":"2b6417064ab5","ui_kits/portal/Project.jsx":"a98440878952","ui_kits/website/Chrome.jsx":"a1be5542a71a","ui_kits/website/Home.jsx":"6e85a9d747af","ui_kits/website/ProjectDetail.jsx":"2136aa28d4fb","ui_kits/website/QuoteRequest.jsx":"bf9b15cea4de","ui_kits/website/Work.jsx":"b9f55496985e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.McKaySWoodshopDesignSystem_ff08a8 = window.McKaySWoodshopDesignSystem_ff08a8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.544.0/icons/';

/** Lucide glyph, tinted with currentColor via CSS mask. */
function Icon({
  name,
  size = 18,
  strokeColor,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      background: strokeColor || 'currentColor',
      WebkitMaskImage: `url(${CDN}${name}.svg)`,
      maskImage: `url(${CDN}${name}.svg)`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ASSETS = {
  full: 'logo-full.png',
  knockout: 'logo-full-knockout.png',
  mark: 'logo-mark.png',
  'mark-green': 'logo-mark-green.png'
};

/** Brand lockup. `variant` picks which supplied artwork file is used. */
function Logo({
  variant = 'full',
  height = 72,
  assetBase = '/assets',
  title = "McKay's Woodshop",
  style,
  ...rest
}) {
  const src = assetBase.replace(/\/$/, '') + '/' + (ASSETS[variant] || ASSETS.full);
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: title,
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Mark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GLYPHS = ['cross', 'pine', 'buck', 'lumber'];

/** One of the four logo glyphs, drawn from the supplied artwork. */
function Mark({
  glyph = 'pine',
  tone = 'green',
  size = 28,
  assetBase = '/assets',
  style,
  ...rest
}) {
  const g = GLYPHS.includes(glyph) ? glyph : 'pine';
  const src = assetBase.replace(/\/$/, '') + '/icon-' + g + '-' + (tone === 'copper' ? 'copper' : 'green') + '.png';
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: "",
    "aria-hidden": "true",
    style: {
      height: size,
      width: 'auto',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Mark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Mark.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: ['var(--sand-100)', 'var(--sand-700)', 'var(--sand-200)'],
  forest: ['var(--forest-700)', 'var(--copper-100)', 'var(--forest-700)'],
  copper: ['var(--copper-200)', 'var(--copper-900)', 'var(--copper-300)'],
  success: ['var(--status-success-wash)', 'var(--status-success)', 'var(--moss-100)'],
  warning: ['var(--status-warning-wash)', 'var(--amber-600)', 'var(--status-warning-wash)'],
  danger: ['var(--status-danger-wash)', 'var(--status-danger)', 'var(--status-danger-wash)']
};

/** Small status marker. */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  style,
  ...rest
}) {
  const [bg, fg, bd] = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 22,
      padding: '0 8px',
      background: bg,
      color: fg,
      border: `1px solid ${bd}`,
      borderRadius: 'var(--radius-xs)',
      font: 'var(--weight-semibold) var(--text-3xs)/1 var(--font-ui)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: 999,
      background: fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    h: 32,
    px: 12,
    font: 'var(--text-2xs)',
    gap: 6
  },
  md: {
    h: 40,
    px: 16,
    font: 'var(--text-sm)',
    gap: 8
  },
  lg: {
    h: 48,
    px: 22,
    font: 'var(--text-md)',
    gap: 10
  }
};
const TONES = {
  primary: {
    bg: 'var(--action-primary)',
    fg: 'var(--copper-100)',
    bd: 'var(--action-primary)',
    bgHover: 'var(--action-primary-hover)'
  },
  accent: {
    bg: 'var(--action-accent)',
    fg: 'var(--forest-800)',
    bd: 'var(--action-accent)',
    bgHover: 'var(--action-accent-hover)'
  },
  secondary: {
    bg: 'transparent',
    fg: 'var(--forest-700)',
    bd: 'var(--line-strong)',
    bgHover: 'var(--sand-100)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--forest-700)',
    bd: 'transparent',
    bgHover: 'var(--action-quiet-hover)'
  },
  danger: {
    bg: 'var(--status-danger)',
    fg: '#fff',
    bd: 'var(--status-danger)',
    bgHover: 'var(--barn-600)'
  }
};

/** Primary action control. One accent or primary button per view region. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft,
  iconRight,
  as = 'button',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const t = TONES[variant] || TONES.primary;
  const El = as;
  return /*#__PURE__*/React.createElement(El, _extends({
    disabled: El === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      padding: `0 ${s.px}px`,
      border: `1px solid ${disabled ? 'var(--action-disabled)' : t.bd}`,
      borderRadius: 'var(--radius-button)',
      background: disabled ? 'var(--action-disabled)' : hover ? t.bgHover : t.bg,
      color: disabled ? 'var(--action-disabled-text)' : t.fg,
      font: `var(--weight-semibold) ${s.font}/1 var(--font-ui)`,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transform: down && !disabled ? 'translateY(1px)' : 'none',
      boxShadow: down && !disabled ? 'var(--inset-press)' : 'none',
      transition: 'var(--transition-color), var(--transition-transform)',
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PADS = {
  none: 0,
  sm: 'var(--space-6)',
  md: 'var(--card-pad)',
  lg: 'var(--card-pad-lg)'
};

/** Container surface: hairline border, 5px corners, shadow only when it lifts. */
function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const inverse = variant === 'inverse';
  const sunken = variant === 'sunken';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: inverse ? 'var(--surface-inverse)' : sunken ? 'var(--surface-sunken)' : 'var(--surface-card)',
      color: inverse ? 'var(--text-on-forest)' : 'var(--text-body)',
      border: `1px solid ${inverse ? 'var(--forest-700)' : variant === 'accent' ? 'var(--line-accent)' : 'var(--line-hairline)'}`,
      borderRadius: 'var(--radius-card)',
      padding: PADS[padding] ?? PADS.md,
      boxShadow: interactive && hover ? 'var(--shadow-md)' : variant === 'raised' ? 'var(--shadow-sm)' : 'none',
      transform: interactive && hover ? 'translateY(-1px)' : 'none',
      transition: 'box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Rule. `weight="heavy"` is the 3px copper section rule used above headings. */
function Divider({
  weight = 'hair',
  tone = 'default',
  vertical = false,
  style,
  ...rest
}) {
  const px = weight === 'heavy' ? 3 : weight === 'thick' ? 2 : 1;
  const color = tone === 'accent' ? 'var(--line-accent)' : tone === 'strong' ? 'var(--line-strong)' : tone === 'inverse' ? 'var(--line-on-inverse)' : 'var(--line-hairline)';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    style: vertical ? {
      width: px,
      alignSelf: 'stretch',
      background: color,
      ...style
    } : {
      height: px,
      width: weight === 'heavy' ? 48 : '100%',
      background: color,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BOX = {
  sm: 30,
  md: 36,
  lg: 42
};

/** Square icon-only control for toolbars and card corners. */
function IconButton({
  children,
  label,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const box = BOX[size] || BOX.md;
  const outlined = variant === 'outline';
  const solid = variant === 'solid';
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: box,
      height: box,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${outlined ? 'var(--line-default)' : solid ? 'var(--action-primary)' : 'transparent'}`,
      borderRadius: 'var(--radius-button)',
      background: solid ? hover ? 'var(--action-primary-hover)' : 'var(--action-primary)' : hover ? 'var(--action-quiet-hover)' : 'transparent',
      color: solid ? 'var(--copper-100)' : disabled ? 'var(--action-disabled-text)' : 'var(--forest-700)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'var(--transition-color)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/SpecList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Monospace dimension/spec table used on project and piece pages. */
function SpecList({
  items = [],
  columns = 1,
  inverse = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("dl", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
      gap: '0 var(--space-9)',
      margin: 0,
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) 0',
      borderBottom: `1px solid ${inverse ? 'var(--line-on-inverse)' : 'var(--line-hairline)'}`
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      font: 'var(--weight-semibold) var(--text-3xs)/1.2 var(--font-ui)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--text-on-forest-muted)' : 'var(--text-muted)',
      minWidth: 96
    }
  }, it.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      marginLeft: 'auto',
      font: 'var(--type-spec)',
      fontSize: 'var(--text-sm)',
      color: inverse ? 'var(--text-on-forest)' : 'var(--text-heading)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, it.value))));
}
Object.assign(__ds_scope, { SpecList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SpecList.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Removable or selectable descriptor chip (species, finish, room). */
function Tag({
  children,
  selected = false,
  onRemove,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '0 10px',
      background: selected ? 'var(--forest-700)' : hover && interactive ? 'var(--sand-100)' : 'var(--surface-card)',
      color: selected ? 'var(--copper-100)' : 'var(--text-body)',
      border: `1px solid ${selected ? 'var(--forest-700)' : 'var(--line-default)'}`,
      borderRadius: 'var(--radius-pill)',
      font: 'var(--type-body-sm)',
      fontSize: 'var(--text-2xs)',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'var(--transition-color)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      cursor: 'pointer',
      opacity: .6,
      fontSize: 13,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Centred modal on a deep forest scrim. */
function Dialog({
  open = true,
  title,
  description,
  children,
  footer,
  onClose,
  width = 480,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-9)',
      background: 'rgba(8,24,15,.52)',
      backdropFilter: 'blur(2px)',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      border: '1px solid var(--line-hairline)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-overlay)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--card-pad-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-heading)',
      margin: 0
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, description), children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-5)',
      padding: 'var(--space-6) var(--card-pad-lg)',
      borderTop: '1px solid var(--line-hairline)',
      background: 'var(--surface-sunken)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressSteps.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Horizontal build-stage tracker. */
function ProgressSteps({
  steps = [],
  current = 0,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("ol", _extends({
    style: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      ...style
    }
  }, rest), steps.map((s, i) => {
    const label = typeof s === 'string' ? s : s.label;
    const meta = typeof s === 'string' ? undefined : s.meta;
    const done = i < current,
      active = i === current;
    return /*#__PURE__*/React.createElement("li", {
      key: label,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        height: 3,
        background: done || active ? 'var(--copper-600)' : 'var(--sand-200)',
        marginRight: i === steps.length - 1 ? 0 : 2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: `var(--weight-semibold) var(--text-3xs)/1.2 var(--font-ui)`,
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: active ? 'var(--text-heading)' : done ? 'var(--text-muted)' : 'var(--text-faint)'
      }
    }, label), meta && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-spec)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--text-faint)'
      }
    }, meta));
  }));
}
Object.assign(__ds_scope, { ProgressSteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressSteps.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  info: 'var(--forest-600)',
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  danger: 'var(--status-danger)'
};

/** Transient confirmation. Left edge carries the status colour. */
function Toast({
  title,
  message,
  tone = 'info',
  icon,
  onDismiss,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-5)',
      width: 360,
      maxWidth: '100%',
      padding: 'var(--space-6)',
      background: 'var(--surface-card)',
      border: '1px solid var(--line-hairline)',
      borderLeft: `3px solid ${TONES[tone] || TONES.info}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-lg)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: TONES[tone] || TONES.info,
      display: 'flex',
      marginTop: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-semibold) var(--text-sm)/1.3 var(--font-ui)',
      color: 'var(--text-heading)'
    }
  }, title), message && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)'
    }
  }, message)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      fontSize: 15,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hover label on a deep forest chip. */
function Tooltip({
  label,
  children,
  placement = 'top',
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 6px)',
    left: '50%',
    transform: 'translateX(-50%)'
  } : {
    bottom: 'calc(100% + 6px)',
    left: '50%',
    transform: 'translateX(-50%)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, rest), children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      whiteSpace: 'nowrap',
      zIndex: 40,
      background: 'var(--forest-800)',
      color: 'var(--copper-100)',
      padding: '5px 9px',
      borderRadius: 'var(--radius-xs)',
      font: 'var(--weight-medium) var(--text-3xs)/1.2 var(--font-ui)',
      letterSpacing: 'var(--tracking-wide)',
      boxShadow: 'var(--shadow-md)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square checkbox with the brand's 2px corner. */
function Checkbox({
  label,
  checked = false,
  disabled = false,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 17,
      height: 17,
      marginTop: 2,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      border: `1px solid ${checked ? 'var(--forest-700)' : 'var(--line-default)'}`,
      borderRadius: 'var(--radius-xs)',
      background: disabled ? 'var(--surface-sunken)' : checked ? 'var(--forest-700)' : 'var(--surface-card)',
      transition: 'var(--transition-color)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 5,
      borderLeft: '2px solid var(--copper-100)',
      borderBottom: '2px solid var(--copper-100)',
      transform: 'rotate(-45deg) translate(1px,-1px)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: disabled ? 'var(--text-faint)' : 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Label + help/error wrapper for any form control. */
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: 'var(--weight-semibold) var(--text-2xs)/1.2 var(--font-ui)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-accent)',
      marginLeft: 4
    }
  }, "*")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      fontSize: 'var(--text-2xs)',
      color: error ? 'var(--status-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldBox = (focus, invalid, disabled) => ({
  width: '100%',
  height: 40,
  padding: '0 var(--field-pad-x)',
  background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
  border: `1px solid ${invalid ? 'var(--status-danger)' : focus ? 'var(--forest-600)' : 'var(--line-default)'}`,
  borderRadius: 'var(--radius-field)',
  font: 'var(--type-body-sm)',
  color: 'var(--text-heading)',
  outline: 'none',
  boxShadow: focus ? '0 0 0 3px rgba(209,127,81,.22)' : 'none',
  transition: 'var(--transition-color), box-shadow var(--duration-fast) var(--ease-out)'
});

/** Single-line text input. */
function Input({
  invalid = false,
  disabled = false,
  prefix,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const box = fieldBox(focus, invalid, disabled);
  if (prefix) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        ...box,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: '0 var(--field-pad-x)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)',
        display: 'flex'
      }
    }, prefix), /*#__PURE__*/React.createElement("input", _extends({
      disabled: disabled,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        flex: 1,
        border: 'none',
        outline: 'none',
        background: 'transparent',
        font: 'var(--type-body-sm)',
        color: 'var(--text-heading)',
        minWidth: 0
      }
    }, rest)));
  }
  return /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...box,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Single-choice control. */
function Radio({
  label,
  checked = false,
  disabled = false,
  name,
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 17,
      height: 17,
      marginTop: 2,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 999,
      border: `1px solid ${checked ? 'var(--forest-700)' : 'var(--line-default)'}`,
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      transition: 'var(--transition-color)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--forest-700)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: disabled ? 'var(--text-faint)' : 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select, styled to match Input. */
function Select({
  options = [],
  invalid = false,
  disabled = false,
  placeholder,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      height: 40,
      padding: '0 32px 0 var(--field-pad-x)',
      appearance: 'none',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${invalid ? 'var(--status-danger)' : focus ? 'var(--forest-600)' : 'var(--line-default)'}`,
      borderRadius: 'var(--radius-field)',
      font: 'var(--type-body-sm)',
      color: 'var(--text-heading)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px rgba(209,127,81,.22)' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 12,
      top: 17,
      width: 8,
      height: 5,
      background: 'var(--text-muted)',
      clipPath: 'polygon(0 0,100% 0,50% 100%)',
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Immediate on/off toggle. */
function Switch({
  label,
  checked = false,
  disabled = false,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 21,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-pill)',
      position: 'relative',
      background: disabled ? 'var(--action-disabled)' : checked ? 'var(--forest-700)' : 'var(--sand-300)',
      transition: 'background-color var(--duration-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 20 : 3,
      width: 15,
      height: 15,
      borderRadius: 999,
      background: checked ? 'var(--copper-600)' : 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      transition: 'left var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text input. */
function Textarea({
  invalid = false,
  disabled = false,
  rows = 4,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: 'var(--space-5) var(--field-pad-x)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${invalid ? 'var(--status-danger)' : focus ? 'var(--forest-600)' : 'var(--line-default)'}`,
      borderRadius: 'var(--radius-field)',
      font: 'var(--type-body-sm)',
      color: 'var(--text-heading)',
      resize: 'vertical',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px rgba(209,127,81,.22)' : 'none',
      transition: 'var(--transition-color), box-shadow var(--duration-fast) var(--ease-out)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Site header: logo left, links centre-right, one action. */
function NavBar({
  links = [],
  active,
  onNavigate,
  action,
  assetBase = '/assets',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-10)',
      height: 76,
      padding: '0 var(--space-9)',
      background: 'var(--surface-inverse)',
      borderBottom: '1px solid var(--forest-800)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(links[0] && (links[0].value || links[0]));
    },
    style: {
      border: 'none',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "knockout",
    height: 30,
    assetBase: assetBase
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      marginLeft: 'auto'
    }
  }, links.map(l => {
    const v = typeof l === 'string' ? l : l.value;
    const label = typeof l === 'string' ? l : l.label;
    const on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => onNavigate && onNavigate(v),
      style: {
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        color: on ? 'var(--copper-500)' : 'var(--forest-200)',
        font: 'var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        transition: 'var(--transition-color)'
      }
    }, label);
  })), action);
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SideNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Product sidebar for the client portal. */
function SideNav({
  items = [],
  active,
  onNavigate,
  header,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      width: 232,
      flex: '0 0 232px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      padding: 'var(--space-7) var(--space-5)',
      background: 'var(--surface-inverse-deep)',
      color: 'var(--text-on-forest)',
      ...style
    }
  }, rest), header, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)'
    }
  }, items.map(it => {
    const v = it.value || it.label;
    const on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => onNavigate && onNavigate(v),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)',
        padding: '9px var(--space-5)',
        textAlign: 'left',
        background: on ? 'var(--forest-600)' : 'transparent',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        color: on ? 'var(--copper-200)' : 'var(--forest-200)',
        cursor: 'pointer',
        font: `var(--weight-${on ? 'semibold' : 'regular'}) var(--text-sm)/1.2 var(--font-ui)`,
        transition: 'var(--transition-color)'
      }
    }, it.icon, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-spec)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--forest-300)'
      }
    }, it.count));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, footer));
}
Object.assign(__ds_scope, { SideNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SideNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Underlined tab strip. */
function Tabs({
  tabs = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const active = value ?? (tabs[0] && (tabs[0].value || tabs[0]));
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      borderBottom: '1px solid var(--line-hairline)',
      ...style
    }
  }, rest), tabs.map(t => {
    const v = typeof t === 'string' ? t : t.value;
    const label = typeof t === 'string' ? t : t.label;
    const count = typeof t === 'string' ? undefined : t.count;
    const on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(v),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: '0 0 var(--space-5)',
        margin: 0,
        background: 'none',
        border: 'none',
        borderBottom: `2px solid ${on ? 'var(--copper-600)' : 'transparent'}`,
        marginBottom: -1,
        cursor: 'pointer',
        color: on ? 'var(--text-heading)' : 'var(--text-muted)',
        font: `var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)`,
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        transition: 'var(--transition-color)'
      }
    }, label, count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-spec)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--text-faint)'
      }
    }, count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// guidelines/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "guidelines/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Dashboard.jsx
try { (() => {
const {
  Card,
  Badge,
  Button,
  ProgressSteps,
  SpecList,
  Divider,
  Icon,
  Tooltip,
  IconButton
} = window.McKaySWoodshopDesignSystem_ff08a8;
const ACTIVITY = [['Doors sprayed', 'Finish room · today, 11:20', 'success'], ['Drawings v3 uploaded', 'Design · yesterday', 'info'], ['Deposit invoice paid', 'Accounts · Apr 2', 'success'], ['Hinge plate change approved', 'You · Mar 28', 'info']];
function Dashboard({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Glenora kitchen",
    meta: "MW-2246 \xB7 Rift-sawn white oak",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "In the shop"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "message-square",
        size: 15
      }),
      onClick: () => go('Messages')
    }, "Message the shop"))
  }), /*#__PURE__*/React.createElement(Content, null, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(PanelTitle, {
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-spec)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--text-muted)'
      }
    }, "INSTALL 2026-04-18")
  }, "Build stage"), /*#__PURE__*/React.createElement(ProgressSteps, {
    current: 4,
    steps: [{
      label: 'Measure',
      meta: 'Jan 14'
    }, {
      label: 'Design',
      meta: 'Feb 2'
    }, {
      label: 'Mill',
      meta: 'Mar 9'
    }, {
      label: 'Assemble',
      meta: 'Apr 1'
    }, {
      label: 'Finish',
      meta: 'in progress'
    }, {
      label: 'Install',
      meta: 'Apr 18'
    }]
  }), /*#__PURE__*/React.createElement(Divider, {
    style: {
      margin: '24px 0 18px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--status-warning)',
      display: 'flex',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)',
      color: 'var(--text-heading)'
    }
  }, "One thing needs you"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginTop: 4
    }
  }, "The toe-kick lighting spec changed. Approve it and we'll wire it this week.")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    style: {
      marginLeft: 'auto'
    },
    onClick: () => go('Project')
  }, "Review"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(PanelTitle, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => go('Project')
    }, "Full history")
  }, "Recent activity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, ACTIVITY.map(([t, m, tone], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 0',
      borderTop: i ? '1px solid var(--line-hairline)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: tone === 'success' ? 'var(--status-success)' : 'var(--copper-600)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-heading)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, m))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(PanelTitle, null, "Job specs"), /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      label: 'Dimensions',
      value: '228 × 40 × 36 in'
    }, {
      label: 'Species',
      value: 'White oak'
    }, {
      label: 'Finish',
      value: 'Hand-rubbed oil'
    }, {
      label: 'Quote',
      value: '$48,200'
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "inverse",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(PanelTitle, null, "Next on site"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-regular) var(--text-2xl)/1 var(--font-display)',
      color: 'var(--text-on-forest)'
    }
  }, "Apr 18"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-forest-muted)',
      marginTop: 8
    }
  }, "Install, two days, crew of three. We'll call the morning before."))))));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Invoices.jsx
try { (() => {
const {
  Card,
  Badge,
  Button,
  Divider,
  Icon,
  SpecList,
  IconButton
} = window.McKaySWoodshopDesignSystem_ff08a8;
const ROWS = [['INV-1841', 'Deposit · 40%', '2026-01-20', '$19,280', 'Paid'], ['INV-1902', 'Milling · 30%', '2026-03-12', '$14,460', 'Paid'], ['INV-1977', 'Finish · 20%', '2026-04-09', '$9,640', 'Due Apr 23'], ['INV-1978', 'Install · 10%', '—', '$4,820', 'Not issued']];
function Invoices() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Invoices",
    meta: "MW-2246 \xB7 Quote $48,200",
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 15
      })
    }, "Download all")
  }), /*#__PURE__*/React.createElement(Content, {
    width: 900
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, [['Quoted', '$48,200', 'neutral'], ['Paid to date', '$33,740', 'success'], ['Outstanding', '$9,640', 'warning']].map(([l, v, tone]) => /*#__PURE__*/React.createElement(Card, {
    key: l,
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-regular) var(--text-2xl)/1 var(--font-display)',
      color: tone === 'warning' ? 'var(--status-warning)' : 'var(--text-heading)',
      marginTop: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, v)))), /*#__PURE__*/React.createElement(Card, {
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '13px var(--card-pad)',
      borderBottom: '1px solid var(--line-hairline)',
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120
    }
  }, "Invoice"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Stage"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120
    }
  }, "Issued"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      textAlign: 'right'
    }
  }, "Amount"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 150,
      textAlign: 'right'
    }
  }, "Status")), ROWS.map(([no, stage, date, amt, state], i) => /*#__PURE__*/React.createElement("div", {
    key: no,
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px var(--card-pad)',
      borderTop: i ? '1px solid var(--line-hairline)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120,
      font: 'var(--type-spec)',
      color: 'var(--text-heading)'
    }
  }, no), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)'
    }
  }, stage), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120,
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      color: 'var(--text-muted)'
    }
  }, date), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      textAlign: 'right',
      font: 'var(--type-spec)',
      color: 'var(--text-heading)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, amt), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 150,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: state === 'Paid' ? 'success' : state.startsWith('Due') ? 'warning' : 'neutral',
    dot: state.startsWith('Due')
  }, state), state === 'Paid' && /*#__PURE__*/React.createElement(IconButton, {
    label: "Receipt",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 15
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "accent",
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)',
      color: 'var(--text-heading)'
    }
  }, "INV-1977 is due Apr 23"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginTop: 8
    }
  }, "E-transfer to accounts@mckayswoodshop.ca, or cheque at the shop."), /*#__PURE__*/React.createElement(Button, {
    style: {
      marginTop: 18
    }
  }, "Pay $9,640")), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Payment schedule"), /*#__PURE__*/React.createElement(SpecList, {
    style: {
      marginTop: 14
    },
    items: [{
      label: 'Deposit',
      value: '40% at signing'
    }, {
      label: 'Milling',
      value: '30% at mill start'
    }, {
      label: 'Finish',
      value: '20% at spray'
    }, {
      label: 'Install',
      value: '10% on completion'
    }]
  })))));
}
window.Invoices = Invoices;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Invoices.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Login.jsx
try { (() => {
const {
  Card,
  Field,
  Input,
  Button,
  Checkbox,
  Logo,
  Icon,
  Divider
} = window.McKaySWoodshopDesignSystem_ff08a8;
function Login({
  onSignIn
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: 'var(--surface-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '56px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "knockout",
    height: 92,
    assetBase: PA
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 3,
      background: 'var(--line-accent)',
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--weight-regular) var(--text-4xl)/1.08 var(--font-display)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-on-forest)'
    }
  }, "Watch your job move through the shop."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-on-forest-muted)',
      marginTop: 16,
      maxWidth: '40ch'
    }
  }, "Drawings, stage dates, invoices and photos from the floor. Nothing else.")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--forest-300)'
    }
  }, "1140 MILL ROAD \xB7 (613) 555-0188")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      display: 'grid',
      placeItems: 'center',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      width: 380
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, "Client portal"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-heading)',
      marginTop: 10
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "l-email"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "l-email",
    defaultValue: "helen@ashworth.ca"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Job number",
    hint: "On the top right of your quote.",
    htmlFor: "l-job"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "l-job",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "hash",
      size: 15
    }),
    defaultValue: "MW-2246"
  })), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Keep me signed in on this device",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Button, {
    block: true,
    size: "lg",
    onClick: onSignIn
  }, "Sign in")), /*#__PURE__*/React.createElement(Divider, {
    style: {
      margin: '22px 0 16px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "Lost your job number? Call the shop and we'll read it off the board."))));
}
window.Login = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Messages.jsx
try { (() => {
const {
  Card,
  Button,
  Textarea,
  Icon,
  Badge,
  Divider,
  IconButton,
  Tag
} = window.McKaySWoodshopDesignSystem_ff08a8;
const THREAD = [{
  from: 'shop',
  who: 'Dan (shop floor)',
  when: 'Apr 9, 11:20',
  body: 'Doors went through the spray booth this morning. Four days to cure, then we load. Photos attached to the drawing set.'
}, {
  from: 'you',
  who: 'You',
  when: 'Apr 9, 13:02',
  body: 'They look great. Is the toe-kick light still on the plan?'
}, {
  from: 'shop',
  who: 'Dan (shop floor)',
  when: 'Apr 9, 13:41',
  body: 'It is, but the spec changed to a warmer strip — 2700K instead of 3000K. Drawing C2 is up for approval when you get a minute.'
}];
function Messages() {
  const [draft, setDraft] = React.useState('');
  const [thread, setThread] = React.useState(THREAD);
  const send = () => {
    if (!draft.trim()) return;
    setThread([...thread, {
      from: 'you',
      who: 'You',
      when: 'Just now',
      body: draft.trim()
    }]);
    setDraft('');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Messages",
    meta: "MW-2246 \xB7 Dan, Ruth and the shop floor",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "Shop open until 4:30")
  }), /*#__PURE__*/React.createElement(Content, {
    width: 760
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--card-pad)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, thread.map((m, i) => {
    const mine = m.from === 'you';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: mine ? 'flex-end' : 'flex-start',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--type-spec)',
        fontSize: 'var(--text-3xs)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, m.who, " \xB7 ", m.when), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '78%',
        padding: '12px 14px',
        borderRadius: 'var(--radius-md)',
        background: mine ? 'var(--surface-inverse)' : 'var(--surface-sunken)',
        color: mine ? 'var(--text-on-forest)' : 'var(--text-body)',
        border: mine ? 'none' : '1px solid var(--line-hairline)',
        font: 'var(--type-body-sm)'
      }
    }, m.body));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--line-hairline)',
      padding: 'var(--card-pad)',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    value: draft,
    onChange: e => setDraft(e.target.value),
    placeholder: "Ask the shop anything. We read these between cuts."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Attach a photo",
    variant: "outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "paperclip",
    size: 16
  })), /*#__PURE__*/React.createElement(Tag, null, "Usually replies same day"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    style: {
      marginLeft: 'auto'
    },
    onClick: send,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "send",
      size: 15
    })
  }, "Send"))))));
}
window.Messages = Messages;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Messages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/PortalChrome.jsx
try { (() => {
const {
  SideNav,
  Logo,
  Icon,
  IconButton,
  Badge,
  Divider,
  Tooltip
} = window.McKaySWoodshopDesignSystem_ff08a8;
const PA = '../../assets';
const NAV = [{
  label: 'Dashboard',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "layout-dashboard",
    size: 16
  })
}, {
  label: 'Project',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "hammer",
    size: 16
  })
}, {
  label: 'Drawings',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 16
  }),
  count: 12
}, {
  label: 'Invoices',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "receipt",
    size: 16
  }),
  count: 2
}, {
  label: 'Messages',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "message-square",
    size: 16
  }),
  count: 3
}];
function PortalShell({
  page,
  go,
  children,
  onSignOut
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(SideNav, {
    items: NAV,
    active: page,
    onNavigate: go,
    header: /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '4px 8px 14px'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "knockout",
      height: 40,
      assetBase: PA
    })),
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--line-on-inverse)',
        paddingTop: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 2,
        background: 'var(--copper-600)',
        color: 'var(--forest-800)',
        display: 'grid',
        placeItems: 'center',
        font: 'var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)'
      }
    }, "HA"), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--weight-medium) var(--text-2xs)/1.2 var(--font-ui)',
        color: 'var(--copper-100)'
      }
    }, "Helen Ashworth"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--type-spec)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--forest-300)'
      }
    }, "MW-2246")), /*#__PURE__*/React.createElement("button", {
      onClick: onSignOut,
      title: "Sign out",
      style: {
        marginLeft: 'auto',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--forest-300)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "log-out",
      size: 15
    })))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, children));
}
function TopBar({
  title,
  meta,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '18px 28px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-heading)'
    }
  }, title), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, actions));
}
function Content({
  children,
  width = 1000
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: width,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, children));
}
function PanelTitle({
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, action));
}
Object.assign(window, {
  PortalShell,
  TopBar,
  Content,
  PanelTitle,
  PA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/PortalChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Project.jsx
try { (() => {
const {
  Card,
  Tabs,
  Badge,
  Button,
  Divider,
  Icon,
  SpecList,
  Checkbox,
  Switch,
  Textarea,
  Field,
  Dialog,
  Toast,
  Tag,
  IconButton,
  Tooltip
} = window.McKaySWoodshopDesignSystem_ff08a8;
const DRAWINGS = [['MW-2246-A3', 'Elevations, run A', 'v3', 'Approved'], ['MW-2246-B1', 'Island plan', 'v2', 'Approved'], ['MW-2246-C2', 'Toe-kick lighting', 'v1', 'Needs approval'], ['MW-2246-D1', 'Hardware schedule', 'v4', 'Approved']];
function Project({
  go
}) {
  const [tab, setTab] = React.useState('milestones');
  const [approve, setApprove] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [notify, setNotify] = React.useState(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Project",
    meta: "MW-2246 \xB7 Glenora kitchen",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tooltip, {
      label: "Download the job file"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Download",
      variant: "outline"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 16
    }))), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "printer",
        size: 15
      })
    }, "Print work order"))
  }), /*#__PURE__*/React.createElement(Content, null, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      label: 'Milestones',
      value: 'milestones',
      count: 6
    }, {
      label: 'Drawings',
      value: 'drawings',
      count: 12
    }, {
      label: 'Specs',
      value: 'specs'
    }, {
      label: 'Settings',
      value: 'settings'
    }]
  }), tab === 'milestones' && /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, [['Measure', 'Jan 14', 'Done', 'Two hours on site. Back wall runs 11/16 in out over nineteen feet.'], ['Design', 'Feb 2', 'Done', 'Three rounds of elevations. Final set signed Feb 2.'], ['Mill', 'Mar 9', 'Done', 'Three logs, one mill. All face frames cut from the same flitch.'], ['Assemble', 'Apr 1', 'Done', 'Carcases up, drawer boxes dovetailed and fitted.'], ['Finish', 'in progress', 'Active', 'Doors sprayed today. Four more days of cure before we load.'], ['Install', 'Apr 18', 'Upcoming', 'Two days, crew of three.']].map(([stage, date, state, note], i) => /*#__PURE__*/React.createElement("div", {
    key: stage,
    style: {
      display: 'flex',
      gap: 18,
      padding: '16px 0',
      borderTop: i ? '1px solid var(--line-hairline)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      flex: '0 0 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)'
    }
  }, stage), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      color: 'var(--text-muted)',
      marginTop: 5
    }
  }, date)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: state === 'Active' ? 'success' : state === 'Upcoming' ? 'neutral' : 'forest',
    dot: state === 'Active'
  }, state), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginTop: 8
    }
  }, note))))), tab === 'drawings' && /*#__PURE__*/React.createElement(Card, {
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px var(--card-pad)',
      borderBottom: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Drawing set"), /*#__PURE__*/React.createElement(Tag, {
    style: {
      marginLeft: 'auto'
    }
  }, "Current revisions only")), DRAWINGS.map(([no, name, rev, state], i) => /*#__PURE__*/React.createElement("div", {
    key: no,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '13px var(--card-pad)',
      borderTop: i ? '1px solid var(--line-hairline)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--copper-700)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-spec)',
      color: 'var(--text-heading)',
      width: 130
    }
  }, no), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      flex: 1
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      color: 'var(--text-muted)'
    }
  }, rev), /*#__PURE__*/React.createElement(Badge, {
    tone: state === 'Approved' ? 'success' : 'warning',
    dot: state !== 'Approved'
  }, state), state === 'Approved' ? /*#__PURE__*/React.createElement(IconButton, {
    label: "Download"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 16
  })) : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setApprove(true)
  }, "Approve")))), tab === 'specs' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(PanelTitle, null, "Cabinetry"), /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      label: 'Dimensions',
      value: '228 × 40 × 36 in'
    }, {
      label: 'Species',
      value: 'White oak, rift sawn'
    }, {
      label: 'Construction',
      value: 'Frameless'
    }, {
      label: 'Drawer box',
      value: 'Dovetailed maple'
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(PanelTitle, null, "Finish & hardware"), /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      label: 'Finish',
      value: 'Hand-rubbed oil'
    }, {
      label: 'Sheen',
      value: 'Satin, 25%'
    }, {
      label: 'Hinges',
      value: 'Blum, soft close'
    }, {
      label: 'Pulls',
      value: 'Blackened steel'
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "sunken",
    padding: "lg",
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(PanelTitle, null, "Shop notes"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)'
    }
  }, "Grain matched across runs A and B from a single flitch. Island slab resawn and book-matched at the sink seam. Scribes cut on site."))), tab === 'settings' && /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(PanelTitle, null, "Notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Text me when a stage completes",
    checked: notify,
    onChange: e => setNotify(e.target.checked)
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Email me photos from the floor",
    checked: false,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Copy my partner on invoices",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Site access notes",
    hint: "Gate codes, parking, pets."
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    defaultValue: "Side gate code 4417. Dog is friendly but will leave."
  })), /*#__PURE__*/React.createElement(Button, {
    style: {
      alignSelf: 'flex-start'
    },
    onClick: () => setToast(true)
  }, "Save changes")))), /*#__PURE__*/React.createElement(Dialog, {
    open: approve,
    title: "Approve the toe-kick lighting?",
    description: "We'll wire it this week. Changes after approval are billed at shop rate.",
    onClose: () => setApprove(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setApprove(false)
    }, "Not yet"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setApprove(false);
        setToast(true);
      }
    }, "Approve drawing"))
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Saved",
    message: "The shop has been notified.",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16
    }),
    onDismiss: () => setToast(false)
  })));
}
window.Project = Project;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Project.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const {
  NavBar,
  Button,
  Logo,
  Mark,
  Icon,
  Divider
} = window.McKaySWoodshopDesignSystem_ff08a8;
const A = '../../assets';
function Photo({
  label,
  ratio = '4 / 3',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: 'var(--sand-100)',
      border: '1px solid var(--line-hairline)',
      borderRadius: 'var(--radius-image)',
      display: 'grid',
      placeItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, label));
}
function Eyebrow({
  children,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: tone === 'inverse' ? 'var(--copper-500)' : 'var(--text-accent)'
    }
  }, children);
}
function SectionHead({
  eyebrow,
  title,
  lede,
  inverse,
  align = 'left'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '60ch',
      margin: align === 'center' ? '0 auto' : 0,
      textAlign: align
    }
  }, eyebrow && /*#__PURE__*/React.createElement(Eyebrow, {
    tone: inverse ? 'inverse' : undefined
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 3,
      background: 'var(--line-accent)',
      margin: align === 'center' ? '14px auto 12px' : '14px 0 12px'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h2)',
      letterSpacing: 'var(--tracking-tight)',
      color: inverse ? 'var(--text-on-forest)' : 'var(--text-heading)'
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: inverse ? 'var(--text-on-forest-muted)' : 'var(--text-body)',
      marginTop: 12
    }
  }, lede));
}
function SiteHeader({
  page,
  go
}) {
  return /*#__PURE__*/React.createElement(NavBar, {
    assetBase: A,
    active: page,
    onNavigate: go,
    links: [{
      label: 'Work',
      value: 'work'
    }, {
      label: 'Services',
      value: 'services'
    }, {
      label: 'Process',
      value: 'process'
    }, {
      label: 'About',
      value: 'about'
    }],
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "sm",
      onClick: () => go('quote')
    }, "Request a quote")
  });
}
function SiteFooter({
  go
}) {
  const col = (title, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--copper-500)'
    }
  }, title), items.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--forest-200)'
    }
  }, i)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse-deep)',
      padding: '56px 40px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "knockout",
    height: 64,
    assetBase: A
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--forest-300)',
      marginTop: 18,
      maxWidth: '32ch'
    }
  }, "Custom cabinetry, furniture and millwork. One shop, one crew, start to finish.")), col('Work', ['Kitchens', 'Built-ins', 'Furniture', 'Stairs & railings']), col('Shop', ['Process', 'Timber & finishes', 'Lead times', 'Careers']), col('Visit', ['1140 Mill Road', 'Ontario, Canada', '(613) 555-0188', 'shop@mckayswoodshop.ca'])), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '40px auto 0',
      paddingTop: 20,
      borderTop: '1px solid var(--line-on-inverse)',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--forest-300)'
    }
  }, "\xA9 2026 MCKAY'S WOODSHOP"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 14
    }
  }, ['cross', 'pine', 'buck', 'lumber'].map(g => /*#__PURE__*/React.createElement(Mark, {
    key: g,
    glyph: g,
    tone: "copper",
    size: 20,
    assetBase: A
  })))));
}
function Shell({
  page,
  go,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    page: page,
    go: go
  }), /*#__PURE__*/React.createElement("main", null, children), /*#__PURE__*/React.createElement(SiteFooter, {
    go: go
  }));
}
Object.assign(window, {
  Photo,
  Eyebrow,
  SectionHead,
  SiteHeader,
  SiteFooter,
  Shell,
  A
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  Divider,
  SpecList,
  Icon,
  Mark,
  ProgressSteps
} = window.McKaySWoodshopDesignSystem_ff08a8;
const SERVICES = [{
  icon: 'chef-hat',
  title: 'Kitchens',
  copy: 'Face-frame and frameless cabinetry, drawn around how you actually cook.'
}, {
  icon: 'library',
  title: 'Built-ins',
  copy: 'Bookcases, mudrooms, window seats — scribed to the walls you have.'
}, {
  icon: 'armchair',
  title: 'Furniture',
  copy: 'Tables, beds and casework in solid hardwood, joined to last generations.'
}, {
  icon: 'move-up-right',
  title: 'Stairs & railings',
  copy: 'Treads, stringers and handrails milled and fitted on site.'
}];
const PROJECTS = [{
  name: 'Glenora kitchen',
  meta: 'White oak · 2026',
  tall: true
}, {
  name: 'Mill Road library',
  meta: 'Black walnut · 2025'
}, {
  name: 'Harbour table',
  meta: 'Hard maple · 2025'
}];
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)',
      padding: '72px 40px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.05fr .95fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Custom woodworking \xB7 Est. 1998"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--weight-regular) var(--text-6xl)/1.02 var(--font-display)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-on-forest)',
      marginTop: 20
    }
  }, "Cabinetry milled a mile from your kitchen."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-on-forest-muted)',
      maxWidth: '46ch',
      marginTop: 20
    }
  }, "We measure the room, draw the piece, mill the boards and finish it by hand. Nothing is subcontracted and nothing leaves the shop unfinished."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => go('quote'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 17
    })
  }, "Request a quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('work'),
    style: {
      color: 'var(--copper-200)',
      borderColor: 'var(--forest-400)'
    }
  }, "See the work")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      marginTop: 44
    }
  }, [['28', 'years in the shop'], ['410', 'rooms delivered'], ['9–11', 'week lead time']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-regular) var(--text-3xl)/1 var(--font-display)',
      color: 'var(--copper-500)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--forest-300)',
      marginTop: 6
    }
  }, l))))), /*#__PURE__*/React.createElement(Photo, {
    label: "Hero photography \xB7 shop interior",
    ratio: "5 / 6",
    style: {
      background: 'var(--forest-600)',
      borderColor: 'var(--forest-500)'
    }
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-y) 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "What we build",
    title: "Four things, done properly",
    lede: "Every job runs through the same six stages, whether it's one table or a whole floor of millwork."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gap: 20,
      marginTop: 40
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.title,
    padding: "lg",
    interactive: true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--copper-700)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 26
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-heading)',
      marginTop: 18
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginTop: 8
    }
  }, s.copy)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 40px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Selected work",
    title: "Recent rooms"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('work'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15
    })
  }, "All projects")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1fr',
      gap: 20,
      marginTop: 36
    }
  }, PROJECTS.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    padding: "none",
    interactive: true,
    style: {
      overflow: 'hidden',
      cursor: 'pointer'
    },
    onClick: () => go('project')
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "Project photography",
    ratio: p.tall ? '5 / 4' : '4 / 3',
    style: {
      border: 'none',
      borderRadius: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--card-pad)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)',
      color: 'var(--text-heading)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 5
    }
  }, p.meta)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      color: 'var(--copper-700)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 17
  })))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-sunken)',
      padding: 'var(--section-y) 40px',
      borderTop: '1px solid var(--line-hairline)',
      borderBottom: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "How a job runs",
    title: "Six stages, one shop",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(ProgressSteps, {
    current: 5,
    steps: [{
      label: 'Measure',
      meta: 'Week 1'
    }, {
      label: 'Design',
      meta: 'Weeks 2–3'
    }, {
      label: 'Mill',
      meta: 'Weeks 4–6'
    }, {
      label: 'Assemble',
      meta: 'Weeks 7–8'
    }, {
      label: 'Finish',
      meta: 'Weeks 9–10'
    }, {
      label: 'Install',
      meta: 'Week 11'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 20,
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "inverse",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Mark, {
    glyph: "lumber",
    tone: "copper",
    size: 28,
    assetBase: A
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-on-forest)',
      marginTop: 16
    }
  }, "We buy the log, not the board"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-forest-muted)',
      marginTop: 8
    }
  }, "Grain is matched across a whole run because it came off the same tree.")), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Typical kitchen"), /*#__PURE__*/React.createElement(SpecList, {
    style: {
      marginTop: 14
    },
    items: [{
      label: 'Lead time',
      value: '9–11 weeks'
    }, {
      label: 'Species',
      value: 'Oak, walnut, maple'
    }, {
      label: 'Finish',
      value: 'Hand-rubbed oil'
    }, {
      label: 'Warranty',
      value: '10 years'
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    variant: "accent"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "copper"
  }, "Booking now"), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-heading)',
      marginTop: 16
    }
  }, "Spring 2027 slots"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginTop: 8
    }
  }, "Four kitchen slots left. Site visits are free within 90 minutes of the shop."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    style: {
      marginTop: 20
    },
    onClick: () => go('quote')
  }, "Book a site visit"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-y) 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    glyph: "buck",
    size: 40,
    assetBase: A,
    style: {
      margin: '0 auto'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-light) var(--text-2xl)/1.35 var(--font-display)',
      color: 'var(--text-heading)',
      marginTop: 24
    }
  }, "\"They found a knot I'd have hidden, and built the drawer front around it so you'd see it every morning.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 20
    }
  }, "Helen A. \xB7 Glenora kitchen"))));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProjectDetail.jsx
try { (() => {
const {
  Card,
  SpecList,
  Badge,
  Button,
  Divider,
  Icon,
  Tag,
  Mark
} = window.McKaySWoodshopDesignSystem_ff08a8;
function ProjectDetail({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 40px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('work'),
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-muted)',
      font: 'var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), " All work"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr .9fr',
      gap: 48,
      marginTop: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Photo, {
    label: "Project photography \xB7 hero",
    ratio: "4 / 3"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 12,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "Detail",
    ratio: "1 / 1"
  }), /*#__PURE__*/React.createElement(Photo, {
    label: "Detail",
    ratio: "1 / 1"
  }), /*#__PURE__*/React.createElement(Photo, {
    label: "In the shop",
    ratio: "1 / 1"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "copper"
  }, "Kitchens"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h1)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-heading)',
      marginTop: 16
    }
  }, "Glenora kitchen"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      marginTop: 16
    }
  }, "Nineteen feet of frameless cabinetry in rift-sawn white oak, all of it cut from three logs bought at a mill outside Perth. The island top is a single 12-foot slab, book-matched at the seam so the grain runs unbroken past the sink."), /*#__PURE__*/React.createElement(Divider, {
    weight: "heavy",
    tone: "accent",
    style: {
      margin: '28px 0 20px'
    }
  }), /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      label: 'Job no.',
      value: 'MW-2246'
    }, {
      label: 'Dimensions',
      value: '228 × 40 × 36 in'
    }, {
      label: 'Species',
      value: 'White oak, rift sawn'
    }, {
      label: 'Finish',
      value: 'Hand-rubbed oil'
    }, {
      label: 'Hardware',
      value: 'Blum, soft close'
    }, {
      label: 'Built',
      value: '2026-04-18'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Frameless"), /*#__PURE__*/React.createElement(Tag, null, "Book-matched"), /*#__PURE__*/React.createElement(Tag, null, "Integrated lighting")), /*#__PURE__*/React.createElement(Card, {
    variant: "sunken",
    padding: "lg",
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    glyph: "pine",
    size: 30,
    assetBase: A
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)',
      color: 'var(--text-heading)'
    }
  }, "Want something like this?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, "Site visits are free within 90 minutes of the shop."))), /*#__PURE__*/React.createElement(Button, {
    block: true,
    style: {
      marginTop: 18
    },
    onClick: () => go('quote')
  }, "Request a quote")))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-y) 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Notes from the shop",
    title: "What made this one hard"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 20,
      marginTop: 36
    }
  }, [['Out-of-square walls', 'The back wall ran 11/16 in out over nineteen feet. Every scribe was cut on site rather than in the shop.'], ['One seam, twelve feet', 'The island slab was resawn and book-matched so the seam reads as a grain line, not a joint.'], ['Matching an old floor', 'The existing oak floor was forty years amber. We aged sample doors for three weeks before settling on the oil.']].map(([t, c]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    padding: "lg"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-heading)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginTop: 10
    }
  }, c)))))));
}
window.ProjectDetail = ProjectDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProjectDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/QuoteRequest.jsx
try { (() => {
const {
  Card,
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Button,
  Icon,
  Badge,
  Toast,
  Dialog,
  SpecList
} = window.McKaySWoodshopDesignSystem_ff08a8;
function QuoteRequest() {
  const [scope, setScope] = React.useState('kitchen');
  const [install, setInstall] = React.useState(true);
  const [sent, setSent] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '56px 40px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 940,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.35fr .8fr',
      gap: 40,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Request a quote"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h1)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-heading)',
      marginTop: 14
    }
  }, "Tell us about the room"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      marginTop: 14,
      maxWidth: '54ch'
    }
  }, "Rough measurements are fine. We'll read this before we call, and we'll bring a tape when we visit."), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name",
    required: true,
    htmlFor: "q-name"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q-name",
    placeholder: "Jordan McKay"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Phone",
    required: true,
    htmlFor: "q-phone"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q-phone",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 15
    }),
    placeholder: "(613) 555-0188"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "q-email",
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q-email",
    placeholder: "you@example.ca"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Town",
    htmlFor: "q-town"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q-town",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 15
    }),
    placeholder: "Perth, ON"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Species",
    hint: "We'll advise if you're unsure."
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "No preference",
    options: ['White oak', 'Black walnut', 'Hard maple', 'Ash', 'Douglas fir']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)',
      marginBottom: 10
    }
  }, "Scope"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, [['kitchen', 'A kitchen or pantry'], ['built-in', 'Built-in cabinetry'], ['furniture', 'A piece of furniture'], ['other', 'Something else']].map(([v, l]) => /*#__PURE__*/React.createElement(Radio, {
    key: v,
    name: "scope",
    label: l,
    checked: scope === v,
    onChange: () => setScope(v)
  })))), /*#__PURE__*/React.createElement(Field, {
    label: "Rough dimensions",
    htmlFor: "q-dim"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q-dim",
    placeholder: "e.g. 12 ft \xD7 9 ft, 8 ft ceiling"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Target month",
    htmlFor: "q-when"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q-when",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-days",
      size: 15
    }),
    placeholder: "Spring 2027"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Anything we should know",
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 4,
    placeholder: "Existing millwork, appliance sizes, a photo you keep coming back to."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Include installation",
    checked: install,
    onChange: e => setInstall(e.target.checked)
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Send me the shop newsletter (four a year, no more)",
    checked: false,
    onChange: () => {}
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginTop: 28,
      paddingTop: 22,
      borderTop: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "We reply within two business days."), /*#__PURE__*/React.createElement(Button, {
    style: {
      marginLeft: 'auto'
    },
    onClick: () => setConfirm(true),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15
    })
  }, "Send the request")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'sticky',
      top: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "inverse",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "copper"
  }, "Booking now"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-on-forest)',
      marginTop: 14
    }
  }, "Spring 2027"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-forest-muted)',
      marginTop: 8
    }
  }, "Four kitchen slots left. Furniture is booking eleven weeks out.")), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "What happens next"), /*#__PURE__*/React.createElement(SpecList, {
    style: {
      marginTop: 14
    },
    items: [{
      label: 'Step 1',
      value: 'We call'
    }, {
      label: 'Step 2',
      value: 'Site visit'
    }, {
      label: 'Step 3',
      value: 'Drawings'
    }, {
      label: 'Step 4',
      value: 'Fixed quote'
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "sunken",
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--copper-700)',
      display: 'flex',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)',
      color: 'var(--text-heading)'
    }
  }, "Rather talk?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      color: 'var(--text-body)',
      marginTop: 4
    }
  }, "(613) 555-0188"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "Shop hours, 7:30\u20134:30, Monday to Friday.")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    title: "Send this to the shop?",
    description: "We'll read it before we call. You can add photos in the reply.",
    onClose: () => setConfirm(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Keep editing"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setConfirm(false);
        setSent(true);
      }
    }, "Send it"))
  }), sent && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Request sent",
    message: "We'll be in touch within two business days.",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16
    }),
    onDismiss: () => setSent(false)
  })));
}
window.QuoteRequest = QuoteRequest;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/QuoteRequest.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Work.jsx
try { (() => {
const {
  Card,
  Tag,
  Button,
  Icon,
  Badge
} = window.McKaySWoodshopDesignSystem_ff08a8;
const FILTERS = ['Kitchens', 'Built-ins', 'Furniture', 'Stairs', 'White oak', 'Walnut', 'Maple'];
const ITEMS = [{
  name: 'Glenora kitchen',
  meta: 'White oak · 2026',
  tag: 'Kitchens'
}, {
  name: 'Mill Road library',
  meta: 'Black walnut · 2025',
  tag: 'Built-ins'
}, {
  name: 'Harbour table',
  meta: 'Hard maple · 2025',
  tag: 'Furniture'
}, {
  name: 'Cedar Lane stair',
  meta: 'White oak · 2025',
  tag: 'Stairs'
}, {
  name: 'Ferry Street mudroom',
  meta: 'Ash · 2024',
  tag: 'Built-ins'
}, {
  name: 'Bayfield pantry',
  meta: 'Black walnut · 2024',
  tag: 'Kitchens'
}];
function Work({
  go
}) {
  const [active, setActive] = React.useState([]);
  const toggle = t => setActive(a => a.includes(t) ? a.filter(x => x !== t) : [...a, t]);
  const shown = active.length ? ITEMS.filter(i => active.includes(i.tag)) : ITEMS;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)',
      padding: '56px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Selected work"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h1)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-on-forest)',
      marginTop: 14
    }
  }, "410 rooms, and counting"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '32px 40px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      paddingBottom: 24,
      borderBottom: '1px solid var(--line-hairline)'
    }
  }, FILTERS.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    selected: active.includes(t),
    onClick: () => toggle(t)
  }, t)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, shown.length, " projects")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 20,
      marginTop: 28
    }
  }, shown.map(i => /*#__PURE__*/React.createElement(Card, {
    key: i.name,
    padding: "none",
    interactive: true,
    style: {
      overflow: 'hidden',
      cursor: 'pointer'
    },
    onClick: () => go('project')
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "Project photography"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--card-pad)'
    }
  }, /*#__PURE__*/React.createElement(Badge, null, i.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)',
      color: 'var(--text-heading)',
      marginTop: 12
    }
  }, i.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-spec)',
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 5
    }
  }, i.meta))))), !shown.length && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)',
      marginTop: 32
    }
  }, "Nothing in that combination yet."))));
}
window.Work = Work;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Work.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SpecList = __ds_scope.SpecList;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.ProgressSteps = __ds_scope.ProgressSteps;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SideNav = __ds_scope.SideNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
