#!/usr/bin/env node
/**
 * build/nios-sec-darshan-sahitya.mjs — NIOS Secondary Bharatiya Darshan (247)
 * and Sanskrit Sahitya (248). Darshan → a new "Indian Philosophy" domain under
 * Indian Culture & Heritage; Sahitya → extends the Sanskrit subject's
 * Literature domain. Sanskrit-medium syllabi recovered via OCR (tables
 * verified against page images; totals reconcile) — see scratchpad
 * sec-darshan-extract.md / sec-sahitya-extract.md. Idempotent.
 */

import { integrateSubject, mintId } from './nios-sec.mjs';

const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });

// ---------------- Bharatiya Darshan (247) ----------------
{
  const IC = 'Indian Culture & Heritage';
  const T = (_slug, name, type, description, evidence, assessmentPrompt, standards) =>
    ({ _slug, subject: IC, domain: 'Indian Philosophy', name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });
  integrateSubject({
    subject: { name: 'Bharatiya Darshan', courseCode: '247' },
    standards: [
      std('247.C1', 'Chapter 1 (Lessons 1–6)', 'दर्शनविद्याप्रस्थानपरिचयः', 'Introduction to Darshana and the Streams of Indian Learning', 'What darshana is — its scope, sources, pramanas and the causes of disagreement; the classification of Indian learning (Veda, Vedangas, Upangas, Upavedas); and the prasthana-traya.'),
      std('247.C2', 'Chapter 2 (Lessons 7–9)', 'नास्तिकदर्शनानि', 'The Heterodox (Nastika) Systems', 'Charvaka, Buddhist and Arhata (Jain) darshanas — their history, acharyas, texts, epistemology, metaphysics and view of moksha.'),
      std('247.C3', 'Chapter 3 (Lessons 10–16)', 'आस्तिकदर्शनानि', 'The Orthodox (Astika) Systems', 'Nyaya-Vaisheshika, Sankhya, Yoga, Mimamsa and Vedanta — their history, acharyas, texts, categories, epistemology and moksha.'),
      std('247.C4', 'Chapter 4 (Lessons 17–25)', 'अद्वैतवेदान्तः', 'Advaita Vedanta', 'The four preliminaries; Brahman; Maya; Ishvara and Jiva; adhyaropa-apavada; the external and internal means to moksha; and the nature of moksha.'),
    ],
    newTopics: [
      T('dar-what-is', 'What Darshana Is', 'CONCEPTUAL',
        'Understand darshana — Indian philosophy — as the disciplined pursuit of life’s highest aim: what it studies, its sources, the means of valid knowledge (प्रमाण), and why the schools honestly disagree.',
        ['Explain what darshana means and pursues', 'Name the pramanas (means of knowledge) in outline', 'Explain why the darshanas disagree with one another'],
        'Can {{name}} explain what Indian philosophy (darshana) is about, and why its schools reach different answers?', ['nios-sec-2020:247.C1']),
      T('dar-map-of-learning', 'The Map of Indian Learning', 'CONCEPTUAL',
        'Know the classical map of Indian learning — the Veda at its centre, the six Vedangas that serve it, the Upangas and Upavedas around it — and the prasthana-traya, the three foundational text-streams.',
        ['Name the Vedangas in outline', 'Explain what the Upavedas are', 'Explain the prasthana-traya (Shruti, Smriti and reasoning texts)'],
        'Can {{name}} sketch the classical map of Indian learning — the Veda, its limbs, and the three foundational text-streams?', ['nios-sec-2020:247.C1']),
      T('dar-astika-nastika', 'Astika and Nastika Schools', 'CONCEPTUAL',
        'Understand the great division of Indian philosophy — the astika schools that accept the Veda’s authority and the nastika schools (Charvaka, Buddhist, Jain) that do not — and what each side holds.',
        ['State the astika/nastika criterion', 'List the six astika and three nastika schools', 'Explain that the division is about Vedic authority, not belief in God'],
        'Can {{name}} explain how Indian philosophy divides into schools that accept the Veda and schools that do not — and name them?', ['nios-sec-2020:247.C1', 'nios-sec-2020:247.C2']),
      T('dar-charvaka', 'Charvaka: The Materialists', 'CONCEPTUAL',
        'Understand the Charvaka darshana — India’s ancient materialists, who accepted only perception as knowledge and this life as the whole of existence — and its place as philosophy’s sharpest critic.',
        ['State the Charvaka view of knowledge (perception only)', 'State its view of life and moksha', 'Explain its role as a challenge the other schools answered'],
        'Can {{name}} explain the Charvaka view — only what we perceive is real, and this life is all — and why it mattered?', ['nios-sec-2020:247.C2']),
      T('dar-buddhist-jain', 'Buddhist and Jain Darshana', 'CONCEPTUAL',
        'Understand the Buddhist and Arhata (Jain) darshanas as philosophies — their teachers, texts and doctrines of knowledge, reality and liberation — beyond their religious observances.',
        ['State a core Buddhist philosophical doctrine', 'State a core Jain philosophical doctrine (e.g. anekanta)', 'Name a text or acharya of each tradition'],
        'Can {{name}} explain the philosophical teachings of the Buddhists and Jains — how they saw knowledge, reality and liberation?', ['nios-sec-2020:247.C2']),
      T('dar-nyaya-vaisheshika', 'Nyaya and Vaisheshika', 'CONCEPTUAL',
        'Understand the paired schools of logic and nature — Nyaya, the discipline of right reasoning and debate, and Vaisheshika, the analysis of reality into its categories (पदार्थ) — and their view of moksha.',
        ['Explain Nyaya’s concern with valid reasoning', 'Explain Vaisheshika’s categories in outline', 'Name a foundational text or acharya'],
        'Can {{name}} explain the logic school (Nyaya) and the nature-analysing school (Vaisheshika) and what they sought?', ['nios-sec-2020:247.C3']),
      T('dar-sankhya-yoga', 'Sankhya and Yoga Darshana', 'CONCEPTUAL',
        'Understand Sankhya — the analysis of existence into consciousness (पुरुष) and nature (प्रकृति) — and Yoga, its practical partner, the discipline of stilling the mind, from Patanjali to the living traditions.',
        ['Explain the purusha–prakriti distinction', 'Explain Yoga as Sankhya’s practical discipline', 'Name the eight limbs of Yoga in outline'],
        'Can {{name}} explain Sankhya’s two realities — consciousness and nature — and Yoga as the practice that frees the one from the other?', ['nios-sec-2020:247.C3']),
      T('dar-mimamsa', 'Mimamsa Darshana', 'CONCEPTUAL',
        'Understand Mimamsa — the school of Vedic interpretation and ritual duty (धर्म) — its method of reading texts, its epistemology, and its view of the goal of life.',
        ['Explain Mimamsa’s concern with dharma and ritual', 'Explain its care for rules of text interpretation', 'Name a foundational text or acharya'],
        'Can {{name}} explain what the Mimamsa school cared about — duty, ritual and how to read the Veda rightly?', ['nios-sec-2020:247.C3']),
      T('dar-vedanta-schools', 'Vedanta and Its Schools', 'CONCEPTUAL',
        'Understand Vedanta — the darshana of the Upanishads’ conclusion — and the family of schools that grew from it, Advaita and the others, agreeing on the texts while differing on the truth they teach.',
        ['Explain what Vedanta takes as its foundation', 'Name schools within Vedanta (Advaita and others)', 'Explain how the schools differ over one reality or many'],
        'Can {{name}} explain what Vedanta is, and that it grew into several schools that read the same texts differently?', ['nios-sec-2020:247.C3']),
      T('dar-advaita-brahman', 'Advaita: Brahman', 'CONCEPTUAL',
        'Understand Advaita Vedanta’s central teaching — Brahman as the one reality, defined in itself (स्वरूपलक्षण) and by reference to the world (तटस्थलक्षण) — and the four preliminaries of its study.',
        ['State the four preliminaries (adhikari, vishaya, sambandha, prayojana)', 'Distinguish the two definitions of Brahman', 'State Advaita’s core claim of non-duality'],
        'Can {{name}} explain Advaita’s central claim — one reality, Brahman — and the two ways it is defined?', ['nios-sec-2020:247.C4']),
      T('dar-advaita-maya-jiva', 'Advaita: Maya, Ishvara and Jiva', 'CONCEPTUAL',
        'Understand how Advaita accounts for the world and ourselves — Maya, the power of appearance; Ishvara and the individual Jiva explained through the analogies of reflection and delimitation.',
        ['Explain Maya in outline (the five marks)', 'Use the reflection analogy for Ishvara and Jiva', 'Explain how one reality appears as many'],
        'Can {{name}} explain how Advaita accounts for the many — Maya, and the images of one light reflected in many waters?', ['nios-sec-2020:247.C4']),
      T('dar-advaita-moksha', 'Advaita: The Path to Moksha', 'CONCEPTUAL',
        'Understand Advaita’s path to liberation — the teaching method of superimposition and retraction (अध्यारोप-अपवाद), the outer means (karma, bhakti, upasana) and inner means (shravana, manana, nididhyasana), and moksha as recognising what was never lost.',
        ['Explain the adhyaropa-apavada teaching method', 'Distinguish the outer and inner means', 'Explain moksha as already-attained (prapta-prapti)'],
        'Can {{name}} explain Advaita’s path — how the teaching first affirms and then retracts, and why liberation is described as finding what you never lost?', ['nios-sec-2020:247.C4']),
    ],
    newEdges: [
      soft('dar-what-is', mintId('cult-religion-ancient'), 'Darshana grows from the religion and philosophy of ancient India'),
      hard('dar-map-of-learning', 'dar-what-is', 'The map of learning locates darshana among the vidyas'),
      hard('dar-astika-nastika', 'dar-what-is', 'The astika/nastika division organises the darshanas just introduced'),
      hard('dar-charvaka', 'dar-astika-nastika', 'Charvaka is a nastika school within the division'),
      hard('dar-buddhist-jain', 'dar-astika-nastika', 'The Buddhist and Jain darshanas are nastika schools'),
      hard('dar-nyaya-vaisheshika', 'dar-astika-nastika', 'Nyaya-Vaisheshika are astika schools within the division'),
      hard('dar-sankhya-yoga', 'dar-astika-nastika', 'Sankhya and Yoga are astika schools within the division'),
      hard('dar-mimamsa', 'dar-astika-nastika', 'Mimamsa is an astika school within the division'),
      hard('dar-vedanta-schools', 'dar-astika-nastika', 'Vedanta is an astika school within the division'),
      soft('dar-mimamsa', mintId('veda-what-is'), 'Mimamsa interprets the Veda already introduced'),
      hard('dar-advaita-brahman', 'dar-vedanta-schools', 'Advaita is studied in depth after the Vedanta overview'),
      hard('dar-advaita-maya-jiva', 'dar-advaita-brahman', 'Maya, Ishvara and Jiva presuppose the teaching of Brahman'),
      hard('dar-advaita-moksha', 'dar-advaita-maya-jiva', 'The path to moksha builds on the full Advaita picture'),
      soft('dar-sankhya-yoga', mintId('psy-yoga-mind'), 'Yoga darshana deepens yoga as a practice for the mind'),
    ],
    newClusters: [
      { subject: IC, domain: 'Indian Philosophy', ageRangeStart: 14, summary: 'Your teenager is studying Indian philosophy proper — what darshana is, the astika and nastika schools from Charvaka to Vedanta, and a deep reading of Advaita: Brahman, Maya, and the path to liberation.' },
    ],
  });
}

// ---------------- Sanskrit Sahitya (248) ----------------
{
  const SK = 'Sanskrit';
  const T = (_slug, name, type, description, evidence, assessmentPrompt, standards) =>
    ({ _slug, subject: SK, domain: 'Literature', name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });
  integrateSubject({
    subject: { name: 'Sanskrit Sahitya', courseCode: '248' },
    standards: [
      std('248.S1', 'Section 1 (Lessons 1–7)', 'सुभाषितादिकं कथासाहित्यम्', 'Subhashitas and Story Literature', 'Subhashitas with anvaya and meaning; riddle and problem verses; and tales from the Vetalapanchavimshati, Shukasaptati and Panchatantra.'),
      std('248.S2', 'Section 2 (Lessons 8–11)', 'काव्यपरिचयः', 'Introduction to Kavya', 'What sahitya, kavya, kavi and pratibha mean; the sahridaya and the purpose of literature; and the genres of kavya.'),
      std('248.S3', 'Section 3 (Lessons 12–15)', 'रामायणाध्ययनम्', 'Study of the Ramayana', 'Valmiki’s Ramayana, Kishkindha-kanda sarga 3 — the meeting of Rama and Hanuman — with anvaya and meaning.'),
      std('248.S4', 'Section 4 (Lessons 16–22)', 'काव्याध्ययनम्', 'Study of Kavya', 'Bhasa’s Karnabharam (Karna’s anguish, the weapon, the gift of armour) and Bharavi’s Kiratarjuniyam sarga 1.'),
    ],
    newTopics: [
      T('sah-subhashita', 'Subhashitas: Verses of Wisdom', 'CONCEPTUAL',
        'Read subhashitas — Sanskrit’s polished verses of wit and wisdom — working out the prose order (अन्वय), literal meaning and purport of each.',
        ['Give the anvaya (prose order) of a subhashita', 'State a subhashita’s literal meaning and purport', 'Quote a subhashita apt to a situation'],
        'Can {{name}} unpack a Sanskrit wisdom-verse — rearrange it into prose order and explain what it teaches?', ['nios-sec-2020:248.S1']),
      T('sah-prahelika', 'Riddle and Problem Verses', 'CONCEPTUAL',
        'Enjoy the playful side of Sanskrit — prahelikas (riddle-verses) and samasya-shlokas (problem-verses posed for completion) — and see how poets used puzzles to delight and sharpen readers.',
        ['Solve a simple Sanskrit riddle-verse', 'Explain what a samasya-shloka is', 'Explain why poets composed puzzle-verses'],
        'Can {{name}} enjoy a Sanskrit riddle-verse — solving it and explaining the trick?', ['nios-sec-2020:248.S1']),
      T('sah-katha', 'The Sanskrit Story Collections', 'CONCEPTUAL',
        'Read tales from Sanskrit’s great story collections — the Vetala’s twenty-five riddling tales, the parrot’s seventy of the Shukasaptati, and the Panchatantra’s animal fables — with their morals and wordplay.',
        ['Retell a tale from the Vetalapanchavimshati or Panchatantra', 'State the moral a tale argues (e.g. "where dharma is, there is victory")', 'Explain the frame-story device these collections use'],
        'Can {{name}} retell a classic Sanskrit tale — from the Vetala stories or Panchatantra — and its point?', ['nios-sec-2020:248.S1']),
      T('sah-what-is-kavya', 'What Kavya Is', 'CONCEPTUAL',
        'Understand the classical account of literature — what sahitya and kavya are, the poet (कवि) and poetic genius (प्रतिभा), the ideal reader (सहृदय), and what literature is for.',
        ['Explain kavya and kavi in the classical sense', 'Explain pratibha (poetic genius) and the sahridaya (ideal reader)', 'State classical purposes of literature'],
        'Can {{name}} explain the classical view of poetry — the poet’s genius, the feeling reader, and what literature is for?', ['nios-sec-2020:248.S2']),
      T('sah-kavya-genres', 'The Genres of Kavya', 'CONCEPTUAL',
        'Know the genres of Sanskrit literature — drama to be seen (दृश्य) and poetry to be heard (श्रव्य); verse, prose and the mixed champu; and the great mahakavya.',
        ['Distinguish drishya from shravya kavya', 'Name genres: nataka, gadya, padya, champu, mahakavya', 'Place a studied work in its genre'],
        'Can {{name}} name the kinds of Sanskrit literature — plays, heard poetry, prose, champu, epic — and give an example?', ['nios-sec-2020:248.S2']),
      T('sah-ramayana', 'Reading the Ramayana: Rama Meets Hanuman', 'CONCEPTUAL',
        'Read Valmiki himself — the Kishkindha-kanda scene where Hanuman first meets Rama and Lakshmana — verse by verse with prose order and meaning, savouring Hanuman’s celebrated speech.',
        ['Give the anvaya and meaning of a studied verse', 'Retell the meeting of Rama and Hanuman', 'Explain why Hanuman’s speech is praised as perfect'],
        'Can {{name}} read the famous first meeting of Rama and Hanuman in Valmiki’s own verses and explain them?', ['nios-sec-2020:248.S3']),
      T('sah-karnabharam', 'Bhasa’s Karnabharam', 'CONCEPTUAL',
        'Read Bhasa’s one-act play Karnabharam — Karna’s anguish before battle, the story of the fatal weapon, and his gift of the divine armour — Sanskrit drama at its most humane.',
        ['Retell the play’s action (Karna’s burden and gift)', 'Explain Karna’s character as the play draws it', 'Read a passage of the play with meaning'],
        'Can {{name}} tell the story of Bhasa’s play about Karna — his anguish and his great gift — from the text?', ['nios-sec-2020:248.S4']),
      T('sah-kiratarjuniyam', 'Bharavi’s Kiratarjuniyam', 'CONCEPTUAL',
        'Read the opening of Bharavi’s mahakavya Kiratarjuniyam — the forest spy’s report, Duryodhana’s cunning statecraft, and Yudhishthira’s measured counsel — epic court-poetry in its full power.',
        ['Give the sense of studied verses from sarga 1', 'Describe Duryodhana’s conduct as the spy reports it', 'Explain Yudhishthira’s response'],
        'Can {{name}} read the opening of the Kiratarjuniyam — the spy’s report and the counsel it provokes — and explain it?', ['nios-sec-2020:248.S4']),
    ],
    newEdges: [
      hard('sah-subhashita', mintId('sa-reading'), 'Reading subhashitas presupposes reading simple Sanskrit'),
      soft('sah-prahelika', 'sah-subhashita', 'Riddle-verses follow the subhashita readings'),
      soft('sah-katha', mintId('sa-literature'), 'The story collections extend Sanskrit literature study'),
      soft('sah-what-is-kavya', mintId('sa-literature'), 'Poetics builds on acquaintance with Sanskrit literature'),
      hard('sah-kavya-genres', 'sah-what-is-kavya', 'The genres presuppose knowing what kavya is'),
      hard('sah-ramayana', 'sah-subhashita', 'Reading Valmiki builds on verse-reading with anvaya'),
      soft('sah-karnabharam', 'sah-kavya-genres', 'The play is read knowing its genre (drishya kavya)'),
      soft('sah-kiratarjuniyam', 'sah-kavya-genres', 'The mahakavya is read knowing its genre'),
      soft('sah-kiratarjuniyam', 'sah-ramayana', 'Epic court-poetry follows the epic itself'),
      soft('sah-what-is-kavya', mintId('cult-classical-lit'), 'Sanskrit poetics deepens the classical-literature heritage'),
    ],
    newClusters: [],
  });
}
