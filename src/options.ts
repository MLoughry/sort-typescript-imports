import * as vscode from 'vscode';

export function getTabString(editor: vscode.TextEditor = vscode.window.activeTextEditor) {
    if (editor.options.insertSpaces) {
        return new Array(editor.options.tabSize as number + 1).join(" ");
    } else {
        return "\t";
    }
}

export function getMaxNamedImportsPerSingleLine() {
    return getExtensionConfig().get('maxNamedImportsInSingleLine');
}

export function getSortOption() {
    return getExtensionConfig().get('sortMethod');
}

export function getQuoteToken() {
    switch (getExtensionConfig().get('quoteStyle')) {
        case 'double':
            return '"';
        case 'single':
        default:
            return '\'';
    }
}

function getExtensionConfig() {
    return vscode.workspace.getConfiguration('typescript.extension.sortImports');
}