const vscode = require('vscode');
const axios = require('axios');

let outputChannel;
let claudeApiKey;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    outputChannel = vscode.window.createOutputChannel('Claude Chat');

    let disposable = vscode.commands.registerCommand('vscode-claude.startChat', async () => {
        if (!claudeApiKey) {
            claudeApiKey = await vscode.window.showInputBox({
                prompt: 'Enter your Claude API Key',
                password: true
            });

            if (!claudeApiKey) {
                vscode.window.showErrorMessage('Claude API key is required');
                return;
            }
        }

        const userInput = await vscode.window.showInputBox({
            prompt: 'Enter your message for Claude',
            placeHolder: 'Type your message here...'
        });

        if (!userInput) {
            return;
        }

        try {
            const response = await axios.post('https://api.anthropic.com/v1/messages', {
                model: 'claude-3-opus-20240229',
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: userInput
                }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': claudeApiKey,
                    'anthropic-version': '2023-06-01'
                }
            });

            const claudeResponse = response.data.content[0].text;
            outputChannel.appendLine(`You: ${userInput}`);
            outputChannel.appendLine(`Claude: ${claudeResponse}`);
            outputChannel.show();

        } catch (error) {
            if (error.isAxiosError) {
                vscode.window.showErrorMessage(`Error communicating with Claude: ${error.message}`);
                console.error('API Error:', error.response?.data);
            } else {
                vscode.window.showErrorMessage('An unexpected error occurred');
                console.error('Unexpected Error:', error);
            }
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
}

module.exports = {
    activate,
    deactivate
}; 