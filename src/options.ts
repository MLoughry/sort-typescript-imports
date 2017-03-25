import * as vscode from 'vscode';

export function getTabString(editor: vscode.TextEditor = vscode.window.activeTextEditor) {
    if (editor.options.insertSpaces) {
        return new Array(editor.options.tabSize as number + 1).join(" ");
    } else {
        return "\t";
    }
}

export function getMaxNamedImportsPerSingleLine() {
    return vscode.workspace.getConfiguration('typescript.extension.sortImports').get('maxNamedImportsInSingleLine');
}

export function getSortOption() {
    return vscode.workspace.getConfiguration('typescript.extension.sortImports').get('sortMethod');
}