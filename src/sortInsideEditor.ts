import * as vscode from 'vscode';
import sortImports from './sortImports';
import processImports from './processImports';
import writeImports from './writeImports';

export default function sortInsideEditor() {
    let editor = vscode.window.activeTextEditor;

    let edits: vscode.TextEdit[] = sortImports(editor.document);

    editor.edit(
        editBuilder => {
            edits.forEach(edit => {
              editBuilder.replace(edit.range, edit.newText);
            });
        }
    );
}