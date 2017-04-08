import * as vscode from 'vscode';
import * as options from './options';
import { NamedImport, TypescriptImport } from './TypescriptImport';

export default function getSortedImportStatements(importClauses: TypescriptImport[]): string {
    if (importClauses && importClauses.length) {
        return importClauses
            .map(getImportClauseString)
            .join('\n') + '\n';
    }
}

function getImportClauseString(importClause: TypescriptImport): string {
    let path = getPath(importClause);
    let semicolon = '';
    if (!options.getOmitSemicolon()) {
        semicolon = ';';
    }
    if (importClause.namespace) {
        return `import * as ${importClause.namespace} from ${path}${semicolon}`;
    } else if (importClause.default) {
        if (importClause.namedImports) {
            return `import ${importClause.default}, ${generatedNamedImportGroup(importClause.namedImports)} from ${path}${semicolon}`;
        } else {
            return `import ${importClause.default} from ${path}${semicolon}`;
        }
    } else if (importClause.namedImports) {
        return `import ${generatedNamedImportGroup(importClause.namedImports)} from ${path}${semicolon}`;
    } else {
        return `import ${path}${semicolon}`;
    }
}

function getPath(importClause: TypescriptImport): string {
    let quote = options.getQuoteToken();
    return `${quote}${importClause.path}${quote}`;
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
