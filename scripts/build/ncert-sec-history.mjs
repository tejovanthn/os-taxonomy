#!/usr/bin/env node
/**
 * build/ncert-sec-history.mjs — NCERT History, Classes IX–X ("India and the
 * Contemporary World" I and II), at theme grain. The taxonomy previously
 * carried only three broad Modern World topics at this age, so this is the
 * one genuinely content-adding subject in the IX–X pass. Each NCERT theme is
 * decomposed into its distinct teachable ideas rather than shipped as a single
 * bundler topic. Descriptions are Marble-authored factual scope summaries (no
 * NCERT text — see PROVENANCE). Idempotent.
 */

import { integrateNcertSec } from './ncert-sec.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

const standards = [
  // ---- Class IX: India and the Contemporary World I ----
  s('HIS.C9.FR', 'IX', 'Events and Processes', 'The French Revolution: the ancien régime and its crises, the social forces behind the revolution, the revolutionary groups and ideas, and the legacy.'),
  s('HIS.C9.RR', 'IX', 'Events and Processes', 'The Russian Revolution: the crisis of Tsarism, social movements between 1905 and 1917, the First World War and the founding of the Soviet state, and the legacy.'),
  s('HIS.C9.NAZI', 'IX', 'Events and Processes', 'The rise of Nazism: the growth of social democracy, the crisis in Germany, the basis of Hitler’s rise to power, the ideology of Nazism and its impact.'),
  s('HIS.C9.PAST', 'IX', 'Economies and Livelihoods', 'Pastoralists in the modern world: pastoralism as a way of life, its different forms, and what happens to it under colonialism and modern states.'),
  s('HIS.C9.FOREST', 'IX', 'Economies and Livelihoods', 'Forest society and colonialism: the relationship between forests and livelihoods, and changes in forest societies under colonial scientific forestry.'),
  s('HIS.C9.FARM', 'IX', 'Economies and Livelihoods', 'Farmers and peasants: the emergence of different forms of farming and peasant society, and changes within rural economies in the modern world.'),
  s('HIS.C9.CRICKET', 'IX', 'Culture, Identity and Society', 'Sports and politics through the story of cricket: its emergence as an English sport, its spread under colonialism, and cricket, nationalism and decolonisation.'),
  s('HIS.C9.CLOTH', 'IX', 'Culture, Identity and Society', 'Clothes and cultures: a short history of changes in clothing, debates over clothing in colonial India, and Swadeshi and the movement for khadi.'),
  // ---- Class X: India and the Contemporary World II ----
  s('HIS.C10.EURNAT', 'X', 'Events and Processes', 'Nationalism in Europe: the growth of nationalism after the 1830s, the ideas of Mazzini, and the general character of movements in Poland, Hungary, Italy, Germany and Greece.'),
  s('HIS.C10.INDOCHINA', 'X', 'Events and Processes', 'The nationalist movement in Indo-China: French colonialism, the phases of struggle against the French, the second world war and the liberation struggle.'),
  s('HIS.C10.INDNAT', 'X', 'Events and Processes', 'Nationalism in India: the First World War, Khilafat and Non-Cooperation; the Salt Satyagraha; movements of peasants, workers and tribals; the activities of different political groups.'),
  s('HIS.C10.INDUS', 'X', 'Economies and Livelihoods', 'Industrialisation from the 1850s to the 1950s: the contrast between industrialisation in Britain and in India, handicrafts and industrial production, and the livelihood of workers.'),
  s('HIS.C10.URBAN', 'X', 'Economies and Livelihoods', 'Urbanisation and urban lives: patterns of urbanisation, migration and the growth of towns, social change and urban life, studied through London and Bombay.'),
  s('HIS.C10.GLOBAL', 'X', 'Economies and Livelihoods', 'Trade and globalisation: expansion of the world market in the nineteenth century, trade between the wars, shifts after the 1950s, and the implications for livelihoods.'),
  s('HIS.C10.PRINT', 'X', 'Culture, Identity and Society', 'Print culture and nationalism: the history of print in Europe, the growth of the press in nineteenth-century India, and the link between print, public debate and politics.'),
  s('HIS.C10.NOVEL', 'X', 'Culture, Identity and Society', 'The history of the novel: its emergence as a genre in the west, its relationship with changes in modern society, and early novels in nineteenth-century India.'),
];

const alignments = {
  'mt_sVnzpPPhUg': ['HIS.C9.FR', 'HIS.C10.EURNAT', 'HIS.C10.INDUS'],  // The Making of the Modern World
  'mt_7P4EsEbQpI': ['HIS.C9.FR', 'HIS.C9.RR'],                         // Revolutions and the Modern Age
  'mt_mUDHsziRvs': ['HIS.C9.NAZI', 'HIS.C10.INDOCHINA'],               // World Wars and Decolonisation
  'mt_Jd2NQIbpjV': ['HIS.C10.INDNAT'],                                 // India's Freedom Struggle
  'mt_XgBJu5fJiR': ['HIS.C10.INDNAT'],                                 // Movements for Freedom
  'mt_ijRSgBBd0W': ['HIS.C10.INDNAT'],                                 // Gandhi and Non-Violent Resistance
  'mt_612ezPQBl1': ['HIS.C10.INDNAT'],                                 // The Indian National Congress
  'mt_zyOZjpvokG': ['HIS.C10.INDNAT'],                                 // Revolutionaries of the Freedom Struggle
  'mt_ZCwHKy4rEZ': ['HIS.C10.INDUS'],                                  // British Rule and India's Economy
  'mt_gM1adZDGIy': ['HIS.C10.INDUS'],                                  // British Rule in India
  'mt_t6BQm5x5Su': ['HIS.C10.PRINT'],                                  // Reform and Awakening in 19th-Century India
  'mt_YIyFqxPOYN': ['HIS.C10.PRINT'],                                  // Reformers of Modern India
  'mt_Lu4H4mbsqO': ['HIS.C9.FR', 'HIS.C10.PRINT'],                     // Evidence Versus Interpretation
  'mt_2GDBmKCJxs': ['HIS.C9.NAZI'],                                    // Different Accounts of the Same Event
  'mt_wWlZoLQBR6': ['HIS.C10.INDNAT'],                                 // Checking Sources Against Each Other
};

const EV = (a, b, c) => [a, b, c];
const MW = 'Modern World';
const MI = 'Modern India';

const t = (slug, name, domain, ageStart, ageEnd, type, description, evidence, prompt, standards) =>
  ({ _slug: slug, name, subject: 'History', domain, ageRangeStart: ageStart, ageRangeEnd: ageEnd, type, description, evidence, assessmentPrompt: prompt, standards });

const newTopics = [
  // --- French Revolution ---
  t('ancien-regime-crisis', 'The Ancien Régime and Its Crisis', MW, 14, 15, 'CONCEPTUAL',
    'Understand how French society was divided into privileged and taxed orders, and how debt, food shortage and resentment at privilege combined into a crisis the monarchy could not settle.',
    EV('Describes how French society was divided before 1789', 'Names economic pressures that deepened the crisis', 'Explains why the tax burden fell on those least able to bear it'),
    'Ask {{name}} who paid the taxes in France before the revolution and who did not, and why that caused anger.',
    ['ncert-sec:HIS.C9.FR']),
  t('french-revolution-ideas', 'The French Revolution and Its Ideas', MW, 14, 15, 'CONCEPTUAL',
    'Understand that the revolution was driven by competing groups rather than one united movement, and that it put liberty, equality and citizenship at the centre of political argument.',
    EV('Names the main revolutionary groups and how their aims differed', 'Explains what liberty and equality meant to revolutionaries', 'Describes how the revolution changed who counted as a citizen'),
    'Ask {{name}} what the revolutionaries in France meant by liberty and equality, and whether everyone got them.',
    ['ncert-sec:HIS.C9.FR']),
  t('french-revolution-legacy', 'The Legacy of the French Revolution', MW, 14, 15, 'CONCEPTUAL',
    'Understand that the revolution spread ideas of rights, nationhood and popular sovereignty far beyond France, including into colonies where they were used against European rule.',
    EV('Traces one revolutionary idea into a later movement', 'Explains why colonised people found these ideas useful', 'Judges what the revolution did and did not change'),
    'Ask {{name}} why ideas from a revolution in France mattered to people living far away from it.',
    ['ncert-sec:HIS.C9.FR']),
  // --- Russian Revolution ---
  t('crisis-of-tsarist-russia', 'The Crisis of Tsarist Russia', MW, 14, 15, 'CONCEPTUAL',
    'Understand the conditions of peasants and workers under autocratic Tsarist rule, and how repression and war turned economic hardship into political crisis.',
    EV('Describes conditions for workers and peasants before 1917', 'Explains why 1905 did not end the crisis', 'Links the First World War to the collapse of Tsarist authority'),
    'Ask {{name}} why people in Russia turned against the Tsar, and what part the war played.',
    ['ncert-sec:HIS.C9.RR']),
  t('russian-revolution-1917', 'The Russian Revolution of 1917', MW, 14, 15, 'CONCEPTUAL',
    'Understand that 1917 saw two distinct upheavals — the fall of the monarchy and the Bolshevik seizure of power — driven by demands for bread, land and peace.',
    EV('Distinguishes the February and October events of 1917', 'States the main demands the revolution rallied around', 'Explains how the Bolsheviks came to hold power'),
    'Ask {{name}} what people in Russia were demanding in 1917 and who ended up in charge.',
    ['ncert-sec:HIS.C9.RR']),
  t('making-of-soviet-state', 'The Making of the Soviet State', MW, 14, 15, 'CONCEPTUAL',
    'Understand how the new Soviet state reorganised land, industry and society along socialist lines, and why the revolution became a model and a warning elsewhere in the world.',
    EV('Describes changes to land and industry after the revolution', 'Explains why socialism attracted support in other countries', 'Identifies costs and criticisms of the new state'),
    'Ask {{name}} what changed in Russia after the revolution, and why people elsewhere argued about it.',
    ['ncert-sec:HIS.C9.RR']),
  // --- Nazism ---
  t('weimar-germany-crisis', 'The Crisis of Weimar Germany', MW, 14, 15, 'CONCEPTUAL',
    'Understand how defeat in war, a punishing peace settlement, economic collapse and political instability discredited Germany’s new democracy in the eyes of many of its citizens.',
    EV('Explains why the peace settlement was resented in Germany', 'Describes the economic crises the Weimar republic faced', 'Links these pressures to falling support for democracy'),
    'Ask {{name}} why many Germans lost faith in their democratic government in the 1920s and 1930s.',
    ['ncert-sec:HIS.C9.NAZI']),
  t('hitler-rise-to-power', 'Hitler’s Rise to Power', MW, 14, 15, 'CONCEPTUAL',
    'Understand that the Nazis came to power through a mix of electoral politics, promises to a desperate population, propaganda and the dismantling of democratic safeguards.',
    EV('Describes how the Nazis used elections and propaganda', 'Explains what the Nazis promised different groups', 'Identifies the steps by which democratic checks were removed'),
    'Ask {{name}} how a party could take power legally and then end the very system that let it in.',
    ['ncert-sec:HIS.C9.NAZI']),
  t('ideology-impact-of-nazism', 'The Ideology and Impact of Nazism', MW, 14, 16, 'CONCEPTUAL',
    'Understand that Nazi ideology ranked human beings by supposed race, and that this belief led directly to persecution, war and the systematic murder of millions.',
    EV('Explains the racial ranking at the heart of Nazi ideology', 'Describes how that ideology shaped policy towards targeted groups', 'Uses evidence to explain how ordinary life enabled persecution'),
    'Ask {{name}} what the Nazis believed about people they considered different, and where that belief led.',
    ['ncert-sec:HIS.C9.NAZI']),
  // --- Livelihoods ---
  t('pastoralism-way-of-life', 'Pastoralism as a Way of Life', MW, 14, 15, 'CONCEPTUAL',
    'Understand that pastoral communities move their herds with the seasons to use scattered grazing, and that this mobility is a skilled response to a difficult environment.',
    EV('Explains why pastoralists move seasonally', 'Describes how pastoralists use land that farmers cannot', 'Compares two pastoral communities in different regions'),
    'Ask {{name}} why some communities keep moving with their animals instead of settling in one place.',
    ['ncert-sec:HIS.C9.PAST']),
  t('pastoralists-under-colonial-rule', 'Pastoralists under Colonial Rule', MW, 14, 15, 'CONCEPTUAL',
    'Understand how colonial land laws, fixed borders, forest reservation and expanding cultivation shrank grazing land and made pastoral life far harder to sustain.',
    EV('Names colonial measures that restricted grazing land', 'Explains how borders disrupted seasonal movement', 'Describes how pastoralists adapted or were forced to change'),
    'Ask {{name}} what happens to herders when the open land they depend on is fenced, taxed or reserved.',
    ['ncert-sec:HIS.C9.PAST']),
  t('forest-societies-colonialism', 'Forest Societies under Colonial Rule', MW, 14, 15, 'CONCEPTUAL',
    'Understand that colonial scientific forestry reclassified forests as timber resources, criminalising the shifting cultivation, grazing and gathering that forest communities lived by.',
    EV('Explains what colonial scientific forestry set out to do', 'Describes how forest laws changed daily life for forest communities', 'Uses a specific revolt to show how communities resisted'),
    'Ask {{name}} what changed for people living in a forest when the government decided the trees were its property.',
    ['ncert-sec:HIS.C9.FOREST']),
  t('peasants-agrarian-change', 'Peasants, Farmers and Agrarian Change', MW, 14, 15, 'CONCEPTUAL',
    'Understand that farming took very different forms across the modern world, and that large-scale commercial agriculture, small peasant holdings and shifting cultivation followed different logics.',
    EV('Contrasts large-scale commercial farming with peasant farming', 'Explains why colonial demand reshaped what farmers grew', 'Describes a consequence of agrarian change for rural people'),
    'Ask {{name}} why a farmer might be made to grow a crop they cannot eat.',
    ['ncert-sec:HIS.C9.FARM']),
  // --- Culture and identity ---
  t('sport-colonialism-nationalism', 'Sport, Colonialism and Nationalism', MW, 14, 15, 'CONCEPTUAL',
    'Understand that a sport carries a history of power, and that cricket spread through the empire as a marker of status before being reclaimed as a vehicle for national pride.',
    EV('Explains how cricket spread through colonial rule', 'Describes how the game reflected social hierarchy', 'Explains how sporting success became a nationalist claim'),
    'Ask {{name}} how a game brought by rulers could end up being a source of pride against them.',
    ['ncert-sec:HIS.C9.CRICKET']),
  t('clothing-cultural-identity', 'Clothing and Cultural Identity', MW, 14, 15, 'CONCEPTUAL',
    'Understand that what people wear has been regulated, contested and politicised, and that in colonial India cloth became a deliberate statement of self-reliance and resistance.',
    EV('Gives an example of clothing being regulated or contested', 'Explains why khadi carried political meaning', 'Links a change in dress to a wider social change'),
    'Ask {{name}} why choosing what cloth to wear could count as a political act in colonial India.',
    ['ncert-sec:HIS.C9.CLOTH']),
  // --- Class X ---
  t('nationalism-in-europe', 'Nationalism in Nineteenth-Century Europe', MW, 15, 16, 'CONCEPTUAL',
    'Understand how the idea that a people sharing language and culture should form one state reorganised Europe into nation states, and how that idea was spread and resisted.',
    EV('Explains what made a group think of itself as a nation', 'Describes how nation states were formed in Italy or Germany', 'Identifies who was excluded by nationalist definitions'),
    'Ask {{name}} what makes a group of people decide they are one nation that deserves its own country.',
    ['ncert-sec:HIS.C10.EURNAT']),
  t('anti-colonial-nationalism', 'Anti-Colonial Nationalism Compared', MW, 15, 16, 'CONCEPTUAL',
    'Understand that nationalism in colonised countries was directed against foreign rule rather than towards unifying a state, and that Indo-China and India took different paths to it.',
    EV('Distinguishes European nationalism from anti-colonial nationalism', 'Outlines the phases of the struggle in Indo-China', 'Compares that struggle with the Indian movement'),
    'Ask {{name}} how wanting independence from a foreign ruler differs from wanting to unite scattered states.',
    ['ncert-sec:HIS.C10.INDOCHINA', 'ncert-sec:HIS.C10.EURNAT']),
  t('non-cooperation-khilafat', 'Non-Cooperation and the Khilafat Movement', MI, 15, 16, 'CONCEPTUAL',
    'Understand how the years after the First World War brought a mass movement that withdrew cooperation from colonial institutions and briefly joined Hindu and Muslim political causes.',
    EV('Explains what non-cooperation asked ordinary people to do', 'Describes how the Khilafat issue broadened the movement', 'Identifies why the movement was called off'),
    'Ask {{name}} how refusing to attend a school or court could put pressure on a government.',
    ['ncert-sec:HIS.C10.INDNAT']),
  t('civil-disobedience-salt-satyagraha', 'Civil Disobedience and the Salt Satyagraha', MI, 15, 16, 'CONCEPTUAL',
    'Understand that breaking an unjust law deliberately and publicly, as with the salt tax, turned an everyday necessity into a symbol that drew millions into the freedom movement.',
    EV('Explains why salt was chosen as the target', 'Describes how civil disobedience differed from non-cooperation', 'Names groups whose participation widened the movement'),
    'Ask {{name}} why making salt from seawater was treated as a crime, and why that made it powerful.',
    ['ncert-sec:HIS.C10.INDNAT']),
  t('peasants-workers-tribals-movement', 'Peasants, Workers and Tribals in the Freedom Movement', MI, 15, 16, 'CONCEPTUAL',
    'Understand that different groups joined the national movement for their own reasons — rent, wages, forest rights — so the movement was never a single unified programme.',
    EV('Names grievances that drew peasants or workers in', 'Explains why participants interpreted the movement differently', 'Gives an example of tension within the movement'),
    'Ask {{name}} why a farmer and a factory worker might both join the freedom movement but want different things.',
    ['ncert-sec:HIS.C10.INDNAT']),
  t('industrialisation-britain-india', 'Industrialisation in Britain and India', MW, 15, 16, 'CONCEPTUAL',
    'Understand that industrialisation followed opposite paths in the imperial centre and the colony: factory growth in Britain alongside the decline of Indian handicrafts.',
    EV('Contrasts industrial growth in Britain with its effect in India', 'Explains what happened to Indian handloom weavers', 'Describes the relationship between handicraft and factory production'),
    'Ask {{name}} why factories growing in one country could put weavers out of work in another.',
    ['ncert-sec:HIS.C10.INDUS']),
  t('industrial-workers-livelihoods', 'The Livelihoods of Industrial Workers', MW, 15, 16, 'CONCEPTUAL',
    'Understand that industrial work brought long hours, insecure employment and crowded living conditions, and that formal and informal sectors offered very different protections.',
    EV('Describes working conditions in early industry', 'Distinguishes formal from informal sector work', 'Explains how workers organised to improve conditions'),
    'Ask {{name}} what life was like for someone who left a village to work in an early factory.',
    ['ncert-sec:HIS.C10.INDUS']),
  t('urbanisation-and-urban-life', 'Urbanisation and Urban Life', MW, 15, 16, 'CONCEPTUAL',
    'Understand that industrial cities grew through migration, producing new social classes, new problems of housing and sanitation, and new forms of city life.',
    EV('Explains what drew migrants to growing cities', 'Describes social divisions within an industrial city', 'Compares urban growth in two different cities'),
    'Ask {{name}} why cities grew so fast when factories arrived, and what problems that created.',
    ['ncert-sec:HIS.C10.URBAN']),
  t('trade-globalisation-world-economy', 'Trade, Globalisation and the World Economy', MW, 15, 16, 'CONCEPTUAL',
    'Understand that the world market was integrated long before the present day, that the wars and depression interrupted it, and that globalisation affects different groups very unequally.',
    EV('Explains how the world market integrated in the nineteenth century', 'Describes how the wars and depression disrupted trade', 'Identifies who gains and who loses from globalisation'),
    'Ask {{name}} whether the world becoming more connected has been good for everybody equally.',
    ['ncert-sec:HIS.C10.GLOBAL']),
  t('print-culture-and-the-nation', 'Print Culture and the Nation', MW, 15, 16, 'CONCEPTUAL',
    'Understand that cheap printing let ideas circulate beyond the powerful, creating a reading public, public debate and a press that both colonial rulers and nationalists tried to control.',
    EV('Explains how print changed who could access ideas', 'Describes the growth of the press in colonial India', 'Explains why governments tried to censor print'),
    'Ask {{name}} why rulers have so often been nervous about cheap printing presses.',
    ['ncert-sec:HIS.C10.PRINT']),
  t('novel-and-modern-society', 'The Novel and Modern Society', MW, 15, 16, 'CONCEPTUAL',
    'Understand that the novel emerged with print and a reading middle class, and that it gave ordinary lives, social reform and national imagination a new kind of public voice.',
    EV('Explains what social conditions the novel emerged from', 'Describes what early Indian novels wrote about', 'Explains how fiction can carry social or political argument'),
    'Ask {{name}} what a made-up story can tell us about the real society that produced it.',
    ['ncert-sec:HIS.C10.NOVEL']),
];

const newEdges = [
  // Anchors into the pre-existing History ladder. Without these the Class IX–X
  // world-history themes form chains that never connect to the rest of the graph.
  { t: 'ancien-regime-crisis', p: 'mt_bjlY5TE1y-', strength: 'hard', reason: 'The estates of the ancien régime descend from the medieval pyramid of power.' },
  { t: 'crisis-of-tsarist-russia', p: 'mt_7P4EsEbQpI', strength: 'soft', reason: 'Sits within the broad account of revolutions and the modern age.' },
  { t: 'pastoralism-way-of-life', p: 'mt_eosO26KE-Z', strength: 'soft', reason: 'Pastoral societies are among the medieval worlds beyond Europe.' },
  { t: 'sport-colonialism-nationalism', p: 'mt_gM1adZDGIy', strength: 'hard', reason: 'Cricket spread through British rule in India.' },
  { t: 'clothing-cultural-identity', p: 'mt_gM1adZDGIy', strength: 'hard', reason: 'Debates over dress arose under British rule in India.' },
  { t: 'clothing-cultural-identity', p: 'mt_R1xLS1c2Pg', strength: 'soft', reason: 'Builds on the idea that clothing has a history.' },
  { t: 'industrialisation-britain-india', p: 'mt_ZCwHKy4rEZ', strength: 'hard', reason: 'Industrialisation is studied against British rule and India’s economy.' },
  { t: 'print-culture-and-the-nation', p: 'mt_rf23aL6KwH', strength: 'hard', reason: 'Print culture builds on the printing press and the Renaissance.' },
  { t: 'french-revolution-ideas', p: 'ancien-regime-crisis', strength: 'hard', reason: 'The revolution is understood as a response to the crisis of the old order.' },
  { t: 'french-revolution-legacy', p: 'french-revolution-ideas', strength: 'hard', reason: 'The legacy is the spread of the revolution’s own ideas.' },
  { t: 'russian-revolution-1917', p: 'crisis-of-tsarist-russia', strength: 'hard', reason: 'The revolution follows from the breakdown of Tsarist rule.' },
  { t: 'making-of-soviet-state', p: 'russian-revolution-1917', strength: 'hard', reason: 'The Soviet state is what the revolution built.' },
  { t: 'crisis-of-tsarist-russia', p: 'french-revolution-legacy', strength: 'soft', reason: 'Revolutionary ideas from France circulated into later movements.' },
  { t: 'hitler-rise-to-power', p: 'weimar-germany-crisis', strength: 'hard', reason: 'The Nazi rise depended on the discrediting of Weimar democracy.' },
  { t: 'ideology-impact-of-nazism', p: 'hitler-rise-to-power', strength: 'hard', reason: 'Nazi ideology could be enacted only once the party held power.' },
  { t: 'weimar-germany-crisis', p: 'mt_mUDHsziRvs', strength: 'soft', reason: 'The Weimar crisis follows from the First World War settlement.' },
  { t: 'pastoralists-under-colonial-rule', p: 'pastoralism-way-of-life', strength: 'hard', reason: 'The colonial disruption is understood against pastoral life as it was.' },
  { t: 'forest-societies-colonialism', p: 'mt_gM1adZDGIy', strength: 'soft', reason: 'Forest policy was one arm of colonial administration in India.' },
  { t: 'peasants-agrarian-change', p: 'mt_ZCwHKy4rEZ', strength: 'soft', reason: 'Agrarian change is part of how colonial rule reshaped India’s economy.' },
  { t: 'nationalism-in-europe', p: 'french-revolution-legacy', strength: 'hard', reason: 'European nationalism drew on revolutionary ideas of popular sovereignty.' },
  { t: 'anti-colonial-nationalism', p: 'nationalism-in-europe', strength: 'hard', reason: 'Anti-colonial nationalism is defined by contrast with the European form.' },
  { t: 'civil-disobedience-salt-satyagraha', p: 'non-cooperation-khilafat', strength: 'hard', reason: 'Civil disobedience followed and built on the non-cooperation phase.' },
  { t: 'non-cooperation-khilafat', p: 'mt_ijRSgBBd0W', strength: 'hard', reason: 'Non-cooperation applied Gandhi’s method of non-violent resistance.' },
  { t: 'peasants-workers-tribals-movement', p: 'civil-disobedience-salt-satyagraha', strength: 'soft', reason: 'Mass participation widened during the civil disobedience years.' },
  { t: 'industrial-workers-livelihoods', p: 'industrialisation-britain-india', strength: 'hard', reason: 'Worker livelihoods follow from how industrialisation was organised.' },
  { t: 'urbanisation-and-urban-life', p: 'industrialisation-britain-india', strength: 'hard', reason: 'Industrial cities grew out of industrialisation.' },
  { t: 'trade-globalisation-world-economy', p: 'industrialisation-britain-india', strength: 'soft', reason: 'The integrated world market grew alongside industrial production.' },
  { t: 'novel-and-modern-society', p: 'print-culture-and-the-nation', strength: 'hard', reason: 'The novel depended on print and a reading public.' },
  { t: 'print-culture-and-the-nation', p: 'mt_t6BQm5x5Su', strength: 'soft', reason: 'Reform movements in India worked through the printed word.' },
];

const newClusters = [
  { subject: 'History', domain: 'Modern World', ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'At this stage history widens from India to the forces that made the contemporary world, and India is placed inside that larger story. Learners study revolutions in France and Russia and the rise of Nazism as three different answers to the question of who should hold power; they follow how industrialisation, urban growth and global trade reshaped the way ordinary people earned a living; and they see that even clothing, sport, printing and the novel carry political histories. The emphasis throughout is on reading evidence critically rather than memorising dates.' },
];

integrateNcertSec({ subjectDoc: 'History (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
