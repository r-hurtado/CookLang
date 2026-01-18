# cook.lang — A Simple Recipe DSL Compiler

A domain-specific language (and toolchain) for writing structured recipes in a clean, readable format. The compiler parses `.cook` files, lints for errors, and generates SQL INSERT statements for storing recipes in a relational database.

## Why This Project?

- Fun way to revisit compiler concepts (lexer, parser, AST, codegen).
- Practical: turn recipes into queryable data.
- Built incrementally in short sessions.

Inspired by classic compiler courses, but in modern Node.js.

## Features (Planned / Implemented)

- [ ] CLI to read .cook files
- [ ] Lexer/tokenizer
- [ ] Recursive-descent parser → AST
- [ ] Basic linter (required fields, etc.)
- [ ] SQL code generation (recipes, ingredients, instructions tables)
- [ ] Unit tests with Jest
- [ ] Makefile for common commands
- [ ] GitHub CI

## Installation

```bash
git clone https://github.com/r-hurtado/CookLang.git
cd cook-lang
npm install

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

