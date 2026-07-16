#!/usr/bin/env node
/**
 * build/nios-sec-veda-vyakarna.mjs — NIOS Secondary Veda Adhyayan (Code 245)
 * and Sanskrit Vyakarna (Code 246) → two new domains under the "Sanskrit"
 * subject: "Vedic Studies" and "Paninian Grammar". Sanskrit-medium syllabi
 * recovered via OCR (tesseract `san`, 300 DPI, tables verified against page
 * images) — see scratchpad sec-veda-extract.md / sec-vyakarna-extract.md.
 * Standards at chapter grain (the OCR gives lesson lists; chapters are the
 * stable teachable units). Idempotent.
 */

import { integrateSubject, mintId } from './nios-sec.mjs';

const SK = 'Sanskrit';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });
const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: SK, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });

// ---------------- Veda Adhyayan (245) ----------------
integrateSubject({
  subject: { name: 'Veda Adhyayan', courseCode: '245' },
  standards: [
    std('245.C1', 'Chapter 1 (Lessons 1–7)', 'वैदिकसाहित्येतिहासः', 'History of Vedic Literature (वैदिकसाहित्येतिहासः)', 'The Veda — its meaning, uniqueness and apaurusheya nature; time of origin; recitation types; rishi-chandas-devata of mantras; the commentators and their methods; Vedic legends; yajna; and the Vedic deities.'),
    std('245.C2', 'Chapter 2 (Lessons 8–15)', 'वैदिकसूक्ताध्ययनम्', 'Study of Vedic Suktas (वैदिकसूक्ताध्ययनम्)', 'Reading of Vedic suktas — Surya (RV 1.115), Sanjnana (RV 10.191), Pushan (RV 6.54), Ushas (RV 3.61), Varuna (RV 1.25), Yama (RV 10.14), the Shunahshepa Upakhyana (Aitareya Brahmana 7.3), and the Vishvamitra–rivers dialogue (RV 3.33).'),
    std('245.C3', 'Chapter 3 (Lessons 16–24)', 'वैदिकी प्रक्रिया', 'The Vedic Grammatical Process (वैदिकी प्रक्रिया)', 'The Vedic-specific rules of Panini across the eight chapters of the Ashtadhyayi — how Vedic Sanskrit differs from the classical language.'),
  ],
  newTopics: [
    T('veda-what-is', 'Vedic Studies', 'What the Veda Is', 'CONCEPTUAL',
      'Understand what the Veda is — its meaning and synonyms, its place as the foundation of Indian thought, and the classical debate over whether it is of human or more-than-human origin (पौरुषेय/अपौरुषेय).',
      ['Explain the meaning of "Veda" and its synonyms', 'Explain the apaurusheya debate in simple terms', 'Explain why the Veda is called the root of Indian thought'],
      'Can {{name}} explain what the Veda is, and the old debate about whether it has an author?', ['nios-sec-2020:245.C1']),
    T('veda-preservation', 'Vedic Studies', 'How the Veda Was Preserved', 'CONCEPTUAL',
      'Understand how the Veda was preserved orally for millennia with astonishing accuracy — the recitation methods (पाठप्रकार), and how each mantra carries its rishi, metre (छन्द), deity and application (विनियोग).',
      ['Explain how recitation methods protected the text', 'Name the four attributes of a mantra (rishi, chandas, devata, viniyoga)', 'Explain why oral preservation was so exact'],
      'Can {{name}} explain how the Veda was passed down by voice for thousands of years without changing?', ['nios-sec-2020:245.C1']),
    T('veda-commentators', 'Vedic Studies', 'The Commentators of the Veda', 'CONCEPTUAL',
      'Know the great commentators (भाष्यकार) of the Veda and their differing methods of interpretation (भाष्यपद्धति) — how the same mantra can be read ritually, philosophically or naturalistically.',
      ['Name a Vedic commentator', 'Explain what a bhashya (commentary) does', 'Explain that different methods yield different readings'],
      'Can {{name}} explain what a Vedic commentary is and why different commentators read the same verse differently?', ['nios-sec-2020:245.C1']),
    T('veda-yajna-deities', 'Vedic Studies', 'Yajna and the Vedic Deities', 'CONCEPTUAL',
      'Understand the Vedic yajna (sacrifice) as the centre of Vedic religion, and the Vedic deities — their classification, forms and nature, such as Indra — along with the legends (आख्यान) woven through the texts.',
      ['Explain what a yajna is', 'Classify the Vedic deities in outline', 'Retell a Vedic legend (akhyana)'],
      'Can {{name}} explain the Vedic yajna and name some Vedic deities and what they stand for?', ['nios-sec-2020:245.C1']),
    T('veda-suktas-nature', 'Vedic Studies', 'Suktas of Sun, Dawn and Harmony', 'CONCEPTUAL',
      'Read and understand Vedic suktas addressed to the natural and social order — the Surya (sun), Ushas (dawn) and Pushan hymns, and the Sanjnana sukta’s famous call to move, speak and think in harmony together.',
      ['Give the gist of the Surya or Ushas sukta', 'Explain the harmony message of the Sanjnana sukta', 'Connect a sukta’s imagery to its deity'],
      'Can {{name}} give the sense of a Vedic hymn like the dawn hymn or the unity hymn ("walk together, speak together")?', ['nios-sec-2020:245.C2']),
    T('veda-suktas-varuna-yama', 'Vedic Studies', 'The Varuna and Yama Suktas', 'CONCEPTUAL',
      'Read and understand the Varuna sukta — the guardian of cosmic order (ऋत) and moral law — and the Yama sukta’s reflection on death and what lies beyond.',
      ['Explain Varuna’s connection with cosmic and moral order', 'Give the gist of the Yama sukta', 'Explain the idea of rita (ऋत)'],
      'Can {{name}} explain what the Varuna hymn says about moral order, and what the Yama hymn reflects on?', ['nios-sec-2020:245.C2']),
    T('veda-shunahshepa', 'Vedic Studies', 'The Story of Shunahshepa', 'CONCEPTUAL',
      'Read the Shunahshepa Upakhyana from the Aitareya Brahmana — the dramatic tale of a boy sold for sacrifice and saved by his own prayer — and the Vishvamitra–rivers dialogue, two celebrated Vedic narratives.',
      ['Retell the story of Shunahshepa', 'Explain what the story shows about prayer and deliverance', 'Give the sense of the Vishvamitra–rivers dialogue'],
      'Can {{name}} tell the story of Shunahshepa — the boy saved by his own prayer — and the poet’s dialogue with the rivers?', ['nios-sec-2020:245.C2']),
    T('veda-prakriya', 'Vedic Studies', "Vedic Grammar: Panini's Rules for the Veda", 'LANGUAGE',
      'Understand how Vedic Sanskrit differs from the classical language, through the Vedic-specific rules (वैदिकी प्रक्रिया) that Panini gives across the Ashtadhyayi — forms, accents and licences peculiar to the Veda.',
      ['Give an example of a Vedic form that classical Sanskrit lacks', 'Explain that Panini wrote special rules for Vedic usage', 'Recognise the role of accent (svara) in Vedic text'],
      'Can {{name}} explain how the Sanskrit of the Veda differs from classical Sanskrit, and that Panini made special rules for it?', ['nios-sec-2020:245.C3']),
  ],
  newEdges: [
    hard('veda-preservation', 'veda-what-is', 'How the Veda was preserved builds on knowing what it is'),
    soft('veda-commentators', 'veda-what-is', 'The commentators interpret the Veda just introduced'),
    soft('veda-yajna-deities', 'veda-what-is', 'Yajna and the deities are the religion of the Veda'),
    hard('veda-suktas-nature', mintId('sa-reading'), 'Reading suktas presupposes reading simple Sanskrit'),
    soft('veda-suktas-nature', 'veda-preservation', 'Sukta study uses the mantra attributes (rishi, chandas, devata)'),
    soft('veda-suktas-varuna-yama', 'veda-suktas-nature', 'The Varuna and Yama suktas follow the first sukta readings'),
    soft('veda-shunahshepa', 'veda-suktas-nature', 'The narrative readings follow the first sukta readings'),
    soft('veda-what-is', mintId('cult-religion-ancient'), 'The Veda grounds the religion and philosophy of ancient India'),
  ],
  newClusters: [
    { subject: SK, domain: 'Vedic Studies', ageRangeStart: 14, summary: 'Your teenager is studying the Veda itself — what it is and how it was preserved, its commentators, deities and yajna, celebrated hymns like the dawn and unity suktas, the story of Shunahshepa, and the special grammar of Vedic Sanskrit.' },
  ],
});

// ---------------- Sanskrit Vyakarna (246) ----------------
integrateSubject({
  subject: { name: 'Sanskrit Vyakarna', courseCode: '246' },
  standards: [
    std('246.C1', 'Chapter 1 (Lessons 1–5)', 'संज्ञापरिभाषा', 'Technical Terms and Metarules (संज्ञापरिभाषा)', 'The grammar tradition; sutra and vartika; the Maheshvara Sutras and it-markers; samjnas such as savarna, guna, vrddhi, dhatu, upadha; and the paribhasha metarules.'),
    std('246.C2', 'Chapter 2 (Lessons 6–9)', 'सन्धिप्रकरणम्', 'Sandhi by the Sutras (सन्धिप्रकरणम्)', 'Vowel sandhi (yan, guna/vrddhi, savarna-dirgha, prakritibhava) and consonant and visarga sandhi (jastva, shchutva, shtutva, rutva) derived from the sutras.'),
    std('246.C3', 'Chapter 3 (Lessons 10–18)', 'सुबन्तप्रकरणम्', 'Subanta: Nominal Declension (सुबन्तप्रकरणम्)', 'Deriving declensions by rule — rama and the vowel stems, feminine and neuter words, consonant stems, and the pronouns.'),
    std('246.C4', 'Chapter 4 (Lessons 19–25)', 'विभक्त्यर्थप्रकरणम्', 'Karaka and Case Meanings (विभक्त्यर्थप्रकरणम्)', 'The karaka system through the sutras — each case’s meanings from nominative to locative, and the upapada-vibhakti rules.'),
    std('246.C5', 'Chapter 5 (Lessons 26–29)', 'कृदन्तप्रकरणम्', 'Krdanta: Primary Derivatives (कृदन्तप्रकरणम्)', 'Deriving words from roots with krt suffixes — the krtya suffixes and the purva- and uttara-krdanta.'),
  ],
  newTopics: [
    T('vyk-sutra-system', 'Paninian Grammar', "How Panini's Grammar Works", 'CONCEPTUAL',
      'Understand the design of Panini’s Ashtadhyayi — grammar compressed into brief sutras, refined by vartikas — and why this system has been called the most remarkable grammar ever written.',
      ['Explain what a sutra is and why sutras are so brief', 'Explain the role of a vartika', 'Describe the Ashtadhyayi’s reputation and structure in outline'],
      'Can {{name}} explain how Panini packed a whole grammar into short sutras, and what the Ashtadhyayi is?', ['nios-sec-2020:246.C1']),
    T('vyk-maheshvara', 'Paninian Grammar', 'The Maheshvara Sutras and It-Markers', 'LANGUAGE',
      'Understand the fourteen Maheshvara Sutras that arrange the sounds of Sanskrit, and the it-markers (इत्) — silent letters in a sutra that carry instructions and disappear (लोप).',
      ['Recite or recognise the Maheshvara Sutras’ arrangement of sounds', 'Explain what an it-marker does', 'Explain how a pratyahara abbreviates a group of sounds'],
      'Can {{name}} explain the sound-list Panini starts from, and the trick of silent marker letters?', ['nios-sec-2020:246.C1']),
    T('vyk-samjna', 'Paninian Grammar', "Panini's Technical Terms (Samjna)", 'LANGUAGE',
      'Know the defined technical terms (संज्ञा) the sutras use — savarna, guna, vrddhi, dhatu, upadha and others — the precise vocabulary that makes the compressed rules work.',
      ['Define guna and vrddhi as Panini uses them', 'Explain what counts as a dhatu', 'Use a samjna to read a sutra correctly'],
      'Can {{name}} explain Panini’s technical terms — like guna and vrddhi — and why exact definitions matter?', ['nios-sec-2020:246.C1']),
    T('vyk-paribhasha', 'Paninian Grammar', 'The Metarules (Paribhasha)', 'LANGUAGE',
      'Understand the paribhashas — rules about how to apply rules — such as how a sixth-case word in a sutra marks what gets replaced (षष्ठी स्थानेयोगा), and the conventions for nearest-sound substitution.',
      ['Explain what a paribhasha is', 'Apply षष्ठी स्थानेयोगा to read a substitution sutra', 'Explain why metarules are needed'],
      'Can {{name}} explain the "rules about rules" that tell you how to apply Panini’s sutras?', ['nios-sec-2020:246.C1']),
    T('vyk-vowel-sandhi', 'Paninian Grammar', 'Vowel Sandhi by the Sutras', 'LANGUAGE',
      'Derive vowel sandhi from the rules — yan substitution, guna and vrddhi sandhi, savarna-dirgha lengthening, and the prakritibhava exceptions — rather than memorising outcomes.',
      ['Derive a yan-sandhi form citing the rule idea', 'Apply guna/vrddhi sandhi at a word junction', 'Recognise a prakritibhava (no-change) case'],
      'Can {{name}} not just apply vowel sandhi but explain which rule produces the change?', ['nios-sec-2020:246.C2']),
    T('vyk-consonant-sandhi', 'Paninian Grammar', 'Consonant and Visarga Sandhi by the Sutras', 'LANGUAGE',
      'Derive consonant and visarga sandhi from the rules — jastva voicing, shchutva and shtutva assimilation, and the visarga changes (rutva and the rest) — as rule-governed processes.',
      ['Apply shchutva/shtutva assimilation at a junction', 'Derive a visarga change by rule', 'Explain sandhi as rule-governed, not arbitrary'],
      'Can {{name}} derive consonant and visarga sandhi changes from the rules that govern them?', ['nios-sec-2020:246.C2']),
    T('vyk-subanta-vowel', 'Paninian Grammar', 'Deriving Vowel-Stem Declensions', 'LANGUAGE',
      'Derive the declensions of vowel-stem words by rule — rama case by case, then hari and go, the feminines rama and nadi, and the neuters jnana, vari and dadhi.',
      ['Derive a case form of राम step by step', 'Decline a feminine (नदी) and a neuter (वारि) stem', 'Explain how the same rules generate different stems’ forms'],
      'Can {{name}} derive the case forms of words like राम and नदी from the rules, step by step?', ['nios-sec-2020:246.C3']),
    T('vyk-subanta-consonant', 'Paninian Grammar', 'Deriving Consonant-Stem and Pronoun Forms', 'LANGUAGE',
      'Derive the harder declensions — consonant stems like राजन् and महत्, and the pronouns तत्, युष्मद् and अस्मद् — following the special rules each requires.',
      ['Derive forms of a consonant stem like राजन्', 'Decline the personal pronouns युष्मद्/अस्मद्', 'Explain why these stems need special rules'],
      'Can {{name}} work out the trickier declensions — words like राजन् and the pronouns — by rule?', ['nios-sec-2020:246.C3']),
    T('vyk-karaka-sutras', 'Paninian Grammar', 'Karaka in the Sutras', 'LANGUAGE',
      'Understand karaka as Panini defines it — the sutra definitions of doer and object (कर्तुरीप्सिततमं कर्म), and how each vibhakti’s meanings follow from the karaka rules, nominative through locative.',
      ['State a karaka definition from the sutras in simple terms', 'Assign the right vibhakti using a karaka rule', 'Explain the akathita (unstated) object rule in outline'],
      'Can {{name}} explain how Panini defines the roles in a sentence, and pick cases by those definitions?', ['nios-sec-2020:246.C4']),
    T('vyk-upapada', 'Paninian Grammar', 'Upapada Vibhakti Rules', 'LANGUAGE',
      'Know the upapada-vibhakti rules — where particular words in a sentence demand particular cases regardless of role — across the cases from accusative to locative.',
      ['Give an example of a word that forces a particular case', 'Apply an upapada rule in a sentence', 'Distinguish karaka-based from upapada-based case choice'],
      'Can {{name}} spot the words that force a particular case ending, and use those rules correctly?', ['nios-sec-2020:246.C4']),
    T('vyk-krdanta', 'Paninian Grammar', 'Krdanta: Deriving Words from Roots', 'LANGUAGE',
      'Derive new words from verb roots with krt suffixes — the krtya suffixes of obligation, and the purva- and uttara-krdanta formations — seeing word-building as rule-governed derivation.',
      ['Derive a krtya form (e.g. कर्तव्य) from a root', 'Form purva-krdanta words like गत्वा by rule', 'Explain krdanta as derivation, not memorisation'],
      'Can {{name}} derive words like कर्तव्य and गत्वा from their roots using the krt suffix rules?', ['nios-sec-2020:246.C5']),
  ],
  newEdges: [
    hard('vyk-maheshvara', 'vyk-sutra-system', 'The Maheshvara Sutras are the foundation of the sutra system'),
    hard('vyk-samjna', 'vyk-maheshvara', 'The samjnas build on the sound-arrangement and it-markers'),
    hard('vyk-paribhasha', 'vyk-samjna', 'The metarules use the technical terms'),
    hard('vyk-vowel-sandhi', 'vyk-paribhasha', 'Deriving sandhi by rule requires the metarules'),
    soft('vyk-vowel-sandhi', mintId('sa-sandhi'), 'Sutra-based sandhi deepens applied sandhi'),
    hard('vyk-consonant-sandhi', 'vyk-vowel-sandhi', 'Consonant and visarga sandhi follow vowel sandhi'),
    hard('vyk-subanta-vowel', 'vyk-samjna', 'Deriving declensions uses the technical terms'),
    soft('vyk-subanta-vowel', mintId('sa-declensions'), 'Rule-derived declension deepens applied declension'),
    hard('vyk-subanta-consonant', 'vyk-subanta-vowel', 'The harder stems follow the vowel stems'),
    hard('vyk-karaka-sutras', 'vyk-subanta-vowel', 'Karaka meanings attach to the declined forms'),
    soft('vyk-karaka-sutras', mintId('sa-karaka'), 'Sutra-based karaka deepens applied karaka'),
    hard('vyk-upapada', 'vyk-karaka-sutras', 'Upapada rules refine the karaka system'),
    hard('vyk-krdanta', 'vyk-samjna', 'Krdanta derivation uses the technical terms'),
    soft('vyk-krdanta', mintId('sa-pratyaya'), 'Sutra-based krdanta deepens applied suffixes'),
    hard(mintId('veda-prakriya'), 'vyk-sutra-system', 'The Vedic prakriya presupposes Panini’s sutra system'),
  ],
  newClusters: [
    { subject: SK, domain: 'Paninian Grammar', ageRangeStart: 14, summary: 'Your teenager is studying Panini’s grammar itself — the sutra system and its technical terms, deriving sandhi and declensions by rule, the karaka case system, and building words from roots.' },
  ],
});
