#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
console.log(process.argv);
if (args.length !== 1) {
    console.error('Usage: cook <file.cook>');
    process.exit(1);
}
const filePath = path.resolve(args[0]);

let source;
try {
    source = fs.readFileSync(filePath, 'utf8');
} catch (err) {
    if (err.code === 'ENOENT') {
        console.error(`Error: File not found: ${filePath}`);
    } else {
        console.error(`Error reading file: ${err.message}`);
    }
    process.exit(-1);
}

console.log('=== File Contents ===');
console.log(source);
console.log('=== End of File ===');
