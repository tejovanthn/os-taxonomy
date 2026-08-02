#!/usr/bin/env node
/**
 * build/icse-art.mjs — ICSE Art (60), Classes IX–X (ages 14–16).
 *
 * Visual Arts was a small island: eight topics, none past age 15, covering the
 * elements and principles, early drawing and a little Indian art history. ICSE
 * Art is a two-year practical course examined through four papers — still life,
 * nature, imaginative composition and applied art — plus internal craft work.
 * This pass is almost all mints that grow the subject into the 14–16 band and
 * wire it together: observational still-life drawing, tonal modelling,
 * perspective, drawing natural forms, outdoor landscape study, original
 * composition, colour schemes, applied graphic design, lettering, decorative
 * pattern, printmaking and three-dimensional work.
 *
 * ICSE Art is not split by class — the same four papers run across both years —
 * so every topic spans ages 14–16. Each new topic anchors to an existing Visual
 * Arts topic, and perspective reaches across to the Mathematics geometry ladder,
 * so the island gains a second bridge to the main graph (the first being
 * Pioneers of Modern Indian Art → Indian Painting). Two new domains hold the
 * work that is not fine-art drawing: Applied & Graphic Art (design, lettering,
 * pattern) and Craft & Media (printmaking, three-dimensional work).
 * Marble-authored factual descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const va = topic('Visual Arts');
const AGE = [14, 16]; // ICSE Art is examined across both Class IX and Class X.
const EV = (a, b, c) => [a, b, c];

const standards = [
  s('ART.P1', 'IX–X', 'Paper 1 — Drawing and Painting from Still Life', 'Observational drawing and painting of a group of natural or made objects, judging their proportion, form, light and setting from direct view.'),
  s('ART.P2A', 'IX–X', 'Paper 2A — Study of Natural Forms', 'Drawing or painting a natural specimen — a spray, branch, flower or foliage — to reveal its structure and its growth.'),
  s('ART.P2B', 'IX–X', 'Paper 2B — Direct Study of Nature Out of Doors', 'Drawing or painting a landscape or outdoor subject from direct study of the scene itself.'),
  s('ART.P3', 'IX–X', 'Paper 3 — Original Imaginative Composition in Colour', 'Planning and carrying out an original picture in colour on a set theme, arranged from the imagination.'),
  s('ART.P4A', 'IX–X', 'Paper 4A — Applied Design for a Purpose', 'Designing a book page, cover, poster, card or emblem in flat paper, ink and colour to serve a stated purpose.'),
  s('ART.P4B', 'IX–X', 'Paper 4B — Lettering and the Calligrapher’s Art', 'Pen-made or brush-written lettering, formed and spaced as part of an applied design.'),
  s('ART.P4C', 'IX–X', 'Paper 4C — Patterned Paper', 'Designing a repeating decorative pattern on flat paper for a stated purpose.'),
  s('ART.IA1', 'IX–X', 'Internal — Two- and Three-Dimensional Craft', 'Practical work in modelling, sculpture, carving or relief in clay, plaster or other material.'),
  s('ART.IA2', 'IX–X', 'Internal — Printmaking and Surface Craft', 'Practical work in block, lino or wood printing, batik or tie-and-dye on paper or cloth.'),
];

const newTopics = [
  // ---------------- Paper 1: Still Life ----------------
  va('icse-art-observational-still-life', 'Observational Drawing from Still Life', 'Drawing & Composition', AGE, 'PROCEDURAL',
    'Develop the skill of drawing or painting a group of objects from direct observation, judging their proportion, the relationships between them, and how they sit within their setting.',
    EV('Draws a group of objects in correct proportion to one another', 'Shows each object sitting believably in its setting', 'Explains a choice made in arranging or viewing the group'),
    'Can {{name}} draw a group of everyday objects from life so their sizes and positions look right?',
    ['ART.P1']),
  va('icse-art-tonal-modelling', 'Light, Shade and Tonal Modelling', 'Drawing & Composition', AGE, 'PROCEDURAL',
    'Develop the skill of using shifts from light to dark to make a drawn or painted form look solid and rounded, showing where light falls and where shadow gathers.',
    EV('Uses light and shade to make a rounded form look solid', 'Shows a consistent direction of light across a drawing', 'Places cast shadows correctly for the light source'),
    'Can {{name}} shade a ball or a jug so it looks round and solid rather than flat?',
    ['ART.P1']),
  va('icse-art-perspective-depth', 'Perspective and Depth', 'Drawing & Composition', AGE, 'CONCEPTUAL',
    'Understand that a flat picture can suggest depth by making distant things smaller and higher, and by letting parallel edges appear to meet, so the scene reads as three-dimensional space.',
    EV('Draws distant objects smaller and closer objects larger', 'Shows parallel edges converging toward a point', 'Explains how overlap and placement suggest depth'),
    'Can {{name}} draw a road or a row of objects so that it looks like it goes back into the distance?',
    ['ART.P1', 'ART.P2B']),
  // ---------------- Paper 2: Nature ----------------
  va('icse-art-drawing-natural-forms', 'Drawing the Structure of Natural Forms', 'Drawing & Composition', AGE, 'PROCEDURAL',
    'Develop the skill of studying a natural form — a spray, a branch, a flower or some foliage — and drawing it to reveal how it is built and how it grows.',
    EV('Draws a plant form showing how its parts join and branch', 'Captures the way the form grows or spreads', 'Records accurate detail of leaf, petal or stem'),
    'Can {{name}} draw a leafy branch or flower closely enough to show how it is put together?',
    ['ART.P2A']),
  va('icse-art-outdoor-nature-study', 'Landscape and Outdoor Study from Nature', 'Drawing & Composition', AGE, 'PROCEDURAL',
    'Develop the skill of drawing or painting an outdoor scene directly from what is in front of you, capturing the space, light and mood of a real place.',
    EV('Paints or draws a landscape from direct observation outdoors', 'Shows depth and space in the scene', 'Conveys the light or mood of the place'),
    'Can {{name}} sit outside and draw the scene in front of them, showing space and distance?',
    ['ART.P2B']),
  // ---------------- Paper 3: Imaginative Composition ----------------
  va('icse-art-imaginative-composition', 'Original Imaginative Composition', 'Drawing & Composition', AGE, 'REPRESENTATIONAL',
    'Develop the skill of inventing an original picture around a given theme, planning how figures and objects are arranged so the whole composition tells the idea clearly.',
    EV('Invents an original composition from a set theme', 'Arranges figures and objects to carry the idea', 'Explains the choices behind the composition'),
    'Can {{name}} make up an original picture on a theme, arranging it so it tells the story clearly?',
    ['ART.P3']),
  va('icse-art-colour-in-composition', 'Colour Schemes and Harmony', 'Elements & Principles', AGE, 'PROCEDURAL',
    'Develop the skill of choosing and mixing colours that work together — warm against cool, harmony against contrast — so a picture carries the mood and feeling the artist intends.',
    EV('Builds a colour scheme from warm and cool colours', 'Uses harmony or contrast to set a mood', 'Mixes colours to get the tone the picture needs'),
    'Can {{name}} pick and mix colours that go together to give a picture a particular mood?',
    ['ART.P3']),
  // ---------------- Paper 4: Applied Art ----------------
  va('icse-art-applied-graphic-design', 'Applied Art: Designing for a Purpose', 'Applied & Graphic Art', AGE, 'PROCEDURAL',
    'Develop the skill of designing a poster, book cover, card or emblem, arranging picture and text in flat colour so the design does the job it is meant for.',
    EV('Designs a poster or cover for a stated purpose', 'Arranges picture and text into a balanced layout', 'Chooses colour and style to suit the message'),
    'Can {{name}} design a poster or book cover that arranges the words and picture to suit its purpose?',
    ['ART.P4A']),
  va('icse-art-lettering-calligraphy', 'Lettering and Calligraphy', 'Applied & Graphic Art', AGE, 'PROCEDURAL',
    'Develop the skill of drawing or writing letters by pen and brush so they are clear, evenly spaced and well shaped, and use lettering as part of a design.',
    EV('Forms letters that are clear and evenly spaced', 'Uses pen or brush to shape a lettering style', 'Fits lettering into a poster or page design'),
    'Can {{name}} write or draw a title in neat, well-shaped letters that fit a design?',
    ['ART.P4B']),
  va('icse-art-decorative-pattern-design', 'Decorative and Repeating Pattern', 'Applied & Graphic Art', AGE, 'REPRESENTATIONAL',
    'Develop the skill of designing a repeating decorative pattern, turning a shape or natural form into a motif that tiles evenly across a surface for a chosen purpose.',
    EV('Turns a shape or natural form into a repeating motif', 'Repeats the motif evenly across a surface', 'Suits the pattern to the purpose it is designed for'),
    'Can {{name}} turn a simple shape into a pattern that repeats neatly across a page?',
    ['ART.P4C']),
  // ---------------- Internal: Practical Craft ----------------
  va('icse-art-printmaking', 'Printmaking from a Block', 'Craft & Media', AGE, 'PROCEDURAL',
    'Develop the skill of cutting a design into a block and printing it in ink, so one carved image can be repeated cleanly many times across paper or cloth.',
    EV('Cuts a simple design into a printing block', 'Prints the block cleanly and evenly', 'Repeats the print to make a pattern'),
    'Can {{name}} carve a simple block and print it to repeat an image across paper?',
    ['ART.IA2']),
  va('icse-art-three-dimensional-work', 'Working in Three Dimensions', 'Craft & Media', AGE, 'PROCEDURAL',
    'Develop the skill of shaping a form in three dimensions — modelling clay, carving, or building a relief — so it can be seen and understood from more than one side.',
    EV('Models or carves a form that works from every side', 'Handles the material to build up or cut away shape', 'Shows surface and form in three dimensions'),
    'Can {{name}} model or carve a shape that looks right from every side, not just the front?',
    ['ART.IA1']),
];

// Visual Arts had no exam-grade practical topics to align to — the existing
// eight are all age 15 or below and introductory. So this is mint-only; each
// new topic anchors to an existing Visual Arts topic through the edges below.
const alignments = {};

const newEdges = [
  // ---- Still life ----
  { t: 'icse-art-observational-still-life', p: 'mt_FP0zEhri05', strength: 'hard', reason: 'Still-life study is advanced drawing from observation.' },
  { t: 'icse-art-observational-still-life', p: 'mt_XmqVVg2TQu', strength: 'hard', reason: 'It extends the earlier still-life composition to exam level.' },
  { t: 'icse-art-tonal-modelling', p: 'mt_FP0zEhri05', strength: 'hard', reason: 'Tonal modelling refines the shading first met in drawing.' },
  { t: 'icse-art-tonal-modelling', p: 'mt_reeZNBYG9Q', strength: 'soft', reason: 'Light and dark tone builds on the tonal gradation of colour.' },
  { t: 'icse-art-tonal-modelling', p: 'icse-art-observational-still-life', strength: 'soft', reason: 'Modelling a form follows drawing it accurately.' },
  { t: 'icse-art-perspective-depth', p: 'mt_FP0zEhri05', strength: 'hard', reason: 'Showing depth builds on drawing from observation.' },
  // Cross-graph bridge: linear perspective is projective geometry.
  { t: 'icse-art-perspective-depth', p: 'mt_AFH9ZAZxKC', strength: 'soft', reason: 'Linear perspective applies the geometric construction of lines and points.' },
  // ---- Nature ----
  { t: 'icse-art-drawing-natural-forms', p: 'mt_FP0zEhri05', strength: 'hard', reason: 'Drawing natural structure is observational drawing of living forms.' },
  { t: 'icse-art-drawing-natural-forms', p: 'icse-art-observational-still-life', strength: 'soft', reason: 'Drawing from nature parallels drawing from still life.' },
  { t: 'icse-art-outdoor-nature-study', p: 'mt_XmqVVg2TQu', strength: 'hard', reason: 'Outdoor landscape extends the earlier landscape composition.' },
  { t: 'icse-art-outdoor-nature-study', p: 'icse-art-perspective-depth', strength: 'soft', reason: 'An outdoor scene relies on showing depth.' },
  { t: 'icse-art-outdoor-nature-study', p: 'icse-art-drawing-natural-forms', strength: 'soft', reason: 'Landscape follows the study of single natural forms.' },
  // ---- Imaginative composition and colour ----
  { t: 'icse-art-colour-in-composition', p: 'mt_reeZNBYG9Q', strength: 'hard', reason: 'Colour schemes build on the colour wheel and warm and cool colours.' },
  { t: 'icse-art-colour-in-composition', p: 'mt_QGSOAeTyQt', strength: 'soft', reason: 'Harmony and contrast in colour apply the principles of composition.' },
  { t: 'icse-art-imaginative-composition', p: 'mt_QGSOAeTyQt', strength: 'hard', reason: 'Original composition applies the principles of composition.' },
  { t: 'icse-art-imaginative-composition', p: 'icse-art-colour-in-composition', strength: 'soft', reason: 'The imaginative paper must be carried out in colour.' },
  // ---- Applied art ----
  { t: 'icse-art-applied-graphic-design', p: 'mt_QGSOAeTyQt', strength: 'hard', reason: 'Laying out a poster or cover applies the principles of composition.' },
  { t: 'icse-art-applied-graphic-design', p: 'icse-art-lettering-calligraphy', strength: 'soft', reason: 'A poster or cover carries designed lettering.' },
  { t: 'icse-art-applied-graphic-design', p: 'icse-art-colour-in-composition', strength: 'soft', reason: 'Applied design uses colour for effect.' },
  { t: 'icse-art-lettering-calligraphy', p: 'mt_XG4yVv6uTE', strength: 'soft', reason: 'Lettering shapes the line, an element of art, into readable form.' },
  { t: 'icse-art-decorative-pattern-design', p: 'mt_XG4yVv6uTE', strength: 'hard', reason: 'A pattern is built from line, shape and colour, the elements of art.' },
  { t: 'icse-art-decorative-pattern-design', p: 'mt_QGSOAeTyQt', strength: 'soft', reason: 'Repeating a motif uses rhythm, a principle of composition.' },
  // ---- Craft ----
  { t: 'icse-art-printmaking', p: 'mt_FP0zEhri05', strength: 'soft', reason: 'A print begins from a drawn design.' },
  { t: 'icse-art-printmaking', p: 'icse-art-decorative-pattern-design', strength: 'soft', reason: 'Block printing repeats a designed motif as a pattern.' },
  { t: 'icse-art-three-dimensional-work', p: 'mt_XG4yVv6uTE', strength: 'soft', reason: 'Form and space, elements of art, become literal in three dimensions.' },
  { t: 'icse-art-three-dimensional-work', p: 'icse-art-observational-still-life', strength: 'soft', reason: 'Modelling a form builds on observing form in drawing.' },
];

const newClusters = [
  { subject: 'Visual Arts', domain: 'Drawing & Composition', ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'At this stage drawing and painting become exam-grade skills. Your child learns to draw a group of objects from life with true proportion, to model form with light and shade, and to suggest depth and space through perspective. They study natural forms closely — a branch, a flower, some foliage — and work outdoors from the landscape itself, then bring it all together in an original picture planned around a set theme.' },
  { subject: 'Visual Arts', domain: 'Elements & Principles', ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'Colour work grows up here. Building on the colour wheel learned earlier, your child chooses and mixes colours that belong together — warm against cool, harmony against contrast — and uses them to give a picture a definite mood. This is the colour thinking behind the imaginative painting paper, where the whole effect rests on how the colours are handled.' },
  { subject: 'Visual Arts', domain: 'Applied & Graphic Art', ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'Applied art is design with a job to do. Your child learns to lay out a poster, book cover, card or emblem so that picture and words work together for a purpose, to form clear and well-shaped lettering by pen and brush, and to build a repeating decorative pattern from a single motif. Unlike a free painting, each of these is judged by how well it serves its purpose.' },
  { subject: 'Visual Arts', domain: 'Craft & Media', ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'Beyond pencil and paint, your child works by hand in other materials. They cut a design into a block and print it to repeat an image across paper or cloth, and they shape a form in three dimensions by modelling clay, carving, or building a relief. These crafts teach how a material behaves and how a form reads from every side.' },
];

integrate({ subjectDoc: 'Art (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
