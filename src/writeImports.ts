import { TypescriptImport, NamedImport } from "./TypescriptImport";
import * as vscode from 'vscode';
import * as options from './options';

export default function getSortedImportStatements(importClauses: TypescriptImport[]): string {
    return importClauses
        .map(getImportClauseString)
        .join("\n") + "\n";
}

function getImportClauseString(importClause: TypescriptImport): string {
    if (importClause.namespace) {
        return `import * as ${importClause.namespace} from '${importClause.path}';`;
    } else if (importClause.default) {
        if (importClause.namedImports) {
            return `import ${importClause.default}, ${generatedNamedImportGroup(importClause.namedImports)} from '${importClause.path}';`;
        } else {
            return `import ${importClause.default} from '${importClause.path}';`;
        }
    } else {
            return `import ${generatedNamedImportGroup(importClause.namedImports)} from '${importClause.path}';`;
    }
}

function generatedNamedImportGroup(namedImports: NamedImport[]): string {
    let generatedNamedImports = namedImports.map(generateNamedImport);
    let maxImportsPerSingleLine = options.getMaxNamedImportsPerSingleLine();
    if (generatedNamedImports.length > maxImportsPerSingleLine) {
        let newline = `\n${options.getTabString()}`;
        return `{${newline}${generatedNamedImports.join(`,${newline}`)}${newline}}`;
    } else {
        return `{ ${generatedNamedImports.join(', ')} }`;
    }
}

function generateNamedImport(namedImport: NamedImport): string {
    if (namedImport.alias) {
        return `${namedImport.importName} as ${namedImport.alias}`;
    } else {
        return namedImport.importName;
    }
}