#!/usr/bin/env node
/**
 * build/ksgh-dance.mjs — Bharatanatyam graded-exam ladder (KSGH Mysuru, dance
 * division, pp. 34–52) → a new "Dance" subject. Four levels (Prathamika,
 * Madhyamika, Vidwat-Purva, Vidwat Antima), each with theory and practical
 * papers — see scratchpad sec-mu-dance-extract.md. Ages by typical learning
 * age: primary ≈ 6-9, middle ≈ 9-12, pre-vidwat ≈ 12-15, vidwat ≈ 14-16.
 * Idempotent.
 */

import { integrateStream, mintNs } from './ksgh.mjs';

const D = 'Dance';
const std = (code, level, paper, title, description) => ({ code, level, paper, title, description });

const standards = [
  std('DAN.L1.T1', 'Prathamika (Primary)', 'Theory', 'Natyotpatti (Origin of Dance)', 'The origin story of natya; intro to the Natyashastra and Abhinaya Darpana; the eight classical dances; the ten adavus and their features; hasta gestures with shlokas; tala angas and the five jatis; instrument classes; temple dance sculpture; Purandara Dasa and Kanaka Dasa.'),
  std('DAN.L1.P1', 'Prathamika (Primary)', 'Practical 1', 'Sangeeta Samanvaya (Music Coordination)', 'Singing sarale and janti varases and four geetas; head/eye/neck/brow bhedas with shloka; asamyukta and samyukta hastas; dance exercises (vyayama kriyas) and tratakas; the ten adavus in three speeds.'),
  std('DAN.L1.P2', 'Prathamika (Primary)', 'Practical 2', 'Nrittabhinaya', 'First dance items: Tisra and Chaturasra Alarippu, Jatiswaram in Adi tala, one Kautvam, one Kannada Devaranama, two Devata Shlokas — with the meaning and defining character of each.'),
  std('DAN.L2.T1', 'Madhyamika (Middle)', 'Theory 1', 'Chaturvidhabhinaya', 'Dance terminology; the Nataraja image explained; the four abhinayas (angika, vachika, aharya, satvika); hasta viniyogas; lakshanas of the dance-item forms; the four pada bhedas.'),
  std('DAN.L2.T2', 'Madhyamika (Middle)', 'Theory 2', 'Classical and Folk Dances', 'The eight classical dances in detail; Karnataka folk dances; the Suladi Sapta Talas and their angas; raga lakshanas; composer biographies; the navarasas.'),
  std('DAN.L2.P1', 'Madhyamika (Middle)', 'Practical 1', 'Hastabhinaya and Pada Bhedas', 'Viniyogas of the asamyukta, samyukta and devata hastas; asanas useful for dance; the ten adavus in five jatis and three speeds; the pada bhedas demonstrated.'),
  std('DAN.L2.P2', 'Madhyamika (Middle)', 'Practical 2', 'Narthana Marga', 'Suladi Sapta Tala alankaras sung in three speeds; Khanda Alarippu, Jatiswaram in Rupaka, one Shabdam; one Padavarnam, one Padam, one Kannada Javali, one Kriti, one Tillana — with lakshana, sollukattu, teermana, muktaya and meaning.'),
  std('DAN.L3.T1', 'Vidwat-Purva (Pre-Vidwat)', 'Theory 1', 'Rasa, Bhava and Nayaka-Nayika Bhava', 'Advanced terminology; the rasa-sutra and theories of rasa; sthayi, vibhava, anubhava, vyabhichari and satvika bhavas; performer qualities; nayaka-nayika classification per the Natyashastra and Dasharupaka.'),
  std('DAN.L3.T2', 'Vidwat-Purva (Pre-Vidwat)', 'Theory 2', 'Dance Treatises and Dance-Drama Traditions', 'Dance-drama traditions (Yakshagana, Bhagavata Mela and others); South Indian folk dances; five dance treatises; navagraha and bandhava hastas; the tala dasha pranas; writing adavu sollukattus in tala notation.'),
  std('DAN.L3.P1', 'Vidwat-Purva (Pre-Vidwat)', 'Practical 1', 'Hastabhinaya and Sangeeta (oral)', 'Navagraha and bandhava hastas with shloka; janaka-janya ragas; the Marga tradition; composing a jati with muktaya; nattuvangam for Alarippu and Jatiswaram; singing all pieces with shruti and tala.'),
  std('DAN.L3.P2', 'Vidwat-Purva (Pre-Vidwat)', 'Practical 2', 'Narthana Marga', 'Seven further adavu families in five jatis and three speeds; Mishra Alarippu, new Jatiswaram, Shabdam, nayaka-nayika Padavarnam, Kshetrajna Pada, Javali, Shringara Shloka, Vachana, Tillana.'),
  std('DAN.L4.T1', 'Vidwat Antima (Final)', 'Theory 1', 'Shastra Prapoorna', 'Dance in classical literature; Shiva’s sapta tandavas; dashavatara and chaturvarna hastas; multimedia and classical dance; navavidha bhakti; pioneer biographies; guru-shishya parampara; complex muktayas in tala notation.'),
  std('DAN.L4.T2', 'Vidwat Antima (Final)', 'Theory 2', 'Great Personalities and Contemporary Dance', 'Composer-saint lineages; the revivalists of Indian dance; contemporary dance techniques; Uday Shankar; Western ballet origins; stagecraft per the Natyashastra; performance requirements.'),
  std('DAN.L4.P1', 'Vidwat Antima (Final)', 'Practical 1', 'Margam', 'Sankeerna Alarippu, Choornike, Daruvarnam, Padam, a full Ashtapadi, navarasabhinaya to an examiner-given scenario, Javali, Antahpuragite.'),
  std('DAN.L4.P2', 'Vidwat Antima (Final)', 'Practical 2', 'Srujanashila Nritya Sanyojane (Creative Choreography)', 'Choreographing to an examiner-given jati; abhinaya composition for a devaranama or Kannada geya sahitya; nayaka-nayika bhava in sequence; singing and nattuvangam for a Padavarnam and Tillana.'),
  std('DAN.L4.P3', 'Vidwat Antima (Final)', 'Practical 3', 'Nritya Kacheri (Recital)', 'A full concert margam — Pushpanjali through Mangalam — performed with narration explaining the lakshana and meaning of every item.'),
];

const T = (_slug, domain, name, a0, a1, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: D, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards });
const K = (c) => `ksgh-music-exams:${c}`;

const newTopics = [
  // ---- Foundations of Dance ----
  T('dan-origins', 'Foundations of Dance', 'The Origin of Dance', 6, 9, 'CONCEPTUAL',
    'Know the story of how dance began as the Natyashastra tells it, and meet the two great books of dance — the Natyashastra and the Abhinaya Darpana.',
    ['Retell the origin story of natya', 'Name the Natyashastra and Abhinaya Darpana', 'Explain that dance in India follows written tradition'],
    'Can {{name}} tell the story of how dance was born, and name the ancient books dancers still follow?', [K('DAN.L1.T1')]),
  T('dan-tala-for-dance', 'Foundations of Dance', 'Tala for Dancers', 6, 9, 'CONCEPTUAL',
    'Understand the rhythm framework a dancer keeps — the tala angas (laghu, druta, anudruta) with their symbols, and the five jatis (tisra, chaturasra, khanda, mishra, sankeerna).',
    ['Name the tala angas and their symbols', 'Name the five jatis', 'Keep a simple tala while moving'],
    'Can {{name}} name the parts of a tala and its five jatis, and keep the beat while dancing?', [K('DAN.L1.T1'), K('DAN.L1.P1')]),
  T('dan-exercises', 'Foundations of Dance', 'Dance Exercises and Posture', 6, 9, 'PROCEDURAL',
    'Build the dancer’s body — the vyayama kriyas (exercise movements) including the aramandala half-sit, the fixed-gaze tratakas, and later the asanas useful for dance.',
    ['Perform basic vyayama kriyas including aramandala', 'Hold a fixed gaze (trataka)', 'Show correct dance posture'],
    'Can {{name}} do the dancer’s warm-up exercises and hold the aramandala position with steady eyes?', [K('DAN.L1.P1'), K('DAN.L2.P1')]),
  T('dan-instruments', 'Foundations of Dance', 'The Instruments of Dance', 6, 9, 'CONCEPTUAL',
    'Know the four classes of instruments (string, wind, membrane-percussion, solid) and the ensemble that accompanies Bharatanatyam.',
    ['Sort instruments into the four classes', 'Name instruments used in Bharatanatyam', 'Recognise the sound of the dance ensemble'],
    'Can {{name}} name the kinds of instruments and which ones play for a Bharatanatyam dancer?', [K('DAN.L1.T1')]),
  // ---- Bharatanatyam (practical ladder) ----
  T('dan-adavus', 'Bharatanatyam', 'The Ten Adavus', 6, 9, 'PROCEDURAL',
    'Learn the ten basic adavus — the building-block steps of Bharatanatyam — with their stance, hand-space, nritta hasta and leg movement, danced in three speeds (trikala).',
    ['Perform the ten adavus', 'Show an adavu in three speeds', 'Name an adavu’s four defining features'],
    'Can {{name}} dance the ten basic adavus, keeping them clean through three speeds?', [K('DAN.L1.P1'), K('DAN.L1.T1')]),
  T('dan-adavus-jatis', 'Bharatanatyam', 'Adavus in the Five Jatis', 9, 12, 'PROCEDURAL',
    'Deepen the adavus — dancing the ten adavus in all five jatis and three speeds, the full rhythmic matrix of the basic steps.',
    ['Perform adavus in each of the five jatis', 'Hold trikala within each jati', 'Recite an adavu’s sollukattu while dancing it'],
    'Can {{name}} dance the adavus through all five jatis, in three speeds each?', [K('DAN.L2.P1')]),
  T('dan-adavu-families', 'Bharatanatyam', 'The Advanced Adavu Families', 12, 15, 'PROCEDURAL',
    'Master the further adavu families beyond the basic ten — including plavana (leaping), tandava, shikhara and nade adavus — in five jatis and three speeds.',
    ['Perform adavus from the advanced families', 'Sustain jati and speed discipline in them', 'Write an adavu’s sollukattu in tala notation'],
    'Can {{name}} dance the advanced adavu families — leaps and tandava steps — with the same discipline as the basics?', [K('DAN.L3.P2'), K('DAN.L3.T2')]),
  T('dan-first-items', 'Bharatanatyam', 'First Dance Items', 7, 10, 'PROCEDURAL',
    'Dance the first items of the repertoire — Tisra and Chaturasra Alarippu, a Jatiswaram in Adi tala, a Kautvam, a Kannada Devaranama and Devata Shlokas — knowing each item’s meaning and defining character.',
    ['Perform an Alarippu and a Jatiswaram', 'Present a Devaranama or Kautvam', 'State the meaning and lakshana of each item danced'],
    'Can {{name}} perform their first full dance pieces — an Alarippu, a Jatiswaram, a Devaranama — and say what each one is?', [K('DAN.L1.P2')]),
  T('dan-margam-middle', 'Bharatanatyam', 'Building the Margam', 9, 12, 'PROCEDURAL',
    'Grow the repertoire to the central margam items — Khanda Alarippu, Rupaka Jatiswaram, Shabdam, a Padavarnam, a Padam, a Kannada Javali, a Kriti and a Tillana — with each item’s lakshana, sollukattu and meaning.',
    ['Perform a Shabdam and a Padavarnam', 'Perform a Javali, Kriti and Tillana', 'Explain the lakshana and meaning of each item'],
    'Can {{name}} dance the heart of the margam — Shabdam, Varnam, Padam, Tillana — and explain each piece?', [K('DAN.L2.P2')]),
  T('dan-margam-senior', 'Bharatanatyam', 'The Expanding Repertoire', 12, 15, 'PROCEDURAL',
    'Extend the repertoire into subtler territory — Mishra Alarippu, a nayaka-nayika Padavarnam, a Kshetrajna Pada, a Shringara Shloka, a Vachana and further Javali and Tillana.',
    ['Perform a nayaka-nayika Padavarnam', 'Present a Kshetrajna Pada or Vachana', 'Sing the pieces danced, with shruti and tala'],
    'Can {{name}} dance the senior repertoire — varnams of longing, padas and vachanas — and sing what they dance?', [K('DAN.L3.P2')]),
  T('dan-kacheri', 'Bharatanatyam', 'The Full Dance Recital', 14, 16, 'PROCEDURAL',
    'Present a complete Bharatanatyam kacheri — Pushpanjali through Daruvarnam, Ashtapadi and Padam to Tillana and Mangalam — with narration explaining every item’s character and meaning.',
    ['Perform a full margam in concert format', 'Present an Ashtapadi and Daruvarnam', 'Narrate each item’s lakshana and meaning to an audience'],
    'Can {{name}} carry a full dance recital — from Pushpanjali to Mangalam — introducing and explaining every piece?', [K('DAN.L4.P1'), K('DAN.L4.P3')]),
  T('dan-nattuvangam', 'Bharatanatyam', 'Nattuvangam and Singing for Dance', 10, 13, 'PROCEDURAL',
    'Lead the dance from the side — sing the pieces with shruti and tala, recite sollukattu with teermana and muktaya, compose a jati, and keep nattuvangam (cymbal-led conducting) for Alarippu and Jatiswaram.',
    ['Sing danced pieces keeping shruti and tala', 'Recite sollukattus with correct muktaya', 'Keep nattuvangam for a simple item'],
    'Can {{name}} sing and conduct for dance — reciting the rhythm syllables and keeping nattuvangam?', [K('DAN.L3.P1'), K('DAN.L2.P2'), K('DAN.L4.T1')]),
  T('dan-choreography', 'Bharatanatyam', 'Creating Dance: Choreography', 14, 16, 'PROCEDURAL',
    'Compose dance of your own — choreograph to a given jati, set abhinaya to a devaranama or other lyric, and shape nayaka-nayika bhava into sequence.',
    ['Choreograph movement to a given jati', 'Set abhinaya to a given devaranama or lyric', 'Justify the choices made in a composition'],
    'Can {{name}} make their own dance — turning a rhythm or a song into choreography that works?', [K('DAN.L4.P2')]),
  // ---- Abhinaya ----
  T('dan-bhedas', 'Abhinaya', 'The Bhedas: Head, Eyes, Neck and Brows', 6, 9, 'PROCEDURAL',
    'Train the dancer’s expressive instrument — the shiro (head), drishti (eye), griva (neck) and bhru (brow) bhedas of the Abhinaya Darpana, each with its shloka.',
    ['Demonstrate the head and eye bhedas', 'Demonstrate the neck and brow bhedas', 'Recite the shloka for a bheda set'],
    'Can {{name}} move head, eyes, neck and brows through their classical positions — and name them?', [K('DAN.L1.P1')]),
  T('dan-hastas', 'Abhinaya', 'The Hasta Mudras', 7, 10, 'PROCEDURAL',
    'Learn the hand-language of dance — the asamyukta (single-hand), samyukta (joined-hand) and nritta hastas of the Abhinaya Darpana, with their shlokas.',
    ['Show the asamyukta hastas in order with shloka', 'Show the samyukta hastas', 'Name the nritta hastas'],
    'Can {{name}} speak with their hands — showing the single and joined hasta mudras with their verses?', [K('DAN.L1.T1'), K('DAN.L1.P1')]),
  T('dan-hasta-viniyoga', 'Abhinaya', 'Using the Hastas: Viniyoga', 9, 12, 'PROCEDURAL',
    'Put the hastas to work — the viniyogas (applications) of the asamyukta and samyukta hastas, and the devata hastas for the deities.',
    ['Demonstrate viniyogas of common hastas', 'Show the devata hastas', 'Use the right hasta to depict a given object or idea'],
    'Can {{name}} use the hand gestures to actually say things — a deer, a king, a god — choosing the right hasta?', [K('DAN.L2.P1'), K('DAN.L2.T1')]),
  T('dan-hastas-iconographic', 'Abhinaya', 'The Iconographic Hastas', 12, 15, 'PROCEDURAL',
    'Master the specialised hasta sets — navagraha (nine planets), bandhava (kinship), dashavatara (ten avatars) and chaturvarna hastas — with their shlokas.',
    ['Show the navagraha hastas with shloka', 'Show the bandhava hastas', 'Show the dashavatara hastas'],
    'Can {{name}} show the specialised hasta sets — planets, kinship, the ten avatars — with their verses?', [K('DAN.L3.T2'), K('DAN.L3.P1'), K('DAN.L4.T1')]),
  T('dan-chaturvidha', 'Abhinaya', 'The Four Abhinayas', 9, 12, 'CONCEPTUAL',
    'Understand the four channels of dramatic expression — angika (body), vachika (voice), aharya (costume and makeup) and satvika (inner feeling) — and the pada bhedas of movement.',
    ['Name and explain the four abhinayas', 'Give an example of each channel in performance', 'Demonstrate the pada bhedas'],
    'Can {{name}} explain the four ways a dancer expresses — body, voice, costume and feeling — with examples?', [K('DAN.L2.T1')]),
  T('dan-navarasa', 'Abhinaya', 'The Navarasas', 9, 12, 'CONCEPTUAL',
    'Know the nine rasas — the sentiments dance evokes, from shringara (love) and hasya (mirth) to karuna (compassion) and shanta (peace) — and show them in the face.',
    ['Name the nine rasas', 'Show several rasas in facial expression', 'Match a story moment to its rasa'],
    'Can {{name}} name the nine rasas and show them — love, laughter, fury, wonder — in their face?', [K('DAN.L2.T2')]),
  T('dan-rasa-theory', 'Abhinaya', 'Rasa Theory and Nayaka-Nayika Bhava', 12, 15, 'CONCEPTUAL',
    'Go deeper into aesthetics — the rasa-sutra and its interpretations, the bhava machinery (sthayi, vibhava, anubhava, vyabhichari, satvika), and the classification of nayaka and nayika.',
    ['State the rasa-sutra and explain its terms', 'Distinguish the kinds of bhava', 'Classify a nayika from a padam’s situation'],
    'Can {{name}} explain how rasa arises — the theory behind the feeling — and read a padam’s heroine by her type?', [K('DAN.L3.T1'), K('DAN.L4.P1')]),
  // ---- Dance Traditions ----
  T('dan-eight-classical', 'Dance Traditions', "India's Eight Classical Dances", 8, 11, 'CONCEPTUAL',
    'Know India’s eight classical dance forms — Bharatanatyam, Kuchipudi, Mohiniyattam, Kathakali, Kathak, Manipuri, Odissi and Sattriya — their origins, costume and character.',
    ['Name the eight classical dances and their regions', 'Describe the costume or style of several forms', 'Distinguish two forms by their look and movement'],
    'Can {{name}} name India’s eight classical dances and tell a few of them apart by costume and style?', [K('DAN.L1.T1'), K('DAN.L2.T2')]),
  T('dan-folk', 'Dance Traditions', 'Folk Dances of South India', 9, 12, 'CONCEPTUAL',
    'Know the folk dance traditions of Karnataka — Kamsale, Dollu Kunitha, Veeragase, Kolata and others — and the folk dances of the neighbouring southern states.',
    ['Name Karnataka folk dances', 'Describe a folk dance’s occasion or community', 'Distinguish folk from classical dance'],
    'Can {{name}} name Karnataka’s folk dances — like Dollu Kunitha and Kolata — and say when they are danced?', [K('DAN.L2.T2'), K('DAN.L3.T2')]),
  T('dan-nataraja', 'Dance Traditions', 'Nataraja: The Lord of Dance', 9, 12, 'CONCEPTUAL',
    'Understand the Nataraja image — Shiva as cosmic dancer — its symbolism, and the sapta tandavas, the seven forms of his dance.',
    ['Explain the elements of the Nataraja image', 'Tell what the dance of Shiva symbolises', 'Name the sapta tandavas'],
    'Can {{name}} read the Nataraja image — the drum, the flame, the dwarf underfoot — and say what the dance means?', [K('DAN.L2.T1'), K('DAN.L4.T1')]),
  T('dan-treatises', 'Dance Traditions', 'The Dance Treatises and Dance-Drama', 12, 15, 'CONCEPTUAL',
    'Know the treatises that codify dance — Natyashastra, Abhinaya Darpana, Dasharupaka, Sangeeta Ratnakara, Lasyaranjana — and the dance-drama traditions like Yakshagana and Bhagavata Mela.',
    ['Name the major dance treatises', 'Describe a dance-drama tradition such as Yakshagana', 'Explain what a treatise contributes to practice'],
    'Can {{name}} name the great dance texts and describe a dance-drama tradition like Yakshagana?', [K('DAN.L3.T2')]),
  T('dan-pioneers', 'Dance Traditions', 'Pioneers and Revivalists of Indian Dance', 12, 16, 'CONCEPTUAL',
    'Know the great dancers and revivalists — Balasaraswati, Birju Maharaj, Kelucharan Mohapatra, Rukmini Devi Arundale, E. Krishna Iyer — the guru-shishya parampara, and how classical dance was renewed in the twentieth century.',
    ['Name pioneers of several classical forms', 'Explain the dance revival of the twentieth century', 'Explain the guru-shishya parampara'],
    'Can {{name}} name the masters who carried and revived Indian dance, and explain how it is passed from guru to shishya?', [K('DAN.L4.T1'), K('DAN.L4.T2')]),
  T('dan-contemporary', 'Dance Traditions', 'Contemporary Dance and the Stage', 13, 16, 'CONCEPTUAL',
    'Understand dance beyond the classical margam — Uday Shankar and contemporary Indian dance, the origins of Western ballet, and the stagecraft (space, sound, light) that frames a performance.',
    ['Describe Uday Shankar’s contribution', 'Sketch the origins of Western ballet', 'Explain the staging needs of a dance performance'],
    'Can {{name}} talk about dance beyond the classical repertoire — contemporary work, ballet, and what a stage needs?', [K('DAN.L4.T2')]),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const MUS_TALA = mintNs('nios-sec', 'mus-tala');
const MUS_SVARA = mintNs('nios-sec', 'mus-shruti-svara');
const CULT_MUSIC_DANCE = mintNs('nios-sec', 'cult-music-dance');

const newEdges = [
  soft('dan-origins', CULT_MUSIC_DANCE, 'Dance study builds on knowing India’s performing arts'),
  hard('dan-tala-for-dance', MUS_TALA, 'Tala for dancers builds on understanding tala'),
  hard('dan-adavus', 'dan-exercises', 'The adavus require the dancer’s posture and conditioning'),
  soft('dan-adavus', 'dan-tala-for-dance', 'Adavus are danced to tala'),
  hard('dan-adavus-jatis', 'dan-adavus', 'The jati matrix builds on the ten adavus'),
  hard('dan-adavu-families', 'dan-adavus-jatis', 'The advanced families extend the adavus in jatis'),
  hard('dan-first-items', 'dan-adavus', 'The first items are built from the adavus'),
  soft('dan-first-items', 'dan-bhedas', 'Items use the head and eye movements'),
  soft('dan-first-items', 'dan-hastas', 'Items use the hasta mudras'),
  hard('dan-margam-middle', 'dan-first-items', 'The margam grows from the first items'),
  soft('dan-margam-middle', 'dan-adavus-jatis', 'The middle items draw on the fuller adavu matrix'),
  hard('dan-margam-senior', 'dan-margam-middle', 'The senior repertoire extends the margam'),
  soft('dan-margam-senior', 'dan-rasa-theory', 'Nayaka-nayika varnams draw on rasa theory'),
  hard('dan-kacheri', 'dan-margam-senior', 'The full recital presupposes the senior repertoire'),
  soft('dan-kacheri', 'dan-nattuvangam', 'The recital is presented with narration and musical command'),
  hard('dan-nattuvangam', 'dan-tala-for-dance', 'Nattuvangam builds on the dancer’s tala'),
  soft('dan-nattuvangam', MUS_SVARA, 'Singing for dance builds on svara and shruti'),
  hard('dan-choreography', 'dan-margam-senior', 'Choreography presupposes command of the repertoire'),
  hard('dan-choreography', 'dan-nattuvangam', 'Composing to a jati requires rhythmic command'),
  hard('dan-hastas', 'dan-bhedas', 'The hasta work follows the first expressive training'),
  hard('dan-hasta-viniyoga', 'dan-hastas', 'Viniyoga applies the hastas already learned'),
  hard('dan-hastas-iconographic', 'dan-hasta-viniyoga', 'The specialised sets build on viniyoga'),
  soft('dan-chaturvidha', 'dan-bhedas', 'The four abhinayas frame the expressive training'),
  hard('dan-navarasa', 'dan-chaturvidha', 'The rasas are expressed through the abhinayas'),
  hard('dan-rasa-theory', 'dan-navarasa', 'Rasa theory deepens the navarasas'),
  soft('dan-eight-classical', 'dan-origins', 'The eight forms share the origin tradition'),
  soft('dan-folk', 'dan-eight-classical', 'Folk dance is known against the classical forms'),
  soft('dan-nataraja', 'dan-origins', 'Nataraja embodies the divine origin of dance'),
  soft('dan-treatises', 'dan-origins', 'The treatises elaborate the tradition first met in the origin story'),
  soft('dan-pioneers', 'dan-eight-classical', 'The pioneers are known through their forms'),
  soft('dan-contemporary', 'dan-pioneers', 'Contemporary dance follows the revival generation'),
];

const B = (domain, a, summary) => ({ subject: D, domain, ageRangeStart: a, summary });
const newClusters = [
  B('Foundations of Dance', 6, 'Your child is building a dancer’s foundations — the story of dance’s origin, keeping tala, the training exercises and posture, and the instruments that accompany the dance.'),
  B('Bharatanatyam', 6, 'Your child is beginning Bharatanatyam — the ten basic adavus danced in three speeds, leading to their first full items like the Alarippu and Jatiswaram.'),
  B('Bharatanatyam', 9, 'Your child is growing their margam — adavus across the five jatis, and the central repertoire of Shabdam, Padavarnam, Javali and Tillana, learning to sing and conduct as well as dance.'),
  B('Bharatanatyam', 12, 'Your child is entering the senior repertoire — advanced adavu families, varnams of nayaka-nayika bhava, padas and vachanas.'),
  B('Bharatanatyam', 14, 'Your teenager is reaching performance mastery — the full concert recital with narration, and composing choreography of their own.'),
  B('Abhinaya', 6, 'Your child is training the dancer’s expression — the classical movements of head, eyes, neck and brows, and the hasta mudras that let the hands speak.'),
  B('Abhinaya', 9, 'Your child is learning to mean things in dance — applying the hastas (viniyoga), the four channels of abhinaya, and the nine rasas shown in the face.'),
  B('Abhinaya', 12, 'Your teenager is mastering expressive depth — the specialised hasta sets, and the theory of rasa and nayaka-nayika bhava behind the repertoire.'),
  B('Dance Traditions', 8, 'Your child is discovering India’s dance heritage — the eight classical forms, the folk dances of the south, and the image of Nataraja, lord of dance.'),
  B('Dance Traditions', 12, 'Your teenager is studying dance as a tradition — its treatises and dance-drama forms, its pioneers and revivalists, and the contemporary stage.'),
];

integrateStream({ stream: 'Dance (Bharatanatyam)', standards, newTopics, newEdges, newClusters });
