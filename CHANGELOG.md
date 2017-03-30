# Change Log

## [1.2.1]
- Fix bug with package paths that contained an `@` symbol
- Fix bug that would add a newline to the beginning of any file without import statements

## [1.2.0]
- Added the ability to configure how sorting by import path is done.
- Fixed a bug where the extension would process non-Typescript files when saving

## [1.1.0]
- Added the option to sort imports whenever you save, controlled by the `typescript.extension.sortImports.sortOnSave` setting (`false` by default).

## [1.0.0]
- Initial release