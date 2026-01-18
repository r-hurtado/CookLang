const { tokenize } = require('../src/lexer');
const { TokenType } = require('../src/token');
const { clearDebugLog } = require('../src/utils');

beforeEach(() => {
  //clearDebugLog();
});

describe('Lexer', () => {
  test('handles empty string', () => {
    const tokens = tokenize('');
    expect(tokens).toEqual([
      { type: TokenType.EOF, value: null, line: 1, col: 1 }
    ]);
  });

  test('skips whitespace', () => {
    const tokens = tokenize('   \n\t   ');
    expect(tokens).toEqual([
      { type: TokenType.EOF, value: null, line: 2, col: 5 }
    ]);
  });
});
