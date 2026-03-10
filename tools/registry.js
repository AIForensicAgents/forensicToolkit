/**
 * forensicToolkit - Tool Registry
 * 
 * This file maintains the master registry of all forensic tools.
 * Each tool entry follows the standard format below.
 * 
 * To add a new tool:
 *   1. Create your tool file in the tools/ directory
 *   2. Add an entry to the `tools` array below
 *   3. Ensure your tool exports the required interface (see README)
 * 
 * Tool Entry Format:
 *   {
 *     name: "tool-name",
 *     version: "1.0.0",
 *     description: "What the tool does",
 *     entryPoint: "./tools/tool-name.js",
 *     category: "disk-forensics|memory-forensics|network-forensics|malware-analysis|log-analysis|mobile-forensics"
 *   }
 */

const tools = [
  {
    name: "disk-imager",
    version: "1.0.0",
    description: "Creates forensic disk images with hash verification (SHA-256, MD5)",
    entryPoint: "./tools/disk-imager.js",
    category: "disk-forensics"
  },
  {
    name: "log-parser",
    version: "1.0.0",
    description: "Parses and correlates system, application, and security logs with timeline reconstruction",
    entryPoint: "./tools/log-parser.js",
    category: "log-analysis"
  },
  {
    name: "network-pcap-analyzer",
    version: "1.0.0",
    description: "Analyzes PCAP files for suspicious network activity, DNS exfiltration, and C2 traffic patterns",
    entryPoint: "./tools/network-pcap-analyzer.js",
    category: "network-forensics"
  },
  {
    name: "memory-strings-extractor",
    version: "1.0.0",
    description: "Extracts and categorizes strings from memory dumps with pattern matching for IOCs",
    entryPoint: "./tools/memory-strings-extractor.js",
    category: "memory-forensics"
  },
  {
    name: "malware-hash-checker",
    version: "1.0.0",
    description: "Computes file hashes and checks against known malware hash databases",
    entryPoint: "./tools/malware-hash-checker.js",
    category: "malware-analysis"
  },
  {
    name: "mobile-artifact-extractor",
    version: "1.0.0",
    description: "Extracts forensic artifacts from mobile device backup files (SMS, call logs, app data)",
    entryPoint: "./tools/mobile-artifact-extractor.js",
    category: "mobile-forensics"
  }
];

/**
 * Valid tool categories
 */
const CATEGORIES = [
  "disk-forensics",
  "memory-forensics",
  "network-forensics",
  "malware-analysis",
  "log-analysis",
  "mobile-forensics"
];

/**
 * Get all registered tools
 * @returns {Array} Array of tool entry objects
 */
function getAll() {
  return [...tools];
}

/**
 * Get tools filtered by category
 * @param {string} category - One of the valid CATEGORIES
 * @returns {Array} Filtered array of tool entries
 */
function getByCategory(category) {
  return tools.filter(function(t) { return t.category === category; });
}

/**
 * Get a specific tool by name
 * @param {string} name - Tool name
 * @returns {Object|null} Tool entry or null
 */
function getByName(name) {
  for (var i = 0; i < tools.length; i++) {
    if (tools[i].name === name) return tools[i];
  }
  return null;
}

/**
 * Validate a tool entry object
 * @param {Object} entry - Tool entry to validate
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validate(entry) {
  var errors = [];
  if (!entry.name || typeof entry.name !== 'string') errors.push('name is required and must be a string');
  if (!entry.version || typeof entry.version !== 'string') errors.push('version is required');
  if (!entry.description || typeof entry.description !== 'string') errors.push('description is required');
  if (!entry.entryPoint || typeof entry.entryPoint !== 'string') errors.push('entryPoint is required');
  if (!entry.category || CATEGORIES.indexOf(entry.category) === -1) {
    errors.push('category must be one of: ' + CATEGORIES.join(', '));
  }
  return { valid: errors.length === 0, errors: errors };
}

module.exports = { tools, CATEGORIES, getAll, getByCategory, getByName, validate };
