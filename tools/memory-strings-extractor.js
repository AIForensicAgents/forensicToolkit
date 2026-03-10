/**
 * memory-strings-extractor - Memory Dump String Extractor
 * Extracts and categorizes strings from memory dumps
 * 
 * @category memory-forensics
 * @version 1.0.0
 */

'use strict';

var fs = require('fs');

var config = {};

function init(opts) {
  config = Object.assign({ minLength: 4, encoding: 'utf8' }, opts);
}

async function run(args) {
  var dumpFile = args[0];
  if (!dumpFile) throw new Error('Usage: memory-strings-extractor <memory-dump>');

  console.log('Extracting strings from: ' + dumpFile);
  var buffer = fs.readFileSync(dumpFile);
  var strings = [];
  var current = '';

  for (var i = 0; i < buffer.length; i++) {
    var byte = buffer[i];
    if (byte >= 32 && byte <= 126) {
      current += String.fromCharCode(byte);
    } else {
      if (current.length >= config.minLength) {
        strings.push(current);
      }
      current = '';
    }
  }
  if (current.length >= config.minLength) strings.push(current);

  return {
    file: dumpFile,
    totalStrings: strings.length,
    samples: strings.slice(0, 100),
    tool: 'memory-strings-extractor v1.0.0'
  };
}

module.exports = { init, run };
