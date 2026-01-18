const { tokenize } = require('../src/lexer');
const { TokenType } = require('../src/token');
const { clearDebugLog } = require('../src/utils');

beforeAll(() => {
  clearDebugLog();
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

  test('tokenizes simple header', () => {
    const input = 'recipe "Test Recipe"\nservings 24';
    expect(tokenize(input)).toEqual([
      { type: 'RECIPE', value: 'recipe', line: 1, col: 1 },
      { type: 'STRING', value: 'Test Recipe', line: 1, col: 8 },
      //{ type: 'NEWLINE', ... },  // If you tokenize them
      { type: 'SERVINGS', value: 'servings', line: 2, col: 1 },
      { type: 'NUMBER', value: 24, line: 2, col: 10 },
      { type: 'EOF', value: null, line: 2, col: 12 }
    ]);
  });

  test('tokenizes braces', () => {
    const input = '{}()';
    expect(tokenize(input)).toEqual([
      { type: 'LBRACE', value: '{', line: 1, col: 1 },
      { type: 'RBRACE', value: '}', line: 1, col: 2 },
      { type: 'LBRACE', value: '(', line: 1, col: 3 },
      { type: 'RBRACE', value: ')', line: 1, col: 4 },
      { type: 'EOF', value: null, line: 1, col: 5 }
    ]);
  });
});
