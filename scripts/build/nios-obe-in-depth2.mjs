#!/usr/bin/env node
/**
 * build/nios-obe-in-depth2.mjs — second depth pass: decompose the remaining
 * coarse India-specific topics (governance, civics, society, geography, and a
 * few bundled Science/Computing/Culture topics) to the taxonomy's micro-topic
 * grain. Idempotent.
 *
 * The first depth pass (nios-obe-in-depth.mjs) handled Indian history/geography.
 * This pass targets the topics that still bundle several distinct teachable
 * ideas — the tell being a single topic linked to 3–5 lesson standards (e.g.
 * "Indian Democracy and Government" → legislature + executive + judiciary +
 * state government). Coarse overview topics stay as entry points; the specific
 * micro-topics hang off them.
 *
 * Run after nios-obe-in-depth.mjs, then `node scripts/manifest.mjs && node scripts/validate.mjs`.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));
const saveFile = (name, obj) => writeFileSync(resolve(DATA, name), JSON.stringify(obj, null, 2) + '\n');

const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const mintId = (slug) => {
  const h = createHash('sha256').update(`nios-obe:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};

const SS = 'Social Studies', SCI = 'Science', COMP = 'Computing';
const t = (_slug, subject, domain, name, a0, a1, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards });

// Overview topic ids these micro-topics hang off (from earlier NIOS passes).
const OV = {
  democracy: 'mt_ECbqGTZYhL', constitution: 'mt_zFL9HpDF22', panchayat: 'mt_FJZZUv2ewS', elections: 'mt_Dx3DLwmuLq',
  unity: 'mt_sfHoytwSwm', equality: 'mt_BlcpwdLsRX', population: 'mt_29aZtsWvgT', schemes: 'mt_t1uflyWbd1',
  agriculture: 'mt_D3sDOaujQk', industries: 'mt_QCQjNxURAP',
  natSymbols: 'mt_s63gXTWzPP', transport: 'mt_fwkPvwG8ET',
  safeFood: 'mt_Km5iZqQ8Vi', diseases: 'mt_GxmukTWBAR', ioDevices: 'mt_CubybCLCKN',
};

const newTopics = [
  // ===================== Governance & Constitution =====================
  t('govt-ways-governed', SS, 'Governance & Constitution', 'Ways Countries Are Governed', 10, 12, 'CONCEPTUAL',
    'Understand that countries can be governed in different ways — by a single ruler (monarchy), by force, or by the people through democracy — and why India chose democracy.',
    ['Name different ways a country can be governed', 'Explain what makes democracy different from rule by one person', 'Explain why a country needs a government at all'],
    'Can {{name}} explain that countries can be run in different ways — and what makes a democracy special?', ['nios-obe-c:C102.L16']),
  t('govt-legislature', SS, 'Governance & Constitution', 'The Legislature: Making Laws', 10, 12, 'CONCEPTUAL',
    'Understand that the legislature is the part of government that makes the laws — the elected representatives who debate and decide the rules everyone lives by.',
    ['Explain that the legislature makes laws', 'Explain that its members are elected representatives', 'Give an example of something a law might decide'],
    'Can {{name}} explain what the legislature does — that it is where elected representatives make the laws?', ['nios-obe-b:B102.L6.1', 'nios-obe-c:C102.L17']),
  t('govt-executive', SS, 'Governance & Constitution', 'The Executive: Running the Country', 10, 12, 'CONCEPTUAL',
    'Understand that the executive is the part of government that carries out the laws and runs the country day to day — led by figures like the Prime Minister and the council of ministers.',
    ['Explain that the executive carries out laws and runs the country', 'Name roles such as the Prime Minister or a minister', 'Distinguish making a law from carrying it out'],
    'Can {{name}} explain that the executive — like the Prime Minister and ministers — carries out the laws and runs the country?', ['nios-obe-b:B102.L6.1', 'nios-obe-c:C102.L17']),
  t('govt-judiciary', SS, 'Governance & Constitution', 'The Judiciary: The Courts', 10, 12, 'CONCEPTUAL',
    'Understand that the judiciary is the system of courts that settles disputes, decides whether laws have been broken, and protects people’s rights fairly and independently.',
    ['Explain that the judiciary is the courts', 'Explain that courts decide disputes and whether laws are broken', 'Explain why courts must be fair and independent'],
    'Can {{name}} explain what the courts (the judiciary) do — settling disputes and making sure the law is followed fairly?', ['nios-obe-b:B102.L6.1', 'nios-obe-c:C102.L17']),
  t('govt-state', SS, 'Governance & Constitution', 'State Government', 11, 13, 'CONCEPTUAL',
    'Understand that alongside the national government, each state has its own government — with an assembly that makes state laws and a chief minister and governor who run the state.',
    ['Explain that states have their own governments', 'Name the state assembly, chief minister and governor', 'Explain that some matters are decided by the state, not the nation'],
    'Can {{name}} explain that each state has its own government — with an assembly and a chief minister — as well as the national one?', ['nios-obe-c:C102.L18']),
  t('rights-fundamental', SS, 'Governance & Constitution', 'Fundamental Rights of Citizens', 11, 13, 'CONCEPTUAL',
    'Understand the fundamental rights the Constitution grants every citizen — such as equality before the law, freedom of speech, and freedom of religion — and that these protect people from unfair treatment.',
    ['Name several fundamental rights', 'Explain what a right protects a person from', 'Explain that rights apply equally to all citizens'],
    'Can {{name}} name a few fundamental rights — like equality and freedom of speech — and explain what they protect?', ['nios-obe-c:C102.L17']),
  t('duties-fundamental', SS, 'Governance & Constitution', 'Fundamental Duties of Citizens', 11, 13, 'CONCEPTUAL',
    'Understand that rights come with fundamental duties — responsibilities every citizen has, such as respecting the Constitution, protecting the environment, and promoting harmony.',
    ['Name a few fundamental duties of citizens', 'Explain why rights come with responsibilities', 'Give an example of a duty in everyday life'],
    'Can {{name}} explain that being a citizen means having duties too — like caring for the environment and respecting others — not only rights?', ['nios-obe-c:C102.L17']),
  t('panchayat-gram', SS, 'Governance & Constitution', 'The Gram Panchayat', 10, 12, 'CONCEPTUAL',
    'Understand the gram panchayat — the elected village council that manages local matters like water, roads, sanitation and disputes — the level of government closest to village life.',
    ['Explain what a gram panchayat is and does', 'Explain that its members are elected by the village', 'Give an example of a local matter it manages'],
    'Can {{name}} explain how a village runs its own affairs through an elected gram panchayat?', ['nios-obe-b:B102.L6.2']),
  t('panchayat-levels', SS, 'Governance & Constitution', 'Block and District Panchayats', 10, 12, 'CONCEPTUAL',
    'Understand that above the village, the block (area) and district panchayats coordinate development and services across many villages — the three tiers of the Panchayati Raj system.',
    ['Name the three levels of Panchayati Raj (village, block, district)', 'Explain what higher panchayat levels coordinate', 'Explain why larger areas need their own councils'],
    'Can {{name}} explain the three levels of village government — from the gram panchayat up to the district?', ['nios-obe-b:B102.L6.2']),
  t('urban-local-govt', SS, 'Governance & Constitution', 'Town and City Government', 10, 12, 'CONCEPTUAL',
    'Understand how towns and cities govern themselves — through municipal councils and corporations that manage water, roads, rubbish, health and other services for city dwellers.',
    ['Explain that towns and cities have their own local government', 'Name a service a municipal body provides', 'Distinguish urban local bodies from village panchayats'],
    'Can {{name}} explain how a town or city looks after services like water and rubbish through its own local government?', ['nios-obe-b:B102.L6.3']),
  t('universal-franchise', SS, 'Governance & Constitution', 'One Person, One Vote', 11, 13, 'CONCEPTUAL',
    'Understand universal adult franchise — that every adult citizen, whoever they are, gets exactly one equal vote — and why this equality is at the heart of democracy.',
    ['Explain what universal adult franchise means', 'Explain why every vote counts equally', 'Explain why equal voting is fair and important'],
    'Can {{name}} explain that in a democracy every adult gets one equal vote, no matter who they are?', ['nios-obe-c:C102.L19']),
  t('political-parties', SS, 'Governance & Constitution', 'Political Parties', 11, 13, 'CONCEPTUAL',
    'Understand that political parties are groups with shared ideas about how the country should be run, that they put up candidates in elections, and that voters choose between them.',
    ['Explain what a political party is', 'Explain the role of parties in an election', 'Explain that voters choose between competing ideas'],
    'Can {{name}} explain what political parties are and how they take part in elections?', ['nios-obe-c:C102.L19']),
  t('how-elections-work', SS, 'Governance & Constitution', 'How Elections Are Held', 11, 13, 'PROCEDURAL',
    'Understand how an election actually works — voters register, go to a polling booth, cast a secret ballot, and the votes are counted fairly to decide the winner.',
    ['Describe the steps of voting in an election', 'Explain why the ballot is secret', 'Explain that votes are counted fairly to decide the result'],
    'Can {{name}} describe how an election works — from casting a secret vote to counting the votes to find the winner?', ['nios-obe-c:C102.L19']),
  // ===================== Society & Development =====================
  t('india-languages', SS, 'Society & Development', "India's Many Languages", 9, 11, 'CONCEPTUAL',
    'Understand that India is home to hundreds of languages, that different regions have their own, and that this rich variety of languages is part of what makes India special.',
    ['Explain that India has many languages', 'Name a few Indian languages and where they are spoken', 'Explain that many languages can belong to one country'],
    'Can {{name}} explain that India has hundreds of languages, and name a few spoken in different parts of the country?', ['nios-obe-b:B102.L2.1']),
  t('india-cultures-religions', SS, 'Society & Development', "India's Many Cultures and Religions", 9, 11, 'CONCEPTUAL',
    'Understand that people across India follow many religions and cultural traditions, that they live side by side, and that respecting all faiths and cultures keeps society peaceful.',
    ['Give examples of India’s cultural and religious diversity', 'Explain that different communities live together', 'Explain why respecting all faiths and cultures matters'],
    'Can {{name}} explain that people in India follow many religions and cultures, and why it matters to respect all of them?', ['nios-obe-b:B102.L2.1']),
  t('threads-of-unity', SS, 'Society & Development', 'Threads That Unite India', 9, 11, 'CONCEPTUAL',
    'Understand what holds India together across its diversity — a shared history and land, a shared Constitution and citizenship, and shared festivals and values that cross community lines.',
    ['Explain what unites Indians across their differences', 'Give an example of something shared across communities', 'Explain the idea of "unity in diversity"'],
    'Can {{name}} explain what ties India together as one country even though its people are so different?', ['nios-obe-b:B102.L2.2']),
  t('living-in-peace', SS, 'Society & Development', 'Living Together in Peace', 9, 11, 'CONCEPTUAL',
    'Understand why peace and goodwill between communities matter, that it is everyone’s responsibility, and that leaders like Ashoka and Akbar are remembered for encouraging tolerance.',
    ['Explain why peace between communities matters', 'Explain that keeping peace is everyone’s responsibility', 'Give an example of a leader who promoted tolerance'],
    'Can {{name}} explain why it is important for different communities to live together peacefully, and that it is everyone’s job?', ['nios-obe-b:B102.L2.3', 'nios-obe-b:B102.L2.4']),
  t('equality-women', SS, 'Society & Development', 'Equality for Girls and Women', 10, 12, 'CONCEPTUAL',
    'Understand that girls and women deserve the same rights and opportunities as boys and men, that unfair treatment still happens, and that laws protect women’s rights and equality.',
    ['Explain what gender equality means', 'Give an example of unfair treatment and why it is wrong', 'Explain that laws protect women’s rights'],
    'Can {{name}} explain why girls and women deserve the same chances as boys and men — and that laws protect that equality?', ['nios-obe-b:B102.L3.3']),
  t('girls-education', SS, 'Society & Development', 'Why Girls’ Education Matters', 9, 11, 'CONCEPTUAL',
    'Understand why educating girls is so important — for the girls themselves, their families and the whole country — and that every child, girl or boy, has the right to go to school.',
    ['Explain why educating girls benefits everyone', 'Explain that every child has the right to school', 'Recognise barriers that can keep girls out of school'],
    'Can {{name}} explain why it is so important that girls go to school, just like boys?', ['nios-obe-b:B102.L3.2']),
  t('ending-harmful-customs', SS, 'Society & Development', 'Ending Harmful Customs', 11, 13, 'CONCEPTUAL',
    'Understand that some old customs, like the dowry system, cause real harm and are unfair, that they are against the law, and that societies can change for the better.',
    ['Explain why a custom like dowry is harmful and unfair', 'Explain that such customs are against the law', 'Explain that society can change harmful practices'],
    'Can {{name}} explain why harmful old customs like dowry are wrong and illegal — and that societies can change for the better?', ['nios-obe-b:B102.L3.4']),
  t('the-small-family', SS, 'Society & Development', 'The Small Family', 10, 12, 'CONCEPTUAL',
    'Understand the idea of the small family — why many families choose to have fewer children, and how this can mean better care, health and education for each child.',
    ['Explain the idea of a small family', 'Explain a benefit of a smaller family for children', 'Connect family size to care, health and schooling'],
    'Can {{name}} explain why some families choose to be smaller, and how that can help each child?', ['nios-obe-b:B102.L3.1']),
  t('population-growth', SS, 'Society & Development', "India's Growing Population", 11, 13, 'CONCEPTUAL',
    'Understand that India has a very large and growing population, and how rapid growth puts pressure on shared resources like water, food, schools, jobs and housing.',
    ['State that India’s population is large and growing', 'Explain how growth strains shared resources', 'Give an example of a service under pressure from population growth'],
    'Can {{name}} explain why India’s fast-growing population puts pressure on things everyone shares, like water, schools and jobs?', ['nios-obe-c:C102.L14']),
  t('birth-death-sex-ratio', SS, 'Society & Development', 'Birth Rate, Death Rate and Sex Ratio', 11, 13, 'CONCEPTUAL',
    'Understand simple measures of a population — the birth rate, the death rate, and the sex ratio (the number of girls to boys) — and why a balanced sex ratio matters for a fair society.',
    ['Explain birth rate and death rate in simple terms', 'Explain what the sex ratio measures', 'Explain why a balanced sex ratio matters'],
    'Can {{name}} explain what birth rate, death rate and sex ratio mean — and why it matters that girls and boys are born in balance?', ['nios-obe-c:C102.L14']),
  t('swachh-bharat', SS, 'Society & Development', 'Swachh Bharat: The Clean India Mission', 9, 11, 'CONCEPTUAL',
    'Understand the Swachh Bharat (Clean India) Mission — a national drive for cleanliness and toilets for all — its goals, and how every person can help keep their surroundings clean.',
    ['Explain the goal of the Swachh Bharat mission', 'Explain why cleanliness and sanitation matter for health', 'Describe how an individual can contribute'],
    'Can {{name}} explain what the Swachh Bharat (Clean India) mission is trying to do, and how they can help?', ['nios-obe-c:C102.L20']),
  t('clean-ganga', SS, 'Society & Development', 'The Clean Ganga Mission', 10, 12, 'CONCEPTUAL',
    'Understand the mission to clean the river Ganga — why the river matters to millions of people, how it became polluted, and what is being done to restore it.',
    ['Explain why the Ganga matters to so many people', 'Explain how a river becomes polluted', 'Describe the aim of the Clean Ganga mission'],
    'Can {{name}} explain why the Ganga is so important, and what the mission to clean it is trying to do?', ['nios-obe-c:C102.L20']),
  t('skill-india', SS, 'Society & Development', 'Skill India', 11, 13, 'CONCEPTUAL',
    'Understand the Skill India mission — helping people learn practical skills and trades so they can find work — and why skills matter for a person and for the country’s growth.',
    ['Explain the goal of the Skill India mission', 'Explain how learning a skill helps a person find work', 'Connect skills to the country’s development'],
    'Can {{name}} explain how a mission like Skill India helps people learn skills to get jobs, and why that helps the country?', ['nios-obe-c:C102.L20']),
  t('digital-india', SS, 'Society & Development', 'Digital India', 10, 12, 'CONCEPTUAL',
    'Understand the Digital India mission — bringing internet access and online government services to everyone — and how digital access can make services faster and fairer.',
    ['Explain the goal of the Digital India mission', 'Give an example of a government service delivered online', 'Explain how digital access can help people'],
    'Can {{name}} explain how Digital India tries to bring the internet and online services to everyone, and why that helps?', ['nios-obe-c:C102.L20']),
  // ===================== Indian Geography =====================
  t('india-crops', SS, 'Indian Geography', 'Crops of India', 9, 11, 'CONCEPTUAL',
    'Understand the main crops grown in India — food crops like rice, wheat and pulses, and cash crops like cotton, tea and sugarcane grown to sell.',
    ['Name major Indian food crops and cash crops', 'Distinguish a food crop from a cash crop', 'Match a crop to a region where it grows well'],
    'Can {{name}} name some of India’s main crops and explain the difference between food crops and cash crops?', ['nios-obe-b:B102.L5.3', 'nios-obe-c:C102.L11']),
  t('farming-seasons', SS, 'Indian Geography', 'Farming Seasons: Rabi, Kharif and Zaid', 9, 11, 'CONCEPTUAL',
    'Understand that Indian farming follows seasons tied to the monsoon — Kharif crops sown with the rains, Rabi crops in winter, and Zaid crops in summer.',
    ['Name the Rabi, Kharif and Zaid seasons', 'Match a season to when its crops are sown and harvested', 'Connect the seasons to the monsoon'],
    'Can {{name}} explain the Rabi, Kharif and Zaid farming seasons and how they follow the monsoon?', ['nios-obe-b:B102.L8.3', 'nios-obe-c:C102.L11']),
  t('growing-crops', SS, 'Indian Geography', 'How Crops Are Grown', 9, 11, 'PROCEDURAL',
    'Understand the stages of growing a crop — preparing the soil, sowing seeds, watering (irrigation), adding manure or fertiliser, weeding, protecting the crop, and harvesting.',
    ['List the main stages of growing a crop in order', 'Explain the purpose of irrigation and weeding', 'Explain why crops need protection before harvest'],
    'Can {{name}} describe the steps a farmer follows to grow a crop, from preparing the soil to the harvest?', ['nios-obe-b:B102.L8.2']),
  t('industry-types', SS, 'Indian Geography', 'Types of Industries', 10, 12, 'CONCEPTUAL',
    'Understand that industries come in different sizes and kinds — from home-based cottage industries and small-scale workshops to large heavy industries — and what each produces.',
    ['Name types of industry by size (cottage, small-scale, heavy)', 'Give an example of what each type produces', 'Explain how industries turn raw materials into goods'],
    'Can {{name}} explain the different kinds of industry — from small home crafts to big factories — and what they make?', ['nios-obe-c:C102.L12']),
  // ===================== Culture & Nation =====================
  t('national-flag', SS, 'Culture & Nation', 'The National Flag of India', 5, 7, 'CONCEPTUAL',
    'Know the Indian national flag — its three bands of saffron, white and green with the blue Ashoka Chakra in the middle — and that it stands for the whole country and is treated with respect.',
    ['Describe the colours of the Indian flag and the wheel at its centre', 'Explain that the flag stands for the country', 'Explain that the flag is treated with respect'],
    'Can {{name}} describe the Indian flag — its colours and the wheel in the middle — and explain that it stands for the whole country?', ['nios-obe-a:A102.L11.1']),
  t('national-emblem-animal', SS, 'Culture & Nation', 'The National Emblem and National Animal', 7, 9, 'CONCEPTUAL',
    'Know some of India’s other national symbols — the national emblem (the lion capital of Ashoka), the national animal (the tiger), flower (the lotus) and other symbols — and what they represent.',
    ['Identify the national emblem and its lions', 'Name the national animal, flower and other symbols', 'Explain that these symbols represent the nation'],
    'Can {{name}} name a few of India’s national symbols — like the emblem with the lions and the tiger — and what they stand for?', ['nios-obe-a:A102.L11.1']),
  t('national-anthem', SS, 'Culture & Nation', 'The National Anthem and National Song', 7, 9, 'CONCEPTUAL',
    'Know that India has a national anthem (Jana Gana Mana) and a national song (Vande Mataram), that they are sung with respect, and that they help bring people together as one nation.',
    ['Name the national anthem and national song', 'Explain that the anthem is sung standing, with respect', 'Explain how shared songs help unite people'],
    'Can {{name}} name India’s national anthem, and explain why people stand and show respect when it is sung?', ['nios-obe-a:A102.L11.2']),
  // ===================== Transport & Communication =====================
  t('road-rail-transport', SS, 'Transport & Communication', 'Road and Rail Transport', 6, 8, 'CONCEPTUAL',
    'Understand how people and goods travel over land — by road (buses, cars, trucks) and by rail — and when each is useful for a journey.',
    ['Give examples of road and rail transport', 'Explain when rail is better than road, or the reverse', 'Explain that land transport carries both people and goods'],
    'Can {{name}} give examples of travelling by road and by rail, and say when a train might be better than a bus or truck?', ['nios-obe-a:A102.L10.2']),
  t('water-air-transport', SS, 'Transport & Communication', 'Water and Air Transport', 6, 8, 'CONCEPTUAL',
    'Understand how people and goods travel by water (boats and ships) and by air (aeroplanes), and why these are useful for crossing seas or travelling long distances quickly.',
    ['Give examples of water and air transport', 'Explain when water or air transport is the best choice', 'Explain that heavy goods often go by ship and urgent trips by air'],
    'Can {{name}} give examples of travelling by water and by air, and say when you might choose a ship or a plane?', ['nios-obe-a:A102.L10.2']),
  t('transport-history', SS, 'Transport & Communication', 'How Transport Has Changed Over Time', 6, 8, 'CONCEPTUAL',
    'Understand that transport has changed enormously over time — from walking and animals, to carts and boats, to trains, cars and aeroplanes — making journeys faster and easier.',
    ['Order some forms of transport from oldest to newest', 'Explain how transport has become faster over time', 'Give an example of how better transport changed people’s lives'],
    'Can {{name}} explain how the way people travel has changed over time, from walking and animals to trains and planes?', ['nios-obe-a:A102.L10.1']),
  // ===================== Science =====================
  t('how-diseases-spread', SCI, 'The Human Body', 'How Diseases Spread', 9, 11, 'CONCEPTUAL',
    'Understand that communicable diseases spread from person to person — through the air, water, food, touch, or insects like mosquitoes — and that knowing how they spread helps us stop them.',
    ['Explain that communicable diseases spread from person to person', 'Name ways diseases spread (air, water, insects, touch)', 'Explain how knowing the route of spread helps prevention'],
    'Can {{name}} explain how catching diseases work — that they spread through things like air, water, or mosquito bites?', ['nios-obe-b:B102.L14.2']),
  t('non-communicable-diseases', SCI, 'The Human Body', 'Non-Communicable Diseases', 9, 11, 'CONCEPTUAL',
    'Understand that some diseases — like diabetes, heart disease and cancer — do not spread from person to person, and that lifestyle and other factors affect the risk of getting them.',
    ['Give examples of non-communicable diseases', 'Explain that these do not spread between people', 'Explain that lifestyle can affect the risk'],
    'Can {{name}} explain that some diseases, like diabetes or heart disease, are not caught from other people?', ['nios-obe-b:B102.L14.3']),
  t('preventing-disease', SCI, 'The Human Body', 'Preventing Disease', 9, 11, 'PROCEDURAL',
    'Understand the main ways to prevent disease — good hygiene, clean food and water, vaccination, care around sick people, and avoiding harmful substances like tobacco and alcohol.',
    ['Name several ways to prevent disease', 'Explain how vaccination protects against illness', 'Explain why avoiding tobacco and alcohol protects health'],
    'Can {{name}} name ways to stay healthy and avoid disease — like hygiene, clean water, and vaccination?', ['nios-obe-b:B102.L14.4']),
  t('keeping-food-safe', SCI, 'The Human Body', 'Keeping Food Safe', 7, 9, 'PROCEDURAL',
    'Understand that food must be kept clean, fresh and properly stored to stop germs growing — covering food, washing it, cooking it well, and storing it correctly.',
    ['Explain why food should be covered, washed and cooked well', 'Describe a way to store food so it stays safe', 'Explain how unsafe food can make people ill'],
    'Can {{name}} explain how to keep food safe to eat — covering it, washing it, and storing it properly?', ['nios-obe-a:A102.L8.4', 'nios-obe-b:B102.L12.3']),
  t('clean-drinking-water', SCI, 'The Human Body', 'Clean Water to Drink', 7, 9, 'CONCEPTUAL',
    'Understand that drinking water must be clean and safe, that dirty water can carry germs and cause illness, and know simple ways to make water safe — boiling, filtering and safe storage.',
    ['Explain why drinking water must be clean', 'Explain how dirty water can make people ill', 'Name a way to make water safe to drink (boiling, filtering)'],
    'Can {{name}} explain why drinking water needs to be clean, and name a way to make water safe, like boiling it?', ['nios-obe-a:A102.L8.5']),
  // ===================== Computing =====================
  t('input-devices', COMP, 'Computer Basics', 'Input Devices', 8, 10, 'CONCEPTUAL',
    'Understand that input devices put information into a computer — the keyboard for typing, the mouse for pointing, the microphone for sound, and cameras and scanners for images.',
    ['Name several input devices and what each is for', 'Explain what "input" means for a computer', 'Sort devices into input and not-input'],
    'Can {{name}} name devices that put information into a computer — like the keyboard and mouse — and say what each does?', ['nios-obe-a:A104.L3']),
  t('output-devices', COMP, 'Computer Basics', 'Output Devices', 8, 10, 'CONCEPTUAL',
    'Understand that output devices get information out of a computer — the screen shows pictures and text, the printer makes paper copies, and the speaker plays sound.',
    ['Name several output devices and what each is for', 'Explain what "output" means for a computer', 'Distinguish output devices from input devices'],
    'Can {{name}} name devices that get information out of a computer — like the screen, printer and speaker?', ['nios-obe-a:A104.L3']),
  t('storage-devices', COMP, 'Computer Basics', 'Storage Devices', 8, 10, 'CONCEPTUAL',
    'Understand that storage devices keep information so it can be used later — the computer’s internal disk, USB pen drives, and memory cards — even when the computer is switched off.',
    ['Name several storage devices', 'Explain that storage keeps information for later', 'Explain why storage keeps data even when the power is off'],
    'Can {{name}} name devices that store information for later — like a USB drive — and explain what storage is for?', ['nios-obe-a:A104.L3']),
];

// ---------------------------------------------------------------------------
// Edges: each micro-topic hangs off its coarse overview (soft), plus a few
// sibling/dependency links within a cluster.
// ---------------------------------------------------------------------------
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  // Governance
  soft('govt-ways-governed', OV.democracy, 'Comparing forms of government builds on the democracy-and-government overview'),
  soft('govt-legislature', OV.democracy, 'The legislature is one organ of the government introduced in the overview'),
  soft('govt-executive', OV.democracy, 'The executive is one organ of the government introduced in the overview'),
  soft('govt-judiciary', OV.democracy, 'The judiciary is one organ of the government introduced in the overview'),
  soft('govt-legislature', 'govt-ways-governed', 'The organs of government are studied once democracy is understood'),
  soft('govt-state', OV.democracy, 'State government mirrors the national government at the state level'),
  soft('rights-fundamental', OV.constitution, 'Fundamental rights are set out by the Constitution'),
  soft('duties-fundamental', OV.constitution, 'Fundamental duties are set out by the Constitution'),
  soft('duties-fundamental', 'rights-fundamental', 'Duties are the counterpart of rights'),
  soft('panchayat-gram', OV.panchayat, 'The gram panchayat is the base of the Panchayati Raj system'),
  hard('panchayat-levels', 'panchayat-gram', 'The higher panchayat levels build up from the gram panchayat'),
  soft('urban-local-govt', OV.panchayat, 'Urban local government is the town counterpart of village panchayats'),
  soft('universal-franchise', OV.elections, 'Universal franchise is the basis of the elections overview'),
  soft('political-parties', OV.elections, 'Parties contest the elections introduced in the overview'),
  hard('how-elections-work', 'universal-franchise', 'How an election runs builds on the idea of one person, one vote'),
  soft('how-elections-work', 'political-parties', 'Elections choose between the parties on offer'),
  // Society & Development
  soft('india-languages', OV.unity, 'India’s languages are one strand of its diversity'),
  soft('india-cultures-religions', OV.unity, 'India’s cultures and religions are one strand of its diversity'),
  soft('threads-of-unity', OV.unity, 'The threads of unity build on the unity-in-diversity overview'),
  soft('threads-of-unity', 'india-languages', 'Unity is understood against the backdrop of many languages'),
  soft('living-in-peace', 'threads-of-unity', 'Living in peace builds on what unites a diverse society'),
  soft('equality-women', OV.equality, 'Women’s equality is a strand of the gender-equality overview'),
  soft('equality-women', 'mt_mDp-1vlL3R', 'Gender equality builds on the idea of fairness and equality'),
  soft('girls-education', OV.equality, 'Girls’ education is a strand of the gender-equality overview'),
  soft('ending-harmful-customs', OV.equality, 'Ending harmful customs is part of building a fairer society'),
  soft('the-small-family', OV.equality, 'The small family is one of the social concerns in the overview'),
  soft('population-growth', OV.population, 'Population growth builds on the population overview'),
  soft('birth-death-sex-ratio', 'population-growth', 'The measures of population build on understanding population growth'),
  soft('swachh-bharat', OV.schemes, 'Swachh Bharat is one of the national development schemes'),
  soft('clean-ganga', OV.schemes, 'The Clean Ganga mission is one of the national development schemes'),
  soft('skill-india', OV.schemes, 'Skill India is one of the national development schemes'),
  soft('digital-india', OV.schemes, 'Digital India is one of the national development schemes'),
  soft('swachh-bharat', 'mt_uof32CdhYK', 'Swachh Bharat applies everyday hygiene at national scale'),
  // Geography
  soft('india-crops', OV.agriculture, 'The crops of India build on the agriculture overview'),
  soft('farming-seasons', OV.agriculture, 'The farming seasons build on the agriculture overview'),
  soft('farming-seasons', 'mt_qNSCvaxZKR', 'The farming seasons follow the monsoon'),
  soft('growing-crops', OV.agriculture, 'The stages of growing a crop build on the agriculture overview'),
  soft('industry-types', OV.industries, 'The types of industry build on the industries overview'),
  // Culture & Nation
  soft('national-flag', OV.natSymbols, 'The flag is one of the national symbols in the overview'),
  soft('national-emblem-animal', OV.natSymbols, 'The emblem and animal are national symbols in the overview'),
  soft('national-anthem', OV.natSymbols, 'The anthem and song are national symbols in the overview'),
  // Transport
  soft('road-rail-transport', OV.transport, 'Land transport is one mode from the transport overview'),
  soft('water-air-transport', OV.transport, 'Water and air are modes from the transport overview'),
  soft('transport-history', OV.transport, 'How transport changed builds on the transport overview'),
  // Science
  soft('how-diseases-spread', OV.diseases, 'How diseases spread builds on the diseases overview'),
  soft('non-communicable-diseases', OV.diseases, 'Non-communicable diseases are one half of the diseases overview'),
  soft('preventing-disease', OV.diseases, 'Preventing disease builds on the diseases overview'),
  soft('preventing-disease', 'how-diseases-spread', 'Prevention builds on knowing how diseases spread'),
  soft('keeping-food-safe', OV.safeFood, 'Keeping food safe is one half of the safe-food-and-water overview'),
  soft('clean-drinking-water', OV.safeFood, 'Clean drinking water is one half of the safe-food-and-water overview'),
  // Computing
  soft('input-devices', OV.ioDevices, 'Input devices are one group from the devices overview'),
  soft('output-devices', OV.ioDevices, 'Output devices are one group from the devices overview'),
  soft('storage-devices', OV.ioDevices, 'Storage devices are one group from the devices overview'),
];

// ===========================================================================
// Apply (idempotent).
// ===========================================================================
const topicsDoc = load('topics.json');
const depsDoc = load('dependencies.json');
const stdDoc = load('curriculum-standards.json');
const report = { topics: 0, edges: 0, warnings: 0 };

const validStandardKeys = new Set(stdDoc.curricula.flatMap((cur) => cur.topics.map((s) => s.key)));
const slugToId = Object.fromEntries(newTopics.map((x) => [x._slug, mintId(x._slug)]));
const resolveRef = (ref) => slugToId[ref] ?? ref;

const existingIds = new Set(topicsDoc.topics.map((x) => x.id));
for (const nt of newTopics) {
  const id = slugToId[nt._slug];
  if (existingIds.has(id)) continue;
  for (const k of nt.standards) if (!validStandardKeys.has(k)) { console.error(`  ! ${nt._slug} unknown standard ${k}`); report.warnings++; }
  topicsDoc.topics.push({ id, type: nt.type, subject: nt.subject, domain: nt.domain, name: nt.name, description: nt.description, ageRangeStart: nt.ageRangeStart, ageRangeEnd: nt.ageRangeEnd, centrality: null, evidence: nt.evidence, assessmentPrompt: nt.assessmentPrompt, standards: nt.standards });
  existingIds.add(id); report.topics++;
}
topicsDoc.topicCount = topicsDoc.topics.length;

const byId = new Map(topicsDoc.topics.map((x) => [x.id, x]));
const edgeSeen = new Set(depsDoc.dependencies.map((d) => `${d.topicId}>${d.prerequisiteId}`));
for (const e of newEdges) {
  const topicId = resolveRef(e.t), prerequisiteId = resolveRef(e.p);
  if (!byId.has(topicId)) { console.error(`  ! edge topicId missing: ${e.t}`); report.warnings++; continue; }
  if (!byId.has(prerequisiteId)) { console.error(`  ! edge prerequisiteId missing: ${e.p}`); report.warnings++; continue; }
  const k = `${topicId}>${prerequisiteId}`;
  if (edgeSeen.has(k)) continue;
  depsDoc.dependencies.push({ topicId, prerequisiteId, strength: e.strength, reason: e.reason });
  edgeSeen.add(k); report.edges++;
}
depsDoc.edgeCount = depsDoc.dependencies.length;

saveFile('topics.json', topicsDoc);
saveFile('dependencies.json', depsDoc);
console.log('✓ India-specific decomposition (depth pass 2 — civics, society, geography):');
console.log(`  new micro-topics : ${report.topics}`);
console.log(`  new edges        : ${report.edges}`);
if (report.warnings) console.log(`  warnings         : ${report.warnings}`);
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
