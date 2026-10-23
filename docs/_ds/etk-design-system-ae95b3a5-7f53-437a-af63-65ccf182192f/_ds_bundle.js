/* @ds-bundle: {"format":4,"namespace":"ETKDesignSystem_ae95b3","components":[{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"SpecFigure","sourcePath":"components/brand/SpecFigure.jsx"},{"name":"SpecTable","sourcePath":"components/brand/SpecTable.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ColorSwatch","sourcePath":"components/vehicle/ColorSwatch.jsx"},{"name":"TrimRow","sourcePath":"components/vehicle/TrimRow.jsx"},{"name":"VehicleCard","sourcePath":"components/vehicle/VehicleCard.jsx"}],"sourceHashes":{"components/brand/Eyebrow.jsx":"83c954e6654c","components/brand/SpecFigure.jsx":"57f153459f42","components/brand/SpecTable.jsx":"e38446c99d99","components/core/Badge.jsx":"96d826e3caae","components/core/Button.jsx":"fcc090c9fb13","components/core/Card.jsx":"28bd69058cdd","components/core/Divider.jsx":"9421237b30b9","components/core/Icon.jsx":"8c5cc3810508","components/core/IconButton.jsx":"45542878a778","components/core/Logo.jsx":"08c00186dce4","components/core/Tag.jsx":"527fad718c7f","components/feedback/Dialog.jsx":"d78f2d8c055f","components/feedback/Toast.jsx":"f154c751b39e","components/feedback/Tooltip.jsx":"36fcea8c1377","components/forms/Checkbox.jsx":"93dfa20b514b","components/forms/Input.jsx":"0746c1c17d2f","components/forms/Radio.jsx":"775f3b0c741d","components/forms/Select.jsx":"e5cd854ae104","components/forms/Switch.jsx":"a406f1ca15a7","components/navigation/Tabs.jsx":"58807e9a8a2b","components/vehicle/ColorSwatch.jsx":"1e8888bd779d","components/vehicle/TrimRow.jsx":"6860ec985374","components/vehicle/VehicleCard.jsx":"15236a2420e2","ui_kits/cockpit/Dock.jsx":"6a9531b0aa83","ui_kits/cockpit/DriveScreen.jsx":"48f729a3897b","ui_kits/cockpit/MediaScreen.jsx":"32a7f1828944","ui_kits/cockpit/NavScreen.jsx":"d940cef94662","ui_kits/cockpit/StatusBar.jsx":"1d31a8fe5c66","ui_kits/cockpit/VehicleScreen.jsx":"f77a75bfa6d2","ui_kits/configurator/Stage.jsx":"34daf13e48d7","ui_kits/configurator/StepNav.jsx":"6599473980fd","ui_kits/configurator/Steps.jsx":"e9af1f4a127b","ui_kits/configurator/Summary.jsx":"559b6c264b0a","ui_kits/configurator/data.js":"e7e83e68459d","ui_kits/marketing/Footer.jsx":"b053226c6e30","ui_kits/marketing/Header.jsx":"8b877524a39e","ui_kits/marketing/HeritageScreen.jsx":"8bd54978b861","ui_kits/marketing/HomeScreen.jsx":"64f234b06e17","ui_kits/marketing/ModelScreen.jsx":"d3739d9a071f","ui_kits/marketing/RangeScreen.jsx":"8d64871832a6","ui_kits/marketing/TtSportScreen.jsx":"89e83cb76595","ui_kits/marketing/data.js":"2c410fcb187b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ETKDesignSystem_ae95b3 = window.ETKDesignSystem_ae95b3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Eyebrow.jsx
try { (() => {
function Eyebrow({
  rule = false,
  tone = 'strong',
  children,
  style
}) {
  const c = tone === 'muted' ? 'var(--text-muted)' : tone === 'accent' ? 'var(--text-accent)' : tone === 'inverse' ? '#fff' : 'var(--text-strong)';
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, rule && React.createElement('div', {
    style: {
      width: 44,
      height: 3,
      background: 'var(--etk-orange-600)',
      marginBottom: 'var(--space-3)'
    }
  }), React.createElement('div', {
    style: {
      fontSize: 'var(--type-eyebrow-size)',
      lineHeight: 'var(--type-eyebrow-lh)',
      letterSpacing: 'var(--type-eyebrow-ls)',
      fontWeight: 'var(--type-eyebrow-weight)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: c
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/SpecFigure.jsx
try { (() => {
function SpecFigure({
  label,
  value,
  unit,
  align = 'left',
  size = 'md',
  inverse = false,
  style
}) {
  const fs = size === 'lg' ? 44 : size === 'sm' ? 24 : 34;
  return React.createElement('div', {
    style: {
      textAlign: align,
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--type-eyebrow-size)',
      letterSpacing: 'var(--type-eyebrow-ls)',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: inverse ? 'rgba(255,255,255,.62)' : 'var(--text-muted)'
    }
  }, label), React.createElement('div', {
    style: {
      marginTop: 6,
      fontSize: fs,
      lineHeight: 1,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums',
      color: inverse ? '#fff' : 'var(--text-strong)'
    }
  }, value, unit && React.createElement('span', {
    style: {
      fontSize: fs * 0.44,
      fontWeight: 400,
      marginLeft: 6,
      letterSpacing: 0
    }
  }, unit)));
}
Object.assign(__ds_scope, { SpecFigure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SpecFigure.jsx", error: String((e && e.message) || e) }); }

// components/brand/SpecTable.jsx
try { (() => {
function SpecTable({
  rows = [],
  dense = false,
  style
}) {
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, rows.map((r, i) => React.createElement('div', {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      padding: (dense ? '8px' : '12px') + ' 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 'var(--type-label-size)',
      letterSpacing: 'var(--type-label-ls)',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, r.label), React.createElement('span', {
    style: {
      fontSize: 15,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      textAlign: 'right'
    }
  }, r.value))));
}
Object.assign(__ds_scope, { SpecTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SpecTable.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const tones = {
  neutral: ['var(--etk-graphite-100)', 'var(--text-strong)'],
  accent: ['var(--etk-orange-600)', '#fff'],
  ttsport: ['var(--etk-blue-800)', '#fff'],
  ok: ['var(--etk-green)', '#fff'],
  warn: ['var(--etk-amber)', '#fff'],
  fault: ['var(--etk-red)', '#fff'],
  outline: ['transparent', 'var(--text-body)']
};
function Badge({
  tone = 'neutral',
  children,
  style
}) {
  const [bg, fg] = tones[tone] || tones.neutral;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 20,
      padding: '0 8px',
      background: bg,
      color: fg,
      border: tone === 'outline' ? '1px solid var(--border-hairline)' : '1px solid transparent',
      borderRadius: 'var(--radius-badge)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizes = {
  sm: {
    h: 'var(--control-h-sm)',
    px: 'var(--control-pad-x-sm)',
    fs: 13
  },
  md: {
    h: 'var(--control-h-md)',
    px: 'var(--control-pad-x-md)',
    fs: 15
  },
  lg: {
    h: 'var(--control-h-lg)',
    px: 'var(--control-pad-x-lg)',
    fs: 16
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  block = false,
  iconLeft,
  iconRight,
  onClick,
  children,
  style,
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  const base = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    height: s.h,
    padding: '0 ' + s.px,
    fontFamily: 'var(--font-core)',
    fontSize: s.fs,
    fontWeight: 'var(--fw-semibold)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    letterSpacing: '0.005em',
    borderRadius: 'var(--radius-control)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--transition-control)',
    textDecoration: 'none',
    boxSizing: 'border-box'
  };
  const v = {};
  if (variant === 'primary') {
    v.background = disabled ? 'var(--etk-graphite-100)' : p ? 'var(--etk-orange-900)' : h ? 'var(--etk-orange-700)' : 'var(--etk-orange-600)';
    v.color = disabled ? 'var(--etk-graphite-300)' : '#fff';
  } else if (variant === 'secondary') {
    v.background = p ? 'var(--etk-graphite-100)' : h ? 'var(--etk-graphite-050)' : 'transparent';
    v.borderColor = disabled ? 'var(--border-hairline)' : h ? 'var(--border-strong)' : 'var(--etk-graphite-300)';
    v.color = disabled ? 'var(--etk-graphite-300)' : 'var(--text-strong)';
  } else if (variant === 'ghost') {
    v.background = h ? 'var(--etk-graphite-050)' : 'transparent';
    v.color = disabled ? 'var(--etk-graphite-300)' : 'var(--text-strong)';
  } else if (variant === 'accentGhost') {
    v.background = h ? 'color-mix(in srgb, var(--etk-orange-600) 8%, transparent)' : 'transparent';
    v.color = 'var(--text-accent)';
    v.borderColor = 'var(--etk-orange-600)';
  } else if (variant === 'ttsport') {
    v.background = p ? 'var(--etk-blue-900)' : h ? 'var(--etk-blue-600)' : 'var(--etk-blue-800)';
    v.color = '#fff';
  }
  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      ...base,
      ...v,
      ...style
    },
    ...rest
  }, iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  elevation = 0,
  interactive = false,
  padding = 'var(--space-5)',
  children,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  const sh = ['none', 'var(--shadow-1)', 'var(--shadow-2)', 'var(--shadow-3)'][elevation] || 'none';
  return React.createElement('div', {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid ' + (interactive && h ? 'var(--border-strong)' : 'var(--border-hairline)'),
      borderRadius: 'var(--radius-card)',
      boxShadow: sh,
      padding,
      cursor: interactive ? 'pointer' : undefined,
      transition: 'border-color var(--dur-fast) var(--ease-standard)',
      boxSizing: 'border-box',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function Divider({
  weight = 'hair',
  vertical = false,
  style
}) {
  const c = weight === 'accent' ? 'var(--etk-orange-600)' : weight === 'strong' ? 'var(--border-strong)' : 'var(--border-hairline)';
  const w = weight === 'accent' ? 3 : weight === 'strong' ? 2 : 1;
  return React.createElement('div', {
    role: 'separator',
    style: vertical ? {
      width: w,
      alignSelf: 'stretch',
      background: c,
      ...style
    } : {
      height: w,
      width: weight === 'accent' ? 44 : '100%',
      background: c,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const CACHE = {};
const CDN = 'https://unpkg.com/lucide-static@0.469.0/icons/';
/** Lucide (CDN) wrapper — flagged substitution, see readme ICONOGRAPHY. */
function Icon({
  name,
  size = 20,
  stroke,
  color = 'currentColor',
  style,
  ...rest
}) {
  const [svg, setSvg] = React.useState(CACHE[name] || null);
  React.useEffect(() => {
    let live = true;
    if (CACHE[name]) {
      setSvg(CACHE[name]);
      return;
    }
    fetch(CDN + name + '.svg').then(r => r.ok ? r.text() : '').then(t => {
      CACHE[name] = t;
      if (live) setSvg(t);
    }).catch(() => {});
    return () => {
      live = false;
    };
  }, [name]);
  const sw = stroke || (size >= 32 ? 2 : 1.5);
  const html = svg ? svg.replace(/width="24"/, 'width="' + size + '"').replace(/height="24"/, 'height="' + size + '"').replace(/stroke-width="[^"]*"/, 'stroke-width="' + sw + '"') : '';
  return React.createElement('span', {
    'aria-hidden': true,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      flex: '0 0 auto',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: html
    },
    ...rest
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const box = {
  sm: 32,
  md: 44,
  lg: 56
};
function IconButton({
  label,
  size = 'md',
  variant = 'ghost',
  children,
  ...rest
}) {
  const d = box[size] || 44;
  return React.createElement(__ds_scope.Button, {
    variant,
    size,
    'aria-label': label,
    title: label,
    style: {
      width: d,
      padding: 0
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
const SRC = {
  black: '/assets/logo/etk-roundel-black-alpha.png',
  white: '/assets/logo/etk-roundel-white-alpha.png',
  orange: '/assets/logo/etk-roundel-orange-alpha.png'
};
function Logo({
  variant = 'black',
  height = 32,
  wordmark = false,
  base = '',
  style
}) {
  const img = React.createElement('img', {
    src: base + SRC[variant],
    alt: 'ETK',
    style: {
      height,
      display: 'block'
    }
  });
  if (!wordmark) return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      ...style
    }
  }, img);
  const c = variant === 'white' ? '#fff' : variant === 'orange' ? 'var(--etk-orange-600)' : 'var(--text-strong)';
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: height * 0.4,
      ...style
    }
  }, img, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-core)',
      fontWeight: 700,
      fontSize: height * 0.42,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: c
    }
  }, 'ETK'));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  selected = false,
  onClick,
  children,
  style
}) {
  const [h, setH] = React.useState(false);
  return React.createElement('button', {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 32,
      padding: '0 16px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + (selected ? 'var(--etk-orange-600)' : h ? 'var(--border-strong)' : 'var(--border-hairline)'),
      background: selected ? 'color-mix(in srgb, var(--etk-orange-600) 8%, transparent)' : 'transparent',
      color: selected ? 'var(--text-accent)' : 'var(--text-body)',
      fontFamily: 'var(--font-core)',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  eyebrow,
  onClose,
  footer,
  children,
  width = 520
}) {
  if (!open) return null;
  return React.createElement('div', {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(11,12,13,0.55)',
      fontFamily: 'var(--font-core)'
    },
    onClick: onClose
  }, React.createElement('div', {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '92vw',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-3)',
      boxShadow: 'var(--shadow-3)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      padding: '24px 24px 0'
    }
  }, eyebrow && React.createElement('div', {
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, eyebrow), React.createElement('div', {
    style: {
      fontSize: 21,
      fontWeight: 700,
      letterSpacing: '-0.008em',
      color: 'var(--text-strong)'
    }
  }, title)), React.createElement('div', {
    style: {
      padding: '12px 24px 24px',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, children), footer && React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      padding: '16px 24px',
      borderTop: '1px solid var(--border-hairline)',
      background: 'var(--surface-sunken)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  tone = 'neutral',
  title,
  detail,
  onDismiss,
  style
}) {
  const bar = {
    neutral: 'var(--etk-graphite-600)',
    ok: 'var(--status-ok)',
    warn: 'var(--status-warn)',
    fault: 'var(--status-fault)',
    accent: 'var(--etk-orange-600)'
  }[tone];
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      minWidth: 320,
      maxWidth: 420,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderLeft: '3px solid ' + bar,
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-2)',
      padding: '14px 16px',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, title), detail && React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 3,
      lineHeight: 1.5
    }
  }, detail)), onDismiss && React.createElement('button', {
    onClick: onDismiss,
    'aria-label': 'Dismiss',
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontSize: 16,
      lineHeight: 1,
      padding: 0
    }
  }, '\u00d7'));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  placement = 'top',
  children,
  style
}) {
  const [on, setOn] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return React.createElement('span', {
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, on && React.createElement('span', {
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      whiteSpace: 'nowrap',
      background: 'var(--etk-graphite-900)',
      color: '#fff',
      fontSize: 12,
      letterSpacing: '0.02em',
      padding: '6px 10px',
      borderRadius: 'var(--radius-control)',
      zIndex: 60,
      fontFamily: 'var(--font-core)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked = false,
  onChange,
  disabled,
  style
}) {
  return React.createElement('label', {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, React.createElement('span', {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 18,
      height: 18,
      flex: '0 0 auto',
      marginTop: 2,
      border: '1px solid ' + (checked ? 'var(--etk-orange-600)' : 'var(--etk-graphite-400)'),
      background: checked ? 'var(--etk-orange-600)' : 'transparent',
      borderRadius: 'var(--radius-control)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-control)'
    }
  }, checked && React.createElement('svg', {
    width: 12,
    height: 12,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 3
  }, React.createElement('path', {
    d: 'M20 6 9 17l-5-5'
  }))), React.createElement('span', null, React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 15,
      color: disabled ? 'var(--etk-graphite-300)' : 'var(--text-strong)'
    }
  }, label), description && React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  hint,
  error,
  suffix,
  size = 'md',
  style,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  const h = size === 'sm' ? 'var(--control-h-sm)' : 'var(--control-h-md)';
  return React.createElement('label', {
    style: {
      display: 'block',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, label && React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--type-label-size)',
      letterSpacing: 'var(--type-label-ls)',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, label), React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: h,
      border: '1px solid ' + (error ? 'var(--status-fault)' : f ? 'var(--etk-orange-600)' : 'var(--border-hairline)'),
      borderRadius: 'var(--radius-control)',
      background: 'var(--surface-card)',
      padding: '0 12px',
      boxShadow: f ? 'var(--focus-ring)' : 'none',
      transition: 'var(--transition-control)'
    }
  }, React.createElement('input', {
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'inherit',
      fontSize: 15,
      color: 'var(--text-strong)'
    },
    ...rest
  }), suffix && React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, suffix)), (hint || error) && React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 12,
      marginTop: 5,
      color: error ? 'var(--status-fault)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  description,
  checked = false,
  onChange,
  name,
  style
}) {
  return React.createElement('label', {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: 'pointer',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, React.createElement('span', {
    onClick: () => onChange && onChange(true),
    style: {
      width: 18,
      height: 18,
      flex: '0 0 auto',
      marginTop: 2,
      borderRadius: '50%',
      border: '1px solid ' + (checked ? 'var(--etk-orange-600)' : 'var(--etk-graphite-400)'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-control)'
    }
  }, checked && React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--etk-orange-600)'
    }
  })), React.createElement('span', null, React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, label), description && React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return React.createElement('label', {
    style: {
      display: 'block',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, label && React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--type-label-size)',
      letterSpacing: 'var(--type-label-ls)',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, label), React.createElement('select', {
    value,
    onChange,
    style: {
      width: '100%',
      height: 'var(--control-h-md)',
      padding: '0 12px',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-control)',
      background: 'var(--surface-card)',
      font: 'inherit',
      fontFamily: 'var(--font-core)',
      fontSize: 15,
      color: 'var(--text-strong)',
      appearance: 'none',
      cursor: 'pointer'
    },
    ...rest
  }, options.map(o => React.createElement('option', {
    key: o.value || o,
    value: o.value || o
  }, o.label || o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked = false,
  onChange,
  label,
  disabled,
  style
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      gap: 12,
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, React.createElement('span', {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 44,
      height: 24,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--etk-orange-600)' : 'var(--etk-graphite-300)',
      position: 'relative',
      transition: 'background-color var(--dur-fast) var(--ease-standard)'
    }
  }, React.createElement('span', {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 23 : 3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: '#fff',
      transition: 'left var(--dur-fast) var(--ease-standard)'
    }
  })), label && React.createElement('span', {
    style: {
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  inverse = false,
  style
}) {
  return React.createElement('div', {
    role: 'tablist',
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      borderBottom: '1px solid ' + (inverse ? 'var(--etk-graphite-700)' : 'var(--border-hairline)'),
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, items.map(it => {
    const k = it.value || it,
      l = it.label || it,
      on = k === value;
    return React.createElement('button', {
      key: k,
      role: 'tab',
      'aria-selected': on,
      onClick: () => onChange && onChange(k),
      style: {
        background: 'none',
        border: 'none',
        padding: '0 0 12px',
        cursor: 'pointer',
        font: 'inherit',
        fontSize: 'var(--type-label-size)',
        letterSpacing: 'var(--type-label-ls)',
        textTransform: 'uppercase',
        fontWeight: 600,
        color: on ? inverse ? '#fff' : 'var(--text-strong)' : inverse ? 'var(--etk-graphite-400)' : 'var(--text-muted)',
        boxShadow: on ? 'inset 0 -2px 0 var(--etk-orange-600)' : 'none',
        transition: 'var(--transition-control)'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/vehicle/ColorSwatch.jsx
try { (() => {
function ColorSwatch({
  name,
  color,
  finish = 'solid',
  selected = false,
  onClick,
  size = 44,
  style
}) {
  const [h, setH] = React.useState(false);
  const sheen = finish === 'metallic' ? 'linear-gradient(135deg, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,.18) 100%)' : 'none';
  return React.createElement('button', {
    onClick,
    title: name + ' · ' + finish,
    'aria-label': name,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      width: size,
      height: size,
      padding: 0,
      cursor: 'pointer',
      borderRadius: 'var(--radius-control)',
      background: color,
      backgroundImage: sheen,
      border: '1px solid ' + (selected ? 'var(--etk-orange-600)' : h ? 'var(--border-strong)' : 'var(--border-hairline)'),
      boxShadow: selected ? 'inset 0 0 0 2px var(--surface-card)' : 'none',
      transition: 'var(--transition-control)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { ColorSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/vehicle/ColorSwatch.jsx", error: String((e && e.message) || e) }); }

// components/vehicle/TrimRow.jsx
try { (() => {
function TrimRow({
  name,
  detail,
  price,
  selected = false,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  return React.createElement('div', {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '14px 16px',
      cursor: 'pointer',
      fontFamily: 'var(--font-core)',
      background: selected ? 'var(--surface-sunken)' : h ? 'var(--etk-graphite-050)' : 'transparent',
      borderLeft: '2px solid ' + (selected ? 'var(--etk-orange-600)' : 'transparent'),
      borderBottom: '1px solid var(--border-hairline)',
      transition: 'var(--transition-control)',
      ...style
    }
  }, React.createElement('span', {
    style: {
      width: 16,
      height: 16,
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: selected ? 'var(--etk-orange-600)' : 'transparent'
    }
  }, React.createElement('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5
  }, React.createElement('path', {
    d: 'M20 6 9 17l-5-5'
  }))), React.createElement('span', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, name), detail && React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, detail)), price && React.createElement('span', {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, price));
}
Object.assign(__ds_scope, { TrimRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/vehicle/TrimRow.jsx", error: String((e && e.message) || e) }); }

// components/vehicle/VehicleCard.jsx
try { (() => {
function VehicleCard({
  image,
  code,
  name,
  spec,
  price,
  badge,
  selected = false,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  return React.createElement('div', {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid ' + (selected ? 'var(--etk-orange-600)' : h ? 'var(--border-strong)' : 'var(--border-hairline)'),
      borderRadius: 'var(--radius-card)',
      cursor: onClick ? 'pointer' : undefined,
      transition: 'border-color var(--dur-fast) var(--ease-standard)',
      overflow: 'hidden',
      boxSizing: 'border-box',
      ...style
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      background: 'var(--surface-sunken)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 8px'
    }
  }, React.createElement('img', {
    src: image,
    alt: name,
    style: {
      width: '100%',
      display: 'block',
      imageRendering: 'auto'
    }
  }), badge && React.createElement('span', {
    style: {
      position: 'absolute',
      top: 10,
      left: 10
    }
  }, React.createElement(__ds_scope.Badge, {
    tone: badge.tone || 'accent'
  }, badge.label))), React.createElement('div', {
    style: {
      padding: '14px 16px 16px',
      fontFamily: 'var(--font-core)'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, code), React.createElement('div', {
    style: {
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: '-0.012em',
      color: 'var(--text-strong)',
      marginTop: 4
    }
  }, name), spec && React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, spec), price && React.createElement('div', {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)',
      marginTop: 10,
      fontVariantNumeric: 'tabular-nums',
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 10
    }
  }, price)));
}
Object.assign(__ds_scope, { VehicleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/vehicle/VehicleCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/cockpit/Dock.jsx
try { (() => {
const TABS = [['drive', 'Drive', 'gauge'], ['navigation', 'Navigation', 'map'], ['media', 'Media', 'disc-3'], ['vehicle', 'Vehicle', 'car-front'], ['settings', 'Settings', 'settings']];
function Dock({
  tab,
  setTab
}) {
  const {
    Icon
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 84,
      flex: '0 0 84px',
      display: 'flex',
      borderTop: '1px solid var(--etk-graphite-800)'
    }
  }, TABS.map(([k, l, ic]) => {
    const on = k === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setTab(k),
      style: {
        flex: 1,
        background: on ? 'var(--etk-graphite-900)' : 'transparent',
        border: 'none',
        borderRight: '1px solid var(--etk-graphite-800)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        cursor: 'pointer',
        font: 'inherit',
        color: on ? 'var(--etk-orange-500)' : 'var(--etk-graphite-400)',
        boxShadow: on ? 'inset 0 2px 0 var(--etk-orange-600)' : 'none',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 24
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        letterSpacing: '0.14em',
        fontWeight: 700,
        textTransform: 'uppercase'
      }
    }, l));
  }));
}
Object.assign(window, {
  Dock
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/cockpit/Dock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/cockpit/DriveScreen.jsx
try { (() => {
const MODES = ['Comfort', 'Sport', 'Sport+', 'ttSport'];
function Gauge({
  label,
  value,
  unit,
  pct,
  accent
}) {
  const {
    SpecFigure,
    Eyebrow,
    Icon,
    Badge
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--etk-graphite-800)',
      background: 'var(--etk-graphite-900)',
      padding: '20px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--etk-graphite-400)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      color: '#fff',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 8,
      lineHeight: 1
    }
  }, value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      marginLeft: 8,
      color: 'var(--etk-graphite-400)'
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: 'var(--etk-graphite-800)',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      width: pct + '%',
      background: accent ? 'var(--etk-orange-600)' : 'var(--etk-silver-500)'
    }
  })));
}
function DriveScreen({
  mode,
  setMode
}) {
  const {
    SpecFigure,
    Eyebrow,
    Icon,
    Badge
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      display: 'grid',
      gap: 24,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, MODES.map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => setMode(m),
    style: {
      padding: '10px 20px',
      cursor: 'pointer',
      font: 'inherit',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      fontWeight: 700,
      background: mode === m ? 'var(--etk-orange-600)' : 'transparent',
      color: mode === m ? '#fff' : 'var(--etk-graphite-300)',
      border: '1px solid ' + (mode === m ? 'var(--etk-orange-600)' : 'var(--etk-graphite-700)'),
      borderRadius: 'var(--radius-control)',
      transition: 'var(--transition-control)'
    }
  }, m))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Gauge, {
    label: "Speed",
    value: "128",
    unit: "km/h",
    pct: 51,
    accent: true
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "Engine",
    value: "3 100",
    unit: "rpm",
    pct: 44
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "Oil",
    value: "96",
    unit: "\xB0C",
    pct: 62
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "Boost",
    value: "0,8",
    unit: "bar",
    pct: 38,
    accent: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--etk-graphite-800)',
      padding: '20px 22px',
      background: 'var(--etk-graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Torque distribution \xB7 xMatic"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34,
      fontWeight: 300,
      color: '#fff',
      fontVariantNumeric: 'tabular-nums'
    }
  }, "28"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 6,
      background: 'var(--etk-graphite-800)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '28%',
      background: 'var(--etk-silver-500)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '72%',
      background: 'var(--etk-orange-600)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34,
      fontWeight: 300,
      color: '#fff',
      fontVariantNumeric: 'tabular-nums'
    }
  }, "72")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--etk-graphite-500)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "Front"), /*#__PURE__*/React.createElement("span", null, "Rear"))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--etk-graphite-800)',
      padding: '20px 22px',
      background: 'var(--etk-graphite-900)',
      display: 'grid',
      gap: 14,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Assistance"), [['Stability control', 'ok'], ['Lane keeping', 'ok'], ['Adaptive cruise', 'off']].map(([l, s]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 14,
      color: 'var(--etk-graphite-200)'
    }
  }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement(Badge, {
    tone: s === 'ok' ? 'ok' : 'neutral'
  }, s === 'ok' ? 'Active' : 'Off'))))));
}
Object.assign(window, {
  DriveScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/cockpit/DriveScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/cockpit/MediaScreen.jsx
try { (() => {
function MediaScreen() {
  const {
    Icon,
    Eyebrow,
    IconButton
  } = window.ETKDS || {};
  const list = [['Bayern 3', 'FM 97.3'], ['Deutschlandfunk', 'FM 93.1'], ['Klassik Radio', 'FM 100.6'], ['Bluetooth · Pixel 9', 'A2DP']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 32,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--etk-graphite-800)',
      background: 'var(--etk-graphite-900)',
      padding: '28px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Now playing \xB7 FM 97.3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '-0.018em',
      marginTop: 12
    }
  }, "Bayern 3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: 'var(--etk-graphite-400)',
      marginTop: 6
    }
  }, "Nachrichten \xB7 14:30"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: 'var(--etk-graphite-800)',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      width: '34%',
      background: 'var(--etk-orange-600)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 24,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Previous",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "skip-back",
    size: 24,
    color: "#fff"
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Pause",
    variant: "primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pause",
    size: 24
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Next",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "skip-forward",
    size: 24,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--etk-graphite-400)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "volume-2",
    size: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      height: 3,
      background: 'var(--etk-graphite-800)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      width: '62%',
      background: 'var(--etk-silver-500)'
    }
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Sources"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, list.map(([n, d], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '14px 16px',
      borderBottom: '1px solid var(--etk-graphite-800)',
      background: i === 0 ? 'var(--etk-graphite-900)' : 'transparent',
      borderLeft: '2px solid ' + (i === 0 ? 'var(--etk-orange-600)' : 'transparent')
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: '#fff'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--etk-graphite-500)'
    }
  }, d))))));
}
Object.assign(window, {
  MediaScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/cockpit/MediaScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/cockpit/NavScreen.jsx
try { (() => {
function NavScreen() {
  const {
    Icon,
    Eyebrow,
    Button
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 340px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--etk-graphite-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(var(--etk-graphite-800) 1px,transparent 1px),linear-gradient(90deg,var(--etk-graphite-800) 1px,transparent 1px)',
      backgroundSize: '64px 64px',
      opacity: .55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '-10%',
      top: '20%',
      width: '130%',
      height: 14,
      background: 'var(--etk-graphite-700)',
      transform: 'rotate(-8deg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '18%',
      top: '-10%',
      width: 12,
      height: '130%',
      background: 'var(--etk-graphite-700)',
      transform: 'rotate(6deg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '22%',
      top: '62%',
      width: '62%',
      height: 6,
      background: 'var(--etk-orange-600)',
      transform: 'rotate(-14deg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '22%',
      top: '62%',
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      border: '3px solid var(--etk-orange-600)',
      transform: 'translate(-50%,-50%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      top: 24,
      padding: '14px 18px',
      background: 'rgba(11,12,13,0.72)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--etk-graphite-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "corner-up-right",
    size: 32,
    color: "var(--etk-orange-500)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 300,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, "400 m"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--etk-graphite-300)',
      marginTop: 4
    }
  }, "Leopoldstra\xDFe"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid var(--etk-graphite-800)',
      padding: '24px',
      display: 'grid',
      gap: 18,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Destination"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 600,
      color: '#fff',
      marginTop: 8
    }
  }, "ETK M\xFCnchen-S\xFCd"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--etk-graphite-400)',
      marginTop: 2
    }
  }, "Hofmannstra\xDFe 51, 81379 M\xFCnchen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      paddingTop: 16,
      borderTop: '1px solid var(--etk-graphite-800)'
    }
  }, [['Arrival', '14:58'], ['Distance', '21,4 km'], ['Duration', '26 min']].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--etk-graphite-500)'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 300,
      color: '#fff',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 4
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      marginTop: 4
    }
  }, [['Charging · Shell Recharge', '2,1 km'], ['ETK Service Sendling', '6,8 km'], ['Parkhaus Theresienhöhe', '18,2 km']].map(([n, d]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid var(--etk-graphite-800)',
      fontSize: 14,
      color: 'var(--etk-graphite-200)'
    }
  }, /*#__PURE__*/React.createElement("span", null, n), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--etk-graphite-500)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, d)))), /*#__PURE__*/React.createElement(Button, {
    block: true,
    variant: "secondary",
    style: {
      borderColor: 'var(--etk-graphite-600)',
      color: '#fff'
    }
  }, "End route guidance")));
}
Object.assign(window, {
  NavScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/cockpit/NavScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/cockpit/StatusBar.jsx
try { (() => {
function StatusBar({
  mode
}) {
  const {
    Icon,
    Logo
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 64,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '0 24px',
      borderBottom: '1px solid var(--etk-graphite-800)',
      flex: '0 0 64px'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    height: 22,
    base: "../.."
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--etk-orange-500)'
    }
  }, mode), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      color: 'var(--etk-graphite-300)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "thermometer",
    size: 16
  }), " 11 \xB0C"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fuel",
    size: 16
  }), " 486 km"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bluetooth",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      color: '#fff'
    }
  }, "14:32")));
}
Object.assign(window, {
  StatusBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/cockpit/StatusBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/cockpit/VehicleScreen.jsx
try { (() => {
function VehicleScreen({
  settings,
  setSettings
}) {
  const {
    Eyebrow,
    Switch,
    Badge,
    SpecTable,
    Toast
  } = window.ETKDS || {};
  const rows = [['laneKeep', 'Lane keeping assistant'], ['startStop', 'Automatic start-stop'], ['adaptive', 'Adaptive dampers'], ['exhaust', 'ttSport exhaust flap'], ['hud', 'Head-up display']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 32,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true,
    tone: "inverse"
  }, "Vehicle settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'grid',
      gap: 0
    }
  }, rows.map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
      borderBottom: '1px solid var(--etk-graphite-800)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: '#fff'
    }
  }, l), /*#__PURE__*/React.createElement(Switch, {
    checked: !!settings[k],
    onChange: v => setSettings({
      ...settings,
      [k]: v
    })
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Status"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "warn",
    title: "Tyre pressure low \u2014 front left",
    detail: "1,9 bar \xB7 recommended 2,4 bar"
  }), /*#__PURE__*/React.createElement(Toast, {
    tone: "neutral",
    title: "Inspection due in 1 200 km",
    detail: "Book at your ETK partner"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Vehicle"), /*#__PURE__*/React.createElement(SpecTable, {
    dense: true,
    style: {
      marginTop: 8
    },
    rows: [{
      label: 'Model',
      value: '854x 250 Touring'
    }, {
      label: 'VIN',
      value: 'WETK8540X6H219447'
    }, {
      label: 'Software',
      value: 'ETK OS 7.2.1'
    }, {
      label: 'Odometer',
      value: '34 812 km'
    }, {
      label: 'Next service',
      value: '36 000 km'
    }]
  }))));
}
Object.assign(window, {
  VehicleScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/cockpit/VehicleScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/configurator/Stage.jsx
try { (() => {
function Stage({
  cfg,
  paint
}) {
  const {
    Badge,
    IconButton,
    Icon,
    Tooltip
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface-sunken)',
      height: '100%',
      minHeight: 420,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      left: 24,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, "EUDM"), /*#__PURE__*/React.createElement(Badge, null, cfg.engine.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      right: 20,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "Exterior"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Exterior",
    size: "sm",
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "car-front",
    size: 18
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Interior"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Interior",
    size: "sm",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "armchair",
    size: 18
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Rotate"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Rotate",
    size: "sm",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-3d",
    size: 18
  })))), /*#__PURE__*/React.createElement("img", {
    src: cfg.image,
    alt: cfg.engine.name,
    style: {
      width: '76%',
      maxWidth: 560,
      filter: 'drop-shadow(0 18px 24px rgba(11,12,13,0.14))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 20,
      left: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      background: paint.hex,
      border: '1px solid var(--border-hairline)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, paint.name, " \xB7 ", paint.finish)));
}
Object.assign(window, {
  Stage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/Stage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/configurator/StepNav.jsx
try { (() => {
const STEPS = [['model', 'Model'], ['engine', 'Engine'], ['paint', 'Paint'], ['wheels', 'Wheels'], ['equipment', 'Equipment'], ['summary', 'Summary']];
function StepNav({
  step,
  setStep
}) {
  const {
    Eyebrow
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      borderBottom: '1px solid var(--border-hairline)',
      background: 'var(--surface-page)'
    }
  }, STEPS.map(([k, l], i) => {
    const on = k === step;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setStep(k),
      style: {
        flex: 1,
        background: 'none',
        border: 'none',
        borderRight: i < STEPS.length - 1 ? '1px solid var(--border-hairline)' : 'none',
        padding: '16px 20px',
        textAlign: 'left',
        cursor: 'pointer',
        font: 'inherit',
        fontFamily: 'var(--font-core)',
        boxShadow: on ? 'inset 0 -2px 0 var(--etk-orange-600)' : 'none',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 11,
        letterSpacing: '0.18em',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: on ? 'var(--etk-orange-600)' : 'var(--etk-graphite-400)'
      }
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 15,
        fontWeight: 600,
        marginTop: 4,
        color: on ? 'var(--text-strong)' : 'var(--text-muted)'
      }
    }, l));
  }));
}
Object.assign(window, {
  StepNav,
  CFG_STEPS: STEPS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/StepNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/configurator/Steps.jsx
try { (() => {
function StepHeader({
  eyebrow,
  title,
  note
}) {
  const {
    Eyebrow,
    TrimRow,
    ColorSwatch,
    Checkbox,
    Radio,
    Card,
    SpecFigure,
    Badge,
    VehicleCard
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '12px 0 0',
      fontSize: 28,
      letterSpacing: '-0.012em',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, title), note && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 15,
      color: 'var(--text-muted)',
      maxWidth: '60ch'
    }
  }, note));
}
function Steps({
  step,
  cfg,
  set
}) {
  const {
    Eyebrow,
    TrimRow,
    ColorSwatch,
    Checkbox,
    Radio,
    Card,
    SpecFigure,
    Badge,
    VehicleCard
  } = window.ETKDS || {};
  const C = window.ETK_CFG;
  if (step === 'model') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Step 01",
    title: "Choose a body",
    note: "Every 800-Series shares one chassis, one rear axle and one weight distribution."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, [['Saloon', 'Etk_844_150.webp', 'Four doors, 480 l'], ['Touring', 'ETK_854x_250.webp', 'Five doors, 560–1 500 l'], ['XC', 'ETK_856xc_300.webp', 'Raised, cladded, xMatic only']].map(([n, img, d], i) => /*#__PURE__*/React.createElement(VehicleCard, {
    key: n,
    image: '../../assets/images/800-series/' + img,
    code: '800-Series',
    name: n,
    spec: d,
    selected: i === 1,
    onClick: () => {}
  }))));
  if (step === 'engine') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Step 02",
    title: "Engine and drivetrain",
    note: "Diesel figures are quoted for the EUDM cycle."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-hairline)',
      borderBottom: 'none'
    }
  }, C.engines.map(e => /*#__PURE__*/React.createElement(TrimRow, {
    key: e.id,
    name: e.name,
    detail: e.detail,
    price: e.delta ? '+ ' + C.eur(e.delta) : 'included',
    selected: cfg.engine.id === e.id,
    onClick: () => set('engine', e)
  }))));
  if (step === 'paint') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Step 03",
    title: "Paint"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, C.paints.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      width: 130
    }
  }, /*#__PURE__*/React.createElement(ColorSwatch, {
    size: 130,
    name: p.name,
    color: p.hex,
    finish: p.finish,
    selected: cfg.paint.id === p.id,
    onClick: () => set('paint', p),
    style: {
      height: 86,
      width: 130
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginTop: 8
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, p.finish, " \xB7 ", p.delta ? '+ ' + C.eur(p.delta) : 'included')))));
  if (step === 'wheels') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Step 04",
    title: "Wheels",
    note: "Unsprung mass matters more than diameter. The 19-inch set is ttSport specification."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, C.wheels.map(w => /*#__PURE__*/React.createElement(Card, {
    key: w.id,
    interactive: true,
    padding: "16px",
    onClick: () => set('wheels', w),
    style: {
      borderColor: cfg.wheels.id === w.id ? 'var(--etk-orange-600)' : undefined,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    label: w.name,
    description: w.detail,
    checked: cfg.wheels.id === w.id,
    onChange: () => set('wheels', w)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--text-strong)'
    }
  }, w.delta ? '+ ' + C.eur(w.delta) : 'included')))));
  if (step === 'equipment') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Step 05",
    title: "Equipment"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 0,
      border: '1px solid var(--border-hairline)'
    }
  }, C.packs.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderBottom: i < C.packs.length - 1 ? '1px solid var(--border-hairline)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: p.name,
    description: p.detail,
    checked: cfg.packs.includes(p.id),
    onChange: () => set('packs', cfg.packs.includes(p.id) ? cfg.packs.filter(x => x !== p.id) : [...cfg.packs, p.id])
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--text-strong)'
    }
  }, "+ ", C.eur(p.delta))))));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Step 06",
    title: "Summary",
    note: "Figures are provisional until confirmed by your ETK partner."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24,
      paddingBottom: 24,
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Power",
    value: cfg.engine.detail.match(/(\d+) kW/) ? cfg.engine.detail.match(/(\d+) kW/)[1] : '—',
    unit: "kW"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Drive",
    value: cfg.engine.detail.includes('xMatic') ? 'xMatic' : 'RWD',
    size: "sm"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Paint",
    value: cfg.paint.name,
    size: "sm"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Wheels",
    value: cfg.wheels.name.split(' ')[0],
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, cfg.packs.length === 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "No optional equipment selected."), cfg.packs.map(id => /*#__PURE__*/React.createElement(Badge, {
    key: id,
    tone: "neutral"
  }, C.packs.find(p => p.id === id).name))));
}
Object.assign(window, {
  Steps
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/Steps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/configurator/Summary.jsx
try { (() => {
function Summary({
  cfg,
  total,
  onSend
}) {
  const {
    Eyebrow,
    Button,
    SpecTable,
    Divider
  } = window.ETKDS || {};
  const C = window.ETK_CFG;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 340,
      flex: '0 0 340px',
      borderLeft: '1px solid var(--border-hairline)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true
  }, "Your configuration"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: '-0.018em',
      color: 'var(--text-strong)',
      marginTop: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, cfg.engine.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "800-Series Touring")), /*#__PURE__*/React.createElement(SpecTable, {
    dense: true,
    rows: [{
      label: 'Engine',
      value: cfg.engine.detail.split(' · ')[0]
    }, {
      label: 'Drive',
      value: cfg.engine.detail.includes('xMatic') ? 'xMatic' : 'Rear-wheel drive'
    }, {
      label: 'Paint',
      value: cfg.paint.name
    }, {
      label: 'Wheels',
      value: cfg.wheels.name.split(' ')[0]
    }, {
      label: 'Options',
      value: cfg.packs.length + ' selected'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingTop: 16,
      borderTop: '2px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, C.eur(total))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "Recommended retail price, EUDM, including VAT."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    block: true,
    size: "lg",
    onClick: onSend
  }, "Send to partner"), /*#__PURE__*/React.createElement(Button, {
    block: true,
    variant: "secondary"
  }, "Save configuration"))));
}
Object.assign(window, {
  Summary
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/Summary.jsx", error: String((e && e.message) || e) }); }

// ui_kits/configurator/data.js
try { (() => {
window.ETK_CFG = {
  base: {
    code: '854 190',
    name: '800-Series Touring',
    price: 41700
  },
  engines: [{
    id: '844',
    name: '844 150',
    detail: '2,0 l I4 · 110 kW · RWD',
    delta: 0
  }, {
    id: '854',
    name: '854 190',
    detail: '2,0 l I4 · 140 kW · RWD',
    delta: 2800
  }, {
    id: '854x',
    name: '854x 250',
    detail: '2,0 l I4 turbo · 184 kW · xMatic',
    delta: 10700
  }, {
    id: '856x',
    name: '856x 340',
    detail: '3,0 l I6 turbo · 250 kW · xMatic',
    delta: 24700
  }, {
    id: '856d',
    name: '856x 310d',
    detail: '3,0 l I6 Diesel · 228 kW · xMatic',
    delta: 21400
  }, {
    id: '856tt',
    name: '856 ttSport',
    detail: '4,4 l V8 biturbo · 250 kW · ttSport DCT',
    delta: 50600
  }],
  paints: [{
    id: 'aw',
    name: 'Alpine white',
    hex: '#eceae5',
    finish: 'solid',
    delta: 0
  }, {
    id: 'as',
    name: 'Alpine silver',
    hex: '#c9c9c2',
    finish: 'metallic',
    delta: 1150
  }, {
    id: 'gr',
    name: 'Graphite',
    hex: '#2a2e33',
    finish: 'metallic',
    delta: 1150
  }, {
    id: 'eb',
    name: 'Estoril blue',
    hex: '#0d2a8c',
    finish: 'metallic',
    delta: 1450
  }, {
    id: 'so',
    name: 'Sunset orange',
    hex: '#f86e00',
    finish: 'metallic',
    delta: 1980
  }, {
    id: 'bs',
    name: 'Black sapphire',
    hex: '#0b0c0d',
    finish: 'metallic',
    delta: 1150
  }],
  wheels: [{
    id: 'w17',
    name: '17" Star-spoke 226',
    detail: 'Silver · 225/50 R17',
    delta: 0
  }, {
    id: 'w18',
    name: '18" V-spoke 398',
    detail: 'Ferric grey · 245/45 R18',
    delta: 1290
  }, {
    id: 'w19',
    name: '19" ttSport double-spoke 405',
    detail: 'Bi-colour · 255/35 R19',
    delta: 2740
  }],
  packs: [{
    id: 'adap',
    name: 'Adaptive suspension',
    detail: 'Includes drive mode selector',
    delta: 1890
  }, {
    id: 'cc',
    name: 'Carbon-ceramic brakes',
    detail: 'Reduces unsprung mass by 21 kg',
    delta: 8900
  }, {
    id: 'nav',
    name: 'Navigation Professional',
    detail: '8,8" display, live traffic',
    delta: 2350
  }, {
    id: 'dse',
    name: 'Driving & Safety Electronics Plus',
    detail: 'Lane keeping, adaptive cruise',
    delta: 1640
  }, {
    id: 'tow',
    name: 'Towing package',
    detail: 'Retractable hitch, 1 800 kg braked',
    delta: 1120
  }],
  eur: n => n.toLocaleString('de-DE').replace(/\./g, ' ') + ' EUR'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/data.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Footer.jsx
try { (() => {
const COLS = [['Models', ['800-Series Saloon', '800-Series Touring', '800-Series XC', 'K-Series Coupé', 'ttSport range']], ['Ownership', ['Find a partner', 'Service and maintenance', 'Parts and accessories', 'Warranty', 'Recalls']], ['Company', ['Heritage', 'Bruckhausen plant', 'Careers', 'Press', 'Investor relations']]];
function Footer() {
  const {
    Logo,
    Eyebrow,
    Icon
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("footer", {
    className: "etk-dark",
    style: {
      background: 'var(--etk-black)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '64px 48px 32px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    height: 32,
    wordmark: true,
    base: "../.."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      maxWidth: '34ch',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--etk-graphite-400)'
    }
  }, "ETK Fahrzeugwerke AG \xB7 Bruckhausen. Rear-wheel drive since 1953."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 18,
      color: 'var(--etk-graphite-400)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "youtube",
    size: 20
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 20
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin",
    size: 20
  }))), COLS.map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '14px 0 0',
      display: 'grid',
      gap: 10
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 14,
      color: 'var(--etk-graphite-200)',
      border: 'none'
    }
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '20px 48px 40px',
      borderTop: '1px solid var(--etk-graphite-800)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      color: 'var(--etk-graphite-500)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 ETK Fahrzeugwerke AG"), /*#__PURE__*/React.createElement("span", null, "Fuel consumption and emissions figures are measured under WLTP. Imagery shows EUDM specification.")));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Header.jsx
try { (() => {
function Header({
  route,
  go,
  scrolled
}) {
  const {
    Logo,
    Button,
    Icon,
    IconButton
  } = window.ETKDS || {};
  const items = [['range', 'Models'], ['model', '800-Series'], ['ttsport', 'ttSport'], ['heritage', 'Heritage']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 72,
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      padding: '0 48px',
      background: scrolled ? 'rgba(255,255,255,0.86)' : 'var(--surface-page)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: '1px solid var(--border-hairline)',
      transition: 'background-color var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      border: 'none',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 30,
    wordmark: true,
    base: "../.."
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flex: 1
    }
  }, items.map(([k, l]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(k);
    },
    style: {
      border: 'none',
      fontSize: 'var(--type-label-size)',
      letterSpacing: 'var(--type-label-ls)',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: route === k ? 'var(--text-strong)' : 'var(--text-muted)',
      paddingBottom: 2,
      boxShadow: route === k ? 'inset 0 -2px 0 var(--etk-orange-600)' : 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Search",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Find a partner",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 18
  })), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => go('configurator')
  }, "Build yours")));
}
Object.assign(window, {
  Header
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/HeritageScreen.jsx
try { (() => {
const MILESTONES = [['1953', 'The first hall', 'Production begins in Bruckhausen with a single body line and 214 employees.'], ['1976', 'ttSport is founded', 'A works motorsport department becomes a road-car division. The first blue tt appears on a boot lid.'], ['2013', '800-Series', 'The mid-size executive car arrives with xenon headlamps and the first ETK navigation display.'], ['2015', 'K-Series', 'A shortened 800 platform, two seats, 50:50, and no attempt to be practical.'], ['2016', 'Driving & Safety Electronics', 'A single electronics package replaces separate stability and traction systems across the range.'], ['2021', 'End of the K-Series', 'Twenty-one thousand coupés, all of them rear-driven.']];
function HeritageScreen() {
  const {
    Eyebrow,
    SpecFigure,
    Divider
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 360,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/hero-k-and-800.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'saturate(0.7)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 48px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true,
    tone: "inverse"
  }, "Bruckhausen \xB7 since 1953"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '14px 0 0',
      fontSize: 52,
      lineHeight: 1.02,
      letterSpacing: '-0.022em',
      fontWeight: 800,
      color: '#fff'
    }
  }, "We have built cars in this hall since 1953."))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '80px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 32,
      paddingBottom: 56,
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Founded",
    value: "1953"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Plants",
    value: "3"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Employees",
    value: "41 200"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Series built",
    value: "9"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: 'grid',
      gap: 0
    }
  }, MILESTONES.map(([y, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: y,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 300px 1fr',
      gap: 32,
      padding: '24px 0',
      borderBottom: '1px solid var(--border-hairline)',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      color: 'var(--etk-orange-600)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, y), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: '62ch'
    }
  }, d))))));
}
Object.assign(window, {
  HeritageScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/HeritageScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/HomeScreen.jsx
try { (() => {
function Hero({
  go
}) {
  const {
    Eyebrow,
    Button,
    SpecFigure,
    VehicleCard,
    Divider,
    Icon
  } = window.ETKDS || {};
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 520,
      overflow: 'hidden',
      background: 'var(--etk-black)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/hero-k-and-800.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-left)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 48px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true,
    tone: "inverse"
  }, "K-Series \xB7 800-Series"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '14px 0 0',
      fontSize: 72,
      lineHeight: 0.98,
      letterSpacing: '-0.025em',
      fontWeight: 800,
      color: '#fff',
      maxWidth: 12 + 'ch'
    }
  }, "Two ways to arrive."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0',
      maxWidth: '44ch',
      fontSize: 19,
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.82)'
    }
  }, "One chassis, two temperaments. The 800-Series carries the family; the K-Series carries nothing but the driver."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('configurator')
  }, "Build yours"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    style: {
      borderColor: 'rgba(255,255,255,.45)',
      color: '#fff'
    },
    onClick: () => go('range')
  }, "See the range"))));
}
function HomeScreen({
  go
}) {
  const {
    Eyebrow,
    Button,
    SpecFigure,
    VehicleCard,
    Divider,
    Icon
  } = window.ETKDS || {};
  const D = window.ETK_DATA;
  const picks = D.models.filter(m => ['854x', 'kc8', '856xc'].includes(m.id));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '96px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true
  }, "Engineering"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontSize: 36,
      lineHeight: 1.08,
      letterSpacing: '-0.018em',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Balance is not a setting."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      maxWidth: '62ch',
      fontSize: 16,
      lineHeight: 1.6
    }
  }, "Every ETK places its engine longitudinally behind the front axle and drives the rear wheels. The result is a 50:50 distribution that no electronic system has to correct for. xMatic adds traction without moving the mass forward.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24,
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 28
    }
  }, /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Distribution",
    value: "50:50"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Kerb weight",
    value: "1 500",
    unit: "kg"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Engines",
    value: "6"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Bodies",
    value: "4"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '80px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true
  }, "Selected models"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '12px 0 0',
      fontSize: 28,
      letterSpacing: '-0.012em',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Three places to start")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('range');
    },
    style: {
      fontSize: 'var(--type-label-size)',
      letterSpacing: 'var(--type-label-ls)',
      textTransform: 'uppercase',
      fontWeight: 600
    }
  }, "All models \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, picks.map(m => /*#__PURE__*/React.createElement(VehicleCard, {
    key: m.id,
    image: D.imgBase(m),
    code: m.code,
    name: m.name,
    spec: m.spec,
    price: m.price,
    badge: m.badge ? {
      label: m.badge,
      tone: m.tt ? 'ttsport' : 'accent'
    } : undefined,
    onClick: () => go('model')
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--etk-blue-800)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '80px 48px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Performance division"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontSize: 52,
      lineHeight: 1.02,
      letterSpacing: '-0.022em',
      fontWeight: 800,
      color: '#fff'
    }
  }, "ttSport"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      maxWidth: '50ch',
      fontSize: 16,
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.78)'
    }
  }, "Four and a half litres, two turbochargers, a seven-speed dual clutch and a rear axle that can be asked to work alone. Built in the same hall as every other ETK, then taken apart and measured again."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(SpecFigure, {
    inverse: true,
    label: "Power",
    value: "331",
    unit: "kW"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    inverse: true,
    label: "0\u2013100 km/h",
    value: "3,9",
    unit: "s"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    inverse: true,
    label: "Drive modes",
    value: "4"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('ttsport')
  }, "Explore ttSport"))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/ttsport-lettering.jpg",
    alt: "ttSport",
    style: {
      width: '100%',
      display: 'block'
    }
  }))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/ModelScreen.jsx
try { (() => {
function ModelScreen({
  go
}) {
  const {
    Eyebrow,
    Button,
    Tabs,
    SpecFigure,
    SpecTable,
    Badge,
    Divider,
    ColorSwatch
  } = window.ETKDS || {};
  const [tab, setTab] = React.useState('overview');
  const [paint, setPaint] = React.useState(1);
  const paints = [['Alpine white', '#eceae5', 'solid'], ['Alpine silver', '#c9c9c2', 'metallic'], ['Estoril blue', '#0d2a8c', 'metallic'], ['Sunset orange', '#f86e00', 'metallic'], ['Black sapphire', '#0b0c0d', 'metallic']];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-sunken)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '48px 48px 0',
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true
  }, "800-Series Touring"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '14px 0 0',
      fontSize: 52,
      lineHeight: 1.02,
      letterSpacing: '-0.022em',
      fontWeight: 800,
      color: 'var(--text-strong)'
    }
  }, "854x 250"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      maxWidth: '46ch',
      fontSize: 19,
      lineHeight: 1.55
    }
  }, "Space, without the compromise. 1 500 litres with the bench folded, and the saloon's five-link rear axle left exactly as it was."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "New"), /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, "EUDM"), /*#__PURE__*/React.createElement(Badge, null, "xMatic")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('configurator')
  }, "Configure"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary"
  }, "Book a test drive"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/800-series/ETK_854x_250.webp",
    alt: "854x 250",
    style: {
      width: '86%',
      maxWidth: 520
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 48px'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    style: {
      marginTop: 0,
      paddingTop: 24
    },
    value: tab,
    onChange: setTab,
    items: [{
      value: 'overview',
      label: 'Overview'
    }, {
      value: 'specs',
      label: 'Technical data'
    }, {
      value: 'paint',
      label: 'Paint'
    }, {
      value: 'equipment',
      label: 'Equipment'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 0 96px'
    }
  }, tab === 'overview' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Power",
    value: "184",
    unit: "kW"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "0\u2013100 km/h",
    value: "6,4",
    unit: "s"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Kerb weight",
    value: "1 620",
    unit: "kg"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    label: "Load volume",
    value: "1 500",
    unit: "l"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      gridColumn: '1 / 3',
      margin: 0,
      fontSize: 16,
      lineHeight: 1.6
    }
  }, "The 2,0-litre turbocharged four drives all four wheels through the eight-speed automatic. Torque is sent rearward by default; the front axle is engaged only when the rear can no longer take it."), /*#__PURE__*/React.createElement("p", {
    style: {
      gridColumn: '3 / 5',
      margin: 0,
      fontSize: 16,
      lineHeight: 1.6
    }
  }, "Standard equipment includes xenon headlamps, daytime running lights, the navigation display and the Driving & Safety Electronics package introduced across the range in 2016.")), tab === 'specs' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0 64px'
    }
  }, /*#__PURE__*/React.createElement(SpecTable, {
    rows: [{
      label: 'Engine',
      value: '2,0 l I4 turbo'
    }, {
      label: 'Power',
      value: '184 kW (250 hp)'
    }, {
      label: 'Torque',
      value: '400 Nm'
    }, {
      label: 'Transmission',
      value: '8-speed automatic'
    }, {
      label: 'Drive',
      value: 'xMatic all-wheel drive'
    }]
  }), /*#__PURE__*/React.createElement(SpecTable, {
    rows: [{
      label: 'Kerb weight',
      value: '1 620 kg'
    }, {
      label: 'Distribution',
      value: '50 : 50'
    }, {
      label: 'Top speed',
      value: '250 km/h (limited)'
    }, {
      label: 'Load volume',
      value: '560 – 1 500 l'
    }, {
      label: 'Market',
      value: 'EUDM'
    }]
  })), tab === 'paint' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, paints.map(([n, c, fi], i) => /*#__PURE__*/React.createElement(ColorSwatch, {
    key: n,
    size: 56,
    name: n,
    color: c,
    finish: fi,
    selected: paint === i,
    onClick: () => setPaint(i)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, paints[paint][0], " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "\xB7 ", paints[paint][2]))), tab === 'equipment' && /*#__PURE__*/React.createElement(SpecTable, {
    rows: [{
      label: 'Headlamps',
      value: 'Xenon with daytime running lights'
    }, {
      label: 'Infotainment',
      value: 'ETK navigation display'
    }, {
      label: 'Assistance',
      value: 'Driving & Safety Electronics'
    }, {
      label: 'Suspension',
      value: 'Adaptive dampers (optional)'
    }, {
      label: 'Brakes',
      value: 'Carbon-ceramic (optional)'
    }]
  }))));
}
Object.assign(window, {
  ModelScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/ModelScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/RangeScreen.jsx
try { (() => {
function RangeScreen({
  go
}) {
  const {
    Eyebrow,
    Tag,
    VehicleCard,
    Select
  } = window.ETKDS || {};
  const D = window.ETK_DATA;
  const [body, setBody] = React.useState('all');
  const filters = [['all', 'All'], ['saloon', 'Saloon'], ['touring', 'Touring'], ['coupe', 'Coupé'], ['xc', 'XC']];
  const list = D.models.filter(m => body === 'all' || m.body === body);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '56px 48px 96px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true
  }, "Model range \xB7 2013\u20132021"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '14px 0 0',
      fontSize: 52,
      lineHeight: 1.02,
      letterSpacing: '-0.022em',
      fontWeight: 800,
      color: 'var(--text-strong)'
    }
  }, "Every ETK, in one place."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24,
      margin: '32px 0 24px',
      paddingBottom: 20,
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, filters.map(([k, l]) => /*#__PURE__*/React.createElement(Tag, {
    key: k,
    selected: body === k,
    onClick: () => setBody(k)
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, list.length, " models"), /*#__PURE__*/React.createElement(Select, {
    options: ['Sort: price ascending', 'Sort: power descending', 'Sort: model code'],
    style: {
      width: 220
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24
    }
  }, list.map(m => /*#__PURE__*/React.createElement(VehicleCard, {
    key: m.id,
    image: D.imgBase(m),
    code: m.code,
    name: m.name,
    spec: m.spec,
    price: m.price,
    badge: m.badge ? {
      label: m.badge,
      tone: m.tt ? 'ttsport' : 'accent'
    } : undefined,
    onClick: () => go('model')
  }))));
}
Object.assign(window, {
  RangeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/RangeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/TtSportScreen.jsx
try { (() => {
function TtSportScreen({
  go
}) {
  const {
    Eyebrow,
    Button,
    SpecFigure,
    VehicleCard,
    Badge
  } = window.ETKDS || {};
  const D = window.ETK_DATA;
  const tt = D.models.filter(m => m.tt);
  return /*#__PURE__*/React.createElement("div", {
    className: "etk-dark",
    style: {
      background: 'var(--etk-black)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--etk-blue-800)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '80px 48px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Performance division \xB7 since 1976"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '16px 0 0',
      fontSize: 72,
      lineHeight: 0.98,
      letterSpacing: '-0.025em',
      fontWeight: 800,
      color: '#fff'
    }
  }, "ttSport"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0',
      maxWidth: '52ch',
      fontSize: 19,
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.8)'
    }
  }, "Every ttSport begins as a production car and leaves as a measured one. Sport+, ttSport and ttSport+ are not styling packages; they are three different sets of numbers."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(SpecFigure, {
    inverse: true,
    size: "lg",
    label: "Power",
    value: "331",
    unit: "kW"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    inverse: true,
    size: "lg",
    label: "0\u2013100 km/h",
    value: "3,9",
    unit: "s"
  }), /*#__PURE__*/React.createElement(SpecFigure, {
    inverse: true,
    size: "lg",
    label: "Weight",
    value: "1 650",
    unit: "kg"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '72px 48px 96px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: true,
    tone: "inverse"
  }, "The ttSport range"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24,
      marginTop: 24
    }
  }, tt.map(m => /*#__PURE__*/React.createElement(VehicleCard, {
    key: m.id,
    image: D.imgBase(m),
    code: m.code,
    name: m.name,
    spec: m.spec,
    price: m.price,
    badge: {
      label: 'ttSport',
      tone: 'ttsport'
    },
    onClick: () => go('model')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-hairline)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "Heritage"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginTop: 12,
      letterSpacing: '-0.008em'
    }
  }, "846 ttSport Heritage"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, "Gold-on-black livery, 500 cars, sold before the press release.")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/800-series/ETK_846_ttsport_heritage.webp",
    alt: "846 ttSport Heritage",
    style: {
      width: '100%',
      marginTop: 16
    }
  })))));
}
Object.assign(window, {
  TtSportScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/TtSportScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/data.js
try { (() => {
window.ETK_DATA = {
  models: [{
    id: '844',
    code: '844 150',
    name: '800-Series Saloon',
    body: 'saloon',
    img: 'Etk_844_150.webp',
    spec: '2,0 l I4 · 110 kW · RWD',
    price: 'from 38 900 EUR',
    series: '800'
  }, {
    id: '854',
    code: '854 190',
    name: '800-Series Touring',
    body: 'touring',
    img: 'ETK_854_190.webp',
    spec: '2,0 l I4 · 140 kW · RWD',
    price: 'from 41 700 EUR',
    series: '800'
  }, {
    id: '854x',
    code: '854x 250',
    name: '800-Series Touring xMatic',
    body: 'touring',
    img: 'ETK_854x_250.webp',
    spec: '2,0 l I4 turbo · 184 kW · xMatic',
    price: 'from 52 400 EUR',
    series: '800',
    badge: 'New'
  }, {
    id: '846',
    code: '846 310d',
    name: '800-Series Saloon Diesel',
    body: 'saloon',
    img: 'ETK_846_310d.webp',
    spec: '3,0 l I6 d · 228 kW · RWD',
    price: 'from 57 200 EUR',
    series: '800'
  }, {
    id: '856xc',
    code: '856xc 300',
    name: '800-Series XC',
    body: 'xc',
    img: 'ETK_856xc_300.webp',
    spec: '3,0 l I6 · 221 kW · xMatic',
    price: 'from 61 800 EUR',
    series: '800'
  }, {
    id: '856x',
    code: '856x 340',
    name: '800-Series Touring xMatic',
    body: 'touring',
    img: 'ETK_856x_340.webp',
    spec: '3,0 l I6 turbo · 250 kW · xMatic',
    price: 'from 66 400 EUR',
    series: '800'
  }, {
    id: '846tt',
    code: '846tt 340',
    name: '846 ttSport',
    body: 'saloon',
    img: 'ETK_846tt_340.webp',
    spec: '4,4 l V8 biturbo · 250 kW',
    price: 'from 89 500 EUR',
    series: '800',
    badge: 'ttSport',
    tt: true
  }, {
    id: '856tt',
    code: '856 ttSport',
    name: '856 Touring ttSport',
    body: 'touring',
    img: 'ETK_856_ttsport.webp',
    spec: '4,4 l V8 biturbo · 250 kW',
    price: 'from 92 300 EUR',
    series: '800',
    badge: 'ttSport',
    tt: true
  }, {
    id: 'kc4',
    code: 'Kc4 250',
    name: 'K-Series Coupé',
    body: 'coupe',
    img: 'ETK_Kc4_250.webp',
    spec: '2,0 l I4 turbo · 184 kW · RWD',
    price: 'from 64 900 EUR',
    series: 'k'
  }, {
    id: 'kc6',
    code: 'Kc6 360',
    name: 'K-Series Coupé',
    body: 'coupe',
    img: 'Kc6_360.webp',
    spec: '3,0 l I6 turbo · 265 kW · RWD',
    price: 'from 78 400 EUR',
    series: 'k'
  }, {
    id: 'kc6x',
    code: 'Kc6x 310d',
    name: 'K-Series Coupé xMatic',
    body: 'coupe',
    img: 'Kc6x_310d.webp',
    spec: '3,0 l I6 d · 228 kW · xMatic',
    price: 'from 76 100 EUR',
    series: 'k'
  }, {
    id: 'kc8',
    code: 'Kc8 ttSport',
    name: 'K-Series ttSport',
    body: 'coupe',
    img: 'Kc8_ttsport.webp',
    spec: '4,4 l V8 biturbo · 331 kW',
    price: 'from 114 700 EUR',
    series: 'k',
    badge: 'ttSport',
    tt: true
  }],
  imgBase: m => '../../assets/images/' + (m.series === 'k' ? 'k-series/' : '800-series/') + m.img
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SpecFigure = __ds_scope.SpecFigure;

__ds_ns.SpecTable = __ds_scope.SpecTable;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ColorSwatch = __ds_scope.ColorSwatch;

__ds_ns.TrimRow = __ds_scope.TrimRow;

__ds_ns.VehicleCard = __ds_scope.VehicleCard;

})();
