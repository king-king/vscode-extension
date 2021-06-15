import * as vscode from 'vscode';
import { NodeDependenciesProvider, Dependency } from './nodeDependencies';

export function activate(context: vscode.ExtensionContext) {
    const nodeDependenciesProvider = new NodeDependenciesProvider(vscode.workspace.rootPath);
    vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
    vscode.commands.registerCommand('nodeDependencies.refreshEntry', () =>
        nodeDependenciesProvider.refresh()
    );
}
