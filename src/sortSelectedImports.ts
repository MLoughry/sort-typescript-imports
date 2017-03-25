import * as vscode from "vscode";
import parseImports from "./parseImportNodes";
import processImports from "./processImports";
import writeImports from "./writeImports";

export default function sortSelectedImports() {
    let editor = vscode.window.activeTextEditor;

    let startLine = editor.selection.start.with(undefined, 0);
    let endLine = editor.selection.end.with(undefined, 0);
    if (editor.selection.end.character) {
        endLine = endLine.translate(1);
    }

    let selectedLinesRange = editor.selection.with(startLine, endLine);

    let imports = parseImports(editor.document.getText(selectedLinesRange));
    imports = processImports(imports);
    let sortedImportText = writeImports(imports);

    editor.edit(
        editBuilder => {
            editBuilder.replace(selectedLinesRange, sortedImportText);
        }
    )
}