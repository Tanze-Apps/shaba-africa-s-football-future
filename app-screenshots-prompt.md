# Prompt: Produce marketing screenshots of the Shabas app

> Paste everything below the line into the Claude Code session that owns the Flutter
> repository. Run it **after** the design revamp has landed, so the screenshots show
> the new look.

---

The marketing site at `sha-bas.com` shows app screenshots in several places, and the
current ones are not good enough. I need a clean, consistent set produced from the app
itself. This is an asset-production task: **do not change app behaviour, and do not
write anything to the production backend.**

## Why the current screenshots fail

So you know what to avoid:

- **Too low resolution.** They are about 335px wide but displayed at up to 300px
  wide, so they look soft on every high-density screen.
- **Inconsistent sizes.** The four current images are 339×764, 332×752, 342×752 and
  331×763. The site cross-fades between them in one frame, so the frame visibly jumps.
- **Empty states.** They show `0 matches`, `0 wins`, `No upcoming matches`. That
  sells nothing.
- **Wrong content for the slot.** The "verified standings" feature shows the home
  screen; the "player profile" feature shows the formation screen.
- **Old visual style** — emoji and the previous theme.

## Step 1 — Build a demo-data mode (required)

Screenshots must be deterministic and must never touch real accounts or production.

- Add a demo mode enabled by a build flag, e.g. `--dart-define=SHABAS_DEMO=true`.
- In demo mode, repositories return data from local fixtures instead of the network.
  Hook in at the data layer so every screen renders exactly as it does for real.
- Demo mode must be impossible to reach in a release build without the flag. It must
  not change any normal code path.
- Use **one consistent world** across all fixtures, so screens agree with each other:

**Demo player** — a fictional name (not a real person), e.g. `Junior Mbarga`,
`@junior_mbarga`, striker, `Makepe, Douala`, Level 7, 1,240 XP, REP 4.8, 23 matches,
14 goals, 9 assists, a 6-day streak. **No real email or phone number shown.**

**Demo teams** — use these names, because the marketing site already shows them in its
results ticker and the two should match:

`Bepanda FC` · `Makepe United` · `Scorpions FC` · `Akwa Stars` · `Deido Warriors` ·
`Bonapriso FC` · `New Bell FC` · `Ndogbong SC` · `Logbaba Kings` · `Bali FC`

Give them plausible records, realistic scores, and neighbourhoods across Douala.

**Photos and avatars.** No real footballers' likenesses — the current profile cover
shows a recognisable international player, which is a rights problem for marketing.
Use initial-based avatars, or neutral licensed images, or abstract team crests.
Nothing identifiable as a real user.

## Step 2 — The shots

### Phone set (required)

Nine screens. For each, the **first line is what must be visible in the top 45% of the
image**: the site often crops from the top, so the key content cannot sit low.

1. **`01-explore`** — Explore / team finder
   Top: search field plus map centred on Douala, with 6–10 team pins clustered in
   neighbourhoods. Zoom so the pins are readable — not the whole world.
   Also: one pin selected with its team preview card showing.
   Keep the Google Maps logo and attribution visible; Google's terms require it.

2. **`02-challenge`** — Sending a challenge
   Top: `Bepanda FC` vs `Makepe United`, with date, time and pitch set.
   Also: the send / accept action clearly visible. Not an empty form.

3. **`03-rankings`** — Verified standings
   Top: a ranked table of at least 8 teams with position, record and points; the
   demo player's team highlighted mid-table.
   Also: some visible indication that results are verified.

4. **`04-profile`** — Player profile / football CV
   Top: avatar, name, position, neighbourhood, level, and headline stats
   (matches, goals, assists, rating) all populated.
   Also: the statistics or form section below.

5. **`05-formation`** — Live formation
   Top: the full pitch with every position filled by a named player.
   The site shows this one cropped to roughly square, so the pitch must be in the
   top half.

6. **`06-progression`** — Level, XP and streak
   Top: level card with a partly filled XP bar, current streak, and REP score.
   Use whichever screen shows progression best.

7. **`07-la-rue`** — Community feed
   Top: 3–4 posts — a match recap with a score, an open challenge, a neighbourhood
   poll — with reactions and comment counts. Written in natural French.

8. **`08-marketplace`** — Marketplace
   Top: a grid of 4–6 listings (boots, jerseys, gear) with prices in XAF and locations.

9. **`09-tournament`** — Tournament bracket
   Top: group or knockout bracket with team names and some results filled in.
   Only if the feature exists; skip otherwise and tell me.

### Desktop set (optional, but valuable)

Now that the web build is becoming a real desktop app, two wide shots let the site
show that:

- **`d01-explore`** — full-bleed map with the results panel beside it.
- **`d02-home`** — the desktop dashboard.

## Step 3 — Technical specification

**Phone screenshots**

- Logical size **390×844**, captured at **3× pixel density → 1170×2532 PNG**.
- **Every phone image exactly 1170×2532.** Non-negotiable; see the frame-jump
  problem above.
- Full screen, including the bottom navigation, in its normal position.
- **No device frame** — the site draws its own.
- **No OS status bar.** If one is unavoidable, make it identical in every image
  (09:41, full signal and battery, no notifications).
- No debug banner, no performance overlay, no layout guides, no cursor, no keyboard,
  no toast or snackbar unless it is the point of the shot.
- Dark theme only. Scroll every screen to the top unless the shot says otherwise.

**Desktop screenshots**

- **1440×900 logical at 2× → 2880×1800 PNG**, browser chrome excluded.

**Both languages.** The marketing site defaults to French and has an English toggle,
so produce every shot twice, identical apart from language:
`01-explore-fr.png`, `01-explore-en.png`, and so on. Fixture text that is
user-generated (posts, team names) can stay in French in both.

**Fonts must be the real ones.** If you use Flutter golden tests, the default test
font renders every glyph as a box — load Anton and Inter explicitly, or capture from a
real simulator, emulator or browser instead. Check the first image before producing
the rest.

**Master files.** Lossless PNG only. I will compress and convert them for the web
myself, so don't pre-optimise.

## Step 4 — Deliverables

Put everything in one folder, `marketing-screenshots/`, containing:

- The PNGs, named as above.
- A `manifest.md` listing each file with its dimensions, the screen/route it came
  from, and one line describing what's shown.
- A short note on how to regenerate the set (the command you ran), so this can be
  repeated after future UI changes.

Show me the explore, rankings and profile shots in **both languages** before producing
the rest, so I can approve the direction and the demo data.

## Don'ts

- Don't create demo accounts, teams or posts on production — fixtures only.
- Don't change any screen's layout just to make it photograph better. If something
  looks wrong in a screenshot, tell me; it's probably a real UI issue.
- Don't include any real user's name, handle, photo, email or phone number.
