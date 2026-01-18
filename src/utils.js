// src/utils.js
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'debug.log');  // Root of project

// Optional: Toggle with env var (recommended to avoid huge files)
const enabled = true;//process.env.DEBUG_LOG === 'true';

function debugLog(...args) {
  if (!enabled) return;

  const date = new Date();
  const timestamp = date.toLocaleString('sv-SE', { 
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hour12: false
  }).replace(',', '.');

  const message = args
    .map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    })
    .join(' ');

  const line = `[${timestamp.toString()}] ${message}\n`;

  try {
    fs.appendFileSync(logFile, line);
  } catch (err) {
    // Fallback: if file write fails, dump to console
    console.error('Debug log write failed:', err);
    console.error(line);
  }
}

// Helper to clear log
function clearDebugLog() {
  if (enabled && fs.existsSync(logFile)) {
    fs.unlinkSync(logFile);
  }
}

module.exports = { debugLog, clearDebugLog };
