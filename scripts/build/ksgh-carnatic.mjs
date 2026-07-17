#!/usr/bin/env node
/**
 * build/ksgh-carnatic.mjs — Carnatic graded-exam ladder (KSGH Mysuru, pp. 5–14
 * + shared framework pp. 2–4) → deepens the Music subject's "Carnatic Music"
 * domain from a 3-topic sketch into the real graded ladder: varisai exercises
 * through geetams, varnas and kritis to manodharma, pallavi and the concert.
 * See scratchpad sec-mu-carnatic-extract.md. Ages by typical learning age
 * (music arambam ~6). Idempotent.
 */

import { integrateStream, mintNs } from './ksgh.mjs';

const M = 'Music';
const std = (code, level, paper, title, description) => ({ code, level, paper, title, description });

const standards = [
  std('CAR.L1.T1', 'Prathamika (Primary)', 'Theory', 'Indian Music Systems', 'Carnatic vs Hindustani systems; the seven swaras; registers and shruti; janaka/janya ragas; raga lakshana of 18 ragas; tempo and tala basics; musical terms from sarale to kriti; eight composer biographies; instruments.'),
  std('CAR.L1.P1', 'Prathamika (Primary)', 'Practical 1', 'Abhyasa Gana', 'In Mayamalavagaula across three speeds: sarale, janti, datu, tarasthayi and mandrasthayi varases; the Suladi Sapta Tala alankaras; ten geetams and four jatiswaras.'),
  std('CAR.L1.P2', 'Prathamika (Primary)', 'Practical 2', 'First Repertoire', 'Four tanavarnas in one speed; ten madhyama-kala and five vilamba-kala kritis; two dasara kirtanas; two sharana vachanas.'),
  std('CAR.L2.T1', 'Madhyamika (Middle)', 'Theory 1', 'Raga and Tala Theory', 'Nada, graha, vadi/samvadi terms; the 35-tala scheme; chapu, deshadi and madhyadi talas; the 72 melakartas and katapayadi sutra; janya classification; notation; voice culture.'),
  std('CAR.L2.T2', 'Madhyamika (Middle)', 'Theory 2', 'Instruments, Forms and Composers', 'Instrument classes, construction and tuning; the compositional forms geeta to tillana; fifteen composer biographies; raga lakshana of 25 ragas.'),
  std('CAR.L2.P1', 'Madhyamika (Middle)', 'Practical 1', 'Alankaras and Lakshana Geetams', 'Alankaras in the 35 talas; four lakshana geetams; four swarajatis; two Nottuswara sahityas.'),
  std('CAR.L2.P2', 'Madhyamika (Middle)', 'Practical 2', 'Varnas and Pancharatna', 'Four Adi-tala varnas in two speeds; four Ata-tala varnas; a Navaraga Malika varna; two Ghanaraga Pancharatna kritis.'),
  std('CAR.L2.P3', 'Madhyamika (Middle)', 'Practical 3', 'Kriti Repertoire', 'Fifteen madhyama-kala and ten vilamba-kala kritis with brief alapana and swarakalpana for ten ragas; four dasara padas; four vachanas; two tillanas.'),
  std('CAR.L3.T1', 'Vidwat-Purva (Pre-Vidwat)', 'Theory 1', 'Aesthetics and Raga Science', 'Music among the arts; rasa; dhatu-matu and prabandha; the gamaka taxonomies; the thirteen raga lakshanas; raga lakshana of 30 ragas.'),
  std('CAR.L3.T2', 'Vidwat-Purva (Pre-Vidwat)', 'Theory 2', 'Treatises and Collection Kritis', 'Marga/deshi and the 108 talas; the musicological treatises from the Natyashastra to the Sangita Sampradaya Pradarshini; compositional forms; the great kriti collections; ten composer biographies.'),
  std('CAR.L3.P1', 'Vidwat-Purva (Pre-Vidwat)', 'Practical 1', 'Advanced Varnas and Group Kritis', 'The Bhairavi swarajati; earlier varnas in three speeds; jhampe/tripata varnas; three Ghanaraga Pancharatna kritis; Navaratri and Navaratna Malika kritis; divyanama and utsava sampradaya kirtanas.'),
  std('CAR.L3.P2', 'Vidwat-Purva (Pre-Vidwat)', 'Practical 2', 'The Improvisation Ladder', 'Thirty kritis graded from brief alapana, through alapana with swarakalpana, to mature alapana with neraval and swarakalpana across 54 ragas.'),
  std('CAR.L4.T1', 'Vidwat Antima (Final)', 'Theory 1', 'Manodharma and Acoustics', 'Manodharma dissected — alapana, tana, neraval, swarakalpana; the pallavi tradition; murchhana; concert practice; sound and acoustics; music genres; raga lakshana of 30 ragas; the 22 shrutis; raga pairs compared; the Trinity’s styles compared.'),
  std('CAR.L4.T2A', 'Vidwat Antima (Final)', 'Theory 2A', 'Geya Nataka', 'Complete knowledge of one musical drama: Prahlada Bhakti Vijaya, Nauka Charitra, Pallaki Seva Prabandha, Krishna Leela Tarangini or Geeta Govinda.'),
  std('CAR.L4.T2B', 'Vidwat Antima (Final)', 'Theory 2B', 'Tala and Percussion Scholarship', 'Tala and laya; percussion terminology; the tani avartanam; auxiliary percussion in concert; fitting muktaya swaras; biographies of the great laya vidwans.'),
  std('CAR.L4.P1', 'Vidwat Antima (Final)', 'Practical 1', 'Pallavi', 'Six pallavis across sixteen ragas in three graded tiers — four-kalai, two-kalai and one-kalai — with neraval and swarakalpana in anuloma-viloma-pratiloma modes.'),
  std('CAR.L4.P2', 'Vidwat Antima (Final)', 'Practical 2', 'The Wider Repertoire', 'Kshetrajna padas, ashtapadis, Haridasa padas, tarangas, vachanas, and mela/chatur ragamalikas.'),
  std('CAR.L4.P3', 'Vidwat Antima (Final)', 'Practical 3', 'Sangeeta Kacheri', 'A half-hour concert with violin and mridangam accompaniment — varna, kritis with alapana, neraval and swaraprastara, a tani avartanam, and a closing piece.'),
];

const T = (_slug, name, a0, a1, type, description, evidence, assessmentPrompt, stds) =>
  ({ _slug, subject: M, domain: 'Carnatic Music', name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards: stds.map((c) => `ksgh-music-exams:${c}`) });

const newTopics = [
  T('car-varisai', 'The Varisai Exercises', 6, 9, 'PROCEDURAL',
    'Learn the first exercises of Carnatic music — sarale and janti varisai, then datu and the upper- and lower-register varisais — sung to swara names in raga Mayamalavagaula, in three speeds.',
    ['Sing sarale and janti varisai in three speeds', 'Sing datu and sthayi varisais', 'Hold the raga and tala steadily through an exercise'],
    'Can {{name}} sing the beginning exercises — sarali and janta varisai — cleanly in three speeds?', ['CAR.L1.P1']),
  T('car-alankara', 'The Sapta Tala Alankaras', 7, 10, 'PROCEDURAL',
    'Sing the alankaras — melodic patterns set to each of the seven talas — joining swara practice to the tala system for the first time.',
    ['Sing the seven alankaras keeping their talas', 'Name the tala of each alankara', 'Sing an alankara in more than one speed'],
    'Can {{name}} sing the seven alankaras, keeping each one’s tala correctly?', ['CAR.L1.P1']),
  T('car-geetam', 'Geetams and Jatiswaras', 7, 10, 'PROCEDURAL',
    'Sing the first songs — pillari, sanchari and lakshana geetams and the jatiswaras — simple compositions that carry the learner from exercises into music.',
    ['Sing pillari and sanchari geetams', 'Sing a jatiswara', 'Explain what a lakshana geetam teaches about its raga'],
    'Can {{name}} sing the first geetams — like Lambodara — and a jatiswara, with correct swara and tala?', ['CAR.L1.P1']),
  T('car-sapta-tala', 'The Tala System: Sapta Talas to 35', 7, 11, 'CONCEPTUAL',
    'Understand the Carnatic tala system — the seven talas and their angas, the five jatis, and how they combine into the 35-tala scheme — with aksharakala as the unit of time.',
    ['Name the sapta talas and their angas', 'Explain how five jatis give 35 talas', 'Count a tala cycle showing its angas'],
    'Can {{name}} explain the seven talas and how the five jatis expand them into thirty-five?', ['CAR.L1.T1', 'CAR.L2.T1']),
  T('car-raga-basics', 'Janaka and Janya Ragas', 8, 11, 'CONCEPTUAL',
    'Understand how Carnatic ragas are organised — parent (janaka) and derived (janya) ragas, upanga, bhashanga and vakra varieties — and read a raga by its arohana and avarohana.',
    ['Distinguish janaka from janya ragas', 'State the arohana/avarohana of familiar ragas', 'Recognise upanga, bhashanga and vakra varieties'],
    'Can {{name}} explain parent and derived ragas, and give the ascent and descent of ragas they sing?', ['CAR.L1.T1']),
  T('car-varna', 'Learning Varnas', 9, 12, 'PROCEDURAL',
    'Learn the tanavarna — the concentrated form that trains raga, tala and stamina together — first in one speed, growing to Adi and Ata tala varnas in two and three speeds.',
    ['Sing a tanavarna in one speed', 'Sing an Adi-tala varna in two speeds', 'Explain the varna’s parts (pallavi, anupallavi, charanas)'],
    'Can {{name}} sing a varna — the form every Carnatic musician trains on — with its structure intact?', ['CAR.L1.P2', 'CAR.L2.P2', 'CAR.L3.P1']),
  T('car-kriti', 'Building a Kriti Repertoire', 9, 12, 'PROCEDURAL',
    'Build a repertoire of kritis — the central Carnatic form — in medium and slow tempos across the common ragas and talas, including the Ghanaraga Pancharatna kritis.',
    ['Sing madhyama-kala and vilamba-kala kritis', 'Sing a Pancharatna kriti', 'Name the raga, tala and composer of each kriti sung'],
    'Can {{name}} sing a growing set of kritis — naming each one’s raga, tala and composer?', ['CAR.L1.P2', 'CAR.L2.P3', 'CAR.L2.P2']),
  T('car-devotional', 'Dasara Padas and Vachanas', 9, 12, 'PROCEDURAL',
    'Sing Karnataka’s devotional repertoire — the dasara padas of the Haridasas and the vachanas of the Shivasharanas — alongside the classical forms.',
    ['Sing dasara kirtanas', 'Sing shivasharana vachanas', 'Tell what a pada or vachana is saying'],
    'Can {{name}} sing the songs of the Haridasas and the vachanas — and say what they mean?', ['CAR.L1.P2', 'CAR.L2.P3', 'CAR.L4.P2']),
  T('car-notation', 'Writing Music: Carnatic Notation', 10, 13, 'PROCEDURAL',
    'Write music down — the Carnatic notation (sangeeta lipi) for swara, tala and sahitya — and notate the compositions already learned.',
    ['Write a learned exercise or geetam in notation', 'Read an unfamiliar line from notation', 'Mark tala angas correctly in written music'],
    'Can {{name}} write down a geetam or varna in notation, and sing from notation they haven’t seen?', ['CAR.L2.T1']),
  T('car-melakarta', 'The 72 Melakartas and Katapayadi', 11, 14, 'CONCEPTUAL',
    'Understand the melakarta scheme — how 72 parent scales arise, their chakra organisation, and the katapayadi sutra that encodes each raga’s number in its name.',
    ['Explain how the 72 melakartas are constructed', 'Use the katapayadi sutra to find a mela number', 'Place a janya raga under its melakarta'],
    'Can {{name}} explain the 72 melakarta system and decode a raga’s number from its name?', ['CAR.L2.T1']),
  T('car-raga-lakshana', 'Raga Lakshana Study', 10, 14, 'CONCEPTUAL',
    'Study ragas one by one — their lakshana: arohana/avarohana, jeeva and nyasa swaras, vadi-samvadi relations, gamakas and characteristic phrases — across a growing list from 18 to over 100 ragas.',
    ['Give the lakshana of ragas from the graded lists', 'Identify a raga from its phrases', 'Compare two similar ragas by their lakshana'],
    'Can {{name}} describe ragas precisely — their notes, life-tones and turns of phrase — and tell close ragas apart?', ['CAR.L1.T1', 'CAR.L2.T2', 'CAR.L3.T1', 'CAR.L4.T1']),
  T('car-haridasa-mysore', 'The Haridasa and Mysore Traditions', 10, 13, 'CONCEPTUAL',
    'Know Karnataka’s own musical lineages — the Haridasas from Sripadaraya and Purandaradasa to Vijayadasa, and the Mysore court school of Veena Sheshanna, Mysore Sadashivarao and Mysore Vasudevacharya.',
    ['Name Haridasa composers and their contribution', 'Name Mysore-school musicians', 'Explain the vachana tradition’s place in Kannada music'],
    'Can {{name}} tell the story of Karnataka’s own composers — the Haridasas and the Mysore court school?', ['CAR.L1.T1', 'CAR.L2.T2', 'CAR.L3.T2']),
  T('car-alapana', 'Raga Alapana', 12, 15, 'PROCEDURAL',
    'Begin manodharma — improvising a raga’s alapana, from brief sketches to mature elaborations, unfolding the raga’s shape without words or tala.',
    ['Sing a brief alapana of a familiar raga', 'Grow an alapana through its stages', 'Stay within the raga’s lakshana while improvising'],
    'Can {{name}} improvise an alapana — unfolding a raga in their own phrases while keeping its character?', ['CAR.L3.P2', 'CAR.L4.T1']),
  T('car-neraval-swara', 'Neraval and Swarakalpana', 12, 15, 'PROCEDURAL',
    'Improvise within the composition — neraval, elaborating one line of sahitya, and swarakalpana, spinning solfa passages that land back on the theme.',
    ['Sing neraval on a kriti line', 'Sing sarvalaghu swarakalpana ending on the eduppu', 'Combine jati and gati variety in swara passages'],
    'Can {{name}} take one line of a kriti and elaborate it — then improvise swaras that land home on the beat?', ['CAR.L3.P2', 'CAR.L4.T1']),
  T('car-shruti-22', 'The 22 Shrutis', 13, 16, 'CONCEPTUAL',
    'Understand the microtonal foundation — how the 22 shrutis arise from shadja-panchama and shadja-madhyama cycles, and how ragas select among them.',
    ['Explain how the 22 shrutis arise', 'Distinguish pramana, nyuna and poorna shruti', 'Relate shruti choice to a raga’s colour'],
    'Can {{name}} explain the 22 shrutis — the fine intervals beneath the twelve notes — and why ragas sound the way they do?', ['CAR.L4.T1']),
  T('car-treatises', 'The Musicological Treatises', 13, 16, 'CONCEPTUAL',
    'Know the texts that theorised the music — from the Natyashastra and Brihaddeshi through the Sangita Ratnakara and Chaturdandi Prakashika to the Sangita Sampradaya Pradarshini.',
    ['Name the major treatises in order', 'State what each contributed', 'Explain how the melakarta scheme emerged from the treatises'],
    'Can {{name}} trace the great music treatises and what each added to the tradition?', ['CAR.L3.T2']),
  T('car-pallavi', 'Pallavi Singing', 14, 16, 'PROCEDURAL',
    'Master the pallavi — composing and singing a single line across kalai tiers with anuloma-viloma-pratiloma manipulation, neraval and swarakalpana — the summit of tala-craft.',
    ['Render a pallavi in multiple kalais', 'Apply anuloma and pratiloma to the line', 'Improvise neraval and swaras within the pallavi'],
    'Can {{name}} sing a pallavi — stretching and compressing one line across the tala in every direction?', ['CAR.L4.P1']),
  T('car-geya-nataka', 'Geya Nataka: The Musical Operas', 14, 16, 'CONCEPTUAL',
    'Study one complete musical drama — Prahlada Bhakti Vijaya, Nauka Charitra, Krishna Leela Tarangini, Pallaki Seva Prabandha or the Geeta Govinda — music carrying an entire story.',
    ['Outline the chosen opera’s story and structure', 'Sing pieces from it in context', 'Explain its place in the composer’s work'],
    'Can {{name}} take one musical opera — like Tyagaraja’s Nauka Charitra — and know it whole: story, songs and setting?', ['CAR.L4.T2A']),
  T('car-laya', 'Laya and Percussion in Concert', 13, 16, 'CONCEPTUAL',
    'Understand the rhythm side of the concert — tala versus laya, the percussion vocabulary from mohara to muktaya, the tani avartanam, and the great laya vidwans.',
    ['Distinguish tala from laya', 'Explain the tani avartanam and its stages', 'Name great mridangam vidwans'],
    'Can {{name}} explain what happens in a tani avartanam — and the craft of the drummers who play it?', ['CAR.L4.T2B']),
  T('car-kacheri', 'The Carnatic Kacheri', 14, 16, 'PROCEDURAL',
    'Give a concert — the kacheri format from varna through kritis with full manodharma to the tani avartanam and closing pieces, with accompanists.',
    ['Plan a balanced kacheri list', 'Perform with violin and mridangam accompaniment', 'Lead a main item with alapana, neraval and swaraprastara'],
    'Can {{name}} carry a real concert — choosing the list, leading the ensemble, and delivering a main item in full?', ['CAR.L4.P3']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const NS = (s) => mintNs('nios-sec', s);

const alignments = Object.fromEntries([
  [NS('mus-shruti-svara'), ['CAR.L1.T1']],
  [NS('mus-raga'), ['CAR.L1.T1']],
  [NS('mus-tala'), ['CAR.L1.T1']],
  [NS('mus-carnatic-gamaka'), ['CAR.L3.T1']],
  [NS('mus-carnatic-forms'), ['CAR.L2.T2']],
  [NS('mus-carnatic-composers'), ['CAR.L1.T1', 'CAR.L2.T2']],
]);

const newEdges = [
  hard('car-varisai', NS('mus-shruti-svara'), 'The varisais are sung sequences of the svaras'),
  soft('car-varisai', NS('mus-tala'), 'Exercises are kept to tala'),
  hard('car-alankara', 'car-varisai', 'Alankaras follow the varisai exercises'),
  soft('car-alankara', 'car-sapta-tala', 'Each alankara embodies one of the sapta talas'),
  hard('car-geetam', 'car-varisai', 'Geetams follow the exercise stage'),
  hard('car-sapta-tala', NS('mus-tala'), 'The Carnatic tala scheme deepens the idea of tala'),
  hard('car-raga-basics', NS('mus-raga'), 'Janaka-janya organisation deepens the idea of raga'),
  hard('car-varna', 'car-geetam', 'Varnas follow the geetams in the ladder'),
  soft('car-varna', 'car-raga-basics', 'A varna trains its raga’s full shape'),
  hard('car-kriti', 'car-geetam', 'Kritis follow the geetams in the ladder'),
  soft('car-kriti', NS('mus-carnatic-forms'), 'The kriti is the central Carnatic form'),
  soft('car-devotional', 'car-kriti', 'The devotional repertoire grows beside the kritis'),
  soft('car-devotional', NS('mus-carnatic-composers'), 'The padas come from the Haridasa composers'),
  soft('car-notation', 'car-geetam', 'Notation begins from pieces already sung'),
  soft('car-notation', 'car-sapta-tala', 'Notation marks the tala angas'),
  hard('car-melakarta', 'car-raga-basics', 'The 72-mela scheme organises the janaka ragas'),
  hard('car-raga-lakshana', 'car-raga-basics', 'Lakshana study builds on raga organisation'),
  soft('car-raga-lakshana', NS('mus-carnatic-gamaka'), 'A raga’s lakshana lives in its gamakas'),
  hard('car-haridasa-mysore', NS('mus-carnatic-composers'), 'The Karnataka lineages extend the composer story'),
  hard('car-alapana', 'car-raga-lakshana', 'Alapana improvises within a raga’s lakshana'),
  hard('car-neraval-swara', 'car-alapana', 'Neraval and swarakalpana follow alapana in manodharma'),
  soft('car-neraval-swara', 'car-kriti', 'Neraval elaborates a kriti’s line'),
  hard('car-shruti-22', NS('mus-shruti-svara'), 'The 22 shrutis deepen shruti and svara'),
  soft('car-shruti-22', 'car-melakarta', 'Shruti theory underlies the mela system'),
  soft('car-treatises', 'car-raga-lakshana', 'The treatises codify raga and tala science'),
  hard('car-pallavi', 'car-neraval-swara', 'Pallavi presupposes command of neraval and swarakalpana'),
  soft('car-pallavi', 'car-sapta-tala', 'Pallavi is the summit of tala manipulation'),
  soft('car-geya-nataka', 'car-kriti', 'The operas are known through their songs'),
  hard('car-laya', 'car-sapta-tala', 'Percussion scholarship builds on the tala system'),
  hard('car-kacheri', 'car-neraval-swara', 'The concert’s main item requires manodharma'),
  soft('car-kacheri', 'car-varna', 'A kacheri opens with a varna'),
  soft('car-kacheri', 'car-laya', 'The kacheri includes the tani avartanam'),
];

const B = (a, summary) => ({ subject: M, domain: 'Carnatic Music', ageRangeStart: a, summary });
const newClusters = [
  B(6, 'Your child is beginning Carnatic music — the sarali and janta varisai exercises sung to the swaras, in the traditional first raga, across three speeds.'),
  B(9, 'Your child is climbing the Carnatic ladder — varnas and kritis, the devotional padas and vachanas of Karnataka, and writing music in notation.'),
  B(12, 'Your teenager is entering manodharma — improvising alapana, neraval and swarakalpana — with deep raga study behind it.'),
  B(14, 'Your teenager is reaching concert readiness — pallavi singing, the musical operas, percussion scholarship, and the full kacheri with accompanists.'),
];

integrateStream({ stream: 'Carnatic Music', standards, newTopics, alignments, newEdges, newClusters });
