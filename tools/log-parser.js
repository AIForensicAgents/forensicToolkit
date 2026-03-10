/**
 * log-parser - System Log Parser & Timeline Reconstructor
 * Parses and correlates system, application, and security logs
 * 
 * @category log-analysis
 * @version 1.0.0
 */

'use strict';

var fs = require('fs');
var path = require('path');

var config = {};

function init(opts) {
  config = Object.assign({ timezone: 'UTC', maxLines: 100000 }, opts);
}

/**
 * Parse a log file and extract structured events
 * @param {string[]} args - [logFilePath]
 * @returns {Promise<Object>}
 */
async function run(args) {
  var logFile = args[0];
  if (!logFile) throw new Error('Usage: log-parser <log-file>');

  console.log('Parsing log file: ' + logFile);
  var content = fs.readFileSync(logFile, 'utf8');
  var lines = content.split('\n');
  var events = [];

  for (var i = 0; i < lines.length && i < config.maxLines; i++) {
    var line = lines[i].trim();
    if (!line) continue;
    events.push({
      lineNumber: i + 1,
      raw: line,
      timestamp: extractTimestamp(line),
      severity: detectSeverity(line)
    });
  }

  events.sort(function(a, b) {
    if (!a.timestamp) return 1;
    if (!b.timestamp) return -1;
    return a.timestamp.localeCompare(b.timestamp);
  });

  return {
    file: logFile,
    totalLines: lines.length,
    parsedEvents: events.length,
    severityCounts: countSeverities(events),
    timeline: events.slice(0, 50),
    tool: 'log-parser v1.0.0'
  };
}

function extractTimestamp(line) {
  var isoMatch = line.match(/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/);
  if (isoMatch) return isoMatch[0];
  return null;
}

function detectSeverity(line) {
  var lower = line.toLowerCase();
  if (lower.indexOf('error') !== -1 || lower.indexOf('fatal') !== -1 || lower.indexOf('critical') !== -1) return 'ERROR';
  if (lower.indexOf('warn') !== -1) return 'WARNING';
  if (lower.indexOf('info') !== -1) return 'INFO';
  if (lower.indexOf('debug') !== -1) return 'DEBUG';
  return 'UNKNOWN';
}

function countSeverities(events) {
  var counts = {};
  for (var i = 0; i < events.length; i++) {
    var s = events[i].severity;
    counts[s] = (counts[s] || 0) + 1;
  }
  return counts;
}

module.exports = { init, run };
