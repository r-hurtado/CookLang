// src/token.js
const TokenType = {
  // Keywords
  RECIPE: 'RECIPE',
  AUTHOR: 'AUTHOR',
  SERVINGS: 'SERVINGS',
  PREP_TIME: 'PREP_TIME',
  COOK_TIME: 'COOK_TIME',
  INGREDIENTS: 'INGREDIENTS',
  INSTRUCTIONS: 'INSTRUCTIONS',

  // Literals
  STRING: 'STRING',
  NUMBER: 'NUMBER',      // For integers and fractions, e.g., 2 or 3/4
  IDENTIFIER: 'IDENTIFIER', // For units like "cups" or qualifiers "packed"

  // Punctuation
  LBRACE: '{',
  RBRACE: '}',
  NEWLINE: 'NEWLINE',    // Or handle implicitly
  EOF: 'EOF',

  // Later: COMMENT, FRACTION (if separate), etc.
};

module.exports = { TokenType };
