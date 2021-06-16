import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('catCoding.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'catCoding',
                'Cat Coding',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );
            panel.webview.html = getWebviewContent();
        })
    );
    vscode.window.registerWebviewPanelSerializer('catCoding', new CatCodingSerializer());
}

class CatCodingSerializer implements vscode.WebviewPanelSerializer {
    async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
        // `state` is the state persisted using `setState` inside the webview
        console.log(`Got state: ${state}`);
        // Restore the content of our webview.
        //
        // Make sure we hold on to the `webviewPanel` passed in here and
        // also restore any event listeners we need on it.
        webviewPanel.webview.html = getWebviewContent();
    }
}

function getWebviewContent() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        (function() {
            // 获取VS Code API 对象
            const vscode = acquireVsCodeApi();
            const counter = document.getElementById('lines-of-code-counter');

            const previousState = vscode.getState();
            let count = previousState ? previousState.count : 0;
            counter.textContent = count;

            setInterval(() => {
                counter.textContent = count++;
                // Update the saved state
                vscode.setState({ count });
            }, 100);
        }())
    </script>
</body>
</html>`;
}
