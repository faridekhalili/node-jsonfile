// Simulate the scenario where `graceful-fs` is not available
jest.mock('graceful-fs', () => {
  throw new Error('Cannot find module "graceful-fs"');
}, { virtual: true });

// Ensure that `fs` can be loaded as a fallback
jest.mock('fs', () => jest.requireActual('fs'), { virtual: true });

describe('Encoding Handling in readFileSync()', () => {
rimraf = require('rimraf');
os = require('os');
path = require('path');
const jsonfile = require('../');
fs = require('fs');
let TEST_DIR;

beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-encoding');
    rimraf.sync(TEST_DIR);
    fs.mkdirSync(TEST_DIR);
});

afterEach(() => {
    rimraf.sync(TEST_DIR);
});

test('should respect encoding option when passed as a string in readFileSync', () => {
    /**
     * Sample 5
     * ObjectLiteral
     * index.js:42:15
     * -       options = { encoding: options }
     * +       options = {}
     */
  
    const file = path.join(TEST_DIR, 'encoding-test-sync.json');
    const obj = { message: 'hello' };

    // Write file in UTF-16LE encoding
    fs.writeFileSync(file, JSON.stringify(obj), 'utf16le');

    // Attempt to read file with correct encoding
    const data = jsonfile.readFileSync(file, 'utf16le');

    // Verify it is parsed correctly
    expect(data).toEqual(obj);
});
});