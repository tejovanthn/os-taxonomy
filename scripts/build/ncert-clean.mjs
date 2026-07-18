#!/usr/bin/env node
/**
 * build/ncert-clean.mjs — NCERT English (I–VIII), EVS (III–V), Science (VI–VIII)
 * and Social Science (VI–VIII). All clean-text PDFs; all pure alignment onto the
 * existing graph (English skills, integrated environmental studies, upper-primary
 * science, and Indian history/geography/civics were all built from earlier
 * sources). Descriptions are Marble-authored factual scope summaries — no NCERT
 * text (PROVENANCE). Idempotent.
 */

import { integrateNcert, mintNs } from './ncert.mjs';
const NS = (x) => mintNs('nios-sec', x);   // nios-sec.mjs / nios-sec-*.mjs slugs
const OB = (x) => mintNs('nios-obe', x);   // nios-obe-bc.mjs + nios-obe-in-depth*.mjs slugs
const OA = (x) => mintNs('nios-obe-a', x); // nios-obe-a.mjs slugs

// ================= English (I–VIII) =================
{
  const s = (code, klass, strand, description) => ({ code, klass, strand, title: `English ${strand} (Classes ${klass})`, description });
  integrateNcert({
    subjectDoc: 'English (I–VIII)',
    standards: [
      s('ENG.C12.LSN', 'I–II', 'Listening & Speaking', 'Listening to and joining in rhymes, songs and stories; talking about oneself and one’s world.'),
      s('ENG.C12.RDG', 'I–II', 'Reading', 'Recognising letters and sounds; reading simple words and sentences with picture support.'),
      s('ENG.C12.WRT', 'I–II', 'Writing', 'Forming letters; writing words and simple sentences.'),
      s('ENG.C35.LSN', 'III–V', 'Listening & Speaking', 'Conversing, describing and narrating; following and giving simple instructions.'),
      s('ENG.C35.RDG', 'III–V', 'Reading', 'Reading stories, poems and simple information with comprehension; using a dictionary.'),
      s('ENG.C35.WRT', 'III–V', 'Writing', 'Writing paragraphs, messages and short descriptions with basic grammar and punctuation.'),
      s('ENG.C68.LSN', 'VI–VIII', 'Listening & Speaking', 'Discussing, presenting and role-playing; listening for gist and detail.'),
      s('ENG.C68.RDG', 'VI–VIII', 'Reading', 'Reading longer literary and non-fiction texts; inferring meaning and evaluating.'),
      s('ENG.C68.WRT', 'VI–VIII', 'Writing', 'Writing for varied purposes — letters, reports, narratives — with editing and revision.'),
      s('ENG.C68.GRM', 'VI–VIII', 'Grammar & Vocabulary', 'Using grammar accurately and building a rich vocabulary in context.'),
    ],
    alignments: Object.fromEntries([
      ['mt_F978c32kDr', ['ENG.C12.RDG']], ['mt__KHQttMde3', ['ENG.C12.RDG']], ['mt_of2GggtxFl', ['ENG.C12.WRT']],
      ['mt_N8CpN1EJrP', ['ENG.C12.WRT', 'ENG.C35.WRT']], ['mt_BhYJZUsErp', ['ENG.C12.WRT']],
      ['mt_mB7DVai-Uf', ['ENG.C12.LSN', 'ENG.C35.LSN']], ['mt_n6GhzDPllD', ['ENG.C12.LSN']], ['mt_4A7FYmvVhA', ['ENG.C12.LSN']],
      ['mt_bkvB7QYKwg', ['ENG.C35.LSN', 'ENG.C68.LSN']], ['mt_LNYTNpJOGT', ['ENG.C35.LSN', 'ENG.C68.LSN']],
      ['mt_k-V37x3zsF', ['ENG.C35.RDG']], ['mt_gMSFymQlrW', ['ENG.C68.RDG']], ['mt_aClzPBiS9k', ['ENG.C68.RDG']],
      ['mt_OyOYHlZ2_T', ['ENG.C35.WRT']], ['mt_ZxdfRbwkKM', ['ENG.C35.WRT']], ['mt_av-uRBrhwT', ['ENG.C68.WRT']],
      [NS('eng-functional-writing'), ['ENG.C68.WRT']], [NS('eng-note-making'), ['ENG.C68.RDG']], [NS('eng-formal-speaking'), ['ENG.C68.LSN']],
      ['mt_gbTyzvnWzr', ['ENG.C68.GRM']], ['mt_8bIXVKTdtK', ['ENG.C68.GRM']], ['mt_OLwNsTI6C7', ['ENG.C68.GRM']],
    ]),
  });
}

// ================= Environmental Studies (III–V) =================
{
  const s = (code, theme, description) => ({ code, klass: 'III–V', strand: theme, title: `EVS: ${theme}`, description });
  integrateNcert({
    subjectDoc: 'Environmental Studies (III–V)',
    standards: [
      s('EVS.FAM', 'Family and Friends', 'The child’s widening world — family and relationships, work and play, plants and animals around us.'),
      s('EVS.FOOD', 'Food', 'Where food comes from, what the body needs, and food across regions.'),
      s('EVS.SHELTER', 'Shelter', 'Homes and shelters — kinds, materials, and shelter for people and animals.'),
      s('EVS.WATER', 'Water', 'Sources and uses of water, keeping it clean, and using it wisely.'),
      s('EVS.TRAVEL', 'Travel', 'How people and things move from place to place, and communication.'),
      s('EVS.MAKE', 'Things We Make and Do', 'Materials and their uses; the things people make and the work they do.'),
    ],
    alignments: Object.fromEntries([
      ['mt_cM8YS6NXqi', ['EVS.FAM']], ['mt_13CtLTcWUB', ['EVS.FAM']], ['mt_xT6jPzyj92', ['EVS.FAM']], ['mt_L1469gt34A', ['EVS.FAM']],
      ['mt_QhLAeAlHI0', ['EVS.FOOD']], [OB('india-agriculture'), ['EVS.FOOD']], ['mt_Km5iZqQ8Vi', ['EVS.FOOD', 'EVS.WATER']],
      ['mt_ZAJvTcroFO', ['EVS.SHELTER', 'EVS.MAKE']], ['mt_SwaNNdm_Ks', ['EVS.MAKE']],
      ['mt_V2lNzEex_a', ['EVS.WATER']], ['mt_fhqVdj4BYr', ['EVS.WATER']], ['mt_uof32CdhYK', ['EVS.WATER']],
      ['mt_fwkPvwG8ET', ['EVS.TRAVEL']], [OA('ways-we-communicate'), ['EVS.TRAVEL']],
      [OA('uses-of-plants'), ['EVS.MAKE']], [OA('animals-that-help-us'), ['EVS.FAM']],
    ]),
  });
}

// ================= Science (VI–VIII) =================
{
  const s = (code, theme, description) => ({ code, klass: 'VI–VIII', strand: theme, title: `Science: ${theme}`, description });
  integrateNcert({
    subjectDoc: 'Science (VI–VIII)',
    standards: [
      s('SCI.FOOD', 'Food', 'Food sources and components; nutrition in plants and animals; crops and their production.'),
      s('SCI.MAT', 'Materials', 'Materials and their properties; separation of substances; metals and non-metals; changes and reactions.'),
      s('SCI.LIV', 'The World of the Living', 'Living things and their surroundings; cells; body systems; reproduction; classification.'),
      s('SCI.MOV', 'Moving Things, People and Ideas', 'Motion and measurement; force, friction and pressure.'),
      s('SCI.WORK', 'How Things Work', 'Electric current and circuits; magnetism.'),
      s('SCI.PHEN', 'Natural Phenomena', 'Light and reflection; sound; weather and climate; natural events.'),
      s('SCI.NAT', 'Natural Resources', 'Air, water and soil; conservation; pollution and its control.'),
    ],
    alignments: Object.fromEntries([
      ['mt_QhLAeAlHI0', ['SCI.FOOD']], ['mt_13CtLTcWUB', ['SCI.FOOD']], [OB('india-agriculture'), ['SCI.FOOD']],
      ['mt_ZAJvTcroFO', ['SCI.MAT']], ['mt_YQkUdIHO8L', ['SCI.MAT']], [NS('sci-atoms-molecules'), ['SCI.MAT']], [NS('sci-chemical-bonding'), ['SCI.MAT']],
      ['mt_xT6jPzyj92', ['SCI.LIV']], ['mt_cM8YS6NXqi', ['SCI.LIV']], ['mt_83gRQ9OPkc', ['SCI.LIV']], [NS('sci-hormones'), ['SCI.LIV']],
      [NS('sci-describing-motion'), ['SCI.MOV']], [NS('sci-newtons-laws'), ['SCI.MOV']],
      [NS('sci-work-power'), ['SCI.WORK']],
      ['mt_fI-8iqf_Id', ['SCI.PHEN']], ['mt_fhqVdj4BYr', ['SCI.NAT']], ['mt_V2lNzEex_a', ['SCI.NAT']],
      [OB('waste-management'), ['SCI.NAT']],
    ]),
  });
}

// ================= Social Science (VI–VIII) =================
{
  const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Social Science ${strand} (Class ${klass})`, description });
  integrateNcert({
    subjectDoc: 'Social Science (VI–VIII)',
    standards: [
      s('SS.HIST.C6', 'VI', 'History — Our Pasts I', 'From the earliest societies and the Indus Valley through the Vedic age and early empires to the Guptas.'),
      s('SS.HIST.C7', 'VII', 'History — Our Pasts II', 'Medieval India — the Delhi Sultanate, the Mughals and regional kingdoms, their society and culture.'),
      s('SS.HIST.C8', 'VIII', 'History — Our Pasts III', 'Modern India — colonial rule, its impact, reform, and the national movement to independence.'),
      s('SS.GEO.C6', 'VI', 'Geography', 'The Earth in the solar system; globe and maps; the domains of the Earth.'),
      s('SS.GEO.C7', 'VII', 'Geography', 'Environment; the interior of the Earth and landforms; air, water and natural vegetation.'),
      s('SS.GEO.C8', 'VIII', 'Geography', 'Resources; agriculture, industries and human resources.'),
      s('SS.POL.C6', 'VI', 'Social & Political Life', 'Diversity; government; local government and administration in village and town.'),
      s('SS.POL.C7', 'VII', 'Social & Political Life', 'Equality in democracy; the role of government in health and markets; media and advertising.'),
      s('SS.POL.C8', 'VIII', 'Social & Political Life', 'The Constitution; the parliamentary system; the judiciary; social justice and marginalisation.'),
    ],
    alignments: Object.fromEntries([
      ['mt_9UT0aF8Fmn', ['SS.HIST.C6']], [OB('india-vedic-age'), ['SS.HIST.C6']], ['mt_SBHKtfCzu3', ['SS.HIST.C6']], [OB('india-gupta-age'), ['SS.HIST.C6']],
      ['mt_FUDkWnl03o', ['SS.HIST.C7']], ['mt_fvAz0QwV5b', ['SS.HIST.C7']], [OB('india-marathas-rajputs'), ['SS.HIST.C7']],
      [OB('india-british-rule'), ['SS.HIST.C8']], [OB('india-freedom-struggle'), ['SS.HIST.C8']], [OB('india-social-reform'), ['SS.HIST.C8']],
      ['mt_zniDXv3Ko3', ['SS.GEO.C6', 'SS.GEO.C7']], [OB('india-natural-resources'), ['SS.GEO.C8']], [OB('india-agriculture'), ['SS.GEO.C8']], [OB('india-industries'), ['SS.GEO.C8']],
      [OB('india-unity-diversity'), ['SS.POL.C6']], [OB('india-democracy-government'), ['SS.POL.C6']], ['mt_FJZZUv2ewS', ['SS.POL.C6']],
      [OB('india-social-equality'), ['SS.POL.C7']], [OA('welfare-schemes'), ['SS.POL.C7']],
      ['mt_zFL9HpDF22', ['SS.POL.C8']], ['mt_WaAVnaJ3Ne', ['SS.POL.C8']], [OB('govt-judiciary'), ['SS.POL.C8']], [OB('govt-legislature'), ['SS.POL.C8']],
    ]),
  });
}
