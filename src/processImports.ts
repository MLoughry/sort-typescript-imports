import { TypescriptImport } from "./TypescriptImport";

export default function processImports(importClauses: TypescriptImport[]): TypescriptImport[] {
    return importClauses
        .sort(compareImportClauses)
        .map(importClause => {
            if (importClause.namedImports) {
                importClause.namedImports.sort((a, b) => a.importName.localeCompare(b.importName, "en", "base"));
            }
            return importClause;
        });
}

function compareImportClauses(a: TypescriptImport, b: TypescriptImport) {
    return comparePath(a, b)
        || a.path.localeCompare(b.path, "en", "base");
}

function comparePath(a: TypescriptImport, b: TypescriptImport) {
    return getPathPriority(a.path) - getPathPriority(b.path);
}

function getPathPriority(path: string) {
    if (/^\./.test(path)) {
        return 0;
    } else if (/^\.\./.test(path)) {
        return 1;
    } else {
        return 2;
    }
}
