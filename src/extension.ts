'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import sortInsideEditor from './sortInsideEditor';
import sortOnSave from './sortOnSave';
import { shouldSortOnSave } from './options';

let sortOnSaveDisposer: vscode.Disposable;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let sortOnCommandDisposer = vscode.commands.registerCommand('extension.sortTypescriptImports', () => {
        // The code you place here will be executed every time your command is executed

        if (vscode.window.activeTextEditor.document.languageId === 'typescript'
            || vscode.window.activeTextEditor.document.languageId === 'typescriptreact') {
            sortInsideEditor();
        }
    });

    let configurationWatcher = vscode.workspace.onDidChangeConfiguration(configure);
    configure();

    context.subscriptions.push(
        sortOnCommandDisposer,
        configurationWatcher);
}

function configure() {
    if (shouldSortOnSave()) {
        enableFileWatcher();
    } else if (!shouldSortOnSave()) {
        disableFileWatcher();
    }
}

function enableFileWatcher() {
    if (!sortOnSaveDisposer) {
        sortOnSaveDisposer = vscode.workspace.onWillSaveTextDocument(sortOnSave);
    }
}

function disableFileWatcher() {
    if (sortOnSaveDisposer) {
        sortOnSaveDisposer.dispose();
        sortOnSaveDisposer = undefined;
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
    disableFileWatcher();
}