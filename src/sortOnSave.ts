import * as vscode from 'vscode';
import sortImports from './sortImports';

export default function sortOnSave(event: vscode.TextDocumentWillSaveEvent) {
    event.waitUntil(new Promise<vscode.TextEdit[]>((resolve, reject) => {
        resolve(sortImports(event.document));
    }));
}