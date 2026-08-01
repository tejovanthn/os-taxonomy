#!/usr/bin/env node
/**
 * build/icse-mathematics.mjs — ICSE Mathematics (51), Classes IX–X (ages 14–16).
 *
 * Mathematics already has a dense 14–16 ladder (from ncert-sec / nios-sec), so
 * this is align-heavy: the geometry, trigonometry, mensuration, statistics and
 * core-algebra units map onto topics that already exist. The mints are the
 * content ICSE carries that the taxonomy lacked at this level — the commercial
 * mathematics strand (compound interest, GST, banking, shares), logarithms and
 * indices, 2×2 matrices, loci, the equation of a line, reflection, and the
 * proof-based geometry theorems (Pythagoras, mid-point, parallelogram, chord
 * properties). Descriptions are Marble-authored factual scope summaries — no
 * CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const mt = topic('Mathematics');
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('MAT9.1', 'IX', 'Pure Arithmetic', 'Rational and irrational numbers as the real number system; surds and rationalisation of the denominator; representation on the number line; proofs of the irrationality of √2, √3, √5.'),
  s('MAT9.2', 'IX', 'Commercial Mathematics — Compound Interest', 'Compound interest as repeated simple interest on a growing principal; the amount formula; half-yearly compounding; rate of growth and depreciation.'),
  s('MAT9.3', 'IX', 'Algebra — Expansions and Factorisation', 'Standard algebraic identities for squares and cubes; factorisation of the difference and sum of cubes and of quadratics by splitting the middle term.'),
  s('MAT9.4', 'IX', 'Algebra — Simultaneous Linear Equations', 'Solving a pair of linear equations in two variables by elimination, substitution and cross-multiplication; framing equations from word problems.'),
  s('MAT9.5', 'IX', 'Algebra — Indices and Logarithms', 'Laws of exponents with positive, negative, fractional and zero indices; the logarithm as the inverse of exponentiation; the laws of logarithms and their use in expansion.'),
  s('MAT9.6', 'IX', 'Geometry — Triangles', 'Congruence of triangles (SSS, SAS, AAS, RHS) and inequalities in a triangle; the mid-point theorem and its converse; Pythagoras theorem and its converse.'),
  s('MAT9.7', 'IX', 'Geometry — Rectilinear Figures', 'Theorems on the parallelogram and its special cases; construction of quadrilaterals and a regular hexagon; area theorems on parallelograms and triangles between the same parallels.'),
  s('MAT9.8', 'IX', 'Geometry — Circle', 'Chord properties of a circle — the perpendicular from the centre bisects a chord, equal chords are equidistant from the centre, and one circle through three non-collinear points.'),
  s('MAT9.9', 'IX', 'Statistics', 'Raw, arrayed and grouped data; tabulation and class intervals; mean and median of ungrouped data; the frequency polygon.'),
  s('MAT9.10', 'IX', 'Mensuration', 'Area and perimeter of triangles (including Heron’s formula) and quadrilaterals; area and circumference of a circle; surface area and volume of a cube and cuboid.'),
  s('MAT9.11', 'IX', 'Trigonometry', 'Trigonometric ratios of an angle and their reciprocals; ratios of the standard angles; ratios of complementary angles and their use.'),
  s('MAT9.12', 'IX', 'Coordinate Geometry', 'The Cartesian plane and plotting of points; graphical solution of simultaneous linear equations; the distance between two points by the distance formula.'),
  // ---- Class X ----
  s('MAT10.1', 'X', 'Commercial Mathematics — GST', 'Computation of Goods and Services Tax, including CGST and SGST, on transactions involving list price, discount, profit and loss, and the inverse cases.'),
  s('MAT10.2', 'X', 'Commercial Mathematics — Banking', 'Recurring deposit accounts; computation of the interest and maturity value using the standard formulae.'),
  s('MAT10.3', 'X', 'Commercial Mathematics — Shares and Dividends', 'Nominal and market value, dividend and rate of dividend, premium; computing income and rate of return on an investment in shares.'),
  s('MAT10.4', 'X', 'Algebra — Linear Inequations', 'Linear inequations in one unknown over N, W, Z and R; solving algebraically, writing the solution in set notation and representing it on the number line.'),
  s('MAT10.5', 'X', 'Algebra — Quadratic Equations', 'The nature of the roots of a quadratic from the discriminant; solving quadratic equations by factorisation and by formula; problems reducing to quadratics.'),
  s('MAT10.6', 'X', 'Algebra — Ratio and Proportion', 'Continued and mean proportion; the componendo, dividendo, alternendo and invertendo properties and their combinations.'),
  s('MAT10.7', 'X', 'Algebra — Factorisation', 'The remainder theorem and the factor theorem; factorising a polynomial of degree up to three after finding one factor.'),
  s('MAT10.8', 'X', 'Algebra — Matrices', 'Order of a matrix; row, column, null and identity matrices; addition, subtraction and multiplication of 2×2 matrices and by a scalar.'),
  s('MAT10.9', 'X', 'Algebra — Arithmetic and Geometric Progression', 'The general term and the sum of the first n terms of an arithmetic and a geometric progression, with simple applications.'),
  s('MAT10.10', 'X', 'Algebra — Coordinate Geometry', 'Reflection of a point in the axes and the origin and invariant points; the section and mid-point formulae; slope and the equation of a line in its various forms; conditions for parallel and perpendicular lines.'),
  s('MAT10.11', 'X', 'Geometry — Similarity', 'Similar triangles and the conditions for similarity; the basic proportionality theorem; areas of similar triangles proportional to the squares of corresponding sides; applications to maps and models.'),
  s('MAT10.12', 'X', 'Geometry — Loci', 'The locus of a point as a path satisfying a condition; the loci equidistant from a point, from two points and from two intersecting lines; constructions based on loci.'),
  s('MAT10.13', 'X', 'Geometry — Circles', 'Angle properties (angle at the centre, angles in the same segment, angle in a semicircle); cyclic-quadrilateral properties; tangent and secant properties; construction of tangents and of the circumscribed and inscribed circle.'),
  s('MAT10.14', 'X', 'Mensuration', 'Surface area and volume of the right circular cylinder, cone and sphere, including combinations of solids and melting-and-recasting problems.'),
  s('MAT10.15', 'X', 'Trigonometry', 'The trigonometric identities relating the ratios; solving 2-D problems on heights and distances using angles of elevation and depression.'),
  s('MAT10.16', 'X', 'Statistics', 'Mean, median and mode of grouped data; the histogram and the cumulative-frequency (ogive) curve; quartiles and the inter-quartile range.'),
  s('MAT10.17', 'X', 'Probability', 'Random experiments, sample space and events; the definition of probability; simple problems on the probability of a single event.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  mt('icse-surds-rationalisation', 'Surds and Rationalising the Denominator', 'Number Representation & Place Value', IX, 'PROCEDURAL',
    'Understand a surd as an irrational root that cannot be simplified to a whole number, and rationalise a denominator by multiplying through by a chosen surd so no root remains below the line.',
    EV('Simplifies a surd to its lowest form', 'Rationalises a denominator containing a single or binomial surd', 'Proves that a number such as √2 is irrational'),
    'Ask {{name}} why √2 can never be written exactly as a fraction, however long they try.',
    ['MAT9.1']),
  mt('icse-compound-interest', 'Compound Interest', 'Commercial Mathematics', IX, 'PROCEDURAL',
    'Understand compound interest as interest charged on a principal that grows each period, so that interest itself earns interest, and compute the amount by the standard formula.',
    EV('Computes compound interest as repeated simple interest on a growing principal', 'Uses the amount formula including half-yearly compounding', 'Applies the same idea to rates of growth and depreciation'),
    'Ask {{name}} why money left in a savings account grows faster and faster the longer it stays.',
    ['MAT9.2']),
  mt('icse-identities-factorisation', 'Algebraic Identities and Factorisation', 'Algebra', IX, 'PROCEDURAL',
    'Understand the standard identities for squares and cubes as shortcuts that run both ways — expanding a product or factorising an expression back into its factors.',
    EV('Expands an expression using a square or cube identity', 'Factorises the difference or sum of two cubes', 'Factorises a quadratic by splitting the middle term'),
    'Ask {{name}} how knowing (a+b)² by heart saves multiplying it out every time.',
    ['MAT9.3']),
  mt('icse-indices-laws', 'The Laws of Indices', 'Algebra', IX, 'PROCEDURAL',
    'Understand that the laws of indices extend to negative, fractional and zero powers, so that a fractional index means a root and a negative index means a reciprocal.',
    EV('Applies the product, quotient and power laws of indices', 'Interprets a negative index as a reciprocal and a zero index as one', 'Interprets a fractional index as a root'),
    'Ask {{name}} what a power of one-half could possibly mean, and why it turns out to be a square root.',
    ['MAT9.5']),
  mt('icse-logarithms', 'Logarithms', 'Algebra', IX, 'CONCEPTUAL',
    'Understand a logarithm as the inverse of raising to a power — the exponent a base must be raised to — so that the laws of logarithms turn multiplication into addition.',
    EV('Converts between exponential and logarithmic form', 'Applies the product, quotient and power laws of logarithms', 'Expands a logarithmic expression using the laws'),
    'Ask {{name}} how turning multiplication into addition once made long calculations possible before calculators.',
    ['MAT9.5']),
  mt('icse-pythagoras-theorem', 'Pythagoras’ Theorem', 'Geometry', IX, 'CONCEPTUAL',
    'Understand that in a right-angled triangle the square on the hypotenuse equals the sum of the squares on the other two sides, and that the converse identifies right-angled triangles.',
    EV('States and applies Pythagoras’ theorem to find a missing side', 'Uses the converse to test whether a triangle is right-angled', 'Solves a problem set in a real context using the theorem'),
    'Ask {{name}} how a builder can check a corner is a true right angle using only a tape measure.',
    ['MAT9.6']),
  mt('icse-midpoint-theorem', 'The Mid-Point Theorem', 'Geometry', IX, 'CONCEPTUAL',
    'Understand that the segment joining the mid-points of two sides of a triangle is parallel to the third side and half its length, and that the converse locates a mid-point.',
    EV('States the mid-point theorem and its converse', 'Applies it to find a length or prove a line parallel', 'Uses the equal-intercept theorem in a construction or proof'),
    'Ask {{name}} what is special about the line joining the middles of two sides of any triangle.',
    ['MAT9.6']),
  mt('icse-parallelogram-theorems', 'Theorems on the Parallelogram', 'Geometry', IX, 'CONCEPTUAL',
    'Understand the defining properties of a parallelogram — opposite sides and angles equal, diagonals bisecting each other — and how the rhombus, rectangle and square specialise them.',
    EV('Proves or applies a property of the parallelogram', 'Distinguishes rhombus, rectangle and square by their diagonal properties', 'Constructs a quadrilateral to given measurements'),
    'Ask {{name}} what extra property the diagonals of a rhombus have that an ordinary parallelogram’s do not.',
    ['MAT9.7']),
  mt('icse-circle-chord-properties', 'Chord Properties of a Circle', 'Geometry', IX, 'CONCEPTUAL',
    'Understand how chords relate to the centre of a circle — the perpendicular from the centre bisects a chord, equal chords lie equidistant from the centre, and three points fix a unique circle.',
    EV('Applies the perpendicular-from-centre property to a chord', 'Relates the length of a chord to its distance from the centre', 'Explains why exactly one circle passes through three non-collinear points'),
    'Ask {{name}} how you could find the exact centre of a circular plate using only a ruler and the edge.',
    ['MAT9.8']),
  // ---------------- Class X ----------------
  mt('icse-gst', 'Goods and Services Tax', 'Commercial Mathematics', X, 'PROCEDURAL',
    'Understand GST as a tax added at each sale, split into central and state shares, and compute the price a consumer finally pays after discounts, profit and the tax.',
    EV('Computes GST including its CGST and SGST components', 'Finds the final price after discount, profit and tax', 'Solves the inverse case, recovering a base price from a taxed price'),
    'Ask {{name}} why the price on the shelf is not the price they pay at the till.',
    ['MAT10.1']),
  mt('icse-banking-recurring-deposits', 'Banking: Recurring Deposits', 'Commercial Mathematics', X, 'PROCEDURAL',
    'Understand a recurring deposit as a fixed monthly saving that earns interest for a shrinking number of months, and compute the interest and maturity value from the standard formulae.',
    EV('Computes the interest on a recurring deposit', 'Finds the maturity value of the account', 'Explains why each instalment earns interest for a different length of time'),
    'Ask {{name}} why the first instalment of a year-long deposit earns more interest than the last.',
    ['MAT10.2']),
  mt('icse-shares-dividends', 'Shares and Dividends', 'Commercial Mathematics', X, 'PROCEDURAL',
    'Understand a share as a unit of ownership with a nominal and a market value, a dividend as the profit paid on it, and compute the income and the rate of return on an investment.',
    EV('Distinguishes nominal value from market value', 'Computes the dividend income from a shareholding', 'Computes the rate of return on the amount invested'),
    'Ask {{name}} how two people who paid different prices for the same share can get the same dividend.',
    ['MAT10.3']),
  mt('icse-linear-inequations', 'Linear Inequations', 'Algebra', X, 'PROCEDURAL',
    'Understand a linear inequation as a constraint with a range of solutions rather than a single value, and that the solution depends on which number set the variable is drawn from.',
    EV('Solves a linear inequation and writes the solution in set notation', 'Represents the solution on the number line', 'Explains how the solution changes over N, W, Z and R'),
    'Ask {{name}} why “x is less than 5” has one answer over whole numbers but endlessly many over the reals.',
    ['MAT10.4']),
  mt('icse-proportion-properties', 'Properties of Proportion', 'Ratio & Proportion', X, 'PROCEDURAL',
    'Understand continued and mean proportion, and the componendo, dividendo, alternendo and invertendo rules as manipulations that keep a proportion true while simplifying a problem.',
    EV('Finds a mean or third proportional', 'Applies componendo and dividendo to a proportion', 'Chooses the property that simplifies a given problem'),
    'Ask {{name}} what stays equal when you add the same operation to the top and bottom of both sides of a ratio.',
    ['MAT10.6']),
  mt('icse-matrices-2x2', 'Matrices and Matrix Operations (2×2)', 'Algebra', X, 'PROCEDURAL',
    'Understand a matrix as a rectangular array on which addition and multiplication obey their own rules, so that order matters and multiplication is only defined when shapes are compatible.',
    EV('Identifies the order and type of a matrix', 'Adds and subtracts compatible 2×2 matrices', 'Multiplies a 2×2 matrix by a scalar and by another matrix'),
    'Ask {{name}} why two matrices can sometimes be multiplied one way round but not the other.',
    ['MAT10.8']),
  mt('icse-geometric-progression', 'Geometric Progression', 'Algebra', X, 'PROCEDURAL',
    'Understand a geometric progression as a sequence with a constant ratio between terms, and derive its general term and the sum of its first n terms.',
    EV('Finds the general term of a geometric progression', 'Computes the sum of the first n terms', 'Contrasts a geometric with an arithmetic progression'),
    'Ask {{name}} how a sum of grains that doubles on each square of a chessboard grows so impossibly large.',
    ['MAT10.9']),
  mt('icse-equation-of-a-line', 'The Equation of a Straight Line', 'Geometry', X, 'CONCEPTUAL',
    'Understand slope as the steepness of a line — the tangent of the angle it makes with the x-axis — and how slope and an intercept or a point fix the line’s equation.',
    EV('Interprets the slope and intercept of a line geometrically', 'Writes the equation of a line from a slope and a point or two points', 'Uses the slope conditions for parallel and perpendicular lines'),
    'Ask {{name}} what two facts you need before you can pin down exactly one straight line.',
    ['MAT10.10']),
  mt('icse-reflection-coordinate-plane', 'Reflection in the Coordinate Plane', 'Geometry', X, 'REPRESENTATIONAL',
    'Understand reflection as a transformation that flips a point across a line or the origin, and that points lying on the mirror are invariant.',
    EV('Reflects a point in the axes and in the origin', 'Identifies invariant points of a reflection', 'Finds the image of a figure under a reflection'),
    'Ask {{name}} which points of a shape do not move at all when it is reflected in a line.',
    ['MAT10.10']),
  mt('icse-loci', 'Loci', 'Geometry', X, 'CONCEPTUAL',
    'Understand a locus as the set of all points satisfying a condition, and recognise the circle, the angle bisector and the perpendicular bisector as the loci of familiar conditions.',
    EV('Describes the locus of a point at a fixed distance from a point', 'Identifies the locus equidistant from two points or two lines', 'Constructs a locus to solve a geometric problem'),
    'Ask {{name}} what path a goat tied to a post can graze, and what names that shape.',
    ['MAT10.12']),
  mt('icse-trig-identities', 'Trigonometric Identities', 'Trigonometry', X, 'PROCEDURAL',
    'Understand the identities linking the trigonometric ratios — that sin²A + cos²A = 1 and its companions — as relations true for every angle, and use them to simplify and prove expressions.',
    EV('States the three Pythagorean trigonometric identities', 'Simplifies a trigonometric expression using an identity', 'Proves a simple trigonometric identity'),
    'Ask {{name}} why sin²A + cos²A always comes to exactly one, whatever the angle.',
    ['MAT10.15']),
  mt('icse-probability-single-events', 'Probability of a Single Event', 'Probability', X, 'CONCEPTUAL',
    'Understand theoretical probability as the ratio of favourable outcomes to the total in an equally likely sample space, and compute it for a single event.',
    EV('Lists the sample space of a simple random experiment', 'Computes the probability of a single event', 'Explains why probabilities lie between zero and one'),
    'Ask {{name}} how likely a single throw of a die is to land on a number greater than four, and why.',
    ['MAT10.17']),
];

// Align ICSE units onto the existing 14–16 Mathematics ladder (align-first).
const alignments = {
  mt_sORtAFxvlB: ['MAT9.1'],   // Rational and Irrational Numbers
  mt_mqgu72aCMz: ['MAT9.4'],   // Simultaneous Equations
  mt_KhS7K1Mgrw: ['MAT9.3'],   // Expanding Double Brackets
  mt_C1EJxERW34: ['MAT9.6'],   // Congruence of Triangles
  mt_JjcduqBDXg: ['MAT9.7'],   // Areas on the Same Base and Between the Same Parallels
  mt_AFH9ZAZxKC: ['MAT9.7', 'MAT10.13'], // Geometric Constructions
  mt_dbsLUDDBRW: ['MAT9.9', 'MAT10.16'], // Median and Mode
  mt_p81CubtbEo: ['MAT9.10'],  // Heron's Formula
  mt_svFa6_mjO_: ['MAT9.10'],  // Circles: Circumference & Area
  mt_0MbPqx8PCp: ['MAT9.10', 'MAT10.14'], // Surface Area and Volume of Solids
  mt_M2nFDa7tax: ['MAT9.11'],  // Introduction to Trigonometry
  mt_RiJ6OdRsmw: ['MAT9.11'],  // Trigonometric Ratios
  mt_KcWEqUJyOK: ['MAT9.12'],  // The Distance Formula
  mt_cyTv9Ajw49: ['MAT10.5'],  // Solving Quadratic Equations
  mt_8v9Csv9GEq: ['MAT10.7'],  // The Remainder and Factor Theorems
  mt_zImUoeskII: ['MAT10.9'],  // Arithmetic Progressions
  mt_ZLeDlsxbyZ: ['MAT10.10'], // The Section Formula
  mt_VR6AXSjoMQ: ['MAT10.11'], // Similar Triangles and Proportionality
  mt_GglXLxaYgQ: ['MAT10.13'], // Angles in a Circle
  mt_t3ANLmY5le: ['MAT10.13'], // Tangents to a Circle
  mt_l9QXa5DYit: ['MAT10.16'], // Cumulative Frequency and the Ogive
  mt_JpMHcAdfDF: ['MAT10.15'], // Heights and Distances
};

const newEdges = [
  // New ICSE topics anchored to the existing ladder.
  { t: 'icse-surds-rationalisation', p: 'mt_sORtAFxvlB', strength: 'hard', reason: 'Surds are the irrational numbers just met.' },
  { t: 'icse-compound-interest', p: 'mt_iEXqN48w3x', strength: 'hard', reason: 'Compound interest is repeated percentage growth.' },
  { t: 'icse-identities-factorisation', p: 'mt_KhS7K1Mgrw', strength: 'hard', reason: 'Identities generalise expanding double brackets.' },
  { t: 'icse-indices-laws', p: 'mt_hCVPYlF-7Y', strength: 'hard', reason: 'The laws of indices extend square and cube numbers.' },
  { t: 'icse-logarithms', p: 'icse-indices-laws', strength: 'hard', reason: 'A logarithm is the inverse of an index.' },
  { t: 'icse-pythagoras-theorem', p: 'mt_C1EJxERW34', strength: 'soft', reason: 'The proof rests on triangle congruence.' },
  { t: 'icse-midpoint-theorem', p: 'mt_H_pNJ3ZI_S', strength: 'soft', reason: 'The mid-point theorem is about parallel lines within a triangle.' },
  { t: 'icse-midpoint-theorem', p: 'mt_C1EJxERW34', strength: 'soft', reason: 'The proof uses congruent triangles.' },
  { t: 'icse-parallelogram-theorems', p: 'mt_C1EJxERW34', strength: 'hard', reason: 'The parallelogram theorems are proved by congruence.' },
  { t: 'icse-parallelogram-theorems', p: 'icse-midpoint-theorem', strength: 'soft', reason: 'Rectilinear-figure work follows the mid-point theorem.' },
  { t: 'icse-circle-chord-properties', p: 'mt_svFa6_mjO_', strength: 'hard', reason: 'Chord properties build on the basic circle.' },
  { t: 'icse-gst', p: 'mt_iEXqN48w3x', strength: 'hard', reason: 'GST is a percentage added to a price.' },
  { t: 'icse-banking-recurring-deposits', p: 'icse-compound-interest', strength: 'hard', reason: 'Deposit interest builds on the interest idea.' },
  { t: 'icse-shares-dividends', p: 'mt_iEXqN48w3x', strength: 'hard', reason: 'Dividend and return are percentage computations.' },
  { t: 'icse-linear-inequations', p: 'mt_QhFEDyIwSO', strength: 'hard', reason: 'Inequations extend the solving of linear equations.' },
  { t: 'icse-proportion-properties', p: 'mt_yK51ZnKA8m', strength: 'hard', reason: 'Proportion properties build on ratio notation.' },
  { t: 'icse-geometric-progression', p: 'mt_zImUoeskII', strength: 'hard', reason: 'The GP mirrors the arithmetic progression met alongside it.' },
  { t: 'icse-equation-of-a-line', p: 'mt_WBdHkc2HTf', strength: 'hard', reason: 'The equation of a line builds on linear function graphs.' },
  { t: 'icse-reflection-coordinate-plane', p: 'mt_K0Y15w48SY', strength: 'hard', reason: 'Reflection is a coordinate transformation.' },
  { t: 'icse-loci', p: 'mt_AFH9ZAZxKC', strength: 'soft', reason: 'Loci are drawn using geometric constructions.' },
  { t: 'icse-loci', p: 'icse-circle-chord-properties', strength: 'soft', reason: 'The circle is the first locus met.' },
  { t: 'icse-trig-identities', p: 'mt_RiJ6OdRsmw', strength: 'hard', reason: 'Identities relate the trigonometric ratios.' },
  { t: 'icse-probability-single-events', p: 'mt_vmQJAtAFuy', strength: 'hard', reason: 'Single-event probability builds on the probability scale.' },
  { t: 'icse-probability-single-events', p: 'mt_sHJqh6UUya', strength: 'soft', reason: 'Theoretical probability follows the experimental idea.' },
  // Reverse anchors: existing senior topics build on these new ICSE topics.
  { t: 'mt_KcWEqUJyOK', p: 'icse-pythagoras-theorem', strength: 'hard', reason: 'The distance formula is Pythagoras’ theorem in coordinates.' },
  { t: 'mt_yCrineYUH8', p: 'icse-matrices-2x2', strength: 'hard', reason: 'Senior matrix work builds on the 2×2 introduction.' },
  // Intra-ICSE sequence.
  { t: 'icse-shares-dividends', p: 'icse-compound-interest', strength: 'soft', reason: 'Both belong to the commercial-mathematics strand of returns on money.' },
];

const newClusters = [
  { subject: 'Mathematics', domain: 'Commercial Mathematics', ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'Commercial mathematics is where the arithmetic of school meets the arithmetic of money. In Class IX it is compound interest — the idea that interest left in an account itself earns interest, so a balance grows faster the longer it sits. The same formula, read differently, describes how a machine or a car loses value year on year. It rests entirely on percentages, applied over and over to a changing amount.' },
  { subject: 'Mathematics', domain: 'Commercial Mathematics', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X commercial mathematics is a set of real financial calculations: the Goods and Services Tax a shopper pays split into central and state shares, the interest a recurring bank deposit earns when each instalment is invested for a different length of time, and the income and return on money put into shares. Each is a percentage calculation dressed in the vocabulary of everyday finance, and each has an inverse case — working back from the taxed price or the maturity value to the figure you started with.' },
];

integrate({ subjectDoc: 'Mathematics (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
