#!/usr/bin/env node
/**
 * build/ncert-sec-social.mjs — NCERT Geography, Political Science and Economics,
 * Classes IX–X, at theme grain. Class IX is where NCERT stops teaching a single
 * composite Social Science, so from age 14 these are three separate subjects;
 * below that their content remains under Social Studies. Existing coverage of
 * Indian geography and civics is pitched at ages 9–13, so this pass aligns
 * where the idea already exists and
 * mints the senior treatments that were missing (resource planning, soil and
 * water, population composition; democracy, federalism and its outcomes; human
 * capital, poverty, food security, credit and consumer rights). Descriptions
 * are Marble-authored factual scope summaries (no NCERT text). Idempotent.
 */

import { integrateNcertSec, mintId } from './ncert-sec.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

const standards = [
  // ---- Geography ----
  s('GEO.C9.LOC', 'IX', 'Geography — India: Land', 'India’s location, relief and structure; the major physiographic units and their underlying geology, rocks, minerals and soil types.'),
  s('GEO.C9.CLIM', 'IX', 'Geography — Climate', 'Factors influencing India’s climate; the monsoon and its characteristics; distribution of rainfall and temperature; the seasons; climate and human life.'),
  s('GEO.C9.DRAIN', 'IX', 'Geography — Drainage', 'Major rivers and tributaries, lakes and seas; the role of rivers in the economy; river pollution and measures to control it.'),
  s('GEO.C9.VEG', 'IX', 'Geography — Natural Vegetation', 'Types of vegetation and their distribution, including altitudinal variation, and the need for conservation.'),
  s('GEO.C9.WILD', 'IX', 'Geography — Wildlife', 'Major wildlife species and their distribution; the need for conservation and the measures taken.'),
  s('GEO.C9.POP', 'IX', 'Geography — Population', 'Population size, distribution and age-sex composition; migration as a determinant of population change; literacy, health and occupational structure; national population policy.'),
  s('GEO.C10.RES', 'X', 'Geography — Resources', 'Types of resource, natural and human; the need for resource planning and judicious utilisation.'),
  s('GEO.C10.LAND', 'X', 'Geography — Land and Soil', 'Land as a resource; soil formation, types and distribution; changing land-use patterns; land degradation and conservation measures.'),
  s('GEO.C10.FOREST', 'X', 'Geography — Forest and Wildlife Resources', 'Types and distribution of forest and wildlife resources; depletion of flora and fauna; conservation and protection.'),
  s('GEO.C10.AGRI', 'X', 'Geography — Agriculture', 'Types of farming, major crops and cropping patterns; technological and institutional reforms; agriculture’s contribution to employment, output and food security; the impact of globalisation.'),
  s('GEO.C10.WATER', 'X', 'Geography — Water Resources', 'Sources, distribution and utilisation of water; multi-purpose projects; water scarcity and the need for conservation, management and rainwater harvesting.'),
  s('GEO.C10.MIN', 'X', 'Geography — Mineral Resources', 'Types of minerals, their distribution, use and economic importance, and their conservation.'),
  s('GEO.C10.POWER', 'X', 'Geography — Power Resources', 'Conventional and non-conventional power resources, their distribution, utilisation and conservation.'),
  s('GEO.C10.IND', 'X', 'Geography — Manufacturing Industries', 'Types and spatial distribution of industry; its contribution to the national economy; industrial pollution and measures to control environmental degradation.'),
  s('GEO.C10.TRANS', 'X', 'Geography — Transport and Trade', 'Transport and communication in a shrinking world, and the role of trade in a country’s economic development.'),
  // ---- Political Science ----
  s('POL.C9.SPREAD', 'IX', 'Democratic Politics — Spread', 'How democracy has expanded in the world in recent times, how that expansion has changed the world, and the functioning of global institutions.'),
  s('POL.C9.WHAT', 'IX', 'Democratic Politics — What Is Democracy', 'Different ways of defining democracy; why it has become the most prevalent form of government; the alternatives to it and whether it is superior to them.'),
  s('POL.C9.DESIGN', 'IX', 'Democratic Politics — Designing Democracy in India', 'How and why India became a democracy; how the Constitution was framed; its salient features; the Constitution as a living document.'),
  s('POL.C9.ELECT', 'IX', 'Democratic Politics — Electoral Politics', 'Why and how representatives are elected; competition among political parties; changing citizen participation; ensuring free and fair elections and the role of the Election Commission.'),
  s('POL.C9.INST', 'IX', 'Democratic Politics — Institutions', 'How the country is governed; the role of Parliament, the President, the Prime Minister and the Council of Ministers, and how these relate to one another.'),
  s('POL.C9.RIGHTS', 'IX', 'Democratic Politics — Citizens’ Rights', 'Why rights are needed in a Constitution; the Fundamental Rights of citizens; how the judiciary protects them and how judicial independence is ensured.'),
  s('POL.C10.WORK', 'X', 'Democratic Politics — Working of Democracy', 'Whether divisions are inherent to democracy; the effect of caste, gender and communal division on politics and of politics on them.'),
  s('POL.C10.POWER', 'X', 'Democratic Politics — Power Sharing', 'Why and how power is shared in democracies; how federal division of power has helped national unity; decentralisation and the accommodation of social groups.'),
  s('POL.C10.COMPET', 'X', 'Democratic Politics — Competition and Contestation', 'How struggles shape democracy in favour of ordinary people; the role of political parties; major national and regional parties; the growing role of social movements.'),
  s('POL.C10.OUTCOME', 'X', 'Democratic Politics — Outcomes', 'Whether democracy should be judged by its outcomes; what can reasonably be expected of democracies; whether Indian democracy has delivered development, security and dignity.'),
  s('POL.C10.CHALLENGE', 'X', 'Democratic Politics — Challenges', 'The major challenges facing democracy in India; how democracy can be reformed and deepened; the role an ordinary citizen can play.'),
  // ---- Economics ----
  s('ECO.C9.PALAM', 'IX', 'Economics — Production', 'The economic story of a village and its interaction with the wider world, introducing production and the three factors of production: land, labour and capital.'),
  s('ECO.C9.PEOPLE', 'IX', 'Economics — People as Resource', 'How people become an economic resource; economic activity by men and women; unpaid work; the role of health and education in the quality of human resource; unemployment.'),
  s('ECO.C9.POVERTY', 'IX', 'Economics — Poverty', 'Who is poor, through rural and urban case studies; poverty indicators; why people are poor and the unequal distribution of resources; government poverty alleviation measures.'),
  s('ECO.C9.FOOD', 'IX', 'Economics — Food Security', 'Sources of foodgrains and the need for self-sufficiency; famines in the past; the government role in food security, procurement, the public distribution system and cooperatives.'),
  s('ECO.C10.DEV', 'X', 'Economics — Development', 'The traditional notion of development; national and per-capita income; a critical appraisal of existing development indicators; human development indicators as a holistic measure.'),
  s('ECO.C10.MONEY', 'X', 'Economics — Money and Credit', 'The role and historical origin of money; formal and informal institutions for savings and credit, from nationalised banks to moneylenders, self-help groups and chit funds.'),
  s('ECO.C10.SERVICE', 'X', 'Economics — Service Sector', 'What the service sector is; its importance in generating employment and income; its growth in India; India as a service provider to the world; the need for public investment in infrastructure.'),
  s('ECO.C10.GLOBAL', 'X', 'Economics — Globalisation', 'What globalisation is; how and why India has been globalised; development strategy before 1991 and the economic reforms of 1991; differing perspectives on globalisation and its impacts.'),
  s('ECO.C10.CONSUMER', 'X', 'Economics — Consumer Awareness', 'How consumers are exploited and the factors causing it; the rise of consumer awareness; how a consumer should act in a market; the government role in consumer protection.'),
];

const alignments = {
  // Geography
  'mt_zniDXv3Ko3': ['GEO.C9.LOC', 'GEO.C9.CLIM'],           // India's Physical Features and Climate
  'mt_1zM5tBMqRF': ['GEO.C9.LOC'],                          // States and Union Territories of India
  'mt_UJqGKMoRvb': ['GEO.C9.LOC', 'GEO.C9.DRAIN'],          // The Himalayas and India's Rivers
  'mt_qNSCvaxZKR': ['GEO.C9.CLIM'],                         // The Monsoon and India's Climate
  'mt__wWHVvqMWb': ['GEO.C9.CLIM'],                         // Hurricanes, Tornadoes & Monsoons
  'mt_iYOcfzFqMw': ['GEO.C9.CLIM'],                         // Global Wind Patterns
  'mt_RFilNlLL3T': ['GEO.C9.VEG', 'GEO.C9.WILD', 'GEO.C10.FOREST'], // India's Forests and Wildlife
  'mt_44HkROUnzE': ['GEO.C10.FOREST'],                      // The Biodiversity Crisis
  'mt_7e-lG7YOWa': ['GEO.C10.FOREST'],                      // Communities Protecting Resources
  'mt_0e5rZxbAeR': ['GEO.C10.MIN'],                         // Finite Resources & Recycling
  // senior resource topic minted below also carries the minerals standard
  [mintId('resource-classification-planning')]: ['GEO.C10.MIN'],
  'mt_5S4byWDX6n': ['GEO.C9.WILD'],                         // Endangered & Extinct Species
  'mt_29aZtsWvgT': ['GEO.C9.POP'],                          // Population and Its Challenges
  'mt_kOFOr0gGSX': ['GEO.C9.POP'],                          // India's Growing Population
  'mt_La7RcC7ojy': ['GEO.C9.POP'],                          // Birth Rate, Death Rate and Sex Ratio
  'mt_Qx5riGaO8e': ['GEO.C10.RES'],                         // Natural Resources of India
  'mt_D3sDOaujQk': ['GEO.C10.AGRI'],                        // Agriculture in India
  'mt_Qp4lP8lrb9': ['GEO.C10.AGRI'],                        // Crops of India
  'mt_OyFF92CLGH': ['GEO.C10.AGRI'],                        // Farming Seasons: Rabi, Kharif and Zaid
  'mt_GjZFr0xSIz': ['GEO.C10.AGRI'],                        // How Crops Are Grown
  'mt_RE1bwmAHw1': ['GEO.C10.MIN', 'GEO.C10.POWER'],        // India's Minerals and Energy
  'mt_w2A8D76ymp': ['GEO.C10.POWER'],                       // Renewable vs non-renewable energy
  'mt_QCQjNxURAP': ['GEO.C10.IND'],                         // Industries in India
  'mt_HAVlsBtQy0': ['GEO.C10.IND'],                         // Types of Industries
  'mt_fwkPvwG8ET': ['GEO.C10.TRANS'],                       // How People and Goods Travel
  'mt_f4c1NeL3Fv': ['GEO.C10.TRANS'],                       // Ways We Communicate
  'mt_VFhHCU805T': ['GEO.C10.TRANS'],                       // How Transport Has Changed Over Time
  // Political science
  'mt_ECbqGTZYhL': ['POL.C9.WHAT', 'POL.C9.DESIGN'],        // Indian Democracy and Government
  'mt_7LYY3PybtA': ['POL.C9.WHAT', 'POL.C9.SPREAD'],        // Ways Countries Are Governed
  'mt_zFL9HpDF22': ['POL.C9.DESIGN', 'POL.C9.RIGHTS'],      // The Constitution of India: Rights and Duties
  'mt_WaAVnaJ3Ne': ['POL.C9.RIGHTS'],                       // Fundamental Rights of Citizens
  'mt_8PeIaMh7Yb': ['POL.C9.RIGHTS'],                       // Fundamental Duties of Citizens
  'mt_g76LnkOJeD': ['POL.C9.RIGHTS'],                       // The Judiciary: The Courts
  'mt_Dx3DLwmuLq': ['POL.C9.ELECT'],                        // Elections and the Right to Vote
  'mt_i749YJfKX2': ['POL.C9.ELECT'],                        // How Elections Are Held
  'mt_57pI4N3eI2': ['POL.C9.ELECT'],                        // One Person, One Vote
  'mt_ZfqyrBYcTZ': ['POL.C9.ELECT', 'POL.C10.COMPET'],      // Political Parties
  'mt_Pzr7io8maf': ['POL.C9.INST'],                         // The Legislature: Making Laws
  'mt_yG7RDMJU9b': ['POL.C9.INST'],                         // The Executive: Running the Country
  'mt_iHCKCUdd4y': ['POL.C10.POWER'],                       // State Government
  'mt_FJZZUv2ewS': ['POL.C10.POWER'],                       // Local Self-Government: Panchayati Raj
  'mt_hopWG4d3s4': ['POL.C10.POWER'],                       // The Gram Panchayat
  'mt_YE9WTLeboe': ['POL.C10.POWER'],                       // Block and District Panchayats
  'mt_zxlN4ht3wT': ['POL.C10.POWER'],                       // Town and City Government
  'mt_DVIPdRFomK': ['POL.C10.CHALLENGE'],                   // Challenges to Indian Democracy
  'mt_BlcpwdLsRX': ['POL.C10.WORK'],                        // Gender Equality and Social Reform
  'mt_sfHoytwSwm': ['POL.C10.WORK'],                        // Unity in Diversity
  'mt_Yb68YCJeqG': ['POL.C10.WORK'],                        // Living Together in Peace
  'mt_OeXPJk4wrb': ['POL.C10.OUTCOME'],                     // Right to Information
  'mt_8SKBJJFzh1': ['POL.C10.OUTCOME'],                     // Government Support and Welfare Schemes
  'mt_t1uflyWbd1': ['POL.C10.OUTCOME'],                     // National Development Schemes
  // Economics
  'mt_yGbS9NpIU8': ['ECO.C9.PALAM'],                        // Factors of Production
  'mt_zrGl2FRuhh': ['ECO.C9.PALAM'],                        // What Is Economics
  'mt_y8Wj38VEpV': ['ECO.C9.PALAM', 'ECO.C10.DEV'],         // The Central Problems of an Economy
  'mt_0CmQMjd6dQ': ['ECO.C10.SERVICE'],                     // Sectors of the Economy
  'mt_MOhhQz1xTG': ['ECO.C10.DEV'],                         // The Indian Economy
  'mt_f8dmAdEPq2': ['ECO.C10.DEV', 'ECO.C9.POVERTY'],       // Challenges before the Indian Economy
  'mt_LEtOXY2B5P': ['ECO.C10.GLOBAL'],                      // India in the Global Economy
  'mt_jeTXkpY2IU': ['ECO.C10.CONSUMER'],                    // Demand
  'mt_yWJTq3Oc3r': ['ECO.C10.CONSUMER'],                    // How Prices Are Determined
  'mt_BlYMlHIPeO': ['ECO.C9.PEOPLE'],                       // Skill India
  'mt_XAnyXFB9mO': ['ECO.C9.PEOPLE'],                       // Why Girls' Education Matters
};

const EV = (a, b, c) => [a, b, c];
const t = (slug, name, subject, domain, ageStart, ageEnd, type, description, evidence, prompt, standards) =>
  ({ _slug: slug, name, subject, domain, ageRangeStart: ageStart, ageRangeEnd: ageEnd, type, description, evidence, assessmentPrompt: prompt, standards });

const GEO = 'Geography of India';
const GOV = 'Indian Constitution';
const POLI = 'Indian Politics';
const SS = 'Geography';        // senior geography is its own subject from age 14
const PS = 'Political Science';

const newTopics = [
  // --- Geography ---
  t('resource-classification-planning', 'Resource Classification and Planning', SS, GEO, 15, 16, 'CONCEPTUAL',
    'Understand that resources are classified by origin, ownership and how quickly they renew, and that planning matters because they are unevenly spread and can be used up.',
    EV('Classifies a given resource by origin and by renewability', 'Explains why resources are distributed unevenly across India', 'Argues why resource planning is necessary rather than optional'),
    'Ask {{name}} why a country would need a plan for its resources rather than simply using what it finds.',
    ['ncert-sec:GEO.C10.RES']),
  t('soil-types-land-degradation', 'Soil Types and Land Degradation', SS, GEO, 15, 16, 'CONCEPTUAL',
    'Understand that soil forms slowly from rock, climate and living things, that India has distinct soil types, and that careless land use degrades soil far faster than it can rebuild.',
    EV('Names major Indian soil types and where they occur', 'Explains one human cause of land degradation', 'Describes a conservation measure and why it works'),
    'Ask {{name}} how long soil takes to form compared with how quickly it can be washed away.',
    ['ncert-sec:GEO.C10.LAND']),
  t('water-scarcity-rainwater-harvesting', 'Water Scarcity and Rainwater Harvesting', SS, GEO, 15, 16, 'CONCEPTUAL',
    'Understand that water scarcity can arise even where rainfall is high, because of demand, pollution and uneven access, and that harvesting rainwater is a long-standing local response.',
    EV('Explains how scarcity can occur despite plentiful rainfall', 'Describes a traditional or modern rainwater harvesting method', 'Weighs an argument for and against a large multi-purpose dam'),
    'Ask {{name}} how a place that gets heavy monsoon rain can still run short of water.',
    ['ncert-sec:GEO.C10.WATER']),
  t('population-composition-migration', 'Population Composition and Migration', SS, GEO, 14, 16, 'CONCEPTUAL',
    'Understand that a population is described not just by its size but by its age and sex composition, literacy and occupations, and that migration reshapes all of these.',
    EV('Reads an age-sex composition from a population pyramid', 'Explains how migration changes both origin and destination areas', 'Links occupational structure to a region’s level of development'),
    'Ask {{name}} what you learn about a place from knowing the ages of its people, not just how many there are.',
    ['ncert-sec:GEO.C9.POP']),
  t('india-physiographic-divisions', 'India’s Physiographic Divisions', SS, GEO, 14, 15, 'CONCEPTUAL',
    'Understand that India divides into distinct physical regions — mountains, plains, plateau, desert, coasts and islands — each formed by a different geological history and supporting different ways of life.',
    EV('Names the major physiographic divisions and locates them', 'Links a division to the geological process that formed it', 'Explains how relief shapes settlement or livelihood in one region'),
    'Ask {{name}} why the Himalayas, the Gangetic plain and the Deccan plateau look so different from each other.',
    ['ncert-sec:GEO.C9.LOC']),
  t('india-drainage-systems', 'India’s Drainage Systems', SS, GEO, 14, 15, 'CONCEPTUAL',
    'Understand that India’s rivers fall into Himalayan and peninsular systems that differ in flow and origin, and that rivers carry both economic value and a growing pollution problem.',
    EV('Contrasts Himalayan and peninsular river systems', 'Explains the role rivers play in the economy', 'Describes a cause of river pollution and a measure against it'),
    'Ask {{name}} why some Indian rivers flow all year while others nearly dry up between monsoons.',
    ['ncert-sec:GEO.C9.DRAIN']),
  t('indian-agriculture-cropping-reforms', 'Indian Agriculture: Cropping Patterns and Reforms', SS, GEO, 15, 16, 'CONCEPTUAL',
    'Understand that what is grown where follows rainfall, soil and season, and that technological and institutional reforms have reshaped Indian farming and its place in the national economy.',
    EV('Links a cropping pattern to its rainfall and soil conditions', 'Describes a technological or institutional reform and its effect', 'Explains agriculture’s contribution to employment and output'),
    'Ask {{name}} why rice and wheat are grown in different parts of India, and what changed farming after independence.',
    ['ncert-sec:GEO.C10.AGRI']),
  t('industrial-location-and-pollution', 'Industrial Location, Pollution and Sustainable Development', SS, GEO, 15, 16, 'CONCEPTUAL',
    'Understand why industries cluster in particular places, how that concentration creates regional disparity, and why industrial growth is argued about in terms of pollution and sustainability.',
    EV('Explains a reason industries concentrate in certain regions', 'Describes a form of industrial pollution and a control measure', 'Weighs an argument for and against planned industrial development'),
    'Ask {{name}} why factories cluster in some states and not others, and who pays the cost of that.',
    ['ncert-sec:GEO.C10.IND']),
  t('transport-communication-trade', 'Transport, Communication and Trade in Development', SS, GEO, 15, 16, 'CONCEPTUAL',
    'Understand that transport and communication networks shrink effective distance, and that trade — internal and international — is central to how a country develops economically.',
    EV('Explains how transport networks affect economic development', 'Distinguishes internal from international trade', 'Describes how communication technology has changed the movement of goods and ideas'),
    'Ask {{name}} how a better road or a mobile network can change what a village is able to sell.',
    ['ncert-sec:GEO.C10.TRANS']),
  // --- Political science ---
  t('what-democracy-is-and-why', 'What Democracy Is and Why It Matters', PS, 'Political Theory', 14, 15, 'CONCEPTUAL',
    'Understand that democracy means rulers chosen by the people under rules that guarantee fair choice and rights, and be able to weigh it honestly against its alternatives.',
    EV('Gives a working definition of democracy and its essential features', 'Names an alternative form of government and a claimed advantage of it', 'Defends democracy against a common criticism using reasons'),
    'Ask {{name}} what would have to be true of a country before they would call it a democracy.',
    ['ncert-sec:POL.C9.WHAT', 'ncert-sec:POL.C9.SPREAD']),
  t('making-of-the-indian-constitution', 'The Making of the Indian Constitution', PS, GOV, 14, 15, 'CONCEPTUAL',
    'Understand that the Constitution was written by an elected assembly after long debate, that its values were deliberately chosen, and that it can be amended as society changes.',
    EV('Describes who framed the Constitution and how', 'Names core values the Constitution commits India to', 'Explains what it means to call the Constitution a living document'),
    'Ask {{name}} who decided what would be in India’s Constitution, and whether it can ever be changed.',
    ['ncert-sec:POL.C9.DESIGN']),
  t('power-sharing-and-federalism', 'Power Sharing and Federalism', PS, GOV, 15, 16, 'CONCEPTUAL',
    'Understand that dividing power between levels of government and among social groups reduces conflict, and that Indian federalism shares power between the union, states and local bodies.',
    EV('Explains why power sharing reduces conflict in a diverse society', 'Describes how powers are divided between union and states', 'Explains what decentralisation to local bodies was meant to achieve'),
    'Ask {{name}} why it might be safer for a large, diverse country not to keep all power in one place.',
    ['ncert-sec:POL.C10.POWER']),
  t('democracy-and-social-divisions', 'Democracy and Social Divisions', PS, POLI, 15, 16, 'CONCEPTUAL',
    'Understand that social differences of caste, religion and gender enter politics, and that democracy can either accommodate them peacefully or be strained by them.',
    EV('Explains how a social division can become a political division', 'Distinguishes accommodating a difference from exploiting it', 'Gives an example of politics changing a social hierarchy'),
    'Ask {{name}} whether it is a problem for democracy when people vote according to their community.',
    ['ncert-sec:POL.C10.WORK']),
  t('outcomes-of-democracy', 'Outcomes of Democracy', PS, POLI, 15, 16, 'META',
    'Understand that democracies can be judged by what they deliver — accountable government, development, dignity and security — while recognising that such judgements need fair standards.',
    EV('States what can reasonably be expected of a democracy', 'Uses evidence to assess one outcome of Indian democracy', 'Explains why democracies may be slower but more accountable'),
    'Ask {{name}} how they would decide whether a democracy is working well or badly.',
    ['ncert-sec:POL.C10.OUTCOME', 'ncert-sec:POL.C10.CHALLENGE']),
  t('social-movements-and-democracy', 'Social Movements and Democratic Struggle', PS, POLI, 15, 16, 'CONCEPTUAL',
    'Understand that democracy has been widened by pressure from below — movements, protests and campaigns — as much as by parties competing in elections.',
    EV('Explains how a movement can change policy without winning an election', 'Distinguishes a political party from a social movement', 'Gives an example of a right won through sustained struggle'),
    'Ask {{name}} how ordinary people can change a government’s mind between one election and the next.',
    ['ncert-sec:POL.C10.COMPET']),
  // --- Economics ---
  t('people-as-a-resource', 'People as a Resource: Human Capital', 'Economics', 'Production', 14, 15, 'CONCEPTUAL',
    'Understand that a population becomes a productive asset through health, education and skills, and that investing in people raises what an economy can produce.',
    EV('Explains how education and health turn population into human capital', 'Distinguishes paid work from unpaid work that is still economic activity', 'Describes a form of unemployment and its cost to the economy'),
    'Ask {{name}} why two countries with the same number of people can produce very different amounts.',
    ['ncert-sec:ECO.C9.PEOPLE']),
  t('poverty-and-its-measurement', 'Poverty and Its Measurement', 'Economics', 'The Indian Economy', 14, 15, 'CONCEPTUAL',
    'Understand that poverty is measured against a defined line of minimum needs, that the measure itself is contested, and that its causes lie largely in unequal access to resources.',
    EV('Explains what a poverty line is and how it is set', 'Names social groups more likely to be poor and suggests why', 'Describes a government measure aimed at reducing poverty'),
    'Ask {{name}} how a government decides who counts as poor, and why that decision matters.',
    ['ncert-sec:ECO.C9.POVERTY']),
  t('food-security-and-pds', 'Food Security and the Public Distribution System', 'Economics', 'The Indian Economy', 14, 15, 'CONCEPTUAL',
    'Understand that food security means everyone having reliable access to enough food, and that buffer stocks and the public distribution system exist to provide it when markets do not.',
    EV('States the conditions under which a household is food secure', 'Explains the purpose of buffer stocks and the ration system', 'Explains how granaries can overflow while people go hungry'),
    'Ask {{name}} how a country can have full grain stores and still have hungry people in it.',
    ['ncert-sec:ECO.C9.FOOD']),
  t('measuring-development', 'Measuring Development: Income and Human Development', 'Economics', 'The Indian Economy', 15, 16, 'CONCEPTUAL',
    'Understand that average income alone is a poor measure of how well people live, and that health, education and life expectancy give a fuller picture of development.',
    EV('Explains a limitation of per-capita income as a measure', 'Names indicators used in human development measures', 'Compares two regions using more than one indicator'),
    'Ask {{name}} whether the richest country is automatically the best place to live, and how they would check.',
    ['ncert-sec:ECO.C10.DEV']),
  t('money-banking-and-credit', 'Money, Banking and Credit', 'Economics', 'The Indian Economy', 15, 16, 'CONCEPTUAL',
    'Understand that money removes the need for a double coincidence of wants, and that credit from formal institutions differs sharply in cost and risk from informal moneylending.',
    EV('Explains why money replaced barter', 'Contrasts formal and informal sources of credit', 'Explains how a debt trap can arise from informal borrowing'),
    'Ask {{name}} why borrowing from a bank and borrowing from a moneylender are not the same thing.',
    ['ncert-sec:ECO.C10.MONEY']),
  t('consumer-rights-and-protection', 'Consumer Rights and Protection', 'Economics', 'Markets', 15, 16, 'CONCEPTUAL',
    'Understand that consumers can be exploited through false information, unfair weights or unsafe goods, and that law, standards marks and redress bodies exist to protect them.',
    EV('Names ways a consumer can be exploited in a market', 'Identifies what a standards mark on a product certifies', 'Describes what a consumer can do when sold a faulty product'),
    'Ask {{name}} what they could do if a shop sold them something that turned out to be faulty.',
    ['ncert-sec:ECO.C10.CONSUMER']),
];

const newEdges = [
  { t: 'soil-types-land-degradation', p: 'resource-classification-planning', strength: 'soft', reason: 'Soil is treated as one resource within the wider classification.' },
  { t: 'water-scarcity-rainwater-harvesting', p: 'resource-classification-planning', strength: 'soft', reason: 'Water scarcity is an instance of the resource planning problem.' },
  { t: 'resource-classification-planning', p: 'mt_Qx5riGaO8e', strength: 'hard', reason: 'Formal classification builds on knowing India’s natural resources.' },
  { t: 'population-composition-migration', p: 'mt_29aZtsWvgT', strength: 'hard', reason: 'Composition and migration refine the earlier treatment of population.' },
  { t: 'india-physiographic-divisions', p: 'mt_zniDXv3Ko3', strength: 'hard', reason: 'The senior treatment of relief builds on India’s physical features.' },
  { t: 'india-drainage-systems', p: 'mt_UJqGKMoRvb', strength: 'hard', reason: 'Drainage systems build on knowing the Himalayas and India’s rivers.' },
  { t: 'india-drainage-systems', p: 'india-physiographic-divisions', strength: 'soft', reason: 'River systems follow the relief of the land.' },
  { t: 'indian-agriculture-cropping-reforms', p: 'mt_D3sDOaujQk', strength: 'hard', reason: 'Cropping patterns and reforms build on the basics of Indian agriculture.' },
  { t: 'indian-agriculture-cropping-reforms', p: 'soil-types-land-degradation', strength: 'soft', reason: 'What can be grown depends on soil type and condition.' },
  { t: 'industrial-location-and-pollution', p: 'mt_QCQjNxURAP', strength: 'hard', reason: 'Industrial location builds on knowing India’s industries.' },
  { t: 'transport-communication-trade', p: 'mt_VFhHCU805T', strength: 'soft', reason: 'The economic role of transport builds on how transport has changed over time.' },
  { t: 'making-of-the-indian-constitution', p: 'mt_zFL9HpDF22', strength: 'hard', reason: 'How the Constitution was made builds on knowing what it contains.' },
  { t: 'what-democracy-is-and-why', p: 'mt_7LYY3PybtA', strength: 'hard', reason: 'Defining democracy builds on comparing forms of government.' },
  { t: 'power-sharing-and-federalism', p: 'making-of-the-indian-constitution', strength: 'hard', reason: 'The federal division of power is set out in the Constitution.' },
  { t: 'power-sharing-and-federalism', p: 'mt_FJZZUv2ewS', strength: 'soft', reason: 'Panchayati Raj is the local tier of the power-sharing arrangement.' },
  { t: 'democracy-and-social-divisions', p: 'what-democracy-is-and-why', strength: 'hard', reason: 'Judging how divisions affect democracy needs a definition of it first.' },
  { t: 'social-movements-and-democracy', p: 'mt_ZfqyrBYcTZ', strength: 'soft', reason: 'Movements are contrasted with parties as routes to political change.' },
  { t: 'outcomes-of-democracy', p: 'democracy-and-social-divisions', strength: 'soft', reason: 'Assessing outcomes includes how well divisions are accommodated.' },
  { t: 'outcomes-of-democracy', p: 'power-sharing-and-federalism', strength: 'soft', reason: 'Power sharing is one of the arrangements whose outcomes are judged.' },
  { t: 'poverty-and-its-measurement', p: 'people-as-a-resource', strength: 'soft', reason: 'Human capital and poverty are two views of the same population.' },
  { t: 'food-security-and-pds', p: 'poverty-and-its-measurement', strength: 'hard', reason: 'Food insecurity is understood as a dimension of poverty.' },
  { t: 'measuring-development', p: 'poverty-and-its-measurement', strength: 'hard', reason: 'Development measures extend the problem of measuring deprivation.' },
  { t: 'people-as-a-resource', p: 'mt_yGbS9NpIU8', strength: 'hard', reason: 'Human capital refines labour as a factor of production.' },
  { t: 'money-banking-and-credit', p: 'mt_MOhhQz1xTG', strength: 'soft', reason: 'Credit institutions are part of the wider Indian economy.' },
  { t: 'consumer-rights-and-protection', p: 'mt_yWJTq3Oc3r', strength: 'soft', reason: 'Consumer protection concerns how markets set prices and terms.' },
];

integrateNcertSec({ subjectDoc: 'Geography, Political Science and Economics (IX–X)', standards, newTopics, alignments, newEdges });
