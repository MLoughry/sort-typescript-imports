import * as vscode from 'vscode';
import parseImports from './parseImportNodes';
import processImports from './processImports';
import writeImports from './writeImports';

export default function sortImports(document: vscode.TextDocument) {
    let imports = parseImports(document);
    imports = processImports(imports);
    let sortedImportText = writeImports(imports);

    let edits: vscode.TextEdit[] = imports.map(importClause => vscode.TextEdit.delete(importClause.range));
    edits.push(vscode.TextEdit.insert(new vscode.Position(0, 0), sortedImportText));

    return edits;
}