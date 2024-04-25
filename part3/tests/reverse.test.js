const { test, describe } = require('node:test');
const assert = require('node:assert');
const { reverse } = require('../utils/for_testing');

describe('reverse', () => {
  test('reversoidaan merkkijono a', () => {
    const result = reverse('a');

    assert.strictEqual(result, 'a');
  });

  test('reversoidaan tyhjä merkkijono', () => {
    assert.strictEqual(reverse(''), '');
  });

  test('reversoidaan react', () => {
    assert.strictEqual(reverse('react'), 'tcaer');
  });

  test('reversoidaan omnia', () => {
    const result = reverse('omnia');

    assert.strictEqual(result, 'ainmo');
  });

  test('reversoidaan pitkä merkkijono', () => {
    const result = reverse('tähän jokin pitkä merkkijono jossa on mukana rivinvaihtoja miten käy?');

    const expectedValue = '?yäk netim ajothiavnivir anakum no assoj onojikkrem äktip nikoj nähät';

    assert.strictEqual(result, expectedValue);
  });

  test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias');

    assert.strictEqual(result, 'saippuakauppias');
  });

  test('reverse of otto', () => {
    const result = reverse('otto');

    assert.strictEqual(result, 'otto');
  });
});
