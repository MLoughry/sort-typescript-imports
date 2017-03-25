import { DestructedImport, TypescriptImport } from "./TypescriptImport";
import * as vscode from 'vscode';

const name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`;
const ws = `[\\s\\n\\r]`;

const namespaceToken = `\\*\\s+as\\s+(${name})`;
const defaultImportToken = name;
const destructingImportToken = `(${name})(\\s+as\\s+(${name}))?`;
const destructingImport = `{(${ws}*${destructingImportToken}(,${ws}*${destructingImportToken})*${ws}*)}`;
const defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`;
const combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`;
const importRegexString = `^import\\s+${combinedImportTypes}\\s+from\\s+['"]([\\w\\\\/\.-]+)['"];?\\r?\\n?`;

// Group 4 || Group 17 - default import
// Group 2 - namespace import
// Group 5 || Group 18 - destructing import group; requires further tokenizing
// Group 30 - file path or package
const importRegex = new RegExp(importRegexString, 'gm');

// Group 1 - importName
// Group 4 - alias
const destructingImportTokenRegex = new RegExp(destructingImportToken);

export default function parseImportNodes(document: vscode.TextDocument) {
    let source = document.getText();
    importRegex.lastIndex = 0;
    let imports: TypescriptImport[] = [];

    let match;
    while (match = importRegex.exec(source)) {
        imports.push({
            path: match[30],
            default: match[4] || match[17],
            namedImports: parseDestructiveImports(match[5] || match[18]),
            namespace: match[2],
            range: new vscode.Range(
                document.positionAt(match.index),
                document.positionAt(importRegex.lastIndex)
            ),
        });
    }

    return imports;
}

function parseDestructiveImports(destructiveImports: string): DestructedImport[] {
    if (!destructiveImports) {
        return null;
    }

    return destructiveImports
        .split(",")
        .map(destructiveImport => {
            let match = destructingImportTokenRegex.exec(destructiveImport);
            return {
                importName: match[1],
                alias: match[4],
            };
        });
}