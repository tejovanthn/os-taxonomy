#!/usr/bin/env node
/**
 * build/isc-economics.mjs — ISC Economics, Classes XI–XII (ages 16–18).
 * Pure alignment onto the 16–18 Economics ladder built by ncert-hsec.
 * No new topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI — Statistics for Economics and Indian Economic Development
  s('ECO.C11.U1', 'XI', 'Statistics for Economics', 'The collection, organisation and presentation of data, measures of dispersion, correlation and index numbers.'),
  s('ECO.C11.U2', 'XI', 'The Indian Economy 1947–1990 and Reforms', 'The economy at independence, the goals of the five year plans, planned development, and the economic reforms since 1991.'),
  s('ECO.C11.U3', 'XI', 'Current Challenges of the Indian Economy', 'Poverty, human capital, rural development, employment, infrastructure and sustainable development.'),
  s('ECO.C11.U4', 'XI', 'Development Experience Compared', 'The development experience of India compared with China and Pakistan.'),
  // XII — Microeconomics and Macroeconomics
  s('ECO.C12.U1', 'XII', 'Introduction to Microeconomics', 'The production possibilities frontier and the central problems of an economy.'),
  s('ECO.C12.U2', 'XII', 'Consumer Behaviour and Demand', 'Consumer equilibrium, the demand curve and its shifts, and price elasticity of demand.'),
  s('ECO.C12.U3', 'XII', 'Producer Behaviour and Supply', 'Production and returns to a factor, costs of production, and producer equilibrium and the supply curve.'),
  s('ECO.C12.U4', 'XII', 'Market Equilibrium and Market Forms', 'Market equilibrium and the forms of market from competition to monopoly.'),
  s('ECO.C12.U5', 'XII', 'National Income and Its Determination', 'The circular flow of income, national income and its measurement, income determination and the multiplier, and excess and deficient demand.'),
  s('ECO.C12.U6', 'XII', 'Money, Banking and Government', 'Money and credit creation, the central bank and monetary policy, and the government budget and fiscal policy.'),
  s('ECO.C12.U7', 'XII', 'The External Sector', 'The balance of payments and the determination of the exchange rate.'),
];

const alignments = {
  mt_VJBHmAh9Ui: ['ECO.C11.U1'], mt_SvtQoosaZE: ['ECO.C11.U1'], mt_isxWTWvsV3: ['ECO.C11.U1'], mt_vF1vhXd9Hs: ['ECO.C11.U1'],
  mt_QEMmnG9nXF: ['ECO.C11.U2'], mt_xFO9zvrpSk: ['ECO.C11.U2'], mt_l6XJxwdZ4x: ['ECO.C11.U2'], mt_rqYeEbHAHW: ['ECO.C11.U2'],
  mt_YLAMPDNNGS: ['ECO.C11.U3'], mt_7EPOPctoXG: ['ECO.C11.U3'], mt_WBuULVkIQU: ['ECO.C11.U3'], mt_IODbsyiHSw: ['ECO.C11.U3'], mt_v6ENxH5T7z: ['ECO.C11.U3'], mt_cgOg1EMNke: ['ECO.C11.U3'],
  mt_yvw97VSdiC: ['ECO.C11.U4'],
  mt_hpzJ3hCYuY: ['ECO.C12.U1'],
  mt_OE2VGKifuo: ['ECO.C12.U2'], mt_GhzZl4YKMP: ['ECO.C12.U2'], mt_OZ7cx7ZmHm: ['ECO.C12.U2'],
  mt_9yQTwqweRB: ['ECO.C12.U3'], mt_LCjp24adw4: ['ECO.C12.U3'], mt_CpPEf9QV0N: ['ECO.C12.U3'],
  mt_LZyDLQN9BG: ['ECO.C12.U4'], mt_PNxkRBuPDD: ['ECO.C12.U4'],
  mt_RC9BFabf0N: ['ECO.C12.U5'], mt_RrfCpvr8HO: ['ECO.C12.U5'], mt_Y6NdO8BCnB: ['ECO.C12.U5'], mt_owRz9lkeu4: ['ECO.C12.U5'],
  mt_fROJBHSXYP: ['ECO.C12.U6'], mt_Jh2PVetGCv: ['ECO.C12.U6'], mt_D0HPNFQBEO: ['ECO.C12.U6'],
  mt_H5PHAD5O0f: ['ECO.C12.U7'], mt_WxlMOS1l2r: ['ECO.C12.U7'],
};

integrate({ subjectDoc: 'Economics (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
