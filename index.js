#!/usr/bin/env node
/**
 * forensicToolkit - Main Entry Point
 * An Extensible Digital Forensics Toolkit by AI Forensic Agents
 * 
 * @license MIT
 * @requires Node.js 18+
 */

'use strict';

var registry = require('./tools/registry');
var path = require('path');

/**
 * Load and initialize a registered tool by name
 * @param {string} toolName - Name of the tool from registry
 * @param {Object} [options] - Options to pass to the tool
 * @returns {Object} Loaded tool module
 */
function loadTool(toolName, options) {
  var entry = registry.getByName(toolName);
  if (!entry) {
    throw new Error('Tool not found in registry: ' + toolName);
  }
  var toolPath = path.resolve(__dirname, entry.entryPoint);
  var toolModule = require(toolPath);
  if (typeof toolModule.init === 'function') {
    toolModule.init(options || {});
  }
  return toolModule;
}

/**
 * List all registered tools with their metadata
 * @param {string} [category] - Optional category filter
 * @returns {Array} Array of tool metadata objects
 */
function listTools(category) {
  if (category) {
    return registry.getByCategory(category);
  }
  return registry.getAll();
}

/**
 * Get all supported categories
 * @returns {string[]}
 */
function getCategories() {
  return registry.CATEGORIES.slice();
}

/**
 * Validate a tool entry before registration
 * @param {Object} entry - Tool entry object
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateToolEntry(entry) {
  return registry.validate(entry);
}

// CLI mode
if (require.main === module) {
  var args = process.argv.slice(2);
  var command = args[0] || 'list';

  if (command === 'list') {
    var cat = args[1] || null;
    var tools = listTools(cat);
    console.log('\n=== forensicToolkit - Registered Tools ===\n');
    if (cat) console.log('Category: ' + cat + '\n');
    tools.forEach(function(t) {
      console.log('  ' + t.name + ' v' + t.version + ' [' + t.category + ']');
      console.log('    ' + t.description);
      console.log('    Entry: ' + t.entryPoint + '\n');
    });
    console.log('Total: ' + tools.length + ' tool(s)\n');
  } else if (command === 'categories') {
    console.log('\nSupported categories:');
    getCategories().forEach(function(c) { console.log('  - ' + c); });
    console.log('');
  } else if (command === 'run') {
    var toolName = args[1];
    if (!toolName) {
      console.error('Usage: node index.js run <tool-name> [args...]');
      process.exit(1);
    }
    try {
      var tool = loadTool(toolName);
      if (typeof tool.run === 'function') {
        var result = tool.run(args.slice(2));
        if (result && typeof result.then === 'function') {
          result.then(function(r) { console.log(r); }).catch(function(e) { console.error(e); process.exit(1); });
        }
      } else {
        console.error('Tool ' + toolName + ' does not export a run() function');
        process.exit(1);
      }
    } catch (e) {
      console.error('Error loading tool: ' + e.message);
      process.exit(1);
    }
  } else {
    console.log('Usage: node index.js <command>');
    console.log('  list [category]  - List registered tools');
    console.log('  categories       - Show supported categories');
    console.log('  run <tool> [...] - Run a specific tool');
  }
}

module.exports = { loadTool, listTools, getCategories, validateToolEntry };
