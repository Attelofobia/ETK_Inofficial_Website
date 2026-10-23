# ETK — Design System

ETK is a German premium automobile manufacturer: an in-universe brand from **BeamNG.drive**, positioned as the country's engineering-led maker of rear-drive executive saloons, touring estates and sports coupés. This design system captures how ETK looks, writes and behaves as a *marque* — a proud, heritage-rich manufacturer whose confidence comes from measured precision rather than noise.

Everything here was built from the material the user supplied. There was **no codebase and no Figma file**, so the component inventory is an authored standard set (see *Intentional additions*), while the brand marks, typeface and vehicle imagery are the real supplied assets.

## Sources given

| Source | Path / URL | What it gave us |
| --- | --- | --- |
| Brand marks | `uploads/BeamNG's ETK/logo/etk_main/` | ETK roundel in black, grey and orange (raster, 512×390 max) |
| Sub-brand mark | `uploads/BeamNG's ETK/logo/ttsport/ttsport_lettering.jpg` | `ttSport` boot-lid lettering — chrome with a blue `tt` |
| Typeface | `uploads/BeamNG's ETK/fonts/Overpass/` | Overpass, static + variable weights (the corporate typeface) |
| Vehicle renders | `uploads/BeamNG's ETK/images/800_series/`, `.../k_series/` | 24 factory configuration thumbnails, 190×107 px |
| Hero image | `uploads/BeamNG's ETK/images/k_and_800_combined.jpg` | 597×335 dusk driving shot, K-Series + 800-Series |
| Reference | `https://beamng.fandom.com/wiki/ETK`, `/ETK_K-Series`, `/ETK_800-Series` | Model lore, nomenclature, powertrain and trim language |

## The marque and its products

**ETK** — the parent marque. Engineering-led, longitudinal front engine, rear-wheel drive with optional **xMatic** all-wheel drive, 50:50 weight distribution, aluminium-intensive construction.

**ttSport** — the in-house performance division. Its own lettering, its own deep navy, its own drive modes (*Sport+*, *ttSport*, *ttSport+*). Applied as a suffix to a model code, never as a standalone brand: `Kc8 ttSport+`, `846x ttSport Plus`, `856 ttSport`. A **ttSport Heritage** trim exists as a retro-liveried special.

**Model ranges represented in the supplied assets**

- **800-Series** (2013–2018) — mid-size executive saloon and *Touring* estate. Kidney-style twin grille, xenon headlamps, built-in navigation. Also an **XC** raised all-terrain trim.
- **K-Series** (2015–2021) — two-seat sports coupé on a shortened 800 platform. 1500–1650 kg, 50:50 distribution, up to the 4.4 V8.

**Model nomenclature** — the model code is a read-once spec sheet, and the design system treats it as typographic data, not as a word:

```
8 5 4 x c  250
│ │ │ │ │   └── power index (kW ×10, roughly)
│ │ │ │ └────── c = coupé body
│ │ │ └──────── x = xMatic all-wheel drive
│ │ └────────── engine size / output step
│ └──────────── body & equipment step
└────────────── series (8 = 800-Series, K = K-Series)
```

A trailing **d** marks a Diesel (`856x_310d`). Codes are always set in the display weight, never letterspaced, never hyphenated.

---

## CONTENT FUNDAMENTALS

**The voice is a German engineer who is quietly certain.** Statements, not sales. The brand states a fact and lets the reader draw the conclusion; it does not tell the reader how to feel about the fact.

**Person.** ETK speaks in the third person about itself and its cars ("the 800-Series Touring", "ETK has built…"), and addresses the customer as **you** only in service and ownership contexts ("your vehicle is due for inspection"). Never "we" in marketing copy — "we" appears only in heritage and manufacturing narrative, where the people matter ("we have built cars in this hall since 1953"). Never "I".

**Casing.** Sentence case for headlines, body and buttons. `UPPERCASE` is reserved for three things and nothing else: eyebrows above a headline, technical data labels (`POWER`, `0–100 KM/H`, `KERB WEIGHT`), and the wordmark. When uppercase is used it always carries wide tracking (0.1–0.18em). Model codes keep their factory casing exactly: `846x ttSport`, `Kc8`, `xMatic`, `iTronic` — lowercase first letter intact, never title-cased.

**Sentence shape.** Short declaratives, one idea each. A long sentence is allowed when it carries a real chain of engineering cause and effect. No rhetorical questions. No "imagine…". No second-person imperatives outside of controls.

**Numbers are the adjectives.** Wherever a claim could be made with a word, ETK makes it with a figure and a unit. Units are spaced and metric-first, imperial in brackets for NA markets: `250 kW (335 hp)`, `1 540 kg (3 395 lb)`, `4,4 l V8`. Ranges use an en dash: `0–100 km/h in 4,6 s`. Engine capacity uses a decimal comma in EUDM copy, a point in USDM.

**Emoji: never.** Not in product, not in marketing, not in service messaging. Unicode symbols are used only where they are technical notation (`→`, `·`, `±`, `°C`, `–`).

**Punctuation.** No exclamation marks. Em dashes sparingly; the brand prefers a full stop. Lists are parallel and unpunctuated at the end of lines.

### Examples

> **Eyebrow** `800-SERIES TOURING` **Headline** Space, without the compromise. **Body** The Touring carries 1 500 litres with the rear bench folded and still turns in like the saloon. Weight distribution is unchanged at 50:50.

> **Trim name** `856x ttSport Plus` **Spec line** `4,4 l V8 · 340 kW · xMatic · 7-speed ttSport DCT`

> **Service message** Your 846 is due for its second inspection in 1 200 km. Book at your ETK partner.

**Avoid:** "revolutionary", "game-changing", "unleash", "elevate", "crafted", "passion for driving", "pure emotion", anything with a trailing ellipsis, and any sentence that would work equally well for a phone.

---

## VISUAL FOUNDATIONS

**The overall feeling** is a well-lit factory floor: white or graphite, hairline rules, one orange signal, and a lot of air. Nothing is decorative. Every line on the page either separates two things or measures something.

### Colour

- **ETK Orange `#F86E00`** is the single signal colour, taken from the illuminated roundel. It is a *signal*, not a wash — used for the primary control, the 3 px section rule, the active tab underline, the selected state, and the roundel itself. Rule of thumb: orange should never exceed roughly 5 % of a screen's area. There are no orange page backgrounds, no orange cards, no orange gradients.
- **Graphite neutrals `#0B0C0D → #F4F5F6`** carry everything else. Two thirds of ETK surfaces are white or near-white; cockpit and night-showroom surfaces flip to `#0B0C0D` via the `.etk-dark` scope.
- **ttSport Blue `#000A48`** belongs to the performance division only. It appears as a full-bleed panel behind ttSport content, as the `tt` in the lettering, and nowhere else. Never mix orange and ttSport blue as a pair in the same component.
- **Silver `#A8A8A0`** is badge metal — used for hairlines on dark ground, divider ticks and inactive trim swatches.
- **Semantic:** green `#2F7D4F`, amber `#C98A00`, red `#B3261E`, all desaturated to sit beside graphite. Used in vehicle-status contexts, never in marketing.
- **No gradients as decoration.** The only gradients in the system are protection scrims over photography (`--scrim-bottom`, `--scrim-left`).

### Typography

**Overpass** is the whole system — display, body and data. It is the supplied corporate typeface, and its slightly squared, highway-signage skeleton is what makes the brand read as German-industrial rather than generic-premium.

- **Display** 36–72 px, weight 800, tracking −0.018 to −0.025em, line-height ≤ 1.08. Headlines are set tight and short; three lines maximum.
- **Body** 16 px / 1.6, weight 400, measure capped at 66 characters.
- **Eyebrow** 11 px, weight 700, uppercase, tracking 0.18em. This is the brand's most recognisable typographic move and it precedes almost every headline.
- **Spec figures** 34 px, weight 300 — deliberately *lighter* than the headline. Data is stated calmly; emotion lives in the headline, precision in the figure.
- No second typeface. No italic outside of legal footnotes. No condensed or expanded faces. There is **no supplied mono** — tabular data uses Overpass with `font-variant-numeric: tabular-nums`.

### Space and layout

A 4 px base unit, with the working set 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Page container 1280 px, 48 px side padding, 24 px gutter, 12 columns. Sections breathe at 96 px vertical. Marketing layouts are asymmetric — a headline block occupying columns 1–5 against a full-bleed image in 6–12 — while product UI is strictly aligned to the grid. Headers are fixed and 72 px tall; cockpit UI pins a 64 px status bar to the top and a control dock to the bottom, and nothing else is fixed.

### Shape, borders, cards

Corners are effectively square: **2 px** on controls, cards and badges, **0 px** on images and full-bleed panels, and a pill radius only on the model-filter chips in the configurator. A card is a white surface with a 1 px `#D6D9DC` hairline and *no shadow*; it earns a shadow (`0 2px 8px rgba(11,12,13,.08)`) only when it floats above other content — menus, dialogs, the configurator's sticky summary. Elevation is communicated by hairlines and background steps first, shadow last. Shadows are never coloured and never larger than `0 8px 28px`. The signature graphic device is the **3 px orange rule** sitting directly above a section eyebrow.

### Imagery

Vehicle photography is **cool and neutral** — grey-blue studio light, no warm grade, no grain, no filters. Studio configuration renders sit on a plain light-grey ground at a fixed three-quarter front angle and are never cropped. Location photography is dusk or overcast, desaturated, with the car small in a wide frame; the one supplied location shot (`assets/images/hero-k-and-800.jpg`) is the exception that proves it — a warm sunset grade reserved for hero moments only. Images are always square-cornered and usually full-bleed to at least one page edge. Text over an image always sits on a scrim (`--scrim-bottom` / `--scrim-left`), never on the raw photograph.

### Motion

Damped and mechanical. `cubic-bezier(0.2,0,0,1)` for everything interactive, 140 ms for controls, 220 ms for panels, 420 ms for a full panel or drawer, 900 ms for a cinematic hero cross-fade. **Nothing bounces and nothing overshoots** — no spring easing anywhere in the system. Content enters by fading with an 8 px upward translate, never by scaling. The only looping animation permitted is a vehicle turntable.

### Interaction states

- **Hover** — filled controls darken one step (`#F86E00 → #C45600`); outline and ghost controls fill their border colour at 6 % and darken the border; cards raise their hairline to `--border-strong` and nothing else. Opacity is never used to signal hover.
- **Press** — darken a second step (`#8F3F00`) with no movement and no scale. Cockpit controls are the exception: they invert to the accent fill for 80 ms as a positive acknowledgement.
- **Focus** — a 2 px orange ring offset 2 px from the control (`--focus-ring`). Always visible, never removed.
- **Selected** — a 2 px orange left or bottom edge plus a `#F4F5F6` fill. Selection never relies on colour alone: a selected trim row also shows a check glyph.
- **Disabled** — `#B3B8BD` text on `#F4F5F6`, hairline unchanged, no opacity fade.

### Transparency and blur

Used in exactly two places: the fixed site header, which becomes `rgba(255,255,255,0.86)` with a 12 px backdrop blur once the page scrolls; and the cockpit overlay panels, `rgba(11,12,13,0.72)` with a 20 px blur over live map or camera content. Nowhere else — no frosted cards, no translucent buttons.

---

## ICONOGRAPHY

**The supplied assets contain no icon set.** There is no icon font, no SVG sprite and no PNG icon library in `uploads/BeamNG's ETK/` — only the roundel, the ttSport lettering, the typeface and vehicle renders. Rather than draw a set from imagination, this system links **[Lucide](https://lucide.dev)** from CDN as an explicit, flagged substitution:

> ⚑ **Substitution flagged:** icons are Lucide (CDN, `lucide@0.469.0`), chosen because its 24 × 24 grid, 1.5 px uniform stroke, square-ish terminals and flat joins are the closest available match to the brand's squared, engineering-drawing character. If ETK has a real icon set, replace it and this note.

**Usage rules**

- Line only. Stroke 1.5 px at 20–24 px, 2 px at 32 px and above. No filled icons, no duotone, no rounded-cap "friendly" sets.
- Icons take `currentColor` and inherit the text colour beside them; an icon is only orange when the whole control is in its accent state.
- Nominal sizes: 16 px inline with `--type-body-sm`, 20 px in controls, 24 px in navigation, 32 px for vehicle-status glyphs in the cockpit.
- Icon and label are separated by 8 px and optically centred. An icon-only control always carries an `aria-label` and a tooltip.
- **Emoji are never used** in any surface. Unicode is used only as technical notation (`→ · ± °C –`).
- The **roundel is not an icon.** It is a brand mark with its own clear space (minimum ½ roundel height on all sides) and a 20 px minimum reproduction height. It is never recoloured beyond the three supplied variants, never outlined, never placed on a busy photograph without a scrim.

**Logo assets available** (`assets/logo/`): `etk-roundel-black.png`, `etk-roundel-grey.jpg`, `etk-roundel-orange.jpg` (supplied originals), plus `-alpha` cut-outs in black / white / orange derived programmatically from the supplied black mark for use on coloured ground, and `ttsport-lettering.jpg`.

---

## Intentional additions

No source defined a component inventory, so the primitives below are an authored standard set sized to what an automotive marque actually ships — a marketing site, a configurator and an in-car screen. Each has a stated reason for existing:

- **Button, IconButton, Input, Select, Checkbox, Radio, Switch** — the unavoidable control set; styled to the 2 px / hairline / orange-signal rules above.
- **Card, Badge, Tag, Divider** — surface and metadata primitives.
- **Eyebrow, SpecFigure, SpecTable** — the brand's typographic signatures made reusable; without these the voice is not reproducible.
- **Logo** — enforces clear space, minimum size and the permitted variants.
- **Icon** — a thin wrapper over the Lucide CDN set so stroke width and sizing stay consistent.
- **VehicleCard, TrimRow, ColorSwatch** — the configurator's repeating units, which every ETK surface needs and which no generic kit provides.
- **Tabs, Dialog, Tooltip, Toast** — navigation and feedback, used by the UI kits.

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | The one stylesheet consumers link. `@import`s only. |
| `tokens/` | `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `shape.css` · `motion.css` · `base.css` |
| `assets/fonts/` | Overpass TTFs, weights 300–900 + italic |
| `assets/logo/` | ETK roundel (supplied + alpha cut-outs), ttSport lettering |
| `assets/images/` | `800-series/` (16), `k-series/` (8), `hero-k-and-800.jpg` |
| `guidelines/` | Foundation specimen cards — type, colour, spacing, motion, brand |
| `components/core/` | Button, IconButton, Logo, Icon, Badge, Tag, Card, Divider |
| `components/forms/` | Input, Select, Checkbox, Radio, Switch |
| `components/brand/` | Eyebrow, SpecFigure, SpecTable |
| `components/vehicle/` | VehicleCard, TrimRow, ColorSwatch |
| `components/navigation/` | Tabs |
| `components/feedback/` | Dialog, Tooltip, Toast |
| `ui_kits/marketing/` | etk.de — model range, model detail, heritage |
| `ui_kits/configurator/` | "Build your ETK" — engine, trim, paint, summary |
| `ui_kits/cockpit/` | In-car infotainment: home, drive, navigation, vehicle status |
| `SKILL.md` | Agent-skill entry point |
