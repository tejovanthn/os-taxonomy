#!/usr/bin/env node
/**
 * build/ncert-sec-languages.mjs — NCERT English, Hindi and Sanskrit,
 * Classes IX–X, at skill/strand grain.
 *
 * This is a near-pure alignment pass. The English ladder already carries the
 * IX–X listening, speaking, reading, writing and grammar objectives, and —
 * checked against data/topics.json before minting anything — Sanskrit already
 * carries the whole grammar ladder the NCERT secondary syllabus prescribes
 * (sandhi, shabdarupa, dhaturupa, upasarga and avyaya, pratyaya, karaka,
 * samasa), both in the general Grammar domain and derivationally under
 * Paninian Grammar. Only the senior composition and register rungs were
 * genuinely missing, so those are the only mints here.
 *
 * The Hindi and Sanskrit syllabus pages carry non-Unicode legacy Devanagari
 * fonts, so their content was recovered by OCR of pages rendered at 300 DPI
 * (tesseract hin/san) and cross-checked against the page images — flagged in
 * PROVENANCE and CHANGELOG. Descriptions are Marble-authored factual scope
 * summaries (no NCERT text). Idempotent.
 */

import { integrateNcertSec } from './ncert-sec.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

const standards = [
  // ---- English (Classes IX–X) ----
  s('ENG.C910.LISTEN', 'IX–X', 'English — Listening', 'Retelling the content of authentic audio texts such as weather reports, public announcements, advertisements and short interviews.'),
  s('ENG.C910.SPEAK', 'IX–X', 'English — Speaking', 'Giving brief oral descriptions of topical events; participating in conversations and discussions outside the classroom; narrating a story presented non-verbally.'),
  s('ENG.C910.READ', 'IX–X', 'English — Reading', 'Identifying main points and significant details in scripts of interviews, discussions and debates; reading poems with proper rhythm and intonation and grasping their theme.'),
  s('ENG.C910.WRITE', 'IX–X', 'English — Writing', 'Responding to business letters and official communications; writing without preparation on a given topic and defending the position taken; summarising short lectures by taking notes.'),
  s('ENG.C910.REF', 'IX–X', 'English — Reference Skills', 'Accessing knowledge and information through reference skills: consulting a dictionary or thesaurus, a library and the internet.'),
  s('ENG.C910.GRAM', 'IX–X', 'English — Language Items', 'Consolidating earlier grammar and reinforcing sequence of tenses, reported speech in extended texts, modal auxiliaries, non-finites, conditional clauses, and complex and compound sentences.'),
  s('ENG.C910.COHESION', 'IX–X', 'English — Cohesion and Punctuation', 'Phrasal verbs and prepositional phrases; cohesive devices; punctuation including the semicolon, colon, dash, hyphen, parenthesis and exclamation mark.'),
  s('ENG.C910.REGISTER', 'IX–X', 'English — Register and Variety', 'Building competence in different registers of English, and developing sensitivity to other varieties including Indian Englishes and the cultures they reflect.'),
  s('ENG.C910.TRANSCODE', 'IX–X', 'English — Transcoding', 'Transcoding information from a graph or chart into a description or report, and assessing different points of view expressed in a discussion or debate.'),
  // ---- Hindi (Classes IX–X), mother tongue and second language ----
  s('HIN.C910.SKILLS', 'IX–X', 'Hindi — Language Skills', 'Progressive development of the listening, speaking, reading, writing and thinking skills acquired up to Class VIII, towards independent oral and written expression.'),
  s('HIN.C910.LIT', 'IX–X', 'Hindi — Literature', 'Reading poetry and prose across literary forms by major writers, developing the capacity for critical appreciation of creative literature.'),
  s('HIN.C910.PRACTICAL', 'IX–X', 'Hindi — Practical Writing', 'Everyday written competence: applications, letters of different kinds, telegrams and filing a report, together with book reviews, travelogues and interviews.'),
  s('HIN.C910.MEDIA', 'IX–X', 'Hindi — Media and Registers', 'Understanding the nature of Hindi as used in print and electronic media, and the language of different disciplines of knowledge.'),
  s('HIN.C9.GRAM', 'IX', 'Hindi — Grammar', 'Letter division and spelling, including the forms of र, anusvara and chandrabindu and the nukta; recognising prefixes, suffixes and compounds in context; synonyms, antonyms and polysemy at sentence level; idioms in use.'),
  s('HIN.C10.GRAM', 'X', 'Hindi — Grammar', 'The difference between word, pada and phrase; the structure and meaning of complex and compound sentences and sentence transformation; recognising sandhi, further affixes and compounds; distinguishing idioms from proverbs.'),
  s('HIN.C910.GRAMPTS', 'IX–X', 'Hindi — Grammatical Categories', 'Noun, pronoun, adjective, verb and adverb; gender, number and tense; the effect of gender and number on adjective and verb; transitive, intransitive and causative verbs; active and passive voice.'),
  // ---- Sanskrit (Classes IX–X) ----
  s('SAN.C910.SHRAVANA', 'IX–X', 'Sanskrit — Listening', 'Listening attentively to passages read or ideas spoken by teacher and classmates and grasping the substance; understanding Sanskrit programmes broadcast on radio and television.'),
  s('SAN.C910.BHASHANA', 'IX–X', 'Sanskrit — Speaking', 'Answering questions on material studied; expressing ideas with correct stress on words; conveying thoughts clearly and courteously, including question forms.'),
  s('SAN.C910.PATHANA', 'IX–X', 'Sanskrit — Reading', 'Reading prose, verse and dramatic passages clearly and correctly while grasping the sense; reading Sanskrit sentences fluently; reciting verses aloud according to their metre.'),
  s('SAN.C910.LEKHANA', 'IX–X', 'Sanskrit — Writing', 'Writing heard words and sentences in correct spelling; transcribing passages containing sandhi; summarising a story in about five Sanskrit sentences; suggesting a suitable title for a passage.'),
  s('SAN.C9.VARNA', 'IX', 'Sanskrit — Sounds', 'Introduction to the varnas and their places of articulation.'),
  s('SAN.C9.SANDHI', 'IX', 'Sanskrit — Sandhi', 'Introduction to sandhi and its kinds, covering vowel sandhi: dirgha, guna, yan and vriddhi.'),
  s('SAN.C9.SHABDA', 'IX', 'Sanskrit — Noun Forms', 'Declension of vowel-ending and consonant-ending nouns, pronouns in all genders including asmad and yushmad, and numerals from one to fifty.'),
  s('SAN.C9.DHATU', 'IX', 'Sanskrit — Verb Forms', 'Verb conjugation in lat, lang, lrit, lot and vidhiling across the bhvadi, adadi, svadi, tudadi, kryadi and churadi classes.'),
  s('SAN.C9.UPASARGA', 'IX', 'Sanskrit — Prefixes', 'Introduction to the upasargas and their effect on verbal meaning.'),
  s('SAN.C9.PRATYAYA', 'IX', 'Sanskrit — Suffixes', 'Feminine suffixes; krit suffixes including ktva, lyap, tumun, shatri and shanach; taddhita suffixes including matup, ini, tarap and tamap.'),
  s('SAN.C9.KARAKA', 'IX', 'Sanskrit — Karaka', 'General knowledge of the karakas and their case relations.'),
  s('SAN.C9.SAMASA', 'IX', 'Sanskrit — Compounds', 'General introduction to compounds: dvandva, tatpurusha and dvigu.'),
  s('SAN.C9.RACHANA', 'IX', 'Sanskrit — Composition', 'Translating simple Hindi and English sentences into Sanskrit; answering questions in Sanskrit on an unseen passage; framing sentences from a picture; writing a formal request letter.'),
  s('SAN.C10.SANDHI', 'X', 'Sanskrit — Sandhi', 'Purvarupa, pararupa and prakritibhava; consonant sandhi including shchutva, shtutva, jashtva, chartva and anusvara; visarga sandhi.'),
  s('SAN.C10.SHABDA', 'X', 'Sanskrit — Noun Forms', 'Further vowel-ending and consonant-ending declensions, additional pronouns, and ordinal numerals together with numbers from fifty to a hundred.'),
  s('SAN.C10.DHATU', 'X', 'Sanskrit — Verb Forms', 'Further verb conjugation across the bhvadi, adadi, juhotyadi, divadi, svadi, tudadi, tanadi, kryadi and churadi classes.'),
  s('SAN.C10.AVYAYA', 'X', 'Sanskrit — Indeclinables', 'The avyayas and their use in sentences.'),
  s('SAN.C10.PRATYAYA', 'X', 'Sanskrit — Suffixes', 'Further krit suffixes including kta, ktavatu, tavya, aniyar, yat and nvul; further taddhita suffixes including an, ini, thak, tva and tal.'),
  s('SAN.C10.KARAKA', 'X', 'Sanskrit — Karaka and Upapada', 'The karakas together with upapada vibhakti, the case endings governed by particular words.'),
  s('SAN.C10.SAMASA', 'X', 'Sanskrit — Compounds', 'Avyayibhava, karmadharaya and bahuvrihi compounds.'),
  s('SAN.C10.RACHANA', 'X', 'Sanskrit — Composition', 'Translating Hindi and English passages into Sanskrit; answering questions on an unseen passage; picture-based sentences and paragraph writing; writing an informal letter.'),
];

const alignments = {
  // ---- English ----
  'mt_ctlZpQx3Wd': ['ENG.C910.SPEAK', 'ENG.C910.LISTEN'],   // Speaking in Formal Settings
  'mt_z07UNAIsNc': ['ENG.C910.SPEAK'],                      // Speaking Formally and Giving Presentations
  'mt_Yrjn8jAt1c': ['ENG.C910.SPEAK', 'ENG.C910.TRANSCODE'],// Formal Debates
  'mt_ylFTYS80d1': ['ENG.C910.READ'],                       // Performing Scripts & Poetry
  'mt_aClzPBiS9k': ['ENG.C910.READ'],                       // Poetic forms and conventions
  'mt_wGxq92Na5g': ['ENG.C910.READ'],                       // Tracing Theme Across a Text
  'mt_II6iw4BmJI': ['ENG.C910.READ'],                       // Analysing Text Structure
  'mt_gMSFymQlrW': ['ENG.C910.READ', 'ENG.C910.TRANSCODE'], // Evaluating Arguments in Non-Fiction
  'mt_9k1qcpvVi_': ['ENG.C910.READ'],                       // Wide Independent Reading Across Genres
  'mt_qZAQBsLwp3': ['ENG.C910.WRITE'],                      // Note-Making and Summarising
  'mt_IGrGGt7lKf': ['ENG.C910.WRITE'],                      // Functional Writing
  'mt_Qxyikkkzam': ['ENG.C910.WRITE'],                      // Persuasive Writing
  'mt_zCUIJLdK_s': ['ENG.C910.WRITE', 'ENG.C910.TRANSCODE'],// Developed Informational and Explanatory Writing
  'mt_av-uRBrhwT': ['ENG.C910.WRITE'],                      // Planning, Revising and Editing Writing
  'mt_9lN0SpKlEH': ['ENG.C910.WRITE'],                      // Writing Across Genres
  'mt_Qcsl1Z1x0l': ['ENG.C910.REF'],                        // Research & Source Evaluation
  'mt_WZnwITSWr8': ['ENG.C910.REF'],                        // Vocabulary Strategies
  'mt_OLwNsTI6C7': ['ENG.C910.REGISTER'],                   // Academic Vocabulary
  'mt_S2fP8rUwrl': ['ENG.C910.REGISTER'],                   // Standard English
  'mt_jIcgbCmziD': ['ENG.C910.REGISTER'],                   // Purpose, audience, and context
  'mt_T9IXrlxfx2': ['ENG.C910.GRAM'],                       // Types of Sentences
  'mt_IdFxLz-UW9': ['ENG.C910.GRAM'],                       // Phrases & Clauses
  'mt_N5tciHU8cE': ['ENG.C910.GRAM'],                       // Verb Voice and Mood
  'mt_N5tiL3uIeq': ['ENG.C910.GRAM'],                       // Grammar for Effect
  'mt_lsO9O-_eZH': ['ENG.C910.COHESION'],                   // Advanced Punctuation for Clarity
  'mt_tn1rY9GbEZ': ['ENG.C910.COHESION'],                   // Cohesion and Transitions Across Writing
  'mt_HCweOHWSiu': ['ENG.C910.GRAM'],                       // Literary and Language Terminology
  // ---- Hindi ----
  'mt_tnTFGNc7K0': ['HIN.C910.SKILLS'],                     // Listening with Understanding
  'mt_wByO4SRJSD': ['HIN.C910.SKILLS'],                     // Speaking Hindi Effectively
  'mt_eAR1bCJrgZ': ['HIN.C910.SKILLS', 'HIN.C910.LIT'],     // Reading Hindi Prose
  'mt_ugCqBWVZAG': ['HIN.C910.LIT'],                        // Reading Hindi Poetry
  'mt_afyX5aOX2V': ['HIN.C910.LIT'],                        // Hindi Metre (Chhand)
  'mt_kvpdqRUZDk': ['HIN.C910.LIT'],                        // Hindi Figures of Speech (Alankar)
  'mt_3HVK8ZcBIU': ['HIN.C910.PRACTICAL'],                  // Purposeful Writing in Hindi
  'mt_cxqHfydB0O': ['HIN.C910.PRACTICAL'],                  // Summary and Essay Writing in Hindi
  'mt_bcHw0Tefvk': ['HIN.C910.MEDIA'],                      // The Roles of Hindi
  'mt_GCzEZC1EPI': ['HIN.C9.GRAM', 'HIN.C10.GRAM'],         // Hindi Word Formation
  'mt_a4WIiKJaM8': ['HIN.C9.GRAM', 'HIN.C10.GRAM'],         // Hindi Idioms and Proverbs
  'mt_GcCnPyG5hg': ['HIN.C10.GRAM', 'HIN.C910.GRAMPTS'],    // Hindi Sentence Structure
  'mt_nCnfO9cPdJ': ['HIN.C910.GRAMPTS', 'HIN.C9.GRAM'],     // Hindi Word Types and Vocabulary
  'mt_DeKlOUf7Hi': ['HIN.C910.GRAMPTS'],                    // First Hindi Grammar
  // ---- Sanskrit: the existing ladder already covers the prescribed grammar ----
  'mt_ZROVaFtzrB': ['SAN.C910.SHRAVANA'],                   // Listening to Sanskrit
  'mt_GHG799MyNB': ['SAN.C910.BHASHANA', 'SAN.C910.PATHANA', 'SAN.C9.VARNA'], // Pronouncing and Reciting Sanskrit
  'mt_cUpCdjZbDC': ['SAN.C910.PATHANA'],                    // Reading Simple Sanskrit
  'mt_wr4lGfBof9': ['SAN.C910.PATHANA', 'SAN.C910.LEKHANA'],// Sanskrit Literature: Prose, Poetry and Drama
  'mt_YN9NNO8nCZ': ['SAN.C910.LEKHANA', 'SAN.C9.RACHANA'],  // Writing Simple Sanskrit
  'mt_ovWwgKINxC': ['SAN.C9.SANDHI', 'SAN.C10.SANDHI'],     // Sanskrit Sandhi
  'mt_4ntIXtYoD7': ['SAN.C9.SANDHI'],                       // Vowel Sandhi by the Sutras
  'mt_wnciR8EXMn': ['SAN.C10.SANDHI'],                      // Consonant and Visarga Sandhi by the Sutras
  'mt_ffG9xKHE3f': ['SAN.C9.SHABDA', 'SAN.C10.SHABDA'],     // Sanskrit Noun Declensions
  'mt_hAJ2JdqTBf': ['SAN.C9.SHABDA'],                       // Deriving Vowel-Stem Declensions
  'mt_ICjqSvbPjw': ['SAN.C10.SHABDA'],                      // Deriving Consonant-Stem and Pronoun Forms
  'mt_mrLZFWQnrE': ['SAN.C9.DHATU', 'SAN.C10.DHATU'],       // Sanskrit Verb Conjugations
  'mt_DD0RtlfilI': ['SAN.C9.UPASARGA', 'SAN.C10.AVYAYA'],   // Prefixes and Indeclinables
  'mt_xCtoz4vJDT': ['SAN.C9.PRATYAYA', 'SAN.C10.PRATYAYA'], // Sanskrit Suffixes (Pratyaya)
  'mt_D6aNogterc': ['SAN.C10.PRATYAYA'],                    // Krdanta: Deriving Words from Roots
  'mt_VDcBe3oTmz': ['SAN.C9.KARAKA', 'SAN.C10.KARAKA'],     // Karaka: Sanskrit Case Relations
  'mt_5Y0EFPqEBH': ['SAN.C10.KARAKA'],                      // Karaka in the Sutras
  'mt_g1EXmXcgps': ['SAN.C10.KARAKA'],                      // Upapada Vibhakti Rules
  'mt_qCvGw8Yru6': ['SAN.C9.SAMASA', 'SAN.C10.SAMASA'],     // Sanskrit Compounds (Samasa)
  'mt_ub53FBviBX': ['SAN.C910.PATHANA'],                    // Subhashitas: Verses of Wisdom
};

const EV = (a, b, c) => [a, b, c];
const t = (slug, name, subject, domain, ageStart, ageEnd, type, description, evidence, prompt, standards) =>
  ({ _slug: slug, name, subject, domain, ageRangeStart: ageStart, ageRangeEnd: ageEnd, type, description, evidence, assessmentPrompt: prompt, standards });

const newTopics = [
  // Sanskrit — the one genuinely missing rung: senior composition and translation
  t('sanskrit-composition-translation', 'Sanskrit Composition and Translation', 'Sanskrit', 'Writing', 14, 16, 'LANGUAGE',
    'Compose connected Sanskrit on a given topic and translate passages from another language into it, choosing case endings and verb forms that carry the intended sense.',
    EV('Translates a short Hindi or English passage into correct Sanskrit', 'Writes a connected paragraph in Sanskrit on a familiar topic', 'Writes a formal or informal Sanskrit letter in the expected form'),
    'Ask {{name}} to write a short letter in Sanskrit inviting a friend to a festival.',
    ['ncert-sec:SAN.C9.RACHANA', 'ncert-sec:SAN.C10.RACHANA']),
  // Hindi — senior rungs above the existing ladder
  t('hindi-vakya-rupantaran', 'Sentence Transformation in Hindi', 'Hindi', 'Grammar', 14, 16, 'LANGUAGE',
    'Rewrite a Hindi sentence from simple to compound or complex form, and between active and passive voice, without changing what it means.',
    EV('Classifies a Hindi sentence as saral, sanyukt or mishra', 'Rewrites a sentence into another type keeping the meaning', 'Converts a sentence between active and passive voice'),
    'Ask {{name}} to join two short Hindi sentences into one, and then say what type the result is.',
    ['ncert-sec:HIN.C10.GRAM', 'ncert-sec:HIN.C910.GRAMPTS']),
  t('hindi-vyavaharik-lekhan', 'Practical Writing in Hindi', 'Hindi', 'Writing', 14, 16, 'LANGUAGE',
    'Write the everyday documents adult life requires in Hindi — applications, formal and informal letters, reports and reviews — choosing the register each one calls for.',
    EV('Writes a formal application in the expected format', 'Adjusts tone between a formal and an informal letter', 'Writes a short report or review of something read or seen'),
    'Ask {{name}} to write a short application to their principal, then the same request as a note to a friend.',
    ['ncert-sec:HIN.C910.PRACTICAL']),
  t('hindi-media-ki-bhasha', 'The Language of Hindi Media', 'Hindi', 'Language & Society', 14, 16, 'META',
    'Understand that Hindi takes different forms in newspapers, broadcast and digital media, and read such language critically rather than accepting its framing as neutral.',
    EV('Compares how two sources report the same event', 'Identifies loaded or persuasive wording in a report', 'Explains how the medium shapes the language chosen'),
    'Ask {{name}} to compare a news story in two Hindi papers and say what each chose to emphasise.',
    ['ncert-sec:HIN.C910.MEDIA']),
];

const newEdges = [
  { t: 'sanskrit-composition-translation', p: 'mt_YN9NNO8nCZ', strength: 'hard', reason: 'Senior composition builds directly on writing simple Sanskrit.' },
  { t: 'sanskrit-composition-translation', p: 'mt_VDcBe3oTmz', strength: 'hard', reason: 'Composing correct sentences requires control of karaka and case.' },
  { t: 'sanskrit-composition-translation', p: 'mt_mrLZFWQnrE', strength: 'hard', reason: 'Composition requires correctly conjugated verbs.' },
  { t: 'hindi-vakya-rupantaran', p: 'mt_GcCnPyG5hg', strength: 'hard', reason: 'Transformation builds on knowing Hindi sentence structure.' },
  { t: 'hindi-vyavaharik-lekhan', p: 'mt_3HVK8ZcBIU', strength: 'hard', reason: 'Practical writing extends purposeful writing in Hindi.' },
  { t: 'hindi-vyavaharik-lekhan', p: 'hindi-vakya-rupantaran', strength: 'soft', reason: 'Practical writing draws on control of sentence structure.' },
  { t: 'hindi-media-ki-bhasha', p: 'mt_bcHw0Tefvk', strength: 'hard', reason: 'Media language is one of the roles Hindi plays in society.' },
];

integrateNcertSec({ subjectDoc: 'English, Hindi and Sanskrit (IX–X)', standards, newTopics, alignments, newEdges });
