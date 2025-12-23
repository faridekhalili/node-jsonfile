// Simulate the scenario where `graceful-fs` is not available
jest.mock('graceful-fs', () => {
  throw new Error('Cannot find module "graceful-fs"');
}, { virtual: true });

// Ensure that `fs` can be loaded as a fallback
jest.mock('fs', () => jest.requireActual('fs'), { virtual: true });


describe('stripBom function tests', () => {
  const { stripBom } = require('../utils');
  
  test('should throw an error when content is an object, not a buffer', () => {
    /**
     * Sample 1
    * ConditionalExpression
    * utils.js:10:7
    * - if (Buffer.isBuffer(content)) content = content.toString('utf8')
    * + if (true) content = content.toString('utf8')
    */
    const inputObject = { toString: () => "Hello, world!" }; // A mock object with a custom toString method
    expect(() => {
      stripBom(inputObject);
    }).toThrow(TypeError);
  });
  
});