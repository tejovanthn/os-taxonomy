#!/usr/bin/env node
/**
 * build/ksgh-hindustani.mjs — Hindustani graded-exam ladder (KSGH Mysuru,
 * pp. 15–33: vocal/melodic pp. 15–27 + a separately-headed tabla ladder
 * pp. 28–33) → deepens the Music subject's "Hindustani Music" domain into the
 * real graded ladder. See scratchpad sec-mu-hindustani-extract.md. Ages by
 * typical learning age. Idempotent.
 */

import { integrateStream, mintNs, mintId } from './ksgh.mjs';

const M = 'Music';
const std = (code, level, paper, title, description) => ({ code, level, paper, title, description });

const standards = [
  std('HIN.L1.T1', 'Prathamika (Primary)', 'Theory', 'Fundamentals of Hindustani Music', 'Core terminology from nada and thaat to khayal and taal; sixteen basic ragas; writing a chota khayal in Bhatkhande notation; seven taals; the Bhatkhande and Paluskar notation systems; seven biographies.'),
  std('HIN.L1.P1', 'Prathamika (Primary)', 'Practical 1', 'Introductory Vocal Method 1', 'Alankars in three layas; shuddha and vikrit swaras; swargeet, lakshan geet and chota khayal with aalap and taan in eight ragas; a dhrupad; a dasara pada; taal presentation; raga identification.'),
  std('HIN.L1.P2', 'Prathamika (Primary)', 'Practical 2', 'Introductory Vocal Method 2', 'Eight further ragas with sargam, lakshan geet and chota khayal; a bhajan; a vachana; more taals; raga identification. Instrumental students substitute gats and todas throughout.'),
  std('HIN.L2.T1', 'Madhyamika (Middle)', 'Theory 1', 'Bharatiya Sangeeta Shastra', 'Raga classification vocabulary; the ornaments (meend, gamak, khatka, murki); the taan taxonomy; Masidkhani and Razakhani gats; sound and nada; the 22 shrutis; ancient biographies; vilambit taals.'),
  std('HIN.L2.T2', 'Madhyamika (Middle)', 'Theory 2', 'Classical Introduction to Hindustani Vocal Music', 'Classical detail and notation for 26 ragas; a bada khayal in notation; the vocal forms khayal to bhajan; instrument classification; composer biographies; further taals.'),
  std('HIN.L2.P1', 'Madhyamika (Middle)', 'Practical 1', 'Khayal Prastuti 1', 'Bada and chota khayal with aalap-taan across fifteen ragas; vilambit taals demonstrated; tanpura tuning.'),
  std('HIN.L2.P2', 'Madhyamika (Middle)', 'Practical 2', 'Khayal Prastuti 2', 'Bada and chota khayal with aalap-taan across fifteen further ragas; vilambit Teentaal, Aada Chautaal, Tilwada.'),
  std('HIN.L2.P3', 'Madhyamika (Middle)', 'Practical 3', 'Hindustani Vocal Forms', 'Dhrupad and dhamar in laya tiers; tarana; chaturang; bhajan, vachana and dasara pada; the lighter taals presented.'),
  std('HIN.L3.T1', 'Vidwat-Purva (Pre-Vidwat)', 'Theory 1', 'Values and Dimensions of Music', 'Music among the arts and its values; the origin and evolution of khayal; ten gharana-founding biographies; sixteen heavier ragas.'),
  std('HIN.L3.T2', 'Vidwat-Purva (Pre-Vidwat)', 'Theory 2', 'The Raga System', 'Instruments’ characters; performers’ merits and faults; gharana history; anibaddha and nibaddha singing; how ragas unfold; allied-raga comparison; raga, rasa, samaya and laya.'),
  std('HIN.L3.P1', 'Vidwat-Purva (Pre-Vidwat)', 'Practical 1', 'Raga Prastuti 1', 'Thirty-to-forty-five-minute bada and chota khayal elaborations across eight ragas; dhrupad and dhamar in four laya tiers; two taranas.'),
  std('HIN.L3.P2', 'Vidwat-Purva (Pre-Vidwat)', 'Practical 2', 'Raga Prastuti 2', 'Elaborations across seven further ragas including Darbari Kanada; a thumri; a chaturang; a bhajan.'),
  std('HIN.L4.T1', 'Vidwat Antima (Final)', 'Theory 1', 'Types and Dimensions of Music', 'History of Indian music from the Vedic period; media and music; the genres; a comparative study of Carnatic and Hindustani music; sixteen advanced ragas; artist versus teacher.'),
  std('HIN.L4.T2', 'Vidwat Antima (Final)', 'Theory 2', 'Music Treatises and Essays', 'The treatises from the Natyashastra to Bhatkhande’s works; theories of the Hindustani system; new developments and challenges; accompaniment; the artist’s responsibility.'),
  std('HIN.L4.P1', 'Vidwat Antima (Final)', 'Practical 1', 'Elaborate Raga Presentation 1', 'Full elaborations across eight advanced ragas; dhrupad and dhamar; tarana; an elaborate thumri.'),
  std('HIN.L4.P2', 'Vidwat Antima (Final)', 'Practical 2', 'Elaborate Raga Presentation 2', 'Elaborations across nine further ragas; chaturang; bhajan; oral viva on vistaar method, tarana vocabulary and mishra raga.'),
  std('HIN.L4.P3', 'Vidwat Antima (Final)', 'Practical 3', 'Baithak', 'A formal recital — an elaborate bada and chota khayal with accompaniment, assessed on purity of swara and raga, development and imagination, layakari and taan, and overall impact.'),
  std('TAB.L1', 'Prathamika (Primary)', 'Tabla', 'Tabla: Primary', 'Tabla and dagga construction; the ten basic bols; thekas of the core taals with dugun and chougun; kaydas with paltas and tihai; mukhda, tukda and laggi; notation systems; accompaniment basics.'),
  std('TAB.L2', 'Madhyamika (Middle)', 'Tabla', 'Tabla: Middle', 'Tabla history and construction; peshkar to paran terminology; vilambit thekas; gharana-style kaydas; twenty-minute solo; accompanying khayal.'),
  std('TAB.L3', 'Vidwat-Purva (Pre-Vidwat)', 'Tabla', 'Tabla: Pre-Vidwat', 'Taal construction theory and the ten pranas; tabla gharanas surveyed; thirty-minute solos; rare taals; composing new mukhda, tukda and tihai; the Delhi, Purab and Punjab baaj compared.'),
  std('TAB.L4', 'Vidwat Antima (Final)', 'Tabla', 'Tabla: Vidwat', 'The five jaatis of taal; the six gharanas’ playing styles; treatise references; forty-minute solo; accompanying thumri and vocal music; oral recitation and tabla tuning.'),
];

const T = (_slug, name, a0, a1, type, description, evidence, assessmentPrompt, stds) =>
  ({ _slug, subject: M, domain: 'Hindustani Music', name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards: stds.map((c) => `ksgh-music-exams:${c}`) });

const newTopics = [
  T('hin-alankar-palta', 'Alankars and Paltas', 6, 9, 'PROCEDURAL',
    'Sing the first Hindustani exercises — alankars and paltas — in single, double and quadruple speed (thaay, dugun, chougun), learning shuddha and komal swaras by ear and voice.',
    ['Sing basic alankars in thaay, dugun and chougun', 'Sing and identify shuddha and vikrit swaras', 'Keep the taal while singing an exercise'],
    'Can {{name}} sing the beginning alankars in three speeds, telling natural notes from flattened ones?', ['HIN.L1.P1']),
  T('hin-sargam-geet', 'Sargam and Lakshan Geets', 7, 10, 'PROCEDURAL',
    'Sing the first songs — sargam geets sung to note-names, and lakshan geets whose words teach the raga’s own rules.',
    ['Sing a sargam geet in a syllabus raga', 'Sing a lakshan geet and say what it teaches about its raga', 'Hold sthayi and antara structure'],
    'Can {{name}} sing sargam and lakshan geets — songs that teach the raga while you sing it?', ['HIN.L1.P1', 'HIN.L1.P2']),
  T('hin-first-ragas', 'The First Ragas', 8, 11, 'CONCEPTUAL',
    'Know the first sixteen ragas — Bhoopali, Des, Khamaj, Bhairav, Malkauns and their companions — their aaroha-avaroha, pakad, vaadi-samvaadi and singing time, and recognise them by ear.',
    ['Give the classical details of the primary ragas', 'Identify a primary raga sung by another', 'Sing the pakad of familiar ragas'],
    'Can {{name}} describe and recognise the first Hindustani ragas — like Bhoopali and Bhairav — by their signs?', ['HIN.L1.T1', 'HIN.L1.P1', 'HIN.L1.P2']),
  T('hin-taal-basics', 'The Hindustani Taals', 7, 10, 'CONCEPTUAL',
    'Understand the Hindustani taal system — sam, khaali and vibhag, the theka — and keep the core taals: Teentaal, Ektaal, Rooptaal, Rupak, Dadra, Keharwa, Chautaal.',
    ['Clap a taal showing sam and khaali', 'Recite the theka of the core taals', 'Recognise a taal from its theka'],
    'Can {{name}} keep the great Hindustani taals — clapping sam and khaali — and say their thekas?', ['HIN.L1.T1', 'TAB.L1']),
  T('hin-chota-khayal', 'The Chota Khayal', 9, 12, 'PROCEDURAL',
    'Sing the chota khayal — the fast composition at the heart of the tradition — with sthayi and antara, and four aalaps and four taans of one’s own.',
    ['Sing a chota khayal with correct sthayi-antara', 'Add aalap before and taan within the khayal', 'Name the raga and taal of each khayal sung'],
    'Can {{name}} sing a chota khayal with their own aalap and taan?', ['HIN.L1.P1', 'HIN.L1.P2', 'HIN.L2.P1']),
  T('hin-notation', 'Bhatkhande and Paluskar Notation', 10, 13, 'PROCEDURAL',
    'Write Hindustani music — the Bhatkhande and Paluskar swaralipi and taallipi systems — notating khayals and taals accurately.',
    ['Write a chota khayal in Bhatkhande notation', 'Write a taal in taal-lipi with its markings', 'Read an unseen line from notation'],
    'Can {{name}} write a khayal down in Bhatkhande notation and read music back from the page?', ['HIN.L1.T1', 'HIN.L2.T2']),
  T('hin-ornaments', 'Meend, Gamak and the Ornaments', 10, 13, 'PROCEDURAL',
    'Master the ornaments that give Hindustani music its curve — meend, gamak, andolan, kan swar, khatka and murki — and use them within the raga.',
    ['Demonstrate meend and gamak', 'Use khatka and murki in a phrase', 'Name the ornament heard in a phrase'],
    'Can {{name}} bend and grace the notes — meend, gamak, murki — the way the style demands?', ['HIN.L2.T1']),
  T('hin-taan', 'The Art of Taan', 11, 14, 'PROCEDURAL',
    'Command the taan in its varieties — saral, vakra, alankarik, bol, koota and the rest — the fast passages that crown a khayal.',
    ['Sing saral and vakra taans in a raga', 'Sing a bol taan on the composition’s words', 'Keep the taal through fast taan passages'],
    'Can {{name}} sing the different kinds of taan — straight, crooked, worded — cleanly inside the taal?', ['HIN.L2.T1', 'HIN.L2.P1', 'HIN.L2.P2']),
  T('hin-bada-khayal', 'The Bada Khayal', 11, 14, 'PROCEDURAL',
    'Sing the bada khayal — the slow, vast form in vilambit taals like Ektaal and Tilwada — unfolding the raga patiently before the fast khayal.',
    ['Sing a bada khayal in a vilambit taal', 'Develop the sthayi with unhurried aalap', 'Pair the bada khayal with its chota khayal'],
    'Can {{name}} sing a bada khayal — holding the slow cycle and letting the raga open gradually?', ['HIN.L2.T2', 'HIN.L2.P1', 'HIN.L2.P2']),
  T('hin-dhrupad-dhamar', 'Dhrupad and Dhamar', 10, 13, 'PROCEDURAL',
    'Sing the oldest forms — dhrupad in Chautaal and dhamar in its own fourteen-beat taal — with the layakari of thaay, dugun and chougun.',
    ['Sing a dhrupad in laya tiers', 'Sing a dhamar', 'Show the doubling and quadrupling of the text against the taal'],
    'Can {{name}} sing dhrupad and dhamar, doubling and redoubling the words against the beat?', ['HIN.L2.P3', 'HIN.L3.P1']),
  T('hin-light-forms', 'Thumri, Tarana and the Lighter Forms', 12, 15, 'PROCEDURAL',
    'Sing the expressive and virtuoso forms — thumri in ragas like Kafi and Khamaj, tarana on its syllables, chaturang joining four elements — beside bhajan and vachana.',
    ['Present a tarana', 'Present a thumri with expressive freedom', 'Sing a chaturang'],
    'Can {{name}} colour a thumri, drive a tarana, and explain what makes these forms lighter?', ['HIN.L2.P3', 'HIN.L3.P2', 'HIN.L4.P1']),
  T('hin-raga-time', 'Raga, Rasa and Time', 12, 15, 'CONCEPTUAL',
    'Understand the deeper raga system — how ragas relate to rasa, to their singing time (gayan samay), and to allied ragas that differ by a hair — and how a raga is unfolded.',
    ['Explain gayan samay with examples', 'Compare two allied ragas', 'Explain how a raga is progressively unfolded'],
    'Can {{name}} explain why ragas belong to hours of the day, and tell apart two ragas that nearly share their notes?', ['HIN.L3.T2']),
  T('hin-gharanas', 'The Gharanas', 12, 15, 'CONCEPTUAL',
    'Know the gharana tradition — the family-lineages of style, their history and founders from Gwalior to Kirana, and how gharana shapes a musician’s singing.',
    ['Explain what a gharana is', 'Name gharanas and founding masters', 'Describe a stylistic difference between gharanas'],
    'Can {{name}} explain the gharana system — the family styles of Hindustani music — and name some of its great houses?', ['HIN.L3.T1', 'HIN.L3.T2']),
  T('hin-vistaar', 'Elaborating the Raga: Vistaar', 13, 16, 'PROCEDURAL',
    'Carry a raga for half an hour and more — the elaborated bada and chota khayal, anibaddha and nibaddha development, aalap through layakari to taan — the mature art of raga presentation.',
    ['Elaborate a bada khayal over 30–45 minutes', 'Balance unmetered and metered development', 'Sustain the raga’s character throughout'],
    'Can {{name}} hold a raga for half an hour — building it from silence to full flight without losing its face?', ['HIN.L3.P1', 'HIN.L3.P2', 'HIN.L4.P1', 'HIN.L4.P2']),
  T('hin-baithak', 'The Baithak', 14, 16, 'PROCEDURAL',
    'Give the formal recital — a full khayal presentation with harmonium and tabla, judged on purity of swara and raga, imagination, layakari and impact.',
    ['Present a full khayal with accompaniment', 'Coordinate with harmonium and tabla', 'Sustain purity and impact under assessment'],
    'Can {{name}} sit for a baithak — a real recital with accompanists — and carry it from first breath to close?', ['HIN.L4.P3']),
  T('hin-history-treatises', 'Hindustani Music: History and Treatises', 13, 16, 'CONCEPTUAL',
    'Trace Hindustani music’s history from the Vedic period through the treatises — Natyashastra, Brihaddeshi, Sangeeta Ratnakara to Bhatkhande’s modern system — and its meeting with the Carnatic tradition.',
    ['Outline the history of Indian music by period', 'Name the treatises and Bhatkhande’s works', 'Compare the Hindustani and Carnatic systems in outline'],
    'Can {{name}} trace how Hindustani music came to be — from the Vedas to Bhatkhande — and how it differs from the Carnatic south?', ['HIN.L4.T1', 'HIN.L4.T2']),
  T('hin-tabla-basics', 'Playing Tabla: Bols and Thekas', 7, 10, 'PROCEDURAL',
    'Begin tabla — the instrument’s parts, the ten basic bols, the thekas of the core taals in single and double speed, and the first kaydas with paltas and tihai.',
    ['Play the ten basic bols cleanly', 'Play core thekas with dugun and chougun', 'Play a kayda with paltas and a tihai'],
    'Can {{name}} play the basic tabla strokes and keep the great thekas — finishing a kayda with a tihai?', ['TAB.L1']),
  T('hin-tabla-solo', 'The Tabla Solo', 11, 14, 'PROCEDURAL',
    'Build the solo art — peshkar, kayda, mukhda, tukda, paran and chakradar — into extended solos, drawing on the styles of the six gharanas.',
    ['Play an extended solo with the canonical sections', 'Play kaydas in different gharana styles', 'Compose a new mukhda or tihai'],
    'Can {{name}} sit for a tabla solo — peshkar through chakradar — with the shape the tradition expects?', ['TAB.L2', 'TAB.L3', 'TAB.L4']),
  T('hin-tabla-sangat', 'Saath-Sangat: The Art of Accompaniment', 12, 15, 'PROCEDURAL',
    'Accompany music — finding the sam, holding vilambit thekas under a bada khayal, laggi for thumri — the listening art of saath-sangat.',
    ['Find sam and taal from another’s singing', 'Accompany a khayal with a steady vilambit theka', 'Close a thumri accompaniment with laggi'],
    'Can {{name}} accompany a singer — catching the sam, breathing with the khayal, sparkling in the laggi?', ['TAB.L1', 'TAB.L2', 'TAB.L4']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const NS = (s) => mintNs('nios-sec', s);

const alignments = Object.fromEntries([
  [NS('mus-raga'), ['HIN.L1.T1']],
  [NS('mus-tala'), ['HIN.L1.T1']],
  [NS('mus-thaat'), ['HIN.L1.T1', 'HIN.L2.T1']],
  [NS('mus-hindustani-forms'), ['HIN.L2.T2']],
  [NS('mus-hindustani-vocal'), ['HIN.L2.P3']],
  [NS('mus-notation-voice'), ['HIN.L1.T1']],
]);

const newEdges = [
  hard('hin-alankar-palta', NS('mus-shruti-svara'), 'The alankars are sung sequences of the svaras'),
  hard('hin-sargam-geet', 'hin-alankar-palta', 'The geets follow the exercise stage'),
  hard('hin-first-ragas', NS('mus-raga'), 'The primary ragas apply the idea of raga'),
  hard('hin-taal-basics', NS('mus-tala'), 'The Hindustani taals deepen the idea of tala'),
  hard('hin-chota-khayal', 'hin-sargam-geet', 'The chota khayal follows the sargam and lakshan geets'),
  soft('hin-chota-khayal', 'hin-first-ragas', 'Khayals are sung in the ragas being learned'),
  hard('hin-notation', NS('mus-notation-voice'), 'Bhatkhande notation deepens notation and voice culture'),
  soft('hin-notation', 'hin-chota-khayal', 'Notation practice writes the khayals being sung'),
  soft('hin-ornaments', 'hin-chota-khayal', 'The ornaments decorate the khayal being sung'),
  hard('hin-taan', 'hin-ornaments', 'Taan technique builds on the ornaments'),
  hard('hin-bada-khayal', 'hin-chota-khayal', 'The bada khayal follows the chota khayal'),
  soft('hin-bada-khayal', NS('mus-thaat'), 'Raga development leans on the thaat system'),
  hard('hin-dhrupad-dhamar', NS('mus-hindustani-vocal'), 'Dhrupad practice deepens the vocal forms'),
  soft('hin-dhrupad-dhamar', 'hin-taal-basics', 'Dhrupad layakari works against the taal'),
  soft('hin-light-forms', 'hin-bada-khayal', 'The lighter forms follow the khayal discipline'),
  soft('hin-raga-time', 'hin-first-ragas', 'Raga-time theory builds on knowing ragas'),
  soft('hin-gharanas', 'hin-bada-khayal', 'Gharana style is heard in khayal singing'),
  hard('hin-vistaar', 'hin-bada-khayal', 'Elaboration extends the bada khayal'),
  hard('hin-vistaar', 'hin-taan', 'Elaboration requires command of taan'),
  soft('hin-vistaar', 'hin-raga-time', 'Mature presentation honours raga, rasa and time'),
  hard('hin-baithak', 'hin-vistaar', 'The recital presents the elaborated raga'),
  soft('hin-baithak', 'hin-tabla-sangat', 'The baithak is carried with accompaniment'),
  hard('hin-tabla-basics', 'hin-taal-basics', 'Tabla playing builds on the taal system'),
  hard('hin-tabla-solo', 'hin-tabla-basics', 'The solo builds on bols and thekas'),
  soft('hin-tabla-solo', 'hin-gharanas', 'Solo styles follow the gharana traditions'),
  hard('hin-tabla-sangat', 'hin-tabla-basics', 'Accompaniment builds on the thekas'),
  soft('hin-tabla-sangat', 'hin-tabla-solo', 'Sangat draws on the solo vocabulary'),
  soft('hin-history-treatises', 'hin-gharanas', 'History frames the gharana tradition'),
  soft('hin-history-treatises', mintId('car-treatises'), 'The two classical systems share their treatise heritage'),
];

const B = (a, summary) => ({ subject: M, domain: 'Hindustani Music', ageRangeStart: a, summary });
const newClusters = [
  B(6, 'Your child is beginning Hindustani music — alankars and paltas sung in three speeds, learning the natural and flattened notes by voice and ear.'),
  B(9, 'Your child is entering the khayal tradition — chota khayal with their own aalap and taan, the first sixteen ragas, notation, and the beginnings of tabla.'),
  B(11, 'Your child is deepening the art — bada khayal in slow cycles, the ornaments and taan varieties, dhrupad and dhamar, and the tabla solo.'),
  B(13, 'Your teenager is approaching mastery — half-hour raga elaborations, thumri and the lighter forms, the gharana tradition, accompaniment, and the formal baithak.'),
];

integrateStream({ stream: 'Hindustani Music', standards, newTopics, alignments, newEdges, newClusters });
