#!/usr/bin/env node
/**
 * build/nios-sec-hindi.mjs — NIOS Secondary Hindi (Code 201) → a new "Hindi"
 * subject. Source pages are image-only scans; the syllabus was recovered via
 * OCR (tesseract `hin`, 300 DPI) cross-checked against the page images — see
 * scratchpad extraction sec-hindi-extract.md. Skill-grain standards (like the
 * English course) + micro-topics for the language skills and the enumerated
 * grammar topics. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Hindi', courseCode: '201' };
const H = 'Hindi';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('201.LSN', 'Listening (सुनना)', 'Listening', 'Listening (सुनना)', 'Listen with attention and etiquette to correct pronunciation, stress and intonation; grasp, analyse and respond to conversations, speeches and questions.'),
  std('201.SPK', 'Speaking (बोलना)', 'Speaking', 'Speaking (बोलना)', 'Speak Hindi clearly with correct pronunciation, pause and intonation — conversation, self-introduction, speeches, argument for and against, role-play, recitation, narration and compering.'),
  std('201.RDG.G', 'Reading (पठन)', 'Reading Prose (गद्य)', 'Reading Prose (गद्य पठन)', 'Read Hindi prose of many genres — story, sketch, reportage, feature, essay, science writing — with comprehension, including unseen passages; use contextual meaning of words, idioms and proverbs.'),
  std('201.RDG.K', 'Reading (पठन)', 'Reading Poetry (कविता)', 'Reading Poetry (कविता पठन)', 'Read Hindi poetry from Kabir, Rahim and Vrind to modern poets — grasp the central feeling (केंद्रीय भाव), appreciate poetic features, and handle unseen poetry.'),
  std('201.WRT.P', 'Writing (लेखन)', 'Purposeful Writing (प्रयोजनपरक)', 'Purposeful Writing (प्रयोजनपरक लेखन)', 'Write purposeful Hindi — news writing, formal and informal letters including business letters and letters to the editor.'),
  std('201.WRT.E', 'Writing (लेखन)', 'Expressive Writing (अभिव्यक्तिपरक)', 'Expressive Writing (अभिव्यक्तिपरक लेखन)', 'Write expressive Hindi — summary writing (सार-लेखन) and essay writing (निबंध-लेखन).'),
  std('201.GRM', 'Grammar & Practical Language Use', 'Grammar (व्याकरण)', 'Grammar and Practical Language Use (व्याकरण तथा व्यावहारिक भाषा-प्रयोग)', 'Use Hindi grammar correctly in context — word formation (उपसर्ग, प्रत्यय, संधि, समास), word types (तत्सम, तद्भव, देशज, आगत), sentence structure and कारक, idioms and proverbs, metre (छंद) and figures of speech (अलंकार) — and know Hindi’s roles as official, national and link language.'),
];

const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: H, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('hi-listening', 'Speaking & Listening', 'Listening with Understanding', 'LANGUAGE',
    'Listen to Hindi attentively and with courtesy — following correct pronunciation, stress and intonation — and grasp, analyse and respond to what is heard in conversations, speeches and questions.',
    ['Follow a Hindi conversation or speech and state its main points', 'Show the etiquette of attentive listening', 'Draw a conclusion from something heard and express a view on it'],
    'Can {{name}} listen to a Hindi conversation or talk, pick out its main points, and respond thoughtfully?', ['nios-sec-2020:201.LSN']),
  T('hi-speaking', 'Speaking & Listening', 'Speaking Hindi Effectively', 'LANGUAGE',
    'Speak Hindi clearly and appropriately for the occasion — with correct pronunciation, pause and intonation — in conversation, self-introduction, short speeches, arguing a side, role-play, recitation and narration.',
    ['Speak with clear pronunciation and natural intonation', 'Present a point of view with reasons, for or against', 'Perform a role-play, recitation or short speech'],
    'Can {{name}} speak Hindi clearly and confidently — holding a conversation, giving a short speech, or arguing a side?', ['nios-sec-2020:201.SPK']),
  T('hi-reading-prose', 'Reading', 'Reading Hindi Prose', 'LANGUAGE',
    'Read Hindi prose across genres — story (कहानी), sketch (रेखाचित्र), reportage, feature, essay and science writing — with comprehension, including unseen passages, and use dictionaries and references as needed.',
    ['Read a Hindi prose passage and state its main ideas', 'Handle an unseen prose passage (अपठित गद्य)', 'Use the contextual meaning of unfamiliar words'],
    'Can {{name}} read a Hindi story or essay with understanding — including a passage they have never seen before?', ['nios-sec-2020:201.RDG.G']),
  T('hi-reading-poetry', 'Reading', 'Reading Hindi Poetry', 'LANGUAGE',
    'Read Hindi poetry with appreciation — from the couplets of Kabir, Rahim and Vrind to modern poets like Maithili Sharan Gupt, Jaishankar Prasad and Nirmala Putul — grasping the central feeling (केंद्रीय भाव) of a poem.',
    ['Read a Hindi poem and state its central feeling', 'Recognise poets from different periods of Hindi poetry', 'Handle an unseen poem (अपठित कविता)'],
    'Can {{name}} read a Hindi poem — old or modern — and explain its central feeling and what the poet is expressing?', ['nios-sec-2020:201.RDG.K']),
  T('hi-functional-writing', 'Writing', 'Purposeful Writing in Hindi', 'PROCEDURAL',
    'Write practical Hindi in the right format — news reports, and formal and informal letters including business letters and letters to the editor.',
    ['Write a formal Hindi letter in correct format', 'Write a short news item (समाचार-लेखन)', 'Adjust tone between formal and informal writing'],
    'Can {{name}} write a proper formal letter or short news report in Hindi, using the right format and tone?', ['nios-sec-2020:201.WRT.P']),
  T('hi-expressive-writing', 'Writing', 'Summary and Essay Writing in Hindi', 'PROCEDURAL',
    'Write expressive Hindi — condense a passage into a faithful summary (सार-लेखन), and compose a well-organised essay (निबंध) presenting one’s own thoughts.',
    ['Write a summary of a Hindi passage in own words', 'Plan and write a structured Hindi essay', 'Express an original viewpoint in writing'],
    'Can {{name}} summarise a Hindi passage in their own words, and write an organised essay giving their own thoughts?', ['nios-sec-2020:201.WRT.E']),
  T('hi-word-formation', 'Grammar', 'Hindi Word Formation', 'LANGUAGE',
    'Understand how Hindi words are built — prefixes (उपसर्ग) and suffixes (प्रत्यय), euphonic combination (संधि), and compounding (समास) — and use these to form and unpack words.',
    ['Split a word into prefix/suffix and root', 'Join and split words using sandhi', 'Identify the type of a samas (compound)'],
    'Can {{name}} break a Hindi word into its parts — prefix, root, suffix — and work with sandhi and samas?', ['nios-sec-2020:201.GRM']),
  T('hi-word-types', 'Grammar', 'Hindi Word Types and Vocabulary', 'LANGUAGE',
    'Know the kinds of words in Hindi — tatsam (from Sanskrit), tadbhav (evolved), deshaj (indigenous) and aagat (borrowed) — and build vocabulary with synonyms, antonyms, multiple-meaning words and one-word substitutions.',
    ['Classify words as tatsam, tadbhav, deshaj or aagat', 'Give synonyms and antonyms for common words', 'Replace a phrase with a single word (अनेक शब्दों के लिए एक शब्द)'],
    'Can {{name}} tell where Hindi words come from — Sanskrit, evolved, local or borrowed — and use synonyms, antonyms and one-word substitutions?', ['nios-sec-2020:201.GRM']),
  T('hi-sentence-structure', 'Grammar', 'Hindi Sentence Structure', 'LANGUAGE',
    'Understand how Hindi sentences are built — doer (कर्ता), object (कर्म), verb (क्रिया) and case markers (कारक), word order and agreement — and use simple, compound and complex sentences.',
    ['Identify karta, karm and kriya in a sentence', 'Use karak (case) markers correctly', 'Construct simple, compound and complex sentences'],
    'Can {{name}} build correct Hindi sentences — using the right case markers and agreement — from simple to complex?', ['nios-sec-2020:201.GRM']),
  T('hi-idioms', 'Grammar', 'Hindi Idioms and Proverbs', 'LANGUAGE',
    'Understand and use common Hindi idioms (मुहावरे) and proverbs (लोकोक्तियाँ) — grasping their figurative meanings and using them aptly in speech and writing.',
    ['Explain the figurative meaning of a common muhavara', 'Use an idiom aptly in a sentence', 'Explain the message of a common proverb'],
    'Can {{name}} explain and correctly use common Hindi idioms and proverbs?', ['nios-sec-2020:201.GRM']),
  T('hi-chhand', 'Literature', 'Hindi Metre (Chhand)', 'CONCEPTUAL',
    'Understand the metres of Hindi poetry met in the course — doha, savaiya and pad — and free verse (मुक्त छंद), recognising their rhythm and form.',
    ['Recognise a doha by its form', 'Distinguish metrical verse from free verse', 'Name the metre of a familiar verse form'],
    'Can {{name}} recognise the common Hindi verse forms — like the doha — and tell metrical poetry from free verse?', ['nios-sec-2020:201.GRM', 'nios-sec-2020:201.RDG.K']),
  T('hi-alankar', 'Literature', 'Hindi Figures of Speech (Alankar)', 'CONCEPTUAL',
    'Understand the figures of speech of Hindi poetry — alliteration (अनुप्रास), pun (यमक), simile (उपमा), metaphor (रूपक), poetic fancy (उत्प्रेक्षा), allegory (अन्योक्ति), illustration (दृष्टांत) and personification (मानवीकरण).',
    ['Identify an alankar in a line of verse', 'Distinguish upma (simile) from rupak (metaphor)', 'Explain the effect a figure of speech creates'],
    'Can {{name}} spot figures of speech in Hindi poetry — telling a simile from a metaphor — and explain their effect?', ['nios-sec-2020:201.GRM', 'nios-sec-2020:201.RDG.K']),
  T('hi-roles-of-hindi', 'Language & Society', 'The Roles of Hindi', 'CONCEPTUAL',
    'Understand the public roles Hindi plays in India — as official language (राजभाषा), national language (राष्ट्रभाषा) and link language (संपर्क भाषा) — and how media and technology are reshaping its use.',
    ['Distinguish rajbhasha, rashtrabhasha and sampark bhasha', 'Give an example of Hindi as a link language across regions', 'Describe how technology and media influence Hindi'],
    'Can {{name}} explain the different public roles Hindi plays in India — official, national and link language?', ['nios-sec-2020:201.GRM']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  soft('hi-speaking', 'hi-listening', 'Speaking well builds on attentive listening'),
  soft('hi-reading-poetry', 'hi-reading-prose', 'Poetry reading builds on general reading fluency in prose'),
  soft('hi-functional-writing', 'hi-sentence-structure', 'Correct writing builds on Hindi sentence structure'),
  hard('hi-expressive-writing', 'hi-reading-prose', 'Summarising presupposes reading prose with comprehension'),
  soft('hi-expressive-writing', 'hi-functional-writing', 'Essay writing builds on practical writing control'),
  soft('hi-word-types', 'hi-word-formation', 'Word origins complement how words are formed'),
  soft('hi-idioms', 'hi-reading-prose', 'Idioms and proverbs are met and used in reading prose'),
  hard('hi-chhand', 'hi-reading-poetry', 'Metre is studied through the poetry being read'),
  hard('hi-alankar', 'hi-reading-poetry', 'Figures of speech are studied through the poetry being read'),
  soft('hi-roles-of-hindi', 'mt_1x2Q9dNz00', 'PLACEHOLDER'),
];

// The last edge links to Social Studies "India's Many Languages" — resolve its real id.
import { createHash } from 'node:crypto';
const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const mintNs = (ns, slug) => { const h = createHash('sha256').update(`${ns}:${slug}`).digest(); let s = ''; for (let i = 0; i < 10; i++) s += B62[h[i] % 62]; return `mt_${s}`; };
newEdges[newEdges.length - 1] = soft('hi-roles-of-hindi', mintNs('nios-obe', 'india-languages'), 'The roles of Hindi build on knowing India’s many languages');

const B = (domain, summary) => ({ subject: H, domain, ageRangeStart: 14, summary });
const newClusters = [
  B('Speaking & Listening', 'Your teenager is developing spoken Hindi — listening attentively and speaking clearly and confidently in conversation, speeches and debate.'),
  B('Reading', 'Your teenager is reading Hindi widely — prose from stories to science writing, and poetry from Kabir’s couplets to modern poets — including unseen passages.'),
  B('Writing', 'Your teenager is writing purposeful and expressive Hindi — letters and news reports, summaries and essays.'),
  B('Grammar', 'Your teenager is mastering Hindi grammar in context — word formation with sandhi and samas, word origins, sentence structure with karak, and idioms and proverbs.'),
  B('Literature', 'Your teenager is learning the craft of Hindi poetry — its metres like the doha, and its figures of speech from simile to personification.'),
  B('Language & Society', 'Your teenager is learning the public life of Hindi — its roles as India’s official, national and link language, and how media and technology shape it.'),
];

integrateSubject({ subject, standards, newTopics, newEdges, newClusters });
