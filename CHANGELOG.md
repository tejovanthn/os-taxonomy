# Changelog

All notable changes to the Marble Skill Taxonomy dataset are documented here.
Dataset releases are versioned independently of the taxonomy `version` field
(the underlying taxonomy is `v1`).

## [Unreleased] — Indian curriculum integration (local branch `indian-curriculum`)

Work-in-progress addition of Indian curricula, integrated one source at a time.

### NCERT elementary syllabi — Mathematics I–V and VI–VIII (2026-07-17)
- New source `ncert-elem` (NCERT Syllabus for Elementary Classes, NCF 2005).
  NCERT's rights are the strictest yet (no reproduction; no summarisation of
  its text) — records carry minted class×strand codes plus Marble-authored
  factual descriptions only; **no NCERT text**. See PROVENANCE.
- **Mathematics I–V + VI–VIII**: 48 class×strand standards; **97 existing
  topics aligned (100 links), zero new topics needed** — India's national
  elementary maths curriculum is fully covered by the existing Maths ladder,
  a strong cross-curriculum validation of the graph.
- In flight: Hindi I–V and Sanskrit VI–VIII (legacy-font PDFs, OCR agents);
  English I–VIII, EVS III–V, Science VI–VIII, Social Science VI–VIII to follow.

### KSGH graded music & dance examinations — the performing-arts ladders (2026-07-17)

New source `ksgh-music-exams`: the graded examination syllabus of the Karnataka
State Dr. Gangubai Hangal Music and Performing Arts University, Mysuru (scanned
Kannada, recovered via OCR agents cross-checked against page images; Marble-
authored summaries only — no verbatim text, see PROVENANCE). Graded exams encode
the ladder children actually climb, fixing the "arts are skeletons" gap:

- **Carnatic Music** (18 standards, 4 levels) → the Music subject's Carnatic
  domain grows 3 → 23 topics: the abhyasa gana ladder (varisai → alankara →
  geetam → varna → kriti), the tala and melakarta systems, raga lakshana study,
  Karnataka's Haridasa/Mysore lineages, manodharma (alapana, neraval,
  swarakalpana), pallavi, the 22 shrutis, treatises, and the full kacheri.
- **Hindustani Music** (21 standards incl. a parallel tabla ladder) → the
  Hindustani domain grows 4 → 23 topics: alankars → sargam/lakshan geets →
  chota/bada khayal → vistaar and the baithak; ornaments and taan; dhrupad/
  dhamar; thumri/tarana; gharanas; raga-rasa-time; notation; and tabla (bols &
  thekas → solo → saath-sangat).
- **Dance** (16 standards, 4 levels) → a new **Dance** subject (23rd subject),
  26 topics: the Bharatanatyam ladder (adavus → jatis → margam → kacheri →
  choreography), abhinaya (bhedas, hastas, viniyoga, navarasa, rasa theory),
  and dance traditions (eight classical forms, folk, Nataraja, treatises,
  pioneers, contemporary).
- 65 new topics, 92 edges, 18 clusters, 10 alignments of the earlier Music
  sketch topics. Ages by grade level (primary ≈ 6, vidwat ≈ 14-16).

### Age correction — typical learning ages, not course-admission ages (2026-07-16)
- The language, Sanskrit-stream, Music and Visual Arts topics from the NIOS
  Secondary integration had been stamped with the NIOS course admission age
  (14+, open schooling). The taxonomy models when children *typically* learn
  things, so **98 topics were re-aged** to typical learning ages: mother-tongue
  skills from ~6–8, Veda adhyayana from ~8 (traditionally begun after
  brahmopadesham at ~8–9), music fundamentals from ~6, art elements from ~6–7,
  story literature (Panchatantra, subhashitas) in childhood — while genuinely
  advanced content (Paninian derivation, Advaita Vedanta, mahakavya, formal
  poetics) keeps senior bands (12–16). 31 clusters re-keyed to the new bands.
- Only `ageRangeStart`/`ageRangeEnd` changed (verified field-level); graph and
  standards untouched. `scripts/build/nios-sec-ages.mjs` (idempotent).

### NIOS Secondary — the nine OCR-blocked subjects (2026-07-16)

The language-medium and Sanskrit-stream subjects, whose PDF pages were image-only
scans or garbled text. Recovered via parallel OCR (tesseract hin/san/tel/kan/tam
at 300 DPI, agent-cross-checked against rendered page images; hour/mark totals
verified arithmetically). Standard descriptions are English summaries authored
from the extractions — flagged as OCR-derived in PROVENANCE.

- **Hindi (201)** → new subject: 7 skill standards, 13 micro-topics (skills +
  sandhi/samas, word origins, karak, idioms, chhand, alankar, roles of Hindi).
- **Sanskrit (209)** → new subject: 13 standards, 12 micro-topics (4 skills +
  sandhi, declensions, conjugations, samasa, pratyaya, karaka, upasarga).
- **Telugu (205), Kannada (208), Tamil (237)** → three new subjects: 19
  micro-topics (reading poetry/prose, functional writing, Tamil's ல/ள/ழ and
  ந/ன/ண distinctions, classical-language standing, links to India's Many
  Languages and regional literature).
- **Veda Adhyayan (245)** → "Vedic Studies" domain under Sanskrit: 8 topics
  (what the Veda is, oral preservation, commentators, yajna & deities, the
  suktas incl. Shunahshepa, Vedic prakriya).
- **Sanskrit Vyakarna (246)** → "Paninian Grammar" domain under Sanskrit: 11
  topics (sutra system, Maheshvara sutras, samjna, paribhasha, rule-derived
  sandhi/subanta/karaka/krdanta), wired as deepenings of the applied grammar.
- **Bharatiya Darshan (247)** → "Indian Philosophy" domain under Indian Culture
  & Heritage: 12 topics (darshana, astika/nastika, Charvaka, Buddhist/Jain,
  Nyaya-Vaisheshika, Sankhya-Yoga, Mimamsa, Vedanta, and Advaita in depth).
- **Sanskrit Sahitya (248)** → extends Sanskrit's Literature domain: 8 topics
  (subhashitas, riddle-verses, story collections, poetics, genres, Ramayana,
  Karnabharam, Kiratarjuniyam).

All 22 requested NIOS Secondary subjects are now integrated. 58 new topics in
this batch; graph re-verified acyclic; validate.mjs green.

### NIOS Secondary — grain split pass (2026-07-16)
- A grain audit of the secondary mints (measured against the taxonomy's own age-12+ topics) found the grain sound overall — evidence count, description length and age bands all matched, coverage was complete (0 unlinked standards), no duplicates — but a tail of ~7 mints bundled two or more distinct teachable ideas. This decomposes them to grain (coarse topics kept as entry points; specifics added beneath and wired).
- **15 new micro-topics**: History — *Revolutions and the Modern Age* + *World Wars and Decolonisation*; Economics — *Challenges before the Indian Economy* + *India in the Global Economy*; Business Studies — *Banking Services* / *Insurance* / *Transport Services* / *Warehousing Services*; Accountancy — *The Profit and Loss Account* / *The Balance Sheet* / *Depreciation* / *Provisions and Reserves*; Music — *The Thaat System* / *Hindustani Vocal Forms*; Mathematics — *Concurrent Lines in a Triangle*.
- Also wired the existing *Writing a Précis* (primary) to the secondary study-skills standard and as a prerequisite of *Note-Making and Summarising*. 23 edges. Purely additive — every prior topic byte-unchanged. `scripts/build/nios-sec-depth.mjs` (idempotent). Graph re-verified acyclic.

### NIOS Secondary Curriculum 2020 — Business Studies, Accountancy, Home Science, Visual Arts, Music (2026-07-15)

The brand-new secondary subjects — each a new subject the taxonomy had nothing for. Completes all 13 text-readable NIOS Secondary subjects.
- **Business Studies (215)** → new **Business Studies** subject: 13 new micro-topics (business & commerce, forms of organisation, business services, trade & marketing, consumer protection, careers) + 5 aligned to Life Skills.
- **Accountancy (224)** → new **Accountancy** subject: 10 new micro-topics (accounting basics, the accounting equation, double-entry & journal, ledger & trial balance, depreciation, financial statements, computerised accounting).
- **Home Science (216)** → new **Home Science** subject: 9 new (meal planning, food preservation, clothing care, resource management, consumer education, child development, family, first aid) + 6 aligned to Science/Life Skills/hygiene.
- **Painting (225)** → new **Visual Arts** subject: 8 new (elements of art, colour, composition, drawing, still life/landscape, modern & contemporary Indian art) + 1 aligned.
- **Hindustani Music (242) + Carnatic Music (243)** → a single new **Music** subject: 8 new (shruti/svara/saptak, raga, tala, Hindustani forms & notation, Carnatic gamaka/forms/composers) + Indian-Culture alignment.

### NIOS Secondary Curriculum 2020 — Science, Social Science, Economics, English (2026-07-15)

The align-heavy secondary subjects — mostly aligning existing topics, minting only genuine secondary gaps.
- **Science and Technology (212)** — 25 lessons; **23 existing Science topics aligned** + **8 new** (atoms & molecules, atomic structure, chemical bonding, balancing equations, describing motion, Newton's laws, work & power, hormones).
- **Social Science (213)** — 27 lessons; **26 aligned** to the existing India history/geography/civics + world history, **3 new** (the making of the modern world, challenges to Indian democracy, peace & security).
- **Economics (214)** → a new **Economics** subject (12th subject); **9 new** micro-topics (what is economics, central problems, factors of production, demand, supply, price, markets, the Indian economy, sectors) + **12 aligned** to existing Life Skills/Maths.
- **English (202)** — skills syllabus; **12 existing English skill topics aligned** + **3 new** (functional writing, note-making & summarising, formal speaking). The prescribed reader's individual texts are not micro-topics.

### NIOS Secondary Curriculum 2020 — Mathematics (2026-07-15)
- **Mathematics (Code 211)** — align-heavy. 26 lesson standards across 6 modules;
  **27 existing Maths topics aligned** (algebra, percentages/interest, lines &
  angles, similarity, circles, coordinates, area, data, probability), and **10
  new secondary micro-topics** for the genuine gaps: rational & irrational
  numbers, solving quadratic equations, congruence of triangles, circle angle
  theorems, tangents, ruler-and-compass constructions, surface area & volume of
  solids, and **a new Trigonometry domain** (introduction + trig ratios), plus
  median & mode. 14 edges, 6 clusters.

### NIOS Secondary Curriculum 2020 — Indian Culture & Heritage (2026-07-15)
- **Indian Culture & Heritage (Code 223)** → a new **Indian Culture & Heritage**
  subject (11th subject). 21 lesson standards across 9 modules; **17 new
  micro-topics** (Understanding Culture, Religion & Philosophy, Languages &
  Literature, Art & Architecture, Science & Innovation, Society & Education,
  India and the World), and **6 existing India-history topics aligned** for the
  historical-development lessons (Vedic/Gupta/Sultanate/Mughal/Freedom/Reform).
  21 edges, 7 clusters.

### NIOS Secondary Curriculum 2020 — Psychology (2026-07-15)

Start of integrating the NIOS Secondary curriculum (classes 9–10, age 14–16),
subject by subject. New source `nios-sec-2020` (full text, NIOS terms).

- **Psychology (Code 222)** → a new **Psychology** subject (10th subject). 27
  lesson standards across 7 modules; **21 new micro-topics** (Foundations,
  Basic Psychological Processes, Human Development, Social Psychology, Mental
  Health & Well-Being, Work & Vocation), and **8 existing PSD/Science topics
  aligned** where the secondary lessons overlap (adolescence, leadership,
  communication, emotion, stress). 23 edges, 7 clusters.
- Shared scaffolding `scripts/build/nios-sec.mjs` (append-or-create the
  `nios-sec-2020` curriculum; each secondary subject is its own script).
- **Note:** of the 22 requested subjects, 13 extract cleanly; the 5 Indian
  languages (image-based pages) and 4 Sanskrit-stream subjects (garbled
  Devanagari) need OCR and are deferred. See PROVENANCE.

### Indian civics, society & geography — depth decomposition, pass 2 (2026-07-15)
- **45 new micro-topics** decomposing the remaining coarse India-specific topics — the ones that still bundled several distinct ideas (a single topic linked to 3–5 lesson standards). Coarse overview topics stay as entry points; specifics hang off them.
  - **Governance & Constitution** 4 → 17: the three organs of government each their own topic (*Legislature*, *Executive*, *Judiciary*), plus *Ways Countries Are Governed*, *State Government*, *Fundamental Rights*, *Fundamental Duties*, the three Panchayati Raj tiers (*Gram Panchayat*, *Block & District*, *Town & City Government*), and elections (*One Person One Vote*, *Political Parties*, *How Elections Are Held*).
  - **Society & Development** 4 → 18: diversity split (*languages*, *cultures & religions*, *threads of unity*, *living in peace*); social reform split (*equality for women*, *girls’ education*, *ending harmful customs*, *the small family*); population split; and the four national schemes each their own (*Swachh Bharat*, *Clean Ganga*, *Skill India*, *Digital India*).
  - **Indian Geography**: agriculture split into *crops*, *farming seasons*, *how crops are grown*; plus *types of industries*.
  - **Culture & Nation**: national symbols split into *flag*, *emblem & animal*, *anthem & song*. **Transport**: split into *road & rail*, *water & air*, *history of transport*.
  - **Science**: diseases split into *how diseases spread*, *non-communicable diseases*, *preventing disease*; safe food/water split into *keeping food safe* and *clean drinking water*. **Computing**: I/O/storage split into *input*, *output*, *storage devices*.
- **53 new prerequisite edges**. Purely additive — every prior topic byte-unchanged. `scripts/build/nios-obe-in-depth2.mjs` (idempotent). Graph re-verified acyclic.

### Indian history & geography — depth decomposition (2026-07-15)
- **42 new micro-topics** bringing the India-specific content up to the taxonomy's own grain. The B/C pass had authored Indian history at "one topic per era" (e.g. the whole Indus Valley Civilisation as a single topic), whereas the taxonomy decomposes *one* ancient civilization into ~29 micro-topics (Ancient Egypt), graduated across ages 5–14.
- **Indian history** now decomposed to that grain — Ancient India 5 → 24 topics, Medieval India 3 → 12, Modern India 3 → 13 (e.g. the Indus Valley now spans *Cities*, *Town Planning and Drainage*, *The Great Bath and Granaries*, *Seals, Crafts and Trade*, *Daily Life*, *Decline*, at ages 5–11). The coarse overview topics remain as age-appropriate entry points; the specific micro-topics hang off them and off the chronology.
- **Indian geography** split into distinct ideas (the Himalayas & rivers, the monsoon, forests & wildlife, minerals & energy).
- **52 new prerequisite edges** (chronological + hangs-off-overview) and **5 clusters**. Purely additive — every prior topic byte-unchanged. `scripts/build/nios-obe-in-depth.mjs` (idempotent). Graph re-verified acyclic.

### NIOS Open Basic Education Levels 'B' & 'C' (2026-07-14)
- **Two new sources `nios-obe-b` (70 standards) and `nios-obe-c` (70 standards)** — the continuation of Level 'A'. Level 'B': Environmental Studies, Mathematics, Basic Computer Skills. Level 'C': Social Science, Mathematics, Basic Computer Skills, and Science. Full text; same NIOS rights basis as Level 'A' — see [PROVENANCE.md](PROVENANCE.md).
- **123 existing micro-topics aligned** (149 new topic↔standard links) — the bulk of Levels B/C Maths and Science maps onto existing topics.
- **41 new micro-topics** for the big India-centric gap the taxonomy lacked:
  - **Indian history** (11 topics) — new *Ancient India*, *Medieval India*, and *Modern India* domains under History: Indus Valley → Vedic → Maurya/Ashoka → Gupta → southern kingdoms → Delhi Sultanate → Mughals/Marathas/Rajputs → British rule → reform → freedom struggle, wired as a chronological chain.
  - **Indian geography & civics** (13 Social Studies topics) — *Indian Geography* (states, physical features, resources, agriculture, industries), *Governance & Constitution* (democracy, the Constitution, Panchayati Raj, elections), and *Society & Development* (unity in diversity, gender equality, population, national schemes like Swachh Bharat/Digital India).
  - **Science** (4) — kidneys & excretion, communicable/non-communicable diseases, fibres & fabrics, waste management.
  - **Mathematics** (5) — HCF & LCM, square/cube roots, simple & compound interest, Vedic mathematics, pie charts.
  - **Computing** (8) — intermediate Computer Basics: spreadsheets, presentations, the internet, email, online safety, networks, multimedia, and online services.
  - Adult-only framing recast as upper-primary/middle-school content at honest ages.
- **55 new prerequisite edges** and **14 new clusters**. Reproducible build: `scripts/build/nios-obe-bc.mjs` (idempotent, shares stable topic ids with the Level 'A' build). Graph re-verified acyclic; `validate.mjs` green.

### NIOS Open Basic Education Level 'A' (2026-07-14)
- **New source `nios-obe-a`** — India's NIOS Open Basic Education (Adult) Level 'A': 49 standards across three courses (A-102 Environmental Study, A-103 Mathematics, A-104 Basic Computer Skills). Full text shipped under the NIOS Copyright Statement — see [PROVENANCE.md](PROVENANCE.md).
- **80 existing micro-topics aligned** to the NIOS standards they already teach (85 new topic↔standard links) — the entire A-103 Mathematics course maps onto existing Maths topics.
- **24 new micro-topics** for content the taxonomy didn't cover:
  - A new **Social Studies** subject (9th subject) — 12 topics across Family & Community, Culture & Nation, Transport & Communication, and Civic Life & Rights (Indian civics: national symbols/festivals, Right to Education, RTI, welfare schemes), with adult-only framing (e.g. MNREGA worksite rules) recast as upper-primary civics.
  - A new **Computer Basics** domain under Computing — 7 topics (computer parts, hardware/software, devices, operating system, paint, word processing).
  - 5 **Science** topics filling EVS/health gaps — natural vs man-made things, useful animals, uses of plants, personal hygiene, safe food & clean water.
- **31 new prerequisite edges** wiring the new topics into the DAG; **9 new clusters** for the new (subject, domain, age) bands.
- Reproducible build: `scripts/build/nios-obe-a.mjs` (idempotent), plus a new `scripts/manifest.mjs` regenerator. Graph re-verified acyclic; `validate.mjs` green.

## [1.0.0] — 2026-07-08

Initial public release.

### Included
- **1,590 micro-topics** across 8 subjects (`data/topics.json`).
- **3,221 prerequisite dependencies** with `hard`/`soft` strength + reasons (`data/dependencies.json`).
- **7 curricula / 3,261 standards** with 1,859 topic↔standard links (`data/curriculum-standards.json`).
- **183 domain clusters** (`data/clusters.json`).
- JSON Schemas + a dependency-free validator.

### Curriculum text shipped
- **Full text:** UK National Curriculum (OGL v3.0), Common Core ELA + Math (CCSS Public License).
- **Codes only** (verbatim text omitted pending rights clearance): NGSS K-5 + Middle School, C3 Framework, IB PYP PSPE. See [PROVENANCE.md](PROVENANCE.md).

### Excluded
- Semantic embeddings (derived / recomputable).
- All per-child and user data (never published).
