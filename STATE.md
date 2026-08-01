# STATE

Branch `indian-curriculum` (local only, no upstream PR).
Last updated 2026-08-01.

## Where things stand

2,533 topics · 4,451 edges · 4,300 standards · 349 clusters · 16 curriculum
sources · **29 subjects** · ages **0–18**. `node scripts/validate.mjs` green.
All build scripts idempotent (re-run adds zero).

**In progress (2026-08-01): integrating the CISCE ICSE + ISC syllabuses.** New
source `icse` (Classes IX–X, 14–16) added, red tier (Marble factual
descriptions, no CISCE text — see PROVENANCE). Shared board helper
`scripts/build/cisce.mjs` serves both `icse` and the forthcoming `isc`
(Classes XI–XII, 16–18). **ICSE done so far: Mathematics + Computer
Applications.** Mathematics (`icse-mathematics.mjs`): 29 standards, 22 aligned,
21 minted (commercial-mathematics strand, logarithms/indices, 2×2 matrices,
loci, equation of a line, reflection, proof-based geometry theorems). Computer
Applications (`icse-computer-applications.mjs`): 18 standards, 17 minted — a new
**Programming** domain under Computing (Java OOP), since Computing had no
programming topics at all. The user's priority is to work through the subjects
that ALREADY exist as subjects first, preserving micro-topic granularity.
Remaining ICSE existing-subject targets: Economics, Commercial Studies→Business
Studies, Physics/Chemistry/Biology/Environmental Science→Science,
History&Civics→History+Political Science, Geography, Home Science, Art→Visual
Arts, Performing Arts→Music/Dance, English. Then the ISC
(XI–XII) pass onto the ncert-hsec ladders. ISC-only new subjects (AI, Robotics,
Legal Studies, Entrepreneurship, Applied Maths, Engineering Science,
Electricity & Electronics, Biotechnology) are deferred — they would each be a
new subject, which the user deprioritised. Syllabus PDFs + clean text live in
the session scratchpad (re-fetchable from cisce.org static URLs, which are not
Cloudflare-gated even though the listing pages are).

The NCERT ladder is complete end to end: `ncert-elem` (Classes I–VIII),
`ncert-sec` (IX–X) and `ncert-hsec` (XI–XII). The XI–XII pass raised the age
ceiling from 16 to 18 and added Physics, Chemistry, Biology and Sociology as
subjects; Geography and Political Science were then split out of Social Studies
from age 14, so all five components of NCERT's Social Science now exist as
subjects at the senior level. See CHANGELOG for the per-subject breakdown.

Latest (2026-07-21): a full grain review found **NCERT XI–XII Economics still at
unit grain** (0.81 topics per standard against Physics 2.85) and decomposed it
13 → 33 topics, the same treatment Geography got on 2026-07-20. The commerce
pass's claim that its bundles were the only superset double-coverage was wrong —
NIOS Economics had one more (*The Indian Economy*, now narrowed to its overview
lesson, with *Types of Economies* and *Basic Economic Activities* minted for the
lessons it papered over). Also minted *Minerals and Energy Resources* (15–16)
for the Class X minerals unit that sat on a topic that never covered it, and
aligned five NIOS Economics lessons (money, banking, data, environment) to
right-age topics instead of only ages 5–11. Sec Geography and Political Science
were checked the same way and left at chapter grain: their bodies pass the
one-claim test, so the sub-1.0 ratio there is shared coverage, not bundling.
Earlier (2026-07-20): commerce flattening; subject-split migration made
idempotent.

## Single next step

**Continue the ICSE pass: integrate ICSE Economics (→ Economics) next**,
following `icse-mathematics.mjs` as the align-heavy template (Economics has a
developed 14–16 ladder from ncert-sec / nios-sec, so expect mostly alignments
plus a few mints). Then Commercial Studies→Business Studies, the three sciences
+ Environmental Science→Science, History&Civics→History+Political Science,
Geography, Home Science, Art→Visual Arts, Performing Arts→Music/Dance, English —
then the ISC (XI–XII) pass onto the ncert-hsec ladders. Method: align-first (use
the scratchpad `q.mjs` to find existing topics before minting), one idea per
topic, red-tier descriptions. Two reference scripts exist: `icse-mathematics.mjs`
(align-heavy) and `icse-computer-applications.mjs` (mint-heavy, new domain).

Deferred (was the previous next step): **fill the Telugu, Kannada and Tamil
language ladders from state-board syllabi** — the largest genuine *language*
gap (Telugu 5, Kannada 6, Tamil 8 topics, all from NIOS). Needs SCERT sources
(Telangana/AP SCERT, Karnataka DSERT, Tamil Nadu SCERT); NCERT publishes no
syllabi for them. The ICSE Indian-Languages paper is a single shared exam
format, not per-language curricula, so it does not fill this gap.

Method is unchanged and is well proven by now: rights first (these are state
government publications, so the licence needs checking per state and will not
necessarily match NCERT's red tier), then align before minting — the Hindi and
Sanskrit ladders show what the shape of a full language subject looks like, and
much of the early literacy progression will already exist there and in English.
Expect to need OCR; all three scripts have the same legacy-font problem as
Devanagari and tesseract has `tel`, `kan` and `tam` packs installed.

## Other open gaps (unchanged, lower priority)

- **Urdu is not integrated.** `16Urdu.pdf` in `vol2_hsl.zip` is image-only
  (323 characters of extractable text across 18 pages) and would need full OCR
  with `tesseract -l urd`. It would add a 30th subject with no existing topics
  to align against.
- **NCERT vocational and art-education syllabi** are separate PDFs on
  ncert.nic.in/syllabus.php (`Art_Educationfinal_syllabus.pdf`,
  `indian_crafts.pdf`, `graphic_design_Web_site.pdf`, `syllabus_media_studies.pdf`,
  `Syllabus_for_CCT_Higher_Secondary_1.pdf`), and no one has looked at them yet.
  Visual Arts currently has only 8 topics, so the art-education document is the
  obvious cheap win there.
- **Four pre-existing graph islands remain**, none touched by the NCERT work:
  Visual Arts (6 topics), Home Science (2), Kannada (1), Dance (1) sit
  disconnected from the main graph. They predate this effort and were left
  alone deliberately, but they are cheap to wire in.
- **The committed data is not a clean full-rebuild fixpoint for clusters.**
  Running every build script in sequence yields ~372 clusters vs the committed
  342; the difference is ~24 *orphan* cluster summaries that older NIOS language
  and arts scripts (Hindi, Sanskrit, Telugu, Kannada, Tamil, Music, Visual Arts)
  emit at an age band with no matching topic — e.g. `Hindi | Speaking &
  Listening | 14` when those topics sit at ages 6–9. The committed 342 correctly
  excludes them; validate does not require clusters to match a topic band, so it
  passes either way. Fixing means correcting the ageRangeStart on those cluster
  definitions in the prior-session NIOS scripts (or dropping them). Pre-existing,
  low harm, out of scope for the NCERT work — recorded here so a future full
  rebuild does not mistake the +30 for new drift.
- Branch has no upstream PR — push or open one when the Indian-curriculum work
  reaches a natural release point.

## Method notes that keep mattering

- **Mint namespaces are per build family**: `ncert:` (elem), `ncert-sec:`,
  `ncert-hsec:`, `nios-obe-a:`, `nios-obe:`, `nios-sec:`, `ksgh:`. Cross-family
  references must mint with the ORIGINATING namespace — the `SEC()` helper in the
  hsec scripts exists for exactly this.
- **Edge strength vocabulary is `hard` | `soft`.** A bad value is rejected by
  validate, but re-running the build will NOT fix an already-written edge, since
  the dedupe key is `topicId>prerequisiteId`. Strip the bad edges from
  `data/dependencies.json` first, then re-run.
- **Audit alignments by age gap.** After the IX–X pass, checking each standard
  against the age of its best-aligned topic exposed eight cases where a senior
  idea had been papered over by a much younger topic. That check is worth
  repeating on any future alignment-heavy source.
- **Run an undirected connectivity check after every pass.** `validate.mjs`
  checks referential integrity and acyclicity but says nothing about whether new
  topics are *reachable*. The XI–XII work passed validation while leaving 48
  topics in 14 stranded islands. Build the adjacency list, flood-fill, and
  require that every new topic joins the main component.
- **Watch topics-per-source-unit, not just per-topic invariants.** Geography was
  built one-topic-per-NCF-unit and passed every per-topic audit while being half
  the size of its sibling disciplines; the tell was a topics-per-standard ratio
  of 1.00 against 2.85–4.50 elsewhere. Compute topics-per-source-unit by subject
  and treat any subject near 1.0 as a decomposition candidate — then read its
  broadest units to confirm. Interpret the ratio against the source's grain:
  NIOS lessons are already near-topic-sized, so 1.0 is correct there, while
  NCERT units bundle chapters, so 1.0 is a defect. The Geography fix checked its
  sibling Political Science and stopped; Economics sat one column over at 0.81
  for another day. When a structural audit convicts one subject, run it to
  completion across every subject before closing the pass — same for the
  superset check, whose "commerce only" conclusion missed NIOS Economics.
- **Check that a title does not promise content the body omits.** Restrict the
  test to titles enumerating a coordinate list (*A, B and C*) and ask whether
  each item is addressed; a whole-title word check drowns in false positives,
  because descriptions paraphrase deliberately. This found two real omissions
  (attention; salt hydrolysis) that every other audit had passed over.
- **Grain: test whether the description states one claim or several.** Format
  audits (evidence count, age span, standards per topic) pass happily on a topic
  that bundles two ideas. The sharper test is whether the description makes one
  organising claim and the three evidence items test it from different angles —
  if instead each evidence item tests a different claim, split it. A compound
  name is a hint, not proof: most compound-named humanities topics are one
  comparative idea, while the XI–XII sciences are where real bundling collects.
- **When extending a subject that already exists, anchor the new ladder to the
  old one explicitly.** Psychology, Business Studies and Accountancy each ended
  up as two disconnected halves because the senior topics only referenced each
  other. Prefer an edge from the senior topic to its 14–16 predecessor over
  minting in isolation — and check first whether the predecessor makes the new
  topic a duplicate rather than a deeper treatment.
- **A migration that mutates topics/clusters in place must be idempotent against
  re-emitting builds.** Topics dedupe by stable id, so a build re-adding one is a
  no-op; clusters dedupe by `subject|domain|ageRangeStart`, which a migration
  *changes*, so the build re-emits the pre-migration cluster and the migration
  re-moves it — one duplicate per cycle. Any in-place migration must collapse
  post-transform duplicates (see `subject-split-geography-polsci.mjs`).
