# Changelog

All notable changes to the Marble Skill Taxonomy dataset are documented here.
Dataset releases are versioned independently of the taxonomy `version` field
(the underlying taxonomy is `v1`).

## [Unreleased] — Indian curriculum integration (local branch `indian-curriculum`)

Work-in-progress addition of Indian curricula, integrated one source at a time.

### Geography decomposed to discipline grain (2026-07-20)
- A humanities-focused review pass (checking descriptions for accuracy) found the
  descriptions sound but exposed a **grain defect in Geography**: it had been
  built at 1:1 topics-per-NCF-unit, where every other senior subject was
  decomposed finer. Nine of its 14 senior topics each stood in for a 4-to-9
  sub-topic unit — *India: People, Resources and Development* was a single topic
  covering the entire Class XII India textbook, and *Atmosphere, Insolation and
  Climate* covered the 30-period Climate unit whole.
- Measured as topics-per-standard: Geography sat at **1.00** against Physics 2.85,
  Biology 4.50 and History 3.00. Geography had been promoted to a subject in its
  own right precisely to sit as a peer of these, so unit grain undercut the point.
- Decomposed the nine over-broad units into 20 topics (Geography's senior tier
  **14 → 25**, the whole subject **23 → 34**), bringing topics-per-standard to
  **1.79**. The Climate unit became atmosphere/heat budget, pressure/winds/
  circulation and water/world-climates; the Class XII India book became
  population/migration, resources, agriculture/industry and planning; oceans
  split from the biosphere, erosional landforms from weathering, and so on. The
  five genuinely single-idea units (discipline scope, maps, human-geography
  scope, sector classification, thematic mapping) were left intact.
- Political Science was checked the same way and left alone — at 16 topics across
  11 standards (1.45) it was already decomposed, with only two borderline units.
- Also fixed a stale-data bug the review surfaced independently: an early grammar
  correction to *Civil Disobedience and the Salt Satyagraha* ("a everyday" →
  "an everyday") had been made in the build script but never rebuilt into the
  data. A script-vs-data diff across all 420 mints found this as the only real
  drift and it is now corrected.
- History descriptions were read in full for factual and interpretive accuracy;
  no errors found.

### Content-coverage review: titles that promise what the body omits (2026-07-19)
- The grain pass had found *Alcohols, Phenols and Ethers* covering no ethers, and
  noted that this bug class was worth searching for systematically rather than
  stumbling on. This pass did that search.
- A naive title-word-against-body check is useless here — it flagged 251 of 433
  topics, almost all false positives, because descriptions deliberately
  paraphrase in plain language (*"a fluid pushes up with a force equal to the
  weight displaced"* is Archimedes' principle, and should not have to say so).
  Narrowing to **titles that enumerate a coordinate list** — the actual ethers
  pattern, where one item of an *A, B and C* title is silently dropped — gave 19
  candidates, of which **two were real**:
  - **Attention** was missing from *Sensation, Attention and Perception*. NCERT's
    unit covers attentional processes and selective and sustained attention as a
    distinct block, and the secondary ladder already had an attention topic, but
    the senior topic addressed only sensation and perception in its description,
    all three evidence items and its prompt. Now split out as
    *Attention: Selective and Sustained*.
  - **Salt hydrolysis** was named but not covered in *Buffers, Salt Hydrolysis and
    Solubility Product* — a topic created during the grain pass, so this bug was
    introduced by the very change that was fixing the same bug elsewhere.
    Retitled *Buffers and Solubility Equilibria* with hydrolysis now covered.
- The other 17 candidates were each checked and confirmed as paraphrase.
- **Factual accuracy was spot-checked for the first time**, across roughly 50
  descriptions spanning all three science subjects, mathematics and the newly
  split topics. No errors found.
- **2,461 topics · 4,355 edges.**

### Grain review: decomposing bundled micro-topics (2026-07-19)
- Earlier grain audits only checked **format** invariants — three evidence items,
  null centrality, age span, no topic carrying three or more standards. None of
  them asked the question that matters: *is this one teachable idea, or several?*
- Applied a sharper test — **does the description state one organising claim, or
  two-plus independent ones, and do the evidence items partition onto them?**
  Seventy-seven topics have compound names, but most are legitimately a single
  idea (*Marx, Durkheim and Weber* is one comparison; *Sets, Subsets and Set
  Operations* is one idea). **Sixteen genuinely bundled two ideas**, and they
  were almost entirely in the XI–XII sciences, where concept density is highest.
- Split 16 topics into 32 (**2,444 → 2,460 topics, +23 edges**):
  Physics — calorimetry from heat transfer, standing waves from the Doppler
  effect, drift velocity from resistivity, Kirchhoff's laws from the bridge and
  potentiometer, the magnetic dipole from Earth's magnetism and materials, image
  formation from total internal reflection, radioactivity from binding energy,
  and semiconductors and diodes from the transistor.
  Chemistry — ionic equilibrium from buffers and solubility, electrolysis from
  corrosion, alcohols and phenols from ethers.
  Biology — sex determination from linkage, DNA replication from protein
  synthesis, cancer from AIDS and substance abuse, population growth from
  communities.
  Psychology — environmental psychology from applied social problems.
- **Fixed a content gap found by the same review:** *Alcohols, Phenols and Ethers*
  named ethers in its title but covered none of them in its description or
  evidence. Ethers now has its own topic.
- The 18 remaining science compound names were each checked and kept: their
  descriptions state a single claim that the evidence tests from several angles.

### Verification pass: graph connectivity and senior-ladder anchoring (2026-07-19)
- A full re-audit of the three NCERT passes found the data valid and idempotent
  but the **graph badly under-connected**, which validation cannot detect.
- **Undirected connectivity check: 19 components, 48 NCERT topics stranded.**
  Whole chains had been built internally but never anchored to the existing
  ladder — the French Revolution and Russian Revolution sequence, the
  industrialisation sequence, the medieval-world sequence, the Class XI–XII
  geography-skills and Physics rotational-mechanics chains, and several more.
  Now **5 components**, and the four non-main ones contain no NCERT topic at all
  (Visual Arts, Home Science, Kannada, Dance — pre-existing gaps, left alone).
- **Psychology, Business Studies and Accountancy had zero edges** joining their
  new 16–18 ladder to their existing 14–16 ladder, so each subject read as two
  disconnected halves. NIOS secondary already teaches much of Class XI commerce
  and psychology descriptively; the XI–XII topics are the deeper treatment and
  the graph now shows that progression (38 anchor edges added) instead of
  silently restating it.
- **61 prerequisite edges added in total**; no topics added or removed beyond one
  rename. `Depreciation, Provisions and Reserves` existed twice in Accountancy
  with identical names at 14–16 and 16–17; the senior one is now
  *Depreciation Methods, Provisions and Reserves*.
- Corrected four documented counts that had drifted from the data: ncert-sec
  links (297 → 423 at that commit, 435 now), ncert-hsec edges (350 → 422),
  ncert-sec total links (305 → 435) and the Science-anchor edge count (69 → 70).

### Geography and Political Science split out as subjects, from age 14 (2026-07-18)
- Resolves the inconsistency left by the XI–XII pass, where Physics, Chemistry
  and Biology were promoted out of Science but the equivalent Social Science
  components were not. **Subjects 27 → 29.**
- **The split is at age 14 (Class IX)**, which is where NCERT itself stops
  issuing a single composite Social Science syllabus and publishes separate
  documents for History, Geography, Political Science and Economics. The
  existing data agreed independently: no Social Studies topic in the affected
  domains started at 13, so the ladder already had a clean break there. Below 14
  the umbrella is the right unit — a nine-year-old learning about their
  neighbourhood is not doing geography as a discipline.
- **Geography (23 topics, ages 14–18)** — domains Geography of India (11),
  Human Geography (5), Physical Geography (4), Geographical Skills (3).
- **Political Science (23 topics, ages 14–18)** — domains Indian Constitution
  (9), Indian Politics (7), Political Theory (4), World Politics (3). The
  Governance & Constitution material was separated by what each topic is
  actually about: the constitutional framework, or the practice of Indian
  politics.
- **Social Studies keeps 67 topics at ages 5–16** — Society & Development,
  the pre-14 Governance & Constitution and Indian Geography ladders, Culture &
  Nation, Transport & Communication, Family & Community and Civic Life & Rights.
- With this, all five components of NCERT's Social Science — History, Geography,
  Political Science, Economics and (at XI–XII) Sociology — exist as subjects in
  their own right at the senior level.
- Applied by `scripts/build/subject-split-geography-polsci.mjs`, which is
  rule-based rather than a hard-coded id list, so it is idempotent and will also
  catch any topic added to these domains later. The source build scripts were
  updated to emit the new subjects directly, and verified against the data — a
  rebuild from scratch produces the same assignment. The migration is still
  required for topics no build script owns (e.g. *Challenges to Indian
  Democracy*, which came from NIOS).

### NCERT higher secondary — Classes XI–XII, all subjects (2026-07-18)
- New source `ncert-hsec` (NCERT Syllabus for Higher Secondary Classes XI–XII,
  NCF 2005), from the same Volume II zip as `ncert-sec`. Same red-tier rights
  posture: minted class×unit codes plus Marble-authored factual descriptions
  only; **no NCERT text**. See PROVENANCE.
- **This raises the dataset's age ceiling from 16 to 18.** Every subject
  previously topped out at 16; senior-secondary specialist content now extends
  the graph to the end of school.
- **225 standards, 344 new topics, 422 new edges, 23 new clusters.** Unlike the
  IX–X pass this is overwhelmingly minting rather than aligning — probes had
  confirmed calculus, thermodynamics, organic chemistry, electrostatics,
  coordination compounds, molecular genetics and sociology were all absent.
  Every one of the 225 standards is linked to at least one topic.
- **Four new subjects (23 → 27).** Physics (49 topics), Chemistry (46) and
  Biology (41) become subjects in their own right rather than domains under
  Science, matching how they are elected at this stage and following the
  precedent of Economics, Business Studies and Accountancy, which already
  occupied only the senior band. Science therefore tops out at 16 and the three
  senior ladders hang off it by cross-subject prerequisite edges (70 of them).
  Sociology (35 topics) is added as a subject parallel to the existing
  Psychology.
- **Existing subjects extended to 18:** Mathematics (+34, with new Calculus,
  Sets/Relations & Functions, Vectors & 3-D Geometry and Linear Programming
  domains), Psychology (+25), Business Studies (+22), Social Studies (+30 across
  new Physical Geography, Human Geography, Political Theory and World Politics
  domains), History (+24), Accountancy (+17), Economics (+13), English (+5),
  Sanskrit (+3).
- History XII is organised by **source type rather than chronology**, so its
  topics are framed around reading a class of evidence — inscriptions, an epic,
  a stupa, a revenue compilation, court chronicles, ruins, travellers' accounts,
  official reports, photographs, oral testimony, assembly debates.
- At the time of this pass Geography and Political Science were left as senior
  domains under Social Studies; the entry above promoted them to subjects
  shortly afterwards. The Social Studies (+30) figure therefore counts topics
  that have since moved into those two subjects.
- Sanskrit XI–XII recovered by OCR of 300 DPI renders (tesseract `san`/`hin`)
  cross-checked against page images. Urdu remains image-only and un-integrated.

### NCERT secondary syllabi — Classes IX–X, all subjects (2026-07-18)
- New source `ncert-sec` (NCERT Syllabus for Secondary Classes IX–X, NCF 2005),
  from Volume II of the syllabus (`vol2_hsl.zip`). Same red-tier rights posture
  as `ncert-elem`: minted class×unit codes plus Marble-authored factual
  descriptions only; **no NCERT text**. See PROVENANCE.
- **Scope decision:** Classes IX–X only. The same volume carries Classes XI–XII
  (Physics, Chemistry, Biology, Sociology, Psychology, Business Studies,
  Accountancy and the elective languages), which sit above the dataset's age
  ceiling of 16 and would require extending it to 18. That is a deliberate
  follow-up, planned in `STATE.md`, not an oversight.
- **156 standards** across Science, Mathematics, History, Geography, Political
  Science, Economics, English, Hindi and Sanskrit; **64 new topics** and 423
  topic→standard links. No standard is left unlinked.
- **Science IX–X: 121 existing topics aligned, only 5 new** — the strongest
  alignment result yet. NCERT's seven NCF themes map almost entirely onto the
  existing science ladder. The five mints are the genuine holes: *Buoyancy and
  Archimedes' Principle*, *The Mole Concept*, *Valency and Chemical Formulae*,
  *Echo, Ultrasound and the Range of Hearing*, and *Tropic Movements and Plant
  Hormones*.
- **Mathematics IX–X: 43 topics aligned, 13 new** — filling real gaps rather
  than duplicating: polynomials and the remainder/factor theorems, Euclid's
  axioms, Heron's formula, arithmetic progressions, the distance and section
  formulae, similar triangles and proportionality, heights and distances, the
  frustum, the ogive, and the two appendices on proof and modelling.
- **History IX–X: 26 new topics** — the one genuinely content-adding subject.
  The graph previously carried just three broad *Modern World* bundlers at this
  age. Each NCERT theme is decomposed into distinct teachable ideas (the French
  and Russian revolutions and Nazism each split into three), avoiding the
  history under-decomposition of earlier passes.
- **Geography, Political Science and Economics: 58 aligned, 16 new** — existing
  civics and Indian-geography coverage sits at ages 9–13, so the senior
  treatments were missing: resource planning, soil and land degradation, water
  scarcity and rainwater harvesting, population composition; what democracy is,
  the making of the Constitution, power sharing and federalism, social
  divisions, outcomes of democracy, social movements; and human capital,
  poverty, food security, measuring development, credit, and consumer rights.
- **English, Hindi and Sanskrit: 61 aligned, 4 new** — near-pure alignment.
  Checked before minting, **Sanskrit already carried the entire prescribed
  grammar ladder** (sandhi, shabdarupa, dhaturupa, upasarga/avyaya, pratyaya,
  karaka, samasa) in both the Grammar and Paninian Grammar domains, so the
  known "thin Sanskrit" gap turned out to be thinner than recorded; only senior
  composition was missing. Hindi gained sentence transformation, practical
  writing and media language.
- Hindi and Sanskrit syllabus pages use non-Unicode legacy Devanagari fonts and
  were recovered by OCR of 300 DPI renders (tesseract `hin`/`san`),
  cross-checked against the page images. Urdu is image-only and not integrated.
- **Gap-fill after a verification pass (same day):** auditing every standard
  against the age of its best-aligned topic exposed eight standards whose only
  alignments were 3–7 years younger — i.e. a senior idea papered over by a
  young topic. Added 8 topics: *Areas on the Same Base and Between the Same
  Parallels*; *Improvement in Food Resources* (a new Science domain **Food &
  Agriculture**, the NCF theme had no Science topic at all) and *Periodic
  Classification and Periodic Trends*; and for geography *India's Physiographic
  Divisions*, *India's Drainage Systems*, *Indian Agriculture: Cropping Patterns
  and Reforms*, *Industrial Location, Pollution and Sustainable Development* and
  *Transport, Communication and Trade in Development*. Final totals for
  `ncert-sec`: 156 standards, **72 new topics**, 435 links. The only standards
  still aligned solely to young topics are four Hindi/Sanskrit listening,
  speaking and varnamala skills — correct by design, since those are learned
  well before Class IX (typical learning age, not course-admission age).

### NCERT elementary syllabi — Mathematics I–V and VI–VIII (2026-07-17)
- New source `ncert-elem` (NCERT Syllabus for Elementary Classes, NCF 2005).
  NCERT's rights are the strictest yet (no reproduction; no summarisation of
  its text) — records carry minted class×strand codes plus Marble-authored
  factual descriptions only; **no NCERT text**. See PROVENANCE.
- **Mathematics I–V + VI–VIII**: 48 class×strand standards; **97 existing
  topics aligned (100 links), zero new topics needed** — India's national
  elementary maths curriculum is fully covered by the existing Maths ladder,
  a strong cross-curriculum validation of the graph.
- **Hindi I–V** (recovered via OCR of the legacy-font PDF): 9 band/class
  standards; **4 new primary-literacy topics** — *The Varnamala and Matras*
  (5–7), *First Reading in Hindi* (6–8), *Writing the Aksharas* (5–7), *First
  Hindi Grammar* (8–10) — wired beneath the existing Hindi topics (reading
  prose now hard-requires first reading; sentence structure requires first
  grammar), plus 10 alignments and a cross-language edge from English letter-
  sound knowledge to the varnamala.
- **Sanskrit VI–VIII** (via OCR): 6 class standards capturing the graded
  grammar progression (declensions by stem class; lakaras growing 2→3→5;
  sandhi/upasarga/pratyaya staged at Class VIII); pure alignment — 10 existing
  Sanskrit topics linked, zero new topics.
- **English I–VIII, EVS III–V, Science VI–VIII, Social Science VI–VIII**
  (clean-text PDFs): 32 further class/theme standards, **all pure alignment —
  zero new topics** (67 existing topics linked). NCERT's integrated
  environmental studies, upper-primary science, and Class VI–VIII Indian
  history/geography/civics all map onto topics already built from the UK NC,
  Common Core and NIOS. Every one of the 95 `ncert-elem` standards is now
  linked to at least one topic.
- Net for NCERT elementary across all six documents: 95 standards, 4 new
  primary-Hindi topics, ~230 topic→standard links — India's national
  elementary curriculum is now cross-referenced throughout the graph.

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
