#!/usr/bin/env node
/**
 * build/nios-obe-in-depth.mjs — decompose the India-specific content added from
 * NIOS Levels B/C to the taxonomy's own micro-topic grain. Idempotent.
 *
 * Why: the NIOS integration (scripts/build/nios-obe-bc.mjs) added Indian history
 * at "one topic per era" grain — e.g. the whole Indus Valley Civilisation as a
 * single topic. But the taxonomy decomposes ONE ancient civilization into ~29
 * micro-topics (Ancient Egypt) graduated across ages 5–14, each a single
 * teachable idea. This script brings Indian history/geography up to that grain:
 * the coarse "overview" topics from nios-obe-bc.mjs stay as age-appropriate entry
 * points, and specific micro-topics are added beneath them and wired to them.
 *
 * Run after nios-obe-bc.mjs, then `node scripts/manifest.mjs && node scripts/validate.mjs`.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));
const saveFile = (name, obj) => writeFileSync(resolve(DATA, name), JSON.stringify(obj, null, 2) + '\n');

const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const mintIdNs = (ns, slug) => {
  const h = createHash('sha256').update(`${ns}:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};
const mintId = (slug) => mintIdNs('nios-obe', slug); // shared B/C/depth namespace

const HIST = 'History', SS = 'Social Studies';
// Authoring helper — keeps each entry to the fields a topic needs.
const t = (_slug, subject, domain, name, ageRangeStart, ageRangeEnd, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject, domain, name, ageRangeStart, ageRangeEnd, type, description, evidence, assessmentPrompt, standards });

const C1 = 'nios-obe-c:C102.L1', C2 = 'nios-obe-c:C102.L2', C3 = 'nios-obe-c:C102.L3', C4 = 'nios-obe-c:C102.L4',
  C5 = 'nios-obe-c:C102.L5', C6 = 'nios-obe-c:C102.L6', C7 = 'nios-obe-c:C102.L7', C8 = 'nios-obe-c:C102.L8',
  C9 = 'nios-obe-c:C102.L9', C10 = 'nios-obe-c:C102.L10';
const B41 = 'nios-obe-b:B102.L4.1', B42 = 'nios-obe-b:B102.L4.2', B52 = 'nios-obe-b:B102.L5.2', B13 = 'nios-obe-b:B102.L1.3';

const newTopics = [
  // ===================== Ancient India / Indus Valley =====================
  t('indus-cities', HIST, 'Ancient India', 'Cities of the Indus Valley', 5, 7, 'CONCEPTUAL',
    'Know that people built some of the world’s first great cities — Harappa and Mohenjo-daro — beside the rivers of the Indus Valley, long, long ago.',
    ['Name Harappa and Mohenjo-daro as ancient Indus cities', 'Say that these were among the earliest cities in the world', 'Locate the Indus Valley on a simple map'],
    'Can {{name}} name an ancient Indus Valley city like Mohenjo-daro and say that people lived in cities there thousands of years ago?', [C1]),
  t('indus-town-planning', HIST, 'Ancient India', 'Town Planning and Drainage', 7, 9, 'CONCEPTUAL',
    'Understand how carefully the Indus cities were planned — straight streets laid out in a grid, brick houses, and covered drains that carried away dirty water, showing remarkable engineering for their time.',
    ['Describe the grid layout of streets in an Indus city', 'Explain what the covered drains were for', 'Explain why planned drainage shows advanced engineering'],
    'Can {{name}} explain how the Indus Valley cities were carefully planned — with straight streets and covered drains — and why that was so clever for such an ancient people?', [C1]),
  t('indus-great-bath', HIST, 'Ancient India', 'The Great Bath and Granaries', 7, 9, 'CONCEPTUAL',
    'Know about the great public buildings of Mohenjo-daro — the Great Bath, a large watertight tank probably used for rituals, and the granaries where grain was stored for the city.',
    ['Describe the Great Bath and suggest what it may have been used for', 'Explain what granaries were for', 'Recognise that big shared buildings suggest an organised society'],
    'Can {{name}} describe the Great Bath of Mohenjo-daro and explain why large shared buildings tell us the city was well organised?', [C1]),
  t('indus-seals-trade', HIST, 'Ancient India', 'Seals, Crafts and Trade', 9, 11, 'CONCEPTUAL',
    'Understand that the Indus people were skilled crafters and traders — they made carved seals (with a script we still cannot read), beads and pottery, and traded goods over long distances.',
    ['Describe Indus seals and note that their script is undeciphered', 'Give examples of Indus crafts (beads, pottery)', 'Explain the evidence that the Indus people traded over long distances'],
    'Can {{name}} explain what the Indus seals were, and how we know these people were skilled crafters and traders even though we cannot read their writing?', [C1]),
  t('indus-daily-life', HIST, 'Ancient India', 'Daily Life in the Indus Valley', 5, 7, 'CONCEPTUAL',
    'Imagine everyday life in an Indus city — homes with wells and bathrooms, farmers growing wheat and barley, and children playing with clay toys.',
    ['Describe what homes in an Indus city were like', 'Name crops the Indus people grew', 'Give an example of how children may have lived or played'],
    'Can {{name}} describe what everyday life might have been like for a child in an Indus Valley city?', [C1]),
  t('indus-decline', HIST, 'Ancient India', 'The Decline of the Indus Valley', 9, 11, 'CONCEPTUAL',
    'Understand that the Indus cities were eventually abandoned, and that historians debate why — changing rivers, drought, or other causes — using clues from the ruins.',
    ['State that the Indus cities were eventually abandoned', 'Give a possible reason historians suggest for the decline', 'Explain that we reason about the past from evidence, not certainty'],
    'Can {{name}} explain that the great Indus cities were eventually left empty, and give a reason historians think that might have happened?', [C1]),
  // ===================== Ancient India / Vedic =====================
  t('vedic-aryans', HIST, 'Ancient India', 'The Vedic People', 9, 11, 'CONCEPTUAL',
    'Understand that after the Indus cities, a new period began — the Vedic age — named after the Vedas, when people lived in villages, herded cattle and farmed, and gradually formed small kingdoms.',
    ['Explain that the Vedic age is named after the Vedas', 'Describe the village and cattle-herding life of the early Vedic people', 'Place the Vedic age after the Indus Valley in time'],
    'Can {{name}} explain what the Vedic age was and how people lived then — in villages, keeping cattle and farming?', [C2]),
  t('vedic-vedas', HIST, 'Ancient India', 'The Four Vedas', 9, 11, 'REPRESENTATIONAL',
    'Know that the Vedas are ancient texts — the Rig, Sama, Yajur and Atharva Vedas — first passed down by memory and recitation, and that they are among our main sources for this age.',
    ['Name the Vedas as ancient texts and that there are four', 'Explain that they were memorised and recited before being written', 'Explain how the Vedas serve as a historical source'],
    'Can {{name}} explain what the Vedas are, and how they were remembered and passed on before being written down?', [C2]),
  t('vedic-society', HIST, 'Ancient India', 'Vedic Society and Daily Life', 9, 11, 'CONCEPTUAL',
    'Understand how Vedic society was organised — families and clans, work and crafts, and how society grew more divided over time.',
    ['Describe the organisation of Vedic society', 'Give examples of work and crafts of the period', 'Recognise that society became more layered over the Vedic age'],
    'Can {{name}} describe how people in the Vedic age lived and worked together, and how their society was organised?', [C2]),
  t('vedic-epics', HIST, 'Ancient India', 'The Ramayana and Mahabharata', 7, 9, 'CONCEPTUAL',
    'Know the two great epics of ancient India — the Ramayana and the Mahabharata — as famous stories from this period that are still told and loved today.',
    ['Name the Ramayana and Mahabharata as ancient Indian epics', 'Retell a well-known episode from one of them', 'Explain that epics can carry both stories and history'],
    'Can {{name}} name the Ramayana and Mahabharata and tell you a little of what happens in one of these great old stories?', [C2]),
  // ===================== Ancient India / Maurya =====================
  t('maurya-mahajanapadas', HIST, 'Ancient India', 'The Mahajanapadas', 10, 12, 'CONCEPTUAL',
    'Understand that, before the great empires, ancient India was divided into many kingdoms and republics called mahajanapadas, some of which grew powerful — setting the stage for the Maurya Empire.',
    ['Explain what the mahajanapadas were', 'Describe how some grew more powerful than others', 'Connect the rise of powerful kingdoms to the coming Maurya Empire'],
    'Can {{name}} explain that ancient India was once many small kingdoms (the mahajanapadas) before one grew into a great empire?', [C3]),
  t('maurya-chandragupta', HIST, 'Ancient India', 'Chandragupta and Chanakya', 9, 11, 'CONCEPTUAL',
    'Understand how Chandragupta Maurya, guided by his adviser Chanakya (Kautilya), founded the Maurya Empire and united much of the subcontinent under one rule.',
    ['Explain how Chandragupta founded the Maurya Empire', 'Describe the role of the adviser Chanakya', 'Explain what it meant to unite many kingdoms under one empire'],
    'Can {{name}} explain how Chandragupta, helped by his clever adviser Chanakya, built the first great Indian empire?', [C3]),
  t('ashoka-kalinga', HIST, 'Ancient India', 'Ashoka and the Kalinga War', 7, 9, 'CONCEPTUAL',
    'Know the story of Ashoka — a powerful emperor who, after the terrible bloodshed of the Kalinga war, was so filled with sorrow that he turned away from violence towards peace.',
    ['Tell the story of Ashoka and the Kalinga war', 'Explain how the war changed Ashoka’s heart', 'Explain why this makes Ashoka an unusual and famous ruler'],
    'Can {{name}} tell the story of Ashoka — how a mighty emperor gave up war for peace after seeing the suffering of the Kalinga battle?', [C3]),
  t('ashoka-edicts', HIST, 'Ancient India', "Ashoka's Edicts and Dhamma", 9, 11, 'REPRESENTATIONAL',
    'Understand that Ashoka spread his message of dhamma — kindness, honesty and respect for all life — by carving edicts onto pillars and rocks across his empire, which we can still read today.',
    ['Explain what Ashoka’s edicts were and where they were placed', 'Describe the message of dhamma in simple terms', 'Explain how the edicts serve as historical evidence'],
    'Can {{name}} explain how Ashoka carved his messages of kindness onto stone pillars, and what those messages told people to do?', [C3]),
  // ===================== Ancient India / Gupta & South =====================
  t('gupta-empire', HIST, 'Ancient India', 'The Gupta Empire', 10, 12, 'CONCEPTUAL',
    'Understand the Gupta Empire as a time of stable, prosperous rule across much of northern India, often called a golden age for its flourishing in art, learning and trade.',
    ['Explain when and where the Gupta Empire ruled', 'Explain why it is called a golden age', 'Give an example of Gupta prosperity or culture'],
    'Can {{name}} explain what the Gupta Empire was and why it is remembered as a golden age?', [C4]),
  t('gupta-science', HIST, 'Ancient India', 'Gupta Science and Mathematics', 10, 12, 'CONCEPTUAL',
    'Know that the Gupta age produced remarkable advances in mathematics and astronomy — including the idea of zero and the decimal system, and the work of the astronomer Aryabhata.',
    ['Give an example of a mathematical or scientific advance of the Gupta age', 'Explain the importance of the idea of zero', 'Name Aryabhata as an ancient Indian astronomer-mathematician'],
    'Can {{name}} explain that ancient Indian scholars in the Gupta age made big discoveries in maths — like the idea of zero — and name Aryabhata?', [C4]),
  t('harsha', HIST, 'Ancient India', 'Harshavardhana', 10, 12, 'CONCEPTUAL',
    'Know Harshavardhana as one of the last great rulers of ancient northern India, remembered for uniting kingdoms and supporting learning and the arts.',
    ['Place Harshavardhana as a ruler of the late ancient period', 'Describe something he is remembered for', 'Explain that his reign marks the close of the ancient age in the north'],
    'Can {{name}} say who Harshavardhana was and what he is remembered for?', [C4]),
  t('chola-empire', HIST, 'Ancient India', 'The Chola Empire', 10, 12, 'CONCEPTUAL',
    'Understand that the Cholas of southern India built a powerful empire famous for its navy, sea trade across the ocean, and magnificent temples.',
    ['Locate the Chola empire in southern India', 'Describe Chola sea power and trade', 'Give an example of a Chola achievement such as temple building'],
    'Can {{name}} explain who the Cholas were and what made their southern empire powerful — like their ships and sea trade?', [C4]),
  t('south-temples-trade', HIST, 'Ancient India', 'South Indian Temples and Sea Trade', 10, 12, 'CONCEPTUAL',
    'Understand that the kingdoms of the south — Cholas, Cheras and Pandyas — grew rich from trade across the seas and built towering stone temples that still stand today.',
    ['Name the Chera and Pandya kingdoms alongside the Cholas', 'Explain how sea trade brought wealth to the south', 'Describe South Indian temples as lasting achievements'],
    'Can {{name}} explain how the southern kingdoms grew rich from sea trade and built great temples?', [C4]),
  // ===================== Medieval India / Delhi Sultanate =====================
  t('sultanate-founding', HIST, 'Medieval India', 'The Coming of the Turks and the Delhi Sultanate', 10, 12, 'CONCEPTUAL',
    'Understand how, after invasions from the northwest, Turkish rulers established the Delhi Sultanate — beginning with the Slave Dynasty — and ruled much of northern India for centuries.',
    ['Explain how the Delhi Sultanate was established', 'Identify the Slave Dynasty as its beginning', 'Place the Sultanate between the ancient kingdoms and the Mughals'],
    'Can {{name}} explain how the Delhi Sultanate began and that it ruled much of northern India for a long time?', [C5]),
  t('sultanate-admin', HIST, 'Medieval India', 'Administration and Markets of the Sultanate', 11, 13, 'CONCEPTUAL',
    'Understand how the Delhi Sultanate governed — collecting land taxes, running markets and prices, and building an administration to hold a large territory together.',
    ['Describe how the Sultanate raised revenue from land', 'Explain a market or price reform', 'Explain why administration was needed to hold a large empire'],
    'Can {{name}} explain how the Delhi Sultanate governed its lands — collecting taxes and controlling markets?', [C5]),
  t('sultanate-architecture', HIST, 'Medieval India', 'Art and Architecture of the Sultanate', 10, 12, 'REPRESENTATIONAL',
    'Know that the Delhi Sultanate brought new styles of building to India — arches, domes and minarets — seen in monuments like the Qutub Minar.',
    ['Name a monument of the Sultanate such as the Qutub Minar', 'Describe new architectural features (arches, domes, minarets)', 'Explain that architecture blends cultures over time'],
    'Can {{name}} name a building from the Delhi Sultanate, like the Qutub Minar, and describe what made its style new?', [C5]),
  // ===================== Medieval India / Mughals =====================
  t('mughal-babur', HIST, 'Medieval India', 'Babur and the Founding of the Mughal Empire', 10, 12, 'CONCEPTUAL',
    'Understand how Babur, coming from Central Asia, defeated the Sultanate and founded the Mughal Empire, which his descendants expanded across the subcontinent.',
    ['Explain how Babur founded the Mughal Empire', 'Place the Mughals after the Delhi Sultanate', 'Explain that later Mughals expanded the empire'],
    'Can {{name}} explain how Babur founded the Mughal Empire, and that his descendants made it much larger?', [C6]),
  t('mughal-akbar', HIST, 'Medieval India', 'Akbar the Great', 9, 11, 'CONCEPTUAL',
    'Understand why Akbar is remembered as one of India’s greatest rulers — for expanding the empire, organising its government wisely, and treating people of all religions with respect.',
    ['Describe Akbar’s policy of religious tolerance', 'Give an example of his wise government', 'Explain why he is called "the Great"'],
    'Can {{name}} explain why Akbar is remembered as a great ruler — especially how he respected people of all religions?', [C6]),
  t('mughal-architecture', HIST, 'Medieval India', 'Mughal Art and the Taj Mahal', 7, 9, 'REPRESENTATIONAL',
    'Know that the Mughals were great builders and patrons of art — most famously the Taj Mahal, built by Shah Jahan in memory of his wife, and celebrated as one of the world’s most beautiful buildings.',
    ['Identify the Taj Mahal as a Mughal building and who built it', 'Describe a feature of Mughal art or architecture', 'Explain why the Taj Mahal is world-famous'],
    'Can {{name}} tell you about the Taj Mahal — who built it and why — and that the Mughals made beautiful art and buildings?', [C6]),
  t('mughal-life', HIST, 'Medieval India', 'Life in Mughal India', 10, 12, 'CONCEPTUAL',
    'Understand what life was like across the Mughal Empire — its wealth and trade, its bustling cities, and the mix of cultures, languages and foods that grew under Mughal rule.',
    ['Describe trade and cities in Mughal India', 'Give an example of cultural blending under the Mughals', 'Explain that ordinary life differed greatly from the court'],
    'Can {{name}} describe what life was like in Mughal India — its rich cities, trade, and mix of cultures?', [C6]),
  // ===================== Medieval India / Marathas & Rajputs =====================
  t('shivaji-marathas', HIST, 'Medieval India', 'Shivaji and the Marathas', 9, 11, 'CONCEPTUAL',
    'Understand how Shivaji built the Maratha kingdom — a skilled leader known for clever tactics, forts, and challenging Mughal power in the west of India.',
    ['Explain who Shivaji was and what he founded', 'Describe how the Marathas challenged Mughal power', 'Give an example of Maratha strength (forts, tactics)'],
    'Can {{name}} explain who Shivaji was and how the Marathas stood up to the mighty Mughal Empire?', [C6]),
  t('rajput-kingdoms', HIST, 'Medieval India', 'The Rajput Kingdoms', 10, 12, 'CONCEPTUAL',
    'Understand that the Rajputs were warrior clans who ruled many kingdoms, famous for their forts and codes of honour, whose relations with the Mughals swung between war and alliance.',
    ['Identify the Rajputs as warrior clans and rulers', 'Describe their changing relations with the Mughals (war and alliance)', 'Give an example such as a famous fort'],
    'Can {{name}} explain who the Rajputs were, and that they sometimes fought and sometimes allied with the Mughals?', [C6]),
  // ===================== Modern India / British Rule =====================
  t('east-india-company', HIST, 'Modern India', 'The East India Company', 10, 12, 'CONCEPTUAL',
    'Understand that the British East India Company came to India to trade in goods like spices and cloth, set up trading posts, and slowly grew into a power with its own army.',
    ['Explain why the East India Company came to India', 'Describe how a trading company gained an army and power', 'Distinguish trading from ruling'],
    'Can {{name}} explain how the British East India Company came to India just to trade, but gradually became powerful?', [B41, C7]),
  t('company-to-ruler', HIST, 'Modern India', 'From Traders to Rulers', 10, 12, 'CONCEPTUAL',
    'Understand how the East India Company, through battles and treaties, went from trading to actually ruling large parts of India, replacing Indian rulers with Company control.',
    ['Explain how the Company came to rule Indian territory', 'Give an example of expansion by battle or treaty', 'Explain what changed for Indians under Company rule'],
    'Can {{name}} explain how a trading company ended up governing much of India?', [B41, C7]),
  t('british-economic-impact', HIST, 'Modern India', "British Rule and India's Economy", 11, 13, 'CONCEPTUAL',
    'Understand how British rule reshaped India’s economy — raw materials sent to Britain, Indian crafts and industries harmed, farmers pushed to grow cash crops — and the hardship this often caused.',
    ['Describe how British policy affected Indian crafts and industry', 'Explain the shift towards cash crops', 'Connect economic policy to hardship for many Indians'],
    'Can {{name}} explain how British rule changed India’s economy, and why it often made life harder for Indian farmers and crafters?', [C7]),
  t('revolt-1857', HIST, 'Modern India', 'The Revolt of 1857', 10, 12, 'CONCEPTUAL',
    'Understand the revolt of 1857 — a great uprising against Company rule, sometimes called the first war of independence — and how, though it failed, it changed how India was governed.',
    ['Explain what happened in the revolt of 1857', 'Explain why it is sometimes called the first war of independence', 'Describe how British rule changed afterwards (Crown rule)'],
    'Can {{name}} explain what the revolt of 1857 was and why it is an important turning point in India’s history?', [C7]),
  // ===================== Modern India / Freedom Struggle =====================
  t('indian-national-congress', HIST, 'Modern India', 'The Indian National Congress', 11, 13, 'CONCEPTUAL',
    'Understand how Indians organised to demand a say in their own affairs — the founding of the Indian National Congress and the growth of a national movement.',
    ['Explain what the Indian National Congress was', 'Explain why Indians began to organise politically', 'Describe the growth of national feeling'],
    'Can {{name}} explain how Indians came together — through groups like the Congress — to demand a say in how their country was run?', [C8]),
  t('gandhi-nonviolence', HIST, 'Modern India', 'Gandhi and Non-Violent Resistance', 9, 11, 'CONCEPTUAL',
    'Understand how Mahatma Gandhi led the freedom struggle using non-violence (ahimsa) and truth — refusing to obey unjust laws peacefully rather than by fighting.',
    ['Explain Gandhi’s method of non-violent resistance', 'Give an example of a peaceful protest', 'Explain why non-violence was a powerful idea'],
    'Can {{name}} explain how Gandhi fought for freedom without violence — by peacefully refusing to obey unfair rules?', [C8]),
  t('freedom-movements', HIST, 'Modern India', 'Movements for Freedom', 11, 13, 'CONCEPTUAL',
    'Know the great mass movements of the freedom struggle — Non-Cooperation, the Salt March, and Quit India — where millions of ordinary people joined the call for independence.',
    ['Name mass movements such as the Salt March and Quit India', 'Explain what people did in a mass movement', 'Explain how ordinary people shaped the freedom struggle'],
    'Can {{name}} name a freedom movement like the Salt March and explain how ordinary people took part in the struggle for independence?', [C8]),
  t('revolutionaries', HIST, 'Modern India', 'Revolutionaries of the Freedom Struggle', 11, 13, 'CONCEPTUAL',
    'Understand that alongside non-violent movements, some fought British rule through revolutionary and armed struggle, and that the freedom movement had many different paths.',
    ['Explain that some chose armed or revolutionary struggle', 'Contrast this with the non-violent path', 'Explain that the freedom movement included many approaches'],
    'Can {{name}} explain that the fight for freedom had different paths — some peaceful, some through revolution?', [B42, C8]),
  t('partition-independence', HIST, 'Modern India', 'Partition and Independence, 1947', 11, 13, 'CONCEPTUAL',
    'Understand that India won independence on 15 August 1947, that the land was partitioned into India and Pakistan, and the joy and the pain — mass migration and violence — that came with it.',
    ['State when India became independent', 'Explain what the Partition was', 'Explain that independence brought both celebration and suffering'],
    'Can {{name}} explain that India became free in 1947, and that the country was also divided — bringing both joy and great hardship?', [C8]),
  t('reformers-of-india', HIST, 'Modern India', 'Reformers of Modern India', 11, 13, 'CONCEPTUAL',
    'Know some of the reformers who worked to change society for the better — against practices like untouchability and for causes like women’s education — helping awaken the nation.',
    ['Name a social reform cause of the 19th century', 'Explain what a reformer tried to change and why', 'Connect reform to the awakening national spirit'],
    'Can {{name}} give an example of a reformer who worked to make Indian society fairer, and explain what they fought for?', ['nios-obe-c:C102.L7']),
  // ===================== Indian Geography (splits from coarse topics) =====================
  t('india-himalayas-rivers', SS, 'Indian Geography', "The Himalayas and India's Rivers", 9, 11, 'CONCEPTUAL',
    'Understand two of India’s greatest physical features — the Himalayan mountains in the north, and the great rivers like the Ganga and Brahmaputra that flow from them and give life to the plains.',
    ['Locate the Himalayas and name a major river', 'Explain how rivers flow from the mountains to the plains', 'Explain why rivers are vital for farming and settlement'],
    'Can {{name}} name the Himalayas and a great Indian river, and explain why those rivers are so important for the land and its people?', [B52, C9]),
  t('india-monsoon-climate', SS, 'Indian Geography', 'The Monsoon and India’s Climate', 9, 11, 'CONCEPTUAL',
    'Understand the monsoon — the seasonal winds that bring heavy rain to India each year — and how it shapes the seasons, the harvests, and daily life across the country.',
    ['Explain what the monsoon is', 'Describe how the monsoon affects farming and daily life', 'Relate India’s seasons to the monsoon'],
    'Can {{name}} explain what the monsoon is and why the yearly rains matter so much for farming and life in India?', [C9]),
  t('india-forests-wildlife', SS, 'Indian Geography', "India's Forests and Wildlife", 10, 12, 'CONCEPTUAL',
    'Understand that India has rich forests and diverse wildlife — from tigers to elephants — that these are valuable natural resources, and that they need protecting from deforestation.',
    ['Give examples of India’s forests and wildlife', 'Explain why forests and biodiversity matter', 'Explain the threat of deforestation and the need for conservation'],
    'Can {{name}} give examples of India’s forests and wild animals, and explain why we must protect them?', [B13, C9]),
  t('india-minerals-energy', SS, 'Indian Geography', "India's Minerals and Energy", 10, 12, 'CONCEPTUAL',
    'Understand India’s mineral and energy resources — traditional sources like coal and petroleum, and cleaner non-traditional sources like solar and wind — and why using them wisely matters.',
    ['Name mineral and energy resources of India', 'Distinguish traditional from non-traditional energy sources', 'Explain why energy resources must be used wisely'],
    'Can {{name}} name some of India’s energy sources — like coal, and cleaner ones like solar and wind — and explain why using them wisely matters?', [C10]),
];

// ---------------------------------------------------------------------------
// Prerequisite edges. Fine topics hang off the coarse "overview" topics
// (created by nios-obe-bc.mjs, shared `nios-obe` namespace) and chronology.
// ---------------------------------------------------------------------------
const OV = {
  indus: mintId('india-indus-valley'), vedic: mintId('india-vedic-age'), maurya: mintId('india-maurya-empire'),
  gupta: mintId('india-gupta-age'), south: mintId('india-south-kingdoms'), sultanate: mintId('india-delhi-sultanate'),
  mughal: mintId('india-mughal-empire'), marathaRajput: mintId('india-marathas-rajputs'), british: mintId('india-british-rule'),
  freedom: mintId('india-freedom-struggle'), reform: mintId('india-social-reform'),
  physical: mintId('india-physical-features'), resources: mintId('india-natural-resources'),
};
const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  // Indus Valley cluster
  soft('indus-town-planning', 'indus-cities', 'Understanding town planning builds on knowing the Indus cities existed'),
  soft('indus-great-bath', 'indus-town-planning', 'The great public buildings are part of the planned city'),
  soft('indus-seals-trade', 'indus-cities', 'Crafts and trade are studied once the cities are known'),
  soft('indus-daily-life', 'indus-cities', 'Everyday life is set within the Indus cities'),
  hard('indus-decline', 'indus-cities', 'The decline of the cities presupposes knowing they flourished'),
  soft('indus-cities', OV.indus, 'A specific look at the Indus cities builds on the overview of the civilisation'),
  // Vedic cluster
  soft('vedic-aryans', OV.vedic, 'The Vedic people build on the overview of the Vedic age'),
  soft('vedic-aryans', 'indus-decline', 'The Vedic age follows the decline of the Indus cities'),
  soft('vedic-vedas', 'vedic-aryans', 'The Vedas belong to the Vedic people just introduced'),
  soft('vedic-society', 'vedic-aryans', 'Vedic society develops the picture of the Vedic people'),
  soft('vedic-epics', 'vedic-aryans', 'The epics come from the Vedic period'),
  // Maurya cluster
  soft('maurya-mahajanapadas', OV.maurya, 'The mahajanapadas set the stage covered in the Maurya overview'),
  soft('maurya-mahajanapadas', 'vedic-society', 'Kingdoms grow out of later Vedic society'),
  hard('maurya-chandragupta', 'maurya-mahajanapadas', 'The empire is founded by uniting the mahajanapadas'),
  hard('ashoka-kalinga', 'maurya-chandragupta', 'Ashoka rules the empire Chandragupta founded'),
  soft('ashoka-edicts', 'ashoka-kalinga', 'The edicts spread the message Ashoka embraced after Kalinga'),
  // Gupta & South
  soft('gupta-empire', OV.gupta, 'A closer look at the Guptas builds on the Gupta overview'),
  soft('gupta-empire', 'ashoka-kalinga', 'The Guptas rise well after the Mauryas in chronology'),
  soft('gupta-science', 'gupta-empire', 'Gupta science flourished under the stable Gupta Empire'),
  soft('harsha', 'gupta-empire', 'Harshavardhana ruled after the Guptas'),
  soft('chola-empire', OV.south, 'The Cholas are a specific southern kingdom from the overview'),
  soft('south-temples-trade', 'chola-empire', 'Southern temples and trade build on knowing the Chola empire'),
  // Delhi Sultanate
  soft('sultanate-founding', OV.sultanate, 'A closer look builds on the Delhi Sultanate overview'),
  soft('sultanate-founding', 'harsha', 'Medieval rule follows the last ancient northern kings'),
  hard('sultanate-admin', 'sultanate-founding', 'Administration presupposes the Sultanate being established'),
  soft('sultanate-architecture', 'sultanate-founding', 'Sultanate architecture is studied once its rule is known'),
  // Mughals
  hard('mughal-babur', 'sultanate-founding', 'The Mughals defeat and follow the Delhi Sultanate'),
  soft('mughal-babur', OV.mughal, 'Babur’s founding builds on the Mughal overview'),
  hard('mughal-akbar', 'mughal-babur', 'Akbar rules the empire Babur founded'),
  soft('mughal-architecture', 'mughal-akbar', 'Mughal art flourished under emperors like Akbar and Shah Jahan'),
  soft('mughal-life', 'mughal-akbar', 'Everyday Mughal life is set in the established empire'),
  // Marathas & Rajputs
  soft('shivaji-marathas', OV.marathaRajput, 'Shivaji builds on the Marathas and Rajputs overview'),
  soft('shivaji-marathas', 'mughal-akbar', 'The Marathas rose to challenge Mughal power'),
  soft('rajput-kingdoms', 'mughal-akbar', 'Rajput–Mughal relations presuppose knowing the Mughals'),
  // British rule
  soft('east-india-company', OV.british, 'A closer look builds on the British Rule overview'),
  soft('east-india-company', 'mughal-life', 'The Company arrives as Mughal power wanes'),
  hard('company-to-ruler', 'east-india-company', 'The Company becomes a ruler after arriving to trade'),
  hard('british-economic-impact', 'company-to-ruler', 'Economic impact follows the Company taking control'),
  hard('revolt-1857', 'company-to-ruler', 'The 1857 revolt is a response to Company rule'),
  // Freedom struggle
  hard('indian-national-congress', 'revolt-1857', 'Organised nationalism grows after 1857 and Crown rule'),
  soft('indian-national-congress', OV.freedom, 'A closer look builds on the Freedom Struggle overview'),
  hard('gandhi-nonviolence', 'indian-national-congress', 'Gandhi led the movement the Congress had begun'),
  hard('freedom-movements', 'gandhi-nonviolence', 'The mass movements were largely led by Gandhi'),
  soft('revolutionaries', 'indian-national-congress', 'The revolutionary path is one strand of the national movement'),
  hard('partition-independence', 'freedom-movements', 'Independence in 1947 is the outcome of the freedom movements'),
  soft('reformers-of-india', OV.reform, 'Named reformers build on the reform-and-awakening overview'),
  soft('reformers-of-india', 'british-economic-impact', 'Reform movements grew under British rule'),
  // Geography splits
  soft('india-himalayas-rivers', OV.physical, 'A closer look at mountains and rivers builds on the physical-features overview'),
  soft('india-monsoon-climate', OV.physical, 'The monsoon is part of India’s climate and physical geography'),
  soft('india-monsoon-climate', 'india-himalayas-rivers', 'The monsoon and the rivers together shape the land'),
  soft('india-forests-wildlife', OV.resources, 'Forests and wildlife are natural resources from the overview'),
  soft('india-minerals-energy', OV.resources, 'Minerals and energy are natural resources from the overview'),
];

// ---------------------------------------------------------------------------
// New clusters for new (subject, domain, ageRangeStart) bands.
// ---------------------------------------------------------------------------
const newClusters = [
  { subject: HIST, domain: 'Ancient India', ageRangeStart: 5, summary: 'Your child is meeting the earliest Indians — the great cities of the Indus Valley, what daily life was like there, and the famous story of the emperor Ashoka.' },
  { subject: HIST, domain: 'Ancient India', ageRangeStart: 7, summary: 'Your child is looking closely at ancient India — the clever town planning of the Indus cities, the great epics, and how a mighty emperor chose peace after a terrible war.' },
  { subject: HIST, domain: 'Medieval India', ageRangeStart: 7, summary: 'Your child is exploring medieval India through its art and buildings — most famously the Taj Mahal, built by the Mughals.' },
  { subject: HIST, domain: 'Medieval India', ageRangeStart: 9, summary: 'Your child is getting to know the rulers of medieval India — the great Akbar, and Shivaji who built the Maratha kingdom and stood up to the Mughals.' },
  { subject: HIST, domain: 'Modern India', ageRangeStart: 9, summary: 'Your child is learning how India won its freedom — above all how Mahatma Gandhi led the struggle peacefully, without violence.' },
];

// ===========================================================================
// Apply (idempotent).
// ===========================================================================
const topicsDoc = load('topics.json');
const depsDoc = load('dependencies.json');
const stdDoc = load('curriculum-standards.json');
const clustersDoc = load('clusters.json');
const report = { topics: 0, edges: 0, clusters: 0, warnings: 0 };

const validStandardKeys = new Set(stdDoc.curricula.flatMap((cur) => cur.topics.map((s) => s.key)));
const slugToId = Object.fromEntries(newTopics.map((x) => [x._slug, mintId(x._slug)]));
const resolveRef = (ref) => slugToId[ref] ?? ref; // ref may be a slug or an already-minted id

const existingIds = new Set(topicsDoc.topics.map((x) => x.id));
for (const nt of newTopics) {
  const id = slugToId[nt._slug];
  if (existingIds.has(id)) continue;
  for (const k of nt.standards) if (!validStandardKeys.has(k)) { console.error(`  ! ${nt._slug} references unknown standard ${k}`); report.warnings++; }
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

const clusterSeen = new Set(clustersDoc.clusters.map((cl) => `${cl.subject}|${cl.domain}|${cl.ageRangeStart}`));
for (const cl of newClusters) {
  const k = `${cl.subject}|${cl.domain}|${cl.ageRangeStart}`;
  if (clusterSeen.has(k)) continue;
  clustersDoc.clusters.push(cl); clusterSeen.add(k); report.clusters++;
}
clustersDoc.clusterCount = clustersDoc.clusters.length;

saveFile('topics.json', topicsDoc);
saveFile('dependencies.json', depsDoc);
saveFile('clusters.json', clustersDoc);
console.log('✓ India-specific decomposition (depth pass):');
console.log(`  new micro-topics : ${report.topics}`);
console.log(`  new edges        : ${report.edges}`);
console.log(`  new clusters     : ${report.clusters}`);
if (report.warnings) console.log(`  warnings         : ${report.warnings}`);
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
