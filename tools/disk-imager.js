/**
 * disk-imager - Forensic Disk Imaging Tool
 * Creates forensic disk images with hash verification
 * 
 * @category disk-forensics
 * @version 1.0.0
 */

'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var config = {};

/**
 * Initialize the tool with options
 * @param {Object} opts
 */
function init(opts) {
  config = Object.assign({
    algorithm: 'sha256',
    blockSize: 65536,
    outputDir: './output'
  }, opts);
}

/**
 * Run the disk imager
 * @param {string[]} args - CLI arguments [sourcePath, destPath]
 * @returns {Promise<Object>} Result with hash and metadata
 */
async function run(args) {
  var sourcePath = args[0];
  if (!sourcePath) {
    throw new Error('Usage: disk-imager <source-file> [output-file]');
  }
  var destPath = args[1] || path.join(config.outputDir, path.basename(sourcePath) + '.img');

  console.log('Creating forensic image of: ' + sourcePath);
  console.log('Output: ' + destPath);

  var hash = crypto.createHash(config.algorithm);
  var md5Hash = crypto.createHash('md5');
  var bytesRead = 0;

  var readStream = fs.createReadStream(sourcePath, { highWaterMark: config.blockSize });
  var writeStream = fs.createWriteStream(destPath);

  return new Promise(function(resolve, reject) {
    readStream.on('data', function(chunk) {
      hash.update(chunk);
      md5Hash.update(chunk);
      writeStream.write(chunk);
      bytesRead += chunk.length;
    });
    readStream.on('end', function() {
      writeStream.end();
      var result = {
        source: sourcePath,
        destination: destPath,
        bytes: bytesRead,
        sha256: hash.digest('hex'),
        md5: md5Hash.digest('hex'),
        timestamp: new Date().toISOString(),
        tool: 'disk-imager v1.0.0'
      };
      console.log('Image complete. SHA-256: ' + result.sha256);
      resolve(result);
    });
    readStream.on('error', reject);
    writeStream.on('error', reject);
  });
}

module.exports = { init, run };
