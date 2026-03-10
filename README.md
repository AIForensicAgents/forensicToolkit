<!-- META TAGS FOR SOCIAL SHARING -->
<!-- <meta name="description" content="forensicToolkit — An Extensible Digital Forensics Toolkit Framework by AI Forensic Agents. Register, manage, and run forensic analysis tools across multiple categories."> -->
<!-- <meta name="keywords" content="digital forensics, forensic toolkit, incident response, malware analysis, memory forensics, disk forensics, network forensics, log analysis, mobile forensics, AI Forensic Agents"> -->
<!-- <meta name="author" content="AI Forensic Agents"> -->
<!-- <meta property="og:title" content="forensicToolkit — An Extensible Digital Forensics Toolkit"> -->
<!-- <meta property="og:description" content="A modular, extensible digital forensics framework for registering, managing, and executing forensic analysis tools across disk, memory, network, malware, log, and mobile forensics categories."> -->
<!-- <meta property="og:image" content="https://raw.githubusercontent.com/ai-forensic-agents/forensicToolkit/main/assets/logo.png"> -->
<!-- <meta property="og:url" content="https://github.com/ai-forensic-agents/forensicToolkit"> -->
<!-- <meta property="og:type" content="website"> -->
<!-- <meta name="twitter:card" content="summary_large_image"> -->
<!-- <meta name="twitter:title" content="forensicToolkit — An Extensible Digital Forensics Toolkit"> -->
<!-- <meta name="twitter:description" content="A modular, extensible digital forensics framework by AI Forensic Agents."> -->
<!-- <meta name="twitter:image" content="https://raw.githubusercontent.com/ai-forensic-agents/forensicToolkit/main/assets/logo.png"> -->

<div align="center">

![Forensic Toolkit Logo by AI Forensic Agents](assets/logo.png)

# forensicToolkit

### An Extensible Digital Forensics Toolkit by AI Forensic Agents

[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=for-the-badge)](CONTRIBUTING.md)

**Register. Manage. Analyze.**
A modular framework for building, organizing, and executing digital forensic analysis tools — all from a single, unified interface.

---

[Overview](#overview) · [Features](#features) · [Quick Start](#quick-start) · [Installation](#installation) · [Tool Categories](#tool-categories) · [API Reference](#api-reference) · [Contributing](#contributing)

</div>

---

## Overview

**forensicToolkit** is an open-source, extensible digital forensics framework designed for investigators, incident responders, and security researchers. Rather than juggling dozens of standalone utilities, forensicToolkit provides a unified registry-based architecture where every tool — whether it analyzes disk images, volatile memory, network captures, malware samples, log files, or mobile device extractions — is registered, managed, and executed through a consistent interface.

Built on **Node.js 18+**, the framework emphasizes:

- **Modularity** — Each tool is a self-contained module with a standardized interface.
- **Extensibility** — Adding a new tool requires only three steps: create, register, export.
- **Consistency** — Every tool follows the same lifecycle: `initialize → execute → report`.
- **Collaboration** — A clear project structure and registry format make team contributions seamless.

Whether you are conducting a full-scale incident response engagement or building a custom forensic pipeline for your organization, forensicToolkit provides the scaffolding to move fast without sacrificing rigor.

---

## Features

| Feature | Description |
|---|---|
| 🔌 **Plugin Architecture** | Register any tool via a simple JavaScript object in the central registry. |
| 📂 **Six Forensic Categories** | Built-in support for disk, memory, network, malware, log, and mobile forensics. |
| 🚀 **Unified CLI & API** | Run tools from the command line or integrate programmatically into your own workflows. |
| 📋 **Standardized Reporting** | Every tool outputs results in a consistent, structured format (JSON by default). |
| ⚙️ **Configurable Pipelines** | Chain tools together and pass output from one stage to the next. |
| 🔒 **Evidence Integrity** | Built-in hashing and chain-of-custody logging for every operation. |
| 🧩 **Hot-Reload Support** | Register new tools at runtime without restarting the framework. |
| 📝 **Comprehensive Logging** | Detailed audit trails for every tool invocation, configurable verbosity. |
| 🌐 **Cross-Platform** | Runs on Linux, macOS, and Windows wherever Node.js 18+ is available. |
| 🤝 **Community-Driven** | Designed from the ground up for open contribution and extension. |

---

## Quick Start

Get up and running in under two minutes:

```bash
# Clone the repository
git clone https://github.com/ai-forensic-agents/forensicToolkit.git
cd forensicToolkit

# Install dependencies
npm install

# List all registered tools
node index.js --list

# Run a specific tool
node index.js --run disk-imager --target /dev/sda --output ./evidence/

# Run all tools in a category
node index.js --category disk-forensics --target /dev/sda --output ./evidence/
```

---

## Installation

### Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| **Node.js** | ≥ 18.0.0 | [Download](https://nodejs.org/) — LTS recommended |
| **npm** | ≥ 9.0.0 | Ships with Node.js 18+ |
| **Git** | ≥ 2.30 | For cloning and contributing |

### Step-by-Step Installation

**1. Clone the Repository**

```bash
git clone https://github.com/ai-forensic-agents/forensicToolkit.git
cd forensicToolkit
```

**2. Install Dependencies**

```bash
npm install
```

**3. Verify Installation**

```bash
node index.js --version
```

You should see output similar to:

```
forensicToolkit v1.0.0
Node.js v18.x.x
Registered tools: 12
```

**4. (Optional) Install Globally**

```bash
npm link
```

This allows you to run `forensic-toolkit` from anywhere on your system.

**5. (Optional) Run the Test Suite**

```bash
npm test
```

---

## Project Structure

```
forensicToolkit/
├── assets/
│   └── logo.png                    # Project logo and branding assets
├── config/
│   ├── default.json                # Default framework configuration
│   ├── logging.json                # Logging verbosity and output settings
│   └── pipelines/                  # Pre-built pipeline definitions
│       ├── full-disk-analysis.json
│       └── incident-response.json
├── docs/
│   ├── API.md                      # Full API documentation
│   ├── ARCHITECTURE.md             # Architecture decision records
│   └── TOOL_DEVELOPMENT.md         # Detailed tool development guide
├── lib/
│   ├── core/
│   │   ├── engine.js               # Tool execution engine
│   │   ├── loader.js               # Dynamic tool loader
│   │   ├── logger.js               # Logging subsystem
│   │   ├── reporter.js             # Report generation module
│   │   └── validator.js            # Registry & input validation
│   ├── utils/
│   │   ├── hash.js                 # Hashing utilities (MD5, SHA-256, etc.)
│   │   ├── filesystem.js           # File system helpers
│   │   └── chain-of-custody.js     # Evidence integrity tracking
│   └── cli/
│       ├── index.js                # CLI entry point and argument parser
│       └── commands/               # CLI command handlers
│           ├── list.js
│           ├── run.js
│           └── validate.js
├── tools/
│   ├── registry.js                 # ★ Central tool registry
│   ├── disk-forensics/
│   │   ├── disk-imager.js          # Disk imaging tool
│   │   └── partition-analyzer.js   # Partition table analysis
│   ├── memory-forensics/
│   │   ├── memdump-parser.js       # Memory dump parser
│   │   └── process-scanner.js      # Running process reconstruction
│   ├── network-forensics/
│   │   ├── pcap-analyzer.js        # PCAP file analyzer
│   │   └── dns-extractor.js        # DNS query extraction
│   ├── malware-analysis/
│   │   ├── static-analyzer.js      # Static binary analysis
│   │   └── yara-scanner.js         # YARA rule scanner
│   ├── log-analysis/
│   │   ├── syslog-parser.js        # Syslog parsing and correlation
│   │   └── timeline-generator.js   # Event timeline reconstruction
│   └── mobile-forensics/
│       ├── ios-backup-parser.js     # iOS backup extraction
│       └── android-db-reader.js    # Android SQLite database reader
├── test/
│   ├── core/                       # Core module unit tests
│   ├── tools/                      # Tool-specific tests
│   └── integration/                # End-to-end integration tests
├── .eslintrc.json                  # ESLint configuration
├── .gitignore
├── CONTRIBUTING.md                 # Contribution guidelines
├── LICENSE                         # MIT License
├── index.js                        # Main entry point
├── package.json
└── README.md                       # ← You are here
```

---

## Tool Categories

forensicToolkit organizes tools into **six core forensic categories**. Each category maps to a subdirectory under `tools/` and serves a distinct investigative purpose.

### 💾 Disk Forensics
**Directory:** `tools/disk-forensics/`

Tools for acquiring and analyzing data from hard drives, solid-state drives, and removable storage media. Includes disk imaging, partition analysis, file system parsing, deleted file recovery, and slack space analysis.

### 🧠 Memory Forensics
**Directory:** `tools/memory-forensics/`

Tools for analyzing volatile memory (RAM) dumps. Enables process reconstruction, loaded DLL enumeration, network connection extraction, registry hive analysis from memory, and rootkit detection.

### 🌐 Network Forensics
**Directory:** `tools/network-forensics/`

Tools for capturing and analyzing network traffic. Supports PCAP parsing, protocol dissection, DNS query extraction, HTTP session reconstruction, and anomalous traffic detection.

### 🦠 Malware Analysis
**Directory:** `tools/malware-analysis/`

Tools for static and dynamic analysis of suspicious binaries and scripts. Includes PE header parsing, string extraction, YARA rule scanning, entropy analysis, and IOC extraction.

### 📜 Log Analysis
**Directory:** `tools/log-analysis/`

Tools for parsing, correlating, and visualizing system and application logs. Supports syslog, Windows Event Logs, web server access logs, and automated timeline generation.

### 📱 Mobile Forensics
**Directory:** `tools/mobile-forensics/`

Tools for extracting and analyzing data from mobile devices. Covers iOS backup parsing, Android database reading, app data extraction, and communication log recovery.

---

## How to Add a New Tool

Adding a tool to forensicToolkit is a straightforward three-step process. This example walks through creating a **file hash verifier** in the `disk-forensics` category.

### Step 1: Create the Tool File

Create a new JavaScript file in the appropriate category directory under `tools/`.

**File:** `tools/disk-forensics/hash-verifier.js`

```javascript
/**
 * Hash Verifier Tool
 * Computes and verifies cryptographic hashes of evidence files
 * to ensure integrity throughout the forensic process.
 *
 * @module tools/disk-forensics/hash-verifier
 * @category disk-forensics
 * @version 1.0.0
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

/**
 * Initialize the tool with the provided configuration.
 * Called once before execution begins.
 *
 * @param {Object} config - Tool configuration object
 * @param {string} config.algorithm - Hash algorithm (e.g., "sha256", "md5")
 * @returns {Promise<void>}
 */
async function initialize(config = {}) {
  this.algorithm = config.algorithm || "sha256";
  this.results = [];
  console.log(`[hash-verifier] Initialized with algorithm: ${this.algorithm}`);
}

/**
 * Execute the tool against the specified target.
 * This is the main analysis function.
 *
 * @param {Object} params - Execution parameters
 * @param {string} params.target - Path to the file or directory to hash
 * @param {string} [params.expected] - Optional expected hash for verification
 * @returns {Promise<Object>} Analysis results
 */
async function execute(params) {
  const { target, expected } = params;

  if (!target) {
    throw new Error("[hash-verifier] No target specified.");
  }

  const filePath = path.resolve(target);
  const stat = fs.statSync(filePath);

  if (stat.isFile()) {
    const hash = await computeHash(filePath, this.algorithm);
    const result = {
      file: filePath,
      algorithm: this.algorithm,
      hash: hash,
      verified: expected ? hash === expected : null,
      size: stat.size,
      timestamp: new Date().toISOString(),
    };
    this.results.push(result);
  } else if (stat.isDirectory()) {
    const files = fs.readdirSync(filePath);
    for (const file of files) {
      const fullPath = path.join(filePath, file);
      if (fs.statSync(fullPath).isFile()) {
        const hash = await computeHash(fullPath, this.algorithm);
        this.results.push({
          file: fullPath,
          algorithm: this.algorithm,
          hash: hash,
          verified: null,
          size: fs.statSync(fullPath).size,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  return { success: true, count: this.results.length };
}

/**
 * Generate and return the tool's report.
 * Called after execution completes.
 *
 * @returns {Promise<Object>} Structured report object
 */
async function report() {
  return {
    tool: "hash-verifier",
    version: "1.0.0",
    category: "disk-forensics",
    executedAt: new Date().toISOString(),
    totalFiles: this.results.length,
    results: this.results,
  };
}

/**
 * Compute the cryptographic hash of a file.
 *
 * @param {string} filePath - Absolute path to the file
 * @param {string} algorithm - Hash algorithm to use
 * @returns {Promise<string>} Hex-encoded hash digest
 */
function computeHash(filePath, algorithm) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

// Export the required interface
module.exports = {