// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet

const { test, describe } = require('node:test');
const assert = require('node:assert');
const { average } = require('../utils/for_testing');

describe('average', () => {
  test('average of 1, 2, 3', () => {
    const result = average([1, 2, 3]);

    assert.strictEqual(result, 2);
  });

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5);
  });

  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0);
  });
});
