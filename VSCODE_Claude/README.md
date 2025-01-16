# VS Code Claude Extension

This VS Code extension integrates Claude AI into your development environment, allowing you to chat with Claude directly from VS Code. Built with JavaScript.

## Features

- Interactive chat panel interface with Claude AI
- Real-time conversation history
- Modern, VS Code-themed UI
- Secure API key handling
- Persistent chat session within VS Code
- Support for Claude-3 Opus model

## Requirements

- VS Code 1.85.0 or higher
- Claude API key from Anthropic
- Node.js 18.0 or higher (recommended)

## Installation

1. Clone this repository
2. Navigate to the extension directory: `cd VSCODE_Claude`
3. Run `npm install` to install dependencies
4. Press F5 in VS Code to start debugging

## Usage

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the command palette
2. Type "Open Claude Chat Panel" and select the command
3. Enter your Claude API key when prompted (only required once per session)
4. The chat panel will open on the side of your VS Code window
5. Type your message in the input box at the bottom
6. Press Enter or click the Send button to chat with Claude
7. View the conversation history in the scrollable chat area

## Extension Settings

This extension contributes the following commands:

* `vscode-claude.openChatPanel`: Opens the interactive chat panel for Claude

## Known Issues

- API key is stored in memory and needs to be re-entered when VS Code restarts
- Node.js version warnings may appear during installation but shouldn't affect functionality

## Release Notes

### 0.0.1

Initial release of VS Code Claude extension featuring:
- Interactive chat panel interface
- Real-time conversation display
- Claude-3 Opus model integration
- Modern VS Code-themed UI
