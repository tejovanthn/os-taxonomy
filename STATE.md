# STATE

Branch `indian-curriculum` (local only, no upstream PR).
Last updated 2026-07-18.

## Where things stand

2,444 topics · 4,269 edges · 4,253 standards · 342 clusters · 15 curriculum
sources · **27 subjects** · ages **0–18**. `node scripts/validate.mjs` green.
All fourteen build scripts idempotent (re-run adds zero).

The NCERT ladder is now complete end to end: `ncert-elem` (Classes I–VIII),
`ncert-sec` (IX–X) and `ncert-hsec` (XI–XII). The XI–XII pass raised the age
ceiling from 16 to 18 and added four subjects — Physics, Chemistry, Biology and
Sociology. See CHANGELOG for the per-subject breakdown.

## Single next step

**Decide whether Geography and Political Science should become subjects in their
own right, matching the treatment given to Physics, Chemistry and Biology.**

This is the one known inconsistency in the dataset. The XI–XII subject split was
authorised for the three sciences and Sociology only, so Geography and Political
Science stayed as domains under **Social Studies**, which now carries 113 topics
across seven domains spanning ages 5–18:

| Social Studies domain | Roughly |
|---|---|
| Family & Community, Culture & Nation, Transport & Communication | primary |
| Indian Geography, Society & Development, Civic Life & Rights | middle |
| Governance & Constitution | 10–18 |
| Physical Geography, Human Geography, Geographical Skills | 16–18 (new) |
| Political Theory, World Politics | 16–18 (new) |

The argument for splitting them is exactly the argument that was accepted for the
sciences: at XI–XII these are separate elective disciplines with their own
methods, and a learner elects Geography rather than "Social Studies". The
argument against is that Social Studies has no younger sibling problem — unlike
Science, it was always an umbrella — and that 27 subjects is already a lot.

If the answer is yes, the change is mechanical: the topics are already tagged
with the right domains, so it is a `subject` field rewrite in
`scripts/build/ncert-hsec-humanities.mjs` plus a rebuild. Doing it later costs
more only in that the README subject table and any downstream consumer would
change again.

## Other open gaps (unchanged, lower priority)

- **Telugu (5), Kannada (6), Tamil (8) remain thin** — secondary-derived only.
  NCERT does not publish these; fixing it needs SCERT / state-board syllabi
  (Telangana or AP SCERT, Karnataka DSERT, Tamil Nadu SCERT). This is now the
  largest genuine content gap in the dataset.
- **Urdu is not integrated.** `16Urdu.pdf` in `vol2_hsl.zip` is image-only
  (323 characters of extractable text across 18 pages) and would need full OCR
  with `tesseract -l urd`. It would add a 28th subject with no existing topics
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
