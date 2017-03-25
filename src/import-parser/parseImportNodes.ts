import { DestructedImport, TypescriptImport } from "./TypescriptImport";

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

export default function parseImportNodes(source: string) {
    importRegex.lastIndex = 0;
    let imports: TypescriptImport[] = [];

    let strippedSource = source.replace(
        importRegex,
        () => {
            imports.push({
                path: arguments[30],
                default: arguments[4] || arguments[17],
                namedImports: parseDestructiveImports(arguments[5] || arguments[18]),
                namespace: arguments[2],
            });
            return "";
        }
    );

    return  {
        imports,
        strippedSource
    };
}

function parseDestructiveImports(destructiveImports: string): DestructedImport[] {
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