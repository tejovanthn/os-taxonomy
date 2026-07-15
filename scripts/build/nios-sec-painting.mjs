#!/usr/bin/env node
/**
 * build/nios-sec-painting.mjs — NIOS Secondary Painting (Code 225) → a new
 * "Visual Arts" subject: the elements and principles of art, drawing &
 * composition, and Indian art traditions. Aligns to the existing Indian
 * Culture "Indian Painting" topic. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Visual Arts', courseCode: '225' };
const VA = 'Visual Arts';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('225.M1.L1', 'I. Understanding Art', 'Introduction to Painting', 'Introduction to Painting', 'Understand painting as expressing ideas and feelings through line, colour, form and proportion.'),
  std('225.M1.L2', 'I. Understanding Art', 'History and Appreciation of Indian Art', 'History and Appreciation of Indian Art', 'Appreciate the history of Indian art and how to look at and value a work of art.'),
  std('225.M2.L3', 'II. Elements and Principles', 'Elements of Art', 'Elements of Art', 'Understand the elements of art — line, shape, form, colour, texture, space and tone.'),
  std('225.M2.L4', 'II. Elements and Principles', 'Colour', 'Colour', 'Understand colour — the colour wheel, primary and secondary colours, warm and cool colours, and tonal gradation.'),
  std('225.M2.L5', 'II. Elements and Principles', 'Principles of Composition', 'Principles of Composition', 'Understand the principles of composition — balance, rhythm, proportion, contrast and harmony.'),
  std('225.M3.L6', 'III. Drawing and Composition', 'Drawing', 'Drawing', 'Develop drawing skills — observation, proportion and rendering form.'),
  std('225.M3.L7', 'III. Drawing and Composition', 'Still Life, Landscape and Composition', 'Still Life, Landscape and Composition', 'Create still-life, landscape and figure compositions using the elements and principles of art.'),
  std('225.M4.L8', 'IV. Indian Art Traditions', 'Indian Folk and Miniature Art', 'Indian Folk and Miniature Art', 'Appreciate India’s folk art traditions and its rich miniature painting tradition.'),
  std('225.M4.L9', 'IV. Indian Art Traditions', 'Pioneers of Modern Indian Art', 'Pioneers of Modern Indian Art', 'Know the pioneers of modern Indian art and their contribution.'),
  std('225.M4.L10', 'IV. Indian Art Traditions', 'Contemporary Indian Art', 'Contemporary Indian Art', 'Appreciate contemporary Indian art and its themes.'),
];

const alignments = Object.fromEntries([
  ['mt_7BG2AbuXDn', ['225.M4.L8', '225.M1.L2']],  // Indian Painting ← folk/miniature + history of Indian art
]);

const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: VA, domain, name, ageRangeStart: 13, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('va-what-is-painting', 'Understanding Art', 'Introduction to Painting', 'CONCEPTUAL',
    'Understand painting as a way of expressing ideas and feelings through visual means — line, colour, form and proportion — and that art can be enjoyed, made and understood.',
    ['Explain that painting expresses ideas visually', 'Name visual means a painter uses (line, colour, form)', 'Explain that art is both made and appreciated'],
    'Can {{name}} explain what painting is — expressing ideas and feelings through line, colour and form?', ['nios-sec-2020:225.M1.L1']),
  T('va-elements', 'Elements & Principles', 'The Elements of Art', 'REPRESENTATIONAL',
    'Understand the building blocks of a picture — line, shape, form, colour, texture, space and tone — and how an artist uses each.',
    ['Name the elements of art', 'Identify an element in a picture', 'Explain what one element contributes to a work'],
    'Can {{name}} name the elements of art — like line, shape, colour and texture — and point them out in a picture?', ['nios-sec-2020:225.M2.L3']),
  T('va-colour', 'Elements & Principles', 'Understanding Colour', 'REPRESENTATIONAL',
    'Understand colour — the colour wheel, primary and secondary colours, warm and cool colours, and how tone (light and dark) gives a picture depth.',
    ['Name primary and secondary colours', 'Distinguish warm from cool colours', 'Explain how tonal gradation creates depth'],
    'Can {{name}} explain the colour wheel — primary and secondary, warm and cool colours — and how light and dark tones add depth?', ['nios-sec-2020:225.M2.L4']),
  T('va-composition', 'Elements & Principles', 'Principles of Composition', 'REPRESENTATIONAL',
    'Understand the principles that arrange the elements into a pleasing whole — balance, rhythm, proportion, contrast and harmony.',
    ['Name principles of composition', 'Explain balance or rhythm in a picture', 'Explain why composition matters in a work of art'],
    'Can {{name}} explain how an artist arranges a picture using balance, rhythm and proportion?', ['nios-sec-2020:225.M2.L5']),
  T('va-drawing', 'Drawing & Composition', 'Drawing', 'PROCEDURAL',
    'Develop drawing skill — observing carefully, getting proportions right, and rendering form with line and shading.',
    ['Draw an object with accurate proportions', 'Use shading to show form', 'Explain the role of observation in drawing'],
    'Can {{name}} draw an object from observation with reasonable proportion and shading?', ['nios-sec-2020:225.M3.L6']),
  T('va-compositions', 'Drawing & Composition', 'Still Life, Landscape and Figure', 'PROCEDURAL',
    'Create still-life, landscape and figure compositions, applying the elements and principles of art to arrange subjects into a finished picture.',
    ['Compose a still life or landscape', 'Apply the principles of composition in the work', 'Explain the choices made in arranging the picture'],
    'Can {{name}} make a still-life or landscape picture, arranging it thoughtfully using what they know about composition?', ['nios-sec-2020:225.M3.L7']),
  T('va-modern-indian-art', 'Indian Art Traditions', 'Pioneers of Modern Indian Art', 'CONCEPTUAL',
    'Know the pioneers of modern Indian art — such as Raja Ravi Varma, Abanindranath Tagore and the Bengal School — and how they renewed Indian painting.',
    ['Name a pioneer of modern Indian art', 'Describe their contribution', 'Explain how modern Indian art built on and renewed tradition'],
    'Can {{name}} name a pioneer of modern Indian art, like Raja Ravi Varma, and what they are known for?', ['nios-sec-2020:225.M4.L9']),
  T('va-contemporary-art', 'Indian Art Traditions', 'Contemporary Indian Art', 'CONCEPTUAL',
    'Appreciate contemporary Indian art — its varied styles, media and themes — and how artists today respond to the world around them.',
    ['Explain what contemporary art is', 'Describe a theme in contemporary Indian art', 'Explain that art keeps changing with the times'],
    'Can {{name}} explain what contemporary Indian art is like, and how today’s artists respond to the world around them?', ['nios-sec-2020:225.M4.L10']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  hard('va-elements', 'va-what-is-painting', 'The elements of art build on understanding what painting is'),
  hard('va-colour', 'va-elements', 'Colour is one of the elements of art'),
  hard('va-composition', 'va-elements', 'Composition arranges the elements of art'),
  hard('va-drawing', 'va-elements', 'Drawing applies the elements of art'),
  hard('va-compositions', 'va-drawing', 'Making compositions builds on drawing'),
  soft('va-compositions', 'va-composition', 'Compositions apply the principles of composition'),
  soft('va-modern-indian-art', 'mt_7BG2AbuXDn', 'Modern Indian art builds on India’s painting traditions'),
  hard('va-contemporary-art', 'va-modern-indian-art', 'Contemporary art follows the modern Indian art pioneers'),
];

const B = (domain, ageRangeStart, summary) => ({ subject: VA, domain, ageRangeStart, summary });
const newClusters = [
  B('Understanding Art', 13, 'Your teenager is learning what painting is — a way to express ideas and feelings through line, colour and form — and how to appreciate a work of art.'),
  B('Elements & Principles', 13, 'Your teenager is learning the building blocks of art — line, shape, colour, texture and tone — and the principles of composition that arrange them into a pleasing whole.'),
  B('Drawing & Composition', 13, 'Your teenager is developing practical art skills — drawing from observation, and composing still lifes, landscapes and figures.'),
  B('Indian Art Traditions', 13, 'Your teenager is exploring India’s art traditions — its folk and miniature painting, the pioneers of modern Indian art, and contemporary art today.'),
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
