# Changelog

All notable changes to the Marble Skill Taxonomy dataset are documented here.
Dataset releases are versioned independently of the taxonomy `version` field
(the underlying taxonomy is `v1`).

## [Unreleased] — Indian curriculum integration (local branch `indian-curriculum`)

Work-in-progress addition of Indian curricula, integrated one source at a time.

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
