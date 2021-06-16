import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Track currently webview panel
    let currentPanel: vscode.WebviewPanel | undefined = undefined;

    context.subscriptions.push(
        vscode.commands.registerCommand('catCoding.start', () => {
            const columnToShowIn = vscode.window.activeTextEditor
                ? vscode.window.activeTextEditor.viewColumn
                : undefined;

            if (currentPanel) {
                // If we already have a panel, show it in the target column
                currentPanel.reveal(columnToShowIn);
            } else {
                // Otherwise, create a new panel
                currentPanel = vscode.window.createWebviewPanel(
                    'catCoding',
                    'Cat Coding',
                    columnToShowIn,
                    {}
                );
                currentPanel.webview.html = getWebviewContent('Coding Cat');

                // Reset when the current panel is closed
                currentPanel.onDidDispose(
                    () => {
                        currentPanel = undefined;
                        console.log('onDidDispose');
                    },
                    null,
                    context.subscriptions
                );
            }
        })
    );
}

function getWebviewContent(cat: keyof typeof cats) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif" width="300" />
</body>
</html>`;
}
