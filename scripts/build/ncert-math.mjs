#!/usr/bin/env node
/**
 * build/ncert-math.mjs — NCERT Mathematics syllabi, Classes I–V and VI–VIII,
 * at class×strand grain. Pure alignment: NCERT elementary mathematics maps
 * fully onto the existing Maths ladder (a strong cross-curriculum validation)
 * — no new topics needed. Descriptions are Marble-authored factual scope
 * summaries (no NCERT text — see PROVENANCE). Idempotent.
 */

import { integrateNcert, mintNs } from './ncert.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

const standards = [
  // Classes I–V: strands Numbers, Geometry, Measurement, Money, Data Handling, Patterns
  s('M.C1.NUM', 'I', 'Numbers', 'Counting and reading and writing small numbers; addition and subtraction within 20.'),
  s('M.C1.GEO', 'I', 'Geometry', 'Spatial vocabulary; observing and sorting solids and shapes from the surroundings.'),
  s('M.C1.MEA', 'I', 'Measurement', 'Comparing lengths, weights and capacities directly; sequencing events in time.'),
  s('M.C1.MON', 'I', 'Money', 'Identifying common coins and notes.'),
  s('M.C1.DH', 'I', 'Data Handling', 'Collecting and sorting objects; simple picture records.'),
  s('M.C1.PAT', 'I', 'Patterns', 'Copying, extending and creating simple patterns of shapes and numbers.'),
  s('M.C2.NUM', 'II', 'Numbers', 'Numbers to 99 with place value; addition and subtraction with two-digit numbers; introduction to multiplication as repeated addition.'),
  s('M.C2.GEO', 'II', 'Geometry', 'Naming and tracing 2-D shapes from solids; straight and curved lines.'),
  s('M.C2.MEA', 'II', 'Measurement', 'Measuring with non-standard units; days, weeks and months; sequencing daily events.'),
  s('M.C2.MON', 'II', 'Money', 'Adding and subtracting small amounts; simple purchases.'),
  s('M.C2.DH', 'II', 'Data Handling', 'Collecting and presenting data as pictures and tables.'),
  s('M.C2.PAT', 'II', 'Patterns', 'Growing patterns in shapes and numbers.'),
  s('M.C3.NUM', 'III', 'Numbers', 'Numbers to 999 with place value; column addition and subtraction; multiplication tables and simple division.'),
  s('M.C3.GEO', 'III', 'Geometry', 'Properties of 2-D shapes and 3-D solids; tiling; maps and routes.'),
  s('M.C3.MEA', 'III', 'Measurement', 'Standard units for length, weight and capacity; reading a calendar and clock.'),
  s('M.C3.MON', 'III', 'Money', 'Adding and subtracting money; making rate charts and simple bills.'),
  s('M.C3.DH', 'III', 'Data Handling', 'Recording and presenting data in pictographs.'),
  s('M.C3.PAT', 'III', 'Patterns', 'Identifying pattern rules in shapes and numbers.'),
  s('M.C4.NUM', 'IV', 'Numbers', 'Larger numbers; written multiplication and division; introduction to fractions of a whole.'),
  s('M.C4.GEO', 'IV', 'Geometry', 'Circles and their parts; reflection and symmetry; perspectives of solids.'),
  s('M.C4.MEA', 'IV', 'Measurement', 'Converting units; perimeter; time to the minute and am/pm.'),
  s('M.C4.MON', 'IV', 'Money', 'Money in decimal notation; giving change; unit cost.'),
  s('M.C4.DH', 'IV', 'Data Handling', 'Bar charts drawn and read.'),
  s('M.C4.PAT', 'IV', 'Patterns', 'Patterns in multiplication and skip counting; symmetry patterns.'),
  s('M.C5.NUM', 'V', 'Numbers', 'Large numbers; the four operations fluently; fractions and their equivalence; introduction to decimals.'),
  s('M.C5.GEO', 'V', 'Geometry', 'Angles and their measure; nets of solids; views and maps.'),
  s('M.C5.MEA', 'V', 'Measurement', 'Unit conversion; area and boundary of regions; volume by counting units.'),
  s('M.C5.MON', 'V', 'Money', 'Estimating and comparing amounts; unitary reasoning with money.'),
  s('M.C5.DH', 'V', 'Data Handling', 'Reading and comparing bar graphs and tables to draw conclusions.'),
  s('M.C5.PAT', 'V', 'Patterns', 'Pattern rules stated and extended; relationships between numbers.'),
  // Classes VI–VIII: strands Number System, Algebra, Ratio & Proportion, Geometry, Mensuration, Data Handling
  s('M.C6.NS', 'VI', 'Number System', 'Large numbers and estimation; factors, multiples and primes; integers introduced; fractions and decimals consolidated.'),
  s('M.C6.ALG', 'VI', 'Algebra', 'Variables introduced; forming simple expressions and equations.'),
  s('M.C6.RP', 'VI', 'Ratio & Proportion', 'Ratio as comparison; unitary method.'),
  s('M.C6.GEO', 'VI', 'Geometry', 'Lines, angles and their kinds; basic shapes and their properties; symmetry; first constructions.'),
  s('M.C6.MEN', 'VI', 'Mensuration', 'Perimeter and area of rectilinear figures.'),
  s('M.C6.DH', 'VI', 'Data Handling', 'Collecting and organising data; pictographs and bar graphs; the mean introduced.'),
  s('M.C7.NS', 'VII', 'Number System', 'Integers with all operations; fractions and decimals with all operations; rational numbers introduced.'),
  s('M.C7.ALG', 'VII', 'Algebra', 'Algebraic expressions and their operations; simple linear equations solved.'),
  s('M.C7.RP', 'VII', 'Ratio & Proportion', 'Proportion; percentage with applications including simple interest; profit and loss.'),
  s('M.C7.GEO', 'VII', 'Geometry', 'Angle pairs and parallel lines; properties and congruence of triangles; constructions.'),
  s('M.C7.MEN', 'VII', 'Mensuration', 'Area of triangles, parallelograms and circles; circumference.'),
  s('M.C7.DH', 'VII', 'Data Handling', 'Mean, median and mode; bar graphs; chance and probability introduced.'),
  s('M.C8.NS', 'VIII', 'Number System', 'Rational numbers with operations; squares, cubes and their roots; exponents and powers.'),
  s('M.C8.ALG', 'VIII', 'Algebra', 'Algebraic expressions multiplied and factorised; linear equations in one variable solved and applied.'),
  s('M.C8.RP', 'VIII', 'Ratio & Proportion', 'Percentages applied to discount, tax, and simple and compound interest; direct and inverse variation.'),
  s('M.C8.GEO', 'VIII', 'Geometry', 'Properties of quadrilaterals; representing 3-D in 2-D; constructions of quadrilaterals.'),
  s('M.C8.MEN', 'VIII', 'Mensuration', 'Area of trapezium and polygon; surface area and volume of cube, cuboid and cylinder.'),
  s('M.C8.DH', 'VIII', 'Data Handling', 'Grouped data; histograms and pie charts; probability of events.'),
];

const NS = (s2) => mintNs('nios-sec', s2);
const OB = (s2) => mintNs('nios-obe', s2);

const alignments = Object.fromEntries([
  // Class I
  ['mt_WcfaSfVT33', ['M.C1.NUM']], ['mt_yqAL6O5i_v', ['M.C1.NUM']], ['mt_fR0UtsSREU', ['M.C1.NUM']], ['mt_mr_Vk7FGzK', ['M.C1.NUM']],
  ['mt_qeZYF6HZ4o', ['M.C1.GEO']], ['mt_KJeEeTutJI', ['M.C1.GEO']], ['mt_Qcp2d_kuta', ['M.C1.GEO']],
  ['mt_uhuxX8sg9f', ['M.C1.MEA']], ['mt_zkFbMLpu3U', ['M.C1.MEA']], ['mt_TcG90kS8nu', ['M.C1.MEA']],
  ['mt_cPZwlUk8Nd', ['M.C1.MON']], ['mt_xppl18avyY', ['M.C1.DH']], ['mt_WXW0hjNhph', ['M.C1.PAT', 'M.C2.PAT']],
  // Class II
  ['mt_x8TshvbbQT', ['M.C2.NUM']], ['mt_M5PPDJStGm', ['M.C2.NUM']], ['mt_PZ909yPrEC', ['M.C2.NUM']],
  ['mt_yGv8doDAmp', ['M.C2.GEO']], ['mt_2VR963szuk', ['M.C2.GEO']],
  ['mt_KaF0SQvaiu', ['M.C2.MEA']], ['mt_zd0YkB3xNj', ['M.C2.MEA']], ['mt_bj1YCgNWUx', ['M.C2.MEA']],
  ['mt_6J1wmCWf41', ['M.C2.MON']], ['mt_c29FaCTNsx', ['M.C2.DH']],
  // Class III
  ['mt_VFsuftfvYM', ['M.C3.NUM']], ['mt_98c2qwEF7Q', ['M.C3.NUM']], ['mt_HhuSDxwDNM', ['M.C3.NUM']], ['mt_ewmuMMPAzP', ['M.C3.NUM']],
  ['mt_fEuoBYw6bU', ['M.C3.GEO']], ['mt_TdV9YGJEoY', ['M.C3.GEO']],
  ['mt_skYly2Qm01', ['M.C3.MEA']], ['mt_DOe893F6gN', ['M.C3.MEA']], ['mt_0XxyaQLRhn', ['M.C3.MEA']],
  ['mt_AF2BeFQwfX', ['M.C3.MON']], ['mt_VhBH8wrFC6', ['M.C3.DH']], ['mt_hbe_kdE_7C', ['M.C3.PAT']],
  // Class IV
  ['mt_lC_Q5mSL_I', ['M.C4.NUM']], ['mt_K5jM7vlVhA', ['M.C4.NUM']], ['mt_DyGBW3ZHh3', ['M.C4.NUM']], ['mt_ndGqFPWyen', ['M.C4.NUM']],
  ['mt_xq3YHZ2zeR', ['M.C4.GEO']], ['mt_hR2Y7NhMSY', ['M.C4.GEO']],
  ['mt_e4x3l2JeLI', ['M.C4.MEA']], ['mt_WfrE_4r-kY', ['M.C4.MEA']], ['mt_wE7-Gs9ENL', ['M.C4.MEA']],
  ['mt_6_O6THdEDK', ['M.C4.MON']], ['mt_ChjMU2GDJa', ['M.C4.DH']], ['mt_IzQvs7k_sE', ['M.C4.PAT']],
  // Class V
  ['mt_Gag_h98jWP', ['M.C5.NUM']], ['mt_p-nbe0w_lf', ['M.C5.NUM']], ['mt_FbDKeLfBCo', ['M.C5.NUM']], ['mt_wB-GBDkoNr', ['M.C5.NUM']],
  ['mt_4MFUAsbx_6', ['M.C5.GEO']], ['mt_vnJEztczji', ['M.C5.GEO']],
  ['mt_d8al9JcajP', ['M.C5.MEA']], ['mt_y1n0Zwhoca', ['M.C5.MEA']], ['mt_NSC3LT_-ch', ['M.C5.MEA']],
  ['mt_mFJ-2ZF6Tk', ['M.C5.MON']], ['mt_H6LlpWgEYS', ['M.C5.DH']], ['mt_fxPtngwUfz', ['M.C5.PAT']],
  // Class VI
  ['mt_9QzSnn8m80', ['M.C6.NS', 'M.C7.NS']], ['mt_FHIAv6dfhU', ['M.C6.NS']], ['mt_gNUE4B3vuk', ['M.C6.NS']],
  ['mt_KwdjWEmMNo', ['M.C6.ALG']], ['mt_i9rJbuFO3p', ['M.C6.ALG']],
  ['mt_XWSGuFW7It', ['M.C6.RP']], ['mt_h0gJcSuwdL', ['M.C6.RP']],
  ['mt_QysgF57dxh', ['M.C6.GEO']], ['mt_e4V6hvcuEJ', ['M.C6.GEO']], ['mt_lxaM6iVpdr', ['M.C6.GEO']],
  ['mt_WtcFrxGOgw', ['M.C6.MEN']], ['mt_6xNmQLzuqm', ['M.C6.MEN']],
  ['mt_bESTSBB0wK', ['M.C6.DH']], ['mt_Cg8VPguS_V', ['M.C6.DH']],
  // Class VII
  ['mt_J339bO7qLe', ['M.C7.NS']], ['mt_lU-2aTRB9f', ['M.C7.NS']],
  ['mt_nNNVrLqPW3', ['M.C7.ALG']], ['mt_QhFEDyIwSO', ['M.C7.ALG', 'M.C8.ALG']],
  ['mt_PNSyfH56eQ', ['M.C7.RP']], ['mt_5mIcmKRCgA', ['M.C7.RP']],
  ['mt_tAJH5BrpOx', ['M.C7.GEO']], [NS('sec-congruent-triangles'), ['M.C7.GEO']],
  ['mt_ML5t7n2-U8', ['M.C7.MEN']], ['mt_svFa6_mjO_', ['M.C7.MEN']],
  ['mt_Zt30Gxi-qp', ['M.C7.DH']], ['mt_sHJqh6UUya', ['M.C7.DH']],
  // Class VIII
  ['mt_hCVPYlF-7Y', ['M.C8.NS']], ['mt_HLUqHJ9Y7n', ['M.C8.NS']],
  [OB('square-cube-roots'), ['M.C8.NS']],
  ['mt_FX4a2Q8XXN', ['M.C8.ALG']], ['mt_uESbzWCZIq', ['M.C8.ALG']],
  ['mt_iEXqN48w3x', ['M.C8.RP']], ['mt_R3arzY0IjZ', ['M.C8.RP']],
  ['mt_DNYQLahbfa', ['M.C8.GEO']], ['mt_wUSbRt3-qw', ['M.C8.GEO']],
  [NS('sec-surface-area-volume'), ['M.C8.MEN']],
  [OB('pie-charts'), ['M.C8.DH']], ['mt_3fwYu7imd4', ['M.C8.DH']],
]);

integrateNcert({ subjectDoc: 'Mathematics (I–V, VI–VIII)', standards, alignments });
