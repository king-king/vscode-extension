import * as vscode from 'vscode';
import { NodeDependenciesProvider, Dependency } from './nodeDependencies';

export function activate(context: vscode.ExtensionContext) {
    const nodeDependenciesProvider = new NodeDependenciesProvider(vscode.workspace.rootPath);
    vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);

    vscode.commands.registerCommand('nodeDependencies.refreshEntry', () =>
        nodeDependenciesProvider.refresh()
    );
    vscode.commands.registerCommand('nodeDependencies.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
    vscode.commands.registerCommand('nodeDependencies.editDep', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
    vscode.commands.registerCommand('nodeDependencies.deleteDep', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
}
