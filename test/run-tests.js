/**
 * Basic test runner for forensicToolkit
 */

'use strict';

var registry = require('../tools/registry');

console.log('\n=== forensicToolkit Test Suite ===\n');

// Test 1: Registry loads
var tools = registry.getAll();
console.log('✅ Registry loaded: ' + tools.length + ' tools registered');

// Test 2: All categories valid
var cats = registry.CATEGORIES;
console.log('✅ Categories defined: ' + cats.join(', '));

// Test 3: Each tool has required fields
var allValid = true;
for (var i = 0; i < tools.length; i++) {
  var result = registry.validate(tools[i]);
  if (!result.valid) {
    console.log('❌ Invalid tool: ' + tools[i].name + ' - ' + result.errors.join(', '));
    allValid = false;
  }
}
if (allValid) console.log('✅ All tool entries pass validation');

// Test 4: getByCategory works
for (var c = 0; c < cats.length; c++) {
  var catTools = registry.getByCategory(cats[c]);
  console.log('  ' + cats[c] + ': ' + catTools.length + ' tool(s)');
}

// Test 5: getByName works
var found = registry.getByName('disk-imager');
if (found) {
  console.log('✅ getByName("disk-imager") found: v' + found.version);
} else {
  console.log('❌ getByName("disk-imager") failed');
}

console.log('\n=== Tests Complete ===\n');
