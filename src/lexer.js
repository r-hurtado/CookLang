const { debugLog } = require('./utils');
const { TokenType } = require('./token');

class Lexer {
  constructor(source) {
    this.source = source ;//+ '\n';  // Add sentinel newline for easier line tracking
    this.pos = 0;
    this.line = 1;
    this.col = 1;
  }

  tokenize() {
    debugLog('Starting lex on source length:', this.source.length);
    const tokens = [];
    while (!this.isEOF()) {
      this.skipWhitespace();  // We'll implement this next
      // Later: check for tokens here
    }
    tokens.push({ type: TokenType.EOF, value: null, line: this.line, col: this.col });
    return tokens;
  }

  // Helpers

  isEOF() {
    return this.pos >= this.source.length;
  }

  peek() {
    return this.isEOF() ? null : this.source[this.pos];
  }

  advance() {
    if (this.isEOF()) return null;
    const char = this.source[this.pos];
    this.pos++;
    if (char === '\n') {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }
    return char;
  }

  skipWhitespace() {
    while (!this.isEOF()) {
      const char = this.peek();
      if (char === ' ' || char === '\t' || char === '\r') {
        this.advance();
      } else if (char === '\n') {
        this.advance();  // Treat newlines as whitespace for now
      } else {
        debugLog(`JUMPING OUT -> value: ${char}, line: ${this.line}, col: ${this.col}`);
        break; // Jump out for non whitespace chars
      }
      debugLog(`value: ${JSON.stringify(char)}, line: ${this.line}, col: ${this.col}`);
    }
  }
}

module.exports = { tokenize: source => new Lexer(source).tokenize() };
