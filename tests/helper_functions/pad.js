const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;
const test = testDecorater(tape);
const pad = require(`../../server/helper_functions/pad`);
let actual = true;
let expected = true;

test(`Test af Pad-funktionen i node/Server`, (assert) => {
  assert.equal(actual, expected, `The test is created successfully.`);

  actual = pad(`String`, 7, `-`);
  expected = `String-`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to add 1 dash to the RIGHT of the string`);

  actual = pad(`String`, -7, `-`);
  expected = `-String`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to add 1 dash to the LEFT of the string`);

  actual = pad(`String`, 50, `-`);
  expected = `String--------------------------------------------`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to add 44 dashes to the RIGHT of the string`);

  actual = pad(`String`, -50, `-`);
  expected = `--------------------------------------------String`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to add 44 dashes to the LEFT of the string`);

  actual = pad(`String`, 6, `-`);
  expected = `String`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to return the string itself as strIn.length === newStrLen`);

  actual = pad(`String`, -6, `-`);
  expected = `String`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to return the string itself as strIn.length === newStrLen`);

  actual = pad(`String`, 1, `-`);
  expected = `String`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to return the string itself as strIn.length > newStrLen`);

  actual = pad(`String`, -1, `-`);
  expected = `String`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to return the string itself as strIn.length > newStrLen`);

  actual = pad(`String`, 0, `-`);
  expected = `String`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to return the string itself as newStrLen === 0`);

  actual = pad(42, 4, `-`);
  expected = `42--`;
  assert.equal(actual, expected, `{Expected: "${expected}" Actual: "${actual}"} `
                               + `The function should be able to pad non-string-types`);

  assert.end();
});
