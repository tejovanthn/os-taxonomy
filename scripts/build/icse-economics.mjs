#!/usr/bin/env node
/**
 * build/icse-economics.mjs — ICSE Economics (75), Classes IX–X (ages 14–16).
 *
 * Economics has a developed 14–16 ladder (Basic Concepts, Markets, Production,
 * The Indian Economy — from ncert-sec / nios-sec), so this is align-heavy: the
 * introduction, types of economies, scarcity, the sector overview, poverty,
 * demand and supply, market forms, money and banking, and consumer protection
 * all map onto topics that already exist. The mints are what ICSE treats more
 * deeply than the taxonomy did at this level — Indian agriculture and the green
 * revolution, industry, unemployment, the smart-city / Digital India trend,
 * elasticity, monetary policy, public finance, and inflation. Marble-authored
 * factual descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const ec = topic('Economics');
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('ECO9.1', 'IX', 'Introduction to Economics', 'What economics studies through the classic definitions; the difference between microeconomics and macroeconomics and between economic and non-economic activities; the basic economic terms and the sectors and entities of an economy.'),
  s('ECO9.2', 'IX', 'Types of Economies', 'Capitalist, socialist and mixed economies and where India sits; developed and developing economies; the difference between economic growth and economic development.'),
  s('ECO9.3', 'IX', 'Problems of an Economy', 'Scarcity — unlimited wants against limited resources with alternative uses — and the three central problems every economy must answer: what, how and for whom to produce.'),
  s('ECO9.4', 'IX', 'The Indian Economy: Sectors', 'The primary, secondary and tertiary sectors of the Indian economy; the contribution and problems of agriculture and the green revolution; types of industry and its impact; the role of services.'),
  s('ECO9.5', 'IX', 'Major Problems: Poverty and Unemployment', 'Poverty — the poverty line, relative and absolute poverty and its causes; unemployment and its types; government schemes to reduce poverty and unemployment.'),
  s('ECO9.6', 'IX', 'Reforms and Emerging Trends', 'The liberalisation, privatisation and globalisation reforms and their impact; emerging trends such as the smart-city, Digital India and Skill India initiatives.'),
  // ---- Class X ----
  s('ECO10.1', 'X', 'The Productive Mechanism', 'Land, labour, capital and the entrepreneur as the factors of production, their characteristics and productivity, and the meaning and process of capital formation.'),
  s('ECO10.2', 'X', 'Theory of Demand and Supply', 'The laws of demand and supply through schedules and curves; movement along versus a shift of a curve; determinants and exceptions; the elasticity of demand and supply and the factors affecting it.'),
  s('ECO10.3', 'X', 'Market', 'The meaning of a market and the features distinguishing perfect competition, monopoly, monopolistic competition and oligopoly.'),
  s('ECO10.4', 'X', 'Banking in India', 'The evolution and functions of money; the functions of commercial banks and credit creation; the functions of the central bank; monetary policy and its credit-control measures; and public finance — taxation, GST, public expenditure and public debt.'),
  s('ECO10.5', 'X', 'Inflation', 'The meaning and stages of inflation; cost-push and demand-pull inflation; the effects of inflation on production and on different income groups.'),
  s('ECO10.6', 'X', 'Consumer Awareness', 'Consumer exploitation and awareness; consumer rights and duties, COPRA and the Right to Information; food adulteration; and the measures protecting consumers.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  ec('icse-indian-agriculture', 'Indian Agriculture and the Green Revolution', 'The Indian Economy', IX, 'CONCEPTUAL',
    'Understand why agriculture matters to the Indian economy, the problems that hold it back — small holdings, monsoon dependence, thin credit — and how the green revolution raised output and what it cost.',
    EV('Explains the contribution of agriculture to the Indian economy', 'Names a problem of Indian agriculture and a government measure against it', 'Explains what the green revolution changed'),
    'Ask {{name}} why a country can grow far more food than before and still leave many farmers poor.',
    ['ECO9.4']),
  ec('icse-indian-industry', 'Industry in India: Types and Impact', 'The Indian Economy', IX, 'CONCEPTUAL',
    'Understand how industry is classified by scale, why small and cottage industry matters in India, and how industrialisation brings pollution and deforestation that have to be managed.',
    EV('Distinguishes large, medium and small-scale industry', 'Explains the significance of cottage and small-scale industry in India', 'Explains an adverse impact of industrialisation and a measure against it'),
    'Ask {{name}} why the government encourages small village industries when big factories produce more.',
    ['ECO9.4']),
  ec('icse-unemployment', 'Unemployment: Types and Causes', 'The Indian Economy', IX, 'CONCEPTUAL',
    'Understand unemployment as people willing to work who cannot find it, distinguished by kind — seasonal, structural, technological — each with its own causes and its own remedy.',
    EV('Distinguishes seasonal, structural and technological unemployment', 'Explains a cause of unemployment in India', 'Names a government scheme aimed at reducing it'),
    'Ask {{name}} why a farm worker with nothing to do between harvests is unemployed in a different way from a factory worker replaced by a machine.',
    ['ECO9.5']),
  ec('icse-smart-cities-digital-india', 'Smart Cities and Digital India', 'The Indian Economy', IX, 'CONCEPTUAL',
    'Understand recent development initiatives — the smart city, Digital India and Skill India — as attempts to modernise infrastructure, services and skills, and how each is meant to lift the economy.',
    EV('Explains what a smart city is meant to achieve', 'Describes the aim of the Digital India or Skill India initiative', 'Links an initiative to a development outcome such as jobs or infrastructure'),
    'Ask {{name}} what would make a city “smart”, and who it is supposed to help.',
    ['ECO9.6']),
  // ---------------- Class X ----------------
  ec('icse-elasticity', 'Elasticity of Demand and Supply', 'Markets', X, 'CONCEPTUAL',
    'Understand elasticity as how strongly quantity responds to a change in price, why goods differ in it, and what makes demand or supply elastic or inelastic.',
    EV('Explains price elasticity of demand and of supply', 'Classifies a good as elastic or inelastic with a reason', 'Names a factor affecting the elasticity of demand or supply'),
    'Ask {{name}} why people buy almost the same amount of salt whatever its price, but far less of a costly treat.',
    ['ECO10.2']),
  ec('icse-monetary-policy', 'Monetary Policy and Credit Control', 'The Indian Economy', X, 'CONCEPTUAL',
    'Understand how the central bank steers the amount of credit in the economy, using quantitative tools such as the bank rate, cash reserve ratio and open-market operations, and qualitative tools such as margin requirements.',
    EV('Names a quantitative and a qualitative credit-control measure', 'Explains how raising the cash reserve ratio reduces lending', 'Explains why the central bank controls credit'),
    'Ask {{name}} how a single decision by the central bank can make loans across the whole country cheaper or dearer.',
    ['ECO10.4']),
  ec('icse-public-finance', 'Public Finance: Taxation and Public Expenditure', 'The Indian Economy', X, 'CONCEPTUAL',
    'Understand how the government raises money through direct and indirect taxes — including GST — and non-tax revenue, how it spends and borrows, and why public expenditure has grown.',
    EV('Distinguishes a direct from an indirect tax', 'Explains the meaning and objective of GST', 'Distinguishes revenue from capital expenditure'),
    'Ask {{name}} what the difference is between a tax on their income and a tax added to what they buy.',
    ['ECO10.4']),
  ec('icse-inflation', 'Inflation', 'The Indian Economy', X, 'CONCEPTUAL',
    'Understand inflation as a sustained rise in the general price level, distinguish demand-pull from cost-push inflation, and see why it hurts fixed-income earners while it can help others.',
    EV('Explains what inflation means and names a stage of it', 'Distinguishes demand-pull from cost-push inflation', 'Explains why inflation hurts a fixed-income group'),
    'Ask {{name}} why the same hundred rupees buys less this year than last, and who suffers most from that.',
    ['ECO10.5']),
];

// Align ICSE units onto the existing 14–16 Economics ladder (align-first).
const alignments = {
  mt_zrGl2FRuhh: ['ECO9.1'],   // What Is Economics
  mt_wRuSXJkzXM: ['ECO9.1'],   // Basic Economic Activities
  mt_7QoJdOVbqg: ['ECO9.2'],   // Types of Economies
  mt_gLvCERWvVL: ['ECO9.2'],   // Measuring Development: Income and Human Development
  mt_y8Wj38VEpV: ['ECO9.3'],   // The Central Problems of an Economy
  mt_0CmQMjd6dQ: ['ECO9.4'],   // Sectors of the Economy
  mt_MaWJ5xmudK: ['ECO9.4'],   // Food Security and the Public Distribution System
  mt_64hj8wqjvs: ['ECO9.5'],   // Poverty and Its Measurement
  mt_rqYeEbHAHW: ['ECO9.6'],   // Economic Reforms Since 1991
  mt_yGbS9NpIU8: ['ECO10.1'],  // Factors of Production
  mt_jeTXkpY2IU: ['ECO10.2'],  // Demand
  mt_0AwWXAesqm: ['ECO10.2'],  // Supply
  mt_9Xg22tQB7f: ['ECO10.3'],  // Types of Market
  mt_kECFYQuuDI: ['ECO10.4'],  // Money, Banking and Credit
  mt_a3SPFBAkKh: ['ECO10.6'],  // Consumer Rights and Protection
};

const newEdges = [
  // New topics anchored to the existing 14–16 Economics ladder.
  { t: 'icse-indian-agriculture', p: 'mt_0CmQMjd6dQ', strength: 'hard', reason: 'Agriculture is the primary sector of the economy.' },
  { t: 'icse-indian-agriculture', p: 'mt_MaWJ5xmudK', strength: 'soft', reason: 'The green revolution underpins food security.' },
  { t: 'icse-indian-industry', p: 'mt_0CmQMjd6dQ', strength: 'hard', reason: 'Industry is the secondary sector of the economy.' },
  { t: 'icse-unemployment', p: 'mt_JmGiTiHHC9', strength: 'hard', reason: 'Unemployment concerns labour as a resource.' },
  { t: 'icse-unemployment', p: 'mt_64hj8wqjvs', strength: 'soft', reason: 'Unemployment is a major cause of poverty.' },
  { t: 'icse-smart-cities-digital-india', p: 'mt_rqYeEbHAHW', strength: 'soft', reason: 'These initiatives extend the post-1991 reform agenda.' },
  { t: 'icse-smart-cities-digital-india', p: 'mt_f8dmAdEPq2', strength: 'soft', reason: 'They respond to the challenges before the Indian economy.' },
  { t: 'icse-elasticity', p: 'mt_jeTXkpY2IU', strength: 'hard', reason: 'Elasticity measures how demand responds to price.' },
  { t: 'icse-elasticity', p: 'mt_0AwWXAesqm', strength: 'hard', reason: 'Elasticity applies to supply as well as demand.' },
  { t: 'icse-monetary-policy', p: 'mt_kECFYQuuDI', strength: 'hard', reason: 'Monetary policy regulates the credit banks create.' },
  { t: 'icse-public-finance', p: 'mt_kECFYQuuDI', strength: 'soft', reason: 'Public finance sits alongside money and banking in macro policy.' },
  { t: 'icse-inflation', p: 'mt_kECFYQuuDI', strength: 'hard', reason: 'Inflation is a monetary phenomenon.' },
  { t: 'icse-inflation', p: 'mt_yWJTq3Oc3r', strength: 'soft', reason: 'Inflation is a rise in the general level of prices.' },
  // Intra-ICSE macro-policy links.
  { t: 'icse-inflation', p: 'icse-monetary-policy', strength: 'soft', reason: 'Monetary policy is the main tool against inflation.' },
  { t: 'icse-public-finance', p: 'icse-monetary-policy', strength: 'soft', reason: 'Fiscal and monetary policy are the two arms of macro management.' },
];

const newClusters = [
  { subject: 'Economics', domain: 'The Indian Economy', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'The Class X half of ICSE Economics turns from what the economy is to how it is steered. Money and banking lead to the central bank’s monetary policy — the levers, from the cash reserve ratio to open-market operations, that expand or squeeze credit across the country. Public finance is the other arm: how the government taxes (directly, and through GST), spends and borrows. Inflation is the problem both are aimed at, a sustained rise in prices that quietly erodes a fixed income while it can lift a business one.' },
];

integrate({ subjectDoc: 'Economics (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
