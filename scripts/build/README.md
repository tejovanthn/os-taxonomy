# Curriculum integration scripts

Each script here integrates one curriculum source into the dataset in `../../data/`.
They are **idempotent** (safe to re-run) and **append-only** to existing topics —
they never mutate an existing topic's content, only add standard links, new
topics, edges and clusters.

## Run order

The scripts share stable topic ids (minted from slugs) and reference each other's
topics, so run them in order, then regenerate the manifest and validate:

```bash
node scripts/build/nios-obe-a.mjs          # NIOS OBE Level A (3 courses)
node scripts/build/nios-obe-bc.mjs         # NIOS OBE Levels B & C (7 courses)
node scripts/build/nios-obe-in-depth.mjs   # decompose Indian history/geography to micro-topic grain
node scripts/build/nios-obe-in-depth2.mjs  # decompose Indian civics/society/geography
node scripts/build/nios-obe-align-patch.mjs # link a few standards that map to existing topics

node scripts/manifest.mjs                  # regenerate counts + SHA-256 checksums
node scripts/validate.mjs                  # referential integrity, codes-only invariant, checksums, DAG acyclicity
```

## The method

The goal is a connected graph at **consistent micro-topic grain**. The two failure
modes are duplicating universal content that already exists, and authoring new
content too coarsely (one topic per lesson). This method avoids both.

1. **Rights first.** Research the source's license before deciding full-text vs
   codes-only; document it in `PROVENANCE.md`. (NIOS permits reproduction with
   acknowledgment → full text. NGSS/IB/C3 are codes-only. NCERT/CBSE are stricter
   — re-check per source.)

2. **One curriculum slug per source** (e.g. `nios-obe-a`). Standard grain:
   sub-topic codes where the document lists distinct topics; lesson codes where a
   lesson is one narrative (history, science). The code scheme mirrors the source
   (`A102.L1.1`). Sibling levels share a mint namespace so they can cross-reference.

3. **Align before minting (overlap-first).** For each standard, find the best
   existing micro-topic(s) and append the standard key. Only mint a *new* topic
   where nothing in the taxonomy already teaches the idea. Roughly half of NIOS
   overlapped existing topics — universal maths/science almost always already
   exists, so it is aligned, never duplicated.

4. **Grain rules for new topics** — match the taxonomy's own conventions:
   - **One teachable idea per topic**, not one per lesson. Benchmark: a single
     ancient civilization is decomposed into ~29 micro-topics graduated across
     ages 5–14 (see the `Ancient Egypt` domain). Match that depth for comparable
     content.
   - **Bundler tell → split it:** a topic that links to ≥3 lesson standards, spans
     a wide age range, or has an "X and Y" name is doing too much.
   - **Fields:** ~25–30-word plain-language `description` ("Understand that…");
     exactly 3 observable `evidence` criteria; a parent-voice `assessmentPrompt`
     containing `{{name}}`; `centrality: null` (a derived metric, recomputed
     upstream); `type` ∈ CONCEPTUAL / PROCEDURAL / REPRESENTATIONAL / LANGUAGE / META.
   - **Age bands by subject:** Maths uses 1-year bands (9–10); History, Science,
     Social Studies and PSD use 2-year bands (5–7, 7–9, 9–11). Match the subject.
   - **New subject** only when content fits none of the existing ones (this is how
     `Social Studies` was added); otherwise a **new domain** under an existing
     subject (`Computer Basics` under Computing; `Ancient/Medieval/Modern India`
     under History).
   - **Adapt framing:** recast adult- or region-specific source content to be
     child-appropriate at honest ages, or skip it.

5. **Wire the graph.** Add prerequisite edges (`hard`/`soft` with a one-line
   reason): fine topics hang off their coarse "overview" topic and off
   chronological/dependency chains; cross-subject soft edges are fine. The graph
   must stay a DAG — `validate.mjs` enforces this.

6. **Clusters.** Add one parent-friendly summary per new
   (subject, domain, ageRangeStart) band.

7. **Seal it.** Regenerate the manifest, update `README.md` (counts + subject
   table), `PROVENANCE.md` (per-source rights) and `CHANGELOG.md`, and run
   `validate.mjs`.

8. **Audit.** After integrating, compare the new topics' grain against the
   originals — evidence count, description length, age-span *by subject*, and
   standards-per-topic — check new-topic names for accidental duplication of
   existing topics, and check any unlinked standards for alignment misses (a
   standard left unlinked that actually maps to an existing topic).
