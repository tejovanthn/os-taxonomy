#!/usr/bin/env node
/**
 * build/nios-sec-mathematics.mjs — NIOS Secondary Mathematics (Code 211).
 * Align-heavy: 26 lessons across 6 modules, most of which existing Maths topics
 * already teach (algebra, percentages, area, coordinates, data). Mints the
 * genuinely-secondary gaps: irrational numbers, quadratic solving, congruence
 * rules, circle theorems, tangents, constructions, solid surface-area/volume,
 * trigonometry (a new domain), and median/mode. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Mathematics', courseCode: '211' };
const M = 'Mathematics';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('211.M1.L1', 'I. Algebra', 'Number System', 'Number System', 'Understand the number system including rational and irrational numbers and their representation on the number line.'),
  std('211.M1.L2', 'I. Algebra', 'Exponents and Radicals', 'Exponents and Radicals', 'Understand exponents, the laws of exponents, and radicals (roots).'),
  std('211.M1.L3', 'I. Algebra', 'Algebraic Expressions and Polynomials', 'Algebraic Expressions and Polynomials', 'Work with algebraic expressions and polynomials — terms, degree, and operations.'),
  std('211.M1.L4', 'I. Algebra', 'Special Products and Factorization', 'Special Products and Factorization', 'Use special products (identities) and factorise algebraic expressions.'),
  std('211.M1.L5', 'I. Algebra', 'Linear Equations', 'Linear Equations', 'Solve linear equations in one and two variables and simultaneous linear equations.'),
  std('211.M1.L6', 'I. Algebra', 'Quadratic Equations', 'Quadratic Equations', 'Understand and solve quadratic equations by factorisation and the quadratic formula.'),
  std('211.M1.L7', 'I. Algebra', 'Arithmetic Progressions', 'Arithmetic Progressions', 'Understand arithmetic progressions and find their terms and sums.'),
  std('211.M2.L8', 'II. Commercial Mathematics', 'Percentage and its Applications', 'Percentage and its Applications', 'Apply percentages to profit and loss, discount, and simple and compound interest.'),
  std('211.M2.L9', 'II. Commercial Mathematics', 'Instalment Buying', 'Instalment Buying', 'Understand instalment buying and calculate instalments and interest.'),
  std('211.M3.L10', 'III. Geometry', 'Lines and Angles', 'Lines and Angles', 'Understand lines, angles and the relationships between angles formed by intersecting and parallel lines.'),
  std('211.M3.L11', 'III. Geometry', 'Congruence of Triangles', 'Congruence of Triangles', 'Understand congruence of triangles and the criteria for it (SSS, SAS, ASA, RHS).'),
  std('211.M3.L12', 'III. Geometry', 'Concurrent Lines', 'Concurrent Lines', 'Understand concurrent lines in a triangle — medians, altitudes and their points of concurrency.'),
  std('211.M3.L13', 'III. Geometry', 'Quadrilaterals', 'Quadrilaterals', 'Understand the properties of quadrilaterals and special quadrilaterals.'),
  std('211.M3.L14', 'III. Geometry', 'Similarity of Triangles', 'Similarity of Triangles', 'Understand similarity of triangles and the criteria for it.'),
  std('211.M3.L15', 'III. Geometry', 'Circles', 'Circles', 'Understand circles and their parts — centre, radius, chord, arc and sector.'),
  std('211.M3.L16', 'III. Geometry', 'Angles in a Circle and Cyclic Quadrilaterals', 'Angles in a Circle and Cyclic Quadrilaterals', 'Understand the angle properties of circles and cyclic quadrilaterals.'),
  std('211.M3.L17', 'III. Geometry', 'Secants, Tangents and their Properties', 'Secants, Tangents and their Properties', 'Understand secants and tangents to a circle and their properties.'),
  std('211.M3.L18', 'III. Geometry', 'Constructions', 'Constructions', 'Perform geometric constructions using ruler and compass.'),
  std('211.M3.L19', 'III. Geometry', 'Co-ordinate Geometry', 'Co-ordinate Geometry', 'Plot points and understand basic coordinate geometry, including distance between points.'),
  std('211.M4.L20', 'IV. Mensuration', 'Perimeter and Area of Plane Figures', 'Perimeter and Area of Plane Figures', 'Find the perimeter and area of plane figures including triangles, quadrilaterals and circles.'),
  std('211.M4.L21', 'IV. Mensuration', 'Surface Area and Volume of Solids', 'Surface Area and Volume of Solids', 'Find the surface area and volume of solids — cuboid, cylinder, cone and sphere.'),
  std('211.M5.L22', 'V. Trigonometry', 'Introduction to Trigonometry', 'Introduction to Trigonometry', 'Understand trigonometry as the study of relationships between the sides and angles of a right triangle.'),
  std('211.M5.L23', 'V. Trigonometry', 'Trigonometric Ratios of Special Angles', 'Trigonometric Ratios of Special Angles', 'Understand the trigonometric ratios sine, cosine and tangent, and their values for special angles.'),
  std('211.M6.L24', 'VI. Statistics', 'Data and their Representations', 'Data and their Representations', 'Collect, organise and represent data using tables, bar graphs, histograms and pie charts.'),
  std('211.M6.L25', 'VI. Statistics', 'Measures of Central Tendency', 'Measures of Central Tendency', 'Understand and calculate the mean, median and mode of data.'),
  std('211.M6.L26', 'VI. Statistics', 'Introduction to Probability', 'Introduction to Probability', 'Understand probability as a measure of the likelihood of an event.'),
];

// Existing Maths topics that already teach these secondary lessons.
const alignments = Object.fromEntries([
  ['mt_hCVPYlF-7Y', ['211.M1.L2']],                      // Square and cube numbers ← Exponents
  ['mt_KwdjWEmMNo', ['211.M1.L3']], ['mt_nNNVrLqPW3', ['211.M1.L3']], // Algebraic Notation / Collecting Like Terms ← Algebraic Expressions
  ['mt_FX4a2Q8XXN', ['211.M1.L4']], ['mt_uESbzWCZIq', ['211.M1.L4']], // Expanding / Factorising ← Special Products & Factorization
  ['mt_QhFEDyIwSO', ['211.M1.L5']], ['mt_mqgu72aCMz', ['211.M1.L5']], // Solving Linear Eq / Simultaneous ← Linear Equations
  ['mt_GZuoYaDdWd', ['211.M1.L6']],                      // Quadratic Graphs ← Quadratic Equations
  ['mt_yXO7lQ9Yn7', ['211.M1.L7']], ['mt_HRKzwEQJgO', ['211.M1.L7']], // Generating Sequences / Nth-Term ← Arithmetic Progressions
  ['mt_PNSyfH56eQ', ['211.M2.L8']], ['mt_R3arzY0IjZ', ['211.M2.L8', '211.M2.L9']], // Percentages / Interest ← Percentage & Instalment
  ['mt_QysgF57dxh', ['211.M3.L10']], ['mt_u23IGDxOpk', ['211.M3.L10']], // Lines Rays Angles / Parallel ← Lines and Angles
  ['mt_DNYQLahbfa', ['211.M3.L11', '211.M3.L13']],       // Properties of triangles & quadrilaterals ← Congruence + Quadrilaterals
  ['mt_2OtRUM_0zW', ['211.M3.L14']],                     // Scale and similar shapes ← Similarity
  ['mt_xq3YHZ2zeR', ['211.M3.L15']],                     // Parts of a circle ← Circles
  ['mt_jBQS-CicNn', ['211.M3.L19']], ['mt_K0Y15w48SY', ['211.M3.L19']], // Coordinates ← Co-ordinate Geometry
  ['mt_ML5t7n2-U8', ['211.M4.L20']], ['mt_svFa6_mjO_', ['211.M4.L20']], // Area of Triangles / Circles area ← Perimeter & Area
  ['mt_vnJEztczji', ['211.M4.L21']],                     // Nets of 3-D Shapes ← Surface Area & Volume
  ['mt_ChjMU2GDJa', ['211.M6.L24']], ['mt_H6LlpWgEYS', ['211.M6.L24']], // Bar graphs ← Data and Representations
  ['mt_Cg8VPguS_V', ['211.M6.L25']],                     // Calculating the Mean ← Measures of Central Tendency
  ['mt_Zt30Gxi-qp', ['211.M6.L26']], ['mt_vmQJAtAFuy', ['211.M6.L26']], // Probability ← Introduction to Probability
]);

const T = (_slug, domain, name, a0, a1, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: M, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('sec-rational-irrational', 'Number Representation & Place Value', 'Rational and Irrational Numbers', 13, 15, 'CONCEPTUAL',
    'Understand that numbers split into rational numbers (which can be written as a fraction) and irrational numbers (like √2 or π, whose decimals never end or repeat), and that together they fill the number line.',
    ['Classify a number as rational or irrational', 'Give an example of an irrational number and explain why', 'Place rational and irrational numbers on a number line'],
    'Can {{name}} explain the difference between rational numbers (which can be written as fractions) and irrational numbers like √2 or π?', ['nios-sec-2020:211.M1.L1']),
  T('sec-quadratic-equations', 'Algebra', 'Solving Quadratic Equations', 13, 15, 'PROCEDURAL',
    'Solve quadratic equations (equations with a squared term) — by factorising and by using the quadratic formula — and understand what the solutions (roots) mean.',
    ['Recognise a quadratic equation', 'Solve a quadratic by factorising', 'Use the quadratic formula to find the roots'],
    'Can {{name}} solve a quadratic equation — one with an x² term — by factorising or using the formula?', ['nios-sec-2020:211.M1.L6']),
  T('sec-congruent-triangles', 'Geometry', 'Congruence of Triangles', 14, 16, 'CONCEPTUAL',
    'Understand that two triangles are congruent when they are exactly the same shape and size, and use the criteria (SSS, SAS, ASA, RHS) to prove congruence.',
    ['Explain what it means for triangles to be congruent', 'State the congruence criteria (SSS, SAS, ASA, RHS)', 'Use a criterion to decide whether two triangles are congruent'],
    'Can {{name}} explain when two triangles are congruent, and use a rule like SSS or SAS to prove it?', ['nios-sec-2020:211.M3.L11', 'nios-sec-2020:211.M3.L12']),
  T('sec-circle-theorems', 'Geometry', 'Angles in a Circle', 14, 16, 'CONCEPTUAL',
    'Understand the angle properties of circles — the angle at the centre is twice the angle at the circumference, angles in the same segment are equal, and opposite angles of a cyclic quadrilateral sum to 180°.',
    ['State the relationship between angles at the centre and circumference', 'Explain that angles in the same segment are equal', 'Use the cyclic-quadrilateral angle property'],
    'Can {{name}} use the angle rules of circles — like the angle at the centre being twice the angle at the edge — to find missing angles?', ['nios-sec-2020:211.M3.L16']),
  T('sec-tangents', 'Geometry', 'Tangents to a Circle', 14, 16, 'CONCEPTUAL',
    'Understand secants and tangents to a circle — that a tangent touches at one point and is perpendicular to the radius there, and that two tangents from a point are equal in length.',
    ['Distinguish a tangent from a secant', 'Explain that a tangent is perpendicular to the radius at the point of contact', 'Use the equal-tangents property'],
    'Can {{name}} explain what a tangent to a circle is and that it meets the radius at a right angle?', ['nios-sec-2020:211.M3.L17']),
  T('sec-constructions', 'Geometry', 'Geometric Constructions', 14, 16, 'PROCEDURAL',
    'Use a ruler and compass to make accurate geometric constructions — bisecting lines and angles, constructing perpendiculars, and drawing triangles to given measurements.',
    ['Bisect a line segment and an angle with ruler and compass', 'Construct a perpendicular to a line', 'Construct a triangle from given measurements'],
    'Can {{name}} use a compass and ruler to accurately bisect an angle or construct a triangle?', ['nios-sec-2020:211.M3.L18']),
  T('sec-surface-area-volume', 'Measurement', 'Surface Area and Volume of Solids', 14, 16, 'PROCEDURAL',
    'Calculate the surface area and volume of solid shapes — cuboids, cylinders, cones and spheres — using the appropriate formulae, and apply them to real problems.',
    ['Calculate the volume of a cuboid and a cylinder', 'Calculate the surface area of a solid', 'Apply surface area or volume to a real-world problem'],
    'Can {{name}} work out the surface area and volume of solids like a cylinder or cone using the right formulae?', ['nios-sec-2020:211.M4.L21']),
  T('sec-intro-trigonometry', 'Trigonometry', 'Introduction to Trigonometry', 14, 16, 'CONCEPTUAL',
    'Understand trigonometry as the study of the relationships between the sides and angles of a right-angled triangle, and the idea of naming sides as opposite, adjacent and hypotenuse relative to an angle.',
    ['Explain what trigonometry studies', 'Identify the opposite, adjacent and hypotenuse for an angle in a right triangle', 'Explain why side ratios stay the same for a given angle'],
    'Can {{name}} explain what trigonometry is about — the link between the sides and angles of a right-angled triangle?', ['nios-sec-2020:211.M5.L22']),
  T('sec-trig-ratios', 'Trigonometry', 'Trigonometric Ratios', 14, 16, 'PROCEDURAL',
    'Understand the trigonometric ratios sine, cosine and tangent as ratios of the sides of a right triangle, and know their values for the special angles 0°, 30°, 45°, 60° and 90°.',
    ['Define sine, cosine and tangent as side ratios', 'Use a trig ratio to find an unknown side', 'Recall the ratios for special angles like 30°, 45° and 60°'],
    'Can {{name}} use sine, cosine and tangent to find a missing side of a right-angled triangle?', ['nios-sec-2020:211.M5.L23']),
  T('sec-median-mode', 'Data & Statistics', 'Median and Mode', 14, 16, 'PROCEDURAL',
    'Understand the median (the middle value) and the mode (the most common value) as measures of central tendency, and choose the right average for a set of data.',
    ['Find the median of a set of data', 'Find the mode of a set of data', 'Explain when the median or mode is a better average than the mean'],
    'Can {{name}} find the median and mode of a set of numbers, and explain how they differ from the mean?', ['nios-sec-2020:211.M6.L25']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  hard('sec-quadratic-equations', 'mt_GZuoYaDdWd', 'Solving quadratics builds on understanding quadratic graphs'),
  soft('sec-quadratic-equations', 'mt_uESbzWCZIq', 'Solving quadratics by factorising builds on factorising expressions'),
  soft('sec-rational-irrational', 'mt_hCVPYlF-7Y', 'Irrational numbers like √2 build on square and cube numbers'),
  soft('sec-congruent-triangles', 'mt_DNYQLahbfa', 'Congruence builds on the properties of triangles'),
  hard('sec-circle-theorems', 'mt_xq3YHZ2zeR', 'Circle angle theorems build on knowing the parts of a circle'),
  hard('sec-tangents', 'mt_xq3YHZ2zeR', 'Tangents build on knowing the parts of a circle'),
  soft('sec-tangents', 'sec-circle-theorems', 'Tangent properties are studied alongside circle angle theorems'),
  soft('sec-constructions', 'mt_QysgF57dxh', 'Constructions build on understanding lines, rays and angles'),
  hard('sec-surface-area-volume', 'mt_vnJEztczji', 'Surface area of solids builds on nets of 3-D shapes'),
  soft('sec-surface-area-volume', 'mt_svFa6_mjO_', 'Volume of a cylinder builds on the area of a circle'),
  soft('sec-intro-trigonometry', 'mt_2OtRUM_0zW', 'Trigonometry builds on the similarity of triangles'),
  soft('sec-intro-trigonometry', 'mt_DNYQLahbfa', 'Trigonometry uses the properties of right triangles'),
  hard('sec-trig-ratios', 'sec-intro-trigonometry', 'The trig ratios build on the introduction to trigonometry'),
  hard('sec-median-mode', 'mt_Cg8VPguS_V', 'Median and mode build on calculating the mean'),
];

const newClusters = [
  { subject: M, domain: 'Trigonometry', ageRangeStart: 14, summary: 'Your teenager is starting trigonometry — the study of how the sides and angles of a right-angled triangle relate, using sine, cosine and tangent to find missing sides and angles.' },
  { subject: M, domain: 'Geometry', ageRangeStart: 14, summary: 'Your teenager is tackling secondary geometry — congruent triangles and how to prove them, the angle and tangent properties of circles, and accurate ruler-and-compass constructions.' },
  { subject: M, domain: 'Algebra', ageRangeStart: 13, summary: 'Your teenager is deepening algebra — solving quadratic equations by factorising and by formula, building on graphs and expressions.' },
  { subject: M, domain: 'Measurement', ageRangeStart: 14, summary: 'Your teenager is calculating the surface area and volume of solid shapes — cuboids, cylinders, cones and spheres — and applying them to real problems.' },
  { subject: M, domain: 'Data & Statistics', ageRangeStart: 14, summary: 'Your teenager is working with averages — the mean, median and mode — and choosing the right one to summarise a set of data.' },
  { subject: M, domain: 'Number Representation & Place Value', ageRangeStart: 13, summary: 'Your teenager is extending the number system to irrational numbers like √2 and π, and seeing how rational and irrational numbers together fill the number line.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
