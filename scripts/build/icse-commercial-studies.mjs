#!/usr/bin/env node
/**
 * build/icse-commercial-studies.mjs — ICSE Commercial Studies (61),
 * Classes IX–X (ages 14–16).
 *
 * Commercial Studies is a broad two-year survey of commerce that spans BOTH the
 * Business Studies and the Accountancy subjects, each of which already has a
 * dense 14–16 ladder (from nios-sec). So this is align-heavy: commercial
 * activities and the forms of organisation, the whole introductory accounting
 * cycle (terminology, journal, ledger, trial balance), banking, advertising and
 * sales promotion, consumer protection, and transport/warehousing/insurance all
 * map onto topics that already exist. The mints are what Commercial Studies adds
 * that the taxonomy lacked at this level — functional departments, business
 * communication, e-commerce, stakeholders, marketing and pricing, capital vs
 * revenue, cost classification, budgeting, raising capital, HR (recruitment and
 * industrial relations), logistics, digital banking and financial fraud. Several
 * mints are reverse-anchored FROM the senior (16–18) Business Studies /
 * Accountancy topics that build on them. Marble-authored factual descriptions —
 * no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const bs = topic('Business Studies'), ac = topic('Accountancy');
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('CST9.1', 'IX', 'Commercial Activities', 'Commercial and non-commercial activities; business, profession and employment; the classification of industry and of commerce into trade and the aids to trade; and the forms of commercial organisation by ownership.'),
  s('CST9.2', 'IX', 'Departments of a Commercial Organisation', 'The meaning and objectives of the main functional departments — production, marketing and sales, finance and accounting, and human resources.'),
  s('CST9.3', 'IX', 'Communication in Commercial Organisations', 'The meaning and process of communication and its role in an organisation, and the methods used — letter, email, audio and video conferencing and social media.'),
  s('CST9.4', 'IX', 'Introduction to Accounting and Bookkeeping', 'The meaning and objectives of accounting, the accounting cycle and its terminology; the basic principles and concepts; and recording through the journal, ledger and trial balance.'),
  s('CST9.5', 'IX', 'Banking', 'The functions of commercial banks and the types of bank account — savings, current, recurring and fixed.'),
  s('CST9.6', 'IX', 'Trade: E-commerce', 'E-commerce and e-trade, and the merits and demerits of online trading.'),
  s('CST9.7', 'IX', 'Social Responsibility towards the Environment', 'The responsibility of a commercial organisation towards the environment — e-waste management, recycling, afforestation, eco-friendly products and legal compliance.'),
  // ---- Class X ----
  s('CST10.1', 'X', 'Stakeholders in Commercial Organisations', 'Internal and external stakeholders — shareholders, employees, employers, suppliers, creditors, government and society — and what each expects of a commercial organisation.'),
  s('CST10.2', 'X', 'Marketing and Sales', 'Marketing and how it differs from sales; product versus service; pricing; advertising, publicity and sales promotion; consumer protection; and e-commerce.'),
  s('CST10.3', 'X', 'Finance and Accounting', 'Capital and revenue receipts and expenditure; the final accounts of a sole proprietorship; cost classification; budgeting; and sources of finance including the capital market, shares and debentures.'),
  s('CST10.4', 'X', 'Human Resources', 'Recruitment, selection and training; industrial relations and trade unions; and the concept of social security.'),
  s('CST10.5', 'X', 'Logistics', 'Logistics and its parts — transport by land, air and water; warehousing and its types; and insurance and its principles.'),
  s('CST10.6', 'X', 'Banking', 'The functions of the central bank and how it differs from a commercial bank; internet banking and modes of transferring money; cards; and financial fraud.'),
  s('CST10.7', 'X', 'Government Initiatives in Environment Protection', 'The Environment (Protection) Act 1986 and the functions of the Central Pollution Control Board.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  bs('icse-cs-functional-departments', 'Functional Departments of a Business', 'Foundations of Business', IX, 'CONCEPTUAL',
    'Understand that a commercial organisation divides its work among departments — production, marketing and sales, finance and accounting, and human resources — each with its own objective, which have to be coordinated.',
    EV('Names the main functional departments of a business', 'States the objective of a given department', 'Explains why the departments must work together'),
    'Ask {{name}} why a large company splits its work into separate departments instead of everyone doing everything.',
    ['CST9.2']),
  bs('icse-cs-business-communication', 'Communication in a Business', 'Foundations of Business', IX, 'CONCEPTUAL',
    'Understand communication as the passing of a message within and beyond an organisation, and how the channel chosen — letter, email, conference call or social media — suits the message and the audience.',
    EV('Explains the role of communication in an organisation', 'Matches a communication method to a situation', 'Distinguishes formal from informal channels'),
    'Ask {{name}} when a business would send a formal letter rather than a quick message, and why.',
    ['CST9.3']),
  bs('icse-cs-ecommerce', 'E-Commerce and Online Trading', 'Trade and Marketing', IX, 'CONCEPTUAL',
    'Understand e-commerce as buying and selling over the internet, and weigh what it gains — reach and convenience — against what it risks, from security to the loss of the personal touch.',
    EV('Explains what e-commerce and e-trade mean', 'States a merit and a demerit of online trading', 'Contrasts online with traditional trade'),
    'Ask {{name}} what a shop gains and what it gives up by selling online instead of over a counter.',
    ['CST9.6']),
  bs('icse-cs-business-environment', 'Business and the Environment', 'Business & Society', [14, 16], 'CONCEPTUAL',
    'Understand that a business owes a duty to the environment — managing e-waste, recycling, planting trees, choosing eco-friendly products — and that laws such as the Environment Protection Act enforce that duty.',
    EV('Explains a way a business can reduce its environmental harm', 'Explains why legal compliance on the environment matters', 'Names a body or law that regulates environmental protection'),
    'Ask {{name}} what a factory should do about the waste and pollution it creates, and who makes sure it does.',
    ['CST9.7', 'CST10.7']),
  // ---------------- Class X ----------------
  bs('icse-cs-stakeholders', 'Stakeholders in a Business', 'Foundations of Business', X, 'CONCEPTUAL',
    'Understand a stakeholder as anyone with an interest in a business — inside it (shareholders, employees, employers) or outside it (suppliers, creditors, government, society) — each expecting something different of it.',
    EV('Distinguishes internal from external stakeholders', 'Names what a given stakeholder expects of a business', 'Explains why a business must balance competing stakeholder interests'),
    'Ask {{name}} who besides the owner has a stake in how a company behaves, and what each of them wants.',
    ['CST10.1']),
  bs('icse-cs-marketing-pricing', 'Marketing, Pricing and Sales', 'Trade and Marketing', X, 'CONCEPTUAL',
    'Understand marketing as identifying and meeting customer needs — wider than selling — covering the difference between a product and a service and how the price of an offering is set.',
    EV('Distinguishes marketing from sales', 'Distinguishes a product from a service with examples', 'Explains an objective that guides how a price is set'),
    'Ask {{name}} why selling something is only the last step of marketing it, not the whole of it.',
    ['CST10.2']),
  bs('icse-cs-raising-capital', 'Raising Capital: Shares and Debentures', 'Business Finance', X, 'CONCEPTUAL',
    'Understand how a company raises long-term money by issuing shares (ownership) and debentures (loans) on the capital market, and short-term money through bank facilities, and how these differ.',
    EV('Distinguishes a share from a debenture', 'Explains the function of the capital market', 'Distinguishes a long-term from a short-term source of finance'),
    'Ask {{name}} the difference between owning a piece of a company and lending it money.',
    ['CST10.3']),
  bs('icse-cs-recruitment-training', 'Recruitment, Selection and Training', 'Human Resources', X, 'PROCEDURAL',
    'Understand how a business fills a role — recruiting candidates from internal or external sources, selecting through tests and interviews, and training them on or off the job.',
    EV('Distinguishes internal from external recruitment and a trade-off of each', 'Orders the steps of selection', 'Distinguishes on-the-job from off-the-job training'),
    'Ask {{name}} whether a company should promote someone already there or hire a stranger, and what each choice costs.',
    ['CST10.4']),
  bs('icse-cs-industrial-relations', 'Industrial Relations and Social Security', 'Human Resources', X, 'CONCEPTUAL',
    'Understand industrial relations as the dealings between workers and employers, the role of trade unions in representing workers, and social security as protection like provident fund, gratuity and pension.',
    EV('Explains the objective of good industrial relations', 'States a function of a trade union', 'Names a form of social security for workers'),
    'Ask {{name}} why workers band together into a union, and what they hope it achieves.',
    ['CST10.4']),
  bs('icse-cs-logistics', 'Logistics: Moving and Storing Goods', 'Business Services', X, 'CONCEPTUAL',
    'Understand logistics as the business of getting goods to the right place at the right time, combining transport by land, air and water with warehousing to store them and insurance to cover the risk.',
    EV('Matches a mode of transport to a suitable good with a reason', 'Explains the role of warehousing in logistics', 'Explains why goods in transit are insured'),
    'Ask {{name}} everything that has to happen to get a parcel from a warehouse to their door.',
    ['CST10.5']),
  bs('icse-cs-digital-banking', 'Digital Banking and Payments', 'Business Services', X, 'CONCEPTUAL',
    'Understand how money now moves electronically — NEFT, RTGS, IMPS, mobile wallets, and debit and credit cards — so payments settle without cash, and the care each method demands.',
    EV('Distinguishes two electronic modes of transferring money', 'Distinguishes a debit from a credit card', 'States a precaution when using a card or wallet'),
    'Ask {{name}} how money reaches a shopkeeper when they pay by phone instead of with cash.',
    ['CST10.6']),
  bs('icse-cs-financial-fraud', 'Financial Fraud', 'Business Services', X, 'CONCEPTUAL',
    'Understand financial fraud as dishonest gain through deception — card fraud, false accounting, insurance and internet fraud — and why digital money creates new openings for it.',
    EV('Identifies a type of financial fraud from a described case', 'Explains how one kind of fraud is carried out', 'Names a way to guard against a common fraud'),
    'Ask {{name}} how a stranger might misuse a stolen card number, and how to make that harder.',
    ['CST10.6']),
  // ---- Accountancy ----
  ac('icse-cs-capital-revenue', 'Capital and Revenue Items', 'Financial Statements', X, 'CONCEPTUAL',
    'Understand the divide that shapes every account — capital items concern lasting assets and long-term funds, revenue items concern the day-to-day running — because putting one in the other’s place distorts the profit.',
    EV('Distinguishes capital from revenue expenditure', 'Distinguishes capital from revenue receipts', 'Classifies a described transaction correctly'),
    'Ask {{name}} why buying a delivery van is treated differently from buying the fuel that runs it.',
    ['CST10.3']),
  ac('icse-cs-cost-classification', 'Classifying Costs', 'Cost and Management Accounting', X, 'CONCEPTUAL',
    'Understand that costs are grouped to be managed — by behaviour (fixed, variable or semi-variable as output changes) and by nature (direct or indirect to the product) — so a business knows what each thing truly costs.',
    EV('Classifies a cost as fixed, variable or semi-variable', 'Distinguishes a direct from an indirect cost', 'Explains why classifying costs helps control them'),
    'Ask {{name}} which of a bakery’s costs stay the same whether it bakes ten loaves or a hundred.',
    ['CST10.3']),
  ac('icse-cs-budgeting', 'Budgeting', 'Cost and Management Accounting', X, 'CONCEPTUAL',
    'Understand a budget as a financial plan for a period ahead, how it differs from a forecast, and how sales, production, cash, purchase and master budgets fit together to steer a business.',
    EV('Explains the purpose of a budget', 'Distinguishes budgeting from forecasting', 'Names a type of budget and what it plans'),
    'Ask {{name}} how planning next month’s spending in advance helps a business stay in control.',
    ['CST10.3']),
];

// Align ICSE units onto the existing 14–16 Business Studies and Accountancy
// ladders (align-first).
const alignments = {
  // CST9.1 Commercial activities and forms of organisation
  mt_3owJnUWaIX: ['CST9.1'],   // Nature and Scope of Business
  mt_eYQngys1jt: ['CST9.1'],   // Industry and Commerce
  mt_8sHypB46Dk: ['CST9.1'],   // Sole Proprietorship and Partnership
  mt_aCpvoRDicq: ['CST9.1'],   // Companies and Cooperative Societies
  mt_B6PvJm1RfI: ['CST9.1'],   // Retail Trade
  // CST9.3 Communication
  mt_5M07PDAyVs: ['CST9.3'],   // Communication Services
  // CST9.4 The accounting cycle
  mt_QdbA9aVFHY: ['CST9.4'],   // Introduction to Accounting
  mt_tSUsQ5vBWy: ['CST9.4'],   // Accounting Concepts and Conventions
  mt_x3HUG5w1Rh: ['CST9.4'],   // The Accounting Equation
  mt_rY0Mmwc33D: ['CST9.4'],   // Double-Entry and the Journal
  mt_bftlNTHBaU: ['CST9.4'],   // The Ledger
  mt_j6XjDjtXwP: ['CST9.4'],   // Trial Balance and Errors
  // CST9.5 / CST10.6 Banking
  mt_RaLonugipz: ['CST9.5', 'CST10.6'], // Banking Services
  // CST10.2 Marketing and sales
  mt_QpVZDtR6gS: ['CST10.2'],  // Advertising
  mt_00LVJgJmKg: ['CST10.2'],  // Sales Promotion and Publicity
  mt_DF3mAcfJFq: ['CST10.2'],  // Purchase and Sale
  mt_QgbnzKUTYg: ['CST10.2'],  // Consumer Rights
  mt_CI8zVvPPCG: ['CST10.2'],  // Consumer Protection and Redress
  // CST10.3 Final accounts
  mt_s3QEwImLcY: ['CST10.3'],  // The Profit and Loss Account
  mt_fKIC1c1Hm7: ['CST10.3'],  // The Balance Sheet
  // CST10.5 Logistics parts
  mt_vMDmfFjuLm: ['CST10.5'],  // Transport Services
  mt_SQToqd1SHT: ['CST10.5'],  // Warehousing Services
  mt_JvNAuZXt8Z: ['CST10.5'],  // Insurance
  // CST10.6 Central bank
  mt_kECFYQuuDI: ['CST10.6'],  // Money, Banking and Credit
};

const newEdges = [
  // New topics anchored to the existing 14–16 ladder.
  { t: 'icse-cs-functional-departments', p: 'mt_3owJnUWaIX', strength: 'hard', reason: 'Departments divide the work of the business.' },
  { t: 'icse-cs-business-communication', p: 'mt_5M07PDAyVs', strength: 'soft', reason: 'Business communication uses communication services.' },
  { t: 'icse-cs-business-communication', p: 'icse-cs-functional-departments', strength: 'soft', reason: 'Communication links the departments of a business.' },
  { t: 'icse-cs-ecommerce', p: 'mt_B6PvJm1RfI', strength: 'hard', reason: 'E-commerce is a form of retail trade.' },
  { t: 'icse-cs-ecommerce', p: 'mt_wEUSyJgmpN', strength: 'soft', reason: 'Online trade is one of the emerging modes of business.' },
  { t: 'icse-cs-business-environment', p: 'mt_eYQngys1jt', strength: 'soft', reason: 'Environmental duty falls on industry and commerce.' },
  { t: 'icse-cs-stakeholders', p: 'mt_3owJnUWaIX', strength: 'hard', reason: 'Stakeholders are defined by their interest in the business.' },
  { t: 'icse-cs-marketing-pricing', p: 'mt_QpVZDtR6gS', strength: 'hard', reason: 'Advertising is a tool of marketing.' },
  { t: 'icse-cs-marketing-pricing', p: 'mt_DF3mAcfJFq', strength: 'soft', reason: 'Marketing builds on the buying and selling of goods.' },
  { t: 'icse-cs-raising-capital', p: 'mt_aCpvoRDicq', strength: 'hard', reason: 'Shares and debentures are how a company raises capital.' },
  { t: 'icse-cs-recruitment-training', p: 'mt_3owJnUWaIX', strength: 'soft', reason: 'Recruitment staffs the departments of a business.' },
  { t: 'icse-cs-industrial-relations', p: 'icse-cs-recruitment-training', strength: 'soft', reason: 'Industrial relations concern the workers a business has taken on.' },
  { t: 'icse-cs-logistics', p: 'mt_vMDmfFjuLm', strength: 'hard', reason: 'Logistics is built on transport.' },
  { t: 'icse-cs-logistics', p: 'mt_SQToqd1SHT', strength: 'hard', reason: 'Logistics is built on warehousing.' },
  { t: 'icse-cs-logistics', p: 'mt_JvNAuZXt8Z', strength: 'soft', reason: 'Insurance covers the risk of goods in transit.' },
  { t: 'icse-cs-digital-banking', p: 'mt_RaLonugipz', strength: 'hard', reason: 'Digital banking extends the services of a bank.' },
  { t: 'icse-cs-financial-fraud', p: 'icse-cs-digital-banking', strength: 'soft', reason: 'Electronic payment opens new avenues for fraud.' },
  { t: 'icse-cs-capital-revenue', p: 'mt_s3QEwImLcY', strength: 'hard', reason: 'The capital/revenue split governs what enters the profit and loss account.' },
  { t: 'icse-cs-cost-classification', p: 'mt_s3QEwImLcY', strength: 'soft', reason: 'Costs are what the profit and loss account sets against revenue.' },
  { t: 'icse-cs-budgeting', p: 'icse-cs-cost-classification', strength: 'soft', reason: 'A budget is built from an understanding of costs.' },
  // Reverse anchors: existing senior (16–18) topics build on these 14–16 topics.
  { t: 'mt_F6e464lhkJ', p: 'icse-cs-business-environment', strength: 'hard', reason: 'Senior social responsibility builds on business and the environment.' },
  { t: 'mt_TjESAIII6g', p: 'icse-cs-marketing-pricing', strength: 'hard', reason: 'The senior marketing mix builds on marketing and pricing.' },
  { t: 'mt_K6HNJ5Ru7s', p: 'icse-cs-raising-capital', strength: 'hard', reason: 'Senior sources of finance build on raising capital through shares and debentures.' },
  { t: 'mt_WJEYebqvSi', p: 'icse-cs-recruitment-training', strength: 'hard', reason: 'Senior staffing builds on recruitment, selection and training.' },
];

const newClusters = [
  { subject: 'Business Studies', domain: 'Human Resources', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'A business runs on its people, and this is how it manages them. The learner follows a role from the outside in — recruiting candidates from within the firm or beyond it, selecting among them by test and interview, and training the chosen ones on or off the job. Beyond hiring lies the ongoing relationship: industrial relations between workers and employers, the trade unions that give workers a collective voice, and the social security — provident fund, gratuity, pension — that protects them.' },
  { subject: 'Accountancy', domain: 'Cost and Management Accounting', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Where financial accounting reports what has happened, cost and management accounting helps decide what to do next. The learner first classifies costs — fixed or variable as output changes, direct or indirect to the product — so the true cost of a thing can be found. Budgeting then looks forward: a financial plan for the period ahead, different from a mere forecast, built up from sales, production, cash and purchase budgets into one master budget that steers the business.' },
];

integrate({ subjectDoc: 'Commercial Studies (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
