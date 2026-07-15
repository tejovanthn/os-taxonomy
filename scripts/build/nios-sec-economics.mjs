#!/usr/bin/env node
/**
 * build/nios-sec-economics.mjs — NIOS Secondary Economics (Code 214) → a new
 * "Economics" subject for the formal micro/macro-economics content (demand,
 * supply, price, markets, production, the Indian economy). The everyday-money
 * lessons (wants, goods, money, banking, saving, consumer awareness) align to
 * existing Life Skills topics; data lessons align to Maths. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Economics', courseCode: '214' };
const E = 'Economics';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('214.M1.L1', 'I. Introduction', 'What is Economics?', 'What is Economics?', 'Understand economics as the study of how people and societies use limited resources to satisfy their wants.'),
  std('214.M1.L2', 'I. Introduction', 'Human Wants', 'Human Wants', 'Understand human wants — that they are unlimited — and how they are classified.'),
  std('214.M1.L3', 'I. Introduction', 'Goods and Services', 'Goods and Services', 'Understand goods and services and how they satisfy wants.'),
  std('214.M2.L4', 'II. The Economy', 'Economy – Its Meaning and Types', 'Economy – Its Meaning and Types', 'Understand what an economy is and the main types of economic systems.'),
  std('214.M2.L5', 'II. The Economy', 'Central Problems of an Economy', 'Central Problems of an Economy', 'Understand the central problems of every economy — what, how and for whom to produce — arising from scarcity.'),
  std('214.M2.L6', 'II. The Economy', 'Basic Economic Activities', 'Basic Economic Activities', 'Understand the basic economic activities — production, consumption, exchange and distribution.'),
  std('214.M3.L7', 'III. Production', 'Production', 'Production', 'Understand production and the factors of production — land, labour, capital and enterprise.'),
  std('214.M3.L8', 'III. Production', 'Cost and Revenue', 'Cost and Revenue', 'Understand the costs of production and the revenue earned from sales.'),
  std('214.M4.L9', 'IV. Market', 'Demand', 'Demand', 'Understand demand — how much of a good buyers want at different prices — and the law of demand.'),
  std('214.M4.L10', 'IV. Market', 'Supply', 'Supply', 'Understand supply — how much of a good sellers offer at different prices — and the law of supply.'),
  std('214.M4.L11', 'IV. Market', 'Determination of Price', 'Determination of Price', 'Understand how price is determined where demand and supply meet (market equilibrium).'),
  std('214.M4.L12', 'IV. Market', 'Market', 'Market', 'Understand what a market is and the main types of market.'),
  std('214.M4.L13', 'IV. Market', 'Role of Government in the Economy', 'Role of Government in the Economy', 'Understand the role of government in the economy — taxes, spending and regulation.'),
  std('214.M5.L14', 'V. Money and Banking', 'Money and its Role', 'Money and its Role', 'Understand money and its role in the economy.'),
  std('214.M5.L15', 'V. Money and Banking', 'Banking and Credit', 'Banking and Credit', 'Understand banking, credit, and the role of banks in the economy.'),
  std('214.M5.L16', 'V. Money and Banking', 'Savings and Investment', 'Savings and Investment', 'Understand saving and investment and their importance for growth.'),
  std('214.M6.L17', 'VI. Statistics in Economics', 'Collection and Organisation of Data', 'Collection and Organisation of Data', 'Understand how economic data is collected and organised.'),
  std('214.M6.L18', 'VI. Statistics in Economics', 'Analysis of Data', 'Analysis of Data', 'Understand how economic data is analysed and presented.'),
  std('214.M7.L19', 'VII. Indian Economy', 'An Overview of Indian Economy', 'An Overview of Indian Economy', 'Understand an overview of the Indian economy and its features.'),
  std('214.M7.L20', 'VII. Indian Economy', 'Sectoral Aspects of Indian Economy', 'Sectoral Aspects of Indian Economy', 'Understand the primary, secondary and tertiary sectors of the Indian economy.'),
  std('214.M7.L21', 'VII. Indian Economy', 'Challenges before Indian Economy', 'Challenges before Indian Economy', 'Understand the major challenges facing the Indian economy.'),
  std('214.M7.L22', 'VII. Indian Economy', 'Indian Economy in the Global Context', 'Indian Economy in the Global Context', 'Understand the Indian economy in the global context and international trade.'),
  std('214.M8.L23', 'VIII. Contemporary Concerns', 'Environment and Sustainable Development', 'Environment and Sustainable Development', 'Understand the link between the environment, the economy and sustainable development.'),
  std('214.M8.L24', 'VIII. Contemporary Concerns', 'Consumer Awareness', 'Consumer Awareness', 'Understand consumer rights and awareness in the marketplace.'),
];

const alignments = Object.fromEntries([
  ['mt__ab4knIaSL', ['214.M1.L2']],                          // Needs & Wants ← Human Wants
  ['mt_RgQxPddV8v', ['214.M1.L3']],                          // Goods & Services ← Goods and Services
  ['mt_9gpUHWVKMR', ['214.M3.L8']],                          // Costs & Revenue ← Cost and Revenue
  ['mt_cSz7XTxVAx', ['214.M4.L13']], ['mt_udgPy5oAvR', ['214.M4.L13']], // Taxes / How the Economy Works ← Role of Government
  ['mt_SsS7GptD_o', ['214.M5.L14']],                         // What Money Is ← Money and its Role
  ['mt_uSUqTjOl8m', ['214.M5.L15']],                         // Banks & Saving ← Banking and Credit
  ['mt_r1hw-KenpK', ['214.M5.L16']],                         // Financial Planning ← Savings and Investment
  ['mt_ChjMU2GDJa', ['214.M6.L18']], ['mt_Cqm8iy48UI', ['214.M6.L17']], // Bar graphs / Reading tables ← Data
  ['mt_YB0qF5KX9C', ['214.M8.L23']],                         // Human impact ← Environment & Sustainable Dev
  ['mt_My0OL6fhGL', ['214.M8.L24']],                         // Advertising & Spending ← Consumer Awareness
]);

const T = (_slug, domain, name, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: E, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type: 'CONCEPTUAL', description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('econ-what-is', 'Basic Concepts', 'What Is Economics',
    'Understand economics as the study of how people and societies use their limited resources to satisfy their unlimited wants — and why that makes choice necessary.',
    ['Define economics in simple terms', 'Explain the problem of limited resources and unlimited wants', 'Explain why economics is about making choices'],
    'Can {{name}} explain what economics studies — how people make choices because resources are limited but wants are not?', ['nios-sec-2020:214.M1.L1', 'nios-sec-2020:214.M2.L4']),
  T('econ-central-problems', 'Basic Concepts', 'The Central Problems of an Economy',
    'Understand that because resources are scarce, every economy must answer three central questions — what to produce, how to produce it, and for whom — and that different economic systems answer them differently.',
    ['State the three central problems of an economy', 'Explain how scarcity creates these problems', 'Explain that different systems answer them differently'],
    'Can {{name}} explain the three big questions every economy must answer — what, how and for whom to produce?', ['nios-sec-2020:214.M2.L5', 'nios-sec-2020:214.M2.L6']),
  T('econ-factors-production', 'Production', 'Factors of Production',
    'Understand that producing goods and services needs four factors of production — land, labour, capital and enterprise — and what each contributes.',
    ['Name the four factors of production', 'Explain what each factor contributes', 'Give an example of each factor in a real business'],
    'Can {{name}} name the four things needed to produce anything — land, labour, capital and enterprise — and what each does?', ['nios-sec-2020:214.M3.L7']),
  T('econ-demand', 'Markets', 'Demand',
    'Understand demand as the quantity of a good buyers are willing to buy at each price, and the law of demand — that, other things equal, people buy more when the price is lower.',
    ['Explain what demand means in economics', 'State the law of demand', 'Explain a factor other than price that changes demand'],
    'Can {{name}} explain what "demand" means and why people usually buy more of something when its price falls?', ['nios-sec-2020:214.M4.L9']),
  T('econ-supply', 'Markets', 'Supply',
    'Understand supply as the quantity of a good sellers are willing to offer at each price, and the law of supply — that, other things equal, sellers offer more when the price is higher.',
    ['Explain what supply means in economics', 'State the law of supply', 'Explain a factor other than price that changes supply'],
    'Can {{name}} explain what "supply" means and why sellers usually offer more of something when its price rises?', ['nios-sec-2020:214.M4.L10']),
  T('econ-price', 'Markets', 'How Prices Are Determined',
    'Understand that in a market the price settles where demand and supply meet — the equilibrium price — and how a change in demand or supply shifts it.',
    ['Explain that price is set where demand meets supply', 'Explain what happens to price if demand rises', 'Explain what happens to price if supply falls'],
    'Can {{name}} explain how the price of something is set by demand and supply meeting in a market?', ['nios-sec-2020:214.M4.L11']),
  T('econ-market', 'Markets', 'Types of Market',
    'Understand what a market is — any arrangement where buyers and sellers trade — and how markets differ, from many small sellers competing to a single dominant seller.',
    ['Explain what a market is', 'Give examples of different kinds of market', 'Explain how competition among sellers affects buyers'],
    'Can {{name}} explain what a market is and how markets can differ, from lots of competing sellers to just one?', ['nios-sec-2020:214.M4.L12']),
  T('econ-indian-economy', 'The Indian Economy', 'The Indian Economy',
    'Understand the broad features of the Indian economy, the major challenges it faces (like poverty and unemployment), and its place in the global economy.',
    ['Describe a key feature of the Indian economy', 'Name a major challenge facing it', 'Explain that India trades within a global economy'],
    'Can {{name}} describe the Indian economy in broad terms — a strength, a challenge, and its place in the wider world?', ['nios-sec-2020:214.M7.L19', 'nios-sec-2020:214.M7.L21', 'nios-sec-2020:214.M7.L22']),
  T('econ-sectors', 'The Indian Economy', 'Sectors of the Economy',
    'Understand that an economy has three sectors — primary (farming, mining), secondary (manufacturing) and tertiary (services) — and how their balance shows a country’s development.',
    ['Name the three sectors of the economy with examples', 'Classify a job or activity into a sector', 'Explain what the balance of sectors says about development'],
    'Can {{name}} sort economic activities into the primary, secondary and tertiary sectors, and explain what each is?', ['nios-sec-2020:214.M7.L20']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  hard('econ-central-problems', 'econ-what-is', 'The central problems build on the basic idea of scarcity and economics'),
  soft('econ-factors-production', 'econ-what-is', 'Production uses the scarce resources economics studies'),
  soft('econ-factors-production', 'mt_9gpUHWVKMR', 'Factors of production build on costs and revenue'),
  soft('econ-demand', 'econ-what-is', 'Demand is a core idea within economics'),
  soft('econ-supply', 'econ-what-is', 'Supply is a core idea within economics'),
  hard('econ-price', 'econ-demand', 'Price determination builds on demand'),
  hard('econ-price', 'econ-supply', 'Price determination builds on supply'),
  soft('econ-market', 'econ-price', 'Understanding markets builds on how prices are set'),
  soft('econ-indian-economy', 'econ-what-is', 'The Indian economy applies economic ideas to India'),
  soft('econ-indian-economy', 'mt_QCQjNxURAP', 'The Indian economy builds on knowing India’s industries'),
  soft('econ-sectors', 'econ-indian-economy', 'The sectors describe the structure of the Indian economy'),
];

const newClusters = [
  { subject: E, domain: 'Basic Concepts', ageRangeStart: 14, summary: 'Your teenager is learning the foundations of economics — how limited resources and unlimited wants force choices, and the central problems every economy must solve.' },
  { subject: E, domain: 'Production', ageRangeStart: 14, summary: 'Your teenager is learning how goods and services are produced — the factors of production (land, labour, capital and enterprise) and the costs involved.' },
  { subject: E, domain: 'Markets', ageRangeStart: 14, summary: 'Your teenager is learning how markets work — demand and supply, how they set prices, and the different kinds of market.' },
  { subject: E, domain: 'The Indian Economy', ageRangeStart: 14, summary: 'Your teenager is learning about the Indian economy — its sectors, its challenges, and its place in the global economy.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
