const { debugLog } = require('./utils');
const { TokenType } = require('./token');

class Lexer {
  constructor(source) {
    this.source = source ;//+ '\n';  // Add sentinel newline for easier line tracking
    this.pos = 0;
    this.line = 1;
    this.col = 1;
    this.tokens = [];
  }

  tokenize() {
    debugLog(`Starting lex on source length: ${this.source.length}, sourc: ${JSON.stringify(this.source)}`);
    while (!this.isEOF()) {
      this.skipWhitespace();
      if(!this.isEOF())
        this.tokenizer();
    }
    const token = { type: TokenType.EOF, value: null, line: this.line, col: this.col };
    debugLog(token);
    this.tokens.push(token);
    return this.tokens;
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
        //debugLog(`JUMPING OUT -> value: ${char}, line: ${this.line}, col: ${this.col}`);
        break; // Jump out for non whitespace chars
      }
      //debugLog(`value: ${JSON.stringify(char)}, line: ${this.line}, col: ${this.col}`);
    }
  }

  tokenizer() {
    const startLine = this.line;
    const startCol = this.col;
    const char = this.peek();

    //debugLog(`Dispatching at line ${startLine}, col ${startCol}: '${char}'`);

    let token;
    if (char === '"') {
      token = this.readString();
    } else if (/[a-zA-Z]/.test(char)) {
      token = this.readIdentifier();  // Handles keywords too
    } else if (/[0-9]/.test(char) || (char === '/' && this.source[this.pos + 1] && /[0-9]/.test(this.source[this.pos + 1]))) {
      // Stub for numbers/fractions like "3/4"
      token = this.readNumber();
    } else if ('{}()'.includes(char)) {
      // Simple punctuation
      token = {
        type: char === '{' ? TokenType.LBRACE : TokenType.RBRACE,  // Add more as needed
        value: char,
        line: startLine,
        col: startCol
      };
      this.advance();
    } else if (char === '\n') {
      // If you decided not to skip \n in whitespace
      token = { type: TokenType.NEWLINE, value: '\n', line: startLine, col: startCol };
      this.advance();
    } else {
      // Unimplemented — clear error to guide development
      throw new Error(`Unexpected character '${char}' at line ${startLine}, column ${startCol}`);
    }

    if (token) {
      token.line = token.line || startLine;
      token.col = token.col || startCol;
      this.tokens.push(token);
      debugLog('Emitted token:', token);
    }
  }

  readString() {
    const startLine = this.line;
    const startCol = this.col;
    this.advance();  // Consume opening "
  
    let value = '';
    while (!this.isEOF() && this.peek() !== '"') {
      // TODO: Handle escapes (\")
      value += this.advance();
    }
  
    if (this.isEOF()) {
      throw new Error(`Unterminated string starting at line ${startLine}, col ${startCol}`);
    }
  
    this.advance();  // Consume closing "
    return { type: TokenType.STRING, value, line: startLine, col: startCol };
  }
  
  readIdentifier() {
    const startLine = this.line;
    const startCol = this.col;
  
    let value = '';
    while (!this.isEOF() && /[a-zA-Z0-9_-]/.test(this.peek())) {  // Adjust chars as needed
      value += this.advance();
    }
  
    // Keyword lookup
    const keywords = {
      recipe: TokenType.RECIPE,
      author: TokenType.AUTHOR,
      servings: TokenType.SERVINGS,
      'prep_time': TokenType.PREP_TIME,
      'cook_time': TokenType.COOK_TIME,
      ingredients: TokenType.INGREDIENTS,
      instructions: TokenType.INSTRUCTIONS,
      // Add more
    };
  
    const type = keywords[value] || TokenType.IDENTIFIER;
  
    return { type, value, line: startLine, col: startCol };
  }
  
  readNumber() {
    const startLine = this.line;
    const startCol = this.col;
  
    let value = '';
    while (!this.isEOF() && /[0-9./]/.test(this.peek())) {
      value += this.advance();
    }
  
    // TODO: Proper parsing — distinguish int, fraction, float
    // For now, try Number() or keep as string
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`Invalid number '${value}' at line ${startLine}, col ${startCol}`);
    }
  
    return { type: TokenType.NUMBER, value: num, line: startLine, col: startCol };
  }
}

module.exports = { tokenize: source => new Lexer(source).tokenize() };
