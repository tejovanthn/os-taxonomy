# STATE

Branch `indian-curriculum` (local only, no upstream PR).
Last updated 2026-07-18.

## Where things stand

2,444 topics · 4,269 edges · 4,253 standards · 342 clusters · 15 curriculum
sources · **29 subjects** · ages **0–18**. `node scripts/validate.mjs` green.
All fifteen build scripts idempotent (re-run adds zero).

The NCERT ladder is complete end to end: `ncert-elem` (Classes I–VIII),
`ncert-sec` (IX–X) and `ncert-hsec` (XI–XII). The XI–XII pass raised the age
ceiling from 16 to 18 and added Physics, Chemistry, Biology and Sociology as
subjects; Geography and Political Science were then split out of Social Studies
from age 14, so all five components of NCERT's Social Science now exist as
subjects at the senior level. See CHANGELOG for the per-subject breakdown.

## Single next step

**Fill the Telugu, Kannada and Tamil language ladders from state-board syllabi.**

These are now the largest genuine content gap: Telugu has 5 topics, Kannada 6
and Tamil 8, all derived from NIOS secondary rather than from a primary-language
curriculum. NCERT does not publish syllabi for them, so this needs SCERT /
state-board sources — Telangana or AP SCERT for Telugu, Karnataka DSERT for
Kannada, Tamil Nadu SCERT for Tamil.

Method is unchanged and is well proven by now: rights first (these are state
government publications, so the licence needs checking per state and will not
necessarily match NCERT's red tier), then align before minting — the Hindi and
Sanskrit ladders show what the shape of a full language subject looks like, and
much of the early literacy progression will already exist there and in English.
Expect OCR to be needed; all three scripts have the same legacy-font problem as
Devanagari and tesseract has `tel`, `kan` and `tam` packs installed.

## Other open gaps (unchanged, lower priority)

- **Urdu is not integrated.** `16Urdu.pdf` in `vol2_hsl.zip` is image-only
  (323 characters of extractable text across 18 pages) and would need full OCR
  with `tesseract -l urd`. It would add a 30th subject with no existing topics
  to align against.
- **NCERT vocational and art-education syllabi** are separate PDFs on
  ncert.nic.in/syllabus.php (`Art_Educationfinal_syllabus.pdf`,
  `indian_crafts.pdf`, `graphic_design_Web_site.pdf`, `syllabus_media_studies.pdf`,
  `Syllabus_for_CCT_Higher_Secondary_1.pdf`) and have never been looked at.
  Visual Arts currently has only 8 topics, so the art-education document is the
  obvious cheap win there.
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
