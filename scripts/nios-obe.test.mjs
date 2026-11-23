import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse, source } from './nios-obe.mjs';

const catalogue = JSON.parse(readFileSync(new URL('../data/curriculum-standards.json', import.meta.url)));
const alignments = JSON.parse(readFileSync(new URL('../data/curriculum-alignments.json', import.meta.url)));
const expected = {a: [['Environmental Study', 36], ['Mathematics', 7], ['Basic Computer Skills', 6]], b: [['Environmental Studies', 55], ['Mathematics', 8], ['Basic Computer Skills', 7]], c: [['Social Science', 60], ['Mathematics', 20], ['Basic Computer Skills', 9], ['Science', 20]]};

for (const [level, courses] of Object.entries(expected)) {
  const slug = `nios-obe-${level}`;
  const published = catalogue.curricula.find(c => c.slug === slug);

  test(`${slug} holds the expected records per course`, () => {
    assert.equal(new Set(published.topics.map(t => t.key)).size, published.topicCount);
    assert.deepEqual(Object.entries(Object.groupBy(published.topics, t => t.data.course)).map(([k, v]) => [k, v.length]), courses);
    for (const t of published.topics) assert.ok(t.data.title && t.data.description, t.code);
  });

  test(`${slug} metadata matches the generator`, () => {
    assert.deepEqual(published, source(published.topics, level));
  });

  test(`${slug} is standards only`, () => {
    assert.equal(alignments.alignments.filter(a => a.standards.some(s => s.startsWith(`${slug}:`))).length, 0);
  });
}

test('parser keeps wording, joins wrapped lines and skips other sections', () => {
  const text = `Environmental Study (A-102)\n3. Objectives:\n 1. Not a record\n6. Course Description-\nLesson-5: Conservation of Environ\n i. Useful Animals- Milch cattle,\n Pet Animals.\nii. Main parts\n7. Scheme of studies-\n 1. Not a record\nMathematics (A-103)\n4. Course Description\n Lesson-5: Fractions\n To understand use\n of fractions.\n5. Scheme of studies-`;
  assert.deepEqual(parse(text, 'a').map(r => [r.code, r.data.description]), [
    ['A102.L5.1', 'Useful Animals- Milch cattle, Pet Animals.'],
    ['A102.L5.2', 'Main parts'],
    ['A103.L5', 'To understand use of fractions.'],
  ]);
});

test('parser rejects a skipped item number', () => {
  assert.throws(() => parse('Environmental Studies (B-102)\n6. Course Description\nLesson-1: One\n1. First\n3. Third\n', 'b'), /out of order/);
});

test('parser handles modules, marks lines, the uncoded Science course and broken compounds', () => {
  const text = 'Science\nLevel- C\n6. Course Description\nModule-1: Living World\nTime: 20 Hours Marks: 20\nLesson-1: Habitat\nmeaning of bio-\ndiversity\nModule-2: Matter\nTime-25 hours Marks-25\nLesson-6: Types\nStates\n7. Scheme of Study';
  assert.deepEqual(parse(text, 'c').map(r => [r.code, r.data.module, r.data.description, r.data.courseCode]), [
    ['CSCI.L1', 'Module 1: Living World', 'meaning of bio-diversity', undefined],
    ['CSCI.L6', 'Module 2: Matter', 'States', undefined],
  ]);
});
