# Changelog

All notable changes to the Marble Skill Taxonomy dataset are documented here.
Dataset releases are versioned independently of the taxonomy `version` field
(the underlying taxonomy is `v1`).

## [Unreleased] — Indian curriculum integration (local branch `indian-curriculum`)

Work-in-progress addition of Indian curricula, integrated one source at a time.

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
