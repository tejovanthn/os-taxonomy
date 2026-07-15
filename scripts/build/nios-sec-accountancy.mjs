#!/usr/bin/env node
/**
 * build/nios-sec-accountancy.mjs — NIOS Secondary Accountancy (Code 224) → a new
 * "Accountancy" subject. 17 lessons across 6 modules, entirely new to the
 * taxonomy (no existing overlap). Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Accountancy', courseCode: '224' };
const AC = 'Accountancy';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('224.M1.L1', 'I. Introduction to Accounting', 'Introduction to Accounting', 'Introduction to Accounting', 'Understand accounting as the recording, classifying and summarising of a business’s financial transactions.'),
  std('224.M1.L2', 'I. Introduction to Accounting', 'Accounting Concepts and Conventions', 'Accounting Concepts and Conventions', 'Understand the basic concepts and conventions that guide accounting.'),
  std('224.M1.L3', 'I. Introduction to Accounting', 'Accounting Equation and Types of Accounts', 'Accounting Equation and Types of Accounts', 'Understand the accounting equation (assets = liabilities + capital) and the types of accounts.'),
  std('224.M2.L4', 'II. Recording Transactions', 'Journal', 'Journal', 'Understand double-entry bookkeeping and recording transactions in the journal.'),
  std('224.M2.L5', 'II. Recording Transactions', 'Cash Book', 'Cash Book', 'Understand the cash book and how cash transactions are recorded.'),
  std('224.M2.L6', 'II. Recording Transactions', 'Special Purpose Books', 'Special Purpose Books', 'Understand special purpose (subsidiary) books used to record particular kinds of transaction.'),
  std('224.M3.L7', 'III. Ledger and Trial Balance', 'Ledger', 'Ledger', 'Understand posting transactions to the ledger and balancing accounts.'),
  std('224.M3.L8', 'III. Ledger and Trial Balance', 'Trial Balance and Errors', 'Trial Balance and Errors', 'Understand preparing a trial balance and detecting errors.'),
  std('224.M4.L9', 'IV. Adjustments', 'Depreciation', 'Depreciation', 'Understand depreciation — the fall in value of assets over time — and how it is accounted for.'),
  std('224.M4.L10', 'IV. Adjustments', 'Provisions and Reserves', 'Provisions and Reserves', 'Understand provisions and reserves and why a business sets them aside.'),
  std('224.M5.L11', 'V. Financial Statements', 'Financial Statements – I', 'Financial Statements – I', 'Understand the trading and profit-and-loss account that shows a business’s profit.'),
  std('224.M5.L12', 'V. Financial Statements', 'Financial Statements – II', 'Financial Statements – II', 'Understand the balance sheet that shows a business’s financial position.'),
  std('224.M6.L13', 'VI. Computers in Accounting', 'Computers in Accounting', 'Computers in Accounting', 'Understand how computers are used in accounting.'),
  std('224.M6.L14', 'VI. Computers in Accounting', 'Introduction to Tally', 'Introduction to Tally', 'Understand computerised accounting using software such as Tally.'),
];

const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: AC, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('acc-what-is', 'Accounting Basics', 'Introduction to Accounting', 'CONCEPTUAL',
    'Understand accounting as the systematic recording, classifying and summarising of a business’s money dealings, so owners can see how the business is doing.',
    ['Explain what accounting is and why businesses need it', 'Distinguish accounting from simply spending money', 'Name what accounting records'],
    'Can {{name}} explain what accounting is — keeping an organised record of a business’s money — and why it matters?', ['nios-sec-2020:224.M1.L1']),
  T('acc-concepts', 'Accounting Basics', 'Accounting Concepts and Conventions', 'CONCEPTUAL',
    'Understand the basic concepts and conventions that make accounting consistent and reliable — such as treating the business as separate from its owner and recording at cost.',
    ['Name a basic accounting concept', 'Explain the business-entity idea (business separate from owner)', 'Explain why shared conventions make accounts trustworthy'],
    'Can {{name}} explain why accounting follows agreed rules — like keeping the business’s money separate from the owner’s?', ['nios-sec-2020:224.M1.L2']),
  T('acc-equation', 'Accounting Basics', 'The Accounting Equation', 'CONCEPTUAL',
    'Understand the accounting equation — assets equal liabilities plus capital — and how every transaction keeps it balanced, and the types of accounts involved.',
    ['State the accounting equation', 'Explain that every transaction keeps it in balance', 'Classify items as assets, liabilities or capital'],
    'Can {{name}} explain the accounting equation — that what a business owns equals what it owes plus the owner’s stake?', ['nios-sec-2020:224.M1.L3']),
  T('acc-journal', 'Recording Transactions', 'Double-Entry and the Journal', 'PROCEDURAL',
    'Understand double-entry bookkeeping — that every transaction affects two accounts, one debited and one credited — and how transactions are first recorded in the journal.',
    ['Explain the double-entry principle', 'Identify the debit and credit for a simple transaction', 'Record a transaction as a journal entry'],
    'Can {{name}} explain double-entry bookkeeping — that every transaction has a debit and a credit — and make a journal entry?', ['nios-sec-2020:224.M2.L4']),
  T('acc-cash-book', 'Recording Transactions', 'Cash Book and Subsidiary Books', 'PROCEDURAL',
    'Understand the cash book, which records money coming in and going out, and other special purpose (subsidiary) books used for particular kinds of transaction.',
    ['Explain what the cash book records', 'Explain why subsidiary books are used', 'Record a cash transaction'],
    'Can {{name}} explain how a cash book keeps track of money in and out, and why businesses use special books for different transactions?', ['nios-sec-2020:224.M2.L5', 'nios-sec-2020:224.M2.L6']),
  T('acc-ledger', 'Ledger and Trial Balance', 'The Ledger', 'PROCEDURAL',
    'Understand the ledger — where all transactions of each account are gathered together — and how accounts are posted to it and balanced.',
    ['Explain the purpose of the ledger', 'Post a journal entry to the ledger', 'Balance a ledger account'],
    'Can {{name}} explain what the ledger is for — gathering all of each account’s transactions in one place — and balance an account?', ['nios-sec-2020:224.M3.L7']),
  T('acc-trial-balance', 'Ledger and Trial Balance', 'Trial Balance and Errors', 'PROCEDURAL',
    'Understand the trial balance — a list of all account balances used to check that total debits equal total credits — and how it helps find errors.',
    ['Explain what a trial balance is for', 'Explain that debits should equal credits', 'Explain how a trial balance helps detect errors'],
    'Can {{name}} explain how a trial balance checks that the books balance, with total debits equal to total credits?', ['nios-sec-2020:224.M3.L8']),
  T('acc-depreciation', 'Adjustments', 'Depreciation, Provisions and Reserves', 'CONCEPTUAL',
    'Understand depreciation — the fall in value of assets as they are used — and provisions and reserves, amounts a business sets aside for future losses or needs.',
    ['Explain what depreciation is and why it is recorded', 'Distinguish a provision from a reserve', 'Give an example of an asset that depreciates'],
    'Can {{name}} explain why a business records depreciation as its equipment wears out, and what reserves are for?', ['nios-sec-2020:224.M4.L9', 'nios-sec-2020:224.M4.L10']),
  T('acc-financial-statements', 'Financial Statements', 'Financial Statements', 'CONCEPTUAL',
    'Understand the two main financial statements — the profit-and-loss account, which shows whether the business made a profit, and the balance sheet, which shows what it owns and owes.',
    ['Explain what the profit-and-loss account shows', 'Explain what the balance sheet shows', 'Distinguish profit from financial position'],
    'Can {{name}} explain the difference between a profit-and-loss account (did the business make money?) and a balance sheet (what does it own and owe?)', ['nios-sec-2020:224.M5.L11', 'nios-sec-2020:224.M5.L12']),
  T('acc-computers', 'Computers in Accounting', 'Computerised Accounting', 'CONCEPTUAL',
    'Understand how computers and accounting software such as Tally are used to keep accounts — making recording faster, more accurate and easier to report.',
    ['Explain benefits of computerised accounting', 'Name accounting software such as Tally', 'Explain how software reduces errors and effort'],
    'Can {{name}} explain how accounting software like Tally makes keeping accounts faster and more accurate?', ['nios-sec-2020:224.M6.L13', 'nios-sec-2020:224.M6.L14']),
];

const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const newEdges = [
  hard('acc-concepts', 'acc-what-is', 'Accounting concepts build on knowing what accounting is'),
  hard('acc-equation', 'acc-concepts', 'The accounting equation builds on the basic concepts'),
  hard('acc-journal', 'acc-equation', 'Double-entry recording builds on the accounting equation'),
  hard('acc-cash-book', 'acc-journal', 'The cash book builds on double-entry recording'),
  hard('acc-ledger', 'acc-journal', 'The ledger builds on journal entries'),
  hard('acc-trial-balance', 'acc-ledger', 'The trial balance builds on balanced ledger accounts'),
  soft('acc-depreciation', 'acc-trial-balance', 'Adjustments like depreciation come after the trial balance'),
  hard('acc-financial-statements', 'acc-trial-balance', 'Financial statements are prepared from the trial balance'),
  soft('acc-financial-statements', 'acc-depreciation', 'Financial statements include adjustments like depreciation'),
  soft('acc-computers', 'acc-financial-statements', 'Computerised accounting produces the same records and statements'),
];

const newClusters = [
  { subject: AC, domain: 'Accounting Basics', ageRangeStart: 14, summary: 'Your teenager is learning the foundations of accounting — what it is, the concepts that guide it, and the accounting equation that keeps every transaction in balance.' },
  { subject: AC, domain: 'Recording Transactions', ageRangeStart: 14, summary: 'Your teenager is learning how transactions are recorded — double-entry bookkeeping, the journal, and the cash and subsidiary books.' },
  { subject: AC, domain: 'Ledger and Trial Balance', ageRangeStart: 14, summary: 'Your teenager is learning how records are gathered and checked — posting to the ledger, balancing accounts, and preparing a trial balance to catch errors.' },
  { subject: AC, domain: 'Adjustments', ageRangeStart: 14, summary: 'Your teenager is learning end-of-year adjustments — depreciation as assets wear out, and provisions and reserves set aside for the future.' },
  { subject: AC, domain: 'Financial Statements', ageRangeStart: 14, summary: 'Your teenager is learning to read the final accounts — the profit-and-loss account that shows profit, and the balance sheet that shows what a business owns and owes.' },
  { subject: AC, domain: 'Computers in Accounting', ageRangeStart: 14, summary: 'Your teenager is learning how accounting software like Tally makes keeping accounts faster and more accurate.' },
];

integrateSubject({ subject, standards, newTopics, alignments: {}, newEdges, newClusters });
