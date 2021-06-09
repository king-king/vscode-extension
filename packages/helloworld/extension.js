const vscode = require('vscode');

function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerHoverProvider("javascript", {
            provideHover: (document, position) => {
                const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
                const contents = new vscode.MarkdownString(`[Add comment](${commentCommandUri})`);
                // To enable command URIs in Markdown content, you must set the `isTrusted` flag.
                // When creating trusted Markdown string, make sure to properly sanitize all the
                // input content so that only expected command URIs can be executed
                contents.isTrusted = true;
                return new vscode.Hover(contents);
            },
        })
    );
}


// this method is called when your extension is deactivated
function deactivate() {
    // 退出，测试
}

module.exports = {
    activate,
    deactivate
}
