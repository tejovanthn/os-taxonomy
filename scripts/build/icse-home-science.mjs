#!/usr/bin/env node
/**
 * build/icse-home-science.mjs — ICSE Home Science (68), Classes IX–X (ages 14–16).
 *
 * Home Science held only nine topics and sat as a small island in the graph, so
 * this pass is mostly mints that grow the subject and wire it into the main
 * graph. ICSE covers the five streams of Home Science across two years: food and
 * nutrition, growth and development of children, the home and its upkeep,
 * textiles and fabric, home management, meal planning, and communication and
 * extension. Each syllabus unit is split into idea-grain topics — one teachable
 * idea apiece — and anchored to an existing Home Science topic or, where none
 * fits, to a related Science, Visual Arts, PSD, Life Skills or Social Studies
 * topic in the main graph, so the branch stops being an island.
 *
 * A few units squarely match a topic that already exists and are aligned rather
 * than minted: the scope of Home Science, family meal planning, food safety, and
 * the selection of clothing. Two new domains hold content the subject lacked a
 * home for: `Home Management` (colour, lighting, energy, waste, kitchen,
 * furnishing) and `Communication & Extension` (the fifth stream). Descriptions
 * are Marble-authored factual scope summaries — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const hs = topic('Home Science');
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('HSC9.1', 'IX', 'Concept and Scope of Home Science', 'Home Science as an applied field built from five streams — foods and nutrition, resource management, human development, textiles and clothing, and communication and extension — and its value as a many-sided subject for everyday life.'),
  s('HSC9.2', 'IX', 'Food and Health', 'The meaning of food, nutrient, nutrition, balanced diet, health and malnutrition; the physiological, psychological and social functions of food; common cookery terms; and the health benefits of everyday herbs and spices.'),
  s('HSC9.3', 'IX', 'Nutrients and Deficiency Diseases', 'Nutrients grouped by function — energy-giving, body-building, protective and regulatory — the foods that supply them, and the deficiency diseases a lasting shortage of each brings.'),
  s('HSC9.4', 'IX', 'Growth and Development of Children (0–5)', 'The difference between growth and development, the principles of development, and the physical, motor, social, emotional, cognitive and language milestones from birth to five years.'),
  s('HSC9.5', 'IX', 'Play in Early Childhood', 'The place of play in a young child’s all-round growth, the choice of indoor and outdoor play and materials, the types of play, and the kinds of play-school.'),
  s('HSC9.6', 'IX', 'Childhood Diseases and Immunisation', 'The common diseases of early childhood and their vaccines, and the meaning and importance of immunisation in protecting a child.'),
  s('HSC9.7', 'IX', 'Colour in the Home', 'The three dimensions of colour — hue, value and intensity — the colour wheel, and related and contrasting colour schemes applied to the rooms of a home.'),
  s('HSC9.8', 'IX', 'Lighting in the Home', 'Types of lighting — general and task, direct and indirect — natural and artificial sources of light, and matching lighting to the use of each room.'),
  s('HSC9.9', 'IX', 'Fuel and Energy in the Home', 'The need to conserve cooking gas, water and electricity in the home, and everyday methods for using fuel and energy sparingly.'),
  s('HSC9.10', 'IX', 'Sanitation and Waste Management', 'The role of sanitation and hygiene in and around the home; biodegradable and non-biodegradable waste; the value of segregating waste; and the five Rs of conservation.'),
  s('HSC9.11', 'IX', 'Textile Fibres', 'The meaning and classification of fibres — natural, man-made and synthetic — the origin, properties and uses of the main fibres, and the burning and microscope tests that identify them.'),
  s('HSC9.12', 'IX', 'Fabric Construction', 'How yarn becomes cloth — the terms yarn, warp, weft and selvedge; woven fabrics and their weaves; and non-woven and knitted construction with their end uses.'),
  s('HSC9.13', 'IX', 'Communication and Extension', 'The meaning, functions and importance of communication; its elements — sender, message, medium, receiver and feedback; and interpersonal communication through listening, speaking, reading and writing.'),
  // ---- Class X ----
  s('HSC10.1', 'X', 'Household Finances', 'The idea and importance of a family budget, its surplus, balanced and deficit types, the factors shaping it, the steps in drawing one up, and the importance of saving.'),
  s('HSC10.2', 'X', 'Kitchen Space Organisation', 'The marks of a good kitchen and its layouts — one-walled, corridor, L-shaped, U-shaped and island — the work triangle of preparation, cooking and washing, and the modular kitchen.'),
  s('HSC10.3', 'X', 'Home Furnishing', 'The meaning and aims of home furnishing — beauty, expressiveness and function — and the factors guiding the choice of curtains, floor coverings and upholstery.'),
  s('HSC10.4', 'X', 'Growth and Development in Middle Childhood', 'The gang age of six to twelve years and its physical, social, emotional, cognitive and language development, and the part played by family, peer group and school.'),
  s('HSC10.5', 'X', 'Learning Difficulties', 'The meaning of a learning difficulty; the signs of dyslexia, dysgraphia, dyscalculia and ADHD; and the role of family, school and peers in accepting and supporting affected children.'),
  s('HSC10.6', 'X', 'Meal Planning', 'The five basic food groups and their contribution to the diet, and the meaning, principles, importance and shaping factors of planning meals for a family.'),
  s('HSC10.7', 'X', 'Food Hygiene and Storage', 'Food hygiene in buying, storing, preparing and serving; personal hygiene and kitchen safety; the storage of perishable, semi-perishable and non-perishable foods; convenience foods; and household preservation methods.'),
  s('HSC10.8', 'X', 'Selection of Textiles and Garments', 'The factors guiding the choice of fabric — age, occupation, season, occasion and purchasing power — and of readymade garments — fit, colour, workmanship, cost and upkeep.'),
  s('HSC10.9', 'X', 'Laundering of Clothes', 'Household methods for laundering cotton, silk, wool and synthetics, and the use of detergents, soaps, starch, blue and optical brighteners.'),
  s('HSC10.10', 'X', 'Development Terminology and Schemes', 'The meaning of terms used in development — from gender discrimination and women’s empowerment to the poverty line and carbon footprint — and the aim and target group of major Indian welfare schemes.'),
  s('HSC10.11', 'X', 'Communication Aids', 'The meaning and use of communication aids — posters, brochures, pamphlets, puppet shows and street plays — for addressing social concerns.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  // Food & Nutrition
  hs('icse-hs-food-functions', 'Food and Its Functions', 'Food & Nutrition', IX, 'CONCEPTUAL',
    'Understand that food does more than fill the stomach — it keeps the body working, lifts the spirits and brings people together — and know terms like nutrient, balanced diet and malnutrition.',
    EV('Names a physiological, a psychological and a social function of food', 'Defines nutrient, balanced diet and malnutrition in own words', 'Gives an everyday example of food serving a social purpose'),
    'Ask {{name}} to explain how food does more than feed the body — how it also cheers us and brings people together.',
    ['HSC9.2']),
  hs('icse-hs-cookery-terms', 'Basic Cookery Terms', 'Food & Nutrition', IX, 'PROCEDURAL',
    'Understand the standard words for kitchen actions — chopping, grating, kneading, beating, folding, blending and the rest — as named techniques a recipe expects the cook already to know.',
    EV('Matches a cookery term to the action it names', 'Demonstrates or describes techniques such as kneading, folding and grating', 'Follows a simple recipe step that uses these terms'),
    'Ask {{name}} what a recipe means when it says to fold, knead or blend, and to show the action.',
    ['HSC9.2']),
  hs('icse-hs-herbs-spices-health', 'Health Benefits of Herbs and Spices', 'Food & Nutrition', IX, 'CONCEPTUAL',
    'Understand that common kitchen herbs and spices — mint, coriander, turmeric, ginger, cumin and others — bring health benefits as well as flavour, a use long held in Indian cooking.',
    EV('Names a health benefit of a common herb or spice', 'Distinguishes a herb from a spice with examples', 'Explains how a spice is used at home for a minor ailment'),
    'Ask {{name}} to name a kitchen spice like turmeric or ginger and say what good it does beyond taste.',
    ['HSC9.2']),
  hs('icse-hs-nutrient-classification', 'Classifying Nutrients by Function', 'Food & Nutrition', IX, 'CONCEPTUAL',
    'Understand that nutrients group by the job they do — carbohydrates and fats for energy, proteins and minerals for building the body, vitamins and minerals for protection, water and roughage for regulation.',
    EV('Sorts nutrients into energy-giving, body-building, protective and regulatory', 'Names a food source for each nutrient group', 'Explains the job one nutrient does in the body'),
    'Ask {{name}} which nutrients give energy, which build the body, and which keep it protected.',
    ['HSC9.3']),
  hs('icse-hs-deficiency-diseases', 'Nutrient Deficiency Diseases', 'Food & Nutrition', IX, 'CONCEPTUAL',
    'Understand that a lasting shortage of a particular nutrient brings its own deficiency disease, so a specific illness can point to just which vitamin or mineral the diet is missing.',
    EV('Matches a deficiency disease to the missing nutrient', 'Names a food that would prevent a given deficiency', 'Explains why a varied diet guards against deficiency'),
    'Ask {{name}} how going short of a nutrient like iron or vitamin A can cause a particular illness.',
    ['HSC9.3']),
  // Human Development
  hs('icse-hs-developmental-milestones', 'Growth, Development and Milestones', 'Human Development', IX, 'CONCEPTUAL',
    'Understand that growth means getting bigger while development means gaining skill, and that milestones mark the ages by which a child from birth to five is expected to reach each new ability.',
    EV('States the difference between growth and development', 'Names a milestone in physical, motor, language or social development', 'Explains what a developmental milestone is for'),
    'Ask {{name}} to explain the difference between a child growing bigger and a child gaining new skills.',
    ['HSC9.4']),
  hs('icse-hs-play-early-childhood', 'Play and Play-Schools in Early Childhood', 'Human Development', IX, 'CONCEPTUAL',
    'Understand that play is how a young child grows in body, mind and feeling, that the kind of play and the materials should suit the child, and what a play-school offers.',
    EV('Explains how play supports a child’s all-round growth', 'Names a type of play such as constructive, fantasy or cooperative', 'Describes what a play-school like a nursery or kindergarten provides'),
    'Ask {{name}} why play is the main way a small child learns and grows.',
    ['HSC9.5']),
  hs('icse-hs-childhood-immunisation', 'Childhood Diseases and Immunisation', 'Human Development', IX, 'CONCEPTUAL',
    'Understand that vaccines protect young children against common diseases like measles, polio and whooping cough, and that immunisation on schedule is one of the surest ways to keep a child well.',
    EV('Names a childhood disease and the vaccine that prevents it', 'Explains what immunisation means', 'Explains why vaccinating on time matters for a child'),
    'Ask {{name}} how vaccines protect a small child from diseases like measles or polio.',
    ['HSC9.6']),
  // Home Management (new domain)
  hs('icse-hs-colour-in-the-home', 'Colour in the Home', 'Home Management', IX, 'REPRESENTATIONAL',
    'Understand colour through its three dimensions — hue, value and intensity — and how related and contrasting schemes drawn from the colour wheel set the feel of each room in a home.',
    EV('Names the three dimensions of colour', 'Distinguishes a related from a contrasting colour scheme', 'Chooses a colour scheme suited to a particular room'),
    'Ask {{name}} how the colours chosen for a room change the way it feels.',
    ['HSC9.7']),
  hs('icse-hs-lighting-in-the-home', 'Lighting in the Home', 'Home Management', IX, 'CONCEPTUAL',
    'Understand that a home is lit from natural and artificial sources, that lighting may be general or task and direct or indirect, and that each room needs light suited to its use.',
    EV('Distinguishes general from task lighting', 'Distinguishes natural from artificial light sources', 'Chooses suitable lighting for a named room'),
    'Ask {{name}} why a kitchen and a bedroom need different kinds of lighting.',
    ['HSC9.8']),
  hs('icse-hs-home-energy-conservation', 'Conserving Fuel and Energy at Home', 'Home Management', IX, 'CONCEPTUAL',
    'Understand why cooking gas, water and electricity are worth saving at home, and the everyday habits and choices that cut how much a household uses without giving up comfort.',
    EV('Explains why saving fuel, water and power matters', 'Names an everyday way to conserve gas, water or electricity', 'Identifies waste of energy in a described household'),
    'Ask {{name}} for simple ways the family could use less water, gas or electricity at home.',
    ['HSC9.9']),
  hs('icse-hs-waste-management-home', 'Waste Segregation and the Five Rs', 'Home Management', IX, 'CONCEPTUAL',
    'Understand household waste as biodegradable or non-biodegradable, why sorting it at home matters, and how the five Rs — reduce, refuse, reuse, recycle and reinvent — cut what is thrown away.',
    EV('Sorts waste into biodegradable and non-biodegradable', 'Explains why segregating waste helps', 'Names and applies one of the five Rs'),
    'Ask {{name}} why the household should separate its waste, and to name a way to make less of it.',
    ['HSC9.10']),
  // Textiles & Clothing
  hs('icse-hs-textile-fibres', 'Textile Fibres and Their Properties', 'Textiles & Clothing', IX, 'CONCEPTUAL',
    'Understand that fibres are natural, man-made or synthetic, that each — cotton, silk, wool, rayon, nylon, polyester — has properties fixing its uses, and that burning and microscope tests tell them apart.',
    EV('Classifies a fibre as natural, man-made or synthetic', 'Matches a fibre’s properties to a suitable use', 'Describes how a burning or microscope test identifies a fibre'),
    'Ask {{name}} how cotton, wool and nylon differ, and how you could tell one from another.',
    ['HSC9.11']),
  hs('icse-hs-fabric-construction', 'How Fabric Is Made', 'Textiles & Clothing', IX, 'CONCEPTUAL',
    'Understand how yarn becomes cloth — woven fabric crossing warp and weft in plain, twill or satin weaves, knitted fabric looped from yarn, and non-woven felt pressed straight from fibre.',
    EV('Defines yarn, warp, weft and selvedge', 'Distinguishes woven, knitted and non-woven fabric', 'Matches a construction method to an end use'),
    'Ask {{name}} how threads are turned into cloth, and how knitted cloth differs from woven.',
    ['HSC9.12']),
  // Communication & Extension (new domain)
  hs('icse-hs-communication-process', 'The Communication Process', 'Communication & Extension', IX, 'CONCEPTUAL',
    'Understand communication as a message passing from a sender through a medium to a receiver who sends feedback, and that the message only lands when each of these parts does its work.',
    EV('Names the elements of the communication process', 'Traces a message from sender to receiver and back', 'Explains why feedback completes communication'),
    'Ask {{name}} what has to happen for a message to get across from one person to another.',
    ['HSC9.13']),
  hs('icse-hs-interpersonal-skills', 'Interpersonal Communication Skills', 'Communication & Extension', IX, 'PROCEDURAL',
    'Understand interpersonal communication as the back-and-forth between people, resting on four skills — listening, speaking, reading and writing — that anyone can practise and get better at.',
    EV('Names the four interpersonal communication skills', 'Demonstrates active listening in a conversation', 'Explains how one skill can be improved with practice'),
    'Ask {{name}} to show good listening and speaking when talking something through with another person.',
    ['HSC9.13']),
  // ---------------- Class X ----------------
  // Resource Management
  hs('icse-hs-family-budget', 'The Family Budget', 'Resource Management', X, 'PROCEDURAL',
    'Understand a family budget as a plan matching income to spending — surplus, balanced or deficit — shaped by the family’s size and circumstances, with saving built in from the start.',
    EV('Distinguishes a surplus, balanced and deficit budget', 'Lists the steps in drawing up a family budget', 'Explains why saving belongs in a sound budget'),
    'Ask {{name}} how a family plans its spending so that it does not run short and can still save.',
    ['HSC10.1']),
  // Home Management (new domain)
  hs('icse-hs-kitchen-space-planning', 'Planning the Kitchen: The Work Triangle', 'Home Management', X, 'CONCEPTUAL',
    'Understand that a kitchen is planned around a work triangle joining preparation, cooking and washing, so that its layout — L-shaped, U-shaped, island or modular — saves time, steps and effort.',
    EV('Explains the kitchen work triangle and its three centres', 'Names a kitchen layout such as L-shaped or island', 'Explains how good layout saves time and energy'),
    'Ask {{name}} how the way a kitchen is arranged can save the cook time and effort.',
    ['HSC10.2']),
  hs('icse-hs-home-furnishing', 'Home Furnishing', 'Home Management', X, 'CONCEPTUAL',
    'Understand home furnishing — curtains, floor coverings and upholstery — as choices that balance beauty, expressiveness and use, and know the factors that guide picking each of them.',
    EV('States the aims of home furnishing', 'Names factors in choosing curtains, floor coverings or upholstery', 'Explains how a furnishing choice balances looks and use'),
    'Ask {{name}} what to weigh up when choosing curtains or a rug for a room.',
    ['HSC10.3']),
  // Human Development
  hs('icse-hs-middle-childhood-development', 'Development in Middle Childhood', 'Human Development', X, 'CONCEPTUAL',
    'Understand the years from six to twelve — the gang age — as a stage where physical, social, emotional, cognitive and language development advance together, shaped by family, friends and school.',
    EV('Explains what is meant by the gang age', 'Names a development seen in middle childhood', 'Explains how peers or school shape a child at this stage'),
    'Ask {{name}} how a school-age child changes, and how friends and school shape that growth.',
    ['HSC10.4']),
  hs('icse-hs-learning-difficulties', 'Learning Difficulties in Children', 'Human Development', X, 'CONCEPTUAL',
    'Understand that dyslexia, dysgraphia, dyscalculia and ADHD are specific learning difficulties with recognisable signs, and that family, school and peers can accept and support a child who has one.',
    EV('Matches a learning difficulty to its main signs', 'Explains that a learning difficulty is not a lack of ability', 'Suggests a way school or family can support such a child'),
    'Ask {{name}} what a learning difficulty like dyslexia is, and how classmates can be supportive.',
    ['HSC10.5']),
  // Food & Nutrition
  hs('icse-hs-food-storage', 'Storing Food by Perishability', 'Food & Nutrition', X, 'CONCEPTUAL',
    'Understand that foods are perishable, semi-perishable or non-perishable, that each needs its own kind of storage to stay safe, and the good and bad points of convenience foods.',
    EV('Sorts foods into perishable, semi-perishable and non-perishable', 'Describes suitable storage for a perishable food', 'States an advantage and a drawback of convenience foods'),
    'Ask {{name}} why milk and rice need to be stored in different ways to keep them safe.',
    ['HSC10.7']),
  // Textiles & Clothing
  hs('icse-hs-laundering-clothes', 'Laundering Different Fabrics', 'Textiles & Clothing', X, 'PROCEDURAL',
    'Understand that cotton, silk, wool and synthetics each need their own washing method, and what detergents, soap, starch, blue and optical brighteners each do in cleaning and finishing cloth.',
    EV('Describes a suitable laundering method for a named fabric', 'Explains why wool and silk need gentler washing than cotton', 'States what starch, blue or a brightener does'),
    'Ask {{name}} why a woollen jumper is not washed the same way as a cotton shirt.',
    ['HSC10.9']),
  // Communication & Extension (new domain)
  hs('icse-hs-development-terminology', 'The Language of Development', 'Communication & Extension', X, 'LANGUAGE',
    'Understand the terms used to discuss social development — gender discrimination, women’s empowerment, sex ratio, child labour, the poverty line and carbon footprint — as named ideas behind public debate.',
    EV('Explains a term such as women’s empowerment or child labour', 'Distinguishes two related terms like sex ratio and female foeticide', 'Uses a development term correctly in a sentence'),
    'Ask {{name}} to explain in their own words what terms like child labour or women’s empowerment mean.',
    ['HSC10.10']),
  hs('icse-hs-welfare-schemes', 'Indian Development and Welfare Schemes', 'Communication & Extension', X, 'CONCEPTUAL',
    'Understand a set of Indian government schemes — MNREGA, Ayushman Bharat, Ujjwala and Jan Dhan among them — by what each one provides and the group of people it is meant to reach.',
    EV('Matches a scheme to what it provides', 'Names the target group of a given scheme', 'Explains how one scheme helps the people it serves'),
    'Ask {{name}} to name an Indian welfare scheme and say who it helps and how.',
    ['HSC10.10']),
  hs('icse-hs-communication-aids', 'Communication Aids for Social Awareness', 'Communication & Extension', X, 'PROCEDURAL',
    'Understand how posters, brochures, pamphlets, puppet shows and street plays carry a message to a community, and how to match the aid to the social concern it is meant to address.',
    EV('Names several communication aids', 'Matches a communication aid to a social concern', 'Explains why a chosen aid suits its message and audience'),
    'Ask {{name}} for a good way — a poster, puppet show or street play — to spread an important message.',
    ['HSC10.11']),
];

// Four units squarely match a topic that already exists — align rather than mint.
const alignments = {
  mt_yXg0blyrpv: ['HSC9.1'],   // What Is Home Science  ← concept and scope
  mt_reuQF6QDDo: ['HSC10.6'],  // Balanced Diet and Meal Planning  ← meal planning
  mt_H3f0rwBuKf: ['HSC10.7'],  // Food Safety and Preservation  ← food hygiene and preservation
  mt_KN6c2I9QuB: ['HSC10.8'],  // Selection and Care of Clothing  ← selecting fabric and garments
};

const newEdges = [
  // ---- Anchors into the main graph (connecting the Home Science island) ----
  { t: 'icse-hs-food-functions', p: 'mt_QhLAeAlHI0', strength: 'soft', reason: 'Builds on the primary-school idea of a balanced diet and food groups.' },
  { t: 'icse-hs-nutrient-classification', p: 'mt_sDmrVCfzqt', strength: 'hard', reason: 'Grouping nutrients by function extends the science topic on nutrients in a healthy diet.' },
  { t: 'icse-hs-deficiency-diseases', p: 'mt_NZHFcEtTyI', strength: 'hard', reason: 'Deficiency diseases are the diet imbalance already met in science.' },
  { t: 'icse-hs-childhood-immunisation', p: 'mt_LkOMijDvL7', strength: 'hard', reason: 'Applies the science of immunity and vaccines to young children.' },
  { t: 'icse-hs-colour-in-the-home', p: 'mt_reeZNBYG9Q', strength: 'hard', reason: 'Colour in the home builds on the visual-arts study of colour.' },
  { t: 'icse-hs-home-energy-conservation', p: 'mt_0e5rZxbAeR', strength: 'hard', reason: 'Saving fuel and power at home applies the idea of finite resources and recycling.' },
  { t: 'icse-hs-waste-management-home', p: 'mt_MqjZhvyWVa', strength: 'hard', reason: 'Household waste sorting builds on the science of waste and its management.' },
  { t: 'icse-hs-textile-fibres', p: 'mt_bKvMdYmfbn', strength: 'hard', reason: 'Fibre properties build on the primary-school topic on fibres and fabrics.' },
  { t: 'icse-hs-communication-process', p: 'mt_Ag9NSWJu-X', strength: 'soft', reason: 'Extends the communication vocabulary met in personal and social development.' },
  { t: 'icse-hs-interpersonal-skills', p: 'mt_rqLMfiw61L', strength: 'soft', reason: 'Interpersonal skills build on assertive communication from personal and social development.' },
  { t: 'icse-hs-family-budget', p: 'mt_r1hw-KenpK', strength: 'hard', reason: 'A family budget applies the life-skills idea of financial planning.' },
  { t: 'icse-hs-learning-difficulties', p: 'mt_2oswCNuapH', strength: 'soft', reason: 'Accepting a child with a learning difficulty draws on understanding individual differences.' },
  { t: 'icse-hs-development-terminology', p: 'mt_BlcpwdLsRX', strength: 'soft', reason: 'Development terms build on the social-studies topic on gender equality and reform.' },
  { t: 'icse-hs-welfare-schemes', p: 'mt_t1uflyWbd1', strength: 'hard', reason: 'These are the national development schemes already introduced in social studies.' },
  // ---- Anchors to the existing Home Science topics ----
  { t: 'icse-hs-developmental-milestones', p: 'mt_aetv4BzDOo', strength: 'hard', reason: 'Milestones make the general growth-and-development topic precise.' },
  { t: 'icse-hs-family-budget', p: 'mt_CYEyqYYkNn', strength: 'hard', reason: 'The family budget is part of managing family resources.' },
  { t: 'icse-hs-food-storage', p: 'mt_H3f0rwBuKf', strength: 'hard', reason: 'Storing food by perishability extends food safety and preservation.' },
  { t: 'icse-hs-laundering-clothes', p: 'mt_KN6c2I9QuB', strength: 'soft', reason: 'Laundering is part of the care of clothing.' },
  // ---- Sequencing among the new topics ----
  { t: 'icse-hs-cookery-terms', p: 'icse-hs-food-functions', strength: 'soft', reason: 'Cookery terms come with learning what food is and how it is prepared.' },
  { t: 'icse-hs-herbs-spices-health', p: 'icse-hs-food-functions', strength: 'soft', reason: 'The health value of spices sits within the functions of food.' },
  { t: 'icse-hs-nutrient-classification', p: 'icse-hs-food-functions', strength: 'hard', reason: 'Nutrients are what makes food do its work.' },
  { t: 'icse-hs-deficiency-diseases', p: 'icse-hs-nutrient-classification', strength: 'hard', reason: 'A deficiency disease follows from missing a nutrient group.' },
  { t: 'icse-hs-play-early-childhood', p: 'icse-hs-developmental-milestones', strength: 'hard', reason: 'Play is how a child reaches its early milestones.' },
  { t: 'icse-hs-childhood-immunisation', p: 'icse-hs-developmental-milestones', strength: 'soft', reason: 'Guarding a child’s health is part of caring for early development.' },
  { t: 'icse-hs-lighting-in-the-home', p: 'icse-hs-colour-in-the-home', strength: 'soft', reason: 'Lighting and colour are chosen together for a room.' },
  { t: 'icse-hs-home-energy-conservation', p: 'icse-hs-lighting-in-the-home', strength: 'soft', reason: 'Lighting choices are one place a home saves or wastes energy.' },
  { t: 'icse-hs-fabric-construction', p: 'icse-hs-textile-fibres', strength: 'hard', reason: 'Fabric is built from the fibres and yarn met first.' },
  { t: 'icse-hs-interpersonal-skills', p: 'icse-hs-communication-process', strength: 'hard', reason: 'Talking with people applies the communication process.' },
  { t: 'icse-hs-kitchen-space-planning', p: 'icse-hs-home-energy-conservation', strength: 'soft', reason: 'A well-planned kitchen saves the time and energy just studied.' },
  { t: 'icse-hs-home-furnishing', p: 'icse-hs-colour-in-the-home', strength: 'hard', reason: 'Choosing furnishings rests on the study of colour in the home.' },
  { t: 'icse-hs-middle-childhood-development', p: 'icse-hs-developmental-milestones', strength: 'hard', reason: 'Middle childhood follows the early-childhood milestones.' },
  { t: 'icse-hs-learning-difficulties', p: 'icse-hs-middle-childhood-development', strength: 'hard', reason: 'Learning difficulties show up in the school years of middle childhood.' },
  { t: 'icse-hs-laundering-clothes', p: 'icse-hs-textile-fibres', strength: 'hard', reason: 'How a fabric is washed depends on its fibre.' },
  { t: 'icse-hs-welfare-schemes', p: 'icse-hs-development-terminology', strength: 'soft', reason: 'The schemes answer the social problems the terms name.' },
  { t: 'icse-hs-communication-aids', p: 'icse-hs-communication-process', strength: 'hard', reason: 'A communication aid is a medium in the communication process.' },
  { t: 'icse-hs-communication-aids', p: 'icse-hs-interpersonal-skills', strength: 'soft', reason: 'Using aids well draws on communication skills.' },
];

const newClusters = [
  { subject: 'Home Science', domain: 'Human Development', ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'Class IX follows a child through the first five years. The learner separates growth, which is getting bigger, from development, which is gaining skill, and meets the milestones that mark when each new ability is expected — in movement, language, feeling and thought. Play is seen as the main way a small child grows, and the stream closes with the common diseases of early childhood and the vaccines that guard against them.' },
  { subject: 'Home Science', domain: 'Human Development', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X moves on to middle childhood, the years from six to twelve. Body, mind and feeling develop together in this gang age, shaped now as much by friends and school as by family. The stream also looks at specific learning difficulties — dyslexia, dysgraphia, dyscalculia and ADHD — teaching their signs and, just as important, how family, teachers and classmates can accept and support a child who has one.' },
  { subject: 'Home Science', domain: 'Home Management', ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'This is Home Science turning to the home itself. In Class IX the learner looks at how a home is made to work and to please: colour and the way hue, value and intensity set the mood of a room; lighting matched to what each room is for; and the daily care of the place — saving cooking gas, water and power, and sorting waste so that less is thrown away. Each idea is practical and can be tried out in the learner’s own home.' },
  { subject: 'Home Science', domain: 'Home Management', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X carries home management into the kitchen and the furnishings. The kitchen is planned around a work triangle joining the places for preparing, cooking and washing, so that its layout saves the cook time and steps; the modular kitchen is the same idea taken further. Home furnishing — curtains, floor coverings and upholstery — is then chosen to balance how a room looks against how it is used.' },
  { subject: 'Home Science', domain: 'Communication & Extension', ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'Communication is the fifth stream of Home Science, and Class IX starts with how it works. A message passes from a sender through some medium to a receiver, who answers back with feedback; the message only lands when each part plays its role. From there the learner meets interpersonal communication — the give and take between people — and the four skills it rests on: listening, speaking, reading and writing, all of which improve with practice.' },
  { subject: 'Home Science', domain: 'Communication & Extension', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X puts communication to work on social concerns. First comes the language of development — terms such as gender discrimination, women’s empowerment, child labour and the poverty line — and a set of Indian government schemes, each known by what it gives and whom it is meant to reach. Then come the aids that carry these messages to a community: posters, pamphlets, puppet shows and street plays, chosen to suit the concern at hand.' },
  { subject: 'Home Science', domain: 'Food & Nutrition', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X food work turns from what to eat to how to keep it. Foods are sorted by how quickly they spoil — perishable, semi-perishable and non-perishable — each needing its own kind of storage to stay safe, and the convenience foods that save time are weighed for their good and bad points. This sits alongside the meal planning and food safety the learner already knows.' },
  { subject: 'Home Science', domain: 'Textiles & Clothing', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X textiles is about care. Having met fibres and fabrics, the learner now launders them: cotton, silk, wool and synthetics each need their own washing method, gentler for wool and silk than for cotton, and detergents, soap, starch, blue and brighteners each have their job in getting cloth clean and finished well.' },
  { subject: 'Home Science', domain: 'Resource Management', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X opens with the family budget — a plan that matches what a household earns against what it spends. A budget may run to a surplus, balance, or fall into deficit, and its shape depends on the size and circumstances of the family. The learner follows the steps of drawing one up and sees why saving is built in rather than left to chance.' },
];

integrate({ subjectDoc: 'Home Science (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
