# Provenance & third-party licensing

The micro-topics, the prerequisite graph, and all of Marble's authored text are original work, released under ODbL 1.0 + CC BY-SA 4.0 (see [README](README.md#license)).

**`data/curriculum-standards.json` is different.** Those standards are extracted from external curriculum frameworks that Marble does **not** own and **cannot** relicense. You can only receive from us the rights the upstream holders grant. Each source's terms — and exactly what we ship — are below.


## The "codes-only" distinction

For encumbered sources we ship only the **standard code** (e.g. `1-ESS1-1`) and its key — a short **factual identifier**, low copyright risk — and we **omit the verbatim standard text** (`description`, `clarificationStatement`, etc.). The topic→standard *links* in `topics.json` are unaffected, so "this topic maps to standard X" is preserved throughout. Sources marked `textIncluded: false` in `curriculum-standards.json` are codes-only.

## Per-source terms

### 🟢 `uk-nc-2013` — The National Curriculum in England (KS1–2) — **full text**
- **Publisher / rights:** UK Department for Education. © Crown copyright.
- **License:** [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/). Permits commercial use, adaptation, and redistribution. **No share-alike.**
- **Required notice:** *"Contains public sector information licensed under the Open Government Licence v3.0."*
- **We ship:** full standard text.

### 🟢 `nios-obe-a`, `nios-obe-b`, `nios-obe-c` — NIOS Open Basic Education (Adult), Levels 'A'/'B'/'C' (India) — **full text**
- **Publisher / rights:** National Institute of Open Schooling (NIOS), India — an autonomous body under the Ministry of Education.
- **License:** the [NIOS Copyright Statement](https://nios.ac.in/terms-conditions.aspx) states: *"Material featured on this site may be reproduced free of charge in any format or media without requiring specific permission. This is subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context. Where the material is being published or issued to others, the source must be prominently acknowledged."* This is an OGL-style permission (permits commercial use and redistribution). It does **not** grant a share-alike relicense, so these records remain under the NIOS terms, **not** ODbL.
- **Required notice:** *"Contains material from the National Institute of Open Schooling (NIOS), reproduced under its Copyright Statement. Source: https://nios.ac.in."*
- **We ship:** full standard text (the course lesson/sub-topic descriptions), distilled from the OBE curriculum documents — Level 'A' ([Aleveleng.pdf](https://nios.ac.in/media/documents/Aleveleng.pdf)), Level 'B' ([Bleveleng.pdf](https://nios.ac.in/media/documents/Bleveleng.pdf)), and Level 'C' ([Cleveleng.pdf](https://nios.ac.in/media/documents/Cleveleng.pdf)) — and from the **NIOS Secondary Curriculum 2020** ([seccurriculum2020.pdf](https://nios.ac.in/media/documents/seccurriculum2020.pdf), curriculum slug `nios-sec-2020`), covering the secondary (class 9–10) subjects. Between them these cover Environmental Study/Studies, Mathematics, Basic Computer Skills, Social Science, Science, Psychology, and other secondary subjects. The language-medium subjects (Hindi, Sanskrit, Telugu, Kannada, Tamil, and the Sanskrit-stream courses Veda Adhyayan, Sanskrit Vyakarna, Bharatiya Darshan, Sanskrit Sahitya) were embedded as image-only scans or with a broken text layer; their syllabi were recovered via OCR (tesseract, 300 DPI) cross-checked against the rendered page images. Standard descriptions for these subjects are English summaries authored from that extraction rather than verbatim source text; totals were verified arithmetically where the source states them.

### 🟡 `ksgh-music-exams` — Karnataka State Dr. Gangubai Hangal Music & Performing Arts University, Graded Examinations — **summaries only**
- **Publisher / rights:** Karnataka State Dr. Gangubai Hangal Music and Performing Arts University, Mysuru ([musicuniversity.ac.in](https://musicuniversity.ac.in)). No open license stated.
- **What we ship:** the graded-examination structure (Prathamika/Madhyamika/Vidwat-Purva/Vidwat levels for Carnatic music, Hindustani music incl. tabla, and Bharatanatyam) with **Marble-authored English summaries** of each paper's content — **no verbatim source text**. The source document is scanned Kannada ([Syllabus-Copy.pdf](https://musicuniversity.ac.in/wp-content/uploads/2025/03/Syllabus-Copy.pdf)); content was recovered via OCR cross-checked against the rendered page images.
- These records are Marble-authored summaries (CC BY-SA 4.0) describing the university's syllabus structure; the underlying syllabus remains © the university.

### 🔴 `ncert-elem` — NCERT Syllabus for Elementary Classes, NCF 2005 (India) — **Marble summaries only, no NCERT text**
- **Publisher / rights:** National Council of Educational Research and Training (NCERT), India. NCERT's [copyright policy](https://osre.ncert.gov.in/copyright-policy) prohibits reproduction of its website content without permission, and its [e-content license](https://epathshala.nic.in/pages.php?id=license&ln=en) bars adaptation or summarisation of NCERT text without written permission.
- **What we ship:** minted codes (class × strand/skill) plus **Marble-authored one-line factual descriptions** of what each class covers — facts about the curriculum, not NCERT's expression. No NCERT text is reproduced. Sources: the syllabus PDFs at [ncert.nic.in/syllabus.php](https://ncert.nic.in/syllabus.php) (Hindi I–V and Sanskrit VI–VIII recovered via OCR of rendered pages, as their embedded fonts are non-Unicode).
- These summary records are Marble-authored (CC BY-SA 4.0); the NCERT syllabus itself remains © NCERT. Obtain NCERT permission before shipping any verbatim syllabus text.

### 🔴 `ncert-sec` — NCERT Syllabus for Secondary Classes IX–X, NCF 2005 (India) — **Marble summaries only, no NCERT text**
- **Publisher / rights:** National Council of Educational Research and Training (NCERT), India — the same rights posture as `ncert-elem` above: NCERT's [copyright policy](https://osre.ncert.gov.in/copyright-policy) prohibits reproduction of its content without permission, and its [e-content license](https://epathshala.nic.in/pages.php?id=license&ln=en) bars adaptation or summarisation of NCERT text without written permission.
- **What we ship:** minted codes (class × unit/strand) plus **Marble-authored one-line factual descriptions** of what each unit covers — facts about the curriculum, not NCERT's expression. No NCERT text is reproduced.
- **Source:** Volume II of the syllabus at [ncert.nic.in/syllabus.php](https://ncert.nic.in/syllabus.php), distributed as `vol2_hsl.zip` (*Syllabus for Secondary and Higher Secondary Levels*). Note that `pdf/syllabus/Preliams2.pdf` linked from that page is only the volume's front matter — the subject documents are inside the zip.
- **Scope:** Classes IX–X only. The same volume carries Classes XI–XII, which sit above this dataset's age range and are deliberately out of scope — see `STATE.md`.
- **OCR:** the Hindi and Sanskrit documents use non-Unicode legacy Devanagari fonts, so their content was recovered by OCR of pages rendered at 300 DPI (tesseract `hin`/`san`) and cross-checked against the page images. The Urdu document is image-only and was not integrated.
- These summary records are Marble-authored (CC BY-SA 4.0); the NCERT syllabus itself remains © NCERT. Obtain NCERT permission before shipping any verbatim syllabus text.

### 🟡 `ccss-ela`, `ccss-math` — Common Core State Standards — **full text**
- **Publisher / rights:** © 2010 National Governors Association Center for Best Practices (NGA Center) and Council of Chief State School Officers (CCSSO).
- **License:** the CCSS Public License grants *"a limited, non-exclusive, royalty-free license to copy, publish, distribute, and display the Common Core State Standards **for purposes that support the Common Core State Standards Initiative**."* This is **purpose-limited**, and it does **not** clearly grant derivative-work or sublicensing rights — so the CCSS-derived records remain under the CCSS Public License, **not** ODbL.
- **Required notice:** *"© Copyright 2010 National Governors Association Center for Best Practices and Council of Chief State School Officers."*
- **We ship:** full standard text, under the CCSS Public License.

### 🔴 `ngss-k5`, `ngss-ms` — Next Generation Science Standards — **codes only**
- **Publisher / rights:** copyright held by the National Academies Press. *"NGSS"* and *"Next Generation Science Standards"* are **registered trademarks of WestEd**.
- **License:** non-commercial entities may freely copy/adapt. **Commercial** entities may use the standards only with restrictions — including submitting samples for approval and a mandatory trademark disclaimer. Not relicensable under ODbL.
- **Required notice (if referencing NGSS):** *"NGSS is a registered trademark of WestEd. Neither WestEd nor the lead states and partners that developed the Next Generation Science Standards were involved in the production of this product, and do not endorse it."*
- **We ship:** codes/keys only (verbatim text omitted). To include full NGSS text, obtain WestEd clearance first.

### 🔴 `c3-social-studies` — C3 Framework for Social Studies — **codes only**
- **Publisher / rights:** © National Council for the Social Studies (NCSS).
- **License:** permission-based; redistribution of the framework text requires NCSS permission.
- **We ship:** codes/keys only. Obtain NCSS permission before shipping full text.

### 🔴 `ib-pyp-pspe` — IB PYP Personal, Social & Physical Education Scope & Sequence — **codes only**
- **Publisher / rights:** © International Baccalaureate Organization (IBO).
- **License:** IB content is copyrighted and IBO is protective of it; redistribution requires explicit IB permission. This is the most restrictive source.
- **We ship:** codes/keys only. Do not ship full text without IB permission.

## Changing what ships

The export tool takes a per-source switch. To (re)include a source's full text after clearing rights, regenerate with that slug removed from the codes-only set:

```bash
# ship everything verbatim
DATABASE_URL=… node exportTaxonomy.mjs --codes-only=
# default (encumbered sources codes-only)
DATABASE_URL=… node exportTaxonomy.mjs
```
