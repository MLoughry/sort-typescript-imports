import * as vscode from 'vscode';

export interface NamedImport {
    importName: string;
    alias?: string;
}

export type DestructedImport = NamedImport;

export interface TypescriptImport {
    path: string;
    range: vscode.Range;
    default?: string;
    namedImports?: DestructedImport[];
    namespace?: string;
}