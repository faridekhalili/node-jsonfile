// Simulate the scenario where `graceful-fs` is not available
jest.mock('graceful-fs', () => {
  throw new Error('Cannot find module "graceful-fs"');
}, { virtual: true });

// Ensure that `fs` can be loaded as a fallback
jest.mock('fs', () => jest.requireActual('fs'), { virtual: true });
  

describe('stripBom function tests', () => {
  const { stripBom } = require('../utils');

  test('should not remove the BOM if it is not at the beginning of the string', () => {
    /**
     * Sample 3
     * Regex
     * utils.js:11:26
     * -     return content.replace(/^\\uFEFF/, '')
     * +     return content.replace(/\\uFEFF/, '')
     */
    input = `Some \uFEFF content\uFEFF with BOM inside`
    const result = stripBom(Buffer.from(input, 'utf8'));
    expect(result).toBe(input);
  });
  
});