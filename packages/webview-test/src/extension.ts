import * as vscode from 'vscode';

const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
    'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('catCoding.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'catCoding',
                'Cat Coding',
                vscode.ViewColumn.One,
                {}
            );
            panel.webview.html = getWebviewContent('Coding Cat');

            // Update contents based on view state changes
            panel.onDidChangeViewState(e => {
                const curPanel = e.webviewPanel;
                console.log(panel.viewColumn, curPanel.viewColumn);
                switch (curPanel.viewColumn) {
                    case vscode.ViewColumn.One:
                        updateWebviewForCat(curPanel, 'Coding Cat');
                        return;
                    case vscode.ViewColumn.Two:
                        updateWebviewForCat(curPanel, 'Compiling Cat');
                        return;
                    case vscode.ViewColumn.Three:
                        updateWebviewForCat(curPanel, 'Testing Cat');
                        return;
                }
            }, null, context.subscriptions);
        })
    );
}

function updateWebviewForCat(panel: vscode.WebviewPanel, catName: keyof typeof cats) {
    panel.title = catName;
    panel.webview.html = getWebviewContent(catName);
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
    <img src="${cats[cat]}" width="300" />
</body>
</html>`;
}
