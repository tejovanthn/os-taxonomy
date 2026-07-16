#!/usr/bin/env node
/**
 * build/nios-sec-tkt.mjs — NIOS Secondary Telugu (205), Kannada (208) and
 * Tamil (237) → three new language subjects. Image-only scans recovered via
 * OCR + direct page-image reading — see scratchpad sec-{telugu,kannada,tamil}-
 * extract.md. Standards at the grain each syllabus provides (Telugu: sections;
 * Kannada: skill areas; Tamil: sections + enumerated grammar). Idempotent.
 */

import { integrateSubject, mintId } from './nios-sec.mjs';
import { createHash } from 'node:crypto';

const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const mintNs = (ns, slug) => { const h = createHash('sha256').update(`${ns}:${slug}`).digest(); let s = ''; for (let i = 0; i < 10; i++) s += B62[h[i] % 62]; return `mt_${s}`; };
const INDIA_LANGUAGES = mintNs('nios-obe', 'india-languages');
const REGIONAL_LIT = mintNs('nios-sec', 'cult-regional-lit');

// ---------------- Telugu (205) ----------------
{
  const TE = 'Telugu';
  const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
    ({ _slug, subject: TE, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });
  integrateSubject({
    subject: { name: 'Telugu', courseCode: '205' },
    standards: [
      std('205.PDY', 'Sections', 'పద్యభాగం', 'Poetry Section (పద్యభాగం)', 'Read and appreciate Telugu poems across periods — developing values, creativity and aesthetic enjoyment (rasanubhuti). Ten lessons.'),
      std('205.GDY', 'Sections', 'గద్యభాగం', 'Prose Section (గద్యభాగం)', 'Read Telugu prose across genres — building comprehension, applied grammar and command of vocabulary. Fifteen lessons.'),
      std('205.UPV', 'Sections', 'ఉపవాచకం', 'Supplementary Reader (ఉపవాచకం)', 'Extensive reading through the supplementary reader — building self-study habits and taste for wide reading.'),
    ],
    newTopics: [
      T('te-reading-poetry', 'Reading', 'Reading Telugu Poetry', 'LANGUAGE',
        'Read Telugu poetry with understanding and enjoyment — grasping a poem’s meaning and feeling, appreciating its craft, and experiencing its aesthetic flavour (రసానుభూతి).',
        ['Read a Telugu poem and state its meaning and feeling', 'Appreciate a poetic feature of the text', 'Respond personally to a poem'],
        'Can {{name}} read a Telugu poem, explain what it says and feels, and enjoy its beauty?', ['nios-sec-2020:205.PDY']),
      T('te-reading-prose', 'Reading', 'Reading Telugu Prose', 'LANGUAGE',
        'Read Telugu prose across genres with comprehension — grasping main ideas, learning grammar in context, and growing command of vocabulary.',
        ['Read a Telugu prose passage and state its main ideas', 'Work out unfamiliar words from context', 'Apply a grammar point met in the text'],
        'Can {{name}} read a Telugu prose piece with understanding and pick up new words and usage from it?', ['nios-sec-2020:205.GDY']),
      T('te-extensive-reading', 'Reading', 'Reading Widely in Telugu', 'META',
        'Build the habit of independent, extensive reading in Telugu — reading whole works on one’s own, developing taste, speed and the self-study habit.',
        ['Read a longer Telugu text independently', 'Summarise what was read', 'Choose further reading by own taste'],
        'Does {{name}} read Telugu books on their own — and can they tell you about what they read?', ['nios-sec-2020:205.UPV']),
      T('te-expressing', 'Speaking & Writing', 'Expressing Yourself in Telugu', 'LANGUAGE',
        'Express thoughts precisely in Telugu — speaking and writing clearly, and attempting creative writing of one’s own.',
        ['Express an idea precisely in spoken Telugu', 'Write a clear short passage in Telugu', 'Attempt a piece of creative writing'],
        'Can {{name}} say and write what they mean in Telugu clearly — and try some writing of their own?', ['nios-sec-2020:205.PDY', 'nios-sec-2020:205.GDY']),
      T('te-culture', 'Language & Society', 'Telugu Language and Culture', 'CONCEPTUAL',
        'Know and value the Telugu language and its traditions — its literature and culture — and take pride in knowing Telugu while staying open to other languages and peoples.',
        ['Describe a feature of Telugu literary or cultural tradition', 'Explain why the language and its traditions are valued', 'Relate Telugu identity to national integration'],
        'Can {{name}} talk about what makes Telugu language and culture special, and why it is worth knowing well?', ['nios-sec-2020:205.PDY', 'nios-sec-2020:205.GDY']),
    ],
    newEdges: [
      soft('te-reading-poetry', 'te-reading-prose', 'Poetry reading builds on prose reading fluency'),
      hard('te-extensive-reading', 'te-reading-prose', 'Extensive reading presupposes reading prose with comprehension'),
      soft('te-expressing', 'te-reading-prose', 'Expression grows out of reading'),
      soft('te-culture', INDIA_LANGUAGES, 'Telugu’s place builds on knowing India’s many languages'),
      soft('te-culture', REGIONAL_LIT, 'Telugu literary tradition is part of India’s regional literatures'),
    ],
    newClusters: [
      { subject: TE, domain: 'Reading', ageRangeStart: 14, summary: 'Your teenager is reading Telugu widely — poetry with feeling, prose across genres, and whole works on their own through the supplementary reader.' },
      { subject: TE, domain: 'Speaking & Writing', ageRangeStart: 14, summary: 'Your teenager is learning to express themselves precisely in Telugu — in speech, writing and their own creative attempts.' },
      { subject: TE, domain: 'Language & Society', ageRangeStart: 14, summary: 'Your teenager is coming to know and value Telugu language, literature and culture.' },
    ],
  });
}

// ---------------- Kannada (208) ----------------
{
  const KN = 'Kannada';
  const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
    ({ _slug, subject: KN, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });
  integrateSubject({
    subject: { name: 'Kannada', courseCode: '208' },
    standards: [
      std('208.LSN', 'Skills', 'Listening', 'Listening (ಆಲಿಸುವಿಕೆ)', 'Listen with concentration; analyse ideas heard, grasp their essence, and form judgements from them.'),
      std('208.SPK', 'Skills', 'Speaking', 'Speaking (ಮಾತನಾಡುವಿಕೆ)', 'Speak Kannada with clear pronunciation and correct accent, in formal and informal registers, with reasoned and well-sequenced expression.'),
      std('208.RDG', 'Skills', 'Reading', 'Reading (ಓದುವಿಕೆ)', 'Read Kannada prose and verse fluently at the right rhythm, grasp material quickly in silent reading, and take contextual sense of words, idioms and proverbs — through the 27 lessons of "Madhura Kannada" (prose, poetry, vachanas, tripadi, drama and classical verse).'),
      std('208.WRT', 'Skills', 'Writing', 'Writing (ಬರವಣಿಗೆ)', 'Write Kannada clearly — formal and informal letters, paragraphs and news items, essays, picture and graph description, précis and expansion, form-filling and telephone messages — applying grammar elements in use.'),
    ],
    newTopics: [
      T('kn-listening-speaking', 'Speaking & Listening', 'Listening and Speaking Kannada', 'LANGUAGE',
        'Listen to Kannada attentively — analysing and judging what is heard — and speak it clearly with correct accent, in the register the occasion needs, with reasons and in good order.',
        ['Follow spoken Kannada and state its essence', 'Speak with clear pronunciation in formal and informal registers', 'Present a view with reasons in sequence'],
        'Can {{name}} follow spoken Kannada closely, and speak it clearly and appropriately for the occasion?', ['nios-sec-2020:208.LSN', 'nios-sec-2020:208.SPK']),
      T('kn-reading-prose', 'Reading', 'Reading Kannada Prose', 'LANGUAGE',
        'Read Kannada prose fluently and with quick comprehension — essays and narratives from lessons on people’s welfare, women’s progress, rational thinking and the world of computers — taking words and idioms in context.',
        ['Read a Kannada prose lesson and state its main ideas', 'Grasp a passage quickly in silent reading', 'Take the contextual sense of unfamiliar words and idioms'],
        'Can {{name}} read a Kannada essay or story fluently and tell you what it says?', ['nios-sec-2020:208.RDG']),
      T('kn-reading-poetry', 'Reading', 'Reading Kannada Poetry', 'LANGUAGE',
        'Read Kannada poetry across its forms — modern poems, the vachanas of the sharanas, the three-line tripadi, and classical verse like Pampa’s "Banavasi" lines — with rhythm and feeling.',
        ['Read a Kannada poem at the right rhythm', 'Recognise forms like the vachana and tripadi', 'State the feeling of a poem read'],
        'Can {{name}} read Kannada poetry — from vachanas to modern poems — with rhythm and explain its feeling?', ['nios-sec-2020:208.RDG']),
      T('kn-functional-writing', 'Writing', 'Functional Writing in Kannada', 'PROCEDURAL',
        'Write practical Kannada in the right format — letters formal and informal, news paragraphs, picture and graph descriptions, form-filling and telephone messages.',
        ['Write a formal Kannada letter in correct format', 'Describe a picture or graph in Kannada', 'Fill an application form and record a message accurately'],
        'Can {{name}} write a proper Kannada letter, describe a chart, and fill in a form correctly?', ['nios-sec-2020:208.WRT']),
      T('kn-composition', 'Writing', 'Essay, Précis and Expansion in Kannada', 'PROCEDURAL',
        'Compose longer Kannada writing — essays, précis (ಸಾರಸಂಗ್ರಹಣೆ), and the expansion of ideas into paragraphs — with clear expression and correct grammar in use.',
        ['Write a structured Kannada essay', 'Condense a passage into a précis', 'Expand a saying or idea into a paragraph'],
        'Can {{name}} write a Kannada essay, shorten a passage into a précis, and expand an idea into a paragraph?', ['nios-sec-2020:208.WRT']),
      T('kn-culture', 'Language & Society', 'Kannada Language and Its World', 'CONCEPTUAL',
        'Know Kannada’s place and life — a language changing with the times, gaining new technical words, serving Karnataka’s people as their common tongue — and its literary tradition from the vachanas to today.',
        ['Describe how Kannada has changed and grown with the times', 'Name a feature of the Kannada literary tradition', 'Explain Kannada’s role as the common language of its people'],
        'Can {{name}} talk about Kannada — how it changes and grows, and the literary tradition behind it?', ['nios-sec-2020:208.RDG']),
    ],
    newEdges: [
      soft('kn-reading-poetry', 'kn-reading-prose', 'Poetry reading builds on prose reading fluency'),
      soft('kn-functional-writing', 'kn-reading-prose', 'Writing builds on reading with comprehension'),
      hard('kn-composition', 'kn-functional-writing', 'Essays and précis build on practical writing control'),
      soft('kn-culture', INDIA_LANGUAGES, 'Kannada’s place builds on knowing India’s many languages'),
      soft('kn-culture', REGIONAL_LIT, 'Kannada literary tradition is part of India’s regional literatures'),
    ],
    newClusters: [
      { subject: KN, domain: 'Speaking & Listening', ageRangeStart: 14, summary: 'Your teenager is developing spoken Kannada — attentive listening and clear, well-ordered speech in the right register for the occasion.' },
      { subject: KN, domain: 'Reading', ageRangeStart: 14, summary: 'Your teenager is reading Kannada widely — prose on life and ideas, and poetry from the vachanas and tripadi to classical and modern verse.' },
      { subject: KN, domain: 'Writing', ageRangeStart: 14, summary: 'Your teenager is writing Kannada for real purposes — letters, news items, form-filling, précis, expansion and essays.' },
      { subject: KN, domain: 'Language & Society', ageRangeStart: 14, summary: 'Your teenager is coming to know Kannada’s living tradition — a language growing with the times, and the literature behind it.' },
    ],
  });
}

// ---------------- Tamil (237) ----------------
{
  const TA = 'Tamil';
  const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
    ({ _slug, subject: TA, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });
  integrateSubject({
    subject: { name: 'Tamil', courseCode: '237' },
    standards: [
      std('237.PDY', 'Sections', 'Poetry', 'Poetry (செய்யுள்)', 'Read Tamil poetry from Sangam literature through modern free verse — twelve lessons.'),
      std('237.GDY', 'Sections', 'Prose', 'Prose (உரைநடை)', 'Read Tamil prose — essays, short stories, drama, travel essays and letters — ten lessons.'),
      std('237.FNC', 'Sections', 'Functional Tamil', 'Functional Tamil (பயன்பாட்டுத் தமிழ்)', 'Use Tamil for practical purposes — letters, interviews, project proposals, forms, news and advertisements — thirteen lessons, plus grammar in use.'),
      std('237.CRE', 'Sections', 'Creative Ability', 'Creative Ability (படைப்பாற்றல்)', 'Develop creative ability in Tamil through self-study, acquaintance with eminent authors and works, discussion and direct experience.'),
      std('237.GRM', 'Grammar & Functional Language', 'Grammar', 'Grammar and Functional Language', 'Master Tamil usage — one word/many meanings and many words/one meaning, the ல/ள/ழ and ந/ன/ண distinctions, idioms, proverbs and similes, sentence structure, antonyms, and direct and indirect speech.'),
    ],
    newTopics: [
      T('ta-reading-poetry', 'Reading', 'Reading Tamil Poetry', 'LANGUAGE',
        'Read Tamil poetry across two thousand years — from the Sangam classics to modern free verse — with correct reading and immediate comprehension, honouring Tamil’s status as a classical language (செம்மொழி).',
        ['Read a Tamil poem aloud correctly', 'State the meaning and feeling of a poem', 'Recognise Sangam poetry as classical literature'],
        'Can {{name}} read Tamil poetry — from ancient Sangam verse to modern free verse — and explain its sense?', ['nios-sec-2020:237.PDY']),
      T('ta-reading-prose', 'Reading', 'Reading Tamil Prose', 'LANGUAGE',
        'Read Tamil prose across genres — essays, short stories, drama, travel writing and letters — with quick comprehension, and report what was read.',
        ['Read a Tamil prose piece and state its main ideas', 'Report the content of what was read', 'Handle different prose genres'],
        'Can {{name}} read a Tamil story or essay with understanding and retell what it said?', ['nios-sec-2020:237.GDY']),
      T('ta-functional-tamil', 'Writing', 'Functional Tamil', 'PROCEDURAL',
        'Use Tamil for the tasks of real life — writing letters and news items, preparing interviews and project proposals, filling forms, and composing advertisements — with correct letter-shapes and punctuation.',
        ['Write a Tamil letter or news item in correct format', 'Fill a Tamil form accurately', 'Draft a simple advertisement or proposal'],
        'Can {{name}} handle everyday written Tamil — letters, forms, news items and notices — correctly?', ['nios-sec-2020:237.FNC']),
      T('ta-sounds', 'Grammar', 'The Tamil Sounds: ல, ள, ழ and ந, ன, ண', 'LANGUAGE',
        'Master the sound distinctions that define good Tamil — the three l-sounds (ல, ள, ழ) and the three n-sounds (ந, ன, ண) — hearing, pronouncing and spelling them correctly.',
        ['Distinguish ல, ள and ழ in hearing and speech', 'Distinguish ந, ன and ண in spelling', 'Spell common words with the correct letter'],
        'Can {{name}} tell apart Tamil’s three l-sounds and three n-sounds — saying and spelling them correctly?', ['nios-sec-2020:237.GRM']),
      T('ta-vocabulary', 'Grammar', 'Tamil Words and Their Meanings', 'LANGUAGE',
        'Command Tamil vocabulary — words with many meanings and meanings with many words, antonyms, and the idioms, proverbs and similes that colour the language.',
        ['Give several meanings of a polysemous word', 'Use an idiom or proverb aptly', 'Supply antonyms for common words'],
        'Can {{name}} play with Tamil words — many meanings of one word, idioms and proverbs used well?', ['nios-sec-2020:237.GRM']),
      T('ta-sentence-speech', 'Grammar', 'Tamil Sentences and Reported Speech', 'LANGUAGE',
        'Build correct Tamil sentences and move between direct and indirect speech, with sound narration technique and idiomatic usage.',
        ['Construct grammatically correct Tamil sentences', 'Convert direct speech to indirect and back', 'Narrate an event in correct sequence'],
        'Can {{name}} build correct Tamil sentences and switch between direct and reported speech?', ['nios-sec-2020:237.GRM']),
      T('ta-creative', 'Writing', 'Creative Writing in Tamil', 'PROCEDURAL',
        'Develop creative ability in Tamil — writing of one’s own, informed by acquaintance with eminent Tamil authors and their works, discussion and direct experience.',
        ['Attempt an original piece of Tamil writing', 'Name an eminent Tamil author and work', 'Improve a draft after discussion'],
        'Does {{name}} try writing Tamil of their own — knowing some of the great authors — and improve it with feedback?', ['nios-sec-2020:237.CRE']),
      T('ta-classical-language', 'Language & Society', 'Tamil: A Classical Language', 'CONCEPTUAL',
        'Understand Tamil’s standing — an ancient classical language (செம்மொழி) with a vast literature, kin to Telugu, Kannada and Malayalam in the Dravidian family, spoken worldwide and strong in the computer age.',
        ['Explain Tamil’s recognition as a classical language', 'Name Tamil’s Dravidian sister languages', 'Describe Tamil’s worldwide presence and modern use'],
        'Can {{name}} explain why Tamil is honoured as a classical language, and name its sister languages?', ['nios-sec-2020:237.PDY', 'nios-sec-2020:237.GDY']),
    ],
    newEdges: [
      soft('ta-reading-poetry', 'ta-reading-prose', 'Poetry reading builds on prose reading fluency'),
      soft('ta-functional-tamil', 'ta-sentence-speech', 'Functional writing builds on correct sentences'),
      hard('ta-vocabulary', 'ta-reading-prose', 'Vocabulary grows out of reading'),
      soft('ta-sounds', 'ta-reading-prose', 'The sound distinctions are exercised in reading and spelling'),
      hard('ta-creative', 'ta-functional-tamil', 'Creative writing builds on writing control'),
      soft('ta-classical-language', 'ta-reading-poetry', 'Tamil’s classical standing is seen through its ancient poetry'),
      soft('ta-classical-language', INDIA_LANGUAGES, 'Tamil’s place builds on knowing India’s many languages'),
      soft('ta-classical-language', REGIONAL_LIT, 'Sangam literature is the crown of India’s regional literatures'),
    ],
    newClusters: [
      { subject: TA, domain: 'Reading', ageRangeStart: 14, summary: 'Your teenager is reading Tamil across two thousand years — Sangam classics to modern free verse, and prose from short stories to travel writing.' },
      { subject: TA, domain: 'Writing', ageRangeStart: 14, summary: 'Your teenager is using written Tamil for real life — letters, forms, news and proposals — and attempting creative writing of their own.' },
      { subject: TA, domain: 'Grammar', ageRangeStart: 14, summary: 'Your teenager is mastering Tamil usage — the ல/ள/ழ and ந/ன/ண distinctions, rich vocabulary and idiom, correct sentences and reported speech.' },
      { subject: TA, domain: 'Language & Society', ageRangeStart: 14, summary: 'Your teenager is learning Tamil’s standing in the world — an ancient classical language, kin to its Dravidian sisters, alive worldwide and in the digital age.' },
    ],
  });
}
