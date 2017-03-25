import * as vscode from "vscode";
import parseImports from "./parseImportNodes";
import processImports from "./processImports";
import writeImports from "./writeImports";

export default function sortSelectedImports() {
    let editor = vscode.window.activeTextEditor;

    let imports = parseImports(editor.document);
    imports = processImports(imports);
    let sortedImportText = writeImports(imports);

    editor.edit(
        editBuilder => {
            imports.forEach(importClause => editBuilder.delete(importClause.range));
            editBuilder.insert( new vscode.Position(0, 0), sortedImportText);
        }
    )
}