#!/usr/bin/env node
/**
 * build/nios-sec-sanskrit.mjs — NIOS Secondary Sanskrit (Code 209) → a new
 * "Sanskrit" subject. Source pages are image-only scans; syllabus recovered by
 * OCR (tesseract `san`, 300 DPI) — see scratchpad sec-sanskrit-extract.md.
 * Skill + component grain standards (the syllabus enumerates its grammar
 * components) and micro-topics. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';
import { createHash } from 'node:crypto';

const subject = { name: 'Sanskrit', courseCode: '209' };
const SK = 'Sanskrit';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('209.LSN', 'Skills', 'Listening (श्रवणकौशलम्)', 'Listening (श्रवणकौशलम्)', 'Recognise the distinctive sounds of Sanskrit on hearing them and grasp the meaning of simple Sanskrit sentences by listening.'),
  std('209.VAC', 'Skills', 'Recitation (वाचनकौशलम्)', 'Recitation and Oral Reading (वाचनकौशलम्)', 'Pronounce Sanskrit sounds and sentences correctly and recite verse rhythmically (सस्वर).'),
  std('209.RDG', 'Skills', 'Reading (पठनकौशलम्)', 'Reading Comprehension (पठनकौशलम्)', 'Grasp the gist of Sanskrit prose, poetry and drama passages.'),
  std('209.WRT', 'Skills', 'Writing (लेखनकौशलम्)', 'Writing (लेखनकौशलम्)', 'Write dictated words and sentences with correct spelling, transcribe sandhi and samasa words, summarise stories, describe pictures, and order jumbled sentences.'),
  std('209.TXT', 'A. Textbook (पाठ्यपुस्तकम्)', 'Textbook study', 'Textbook Study: Prose, Poetry and Drama', 'Study Sanskrit prose, poetry and drama passages — gist (भावार्थ), question formation, author and work introductions, and character sketches.'),
  std('209.GRM.1', 'B. Applied Grammar (प्रायोगिक-व्याकरणम्)', 'वर्णपरिचयः, सन्धिः', 'Letters, Articulation and Sandhi', 'Know the letters and their points of articulation, and vowel, consonant and visarga sandhi.'),
  std('209.GRM.2', 'B. Applied Grammar (प्रायोगिक-व्याकरणम्)', 'शब्दरूपाणि', 'Noun Declensions (शब्दरूपाणि)', 'Decline vowel-stem and consonant-stem nouns and pronouns, and know the numerals.'),
  std('209.GRM.3', 'B. Applied Grammar (प्रायोगिक-व्याकरणम्)', 'धातुरूपाणि', 'Verb Conjugations (धातुरूपाणि)', 'Conjugate common verbs across the ganas (भ्वादि, अदादि, जुहोत्यादि, दिवादि, स्वादि, तुदादि, तनादि, क्र्यादि, चुरादि).'),
  std('209.GRM.4', 'B. Applied Grammar (प्रायोगिक-व्याकरणम्)', 'समासाः', 'Compounds (समासाः)', 'Form and dissolve the compounds — अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वन्द्व, बहुव्रीहि.'),
  std('209.GRM.5', 'B. Applied Grammar (प्रायोगिक-व्याकरणम्)', 'प्रत्ययाः', 'Suffixes (प्रत्ययाः)', 'Use krt, taddhita and feminine suffixes (क्त्वा, ल्यप्, तुमुन्, क्त, शतृ, तव्यत्, त्व, तल्, मतुप्, टाप्, ङीप् and others).'),
  std('209.GRM.6', 'B. Applied Grammar (प्रायोगिक-व्याकरणम्)', 'कारकम्', 'Case Relations (कारकम्)', 'Use the karaka case-relations and upapada vibhaktis correctly.'),
  std('209.GRM.7', 'B. Applied Grammar (प्रायोगिक-व्याकरणम्)', 'उपसर्गाः, अव्ययानि', 'Prefixes and Indeclinables', 'Use common upasargas (prefixes) and avyayas (indeclinables), taught contextually with the lessons.'),
  std('209.CMP', 'C. Composition (रचना)', 'रचना', 'Composition (रचना)', 'Write paragraphs from hints, letters and picture descriptions in Sanskrit, and answer questions on unseen prose passages.'),
];

const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: SK, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('sa-listening', 'Speaking & Listening', 'Listening to Sanskrit', 'LANGUAGE',
    'Recognise the distinctive sounds of Sanskrit by ear — final vowels and consonants, visarga, anusvara and conjuncts — and grasp the meaning of simple spoken Sanskrit sentences.',
    ['Distinguish Sanskrit sounds like visarga and anusvara by ear', 'Follow a simple spoken Sanskrit sentence', 'Respond appropriately to simple spoken Sanskrit'],
    'Can {{name}} follow simple spoken Sanskrit — hearing the special sounds correctly — and respond to it?', ['nios-sec-2020:209.LSN']),
  T('sa-recitation', 'Speaking & Listening', 'Pronouncing and Reciting Sanskrit', 'LANGUAGE',
    'Pronounce Sanskrit correctly — its vowels, consonants and conjuncts from their proper points of articulation — and recite verses rhythmically (सस्वर).',
    ['Pronounce Sanskrit sounds from their correct points of articulation', 'Read Sanskrit sentences aloud accurately', 'Recite a Sanskrit verse rhythmically'],
    'Can {{name}} pronounce Sanskrit accurately and recite a shloka with proper rhythm?', ['nios-sec-2020:209.VAC']),
  T('sa-reading', 'Reading', 'Reading Simple Sanskrit', 'LANGUAGE',
    'Read simple Sanskrit prose, poetry and drama passages and grasp their gist (सार) — including unseen passages — using the vocabulary and grammar learned.',
    ['Read a simple Sanskrit passage and state its gist', 'Answer questions on an unseen Sanskrit passage', 'Work out unfamiliar words from context and word-parts'],
    'Can {{name}} read a simple Sanskrit passage — prose or verse — and explain what it says?', ['nios-sec-2020:209.RDG', 'nios-sec-2020:209.CMP']),
  T('sa-literature', 'Reading', 'Sanskrit Literature: Prose, Poetry and Drama', 'CONCEPTUAL',
    'Study Sanskrit literature across its genres — prose (गद्य), poetry (पद्य) and drama (नाट्य) — knowing the authors and works read, their gist (भावार्थ), and sketching their characters.',
    ['Name genres of Sanskrit literature and an example studied', 'Give the gist of a studied passage', 'Sketch a character from a studied work'],
    'Can {{name}} talk about the Sanskrit texts they have studied — the work, its author, its gist and its characters?', ['nios-sec-2020:209.TXT']),
  T('sa-writing', 'Writing', 'Writing Simple Sanskrit', 'PROCEDURAL',
    'Write simple Sanskrit correctly — take dictation with correct spelling, transcribe sandhi and compound words, summarise a story, describe a picture, and compose short paragraphs and letters.',
    ['Write dictated Sanskrit with correct spelling', 'Summarise a story in simple Sanskrit sentences', 'Describe a picture or write a short letter in Sanskrit'],
    'Can {{name}} write simple Sanskrit — from dictation, a story summary, or a few sentences describing a picture?', ['nios-sec-2020:209.WRT', 'nios-sec-2020:209.CMP']),
  T('sa-sandhi', 'Grammar', 'Sanskrit Sandhi', 'LANGUAGE',
    'Understand sandhi — the sound changes where words and word-parts join — across its three kinds: vowel sandhi (स्वरसन्धि), consonant sandhi (व्यञ्जनसन्धि) and visarga sandhi (विसर्गसन्धि).',
    ['Join two words applying a vowel sandhi rule', 'Split a sandhi-joined word into its parts', 'Name the three kinds of sandhi'],
    'Can {{name}} join and split Sanskrit words using sandhi — vowel, consonant and visarga?', ['nios-sec-2020:209.GRM.1']),
  T('sa-declensions', 'Grammar', 'Sanskrit Noun Declensions', 'LANGUAGE',
    'Decline Sanskrit nouns and pronouns — vowel-stem words like बालक, लता and नदी, consonant-stem words like राजन् and आत्मन्, and the pronouns — across the cases and numbers.',
    ['Decline a vowel-stem noun across cases and numbers', 'Decline a common pronoun (तत्, किम्, अस्मद्)', 'Pick the correct declined form for a sentence'],
    'Can {{name}} decline common Sanskrit nouns and pronouns — like बालक or नदी — through their cases?', ['nios-sec-2020:209.GRM.2']),
  T('sa-conjugations', 'Grammar', 'Sanskrit Verb Conjugations', 'LANGUAGE',
    'Conjugate common Sanskrit verbs — भू, पठ्, गम्, दृश्, कृ, दा and others across the verb classes (gana) — in the main tenses and moods used at this level.',
    ['Conjugate a common verb like पठ् in the present tense', 'Recognise a verb’s root and class', 'Choose the correct verb form for person and number'],
    'Can {{name}} conjugate everyday Sanskrit verbs — like पठति, गच्छति, करोति — correctly for person and number?', ['nios-sec-2020:209.GRM.3']),
  T('sa-samasa', 'Grammar', 'Sanskrit Compounds (Samasa)', 'LANGUAGE',
    'Understand the Sanskrit compound system — अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वन्द्व and बहुव्रीहि — forming compounds and dissolving them (विग्रह).',
    ['Name the six kinds of samasa', 'Dissolve a compound into its parts (विग्रह)', 'Classify a given compound by type'],
    'Can {{name}} recognise the kinds of Sanskrit compounds and split one apart to show its meaning?', ['nios-sec-2020:209.GRM.4']),
  T('sa-pratyaya', 'Grammar', 'Sanskrit Suffixes (Pratyaya)', 'LANGUAGE',
    'Use the Sanskrit suffixes met at this level — krt suffixes like क्त्वा, तुमुन् and शतृ that build words from verb roots, taddhita suffixes like मतुप् and तल्, and the feminine suffixes टाप् and ङीप्.',
    ['Form a word from a root with a krt suffix (e.g. गम् + क्त्वा)', 'Recognise a taddhita-derived word', 'Form a feminine noun with टाप् or ङीप्'],
    'Can {{name}} build Sanskrit words with suffixes — like गत्वा from गम् — and recognise how suffixes change meaning?', ['nios-sec-2020:209.GRM.5']),
  T('sa-karaka', 'Grammar', 'Karaka: Sanskrit Case Relations', 'LANGUAGE',
    'Understand karaka — how the case endings (विभक्ति) mark each word’s role in the sentence (doer, object, instrument, recipient, source, location) — and the special upapada vibhaktis required by particular words.',
    ['Match each karaka to its vibhakti', 'Choose the correct case for a word’s role in a sentence', 'Apply an upapada vibhakti rule'],
    'Can {{name}} choose the right Sanskrit case ending for a word’s role in the sentence — doer, object, instrument and the rest?', ['nios-sec-2020:209.GRM.6']),
  T('sa-upasarga-avyaya', 'Grammar', 'Prefixes and Indeclinables', 'LANGUAGE',
    'Use Sanskrit upasargas (prefixes that shade a verb’s meaning) and avyayas (indeclinable words that never change form) correctly in sentences.',
    ['Show how an upasarga changes a verb’s meaning', 'Use common avyayas in sentences', 'Recognise indeclinables in a passage'],
    'Can {{name}} use Sanskrit prefixes and unchanging words (avyayas) correctly in sentences?', ['nios-sec-2020:209.GRM.7']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const mintNs = (ns, slug) => { const h = createHash('sha256').update(`${ns}:${slug}`).digest(); let s = ''; for (let i = 0; i < 10; i++) s += B62[h[i] % 62]; return `mt_${s}`; };
const CULT_CLASSICAL_LIT = mintNs('nios-sec', 'cult-classical-lit'); // Indian Culture "Classical Languages and Literature"

const newEdges = [
  hard('sa-recitation', 'sa-listening', 'Correct pronunciation builds on hearing Sanskrit sounds accurately'),
  soft('sa-reading', 'sa-recitation', 'Reading builds on sounding out Sanskrit correctly'),
  hard('sa-literature', 'sa-reading', 'Literature study presupposes reading simple Sanskrit'),
  soft('sa-literature', CULT_CLASSICAL_LIT, 'Sanskrit literature study builds on knowing the classical literary heritage'),
  soft('sa-writing', 'sa-reading', 'Writing Sanskrit builds on reading it'),
  soft('sa-writing', 'sa-sandhi', 'Transcribing sandhi-joined words requires knowing sandhi'),
  soft('sa-sandhi', 'sa-recitation', 'Sandhi builds on the sounds and their points of articulation'),
  hard('sa-karaka', 'sa-declensions', 'Using case relations presupposes declining nouns'),
  soft('sa-samasa', 'sa-declensions', 'Compound formation builds on knowing word forms'),
  soft('sa-pratyaya', 'sa-conjugations', 'Krt suffixes build words from the verb roots being conjugated'),
  soft('sa-upasarga-avyaya', 'sa-conjugations', 'Upasargas modify the verbs being learned'),
  soft('sa-reading', 'sa-declensions', 'Reading comprehension leans on recognising word forms'),
];

const B = (domain, summary) => ({ subject: SK, domain, ageRangeStart: 14, summary });
const newClusters = [
  B('Speaking & Listening', 'Your teenager is learning to hear and speak Sanskrit — its distinctive sounds, correct pronunciation, and the rhythmic recitation of verses.'),
  B('Reading', 'Your teenager is reading simple Sanskrit — prose, poetry and drama — and studying works of Sanskrit literature, their authors and characters.'),
  B('Writing', 'Your teenager is writing simple Sanskrit — dictation with correct spelling, story summaries, picture descriptions and short letters.'),
  B('Grammar', 'Your teenager is learning the machinery of Sanskrit grammar — sandhi, declensions and conjugations, compounds, suffixes, and the karaka case system.'),
];

integrateSubject({ subject, standards, newTopics, newEdges, newClusters });
