import * as vscode from 'vscode';
import isSupportedLanguage from './isSupportedLanguage';
import sortImports from './sortImports';

export default function sortOnSave(event: vscode.TextDocumentWillSaveEvent) {
    if (isSupportedLanguage(event.document.languageId)) {
        event.waitUntil(new Promise<vscode.TextEdit[]>((resolve, reject) => {
            resolve(sortImports(event.document));
        }));
    }
}