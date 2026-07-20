#!/usr/bin/env node
/**
 * build/nios-sec-depth.mjs — split pass over the NIOS Secondary integration.
 * A grain audit found a tail of ~7 mints that bundled two or more distinct
 * teachable ideas (a single topic linked to ≥2 lesson standards, or an
 * "X, Y and Z" name). This decomposes them to the taxonomy's micro-topic grain:
 * the coarse topics stay as age-appropriate entry points, and the specific
 * micro-topics are added beneath them and wired to them. Purely additive,
 * idempotent. No new standards or clusters (all fall in existing bands).
 */

import { integrateSubject, mintId } from './nios-sec.mjs';

// coarse "overview" topics these hang off (ids verified against data/topics.json).
// The commerce overviews (banking/insurance, transport/warehousing, financial
// statements, depreciation) were removed in favour of flat single-idea
// micro-topics, so these details now chain in sequence and anchor to the
// Business Studies / Accountancy ladders directly.
const OV = {
  modernWorld: 'mt_sVnzpPPhUg', indianEconomy: 'mt_MOhhQz1xTG',
  hindustaniForms: 'mt_DLlA8eRAbK', congruence: 'mt_C1EJxERW34',
};
const EX = { // other existing topics referenced
  banksSaving: 'mt_uSUqTjOl8m', linesAngles: 'mt_QysgF57dxh', trialBalance: mintId('acc-trial-balance'),
  industryCommerce: 'mt_eYQngys1jt', accComputers: 'mt_yzsAqUCSMO',
  musRaga: mintId('mus-raga'), musTala: mintId('mus-tala'), precis: 'mt_curkA82CmO', noteMaking: 'mt_qZAQBsLwp3',
};

const T = (_slug, subject, domain, name, a0, a1, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  // History / Modern World — "The Making of the Modern World" bundled two eras
  T('ss-modern-revolutions', 'History', 'Modern World', 'Revolutions and the Modern Age', 14, 16, 'CONCEPTUAL',
    'Understand the changes that opened the modern age — the Renaissance and scientific revolution, the great political revolutions in America and France, and the industrial revolution that transformed how people lived and worked.',
    ['Explain what the Renaissance and scientific revolution changed', 'Describe a political revolution and the ideas it spread', 'Explain how the industrial revolution changed everyday life'],
    'Can {{name}} explain some of the revolutions — scientific, political and industrial — that made the modern world?', ['nios-sec-2020:213.M1.L3']),
  T('ss-world-wars-decolonisation', 'History', 'Modern World', 'World Wars and Decolonisation', 14, 16, 'CONCEPTUAL',
    'Understand the great upheavals of the twentieth century — the two world wars and their consequences, and the wave of decolonisation in which colonised nations, including India, won their independence.',
    ['Explain the significance of the two world wars', 'Explain what decolonisation was', 'Connect decolonisation to India’s independence'],
    'Can {{name}} explain how the world wars and the freeing of colonised nations reshaped the twentieth-century world?', ['nios-sec-2020:213.M1.L4']),
  // Economics / The Indian Economy — coarse topic carried 3 standards
  T('econ-indian-challenges', 'Economics', 'The Indian Economy', 'Challenges before the Indian Economy', 14, 16, 'CONCEPTUAL',
    'Understand the major challenges facing the Indian economy — poverty, unemployment, inequality and the need to develop while protecting the environment — and why they are hard to solve.',
    ['Name major challenges facing the Indian economy', 'Explain why a challenge such as unemployment matters', 'Explain a tension between growth and other goals'],
    'Can {{name}} name and explain a major challenge the Indian economy faces, like poverty or unemployment?', ['nios-sec-2020:214.M7.L21']),
  T('econ-global-economy', 'Economics', 'The Indian Economy', 'India in the Global Economy', 14, 16, 'CONCEPTUAL',
    'Understand India’s place in the global economy — how it trades with other countries through imports and exports, and how being part of a connected world brings both opportunities and risks.',
    ['Explain what imports and exports are', 'Explain a benefit of trading with other countries', 'Explain a risk of being part of a global economy'],
    'Can {{name}} explain how India trades with the rest of the world, and the opportunities and risks that brings?', ['nios-sec-2020:214.M7.L22']),
  // Business Studies / Business Services — two bundled pairs
  T('bs-banking', 'Business Studies', 'Business Services', 'Banking Services', 14, 16, 'CONCEPTUAL',
    'Understand the banking services a business relies on — accounts to hold money, ways to make and receive payments, and loans and overdrafts to finance its activities.',
    ['Name banking services a business uses', 'Explain how a business uses a bank loan or overdraft', 'Explain why safe payment handling matters to a business'],
    'Can {{name}} explain the banking services a business uses — holding money, making payments, and borrowing?', ['nios-sec-2020:215.M3.L9']),
  T('bs-insurance', 'Business Studies', 'Business Services', 'Insurance', 14, 16, 'CONCEPTUAL',
    'Understand insurance as a way businesses manage risk — paying a premium so that an insurer covers a loss if something goes wrong, such as fire, theft or accident.',
    ['Explain how insurance works (premium in, cover for losses)', 'Give an example of a risk a business insures against', 'Explain why insurance gives a business security'],
    'Can {{name}} explain how insurance protects a business — paying a premium so losses are covered if something goes wrong?', ['nios-sec-2020:215.M3.L10']),
  T('bs-transport', 'Business Studies', 'Business Services', 'Transport Services', 14, 16, 'CONCEPTUAL',
    'Understand how transport services move goods and people for business — by road, rail, water and air — and how the right choice depends on cost, speed and what is being carried.',
    ['Name modes of transport used in business', 'Explain how transport creates value by moving goods to where they are needed', 'Choose a suitable mode for a given good'],
    'Can {{name}} explain how transport services move goods to where they are needed, and how a business chooses a mode?', ['nios-sec-2020:215.M3.L5']),
  T('bs-warehousing', 'Business Studies', 'Business Services', 'Warehousing Services', 14, 16, 'CONCEPTUAL',
    'Understand warehousing — storing goods safely between production and sale — and how it lets a business hold stock, smooth out seasonal demand and deliver on time.',
    ['Explain the purpose of warehousing', 'Explain how storage bridges production and demand', 'Give an example where warehousing helps a business'],
    'Can {{name}} explain why a business stores goods in a warehouse, and how that helps it meet demand on time?', ['nios-sec-2020:215.M3.L6']),
  // Accountancy / Financial Statements — P&L and balance sheet are distinct
  T('acc-profit-loss', 'Accountancy', 'Financial Statements', 'The Profit and Loss Account', 14, 16, 'CONCEPTUAL',
    'Understand the trading and profit-and-loss account — the statement that sets a business’s income against its expenses over a period to show whether it made a profit or a loss.',
    ['Explain what the profit-and-loss account shows', 'Explain how income and expenses give profit or loss', 'Distinguish gross profit from net profit'],
    'Can {{name}} explain how the profit-and-loss account shows whether a business made money over a period?', ['nios-sec-2020:224.M5.L11']),
  T('acc-balance-sheet', 'Accountancy', 'Financial Statements', 'The Balance Sheet', 14, 16, 'CONCEPTUAL',
    'Understand the balance sheet — a snapshot at one moment of what a business owns (assets) and owes (liabilities), and the owner’s capital, always balancing by the accounting equation.',
    ['Explain what the balance sheet shows', 'Explain why assets equal liabilities plus capital', 'Distinguish the balance sheet from the profit-and-loss account'],
    'Can {{name}} explain how a balance sheet shows what a business owns and owes at a moment in time?', ['nios-sec-2020:224.M5.L12']),
  // Accountancy / Adjustments — "Depreciation, Provisions and Reserves" bundled
  T('acc-depreciation-only', 'Accountancy', 'Adjustments', 'Depreciation', 14, 16, 'CONCEPTUAL',
    'Understand depreciation — the gradual fall in value of a fixed asset as it is used and wears out — and why a business records it each year as a cost against profit.',
    ['Explain what depreciation is and why it happens', 'Explain why depreciation is charged as a cost', 'Give an example of an asset that depreciates'],
    'Can {{name}} explain why a business records depreciation as its equipment wears out over the years?', ['nios-sec-2020:224.M4.L9']),
  T('acc-provisions', 'Accountancy', 'Adjustments', 'Provisions and Reserves', 14, 16, 'CONCEPTUAL',
    'Understand provisions and reserves — amounts a business sets aside from profit for a likely future cost (a provision) or to strengthen the business for the future (a reserve).',
    ['Distinguish a provision from a reserve', 'Give an example of each', 'Explain why setting money aside is prudent'],
    'Can {{name}} explain the difference between a provision (for a likely cost) and a reserve (saved for the future)?', ['nios-sec-2020:224.M4.L10']),
  // Music / Hindustani — thaat system and vocal forms are distinct
  T('mus-thaat', 'Music', 'Hindustani Music', 'The Thaat System', 13, 16, 'CONCEPTUAL',
    'Understand the thaat system of Hindustani music — a way of grouping ragas into parent scales, so that each raga can be placed within one of the ten thaats.',
    ['Explain what a thaat is', 'Explain how thaats group ragas', 'Explain that each raga belongs to a thaat'],
    'Can {{name}} explain how Hindustani music groups its ragas into parent scales called thaats?', ['nios-sec-2020:242.M2.L4']),
  T('mus-hindustani-vocal', 'Music', 'Hindustani Music', 'Hindustani Vocal Forms', 13, 16, 'CONCEPTUAL',
    'Understand the main vocal forms of Hindustani music — the older, solemn dhrupad and the freer, more popular khayal — and how their compositions are structured within a raga and tala.',
    ['Name Hindustani vocal forms (dhrupad, khayal)', 'Describe how dhrupad and khayal differ', 'Explain that a composition is set in a raga and tala'],
    'Can {{name}} name Hindustani vocal forms like dhrupad and khayal, and explain how they differ?', ['nios-sec-2020:242.M2.L5']),
  // Mathematics / Geometry — congruence topic had absorbed the concurrent-lines lesson
  T('sec-concurrent-lines', 'Mathematics', 'Geometry', 'Concurrent Lines in a Triangle', 14, 16, 'CONCEPTUAL',
    'Understand concurrent lines — lines that all pass through one point — in a triangle, where the medians, altitudes, perpendicular bisectors and angle bisectors each meet at a special centre.',
    ['Explain what concurrent lines are', 'Name special lines of a triangle (medians, altitudes)', 'State that each set of these lines meets at one point'],
    'Can {{name}} explain that the medians (or altitudes) of a triangle all meet at a single point?', ['nios-sec-2020:211.M3.L12']),
];

// Align the existing primary précis topic to the secondary study-skills standard.
const alignments = { mt_curkA82CmO: ['nios-sec-2020:202.STU'] };

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  soft('ss-modern-revolutions', OV.modernWorld, 'A closer look at the revolutions builds on the overview of the modern world'),
  soft('ss-world-wars-decolonisation', OV.modernWorld, 'A closer look at the wars and decolonisation builds on the modern-world overview'),
  soft('ss-world-wars-decolonisation', 'ss-modern-revolutions', 'The world wars follow the age of revolutions and industrialisation'),
  soft('econ-indian-challenges', OV.indianEconomy, 'The challenges build on the overview of the Indian economy'),
  soft('econ-global-economy', OV.indianEconomy, 'India’s global role builds on the overview of the Indian economy'),
  soft('bs-transport', EX.industryCommerce, 'Transport is one of the services that support commerce'),
  soft('bs-warehousing', 'bs-transport', 'Warehousing complements transport in moving goods to market'),
  soft('bs-banking', EX.industryCommerce, 'Banking is one of the commercial services'),
  soft('bs-banking', EX.banksSaving, 'Business banking builds on how banks and saving work'),
  soft('bs-insurance', 'bs-banking', 'Insurance sits alongside banking among the financial services'),
  hard('acc-profit-loss', EX.trialBalance, 'The profit-and-loss account is prepared from the trial balance'),
  soft('acc-balance-sheet', 'acc-profit-loss', 'The balance sheet is drawn up after the profit-and-loss account'),
  soft(EX.accComputers, 'acc-balance-sheet', 'Computerised accounting produces the same records and statements'),
  soft('acc-depreciation-only', EX.trialBalance, 'Adjustments like depreciation come after the trial balance'),
  soft('acc-provisions', 'acc-depreciation-only', 'Provisions and reserves are studied alongside depreciation'),
  soft('mus-thaat', OV.hindustaniForms, 'The thaat system is part of Hindustani raga organisation'),
  soft('mus-thaat', EX.musRaga, 'Thaats group ragas, building on understanding raga'),
  soft('mus-hindustani-vocal', OV.hindustaniForms, 'The vocal forms are part of Hindustani music'),
  soft('mus-hindustani-vocal', EX.musTala, 'Vocal compositions are set in a tala'),
  soft('sec-concurrent-lines', OV.congruence, 'Concurrent lines are studied alongside triangle congruence'),
  soft('sec-concurrent-lines', EX.linesAngles, 'Concurrent lines build on understanding lines and angles'),
  // wire the existing note-making topic to its natural prerequisite
  soft(EX.noteMaking, EX.precis, 'Note-making and summarising build on writing a précis'),
];

integrateSubject({
  subject: { name: '(secondary depth pass)', courseCode: '—' },
  standards: [], newTopics, alignments, newEdges, newClusters: [],
});
