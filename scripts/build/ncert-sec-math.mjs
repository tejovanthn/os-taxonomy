#!/usr/bin/env node
/**
 * build/ncert-sec-math.mjs — NCERT Mathematics, Classes IX–X, at unit grain.
 * Mostly alignment onto the existing secondary maths ladder; mints the units
 * the taxonomy genuinely lacked (polynomials and the factor theorem, Euclid's
 * axioms, Heron's formula, arithmetic progressions, coordinate-geometry
 * formulae, similar triangles, heights and distances, frustum, ogives, and the
 * two appendices on proof and modelling). Descriptions are Marble-authored
 * factual scope summaries (no NCERT text — see PROVENANCE). Idempotent.
 */

import { integrateNcertSec } from './ncert-sec.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

const standards = [
  // ---- Class IX ----
  s('MA.C9.NS', 'IX', 'Number Systems', 'Rational and irrational numbers on the number line; terminating and recurring decimal expansions; laws of exponents with rational powers; rationalisation of denominators.'),
  s('MA.C9.ALG.POLY', 'IX', 'Algebra — Polynomials', 'Polynomials in one variable, degree and zeros; the remainder and factor theorems; factorisation of quadratic and cubic polynomials; algebraic identities.'),
  s('MA.C9.ALG.LIN', 'IX', 'Algebra — Linear Equations', 'Linear equations in two variables; infinitely many solutions written as ordered pairs; algebraic and graphical solution together.'),
  s('MA.C9.CG', 'IX', 'Coordinate Geometry', 'The Cartesian plane and its terminology; plotting points; graphing linear equations of the form ax + by + c = 0.'),
  s('MA.C9.GEO.EUCLID', 'IX', 'Geometry — Euclid', "Euclid's method of formalising observation into rigorous mathematics; definitions, axioms and postulates; the five postulates and the relationship between axiom and theorem."),
  s('MA.C9.GEO.LINES', 'IX', 'Geometry — Lines and Angles', 'Linear pairs and vertically opposite angles; corresponding, alternate and interior angles on a transversal; the angle sum and exterior angle of a triangle.'),
  s('MA.C9.GEO.TRI', 'IX', 'Geometry — Triangles', 'Congruence of triangles by SAS, ASA, SSS and RHS; properties of isosceles triangles; triangle inequalities relating angle and facing side.'),
  s('MA.C9.GEO.QUAD', 'IX', 'Geometry — Quadrilaterals', 'Properties of parallelograms and their converses; diagonals bisecting each other; the midpoint theorem and its converse.'),
  s('MA.C9.GEO.AREA', 'IX', 'Geometry — Areas', 'Parallelograms and triangles on the same base and between the same parallels have equal area.'),
  s('MA.C9.GEO.CIRCLE', 'IX', 'Geometry — Circles', 'Chords and the angles they subtend; perpendicular from centre bisects a chord; angle at the centre double the angle at the circumference; cyclic quadrilaterals.'),
  s('MA.C9.GEO.CONST', 'IX', 'Geometry — Constructions', 'Ruler-and-compass construction of bisectors and standard angles; triangles from base, base angles and the sum or difference of sides.'),
  s('MA.C9.MEN', 'IX', 'Mensuration', "Area of a triangle by Heron's formula and its use for quadrilaterals; surface area and volume of cubes, cuboids, spheres, hemispheres, cylinders and cones."),
  s('MA.C9.STAT', 'IX', 'Statistics', 'Collection and tabular presentation of data; bar graphs, histograms with varying widths and frequency polygons; mean, median and mode of ungrouped data.'),
  s('MA.C9.PROB', 'IX', 'Probability', 'Empirical probability from repeated experiments and observed frequency, drawn from real-life situations.'),
  s('MA.C9.PROOF', 'IX', 'Appendix — Proofs', 'What makes a statement mathematically valid; axiom, conjecture and theorem distinguished; the deductive nature of proof; disproof by counterexample.'),
  s('MA.C9.MODEL', 'IX', 'Appendix — Modelling', 'The stages of mathematical modelling: hypothesis, choosing a model, solving the equivalent mathematical problem, interpreting and validating.'),
  // ---- Class X ----
  s('MA.C10.NS', 'X', 'Number Systems', "Euclid's division lemma and the Fundamental Theorem of Arithmetic; proofs of irrationality; decimal expansions of rational numbers."),
  s('MA.C10.ALG.POLY', 'X', 'Algebra — Polynomials', 'Zeros of a polynomial and their relationship with coefficients, particularly for quadratics; the division algorithm for polynomials.'),
  s('MA.C10.ALG.PAIR', 'X', 'Algebra — Pair of Linear Equations', 'Pairs of linear equations in two variables; geometric meaning of consistency; solution by substitution, elimination and cross multiplication.'),
  s('MA.C10.ALG.QUAD', 'X', 'Algebra — Quadratic Equations', 'Standard form of a quadratic equation; solution by factorisation and by completing the square; the discriminant and the nature of roots.'),
  s('MA.C10.ALG.AP', 'X', 'Algebra — Arithmetic Progressions', 'Arithmetic progressions; derivation and use of the nth term and the sum of the first n terms.'),
  s('MA.C10.TRIG', 'X', 'Trigonometry', 'Trigonometric ratios of an acute angle; values for 30°, 45° and 60°; the identity sin²A + cos²A = 1; ratios of complementary angles.'),
  s('MA.C10.TRIG.HD', 'X', 'Trigonometry — Heights and Distances', 'Simple problems on heights and distances using angles of elevation and depression, restricted to two right triangles.'),
  s('MA.C10.CG', 'X', 'Coordinate Geometry', 'Distance between two points; the internal section formula; area of a triangle from coordinates.'),
  s('MA.C10.GEO.SIM', 'X', 'Geometry — Similar Triangles', 'Similarity of triangles; the basic proportionality theorem; AAA, SSS and SAS similarity; ratio of areas of similar triangles; Pythagoras theorem and its converse.'),
  s('MA.C10.GEO.CIRCLE', 'X', 'Geometry — Circles', 'Tangents to a circle; the tangent is perpendicular to the radius at the point of contact; equal tangents from an external point.'),
  s('MA.C10.GEO.CONST', 'X', 'Geometry — Constructions', 'Dividing a line segment in a given ratio; constructing tangents from an external point; constructing a triangle similar to a given triangle.'),
  s('MA.C10.MEN.CIRCLE', 'X', 'Mensuration — Areas Related to Circles', 'Area of a circle, and of sectors and segments; perimeter and area problems combining triangles, quadrilaterals and circles.'),
  s('MA.C10.MEN.SOLID', 'X', 'Mensuration — Surface Areas and Volumes', 'Surface area and volume of combinations of two solids; the frustum of a cone; problems converting one metallic solid into another.'),
  s('MA.C10.STAT', 'X', 'Statistics', 'Mean, median and mode of grouped data; the cumulative frequency graph.'),
  s('MA.C10.PROB', 'X', 'Probability', 'The classical definition of probability and its connection with the empirical approach; simple problems on single events.'),
  s('MA.C10.PROOF', 'X', 'Appendix — Proofs', 'Extended work on statement, argument and proof; using only given facts to reach a conclusion; constructing converses and negations.'),
  s('MA.C10.MODEL', 'X', 'Appendix — Modelling', 'Modelling where some constraints are ignored; estimating probabilities and averages; modelling fair instalment payments.'),
];

// Existing topic ids referenced below were read from data/topics.json rather
// than minted, since they belong to other build families' namespaces.
const alignments = {
  // Class IX — number, algebra, coordinate geometry
  'mt_sORtAFxvlB': ['MA.C9.NS', 'MA.C10.NS'],           // Rational and Irrational Numbers
  'mt_b4lbTOJYwI': ['MA.C9.NS'],                        // Number Sets & Infinity
  'mt_hCVPYlF-7Y': ['MA.C9.NS'],                        // Square and cube numbers
  'mt_zLG6El2cCk': ['MA.C9.NS'],                        // Square Roots and Cube Roots
  'mt_uESbzWCZIq': ['MA.C9.ALG.POLY'],                  // Factorising Expressions
  'mt_KhS7K1Mgrw': ['MA.C9.ALG.POLY'],                  // Expanding Double Brackets
  'mt_FX4a2Q8XXN': ['MA.C9.ALG.POLY'],                  // Expanding Single Brackets
  'mt_QhFEDyIwSO': ['MA.C9.ALG.LIN'],                   // Solving Linear Equations
  'mt_WBdHkc2HTf': ['MA.C9.ALG.LIN', 'MA.C9.CG'],       // Linear Function Graphs
  'mt_-3udyo6VyB': ['MA.C9.ALG.LIN', 'MA.C9.CG'],       // Plotting Linear Graphs
  'mt_hVpGOEz2kG': ['MA.C9.CG'],                        // Coordinates (age 11+)
  'mt_y-BuQAfw4B': ['MA.C9.CG'],                        // Coordinates (age 12+)
  'mt_mqgu72aCMz': ['MA.C10.ALG.PAIR'],                 // Simultaneous Equations
  'mt_cyTv9Ajw49': ['MA.C10.ALG.QUAD'],                 // Solving Quadratic Equations
  'mt_GZuoYaDdWd': ['MA.C10.ALG.QUAD'],                 // Quadratic Graphs
  'mt_yXO7lQ9Yn7': ['MA.C10.ALG.AP'],                   // Generating Sequences
  'mt_HRKzwEQJgO': ['MA.C10.ALG.AP'],                   // Nth-Term Rules
  'mt_xhoOWnhtHq': ['MA.C10.NS'],                       // Factors, multiples, and primes
  // Class IX — geometry
  'mt_H_pNJ3ZI_S': ['MA.C9.GEO.LINES'],                 // Angles with parallel lines
  'mt_J03RFlVdas': ['MA.C9.GEO.LINES'],                 // Angle sums in triangles and polygons
  'mt_167X6Ax8P7': ['MA.C9.GEO.LINES'],                 // Angles in triangles (age 12+)
  'mt_C1EJxERW34': ['MA.C9.GEO.TRI'],                   // Congruence of Triangles
  'mt_lVAZR0S51M': ['MA.C9.GEO.TRI'],                   // Concurrent Lines in a Triangle
  'mt_DNYQLahbfa': ['MA.C9.GEO.QUAD'],                  // Properties of triangles and quadrilaterals
  'mt_ML5t7n2-U8': ['MA.C9.GEO.AREA'],                  // Area of Triangles & Parallelograms
  'mt_GglXLxaYgQ': ['MA.C9.GEO.CIRCLE'],                // Angles in a Circle
  'mt_t3ANLmY5le': ['MA.C10.GEO.CIRCLE'],               // Tangents to a Circle
  'mt_AFH9ZAZxKC': ['MA.C9.GEO.CONST', 'MA.C10.GEO.CONST'], // Geometric Constructions
  'mt_svFa6_mjO_': ['MA.C10.MEN.CIRCLE'],               // Circles: Circumference & Area
  'mt_0MbPqx8PCp': ['MA.C9.MEN', 'MA.C10.MEN.SOLID'],   // Surface Area and Volume of Solids
  'mt_nRksLqt-iR': ['MA.C9.MEN'],                       // 3-D shapes
  'mt_1VmTUxBrNd': ['MA.C10.GEO.SIM'],                  // Types of angles (age 13+) — Pythagoras
  'mt_1badik7iKJ': ['MA.C10.GEO.SIM'],                  // Scale and similar shapes
  // Trigonometry
  'mt_M2nFDa7tax': ['MA.C10.TRIG'],                     // Introduction to Trigonometry
  'mt_RiJ6OdRsmw': ['MA.C10.TRIG'],                     // Trigonometric Ratios
  'mt_KB_Czd7RQH': ['MA.C10.TRIG', 'MA.C10.TRIG.HD'],   // Trigonometry basics
  // Statistics and probability
  'mt_dbsLUDDBRW': ['MA.C9.STAT', 'MA.C10.STAT'],       // Median and Mode
  'mt_YHsUhi4Prc': ['MA.C9.STAT'],                      // Tables, charts, and graphs
  'mt_XSXnTQoQ4l': ['MA.C9.STAT'],                      // Comparing measurements
  'mt_sHJqh6UUya': ['MA.C9.PROB'],                      // Experimental probability
  'mt_vmQJAtAFuy': ['MA.C9.PROB', 'MA.C10.PROB'],       // The Probability Scale
  'mt_XfyqXLqzpx': ['MA.C10.PROB'],                     // Complementary events
  'mt_GDtFU5fyUv': ['MA.C10.PROB'],                     // Tree diagrams
};

const EV = (a, b, c) => [a, b, c];

const newTopics = [
  {
    _slug: 'polynomials-degree-zeros', type: 'CONCEPTUAL', subject: 'Mathematics', domain: 'Algebra',
    name: 'Polynomials and Their Zeros', ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that a polynomial is built from powers of a variable, that its degree names its highest power, and that its zeros are the values making it equal nothing.',
    evidence: EV('Names a polynomial as linear, quadratic or cubic from its degree', 'Finds the zeros of a simple polynomial by substitution or factorisation', 'Explains why a zero of a polynomial is a root of the matching equation'),
    assessmentPrompt: 'Give {{name}} the expression x² − 5x + 6 and ask what its degree is and which values of x make it zero.',
    standards: ['ncert-sec:MA.C9.ALG.POLY', 'ncert-sec:MA.C10.ALG.POLY'],
  },
  {
    _slug: 'remainder-factor-theorems', type: 'PROCEDURAL', subject: 'Mathematics', domain: 'Algebra',
    name: 'The Remainder and Factor Theorems', ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Use the remainder theorem to find what is left when a polynomial is divided by a linear factor, and the factor theorem to test whether that factor divides it exactly.',
    evidence: EV('Finds the remainder on dividing a polynomial by (x − a) by evaluating at a', 'Tests whether a given linear expression is a factor of a polynomial', 'Factorises a cubic polynomial by first finding one zero'),
    assessmentPrompt: 'Ask {{name}} whether (x − 2) is a factor of x³ − 3x² + 4, and how they can tell without doing the whole division.',
    standards: ['ncert-sec:MA.C9.ALG.POLY', 'ncert-sec:MA.C10.ALG.POLY'],
  },
  {
    _slug: 'euclid-axioms-postulates', type: 'CONCEPTUAL', subject: 'Mathematics', domain: 'Mathematical Thinking',
    name: "Euclid's Axioms and Postulates", ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that geometry can be built up from a small set of assumed statements, and that everything else follows from them by reasoning rather than by measurement.',
    evidence: EV('States the difference between an axiom or postulate and a theorem', 'Gives an example of a result proved from stated assumptions', 'Explains why assumptions must be listed before anything can be proved'),
    assessmentPrompt: 'Ask {{name}} why mathematicians start with statements they simply assume to be true, and what they do with them afterwards.',
    standards: ['ncert-sec:MA.C9.GEO.EUCLID'],
  },
  {
    _slug: 'herons-formula', type: 'PROCEDURAL', subject: 'Mathematics', domain: 'Measurement',
    name: "Heron's Formula", ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Find the area of a triangle from the lengths of its three sides alone, without knowing the height, and extend this to split quadrilaterals into triangles.',
    evidence: EV('Computes the semi-perimeter and applies the formula correctly', 'Finds the area of a triangle given only three side lengths', 'Finds the area of a quadrilateral by dividing it into two triangles'),
    assessmentPrompt: 'Give {{name}} a triangle with sides 13, 14 and 15 and ask for its area without measuring any height.',
    standards: ['ncert-sec:MA.C9.MEN'],
  },
  {
    _slug: 'proof-conjecture-counterexample', type: 'META', subject: 'Mathematics', domain: 'Mathematical Thinking',
    name: 'Proof, Conjecture and Counterexample', ageRangeStart: 14, ageRangeEnd: 16,
    description: 'Understand that checking many cases is not proof, that one counterexample disproves a claim, and that a proof argues deductively from what is already accepted.',
    evidence: EV('Distinguishes a conjecture that is merely tested from one that is proved', 'Disproves a false general claim by producing a single counterexample', 'Writes a short deductive argument with its assumptions stated'),
    assessmentPrompt: 'Tell {{name}} that every odd number above one is prime, and ask how they would settle whether that is true.',
    standards: ['ncert-sec:MA.C9.PROOF', 'ncert-sec:MA.C10.PROOF'],
  },
  {
    _slug: 'mathematical-modelling', type: 'META', subject: 'Mathematics', domain: 'Mathematical Thinking',
    name: 'Mathematical Modelling', ageRangeStart: 14, ageRangeEnd: 16,
    description: 'Turn a real situation into a mathematical problem by making simplifying assumptions, solve it, then check whether the answer makes sense back in the real situation.',
    evidence: EV('States the simplifying assumptions a model depends on', 'Solves the mathematical problem the model produces', 'Judges whether the result is reasonable in the original situation'),
    assessmentPrompt: 'Ask {{name}} how they would work out how much water their household uses in a year, and what they would have to assume.',
    standards: ['ncert-sec:MA.C9.MODEL', 'ncert-sec:MA.C10.MODEL'],
  },
  {
    _slug: 'areas-same-base-parallels', type: 'CONCEPTUAL', subject: 'Mathematics', domain: 'Geometry',
    name: 'Areas on the Same Base and Between the Same Parallels', ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that figures sharing a base and lying between the same two parallel lines have equal area, so area can be reasoned about without measuring either shape.',
    evidence: EV('States that parallelograms on the same base between the same parallels are equal in area', 'Deduces that a triangle has half the area of such a parallelogram', 'Uses the result to compare two areas without computing either'),
    assessmentPrompt: 'Show {{name}} two very differently shaped parallelograms on one base between two parallel lines and ask which has the greater area.',
    standards: ['ncert-sec:MA.C9.GEO.AREA'],
  },
  {
    _slug: 'arithmetic-progressions', type: 'PROCEDURAL', subject: 'Mathematics', domain: 'Algebra',
    name: 'Arithmetic Progressions', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Recognise a sequence that grows by a constant difference, find any term of it directly, and add up the first several terms without listing them all.',
    evidence: EV('Identifies the first term and common difference of a progression', 'Finds a distant term using the nth-term formula', 'Sums the first n terms using the sum formula'),
    assessmentPrompt: 'Ask {{name}} for the fiftieth term of 7, 11, 15, 19, … and then for the total of the first fifty terms.',
    standards: ['ncert-sec:MA.C10.ALG.AP'],
  },
  {
    _slug: 'distance-formula', type: 'PROCEDURAL', subject: 'Mathematics', domain: 'Geometry',
    name: 'The Distance Formula', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Find the straight-line distance between two points from their coordinates, recognising the formula as Pythagoras applied to the horizontal and vertical gaps.',
    evidence: EV('Computes the distance between two points from coordinates', 'Explains the formula as Pythagoras on a right triangle', 'Uses distances to test whether three points form a particular triangle'),
    assessmentPrompt: 'Ask {{name}} how far apart the points (1, 2) and (4, 6) are, and why the method is really Pythagoras.',
    standards: ['ncert-sec:MA.C10.CG'],
  },
  {
    _slug: 'section-formula', type: 'PROCEDURAL', subject: 'Mathematics', domain: 'Geometry',
    name: 'The Section Formula', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Find the coordinates of the point dividing a line segment in a given ratio, and recognise the midpoint as the special case where that ratio is one to one.',
    evidence: EV('Finds the point dividing a segment in a stated internal ratio', 'Derives the midpoint as the equal-ratio case', 'Finds the area of a triangle from the coordinates of its vertices'),
    assessmentPrompt: 'Ask {{name}} to find the point one third of the way from (0, 0) to (6, 9), and then the midpoint.',
    standards: ['ncert-sec:MA.C10.CG'],
  },
  {
    _slug: 'similar-triangles-proportionality', type: 'CONCEPTUAL', subject: 'Mathematics', domain: 'Geometry',
    name: 'Similar Triangles and Proportionality', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Understand that similar triangles have equal angles and proportional sides, that a line parallel to one side divides the other two in the same ratio, and that areas scale as the square.',
    evidence: EV('Tests two triangles for similarity using AAA, SSS or SAS', 'Applies the basic proportionality theorem to find an unknown length', 'Explains why the areas of similar triangles are in the ratio of squared sides'),
    assessmentPrompt: 'Show {{name}} a triangle with a line drawn parallel to one side and ask what that line does to the other two sides.',
    standards: ['ncert-sec:MA.C10.GEO.SIM'],
  },
  {
    _slug: 'heights-and-distances', type: 'PROCEDURAL', subject: 'Mathematics', domain: 'Trigonometry',
    name: 'Heights and Distances', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Use angles of elevation and depression with trigonometric ratios to find heights and distances that cannot be measured directly, such as the height of a tower.',
    evidence: EV('Draws a labelled right triangle from a described situation', 'Chooses the correct ratio for the sides involved', 'Finds an unmeasurable height from an angle of elevation and a known distance'),
    assessmentPrompt: 'Ask {{name}} how they could find the height of a tall building using only a protractor and a tape measure.',
    standards: ['ncert-sec:MA.C10.TRIG.HD'],
  },
  {
    _slug: 'frustum-of-a-cone', type: 'PROCEDURAL', subject: 'Mathematics', domain: 'Measurement',
    name: 'Frustum of a Cone', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Find the surface area and volume of a frustum, the shape left when the top of a cone is sliced off parallel to its base, as in a bucket or a lampshade.',
    evidence: EV('Identifies a frustum and its two radii and slant height', 'Computes the volume of a frustum', 'Solves a problem combining a frustum with another solid'),
    assessmentPrompt: 'Show {{name}} a bucket that is wider at the top than the bottom and ask how they would work out how much it holds.',
    standards: ['ncert-sec:MA.C10.MEN.SOLID'],
  },
  {
    _slug: 'cumulative-frequency-ogive', type: 'REPRESENTATIONAL', subject: 'Mathematics', domain: 'Data & Statistics',
    name: 'Cumulative Frequency and the Ogive', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Build a running total of frequencies across grouped data and plot it as a curve, then read the median and other positions directly off that curve.',
    evidence: EV('Builds a cumulative frequency column from a grouped table', 'Plots a cumulative frequency curve with correct axes', 'Reads the median from the curve and explains why it works'),
    assessmentPrompt: 'Give {{name}} a grouped frequency table and ask them to find the median without listing every value.',
    standards: ['ncert-sec:MA.C10.STAT'],
  },
];

const newEdges = [
  { t: 'remainder-factor-theorems', p: 'polynomials-degree-zeros', strength: 'hard', reason: 'The theorems are stated in terms of the zeros and degree of a polynomial.' },
  { t: 'polynomials-degree-zeros', p: 'mt_uESbzWCZIq', strength: 'soft', reason: 'Factorising expressions is the algebraic manipulation polynomials build on.' },
  { t: 'arithmetic-progressions', p: 'mt_HRKzwEQJgO', strength: 'soft', reason: 'Nth-term rules for sequences generalise into arithmetic progressions.' },
  { t: 'distance-formula', p: 'mt_1VmTUxBrNd', strength: 'hard', reason: 'The distance formula is Pythagoras applied to coordinate differences.' },
  { t: 'section-formula', p: 'distance-formula', strength: 'soft', reason: 'Both work on segments described by coordinates.' },
  { t: 'heights-and-distances', p: 'mt_M2nFDa7tax', strength: 'hard', reason: 'Heights and distances apply the trigonometric ratios to real situations.' },
  { t: 'similar-triangles-proportionality', p: 'mt_1badik7iKJ', strength: 'soft', reason: 'Scale factors for similar shapes precede formal similarity criteria.' },
  { t: 'frustum-of-a-cone', p: 'mt_0MbPqx8PCp', strength: 'hard', reason: 'A frustum is measured by combining the standard solid formulae.' },
  { t: 'herons-formula', p: 'mt_svFa6_mjO_', strength: 'soft', reason: 'Area work on standard plane figures precedes Heron’s formula.' },
  { t: 'areas-same-base-parallels', p: 'mt_ML5t7n2-U8', strength: 'hard', reason: 'The equal-area theorem builds on computing areas of triangles and parallelograms.' },
  { t: 'herons-formula', p: 'areas-same-base-parallels', strength: 'soft', reason: 'Both extend how the area of a triangle can be found.' },
  { t: 'cumulative-frequency-ogive', p: 'mt_dbsLUDDBRW', strength: 'hard', reason: 'The ogive is a way of locating the median in grouped data.' },
  { t: 'mathematical-modelling', p: 'proof-conjecture-counterexample', strength: 'soft', reason: 'Both concern how mathematical claims are justified and tested.' },
  { t: 'euclid-axioms-postulates', p: 'mt_J03RFlVdas', strength: 'soft', reason: 'Angle results in triangles are among the first theorems proved from postulates.' },
];

const newClusters = [
  { subject: 'Mathematics', domain: 'Mathematical Thinking', ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'At this stage mathematics stops being only about getting answers and starts being about justifying them. Learners meet the idea that geometry is built from a handful of assumed statements, that testing many cases is not the same as proving a rule, and that a single counterexample is enough to bring a claim down. Alongside this they learn to model real situations mathematically — making assumptions, solving, and then asking whether the answer makes sense back in the real world.' },
];

integrateNcertSec({ subjectDoc: 'Mathematics (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
