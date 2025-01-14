# VS Code Claude Extension

This VS Code extension integrates Claude AI into your development environment, allowing you to chat with Claude directly from VS Code. Built with JavaScript.

## Features

- Chat with Claude AI directly from VS Code
- Secure API key storage
- Simple and intuitive interface
- Lightweight JavaScript implementation

## Requirements

- VS Code 1.85.0 or higher
- Claude API key from Anthropic
- Node.js 14.0 or higher

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Press F5 in VS Code to start debugging

## Usage

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the command palette
2. Type "Start Chat with Claude" and select the command
3. Enter your Claude API key when prompted (only required once per session)
4. Type your message and press Enter
5. View Claude's response in the output panel

## Extension Settings

This extension contributes the following commands:

* `vscode-claude.startChat`: Start a chat session with Claude

## Known Issues

- API key is stored in memory and needs to be re-entered when VS Code restarts

## Release Notes

### 0.0.1

Initial release of VS Code Claude extension - JavaScript version
