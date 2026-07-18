#!/usr/bin/env node
/**
 * build/ncert-rest.mjs — NCERT elementary: English I–VIII, EVS III–V,
 * Science VI–VIII, Social Science VI–VIII. Pure alignment (zero new topics):
 * each maps onto the existing graph — EVS onto the OBE-derived family/food/
 * water/travel topics, Our Pasts I/II/III onto the Ancient/Medieval/Modern
 * India domains, Science onto the existing Science ladder. Marble-authored
 * factual descriptions only (no NCERT text). Idempotent.
 */

import { integrateNcert, mintNs } from './ncert.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `${strand} (${klass})`, description });
const OB = (x) => mintNs('nios-obe', x);
const NA = (x) => mintNs('nios-obe-a', x);
const NS = (x) => mintNs('nios-sec', x);

// ---- English I–VIII ----
integrateNcert({
  subjectDoc: 'English (I–VIII)',
  standards: [
    s('ENG.P', 'I–V', 'English, Primary Level', 'Building familiarity with English through the spoken word, stories and rhymes; early literacy — letters, sounds, words and first reading and writing — in an input-rich environment.'),
    s('ENG.UP', 'VI–VIII', 'English, Upper Primary Level', 'Listening, speaking, reading and writing developed in an integrated way — comprehension across text types, vocabulary growth, grammar in context, and guided to independent composition.'),
  ],
  alignments: Object.fromEntries([
    ['mt_F978c32kDr', ['ENG.P']], ['mt__KHQttMde3', ['ENG.P']], ['mt_fR0UtsSREU', []],
    ['mt_scBgiMKhG_', ['ENG.P']], ['mt_OyOYHlZ2_T', ['ENG.P']],
    ['mt_gMSFymQlrW', ['ENG.UP']], ['mt_av-uRBrhwT', ['ENG.UP']], ['mt_OLwNsTI6C7', ['ENG.UP']], ['mt_bkvB7QYKwg', ['ENG.UP']],
  ]),
});

// ---- EVS III–V (six themes) ----
integrateNcert({
  subjectDoc: 'Environmental Studies (III–V)',
  standards: [
    s('EVS.FAM', 'III–V', 'Family and Friends', 'The child’s widening world of family, relationships, work, play, animals and plants around them.'),
    s('EVS.FOOD', 'III–V', 'Food', 'Where food comes from, who grows and cooks it, and eating well.'),
    s('EVS.SHELTER', 'III–V', 'Shelter', 'Homes of people and animals, and the spaces we live in.'),
    s('EVS.WATER', 'III–V', 'Water', 'Water’s sources, uses, scarcity and care.'),
    s('EVS.TRAVEL', 'III–V', 'Travel', 'How people and things move from place to place, and journeys near and far.'),
    s('EVS.MAKE', 'III–V', 'Things We Make and Do', 'The made world — materials, crafts, work and skills.'),
  ],
  alignments: Object.fromEntries([
    [OB('what-makes-a-family'), ['EVS.FAM']], [OB('kinship-and-relatives'), ['EVS.FAM']], [OB('neighbourhood-and-community'), ['EVS.FAM']],
    ['mt_v3Vz_Pgjjv', ['EVS.FAM']], ['mt_oLHXfLujmh', ['EVS.SHELTER']], ['mt_cM8YS6NXqi', ['EVS.SHELTER']],
    ['mt_QhLAeAlHI0', ['EVS.FOOD']], [OB('growing-crops'), ['EVS.FOOD']], [NA('safe-food-clean-water'), ['EVS.FOOD', 'EVS.WATER']],
    ['mt_nRF_VRntrW', ['EVS.WATER']], [OB('clean-drinking-water'), ['EVS.WATER']],
    [NA('transport-travel'), ['EVS.TRAVEL']], [OB('road-rail-transport'), ['EVS.TRAVEL']], [OB('water-air-transport'), ['EVS.TRAVEL']],
    ['mt_ZAJvTcroFO', ['EVS.MAKE']], ['mt_rTn43s8RNX', ['EVS.MAKE']], [NA('natural-and-man-made'), ['EVS.MAKE']],
  ]),
});

// ---- Science VI–VIII (NCF themes per class) ----
integrateNcert({
  subjectDoc: 'Science (VI–VIII)',
  standards: [
    s('SCI.C6', 'VI', 'Science', 'Food and its sources; materials and their grouping; the living world and habitats; motion and measurement; light, shadows and electricity; water and air.'),
    s('SCI.C7', 'VII', 'Science', 'Nutrition in plants and animals; heat; acids and bases; physical and chemical change; weather and climate; respiration and transport in organisms; motion and time; electric current; light.'),
    s('SCI.C8', 'VIII', 'Science', 'Crop production; microorganisms; synthetic materials; force, pressure, friction and sound; ch