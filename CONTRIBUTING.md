# Contributing to forensicToolkit

We love contributions! Here's how to get started.

## Adding a New Tool

1. Create your tool file in `tools/` directory
2. Register it in `tools/registry.js`
3. Follow the tool interface (export `init` and `run` functions)
4. Submit a PR with tests

## Tool Interface

Every tool must export:
- `init(options)` - Initialize with configuration
- `run(args)` - Execute the tool, return results

## Code Style
- Use strict mode
- CommonJS modules
- No external dependencies unless absolutely necessary
- Document all exported functions with JSDoc

## Pull Request Process
1. Fork the repo
2. Create a feature branch
3. Add your tool + registry entry
4. Submit PR with description of what the tool does
