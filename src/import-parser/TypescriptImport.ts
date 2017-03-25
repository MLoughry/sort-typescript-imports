export interface NamedImport {
    importName: string;
    alias?: string;
}

export type DestructedImport = NamedImport | string;

export interface TypescriptImport {
    path: string;
    default?: string;
    namedImports?: DestructedImport[];
    namespace?: string;
}