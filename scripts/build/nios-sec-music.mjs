#!/usr/bin/env node
/**
 * build/nios-sec-music.mjs — NIOS Secondary Hindustani Music (Code 242) and
 * Carnatic Music (Code 243) → a new "Music" subject with shared fundamentals
 * plus a domain for each tradition. Aligns to the Indian Culture "Indian Music
 * and Dance" topic. Idempotent (two integrateSubject calls, one per course code).
 */

import { integrateSubject, mintId } from './nios-sec.mjs';

const MU = 'Music';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });
const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: MU, domain, name, ageRangeStart: 13, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });

// ---- Hindustani Music (242): shared fundamentals + Hindustani-specific ----
integrateSubject({
  subject: { name: 'Music (Hindustani)', courseCode: '242' },
  standards: [
    std('242.M1.L1', 'I. Fundamentals of Indian Music', 'Shruti, Svara and Saptak', 'Shruti, Svara and Saptak', 'Understand the basic units of Indian music — shruti (microtone), svara (note) and saptak (octave).'),
    std('242.M1.L2', 'I. Fundamentals of Indian Music', 'Raga', 'Raga', 'Understand the raga — a melodic framework — its aroha and avaroha (ascent and descent) and mood.'),
    std('242.M1.L3', 'I. Fundamentals of Indian Music', 'Tala', 'Tala', 'Understand tala — the rhythmic cycle — and how to keep and recite it (theka).'),
    std('242.M2.L4', 'II. Hindustani Music', 'The Thaat System', 'The Thaat System', 'Understand the thaat system that classifies Hindustani ragas.'),
    std('242.M2.L5', 'II. Hindustani Music', 'Forms and Compositions', 'Forms and Compositions', 'Understand Hindustani vocal forms such as dhrupad and khayal and their compositions.'),
    std('242.M2.L6', 'II. Hindustani Music', 'Notation and Voice Culture', 'Notation and Voice Culture', 'Understand the notation system and the practice of voice culture and alankaras.'),
  ],
  newTopics: [
    T('mus-shruti-svara', 'Fundamentals of Indian Music', 'Shruti, Svara and Saptak', 'CONCEPTUAL',
      'Understand the basic building blocks of Indian music — the seven svaras (notes), the finer shrutis (microtones) between them, and the saptak (octave) in its low, middle and high registers.',
      ['Name the seven svaras', 'Explain what a shruti is', 'Explain the three registers of the saptak'],
      'Can {{name}} name the seven notes (svaras) of Indian music and explain the idea of octaves?', ['nios-sec-2020:242.M1.L1']),
    T('mus-raga', 'Fundamentals of Indian Music', 'Understanding Raga', 'CONCEPTUAL',
      'Understand the raga as the heart of Indian classical music — a framework of chosen notes with a characteristic ascent (aroha) and descent (avaroha) that creates a particular mood.',
      ['Explain what a raga is', 'Explain aroha and avaroha', 'Explain that each raga has its own mood or time'],
      'Can {{name}} explain what a raga is — a special set of notes that gives a piece its mood?', ['nios-sec-2020:242.M1.L2']),
    T('mus-tala', 'Fundamentals of Indian Music', 'Understanding Tala', 'CONCEPTUAL',
      'Understand tala as the rhythmic cycle of Indian music — a fixed pattern of beats grouped into sections — and how it is kept and recited as a theka.',
      ['Explain what a tala is', 'Explain that a tala repeats in a cycle of beats', 'Keep or recite a simple tala'],
      'Can {{name}} explain what a tala is — the repeating cycle of beats that gives music its rhythm?', ['nios-sec-2020:242.M1.L3']),
    T('mus-hindustani-forms', 'Hindustani Music', 'Hindustani Ragas and Forms', 'CONCEPTUAL',
      'Understand how Hindustani music organises ragas (the thaat system) and its main vocal forms — the older dhrupad and the popular khayal — and their compositions.',
      ['Explain the thaat system in outline', 'Name Hindustani vocal forms (dhrupad, khayal)', 'Describe a feature of a Hindustani composition'],
      'Can {{name}} name Hindustani vocal forms like khayal and explain how ragas are grouped into thaats?', ['nios-sec-2020:242.M2.L4', 'nios-sec-2020:242.M2.L5']),
    T('mus-notation-voice', 'Hindustani Music', 'Notation and Voice Culture', 'PROCEDURAL',
      'Understand how Indian music is written down in notation, and the practice of voice culture — warm-ups and alankaras (note patterns) that train the voice.',
      ['Read or write a simple notation', 'Explain what an alankara is', 'Explain why voice culture matters for a singer'],
      'Can {{name}} read a simple piece of Indian music notation and explain how singers train their voices with alankaras?', ['nios-sec-2020:242.M2.L6']),
  ],
  alignments: Object.fromEntries([['mt_EuGth6lA55', ['242.M2.L5', '242.M1.L2']]]), // Indian Music and Dance
  newEdges: [
    hard('mus-raga', 'mus-shruti-svara', 'A raga is built from svaras'),
    soft('mus-hindustani-forms', 'mus-raga', 'Hindustani forms are set in ragas'),
    soft('mus-hindustani-forms', 'mus-tala', 'Hindustani compositions are set in talas'),
    soft('mus-notation-voice', 'mus-raga', 'Notation and voice culture serve the singing of ragas'),
    soft('mus-shruti-svara', 'mt_EuGth6lA55', 'Music fundamentals build on knowing India’s music traditions'),
  ],
  newClusters: [
    { subject: MU, domain: 'Fundamentals of Indian Music', ageRangeStart: 13, summary: 'Your teenager is learning the foundations of Indian classical music — the notes (svaras) and microtones (shrutis), the melodic framework of raga, and the rhythmic cycle of tala.' },
    { subject: MU, domain: 'Hindustani Music', ageRangeStart: 13, summary: 'Your teenager is learning the Hindustani tradition — how ragas are grouped into thaats, vocal forms like dhrupad and khayal, notation, and voice culture.' },
  ],
});

// ---- Carnatic Music (243): Carnatic-specific (shares the fundamentals above) ----
integrateSubject({
  subject: { name: 'Music (Carnatic)', courseCode: '243' },
  standards: [
    std('243.M1.L1', 'I. Fundamentals', 'Swara, Sruti and Gamaka', 'Swara, Sruti and Gamaka', 'Understand the Carnatic basics — swara, sruti, and gamaka (the ornamentation that gives Carnatic music its character).'),
    std('243.M2.L2', 'II. Carnatic Music', 'Raga and Tala in Carnatic Music', 'Raga and Tala in Carnatic Music', 'Understand raga and tala as used in Carnatic music, including the tala angas and alankaras.'),
    std('243.M2.L3', 'II. Carnatic Music', 'Forms and Compositions', 'Forms and Compositions', 'Understand Carnatic forms such as the geetam, varnam and kriti and their structure.'),
    std('243.M2.L4', 'II. Carnatic Music', 'Composers of Carnatic Music', 'Composers of Carnatic Music', 'Know the great composers of Carnatic music, including the Trinity — Tyagaraja, Muthuswami Dikshitar and Syama Sastri.'),
  ],
  newTopics: [
    T('mus-carnatic-gamaka', 'Carnatic Music', 'Carnatic Music: Swara and Gamaka', 'CONCEPTUAL',
      'Understand the distinctive features of Carnatic music — its swaras and srutis, and above all gamaka, the graceful ornamentation and sliding between notes that defines its sound.',
      ['Explain what gamaka is', 'Explain how Carnatic music uses ornamentation', 'Relate swara and sruti to the fundamentals of Indian music'],
      'Can {{name}} explain gamaka — the ornamentation and sliding between notes that gives Carnatic music its distinctive sound?', ['nios-sec-2020:243.M1.L1', 'nios-sec-2020:243.M2.L2']),
    T('mus-carnatic-forms', 'Carnatic Music', 'Carnatic Forms and Compositions', 'CONCEPTUAL',
      'Understand the main forms of Carnatic music — the beginner’s geetam, the varnam, and the central kriti — and how a composition is structured.',
      ['Name Carnatic forms (geetam, varnam, kriti)', 'Describe the structure of a kriti in outline', 'Explain the role of the varnam in learning'],
      'Can {{name}} name Carnatic forms like the varnam and kriti and describe how a composition is put together?', ['nios-sec-2020:243.M2.L3']),
    T('mus-carnatic-composers', 'Carnatic Music', 'The Composers of Carnatic Music', 'CONCEPTUAL',
      'Know the great composers of Carnatic music — above all the Trinity, Tyagaraja, Muthuswami Dikshitar and Syama Sastri — and their lasting contribution.',
      ['Name the Carnatic Trinity', 'Describe a contribution of a great composer', 'Explain why these composers are revered'],
      'Can {{name}} name the great Carnatic composers, like the Trinity, and what they are remembered for?', ['nios-sec-2020:243.M2.L4']),
  ],
  alignments: Object.fromEntries([['mt_EuGth6lA55', ['243.M2.L3']]]),
  newEdges: [
    hard('mus-carnatic-gamaka', mintId('mus-shruti-svara'), 'Carnatic swara and gamaka build on the fundamentals of Indian music'),
    soft('mus-carnatic-forms', 'mus-carnatic-gamaka', 'Carnatic forms are sung with gamaka'),
    soft('mus-carnatic-forms', mintId('mus-raga'), 'Carnatic compositions are set in ragas'),
    soft('mus-carnatic-composers', 'mus-carnatic-forms', 'The composers are known through their compositions'),
  ],
  newClusters: [
    { subject: MU, domain: 'Carnatic Music', ageRangeStart: 13, summary: 'Your teenager is learning the Carnatic tradition — its distinctive gamaka ornamentation, forms like the varnam and kriti, and its great composers such as the Trinity.' },
  ],
});
