# Prompt: Rebuild the Shabas Flutter web app as a true desktop-web experience

> Paste everything below the line into the Claude Code session that owns the Flutter
> repository. It assumes that agent has the Flutter source and can run the app; it does
> not assume it has seen the marketing site.

---

You are working on the Shabas Flutter app (`app.sha-bas.com`), which ships to both
mobile and web from one codebase. The marketing site at `sha-bas.com` was just
rebranded to a dark editorial design system, and the app now looks like a different
product. Your job is to close that gap **and** to make the web build a real desktop
experience rather than a phone screen centred in a browser window.

## Non-negotiable constraints

1. **Do not break the mobile build.** Every change must be additive or responsive.
   The phone layout is the product's primary surface and must look and behave
   exactly as well as it does today. If a change would alter mobile rendering,
   gate it behind a width breakpoint.
2. **Do not touch business logic, API contracts, models, view-models, or routing
   semantics** except where this brief explicitly asks for route changes. This is a
   presentation-layer task.
3. **Do not rename or restructure files wholesale.** Work inside the existing
   architecture. If you need shared primitives, add them; don't rewrite what's there.
4. **Ship incrementally.** Land the design tokens first, then the responsive shell,
   then screen-by-screen. Each step should compile and run.
5. **Ask before deleting anything.** If a widget looks dead, confirm rather than remove.

## Part 1 — Adopt the website's design language

The site's system, to mirror in Flutter theme tokens:

**Colour**

| Role | Hex | Use |
| --- | --- | --- |
| Ground | `#080B09` | Page background |
| Raised surface | `#0E1411` | Cards, panels, sheets |
| Deep | `#050806` | Full-bleed sections, overlays, app bar on scroll |
| Bone (text) | `#F2F4F1` | Primary text |
| Bone dim | `rgba(242,244,241,0.55)` | Body copy |
| Bone faint | `rgba(242,244,241,0.32)` | Labels, meta |
| Hairline | `rgba(242,244,241,0.12)` | All borders and dividers |
| Brand | `#1E8A3C` | Primary buttons |
| Brand bright | `#2DB355` | Accents, active state, hover |
| Brand deep | `#145C28` | Pressed state |

The app currently uses an acid lime plus a per-screen accent rotation
(orange for "Challenge", gold for "Rank", blue, purple). **Collapse to the single
green scale above.** Semantic colour is still fine — win/loss/draw, error, warning —
but decorative accent rotation goes.

**Type — exactly two families, matching the site**

- **Anton** for all display type: screen titles, section headings, stat numerals,
  scores, big numbers, button labels. Anton is uppercase-only by design; render it
  uppercase with `letterSpacing: -0.01em` and tight line height (`height: 1.05`).
  Note Anton's glyph box is much taller than its cap height — do not set line height
  below ~1.0 on multi-line display text or lines will collide.
- **Inter** (400/500/600/700) for everything else: body, labels, form fields, nav.
- Remove the current rounded display face (Fredoka/Baloo family) entirely.

Add a small-caps "eyebrow" style used constantly on the site: Inter 600, 11px,
`letterSpacing: 0.22em`, uppercase, `bone-faint` — for section labels and meta rows.

**Shape and surface**

- **Square corners.** The site has a `--radius: 0` system. Replace pill buttons and
  `borderRadius: 16–24` cards with `BorderRadius.zero` or at most 2px.
- **Hairline borders instead of elevation.** Remove drop shadows and glows; use a
  1px `hairline` border on a `raised` fill.
- Full-width rectangular primary buttons, uppercase Inter 600 at
  `letterSpacing: 0.16em`, solid `brand`, hovering to `brand-bright`.

**Motion**

One shared curve — `Cubic(0.22, 1, 0.36, 1)` — at 400–800ms for entrances, 200ms for
hover/state. Content reveals on scroll: fade plus a short upward translate. Respect
`MediaQuery.disableAnimations` / reduced-motion and render everything static when set.

**Remove every emoji from the UI chrome.** This is the single most visible mismatch —
the site has zero emoji and the app uses them as its icon vocabulary. Confirmed
instances: bottom nav labels (`🏠 Home`, `🔍 Explore`, `📰 La Rue`, `⚽ Matches`),
`🧠 Daily Quiz`, `🏅 0 XP`, `⚡ Niveau 1`, `📊 statistics`, `🔥 Trending`, `🌍` in the
La Rue header, `📍` location, `📅` member-since, `✉️` email, `📞` phone, the
onboarding illustrations (`🔍`/`🔥`/`🏆`), and the profile stat tiles
(`⚽`/`🏁`/`📈`/`⭐`). Replace with a single consistent line-icon set at
`strokeWidth ≈ 1.75`. This also fixes a real rendering bug: the console logs
*"Could not find a set of Noto fonts to display all missing characters"*, meaning
those emoji are not guaranteed to render on every platform.

## Part 2 — Make it an actual web app

This is the more important half. Today the web build is the phone UI in a ~480px
column centred in the viewport, with roughly two-thirds of a 1440px screen as dead
black space. That matters commercially: the marketing site funnels **all iPhone
users** to the web app because there is no App Store build yet, so this is the first
real Shabas experience for a large share of users.

**Breakpoints**

```
compact  < 700    phone            — unchanged, current layout
medium   700–1100 tablet / small   — two-column where it helps, rail nav
expanded > 1100   desktop          — full multi-column, sidebar nav
```

Introduce one `ShabasBreakpoint` helper and drive everything from it. Never branch on
`kIsWeb` for layout — branch on width, so a large tablet gets the good layout too.

**Navigation — replace the bottom tab bar above `medium`**

The bottom tab bar is a phone idiom. At `medium` and up, move navigation to a
**persistent left sidebar**: the Shabas wordmark at top, the five destinations as
vertical items with icon plus Inter label, user avatar and settings pinned to the
bottom. Keep the bottom bar exactly as-is below `medium`. Content then occupies the
remaining width with a max content width of ~1340px, matching the site's container.

**Fix deep links — this is a real bug.** After login every tab reports the same URL
(`https://app.sha-bas.com/`); only `#/login` and `#/onboarding` update. So no screen
can be bookmarked, shared, opened in a new tab, or reached with the browser back
button. Give every destination and detail view a real route (`/home`, `/explore`,
`/matches`, `/la-rue`, `/profile`, `/teams/:id`, `/matches/:id`, `/tournaments/:id`)
and make browser back/forward work. On the web, a URL that never changes is a broken
app.

**Screen-by-screen at `expanded`**

- **Explore** — the worst offender today: a Google Map squeezed into a phone column,
  opened zoomed out to the entire world with three pins visible. On desktop make the
  map **full-bleed** with a floating search field and a **left results panel** listing
  nearby teams; hovering a list row highlights its pin and vice versa. Open at a sane
  zoom on the user's city, not the globe.
- **Home** — becomes a dashboard grid rather than one scrolling column: progression
  and quiz cards on one rail, upcoming matches and quick actions in the main column,
  trending teams as a proper horizontal carousel with visible affordances.
- **La Rue** — a three-column reading layout: filter rail (For You / Nearby / Teams /
  Trending) on the left, feed centre at a comfortable ~640px measure, trending or
  suggested teams right. Also fix the empty black band currently sitting between the
  header and the filter chips.
- **Profile** — two columns: identity, contact and level card left; stats, statistics
  chart and history right. The cover image should be a wide crop on desktop, not a
  phone-proportioned banner.
- **Matches / Rankings / Tournaments** — tables and lists get real table layouts at
  desktop width with sticky headers, rather than stacked cards.

**Web affordances the app currently lacks**

- Hover states on every interactive element.
- Visible keyboard focus rings (`brand-bright`, 2px) and sane tab order.
- `Esc` closes dialogs and sheets; `Enter` submits forms.
- Real cursor changes (`SystemMouseCursors.click`).
- Text selection enabled for user-generated content.
- Loading skeletons sized to the final layout rather than centred spinners.

## Part 3 — Bugs to fix while you are in here

1. **A failed login shows the user nothing.** `POST /api/v1/auth/login` returning
   401 leaves the screen completely unchanged — no error, no toast, no inline
   message, not even a spinner on the button. Add a pressed/loading state and a
   visible error. Verify the same for other failure paths (network down, 500).
2. **Typo in the sign-in field's accessibility label:** `"Enter credenttial"` —
   doubled `t`. Should read something like "Username, email or phone number".
3. **Mixed languages on one screen.** The Profile shows `Niveau 1`,
   `5 matchs → Niv. 2` and `Niv. 2: 5 matchs` in French while the surrounding UI is
   English (`Matches Played`, `Goals`, `Assists`, `Rating`). Those strings are
   hard-coded rather than going through localisation. Audit for other hard-coded
   French.
4. **Inconsistent capitalisation** in the same row of controls: `Challenge`,
   `My Team`, `Rankings` are title case while `map`, `tournaments`, `statistics` and
   `player` are lowercase. Pick one convention.
5. **Contact details exposed on the profile.** Email and phone number render in
   plain text. Confirm that is intended for other users viewing the profile and not
   just the owner.

## Part 4 — Security, to confirm rather than assume

`https://app.sha-bas.com/assets/.env` is fetched at startup, which means the bundled
dotenv file is publicly readable by anyone who opens the app. That is how
`flutter_dotenv` works on web — it is not a leak in itself, but **anything secret in
that file is public.** Check what it contains. Only publishable values (API base URL,
public Firebase config, Maps browser key) belong there; any server secret must move
behind the backend. Separately, restrict the Google Maps browser key by HTTP referrer
to your own domains.

## Definition of done

- Mobile build is visually and behaviourally identical to before — verify by
  screenshotting key screens at 390×844 before and after.
- At 1440×900 no screen is a narrow centred column; content uses the viewport.
- Every destination has its own URL; browser back/forward and refresh all work.
- No emoji anywhere in app chrome; one icon set throughout.
- Only Anton and Inter are loaded.
- Keyboard-only navigation can reach and activate every control.
- A wrong password produces a visible error within one second.

## How to work

Start by showing me your plan and the token/theme diff before touching any screen.
Then land in this order, pausing after each for review:

1. Theme tokens, typography, icon set (no layout changes)
2. Breakpoint helper plus responsive nav shell
3. Routing and deep links
4. Explore, then Home, then La Rue, then Profile
5. Bug list in Part 3

Screenshot every screen at 390×844 and 1440×900 after each stage and show me both.
