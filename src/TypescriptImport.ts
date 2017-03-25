export interface NamedImport {
    importName: string;
    alias?: string;
}

export type DestructedImport = NamedImport;

export interface TypescriptImport {
    path: string;
    default?: string;
    namedImports?: DestructedImport[];
    namespace?: string;
}