const vscode = require('vscode');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

let currentPanel = undefined;
let claudeApiKey = undefined;

function getWebviewContent(context) {
    const htmlPath = path.join(context.extensionPath, 'src', 'webview.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    return html;
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('vscode-claude.openChatPanel', async () => {
        if (currentPanel) {
            currentPanel.reveal(vscode.ViewColumn.One);
            return;
        }

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

        currentPanel = vscode.window.createWebviewPanel(
            'claudeChat',
            'Claude Chat',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        currentPanel.webview.html = getWebviewContent(context);

        currentPanel.onDidDispose(
            () => {
                currentPanel = undefined;
            },
            null,
            context.subscriptions
        );

        currentPanel.webview.onDidReceiveMessage(
            async message => {
                switch (message.type) {
                    case 'sendMessage':
                        try {
                            const response = await axios.post('https://api.anthropic.com/v1/messages', {
                                model: 'claude-3-opus-20240229',
                                max_tokens: 1024,
                                messages: [{
                                    role: 'user',
                                    content: message.message
                                }]
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-api-key': claudeApiKey,
                                    'anthropic-version': '2023-06-01'
                                }
                            });

                            const claudeResponse = response.data.content[0].text;
                            currentPanel.webview.postMessage({
                                type: 'response',
                                content: claudeResponse
                            });

                        } catch (error) {
                            if (error.isAxiosError) {
                                vscode.window.showErrorMessage(`Error communicating with Claude: ${error.message}`);
                                console.error('API Error:', error.response?.data);
                            } else {
                                vscode.window.showErrorMessage('An unexpected error occurred');
                                console.error('Unexpected Error:', error);
                            }
                        }
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    if (currentPanel) {
        currentPanel.dispose();
    }
}

module.exports = {
    activate,
    deactivate
}; 