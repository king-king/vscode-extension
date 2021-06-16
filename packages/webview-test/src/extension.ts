import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('catCoding.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'catCoding',
                'Cat Coding',
                vscode.ViewColumn.One,
                {
                    // Only allow the webview to access resources in our extension's media directory
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
                }
            );
            const onDiskPath = vscode.Uri.file(
                path.join(context.extensionPath, 'media', 'cat.gif')
            );
            const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
            panel.webview.html = getWebviewContent(catGifSrc);
        })
    );
}


function getWebviewContent(cat) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="${cat}" width="300" />
</body>
</html>`;
}
