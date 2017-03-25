import { TypescriptImport, NamedImport } from "./TypescriptImport";

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
            return `import ${importClause.default}, { ${importClause.namedImports.map(generateNamedImport).join(", ")} } from '${importClause.path}';`;
        } else {
            return `import ${importClause.default} from '${importClause.path}';`;
        }
    } else {
            return `import { ${importClause.namedImports.map(generateNamedImport).join(", ")} } from '${importClause.path}';`;
    }
}

function generateNamedImport(namedImport: NamedImport): string {
    if (namedImport.alias) {
        return `${namedImport.importName} as ${namedImport.alias}`;
    } else {
        return namedImport.importName;
    }
}