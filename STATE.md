# STATE

Branch `indian-curriculum` (local only, no upstream PR).
Last updated 2026-07-18.

## Where things stand

2,092 topics · 3,834 edges · 4,028 standards · 318 clusters · 14 curriculum
sources · 23 subjects. `node scripts/validate.mjs` green. All builds idempotent.

Latest addition: `ncert-sec` — NCERT Syllabus for Secondary Classes **IX–X**
(NCF 2005), all subjects. See CHANGELOG for the per-subject breakdown.

## Single next step

**Decide whether to extend the taxonomy's age ceiling from 16 to 18, and if so
integrate NCERT Classes XI–XII.**

This is a product decision before it is a data task, which is why it was split
out rather than done in the IX–X pass.

### What the decision is

Every subject in the dataset currently tops out at age 16. NCERT Volume II
(`vol2_hsl.zip`, already the source for `ncert-sec`) also carries Classes XI–XII
— roughly ages 16–18. Integrating it means:

- Extending the age range to 18, which changes what the dataset claims to be.
  The framing is parent-facing (`assessmentPrompt` carries a child's `{{name}}`,
  clusters are "parent-friendly"), and senior-secondary specialist content —
  definite integrals, reaction mechanisms, coordination compounds — sits oddly
  against that framing. Worth resolving before minting anything.
- Adding **Sociology** as a 24th subject (it exists only at XI–XII).
- Deciding whether Physics, Chemistry and Biology become subjects in their own
  right or stay as domains under Science. They are separate disciplines from
  Class XI onward, but the existing Science domains are thematic
  (*Matter & Materials*, *Forces & Motion*), not disciplinary.

### If the answer is yes

Rough size: ~150–200 new topics, ~250 standards. Probe run on 2026-07-18 found
calculus, thermodynamics, hydrocarbons, electrostatics, coordination compounds,
kinetic theory, biomolecules and sociology all absent — so unlike IX–X this
would be mostly minting, not aligning.

Documents in the zip, all extracting cleanly as text except where noted:

| Document | Subject |
|---|---|
| `02Chemistry (XI-XII).pdf` | Chemistry, 30 units |
| `03Physics (XI-XII).pdf` | Physics, 20 units |
| `04Biology (XI-XII).pdf` | Biology |
| `05 Mathmetics (class IX-XII).pdf` | Maths XI–XII portion (sets, calculus, vectors, 3-D, linear programming) |
| `08HGPES (XI-XII).pdf` | History, Geography, Political Science, Economics, **Sociology** |
| `09PSY &BS (XI-XII).pdf` | Psychology, Business Studies |
| `10Accountancy (XI-XII).pdf` | Accountancy |
| `12English (IX-XII).pdf` | English Core and Elective XI–XII |
| `15 Sanskrit ( XI-XII).pdf` | Sanskrit XI–XII — needs OCR (legacy Devanagari font) |
| `16Urdu.pdf` | Urdu — image-only, needs full OCR; would be a new subject |

Method is unchanged: rights first (already settled — same red tier as
`ncert-elem`/`ncert-sec`), align before minting, one idempotent build script per
subject in `scripts/build/`, then `node scripts/manifest.mjs` →
`node scripts/validate.mjs` → update README counts and subject table,
PROVENANCE, CHANGELOG. Reuse `scripts/build/ncert-sec.mjs` as the harness
template but **mint under a new namespace** (`ncert-hsec:`) — the namespaces
are per build family and cross-family references must use the originating one.

## Other open gaps (unchanged, lower priority)

- **Telugu (5), Kannada (6), Tamil (8) remain thin** — secondary-derived only.
  NCERT does not publish these; fixing it needs SCERT / state-board syllabi
  (Telangana or AP SCERT, Karnataka DSERT, Tamil Nadu SCERT). This was the top
  gap before the NCERT secondary work and still is.
- Branch has no upstream PR — push or open one when the Indian-curriculum work
  reaches a natural release point.
