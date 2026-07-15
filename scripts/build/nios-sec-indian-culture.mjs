#!/usr/bin/env node
/**
 * build/nios-sec-indian-culture.mjs — NIOS Secondary Indian Culture & Heritage
 * (Code 223) → a new "Indian Culture & Heritage" subject. 21 lessons across 9
 * modules. The historical-development lessons align to the existing India
 * history topics; the cultural content (religion & philosophy, arts, literature,
 * science heritage, society, cultural spread) is minted. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Indian Culture & Heritage', courseCode: '223' };
const IC = 'Indian Culture & Heritage';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('223.M1.L1', 'I. Culture', 'Culture: An Introduction', 'Culture: An Introduction', 'Understand the concept and meaning of culture and how it shapes a people’s way of life.'),
  std('223.M1.L2', 'I. Culture', 'Indian Culture', 'Indian Culture', 'Understand the salient features that make Indian culture distinct, and its continuity and diversity.'),
  std('223.M2.L3', 'II. History and Culture through the Ages', 'Ancient India', 'Ancient India', 'Trace the cultural development of ancient India — its civilisations, empires and achievements.'),
  std('223.M2.L4', 'II. History and Culture through the Ages', 'Medieval India', 'Medieval India', 'Trace the cultural development of medieval India — its rulers, art and cultural blending.'),
  std('223.M2.L5', 'II. History and Culture through the Ages', 'Modern India', 'Modern India', 'Trace the cultural development of modern India — colonial impact, reform and the national awakening.'),
  std('223.M3.L6', 'III. Languages and Literature', 'Indian Languages and Literature – I', 'Indian Languages and Literature – I', 'Understand the role of Sanskrit in ancient India and the literature of Sanskrit, Prakrit and Pali.'),
  std('223.M3.L7', 'III. Languages and Literature', 'Indian Languages and Literature – II', 'Indian Languages and Literature – II', 'Understand the rich Sangam literature in Tamil and the literature of Telugu, Kannada, Malayalam and other Indian languages.'),
  std('223.M4.L8', 'IV. Religion and Philosophy', 'Religion and Philosophy in Ancient India', 'Religion and Philosophy in Ancient India', 'Understand the major religious traditions and schools of philosophy that emerged in ancient India.'),
  std('223.M4.L9', 'IV. Religion and Philosophy', 'Religion and Philosophy in Medieval India', 'Religion and Philosophy in Medieval India', 'Understand medieval devotional movements — the Bhakti and Sufi traditions — and their message.'),
  std('223.M4.L10', 'IV. Religion and Philosophy', 'Religious Reform Movements in Modern India', 'Religious Reform Movements in Modern India', 'Understand the reform movements that arose in modern India to address ills within religion and society.'),
  std('223.M5.L11', 'V. Painting, Performing Arts and Architecture', 'Indian Painting', 'Indian Painting', 'Understand the traditions of Indian painting — from cave murals to miniatures and folk styles.'),
  std('223.M5.L12', 'V. Painting, Performing Arts and Architecture', 'Performing Arts: Music, Dance and Theatre', 'Performing Arts: Music, Dance and Theatre', 'Understand India’s performing arts — its classical and folk music, dance forms and theatre.'),
  std('223.M5.L13', 'V. Painting, Performing Arts and Architecture', 'Indian Architecture', 'Indian Architecture', 'Understand the styles of Indian architecture — temples, stupas, mosques and forts — across the ages.'),
  std('223.M6.L14', 'VI. Science and Technology', 'Science and Technology in India', 'Science and Technology in India', 'Understand India’s heritage of science and technology from ancient to modern times.'),
  std('223.M6.L15', 'VI. Science and Technology', 'Scientists of Ancient India', 'Scientists of Ancient India', 'Know the contributions of ancient Indian scientists and mathematicians such as Aryabhata and Sushruta.'),
  std('223.M6.L16', 'VI. Science and Technology', 'Science and Scientists of Medieval India', 'Science and Scientists of Medieval India', 'Know the scientific and technological achievements of medieval India.'),
  std('223.M6.L17', 'VI. Science and Technology', 'Scientists of Modern India', 'Scientists of Modern India', 'Know the contributions of modern Indian scientists such as Raman, Bose and Ramanujan.'),
  std('223.M7.L18', 'VII. Education', 'Education in India', 'Education in India', 'Understand the tradition of education in India — from ancient centres like Nalanda and Takshashila to the present.'),
  std('223.M8.L19', 'VIII. Society', 'Indian Social Structure', 'Indian Social Structure', 'Understand the structure of Indian society — family, community and its diversity.'),
  std('223.M8.L20', 'VIII. Society', 'Socio-Cultural Issues in Contemporary India', 'Socio-Cultural Issues in Contemporary India', 'Understand socio-cultural issues facing contemporary India and efforts to address them.'),
  std('223.M9.L21', 'IX. Spread of Indian Culture', 'Spread of Indian Culture Abroad', 'Spread of Indian Culture Abroad', 'Understand how Indian culture spread beyond its borders through trade, religion and ideas.'),
];

// Historical-development lessons already covered by the India history topics.
const alignments = Object.fromEntries([
  ['mt_jgJMDA0GTY', ['223.M2.L3']],  // The Vedic Age ← Ancient India
  ['mt_EpCX1FgGqv', ['223.M2.L3']],  // The Gupta Age ← Ancient India
  ['mt_FUDkWnl03o', ['223.M2.L4']],  // The Delhi Sultanate ← Medieval India
  ['mt_fvAz0QwV5b', ['223.M2.L4']],  // The Mughal Empire ← Medieval India
  ['mt_Jd2NQIbpjV', ['223.M2.L5']],  // India's Freedom Struggle ← Modern India
  ['mt_t6BQm5x5Su', ['223.M2.L5', '223.M4.L10']], // Reform and Awakening ← Modern India + Religious Reform
]);

const T = (_slug, domain, name, a0, a1, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: IC, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('cult-what-is', 'Understanding Culture', 'What Is Culture', 14, 16, 'CONCEPTUAL',
    'Understand culture as the whole way of life of a people — their beliefs, customs, arts, language and values — passed on and changing across generations.',
    ['Define culture as a shared way of life', 'Distinguish material from non-material culture', 'Explain that culture is learned and passed on'],
    'Can {{name}} explain what "culture" means — the shared beliefs, customs, arts and values that make up a people’s way of life?', ['nios-sec-2020:223.M1.L1']),
  T('cult-indian-features', 'Understanding Culture', 'Features of Indian Culture', 14, 16, 'CONCEPTUAL',
    'Understand what makes Indian culture distinctive — its great antiquity and continuity, its unity within diversity, and its capacity to absorb and blend many influences.',
    ['Describe features that make Indian culture distinctive', 'Explain "unity in diversity" as a feature of Indian culture', 'Give an example of Indian culture absorbing an outside influence'],
    'Can {{name}} describe what makes Indian culture distinctive — its long continuity and its unity across great diversity?', ['nios-sec-2020:223.M1.L2']),
  // Religion & Philosophy
  T('cult-religion-ancient', 'Religion & Philosophy', 'Religion and Philosophy in Ancient India', 14, 16, 'CONCEPTUAL',
    'Understand the major religious and philosophical traditions of ancient India — Vedic thought, the rise of Buddhism and Jainism, and the classical schools of Indian philosophy.',
    ['Name religious traditions that arose in ancient India', 'Explain a key idea of Buddhism or Jainism', 'Recognise that India developed several schools of philosophy'],
    'Can {{name}} explain the main religions and ways of thinking that grew up in ancient India, like Buddhism and Jainism?', ['nios-sec-2020:223.M4.L8']),
  T('cult-bhakti-sufi', 'Religion & Philosophy', 'The Bhakti and Sufi Movements', 14, 16, 'CONCEPTUAL',
    'Understand the medieval devotional movements — Bhakti among Hindus and Sufism among Muslims — which stressed love of God, equality and devotion over ritual, and brought communities together.',
    ['Explain what the Bhakti and Sufi movements were', 'Describe their shared message of devotion and equality', 'Explain how they helped bridge communities'],
    'Can {{name}} explain the Bhakti and Sufi movements — how they taught love of God and equality, and brought people together?', ['nios-sec-2020:223.M4.L9']),
  T('cult-religious-reform', 'Religion & Philosophy', 'Religious and Social Reform in Modern India', 14, 16, 'CONCEPTUAL',
    'Understand how modern reformers worked to remove social and religious ills — such as caste discrimination and the mistreatment of women — and to renew Indian society.',
    ['Explain what a religious/social reform movement aimed to change', 'Give an example of an ill the reformers opposed', 'Connect reform to the awakening of modern India'],
    'Can {{name}} explain how reformers in modern India worked to end social and religious wrongs and renew society?', ['nios-sec-2020:223.M4.L10']),
  // Languages & Literature
  T('cult-classical-lit', 'Languages & Literature', 'Classical Languages and Literature', 14, 16, 'CONCEPTUAL',
    'Understand the role of Sanskrit in ancient India and the rich literature written in Sanskrit, Prakrit and Pali — epics, drama, poetry and sacred texts.',
    ['Explain the importance of Sanskrit in ancient India', 'Name classical languages of ancient India (Sanskrit, Prakrit, Pali)', 'Give an example of a kind of classical literature'],
    'Can {{name}} explain the importance of Sanskrit and the classical literature of ancient India?', ['nios-sec-2020:223.M3.L6']),
  T('cult-regional-lit', 'Languages & Literature', 'Literature of the Indian Languages', 14, 16, 'CONCEPTUAL',
    'Understand the literary riches of India’s regional languages — the ancient Sangam literature of Tamil, and the literature of Telugu, Kannada, Malayalam and other languages.',
    ['Explain what Sangam literature is', 'Name several Indian languages with rich literary traditions', 'Explain that India’s literature spans many languages'],
    'Can {{name}} explain that India has great literature in many languages, like the ancient Sangam poetry of Tamil?', ['nios-sec-2020:223.M3.L7']),
  // Art & Architecture
  T('cult-painting', 'Art & Architecture', 'Indian Painting', 13, 15, 'REPRESENTATIONAL',
    'Understand the traditions of Indian painting — from the ancient cave murals of Ajanta to Mughal and Rajput miniatures and vibrant folk styles.',
    ['Name traditions of Indian painting (cave, miniature, folk)', 'Give an example such as the Ajanta murals', 'Describe a feature of a style of Indian painting'],
    'Can {{name}} describe some traditions of Indian painting, like the ancient Ajanta cave murals or miniature paintings?', ['nios-sec-2020:223.M5.L11']),
  T('cult-music-dance', 'Art & Architecture', 'Indian Music and Dance', 13, 15, 'CONCEPTUAL',
    'Understand India’s performing arts — its two great classical music traditions (Hindustani and Carnatic), its classical dance forms, and its living folk traditions.',
    ['Name the two classical music traditions of India', 'Name a classical Indian dance form', 'Distinguish classical from folk performing arts'],
    'Can {{name}} name India’s classical music and dance traditions and explain how they differ from folk arts?', ['nios-sec-2020:223.M5.L12']),
  T('cult-architecture', 'Art & Architecture', 'Indian Architecture', 13, 15, 'REPRESENTATIONAL',
    'Understand the great styles of Indian architecture across the ages — Buddhist stupas, Hindu temples, Indo-Islamic mosques and forts, and colonial buildings.',
    ['Name styles of Indian architecture (temple, stupa, mosque, fort)', 'Give an example such as a famous temple or the Taj Mahal', 'Explain that architectural styles blended over time'],
    'Can {{name}} describe different styles of Indian architecture — temples, stupas, and Mughal buildings like the Taj Mahal?', ['nios-sec-2020:223.M5.L13']),
  // Science & Innovation
  T('cult-science-ancient', 'Science & Innovation', 'Science in Ancient India', 14, 16, 'CONCEPTUAL',
    'Understand India’s ancient heritage in science — advances in mathematics (zero, the decimal system), astronomy, and medicine (Ayurveda) — and scientists like Aryabhata and Sushruta.',
    ['Give examples of ancient Indian achievements in maths or astronomy', 'Name an ancient Indian scientist and their field', 'Explain the significance of the idea of zero'],
    'Can {{name}} give examples of ancient India’s achievements in science and maths, and name a scientist like Aryabhata?', ['nios-sec-2020:223.M6.L14', 'nios-sec-2020:223.M6.L15']),
  T('cult-science-medieval', 'Science & Innovation', 'Science in Medieval India', 14, 16, 'CONCEPTUAL',
    'Understand the scientific and technological achievements of medieval India — in astronomy, medicine, metallurgy and architecture-engineering.',
    ['Give an example of a medieval Indian scientific or technological achievement', 'Explain that knowledge was exchanged with other cultures', 'Connect medieval science to earlier Indian traditions'],
    'Can {{name}} give an example of science or technology in medieval India?', ['nios-sec-2020:223.M6.L16']),
  T('cult-science-modern', 'Science & Innovation', 'Scientists of Modern India', 14, 16, 'CONCEPTUAL',
    'Know the contributions of modern Indian scientists — such as C. V. Raman, J. C. Bose, Srinivasa Ramanujan and Homi Bhabha — and India’s achievements in science today.',
    ['Name a modern Indian scientist and their contribution', 'Give an example of a modern Indian scientific achievement', 'Explain that India continues a long scientific tradition'],
    'Can {{name}} name a modern Indian scientist like C. V. Raman or Ramanujan and what they are known for?', ['nios-sec-2020:223.M6.L17']),
  // Society & Education
  T('cult-education', 'Society & Education', 'Education Through the Ages in India', 14, 16, 'CONCEPTUAL',
    'Understand India’s long tradition of education — from ancient centres of learning like Nalanda and Takshashila, through the gurukul system, to modern schooling.',
    ['Name ancient Indian centres of learning', 'Explain the gurukul tradition', 'Trace how education in India changed over time'],
    'Can {{name}} explain India’s tradition of education, from ancient universities like Nalanda to schools today?', ['nios-sec-2020:223.M7.L18']),
  T('cult-social-structure', 'Society & Education', 'Indian Social Structure', 14, 16, 'CONCEPTUAL',
    'Understand the structure of Indian society — the roles of family and community, its great diversity of groups, and how social structure has changed over time.',
    ['Describe the role of family and community in Indian society', 'Explain the diversity of Indian society', 'Explain that social structures change over time'],
    'Can {{name}} describe how Indian society is organised around family and community, and how diverse it is?', ['nios-sec-2020:223.M8.L19']),
  T('cult-socio-issues', 'Society & Education', 'Socio-Cultural Issues Today', 14, 16, 'CONCEPTUAL',
    'Understand major socio-cultural issues facing contemporary India — such as inequality, communal harmony, and preserving heritage — and efforts to address them.',
    ['Name a socio-cultural issue facing India today', 'Explain why communal harmony matters', 'Give an example of an effort to address an issue'],
    'Can {{name}} discuss a socio-cultural issue facing India today and why working on it matters?', ['nios-sec-2020:223.M8.L20']),
  // India and the world
  T('cult-spread-abroad', 'India and the World', 'The Spread of Indian Culture Abroad', 14, 16, 'CONCEPTUAL',
    'Understand how Indian culture spread far beyond its borders — through trade, and the spread of Buddhism, art, language and ideas across Asia and beyond.',
    ['Explain how Indian culture spread abroad (trade, religion, ideas)', 'Give an example of Indian influence in another region', 'Explain that cultural exchange goes both ways'],
    'Can {{name}} explain how Indian culture spread to other lands — through trade and the spread of religions like Buddhism?', ['nios-sec-2020:223.M9.L21']),
];

const V = { vedic: 'mt_jgJMDA0GTY', gupta: 'mt_EpCX1FgGqv', mughal: 'mt_fvAz0QwV5b', sultanate: 'mt_FUDkWnl03o', reform: 'mt_t6BQm5x5Su', unity: 'mt_sfHoytwSwm' };
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  hard('cult-indian-features', 'cult-what-is', 'Features of Indian culture build on understanding what culture is'),
  soft('cult-religion-ancient', V.vedic, 'Ancient Indian religion and philosophy build on the Vedic age'),
  soft('cult-bhakti-sufi', 'cult-religion-ancient', 'Medieval devotional movements build on ancient religious traditions'),
  soft('cult-bhakti-sufi', V.mughal, 'The Bhakti and Sufi movements flourished in the medieval Mughal era'),
  soft('cult-religious-reform', 'cult-bhakti-sufi', 'Modern reform continues the devotional and reforming impulse'),
  soft('cult-religious-reform', V.reform, 'Religious reform is part of the modern reform and awakening'),
  soft('cult-classical-lit', 'cult-indian-features', 'Classical literature is a feature of Indian culture'),
  soft('cult-regional-lit', 'cult-classical-lit', 'Regional literature complements the classical Sanskrit tradition'),
  soft('cult-painting', 'cult-indian-features', 'Painting is an expression of Indian culture'),
  soft('cult-music-dance', 'cult-indian-features', 'Music and dance are expressions of Indian culture'),
  soft('cult-architecture', 'cult-indian-features', 'Architecture is an expression of Indian culture'),
  soft('cult-architecture', V.mughal, 'Indian architecture includes the great Mughal monuments'),
  soft('cult-science-ancient', V.gupta, 'Ancient Indian science flourished in the Gupta golden age'),
  soft('cult-science-ancient', 'cult-indian-features', 'India’s scientific heritage is part of its culture'),
  soft('cult-science-medieval', 'cult-science-ancient', 'Medieval science builds on ancient Indian science'),
  soft('cult-science-modern', 'cult-science-medieval', 'Modern Indian science continues the earlier tradition'),
  soft('cult-education', 'cult-indian-features', 'India’s educational tradition is part of its culture'),
  soft('cult-social-structure', 'cult-indian-features', 'Social structure is part of Indian culture'),
  soft('cult-socio-issues', 'cult-social-structure', 'Contemporary issues arise within Indian social structure'),
  soft('cult-socio-issues', V.unity, 'Socio-cultural issues are set against India’s unity in diversity'),
  soft('cult-spread-abroad', 'cult-indian-features', 'The spread of Indian culture presupposes its distinctive features'),
];

const newClusters = [
  { subject: IC, domain: 'Understanding Culture', ageRangeStart: 14, summary: 'Your teenager is learning what culture is — a people’s shared way of life — and what makes Indian culture distinctive: its long continuity and its unity within great diversity.' },
  { subject: IC, domain: 'Religion & Philosophy', ageRangeStart: 14, summary: 'Your teenager is exploring India’s religious and philosophical heritage — the traditions of ancient India, the Bhakti and Sufi movements, and modern religious and social reform.' },
  { subject: IC, domain: 'Languages & Literature', ageRangeStart: 14, summary: 'Your teenager is learning about India’s literary heritage — the classical languages Sanskrit, Prakrit and Pali, and the rich literature of Tamil, Telugu, Kannada and other languages.' },
  { subject: IC, domain: 'Art & Architecture', ageRangeStart: 13, summary: 'Your teenager is exploring India’s arts — its painting from cave murals to miniatures, its classical and folk music and dance, and its great architecture across the ages.' },
  { subject: IC, domain: 'Science & Innovation', ageRangeStart: 14, summary: 'Your teenager is learning about India’s scientific heritage — ancient advances in maths, astronomy and medicine, and the achievements of Indian scientists from Aryabhata to Raman.' },
  { subject: IC, domain: 'Society & Education', ageRangeStart: 14, summary: 'Your teenager is learning about Indian society and its long tradition of education — from ancient universities like Nalanda to the social structure and issues of India today.' },
  { subject: IC, domain: 'India and the World', ageRangeStart: 14, summary: 'Your teenager is learning how Indian culture spread far beyond its borders — through trade, religion, art and ideas — across Asia and the wider world.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
