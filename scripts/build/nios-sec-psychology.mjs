#!/usr/bin/env node
/**
 * build/nios-sec-psychology.mjs — NIOS Secondary Psychology (Code 222) → a new
 * "Psychology" subject. 27 lessons across 7 modules; ~6 overlap existing PSD/
 * Science topics (aligned), the rest become academic-psychology micro-topics.
 * Idempotent. Run after nios-sec.mjs helpers exist; then manifest + validate.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Psychology', courseCode: '222' };
const P = 'Psychology';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('222.M1.L1', 'I. Foundations of Psychology', 'An Introduction to Psychology', 'An Introduction to Psychology', 'Understand psychology as the scientific study of behaviour and mental processes, and its main fields and applications.'),
  std('222.M1.L2', 'I. Foundations of Psychology', 'Methods of Psychology', 'Methods of Psychology', 'Understand how psychologists study behaviour — observation, experiment, survey, interview and case study.'),
  std('222.M1.L3', 'I. Foundations of Psychology', 'Individual Differences', 'Individual Differences', 'Understand that people differ in intelligence, personality and abilities, and how these differences are described and measured.'),
  std('222.M2.L4', 'II. Basic Psychological Processes', 'Learning', 'Learning', 'Understand learning as a relatively lasting change in behaviour through experience — classical and operant conditioning and observational learning.'),
  std('222.M2.L5', 'II. Basic Psychological Processes', 'Sensory Processes: Attention and Perception', 'Sensory Processes: Attention and Perception', 'Understand how we take in information through the senses, attend to some of it, and organise it into meaningful perception.'),
  std('222.M2.L6', 'II. Basic Psychological Processes', 'Memory', 'Memory', 'Understand memory as encoding, storage and retrieval, its stages, why we forget, and how to remember better.'),
  std('222.M2.L7', 'II. Basic Psychological Processes', 'Thinking and Problem Solving', 'Thinking and Problem Solving', 'Understand thinking, reasoning, problem solving and decision making, and obstacles to good thinking.'),
  std('222.M2.L8', 'II. Basic Psychological Processes', 'Motivation and Emotion', 'Motivation and Emotion', 'Understand motivation as what drives behaviour (needs, drives, goals) and emotion as feeling states with bodily and mental components.'),
  std('222.M3.L9', 'III. Human Development', 'Nature and Determinants of Development', 'Nature and Determinants of Development', 'Understand human development across the lifespan and how heredity (nature) and environment (nurture) shape it.'),
  std('222.M3.L10', 'III. Human Development', 'Childhood', 'Childhood', 'Understand the physical, cognitive, emotional and social development that happens during childhood.'),
  std('222.M3.L11', 'III. Human Development', 'Adolescence and its Challenges', 'Adolescence and its Challenges', 'Understand adolescence as a stage of rapid change and identity formation, and the challenges it brings.'),
  std('222.M3.L12', 'III. Human Development', 'Adulthood and Aging', 'Adulthood and Aging', 'Understand the stages, tasks and changes of adulthood and aging.'),
  std('222.M4.L13', 'IV. Social Psychological Processes', 'Groups and Leadership', 'Groups and Leadership', 'Understand how people behave in groups and the nature and styles of leadership.'),
  std('222.M4.L14', 'IV. Social Psychological Processes', 'Communication', 'Communication', 'Understand the process of communication, its types (verbal and non-verbal), and barriers to it.'),
  std('222.M4.L15', 'IV. Social Psychological Processes', 'Attitudes, Beliefs and Social Cognition', 'Attitudes, Beliefs and Social Cognition', 'Understand how attitudes and beliefs form and change, and how we perceive and think about other people.'),
  std('222.M4.L16', 'IV. Social Psychological Processes', 'Social and Educational Problems', 'Social and Educational Problems', 'Understand some major social and educational problems from a psychological point of view.'),
  std('222.M5.L17', 'V. Health and Well Being', 'Happiness and Wellbeing', 'Happiness and Wellbeing', 'Understand the psychology of happiness and well-being and the obstacles to and paths towards them.'),
  std('222.M5.L18', 'V. Health and Well Being', 'Mental Disorders and their Treatment', 'Mental Disorders and their Treatment', 'Understand what mental disorders are, some common ones, and how they can be treated — reducing stigma.'),
  std('222.M5.L19', 'V. Health and Well Being', 'Mental Health and Hygiene', 'Mental Health and Hygiene', 'Understand mental health and everyday practices that support positive mental health.'),
  std('222.M6.L20', 'VI. Work Life and Environmental Concerns', 'Aptitude, Interest and Job Requirements', 'Aptitude, Interest and Job Requirements', 'Understand aptitudes and interests and how they relate to the requirements of different jobs.'),
  std('222.M6.L21', 'VI. Work Life and Environmental Concerns', 'Preparation for the Vocational Role', 'Preparation for the Vocational Role', 'Understand how to prepare for a vocational role — skills, planning and readiness for work.'),
  std('222.M6.L22', 'VI. Work Life and Environmental Concerns', 'The World of Organization', 'The World of Organization', 'Understand how psychology applies to organisations and the world of work.'),
  std('222.M6.L23', 'VI. Work Life and Environmental Concerns', 'Environmental Stress', 'Environmental Stress', 'Understand stress arising from the environment and ways of coping with it.'),
  std('222.M7.L24', 'VII. Yoga: A Way of Life', 'Healthy Mind in a Healthy Body', 'Healthy Mind in a Healthy Body', 'Understand yoga as an ancient practice linking a healthy body and a healthy mind.'),
  std('222.M7.L25', 'VII. Yoga: A Way of Life', 'Self-development and Yoga', 'Self-development and Yoga', 'Understand how yoga supports self-development, self-awareness and regulation.'),
  std('222.M7.L26', 'VII. Yoga: A Way of Life', 'Nurturing the Whole Person', 'Nurturing the Whole Person', 'Understand yoga as nurturing the whole person — body, mind and emotions.'),
  std('222.M7.L27', 'VII. Yoga: A Way of Life', 'Controlling and Regulating the Mind', 'Controlling and Regulating the Mind', 'Understand yoga and meditation as ways of calming and regulating the mind.'),
];

// Lessons that existing PSD/Science topics already teach → align, don't duplicate.
// (ids verified against data/topics.json)
const alignments = Object.fromEntries([
  ['mt_p-8Hlf6_9k', ['222.M3.L11']],  // Identity and Belonging in Adolescence ← Adolescence
  ['mt_pu2mmK27UA', ['222.M3.L11']],  // Growing Up & Puberty ← Adolescence
  ['mt_8StiXnYq1u', ['222.M4.L13']],  // Leadership Styles and Influence ← Groups and Leadership
  ['mt_nqM2OW0Qlm', ['222.M4.L13']],  // Social Cues and Group Dynamics ← Groups and Leadership
  ['mt_rqLMfiw61L', ['222.M4.L14']],  // Assertive Communication ← Communication
  ['mt_mydcMoa8gN', ['222.M2.L8']],   // Emotional Intelligence ← Motivation and Emotion
  ['mt_0VOZSVjo6c', ['222.M6.L23']],  // Good Stress and Bad Stress ← Environmental Stress
  ['mt_gf4RUcACLg', ['222.M2.L5']],   // Brain Science of Emotions ← Sensory Processes (soft overlap)
]);

const T = (_slug, domain, name, a0, a1, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: P, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  // Foundations
  T('psy-what-is', 'Foundations of Psychology', 'What Is Psychology', 14, 16, 'CONCEPTUAL',
    'Understand psychology as the scientific study of behaviour and mental processes — how we think, feel and act — and the main fields where it is applied.',
    ['Define psychology as the scientific study of behaviour and mental processes', 'Give examples of what psychologists study', 'Name a field where psychology is applied (clinical, educational, organisational)'],
    'Can {{name}} explain what psychology is — the scientific study of how people think, feel and behave — and give an example of where it is used?', ['nios-sec-2020:222.M1.L1']),
  T('psy-methods', 'Foundations of Psychology', 'How Psychologists Study Behaviour', 14, 16, 'CONCEPTUAL',
    'Understand the methods psychologists use to study behaviour scientifically — observation, experiment, survey, interview and case study — and why a systematic method matters.',
    ['Name several methods used in psychology', 'Explain the difference between observation and experiment', 'Explain why psychology uses systematic methods rather than opinion'],
    'Can {{name}} name a few ways psychologists study behaviour, like experiments and surveys, and explain why a careful method matters?', ['nios-sec-2020:222.M1.L2']),
  T('psy-individual-differences', 'Foundations of Psychology', 'Individual Differences', 14, 16, 'CONCEPTUAL',
    'Understand that people differ from one another in intelligence, personality and abilities, and that psychologists describe and measure these individual differences.',
    ['Explain what individual differences are', 'Give examples of ways people differ (intelligence, personality)', 'Explain that such differences can be measured'],
    'Can {{name}} explain that people differ in things like personality and ability, and that psychology tries to describe and measure those differences?', ['nios-sec-2020:222.M1.L3']),
  // Basic psychological processes
  T('psy-learning', 'Basic Psychological Processes', 'How We Learn: Conditioning', 14, 16, 'CONCEPTUAL',
    'Understand learning as a lasting change in behaviour through experience — classical conditioning (learning by association), operant conditioning (learning from consequences), and learning by observing others.',
    ['Explain learning as a change in behaviour from experience', 'Distinguish classical from operant conditioning with an example', 'Give an example of learning by observation'],
    'Can {{name}} explain how we learn from experience — through association, through rewards and consequences, and by watching others?', ['nios-sec-2020:222.M2.L4']),
  T('psy-perception', 'Basic Psychological Processes', 'Attention and Perception', 14, 16, 'CONCEPTUAL',
    'Understand how we take in information through the senses, focus on some of it through attention, and organise it into a meaningful picture through perception — which can sometimes be fooled by illusions.',
    ['Explain the difference between sensation, attention and perception', 'Explain why we cannot attend to everything at once', 'Give an example of how perception can be misled (an illusion)'],
    'Can {{name}} explain how we notice and make sense of the world — paying attention to some things and organising them into meaning — and how perception can sometimes trick us?', ['nios-sec-2020:222.M2.L5']),
  T('psy-memory', 'Basic Psychological Processes', 'Memory and Forgetting', 14, 16, 'CONCEPTUAL',
    'Understand memory as encoding, storing and retrieving information, that it has different stages (sensory, short-term, long-term), why we forget, and simple ways to remember better.',
    ['Describe memory as encoding, storage and retrieval', 'Name stages of memory (short-term, long-term)', 'Give a reason we forget and a way to improve memory'],
    'Can {{name}} explain how memory works — taking in, storing and recalling information — and why we forget and how to remember better?', ['nios-sec-2020:222.M2.L6']),
  T('psy-thinking', 'Basic Psychological Processes', 'Thinking and Problem Solving', 14, 16, 'CONCEPTUAL',
    'Understand thinking as using mental images, concepts and reasoning to solve problems and make decisions, and the mental habits and biases that can get in the way of clear thinking.',
    ['Explain what thinking and reasoning involve', 'Describe a strategy for solving a problem', 'Give an example of a bias or block to clear thinking'],
    'Can {{name}} explain how we think through problems and make decisions — and how mental shortcuts can sometimes lead us astray?', ['nios-sec-2020:222.M2.L7']),
  T('psy-motivation', 'Basic Psychological Processes', 'Motivation: What Drives Behaviour', 14, 16, 'CONCEPTUAL',
    'Understand motivation as what energises and directs behaviour — needs, drives and goals — including the difference between motivation that comes from within and rewards from outside.',
    ['Explain what motivation is', 'Distinguish internal (intrinsic) from external (extrinsic) motivation', 'Give an example of a need or goal driving behaviour'],
    'Can {{name}} explain what motivates people to act — needs and goals — and the difference between doing something for its own sake and for a reward?', ['nios-sec-2020:222.M2.L8']),
  // Human development
  T('psy-nature-nurture', 'Human Development', 'Nature, Nurture and Development', 13, 15, 'CONCEPTUAL',
    'Understand that human development unfolds across the lifespan, and that both heredity (nature) and environment (nurture) shape who a person becomes.',
    ['Explain what is meant by nature and nurture', 'Explain that development continues across the whole lifespan', 'Give an example of heredity and of environment shaping a person'],
    'Can {{name}} explain that people are shaped by both what they inherit (nature) and their surroundings and experiences (nurture)?', ['nios-sec-2020:222.M3.L9']),
  T('psy-childhood', 'Human Development', 'Development in Childhood', 13, 15, 'CONCEPTUAL',
    'Understand the major changes of childhood — physical growth, the development of thinking and language, and growing emotional and social abilities.',
    ['Describe kinds of development that happen in childhood', 'Give an example of cognitive or language development', 'Explain that childhood lays foundations for later life'],
    'Can {{name}} describe the big changes that happen as children grow — in body, thinking, language and getting along with others?', ['nios-sec-2020:222.M3.L10']),
  T('psy-adulthood', 'Human Development', 'Adulthood and Aging', 14, 16, 'CONCEPTUAL',
    'Understand that development continues through adulthood and aging — with its own tasks, roles and changes in body and mind — and that aging can bring both losses and gains.',
    ['Describe stages and tasks of adulthood', 'Give an example of a change that comes with aging', 'Explain that aging brings both challenges and strengths'],
    'Can {{name}} explain that people keep developing through adulthood and old age, with new roles and both challenges and strengths?', ['nios-sec-2020:222.M3.L12']),
  // Social psychology
  T('psy-attitudes', 'Social Psychology', 'Attitudes and Social Cognition', 14, 16, 'CONCEPTUAL',
    'Understand how attitudes and beliefs form and change, and how we perceive, judge and think about other people (social cognition) — including stereotypes and first impressions.',
    ['Explain what an attitude is and how it can change', 'Explain how we form impressions of other people', 'Give an example of a stereotype affecting judgement'],
    'Can {{name}} explain how people form attitudes and opinions about others — and how first impressions and stereotypes can shape those judgements?', ['nios-sec-2020:222.M4.L15']),
  T('psy-social-problems', 'Social Psychology', 'Psychology of Social Problems', 14, 16, 'CONCEPTUAL',
    'Understand how psychology helps make sense of social and educational problems — such as prejudice, aggression or exam stress — and how understanding causes can point to solutions.',
    ['Give an example of a social problem psychology studies', 'Explain a psychological factor behind a social problem', 'Explain how understanding causes can help solve a problem'],
    'Can {{name}} explain how understanding the psychology behind a social problem — like prejudice or bullying — can help in tackling it?', ['nios-sec-2020:222.M4.L16']),
  // Mental health & well-being
  T('psy-wellbeing', 'Mental Health & Well-Being', 'Happiness and Well-Being', 14, 16, 'CONCEPTUAL',
    'Understand what psychologists have learned about happiness and well-being — that it is more than pleasure, what gets in its way, and habits that support a flourishing life.',
    ['Explain that well-being is more than momentary pleasure', 'Name an obstacle to well-being', 'Describe a habit that supports happiness and well-being'],
    'Can {{name}} explain what really supports lasting happiness and well-being, beyond just feeling good in the moment?', ['nios-sec-2020:222.M5.L17']),
  T('psy-disorders', 'Mental Health & Well-Being', 'Mental Disorders and Their Treatment', 14, 16, 'CONCEPTUAL',
    'Understand that mental disorders are real health conditions that affect thoughts, feelings and behaviour, that some are common, that they can be treated, and that they should not carry stigma.',
    ['Explain that mental disorders are health conditions, not weaknesses', 'Name a common mental health condition', 'Explain that treatment and support are available'],
    'Can {{name}} explain that mental disorders are real, treatable health conditions — and that people who have them deserve support, not stigma?', ['nios-sec-2020:222.M5.L18']),
  T('psy-mental-health', 'Mental Health & Well-Being', 'Mental Health and Hygiene', 14, 16, 'PROCEDURAL',
    'Understand mental health as more than the absence of illness, and everyday practices — sleep, exercise, talking about feelings, seeking help — that keep the mind healthy.',
    ['Explain what good mental health means', 'Name everyday practices that support mental health', 'Explain when and how to seek help'],
    'Can {{name}} name everyday habits that keep the mind healthy — and explain that it is okay to ask for help?', ['nios-sec-2020:222.M5.L19']),
  T('psy-yoga-mind', 'Mental Health & Well-Being', 'Yoga for a Healthy Mind', 13, 15, 'CONCEPTUAL',
    'Understand yoga as an ancient Indian practice that links body and mind — through postures, breathing and meditation — and how it supports calm and health.',
    ['Explain that yoga connects body and mind', 'Name components of yoga (postures, breathing, meditation)', 'Explain a benefit of yoga for the mind'],
    'Can {{name}} explain how yoga — through postures, breathing and stillness — helps keep both body and mind healthy?', ['nios-sec-2020:222.M7.L24', 'nios-sec-2020:222.M7.L26']),
  T('psy-yoga-self', 'Mental Health & Well-Being', 'Yoga and Self-Development', 14, 16, 'CONCEPTUAL',
    'Understand how yoga and meditation support self-development — self-awareness, self-control, and calming and regulating the mind.',
    ['Explain how yoga supports self-awareness and self-control', 'Describe how meditation can calm the mind', 'Give an example of using yoga to regulate emotions'],
    'Can {{name}} explain how practising yoga and meditation can help someone understand and steady their own mind?', ['nios-sec-2020:222.M7.L25', 'nios-sec-2020:222.M7.L27']),
  // Work & vocation
  T('psy-aptitude', 'Work & Vocation', 'Aptitude and Interests', 14, 16, 'CONCEPTUAL',
    'Understand aptitude (a natural capacity to learn a skill) and interest (what a person enjoys), and how matching them to job requirements guides good career choices.',
    ['Distinguish aptitude from interest', 'Explain how aptitudes and interests relate to jobs', 'Give an example of matching a person to a suitable role'],
    'Can {{name}} explain the difference between what someone is naturally good at (aptitude) and what they enjoy (interest), and how both guide career choices?', ['nios-sec-2020:222.M6.L20']),
  T('psy-vocational', 'Work & Vocation', 'Preparing for a Vocation', 14, 16, 'PROCEDURAL',
    'Understand how to prepare for working life — building skills, planning, and developing the habits and readiness a vocational role needs.',
    ['Explain what preparing for a vocation involves', 'Name a skill or habit useful for work', 'Describe a step in planning towards a career'],
    'Can {{name}} describe how someone prepares for working life — the skills, planning and habits it takes?', ['nios-sec-2020:222.M6.L21']),
  T('psy-at-work', 'Work & Vocation', 'Psychology at Work', 14, 16, 'CONCEPTUAL',
    'Understand how psychology applies in organisations and the world of work — motivation, teamwork, leadership and a healthy work environment.',
    ['Give an example of psychology applied at work', 'Explain how motivation or teamwork affects a workplace', 'Explain what makes a healthy work environment'],
    'Can {{name}} explain how understanding people — their motivation and teamwork — helps organisations and workplaces run well?', ['nios-sec-2020:222.M6.L22']),
];

const newEdges = [
  // Foundations chain
  { t: 'psy-methods', p: 'psy-what-is', strength: 'hard', reason: 'The methods of psychology build on knowing what psychology is' },
  { t: 'psy-individual-differences', p: 'psy-what-is', strength: 'soft', reason: 'Individual differences are a topic within the field of psychology' },
  // Processes build on foundations
  { t: 'psy-learning', p: 'psy-what-is', strength: 'soft', reason: 'Learning is a basic psychological process within the field' },
  { t: 'psy-perception', p: 'psy-what-is', strength: 'soft', reason: 'Perception is a basic psychological process within the field' },
  { t: 'psy-memory', p: 'psy-perception', strength: 'soft', reason: 'Memory builds on how information is perceived and attended to' },
  { t: 'psy-thinking', p: 'psy-memory', strength: 'soft', reason: 'Thinking works on information held in memory' },
  { t: 'psy-motivation', p: 'psy-what-is', strength: 'soft', reason: 'Motivation is a basic psychological process within the field' },
  { t: 'psy-motivation', p: 'mt_mydcMoa8gN', strength: 'soft', reason: 'Motivation and emotion build on emotional intelligence' },
  // Development
  { t: 'psy-childhood', p: 'psy-nature-nurture', strength: 'hard', reason: 'Childhood development builds on the nature/nurture framing' },
  { t: 'psy-adulthood', p: 'psy-nature-nurture', strength: 'soft', reason: 'Adulthood is a later stage of lifespan development' },
  { t: 'psy-nature-nurture', p: 'mt_pu2mmK27UA', strength: 'soft', reason: 'Development builds on the biology of growing up' },
  // Social psychology
  { t: 'psy-attitudes', p: 'psy-what-is', strength: 'soft', reason: 'Social cognition is a branch of psychology' },
  { t: 'psy-attitudes', p: 'mt_2oswCNuapH', strength: 'soft', reason: 'Attitudes and social cognition build on understanding stereotypes' },
  { t: 'psy-social-problems', p: 'psy-attitudes', strength: 'soft', reason: 'Social problems are analysed through attitudes and social cognition' },
  // Well-being
  { t: 'psy-wellbeing', p: 'psy-what-is', strength: 'soft', reason: 'Well-being is a topic within psychology' },
  { t: 'psy-wellbeing', p: 'mt_0VOZSVjo6c', strength: 'soft', reason: 'Well-being builds on understanding stress' },
  { t: 'psy-disorders', p: 'psy-wellbeing', strength: 'soft', reason: 'Understanding disorders complements understanding well-being' },
  { t: 'psy-mental-health', p: 'psy-disorders', strength: 'soft', reason: 'Mental-health practices build on understanding disorders and well-being' },
  { t: 'psy-yoga-mind', p: 'psy-mental-health', strength: 'soft', reason: 'Yoga is one practice supporting mental health' },
  { t: 'psy-yoga-self', p: 'psy-yoga-mind', strength: 'hard', reason: 'Yoga for self-development builds on yoga for a healthy mind' },
  // Work
  { t: 'psy-vocational', p: 'psy-aptitude', strength: 'hard', reason: 'Preparing for a vocation builds on knowing one’s aptitudes and interests' },
  { t: 'psy-at-work', p: 'psy-vocational', strength: 'soft', reason: 'Psychology at work follows preparation for a vocational role' },
  { t: 'psy-aptitude', p: 'mt_cJjnPjuvCU', strength: 'soft', reason: 'Career planning builds on personal goal-setting' },
];

const newClusters = [
  { subject: P, domain: 'Foundations of Psychology', ageRangeStart: 14, summary: 'Your teenager is learning what psychology is — the scientific study of how people think, feel and behave — how psychologists study it, and how people differ from one another.' },
  { subject: P, domain: 'Basic Psychological Processes', ageRangeStart: 14, summary: 'Your teenager is exploring the mind’s basic workings — how we learn, pay attention and perceive, remember and forget, think through problems, and what motivates us.' },
  { subject: P, domain: 'Human Development', ageRangeStart: 13, summary: 'Your teenager is learning how people develop across the whole lifespan — shaped by both nature and nurture — from childhood through adolescence to adulthood and aging.' },
  { subject: P, domain: 'Social Psychology', ageRangeStart: 14, summary: 'Your teenager is learning how people think about and influence one another — attitudes and beliefs, first impressions and stereotypes, and the psychology behind social problems.' },
  { subject: P, domain: 'Mental Health & Well-Being', ageRangeStart: 13, summary: 'Your teenager is learning what supports a healthy mind — happiness and well-being, understanding mental disorders without stigma, everyday mental-health habits, and yoga.' },
  { subject: P, domain: 'Mental Health & Well-Being', ageRangeStart: 14, summary: 'Your teenager is learning what supports a healthy mind — happiness and well-being, understanding and treating mental disorders, everyday mental-health habits, and yoga for self-development.' },
  { subject: P, domain: 'Work & Vocation', ageRangeStart: 14, summary: 'Your teenager is learning how psychology guides working life — matching aptitudes and interests to jobs, preparing for a vocation, and how understanding people helps organisations.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
