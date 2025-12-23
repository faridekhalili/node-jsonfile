// Simulate the scenario where `graceful-fs` is not available
jest.mock('graceful-fs', () => {
  throw new Error('Cannot find module "graceful-fs"');
}, { virtual: true });

// Ensure that `fs` can be loaded as a fallback
jest.mock('fs', () => jest.requireActual('fs'), { virtual: true });

const jsonfile = require('../');
const mockFs = require('mock-fs');
  
describe('jsonfile operations', () => {
  beforeEach(() => {
    // Setup mock filesystem
    mockFs({
      'example.json': '{"name":"test"}'
    });
  });

  afterEach(() => {
    // Restore the filesystem after each test
    mockFs.restore();
    jest.resetModules(); // Reset modules to clear caches and mocks
  });

  test('readFile should fallback to native fs when graceful-fs fails', async () => {
    /**
     * Sample 2
     * BlockStatement
     * index.js:4:13
     * - } catch (_) {
     * - _fs = require('fs')
     * - }
     * + } catch (_) {}
    */
    
    let data;
    let errorCaught = false;
    try {
      data = await jsonfile.readFile('example.json');
    } catch (error) {
      errorCaught = true;
    }

    expect(errorCaught).toBe(false);
    expect(data).toEqual({ name: 'test' });
  });
});