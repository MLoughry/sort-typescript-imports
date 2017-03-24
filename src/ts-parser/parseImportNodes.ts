var name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`;
var ws = `[\\s\\n\\r]`;

var namespaceToken = `\\*\\s+as\\s+(${name})`;
var defaultImportToken = name;
var destructingImport = `({${ws}*${name}(,${ws}*${name})*${ws}*})`;
var defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`;
var combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`;
var importRegex = `import\\s+${combinedImportTypes}\\s+from\\s+['"]([\\w\\\\/\.-]+)['"];?`;

// Group 1 || Group 9 - default import
// Group 2 - namespace import
// Group 5 || Group 10 - destructing import group; requires further tokenizing
// Group 14 - file path or package

export default function parseImportNodes(source: string) {

}